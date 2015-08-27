<form id='configForm'>
   <fieldset>
      <legend>Configuration</legend>
      <div>
         <label for='storeName'>Name</label>
         <div>
            <input id='storeName' name='storeName' type='text'
               placeholder='yourshopname' required>
            <p>Enter a name for your online store.</p>
         </div>
      </div>
      <div>
         <label for='standardDelivery'>Standard Delivery(&pound;)</label>
         <div>
            <input id='standardDelivery' name='standardDelivery' type='text'
            required pattern='^\d*(\.\d{2}$)?'>
            <p>Enter the standard delivery charge.</p> 
         </div>
      </div>
      <div>
         <label for='setup'></label>
         <div>
            <button id='setup'>Setup</button>
         </div>
      </div>
   </fieldset>
</form>
<script src='js/ajax.js'></script>
<script src='js/setup.js'></script>
