<?php
require_once('../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'GET':
    try {
        // setup the connection
        include(ROOT_PATH . 'inc/database/dbconn.php');

        // obtains a particular product
        $sql   = 'SELECT * FROM product WHERE productID=:productID';
        $query = $conn->prepare($sql);

        // runs the query
        $query->execute(array(
            ':productID' => $_GET['productID']
        ));

        $array = $query->fetchAll(PDO::FETCH_ASSOC);

        // returns the JSON results
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
