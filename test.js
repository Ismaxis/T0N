const fs = require("fs");
const TonWeb = require("tonweb");
const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;



//fs.writeFileSync('./customer.json',JSON.stringify(prot));





//var obj2 = JSON.parse(fs.readFileSync("./customer.json"));


console.log(Number(fs.readFileSync("./deploy.txt", 'utf8')[0]));

// var obj = {
//     balanceA:
//     balanceB:
//     seqnoA:
//     seqnoB:
// }

// const customer = {
//     name: "Newbie Co.",
//     order_count: 0,
//     address: "Po Box City",
// }
// const jsonString = JSON.stringify(customer);
// fs.writeFile('./newCustomer.json', jsonString, err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Successfully wrote file')
//     }
// })
