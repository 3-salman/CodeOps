



const withVat=(amount , vatRate=0.15)=>amount * vatRate;

const format=amount=>`${amount.tofixed(2)} ETB`;

const total=items => items.reduce( (sum , {price , qty} )=> sum + price * qyt , 0 );


reduce(){
    call={price , qty} )=> sum + price * qyt;
}