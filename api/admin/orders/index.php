<?php
require_once('../../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'GET':
        try {

            // connects to the database
            include(ROOT_PATH . 'inc/database/dbconn.php');
            if (isset($_GET['startDate']) && isset($_GET['endDate'])) {

                // sql statement to get all orders between dates
                $sql   = 'SELECT * FROM `order` where `orderDate`
                  between :startDate and :endDate';
                $query = $conn->prepare($sql);
                // runs the query
                $query->execute(array(
                    ':startDate' => $_GET['startDate'],
                    ':endDate' => $_GET['endDate']
                ));
            } else {
                // sql statement to get all orders
                $sql   = 'SELECT * FROM `order`';
                $query = $conn->prepare($sql);

                // runs the query
                $query->execute();
            }
            $array = $query->fetchAll(PDO::FETCH_ASSOC);

            $json = json_encode($array);
            echo $json;
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
