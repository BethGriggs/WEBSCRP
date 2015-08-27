<?php

require_once('../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'GET':
        try {
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // sql to get an order
            $sql = 'SELECT * FROM `order` WHERE `orderId` = :orderId';

            $query = $conn->prepare($sql);

            // runs the query
            $query->execute(array(
                ':orderId' => $_GET['orderId']
            ));

            $array = $query->fetchAll(PDO::FETCH_ASSOC);

            // returns the JSON formatted results
            $json = json_encode($array);
            echo $json;
        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;
    case 'POST':
        try {
            // setup the connection
            include(ROOT_PATH . 'inc/database/dbconn.php');

            $products = json_decode($_POST['orderProducts']);

            // sql to update the stock levels of all products in order
            foreach ($products as $product) {
                $productObj = get_object_vars(json_decode($product));
                $sql        = 'UPDATE `product` SET
                    `productStock` = `productStock` - :quantity,
                     `productSales` = `productSales` + :quantity
                      WHERE `product`.`productID` = :productID';

                $query = $conn->prepare($sql);

                // runs the query
                $query->execute(array(
                    ':productStock' => $productObj['productStock'],
                    ':quantity' => $productObj['quantity'],
                    ':productID' => $productObj['productID']
                ));
            }

            // sql to add a new order
            $sql = 'INSERT INTO `order` (`orderId`, `orderName`,
                    `orderAddress`, `orderTown`, `orderPostcode`, `orderEmail`,
                     `orderProducts`, `orderCost`, `orderDate`, `orderDelivery`)
                     VALUES (NULL, :orderName, :orderAddress, :orderTown,
                       :orderPostcode, :orderEmail, :orderProducts, :orderCost,
                        CURRENT_TIMESTAMP, :orderDelivery)';

            $query = $conn->prepare($sql);
            // runs the query
            $query->execute(array(
                ':orderName' => $_POST['orderName'],
                ':orderAddress' => $_POST['orderAddress'],
                ':orderTown' => $_POST['orderTown'],
                ':orderPostcode' => $_POST['orderPostcode'],
                ':orderEmail' => $_POST['orderEmail'],
                ':orderProducts' => $_POST['orderProducts'],
                ':orderCost' => $_POST['orderCost'],
                ':orderDelivery' => $_POST['orderDelivery']
            ));
        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;

    default:
        header($method);
        break;
}
?>
