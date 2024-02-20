import React from 'react'

const CartPageEmptyState = () => {
  return (
    <div>
        <div id="shopify-section-cart-template" class="shopify-section"><section data-section-id="cart-template" data-section-type="cart" data-section-settings="{
            &quot;showShippingEstimator&quot;: false
            }" data-item-count="0"><div class="container">
                <div class="empty-state">
                    <div class="empty-state__icon"><svg focusable="false" width="81" height="70" viewBox="0 0 81 70">
                <g transform="translate(0 2)" stroke-width="4" stroke="#222021" fill="none" fill-rule="evenodd">
                    <circle stroke-linecap="square" cx="34" cy="60" r="6"></circle>
                    <circle stroke-linecap="square" cx="67" cy="60" r="6"></circle>
                    <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
                </g>
                </svg></div>

                    <p class="empty-state__heading heading h1">Votre panier est vide</p><div class="empty-state__button-container">
                    <a href="/collections/all" class="empty-state__button button button--primary">Découvrir nos produits</a>
                    </div>
                </div>
                </div></section>

        </div>
    </div>
  )
}

export default CartPageEmptyState