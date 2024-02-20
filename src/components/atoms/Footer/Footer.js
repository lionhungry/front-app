import React from 'react'
import { FooterSection } from '../../../constants/htmlTemplates'
import './FooterWrapper.scss';

const Footer = () => {
  return (
    <div id="footer_content">
         <div dangerouslySetInnerHTML={{ __html: FooterSection }} />
    </div>
  )
}

export default Footer;