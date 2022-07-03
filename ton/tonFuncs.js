const TonWeb = require("tonweb");
const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;

const fs = require("fs");

const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC'; 
const apiKey = 'c4aa71e6019db398ef6fdcb04b15b9eab604fc7b2def6ec7a5a46733b47062ae'; 
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, {apiKey}));


const t = 6000;

var walletA = null;
var walletAddressA = null;
var walletB = null;
var walletAddressB = null;

var fromWalletA;
var fromWalletB;

var channelState = {
    balanceA: toNano('2'),
    balanceB: toNano('0'),
    seqnoA: new BN(0),
    seqnoB: new BN(0)
};

var channelConfig = null

var channelA = null;
var channelB = null;

const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}


const keyPairA = {"publicKey": new Uint8Array([
    169,43,211,181,209,157,160,41,216,190,99,166,23,192,115,198,142,64,253,140,180,70,35,97,221,174,234,186,53,2,73,193
    ]),
    "secretKey": new Uint8Array([
    13,56,144,119,64,148,253,3,81,215,154,34,62,177,174,139,57,43,33,89,147,222,242,54,174,151,27,46,224,209,123,146,169,43,211,181,209,157,160,41,216,190,99,166,23,192,115,198,142,64,253,140,180,70,35,97,221,174,234,186,53,2,73,193
    ])};

const keyPairB = {"publicKey": new Uint8Array([
    68,241,179,46,4,65,75,251,56,141,31,226,41,40,247,48,136,231,134,252,109,139,138,2,254,13,54,160,44,106,240,99
    ]),
    "secretKey": new Uint8Array([
    65,203,237,10,190,182,199,23,172,200,49,129,30,87,24,92,39,67,164,64,45,66,28,160,124,47,196,171,179,105,14,142,68,241,179,46,4,65,75,251,56,141,31,226,41,40,247,48,136,231,134,252,109,139,138,2,254,13,54,160,44,106,240,99
    ])};



const setVars = async (id = -1) => {
    // isDeployed = Number(fs.readFileSync("./deploy.txt", 'utf8')[0]);

    if(id == -1)
    {
        id = ~~(Date.now() / 1000);
    }
    newTsChannelId = id;
    // if(isDeployed == 0) {
    //     newTsChannelId = ~~(Date.now() / 1000);
    //     fs.writeFileSync('./id.txt', newTsChannelId.toString());
    // }
    // else if(isDeployed == 1) {
    //     protState = JSON.parse(fs.readFileSync("./validState.json"));
    //     channelState.balanceA = toNano(protState.balanceA);
    //     channelState.balanceB = toNano(protState.balanceB);
    //     channelState.seqnoA = new BN(protState.seqnoA);
    //     channelState.seqnoB = new BN(protState.seqnoB);

    //     newTsChannelId = Number(fs.readFileSync("./id.txt"));
    // }

    walletA = tonweb.wallet.create({
        publicKey: keyPairA.publicKey
    });
    walletAddressA = await walletA.getAddress();

    walletB = tonweb.wallet.create({
        publicKey: keyPairB.publicKey
    });
    walletAddressB = await walletB.getAddress(); 

    console.log('id', id);
    channelConfig = {
        channelId: new BN(id),
        addressA: walletAddressA,
        addressB: walletAddressB,
        initBalanceA: channelState.balanceA,
        initBalanceB: channelState.balanceB
    }

    channelA = tonweb.payments.createChannel({
        ...channelConfig,
        isA: true,
        myKeyPair: keyPairA,
        hisPublicKey: keyPairB.publicKey,
    });
    
    channelB = tonweb.payments.createChannel({
        ...channelConfig,
        isA: false,
        myKeyPair: keyPairB,
        hisPublicKey: keyPairA.publicKey,
    });

    fromWalletA = channelA.fromWallet({
        wallet: walletA,
        secretKey: keyPairA.secretKey
    });

    fromWalletB = channelB.fromWallet({
        wallet: walletB,
        secretKey: keyPairB.secretKey
    });
    return newTsChannelId;
}


module.exports.init = async () => {
    
    newTsChannelId = await setVars();

    console.log('walletAddressA = ', walletAddressA.toString(true, true, true));
    
    console.log('walletAddressB = ', walletAddressB.toString(true, true, true));



    //deploy
    await fromWalletA.deploy().send(toNano('0.05')).then(r => {console.log('deploy: ', r)});


    await delay(2*t);


    //topup
    await fromWalletA
    .topUp({coinsA: channelState.balanceA, coinsB: new BN(0)})
    .send(channelState.balanceA.add(toNano('0.1'))).then(console.log('A top up succesfull'));


    await delay(t);
    

    await fromWalletB
    .topUp({coinsA: new BN(0), coinsB: channelState.balanceB})
    .send(channelState.balanceB.add(toNano('0.1'))).then(console.log('B top up succesfull')); 
    

    await delay(t);
    
    
    //init
    await fromWalletA.init(channelState).send(toNano('0.1')).then(r => {console.log('init: ', r)});


    await delay(2*t);
    

    var data = await channelA.getData();
    console.log(data.state);
    console.log('balanceA = ', data.balanceA.toString());
    console.log('balanceB = ', data.balanceB.toString());

    console.log('init');
    console.log(channelState);

    //fs.writeFileSync('./deploy.txt', '1');
    //fs.writeFileSync('./validState.json',JSON.stringify(protState));
    return [channelState, newTsChannelId];
}




module.exports.addState = async (validState, balances, id) => {
    // if (balances[0] + balances[1] != channelState.balanceA + channelState.balanceB) {
    //     // error
    //     return;
    // }

    channelState = validState;    

    await setVars(id);

    const newState = {
        balanceA: toNano(balances[0].toString()),
        balanceB: toNano(balances[1].toString()),
        seqnoA: new BN(validState.seqnoA + 1),//*Number(isA)),
        seqnoB: new BN(validState.seqnoB + 1)//*Number(!isA))
    }

    console.log('add state');
    console.log(validState);
    
    //if (isA) {
    const signatureA1 = await channelA.signState(newState);
    if (!(await channelB.verifyState(newState, signatureA1))) {
        throw new Error('Invalid A signature');
        }
    // }
    // else {
    //     const signatureB1 = await channelB.signState(newState);
    //     if (!(await channelA.verifyState(newState, signatureB1))) {
    //         throw new Error('Invalid A signature');
    //     }
    // }

    // fs.writeFileSync('./validState.json', JSON.stringify(protState));
    return newState;
}




module.exports.close = async (validState, id) => {
    await setVars(id);

    console.log(validState);

    const signatureCloseB = await channelB.signClose(validState);
    if (!(await channelA.verifyClose(validState, signatureCloseB))) {
        throw new Error('Invalid B signature');
    }
    await fromWalletA.close({
        ...validState,
        hisSignature: signatureCloseB
    }).send(toNano('0.05'));

    var data = await channelA.getData();
    console.log(data.state);
    console.log('balanceA = ', data.balanceA.toString());
    console.log('balanceB = ', data.balanceB.toString());

    console.log('close');
    console.log(validState);

    // fs.writeFileSync('./deploy.txt', '0');
    // fs.writeFileSync('./validState.json', '');
}

