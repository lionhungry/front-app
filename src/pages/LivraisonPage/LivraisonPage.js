/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React,{ useState,useEffect } from 'react';
import { fetchExternalData } from '../../helper/helper';
import FireLaoding from '../../components/atoms/fireLoading/FireLoading';
import Livraison from  '../../components/atoms/Livrasion';
import Header from "../../components/atoms/Header/Header";
import Footer from "../../components/atoms/Footer/Footer";
import './LivraisonPageWrapper.scss';

const LivraisonPage = () => {
   const [htmlContent, setHtmlContent] = useState(null);
    
    const fetch = async(data) => {
      const response = await fetchExternalData(data);
      const htmlCode = response.replace('method="post" action="/contact#contact_form"', '').replace(/support@brasero-france.com/g,'support@brasero-fr.com')
      await setHtmlContent(htmlCode);
    }

    useEffect(() => {
      fetch({url:window.location.pathname});
    }, []);

   return (
     <div>
        {htmlContent ? (
         <div>
           <Header/>
           <Livraison/>
           <div style={{visibility:'hidden',display:'none'}} dangerouslySetInnerHTML={{ __html: htmlContent }} />
           <Footer/>
         </div>
       ) : (
         <FireLaoding/>
       )}
     </div>
   )
}

export default LivraisonPage