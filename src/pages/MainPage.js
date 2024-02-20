/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react';
import {MainPageContactSection} from '../constants/htmlTemplates';
import { fetchExternalData } from '../helper/helper';
import FireLaoding from '../components/atoms/fireLoading/FireLoading'
import Header from "../components/atoms/Header/Header";
import Footer from "../components/atoms/Footer/Footer";

const MainPage = () => {
    const [htmlContent, setHtmlContent] = useState(null);
    
    const fetch = async(data) => {
        const response = await fetchExternalData(data);
        await setHtmlContent(response);
        if(window.location.pathname === '/'){
            const element = document.querySelector('.mosaic.mosaic--medium.mosaic--three-columns');
            element ? element.innerHTML = MainPageContactSection : '';
        } 
    }

    useEffect(() => {
      fetch({url:window.location.pathname})
    }, [window.location.pathname]);

  return (
    <div>
       {htmlContent ? (
        <div>
          <Header/>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          {/* Render other data as needed */}
          <Footer/>
        </div>
      ) : (
        <FireLaoding/>
      )}
    </div>
  )
}

export default MainPage