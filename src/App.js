/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {localStorageKey} from './constants/variables'
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import MainPage from './pages/MainPage';
import ContactPage from './pages/ContactPage/ContactPage'
import LivraisonPage from "./pages/LivraisonPage/LivraisonPage";
import './App.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [localStorageData, setLocalStorageData] = useState(JSON.parse(localStorage.getItem(localStorageKey))?.length || 0);

  useEffect(()=>{
    if(localStorageData){
        const checkForElement = () => {
          const countElement = document.querySelector('.header__cart-count');
          if (countElement) {
            countElement.innerHTML = localStorageData
          } else {
            setTimeout(checkForElement, 1000);
          }
        };
        checkForElement(); // Initial check
        // Clean up any ongoing timeouts when the component unmounts
        return () => {
          clearTimeout(checkForElement);
        };
    }
  },[localStorageData])
  
  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/products/:productName" element={<ProductDetailPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/pages/contact" element={<ContactPage/>} />
            <Route path="/pages/site-en-construction" element={<ContactPage/>} />
            <Route path="/pages/livraison-expedition" element={<LivraisonPage/>} />
            <Route path="*" element={<MainPage />} />
          </Routes> 
      </Router>
    </div>
  );
}

export default App;
