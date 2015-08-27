<?php
require_once('../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'GET':
    try {
        // connects to the database
        include(ROOT_PATH . 'inc/database/dbconn.php');

        // sql to get all delivery options
        $query = $conn->prepare('SELECT * FROM delivery;');
        $query->execute();

        // obtains results
        $array = $query->fetchAll(PDO::FETCH_ASSOC);
        $json  = json_encode($array);

        // returns the JSON delivery list
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
