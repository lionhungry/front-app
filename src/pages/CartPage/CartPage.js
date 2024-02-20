import React,{ useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { fetchExternalData,getStorageData } from '../../helper/helper';
import ProductList from '../../components/moleculs/ProductsList/ProductsList';
import FireLaoding from '../../components/atoms/fireLoading/FireLoading';
import Header from "../../components/atoms/Header/Header";
import Footer from "../../components/atoms/Footer/Footer";
import './CartPageWrapper.scss'

const ProductDetailPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    const [products,setProduct] = useState({data:[]});
    const fetch = async(data) => {
         const response = await fetchExternalData(data);
         await setHtmlContent(response);
         const value = await getStorageData()
         setProduct({...products,data:value})
    }

    useEffect(() => {
      fetch({url:window.location.pathname})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
      if(products.data?.length && htmlContent){
        const element = ReactDOM.createRoot(document.getElementById('main'));
        if (element) {
          element.render(
              <div className='container product_total_content'>
                  <ProductList products={products} setProduct={setProduct}/>
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

export default ProductDetailPage