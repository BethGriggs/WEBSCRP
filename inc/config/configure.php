<?php
$host = 'localhost';  //standard hostname
$username = 'root';       //standard username
$password = '';           //standard password
$db = "cms_".uniqid();    // assigns a unique id so unlikely to clash

$storeName = $_POST['storeName'];
try {
  $conn= new PDO("mysql:host=$host;", $username,$password);
  //creates the database if it does not exist
  $conn->exec("CREATE DATABASE IF NOT EXISTS $db;");
  // uses the specified database
  $conn->exec("USE $db");

  // creates the product table
  $productTable = "CREATE TABLE IF NOT EXISTS `product` (
    `productID` int(11) NOT NULL AUTO_INCREMENT,
    `productName` varchar(40) NOT NULL,
    `productDesc` text NOT NULL,
    `productPrice` decimal(10,2) NOT NULL,
    `productStock` int(10) unsigned NOT NULL,
    `productSales` int(11) NOT NULL DEFAULT '0',
    `productImage` varchar(75) DEFAULT NULL,
    `categoryName` varchar(25) DEFAULT NULL,

    PRIMARY KEY (`productID`),
    UNIQUE KEY `productName` (`productName`)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;" ;

  $conn->exec($productTable);

  // creates the category table
  $categoryTable = "CREATE TABLE IF NOT EXISTS `category` (
    `categoryId` int(11) NOT NULL AUTO_INCREMENT,
    `categoryName` varchar(25) NOT NULL,
    PRIMARY KEY (`categoryId`),
    UNIQUE KEY `categoryName` (`categoryName`)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";

  $conn->exec($categoryTable);

  // creates the order table
  $orderTable = "CREATE TABLE IF NOT EXISTS `order` (
    `orderId` int(11) NOT NULL AUTO_INCREMENT,
    `orderName` varchar(50) NOT NULL,
    `orderAddress` varchar(40) NOT NULL,
    `orderTown` varchar(30) NOT NULL,
    `orderPostcode` varchar(8) NOT NULL,
    `orderEmail` varchar(50) NOT NULL,
    `orderProducts` text NOT NULL,
    `orderCost` decimal(10,2) NOT NULL,
    `orderDate` date NOT NULL,
    `orderDelivery` varchar(50) NOT NULL,
    PRIMARY KEY (`orderId`)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";

   $conn->exec($orderTable);

   // creates the delivery table
   $deliveryTable = "CREATE TABLE IF NOT EXISTS `delivery` (
     `deliveryId` int(11) NOT NULL AUTO_INCREMENT,
     `deliveryType` varchar(50) DEFAULT NULL,
     `deliveryCost` decimal(10,2) NOT NULL,
     PRIMARY KEY (`deliveryId`)
   ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1";

   // adds standard delivery charge
   $standardDelivery = "INSERT INTO `delivery`
   (`deliveryId`, `deliveryType`, `deliveryCost`)
   VALUES (NULL, 'Standard', :standardDelivery)";

   $conn-> exec($deliveryTable);
   $query = $conn->prepare($standardDelivery);
   $query->execute(Array(':standardDelivery'=>$_POST['standardDelivery']));

    // creates the config file
   $file = "config.php";

   $data = '<?php
    define("LOCATION","' .$_POST['location']. '");
    // database settings
    define("ROOT_PATH",$_SERVER["DOCUMENT_ROOT"] . LOCATION);
   	define("DB_HOST","' . $host. '");
   	define("DB_USER","' .$username. '");
   	define("DB_PASS","' .$password. '");
    define("DB_NAME","' .$db. '");
    // user specified name
   	define("STORE_NAME", "' .$storeName. '");';

   file_put_contents($file, $data);
 }
   catch(PDOException $e)
   {
     echo $e->getMessage();
   }
?>
