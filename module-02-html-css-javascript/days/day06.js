

let Read_bill=450;
const bill=Number(Read_bill);
const partySize=2;

let paymentmethod='telebirr'

const tip=bill >300?bill *0.10 : bill * 0.05;

let total = bill + tip;
let split= total / partySize;
let servicefee;
switch(paymentmethod){
    case "telebirr":
             servicefee=1;
            total=total +servicefee;
        break;
    case "CBE":
             servicefee=10;
            total=total +servicefee;
        break;
}


// let message='total bill with servicefee and tip ${total}ETB. split bill amountpay${split}ETB';
console.log(`total bill with servicefee and tip ${total}ETB. split bill amountpay${split}ETB`)

