<?php
require_once('../../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'POST':
        try {
            // connects to the database
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // prepares the insert statement to add a new category
            $sql = 'INSERT INTO `category` (`categoryId`, `categoryName`)
                   VALUES (NULL, :categoryName);';

            $query = $conn->prepare($sql);
            // runs the query
            $query->execute(array(
                ':categoryName' => $_POST['categoryName']
            ));

        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }

    case 'DELETE':
        try {
            // connects to the database
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // sql statement to delete a particular category
            $getNameSQL = 'SELECT categoryName FROM category
                   WHERE categoryId=:categoryId';
            $query      = $conn->prepare($getNameSQL);
            $query->execute(array(
                ':categoryId' => $_GET['categoryId']
            ));
            $categoryName = $query->fetch( PDO::FETCH_ASSOC )['categoryName'];

            $updateNameSQL = "UPDATE product SET categoryName = 'None'
                  WHERE categoryName=:categoryName";
            $query         = $conn->prepare($updateNameSQL);
            $query->execute(array(
                ':categoryName' => $categoryName
            ));

            // prepares the insert statement
            $deleteSQL = 'DELETE FROM category WHERE categoryId=:categoryId';
            $query     = $conn->prepare($deleteSQL);
            // runs the query
            $query->execute(array(
                ':categoryId' => $_GET['categoryId']
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
