<?php
require_once('../../inc/config/config.php');

try {
    // connects to the database
    include(ROOT_PATH . 'inc/database/dbconn.php');

    // sql statement to get all categories
    $query = $conn->prepare('SELECT * FROM category;');
    $query->execute();

    // obtains results
    $array = $query->fetchAll(PDO::FETCH_ASSOC);
    $json  = json_encode($array);

    // returns the JSON category list
    echo $json;

}
catch (PDOException $e) {
    echo $e->getMessage();
}
?>
