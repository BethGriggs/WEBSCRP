<?php
require_once('../../inc/config/config.php');

// if no parameters return all products
if ($_GET == null) {
    try {
        // connects to the database
        include(ROOT_PATH . 'inc/database/dbconn.php');

        // obtains all products
        $query = $conn->prepare('SELECT * FROM product;');
        $query->execute();

        $array = $query->fetchAll(PDO::FETCH_ASSOC);

        // returns the JSON results
        $json = json_encode($array);
        echo $json;


    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }
} else {
    try {
        // connects to the database
        include(ROOT_PATH . 'inc/database/dbconn.php');

        // sql to select all products from category
        $query = $conn->prepare('SELECT * FROM product
                                WHERE categoryName=:categoryName');
        // runs the query
        $query->execute(array(
            ':categoryName' => $_GET['categoryName']
        ));

        $array = $query->fetchAll(PDO::FETCH_ASSOC);

        //returns the JSON formatted results
        $json = json_encode($array);
        echo $json;

    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }
}
?>
