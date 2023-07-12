import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from './Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {
    const [shops, setShops]=useState([]);
    const [cart, setCart]=useState([]);


    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setShops(data))
    },[])

    useEffect(()=>{
        const storedCart=getStoredCart();  //get local storage data . -> object {}
        const savedCart=[]; 
        for(const id in storedCart){  // storeCard object{} k,  loop kore- id paici
            // console.log(id);  
            const addedProduct=shops.find(product=>product.id===id);  //all datar modde find korteci and output hisebe product gulo object{..} hisebe pasci

            if(addedProduct){
                const quantity=storedCart[id];  //storedCard j gulo ace tar id er value ta quantity te rakhci
                addedProduct.quantity=quantity; // 23 line a addedProduct a j object pasci se object er object.quantity er value ta , set korteci storedCard er quantity k
                savedCart.push(addedProduct); //sob object gulo k abr ekta arrayr modde push kore disci
            }

        }
        setCart(savedCart);
    },[shops])     //dependency injection [shop] shop er upor depend korbe & shop er man joto bar change hobe toto bar call hobe.

    const handleAddToCart=(selectedProduct)=>{
        // console.log(selectedProduct);  //selectProduct ekta object
        let newCart=[];
        const exists=cart.find(product=>product.id===selectedProduct.id);
        if(!exists){
            selectedProduct.quantity=1;
            newCart=[...cart, selectedProduct];
        }
        else{
            exists.quantity+=1; 
            const rest= cart.filter(product=>product.id !== selectedProduct.id); 
            newCart=[...rest, exists];
        }

        setCart(newCart);  
        addToDb(selectedProduct.id);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                  shops.map(product=><Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="order-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;