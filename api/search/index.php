<?php
require_once('../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'GET':
    try {

        include(ROOT_PATH . 'inc/database/dbconn.php');

        //get the value to search
        $key = $_GET['key'];

        //sql query to search for the product
        $query = $conn->prepare("SELECT * FROM `product`
                                          WHERE `productName` LIKE '{$key}%';");
        //executes the query
        $query->execute();

        $array = $query->fetchAll(PDO::FETCH_ASSOC);

        // returns the JSON response
        $json = json_encode($array);
        echo $json;

    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }
    default:
        header($method);
        break;
}
?>
