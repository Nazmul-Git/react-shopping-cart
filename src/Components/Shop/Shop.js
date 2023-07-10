import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from './Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [shops,setShops]=useState([]);
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setShops(data))
    },[])

    const handleAddToCart=(product)=>{
        // console.log('clicked');
        console.log(product);
        const newCart=[...cart,product];
        setCart(newCart);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                  shops.map(product=><Product product={product} key={product.id} passFunction={handleAddToCart}></Product>)
                }
            </div>
            <div className="order-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;