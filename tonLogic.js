const TonWeb = require("tonweb");
const TonWebMnemonic = require("tonweb-mnemonic")
const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;

const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC'; 
const apiKey = 'c4aa71e6019db398ef6fdcb04b15b9eab604fc7b2def6ec7a5a46733b47062ae'; 
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, {apiKey}));


const t = 6000;

var walletA = null;
var walletAddressA = null;
var walletB = null;
var walletAddressB = null;

var newTsChannelId = null;
var channelConfig = null

var channelA = null;
var channelB = null;

var validState = null;
const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}

const channelInitState = {
    balanceA: toNano('2'),
    balanceB: toNano('3'),
    seqnoA: new BN(0),
    seqnoB: new BN(0) 
};

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




const init = async () => {
    walletA = tonweb.wallet.create({
        publicKey: keyPairA.publicKey
    });
    walletAddressA = await walletA.getAddress(); 
    console.log('walletAddressA = ', walletAddressA.toString(true, true, true));

    walletB = tonweb.wallet.create({
        publicKey: keyPairB.publicKey
    });
    walletAddressB = await walletB.getAddress(); 
    console.log('walletAddressB = ', walletAddressB.toString(true, true, true));

    newTsChannelId = ~~(Date.now() / 1000)
    console.log('id', newTsChannelId);
    channelConfig = {
        channelId: new BN(newTsChannelId),
        addressA: walletAddressA,
        addressB: walletAddressB,
        initBalanceA: channelInitState.balanceA,
        initBalanceB: channelInitState.balanceB
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


    //deploy
    await fromWalletA.deploy().send(toNano('0.05')).then(r => {console.log('deploy: ', r)});


    await delay(2*t);


    //topup
    await fromWalletA
    .topUp({coinsA: channelInitState.balanceA, coinsB: new BN(0)})
    .send(channelInitState.balanceA.add(toNano('0.1'))).then(console.log('A top up succesfull'));


    await delay(t);
    

    await fromWalletB
    .topUp({coinsA: new BN(0), coinsB: channelInitState.balanceB})
    .send(channelInitState.balanceB.add(toNano('0.1'))).then(console.log('B top up succesfull')); 
    

    await delay(t);
    
    
    //init
    await fromWalletA.init(channelInitState).send(toNano('0.1')).then(r => {console.log('init: ', r)});


    await delay(2*t);
    

    var data = await channelA.getData();
    console.log(data.state);
    console.log('balanceA = ', data.balanceA.toString());
    console.log('balanceB = ', data.balanceB.toString());

    validState = channelInitState;
}




const addState = async (balances, isA) => {
    if (balances[0] + balances[1] != validState.balanceA + validState.balanceB) {
        // error
        return;
    }

    const newState = {
        balanceA: toNano(balances[0]),
        balanceB: toNano(balances[1]),
        seqnoA: validState.seqnoA + 1*Number(isA),
        seqnoB: validState.seqnoB + 1*Number(~isA)
    }
    
    if (isA) {
        const signatureA1 = await channelA.signState(channelState1);
        if (!(await channelB.verifyState(channelState1, signatureA1))) {
            throw new Error('Invalid A signature');
        }
    }
    else {
        const signatureB1 = await channelB.signState(channelState1);
        if (!(await channelA.verifyState(channelState1, signatureB1))) {
            throw new Error('Invalid A signature');
        }
    }


    await delay(t);


    validState = newState;
}




const close = async () => {
    const signatureCloseB = await channelB.signClose(validState);
    if (!(await channelA.verifyClose(validState, signatureCloseB))) {
        throw new Error('Invalid B signature');
    }
    await fromWalletA.close({
        ...validState,
        hisSignature: signatureCloseB
    }).send(toNano('0.05'));
    return;
}