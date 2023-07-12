import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart}=props;

    // console.log(cart);
    let total=0;
    let shipping=0;
    let quantity=0;
    for(const product of cart){
        quantity += product.quantity;
        total += product.price * product.quantity;
        shipping += product.shipping;
    }
    const tax=parseFloat((total*(10/100)).toFixed(2)); //toFixed korle string hoye jay rjanno parse float korteci
    const grandTotal=total+shipping+tax;
    return (
        <div className='order-container'>
            <h1>Order Summary</h1>
            <p>Selected Items : {quantity}</p>
            <p>Total Price : $ {total} </p>
            <p>Total Shipping : $ {shipping}</p>
            <p>Tax : $ {tax}</p>
            <h4>Grand Total = $ {(grandTotal).toFixed(2)}</h4>
        </div>
    );
};

export default Cart;