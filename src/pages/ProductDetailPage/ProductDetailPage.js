/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React,{ useState,useEffect,useInsertionEffect } from 'react';
import { fetchExternalData, changeButtonAttr } from '../../helper/helper';
import FireLaoding from '../../components/atoms/fireLoading/FireLoading';
import Header from '../../components/atoms/Header/Header';
import Footer from "../../components/atoms/Footer/Footer";
import './ProductDetailWrapper.scss';

const ProductDetailPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    
    const fetch = async(data) => {
      const response = await fetchExternalData(data);
      // response.replace(/method="post" action="\/cart\/add"/g, '');
      const htmlCode = response.replace('method="post" action="/cart/add"', '');
      await setHtmlContent(htmlCode);
      await changeButtonAttr();
    };
    
    useInsertionEffect(()=>{
      fetch({url:window.location.pathname});
    },[])

    function handleClick(event) {
      // Prevent default behavior (e.g., following the link)
      event.preventDefault();
      
      // Get the href attribute value of the clicked <a> tag
      const href = this.getAttribute('data-image');
      document.querySelector('.product-gallery__image').src = href;

      
      const selectedImage = document.querySelector('.is-nav-selected');
      selectedImage.classList.remove('is-nav-selected');

      this.classList.add('is-nav-selected');
    };

   useEffect(() => {
      if(htmlContent){
        setTimeout(()=>{
          const thumbnails = document.querySelectorAll('.product-gallery__thumbnail-list a');
          const addCard = document.querySelector('.product-form__add-button');
          // Initialize an empty array to store href values
            if(thumbnails){
              // Loop through each <a> tag and extract the href attribute
              thumbnails.forEach((a) => {
                const href = a.getAttribute('href');
                a.setAttribute('data-image', href);
                a.removeAttribute('href');
                a.addEventListener('click', handleClick);
              });
            }
            if(addCard){
              addCard.style.setProperty("line-height", "25px", "important");
              addCard.innerHTML += `
                                      <div style="text-align: center;
                                      color: #ff3837;
                                      width: 100%;
                                      margin: 0px;
                                      ">
                                         <span>Réduction de</span>
                                         <span> 40%</span>
                                      </div>
                                    `
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