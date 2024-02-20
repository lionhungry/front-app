import React,{ useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { fetchExternalData,getStorageData } from '../../helper/helper';
import ProductList from '../../components/moleculs/ProductsList/ProductsList';
import Checkout from '../../components/moleculs/Checkout/Checkout';
import FireLaoding from '../../components/atoms/fireLoading/FireLoading';
import { Elements } from '@stripe/react-stripe-js';
import {STRIPE_KEY} from '../../configs/env-vars';
import { loadStripe } from '@stripe/stripe-js';
import './CheckoutPageWrapper.scss';
import Header from "../../components/atoms/Header/Header";
import Footer from "../../components/atoms/Footer/Footer";

const stripeTestPromise = loadStripe(STRIPE_KEY);

const CheckoutPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    const [products,setProduct] = useState({data:[]});

    const fetch = async(data) => {
      const response = await fetchExternalData(data);
      await setHtmlContent(response);
      const value = await getStorageData()
      setProduct({...products,data:value})
    }

    useEffect(() => {
       fetch({url:'/cart'})
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(()=>{
      if(products.data?.length && htmlContent){
        const element = ReactDOM.createRoot(document.getElementById('main'));
        // Check if the element exists
        if (element) {
          element.render(
            <div className='container'>
                <div className='checkout_content'>
                  <ProductList products={products} setProduct={setProduct} disable={true}/>
                  <Elements stripe={stripeTestPromise}>
                    <Checkout amount={products.data.map(item=>{return ((item.price * item.quantity))}).reduce((acc, curr) => acc + parseFloat(curr), 0)}/>
                  </Elements>
                </div>
            </div>
            );
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[products.data,htmlContent])

   return (
     <div>
        {htmlContent ? (
         <div>
           <Header/>
           <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
           <Footer/>
         </div>
       ) : (
        <FireLaoding/>
       )}
     </div>
   )
}

export default CheckoutPage;