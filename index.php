<?php
   if (!file_exists('inc/config/config.php')) {
   	include('inc/config/setup.php');
   	exit();
   }

   require_once('inc/config/config.php');

   include('inc/header.php');
   include('inc/navigation.php'); ?>
<h1 id='pageTitle'>All Products</h1>
<div id='container'>
   <div id='content'>
   </div>
</div>
<?php include('inc/footer.php'); ?>
<script src='js/htmlHelper.js'></script>
<script src='js/ajax.js'></script>
<script src='js/basket.js'></script>
<script src='js/store.js'></script>
<script src='js/style.js'></script>
