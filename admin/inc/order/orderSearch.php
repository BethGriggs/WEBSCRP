<h1>Orders</h1>
<form id='dates'>
   <label for='startDate'>Start Date: </label>
   <input type='date' id='startDate' name='startDate' value='2015-01-01'>
                                                                        </input>
   <label for='endDate'>End Date: </label>
   <input type='date' id='endDate' name='endDate' value='<?php
      echo date('Y-m-d');
       ?>'></input>
   <input type='submit' id='reloadOrders' name='reloadOrders'
      class='content-btn' value='Reload'/>
</form>
<p class='centerAlign'>Sales in Period: <span id='totalSales'></span> </p>
<div id='tableDiv'></div>
