import React from 'react'

function CartCard({item ,addorsubtotal , remove}) {
  return (
    <div className="cart-item" key={item.id}>
    <div className="cart-item__media">
                  <span className="cart-item__emoji">{item.emoji}</span>
                </div>

                <div className="cart-item__body">
                  <div className="cart-item__head">
                    <h3 className="cart-item__title">{item.title}</h3>
                    <span className="cart-item__price">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <p className="cart-item__desc">{item.desc}</p>

                  <div className="cart-item__foot">
                    <div className="qty-stepper">
                      <button type="button" className="qty-stepper__btn" onClick={()=>addorsubtotal("sub",item.id)}>
                        −
                      </button>
                      <span className="qty-stepper__val">{item.qty}</span>
                      <button type="button" className="qty-stepper__btn"  onClick={()=>addorsubtotal("add",item.id)}>
                        +
                      </button>
                    </div>

                    <button type="button" className="cart-item__remove" onClick={()=>remove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
   )
}

export default CartCard