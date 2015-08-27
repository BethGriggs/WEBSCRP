<form id='checkoutForm'>
   <fieldset>
      <legend>Checkout</legend>
      <div>
         <label for='orderName'>Name</label>
         <div>
            <input id='orderName' name='orderName' type='text'
               placeholder='forename surname' required>
         </div>
      </div>
      <div>
         <label for='orderAddress'>First Line Address</label>
         <div>
            <input id='orderAddress' name='orderAddress' type='text'
               placeholder='first line address' required>
         </div>
      </div>
      <div>
         <label for='orderTown'>Town</label>
         <div>
            <input id='orderTown' name='orderTown' type='text'
            placeholder='town' required>
         </div>
      </div>
      <div>
         <label for='orderPostcode'>Postcode</label>
         <div>
            <input id='orderPostcode' name='orderPostcode' type='text'
               placeholder='AB12 3CD' required pattern=
  '[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?( |)[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}'>
         </div>
      </div>
      <div>
         <label for='orderEmail'>Email</label>
         <div>
            <input id='orderEmail' name='orderEmail' type='text' required
               placeholder='customer@example.com'
               pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'>
         </div>
      </div>
      <div>
         <label for='deliveryType'>Delivery</label>
         <div>
            <select id='deliveryType' name='deliveryType'>
            </select>
         </div>
      </div>
      <div>
         <label for='submitOrder'>Total to Pay: £
           <span id='withDelivery'></span>
         </label>
         <div>
            <button id='submitOrder' name='submitOrder' class='content-btn'>
              Submit Order
            </button>
         </div>
      </div>
   </fieldset>
</form>
