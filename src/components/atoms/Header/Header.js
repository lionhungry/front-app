import React from 'react'
import { HeaderSection } from '../../../constants/htmlTemplates'
import './HeaderWrapper.scss';

const Header = () => {
  return (
    <div>
         <div dangerouslySetInnerHTML={{ __html: HeaderSection }} />
    </div>
  )
}

export default Header