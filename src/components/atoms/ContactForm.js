import React, { useState } from 'react'

const ContactForm = () => {
  const [success,setSuccess] = useState(false);

  return (
    <div>
        <div id="shopify-section-page-contact-template" className="shopify-section">
            <div className="container container--narrow">
  <header className="page__header page__header--stack page__header--centered">
    <h1 className="page__title heading h1">Contactez nous!</h1>
    <div className="page__description rte">
        <p><meta charSet="utf-8"/>
        <span>Si vous avez des questions ou des suggestions concernant nos services et nos produits, vous pouvez remplir le formulaire en-dessous. Nous ferons de notre mieux pour vous répondre dans les plus brefs délais.</span></p>
        <p><strong>Email</strong> : support@brasero-fr.com</p>
      </div></header>
</div>

<div className="container container--medium">
  <div className="layout">
    <div className="layout__section"><div>
            <input type="hidden" name="form_type" value="contact"/>
            <input type="hidden" name="utf8" value="✓"/>
            <div className="form__header">
                <h2 className="heading h3">Leave your message</h2>
            </div>
            <div className="form__input-row">
            <div className="form__input-wrapper form__input-wrapper--labelled">
                <input id="contact-form-name" type="text" className="form__field form__field--text " name="contact[name]" aria-label="Votre nom" required=""/>
                <label htmlFor="contact-form-name" className="form__floating-label">Votre nom</label>
            </div>
            <div className="form__input-wrapper form__input-wrapper--labelled">
                <input id="contact-form-email" type="email" className="form__field form__field--text " name="contact[email]" aria-label="Votre email" required=""/>
                <label htmlFor="contact-form-email" className="form__floating-label">Votre email</label>
            </div>
            </div>
            <div className="form__input-wrapper form__input-wrapper--labelled">
                <textarea id="contact-form-message" name="contact[body]" rows="8" className="form__field form__field--textarea" aria-label="Votre message" required=""></textarea>
                <label htmlFor="contact-form-message" className="form__floating-label">Votre message</label>
            </div>
            {
                success
                ?
                <div>
                    <div style={{fontSize:'20px',fontWeight:'bold'}}>Envoyée</div>
                </div>
                :
                <button className="form__submit  button button--primary button--min-width" onClick={()=>success?setSuccess(false):setSuccess(true)}>Envoyer</button>
            }
            </div>
            </div>
            <div className="layout__section layout__section--large-secondary">
            <div className="contact__store-info">
                <h2 className="contact__store-heading heading h3">Find us</h2>
                <div className="contact__store-text rte">
              <p>Address:</p>
              <p>Liszt Ferenc Ter 2, 2 em 1<br></br> Budapest 1061 <br></br> Hungary</p>
            </div>
            </div>
            </div>
            </div>
</div>

</div>
         
    </div>
  )
}

export default ContactForm;