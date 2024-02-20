/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React,{ useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { fetchExternalData } from '../../helper/helper';
import FireLaoding from '../../components/atoms/fireLoading/FireLoading';
import ContactForm from  '../../components/atoms/ContactForm';
import './ContactPageWrapper.scss'
import Header from "../../components/atoms/Header/Header";
import Footer from "../../components/atoms/Footer/Footer";

const ProductDetailPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    
    const fetch = async(data) => {
      const response = await fetchExternalData(data);
      const htmlCode = response.replace('method="post" action="/contact#contact_form"', '').replace(/support@brasero-france.com/g,'support@brasero-fr.com')
      await setHtmlContent(htmlCode);
    }

    useEffect(() => {
      fetch({url:window.location.pathname});
    }, []);


   useEffect(() => {
      if(htmlContent){
        setTimeout(()=>{
          const element = ReactDOM.createRoot(document.getElementById('shopify-section-page-contact-template'));
            if (element) {
               element.render(<ContactForm />);
            }
        },1000)
      }
   },[htmlContent]);

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