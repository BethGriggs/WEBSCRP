<form enctype='multipart/form-data' id='addDeliveryForm'>
   <fieldset>
      <legend>Delivery Method</legend>
      <div>
         <label for='deliveryType'>Type</label>
         <div>
            <input id='deliveryType' name='deliveryType' type='text' required>
         </div>
      </div>
      <div>
         <label for='deliveryCost'>Delivery Cost (£)</label>
         <div>
            <input id='deliveryCost' name='deliveryCost' type='text' required
               pattern='^\d*(\.\d{2}$)?'>
         </div>
      </div>
      <div>
         <div>
            <input type='submit' id='submit' name='submit' class='content-btn'
                                                        value='Add Delivery' />
         </div>
      </div>
   </fieldset>
</form>
