import React,{useState,useEffect} from 'react';
import { useForm } from "react-cool-form";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { payment } from '../../../services/stripe';
import useApiCall from '../../../hooks/useApiCall';
import './CheckoutWrapper.scss';

const CARD_OPTIONS = {
  iconStyle: 'solid',
   style: {
     base: {
       iconColor: 'gray',
       color: 'black',
       fontWeight: 500,
       fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
       fontSize: '16px',
       border:'5px solid red',
       fontSmoothing: 'antialiased',
       ':-webkit-autofill': { color: 'black' },
       '::placeholder': { color: 'black' },
     },
     invalid: {
       iconColor: 'black',
       color: 'black',
     },
   },
 };

const Checkout = ({amount}) => {
  const [message, setMessage] = useState({message: '', success: false});
  const [error, setError] = useState(null);
  const [discount,setDiscount] = useState(0)
  
  const stripe = useStripe();
  const elements = useElements();
  const [requestCall, , , response] = useApiCall(payment);

  useEffect(()=>{
    if(amount){
        const discount = amount * 0.4;
        const discountedPrice = amount - discount;
        setDiscount(discountedPrice)
    }
   },[amount]);

  const { form, use } = useForm({
    // defaultValues: { 
    //   adressEmail: "123",
    //   adresse: "123",
    //   appartement: "123",
    //   codePostal: "123",
    //   country: "France",
    //   nom: "123",
    //   prenom: "123",
    //   telephone: "123",
    //   ville: "123" 
    // },
    defaultValues: { 
      adressEmail: "",
      adresse: "",
      appartement: "",
      codePostal: "",
      country: "France",
      nom: "",
      prenom: "",
      telephone: "",
      ville: "" 
    },
    onSubmit: async(values) =>{
      setMessage({...message,message: '', success: false})
      if (!stripe || !elements) {
        return;
      }
 
      
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
      });
  
      if (error) {
        setError(error.message);
      } else {
        setError(null);
        const { id } = paymentMethod;
        requestCall({ ...values, amount:discount, id });
      }
    } 
  });

  const errors = use("errors");
 
  useEffect(() => {
    if (response?.success) {
      // eslint-disable-next-line no-console
      console.log('Successful payment');
      setMessage({...message,...response});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  
  const labelDeafultColor = '#d6d3d3';
  const errorColor = '#a82a2a';
  const successColor = 'rgb(100, 160, 100)';

  return (
      <div className="checkout_header_content">
          <form ref={form} noValidate>
              <div className="checkout_title">Contact</div>
              <div className="checkout_label_text" style={{color:`${errors.adressEmail  ? errorColor : labelDeafultColor}`}}>Adresse e-mail*</div>
              <div>
                <input name="adressEmail" placeholder="Adresse e-mail" required style={errors.adressEmail  ? { border:"1px solid rgb(229, 77, 66)" } : null} />
              </div>
              <div className="checkout_label_text" style={{color:`${errors.telephone  ? errorColor : labelDeafultColor}`}}>Téléphone*</div>
              <div>
                <input name="telephone" placeholder="Téléphone" required style={errors.telephone  ? { border:"1px solid rgb(229, 77, 66)" } : null}/>
              </div>
              <div className="checkout_title" >Livraison</div>
              <div className="checkout_label_text" style={{color:`${errors.country  ? errorColor : labelDeafultColor}`}}>Pays/région*</div>
              <select name="country" defaultValue='France'>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
              </select>
              <div className="checkout_label_text" style={{color:`${errors.prenom  ? errorColor : labelDeafultColor}`}}>Prénom (optionnel)</div>
              <div>
                <input name="prenom" placeholder="Prénom (optionnel)" />
              </div>
              <div className="checkout_label_text" style={{color:`${errors.nom  ? errorColor : labelDeafultColor}`}}>Nom*</div>
              <div>
                <input name="nom" placeholder="Nom" required style={errors.nom  ? { border:"1px solid rgb(229, 77, 66)" } : null}/>
              </div>
              <div className="checkout_label_text" style={{color:`${errors.adresse  ? errorColor : labelDeafultColor}`}}>Adresse*</div>
              <div>
                <input name="adresse" placeholder="Adresse" required style={errors.adresse  ? { border:"1px solid rgb(229, 77, 66)" } : null}/>
              </div>
              <div className="checkout_label_text" style={{color:`${errors.appartement  ? errorColor : labelDeafultColor}`}}>Appartement, suite, etc. (optionnel)</div>
              <div>
                <input name="appartement" placeholder="Appartement, suite, etc. (optionnel)" />
              </div>
              <div className="checkout_label_text" style={{color:`${errors.codePostal  ? errorColor : labelDeafultColor}`}}>Code postal*</div>
              <div>
                <input name="codePostal" placeholder="Code postal" required style={errors.codePostal  ? { border:"1px solid rgb(229, 77, 66)" } : null} />
              </div>
              <div className="checkout_label_text" style={{color:`${errors.ville  ? errorColor : labelDeafultColor}`}}>Ville*</div>
              <div>
                <input name="ville" placeholder="Ville" required style={errors.ville  ? { border:"1px solid rgb(229, 77, 66)" } : null} />
              </div>
              <div className="checkout_title">Mode d'expédition</div>
              <div className="checkout_expedition">
                <span>Livraison Standard offerte (5 à 12 jours)</span>
                <span>Gratuit</span>
              </div>
              <div className="checkout_title">Paiement</div>
              <h4 style={{marginBottom:'2px', color:labelDeafultColor}}>Toutes les transactions sont sécurisées et chiffrées.</h4>
              <div className='checkout_cardPay_content'>
                <div className="form-row">
                    <label htmlFor="cardNumber">
                      Numéro de carte
                      <CardNumberElement
                        id="cardNumber"
                        options={CARD_OPTIONS}
                      />
                    </label>
                </div>
                <div className="form-row">
                  <label htmlFor="cardExpiry">
                    Date d'expiration (MM/AA)
                    <CardExpiryElement
                      id="cardExpiry"
                      options={CARD_OPTIONS}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label htmlFor="cardCvc">
                    Code de sécurité
                    <CardCvcElement
                      id="cardCvc"
                      options={CARD_OPTIONS}
                    />
                  </label>
                </div>
                {error && <div className="error-message" >{error}</div>}
                <div className="success-message" style={{color:`${message.success? successColor : errorColor}`}}>{message.message}</div>
              </div>
              <input type="submit"  value={`Payer ${discount.toFixed(2)}€`}/>
          </form>
      </div>
  )
};

export default Checkout;
