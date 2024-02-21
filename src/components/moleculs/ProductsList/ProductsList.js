import React,{ useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import InputButton from '../../atoms/quantityInput/quantityInput';
import TotalCardPay from '../../atoms/TotalCardPay/TotalCardPay';
import {localStorageKey} from '../../../constants/variables';
import CartPageEmptyState from '../../atoms/CartPageEmptyState';
import'./ProductsListWrapper.scss';

const ProductsList = ({ products, disable }) => {
    const [value,setValue] = useState({data:products.data});

    const deleteItem = (indexToDelete) => {
        setValue(prevState => ({
            ...prevState,
            data: prevState.data.filter((_, index) => index !== indexToDelete)
        }));
    };

    const increment = (index)=>{
        value.data[index].quantity += 1
        setValue({...value,data:value.data})
    }

    const decrement = (index)=>{
        value.data[index].quantity -= 1  
        setValue({...value,data:value.data})
    }

    useEffect(()=>{
        if(value?.data.length === 0) {
            const element = ReactDOM.createRoot(document.getElementById('main'));
            if (element) {
               element.render(<CartPageEmptyState />);
            }
        }
        localStorage.setItem(localStorageKey, JSON.stringify(value.data));
        const countElement = document.querySelector('.header__cart-count');
        if (countElement) {
            countElement.innerHTML = value.data.length
        }
    },[value]);
    
  const calculateDiscount = (total)=>{
    const discount = total * 0.4;
    const discountedPrice = total - discount;
    return discountedPrice;
  };

  return (
    <div className='product_list_content'>
        <h1>{disable ? 'Vérifier':'Mon panier'}</h1>
        <div>
           {!disable && <TotalCardPay total={value.data.map(item=>{return ((item.price * item.quantity))}).reduce((acc, curr) => acc + parseFloat(curr), 0)}/>}
           <div className='product_card_list_content'>
                {
                    value.data.map((el,index)=>{
                        return (
                            <div key={index} className="product_card_list">
                                <img src={el.imageUrl} alt={el.title} />
                                <div className='cart_item_flex'>
                                    <div  className='top_content'>
                                        <p>{el.title} {el.productTemplateData}</p>
                                        <button onClick={()=>deleteItem(index)} >Supprimer</button>
                                    </div>
                                    <div  className='price_quantity'>
                                        <span>Prix : {!disable? (el.price * el.quantity) : calculateDiscount(el.price * el.quantity)}€</span>
                                        <InputButton el={el} index={index} increment={(e)=>increment(e)} decrement={(e)=>decrement(e)} disable={disable}/>
                                    </div>
                                </div>
                            </div>
                        )      
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ProductsList;