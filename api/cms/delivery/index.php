<?php
require_once('../../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'POST':
        try {
            // Connects to the database
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // prepares the insert statement to add a new delivery type
            $sql = 'INSERT INTO `delivery`
                  (`deliveryId`, `deliveryType`, `deliveryCost`)
                   VALUES (NULL, :deliveryType, :deliveryCost);';

            $query = $conn->prepare($sql);
            // runs the query
            $query->execute(array(
                ':deliveryType' => $_POST['deliveryType'],
                ':deliveryCost' => $_POST['deliveryCost']
            ));
        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }

    case 'DELETE':
        try {
            // connects to the database
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // prepares the delete statement to delete a delviery type
            $deleteSQL = 'DELETE FROM delivery WHERE
                            deliveryId=:deliveryId';

            $query = $conn->prepare($deleteSQL);
            // runs the query
            $query->execute(array(
                ':deliveryId' => $_GET['deliveryId']
            ));

        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }
    default:
        header($method);
        break;
}
?>
