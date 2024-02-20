import axios from 'axios';
import emailjs from 'emailjs-com';
import {localStorageKey} from '../constants/variables';
import { API_ROOT } from '../configs/env-vars';

export const getStorageData = () =>{
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

const filterFormValue = (form)=>{
    const formData = new FormData(form);
    let id;
    let productId;
    let productTemplateData = []
     
    for (const [key, value] of formData.entries()) {
        // console.log(`${key}:${value}`,'value with key')
        if(key === 'product-id'){
            productId = value
        }else if(key.includes('product-template-')){
            productTemplateData.push(value)
        }else if(key==='id'){
            id = value
        }
    }
    productTemplateData = productTemplateData.join(" / ");
    return {productId,productTemplateData,id}
}

const setPrice = ({productId,productTemplateData})=>{
    const selectElement = document.getElementById(`product-select-${productId}`);
                
    if (selectElement) {
        let getTemplateAllData = false
        Array.from(selectElement.options).map(option => option.innerHTML.includes(productTemplateData) ? getTemplateAllData = option.innerHTML : '')  
       
        const price =  getTemplateAllData?.split(/\s-\s/)[1]?.split(',')[0] || 0;
        document.querySelector(".price").innerHTML = price+"€";
    } else {
        console.error('Select element with ID "mySelect" not found.');
    }
}

const getProductInfo = () => {
    let priceHtml = document.querySelector(".price").innerHTML
    const price = (priceHtml.split('</span>')[1] || priceHtml).split('€')[0].replace(/\./g, "")*1;
    const title = document.querySelector(".product-meta__title").innerHTML;
    const imageEL = document.querySelector(".product-gallery__image ");
    const imageUrl = imageEL.getAttribute('src');

    return {price,title,imageUrl}
}

export  const changeButtonAttr =()=>{
    let intervalId;
    function fetchData() {
        var formEl = document.querySelector('.product-form');
         if(formEl){
            clearInterval(intervalId);
            formEl.addEventListener('input', async (event) => {
                
                const { productId, productTemplateData } = await filterFormValue(event.target.form);
               
                await setPrice({productId,productTemplateData})
            });
            formEl.addEventListener('submit', async(event) => {
                event.preventDefault();       
                
                const { productId, productTemplateData,id } = await filterFormValue(event.target);
                const {price,title,imageUrl} = await getProductInfo({productId,productTemplateData})
                                            
                const data = {
                    id,
                    productId,
                    productTemplateData,
                    price,
                    title,
                    imageUrl,
                    quantity:1,
                }

                const value = JSON.parse(localStorage.getItem(localStorageKey)) || [];
               
                const checkItem = value.find(el=>(data.title === el.title && el.productTemplateData === data.productTemplateData));
                if(!checkItem){
                    value.push(data);
                }else{
                    value.map(el=>{
                        if(data.title === el.title && el.productTemplateData === data.productTemplateData){
                            el.quantity += 1
                        }
                        return el;
                    });
                }
               localStorage.setItem(localStorageKey, JSON.stringify(value));
               window.location.href = '/cart'; 
                
            });
        }
    }
    intervalId = setInterval(fetchData, 2000);
}

const sendNotification = ()=>{
    
    emailjs
      .send(
        'service_vn6b95c',
        'template_8cnl761',
        {
          server:false
        },
        'IzWQhwBBVxE78qkxH'
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Email failed to send:', error);
        }
      );
}

export  const fetchExternalData = async (data) => {
    try {
      const reqData = {
          method: 'post',
          url: `${API_ROOT}/scrape`,
          // headers: {}, 
          data: {
              ...data, // This is the body part https://brasero-france.com
          }
        };
      const response = await axios(reqData);
      const replacedHtmlContent = await response.data.replace(/data-src="([^"]*)"/g, 'src="$1"').replace(/\{width\}/g, '378').replace(/\/\/brasero-france\.com\/cdn/g, 'https://brasero-france.com/cdn');//.replace(/\+33756923679/g, '');
      return replacedHtmlContent;
    } catch (error) {
       sendNotification()
       console.log('error')
       console.error('Error fetching external data:');
    }
};