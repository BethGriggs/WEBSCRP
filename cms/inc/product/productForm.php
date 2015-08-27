<form enctype='multipart/form-data' id='addProductForm'>
   <fieldset>
      <legend>Product Details</legend>
      <div>
         <label for='productName'>Name</label>
         <div>
            <input id='productName' name='productName' type='text' required>
         </div>
      </div>
      <div>
         <label for='productDesc'>Description</label>
         <div>
            <textarea id='productDesc' name='productDesc' required></textarea>
         </div>
      </div>
      <div>
         <label for='productImage'>Product Image:</label>
         <div>
            <input type='file' id='productImage' name='productImage' required
            accept='image/*' >
         </div>
      </div>
      <div>
         <label for='productPrice'>Price (£)</label>
         <div>
            <input id='productPrice' name='productPrice' type='text' required
               pattern='^\d*(\.\d{2}$)?'>
         </div>
      </div>
      <div>
         <label for='productStock'>Stock</label>
         <div>
            <input id='productStock' name='productStock' type='number' min='0'
            step='1' placeholder='0' required>
         </div>
      </div>
      <div>
         <label for='categoryName'>Category</label>
         <div>
            <select id='categoryName' name='categoryName'>
               <option>None</option>
            </select>
         </div>
      </div>
      <div>
         <input type='submit' id='submit' name='submit' value='Add Product'
            class='content-btn'/>
      </div>
      </p>
   </fieldset>
</form>
