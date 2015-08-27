<?php
require_once('../../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'PUT':

        try {
            // setup the connection
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // sql statement to update product stock
            $sql = 'UPDATE `product` SET `productStock` = :productStock
         WHERE `product`.`productID` = :productID';

            $query = $conn->prepare($sql);

            // runs the query
            $query->execute(array(
                ':productStock' => $_GET['productStock'],
                ':productID' => $_GET['productID']
            ));

            // obtains the query results
            $array = $query->fetchAll(PDO::FETCH_ASSOC);

            // encodes the results to a json string
            $json = json_encode($array);
        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }

    default:
        header($method);
        break;
}
?>
