/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React,{ useState,useEffect } from 'react';
import { fetchExternalData } from '../../helper/helper';
import FireLaoding from '../../components/atoms/fireLoading/FireLoading';
import ContactForm from  '../../components/atoms/ContactForm';
import Header from "../../components/atoms/Header/Header";
import Footer from "../../components/atoms/Footer/Footer";
import './ContactPageWrapper.scss';

const ContactPage = () => {
   const [htmlContent, setHtmlContent] = useState(null);
    
    const fetch = async(data) => {
      const response = await fetchExternalData(data);
      await setHtmlContent(response);
    }

    useEffect(() => {
      fetch({url:window.location.pathname});
    }, []);

   return (
     <div>
        {htmlContent ? (
         <div>
           <Header/>
           <ContactForm/>
           <div style={{visibility:'hidden',display:'none'}} dangerouslySetInnerHTML={{ __html: htmlContent }} />
           <Footer/>
         </div>
       ) : (
         <FireLaoding/>
       )}
     </div>
   )
}

export default ContactPage