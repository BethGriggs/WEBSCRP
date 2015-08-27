<?php
require_once('../../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'POST':
        // defines an array of the valid extensions
        $extensions = array(
            '.jpg',
            '.jpeg',
            '.gif',
            '.png'
        );

        // get extension of the uploaded file
        $fileExtension = strrchr($_FILES['productImage']['name'], '.');

        // check if file Extension is on the list of allowed ones
        if (in_array($fileExtension, $extensions)) {
            // target file destination
    $destination = ROOT_PATH . 'cms/images/' . $_FILES['productImage']['name'];
    if (move_uploaded_file($_FILES['productImage']['tmp_name'], $destination)) {
                try {
                    // setup the connection
                    include(ROOT_PATH . 'inc/database/dbconn.php');

                    // sql to add a new product
                    $sql = "INSERT INTO `product` (`productID`, `productName`,
                       `productDesc`, `productPrice`, `productStock`,
                       `productSales`,`productImage`, `categoryName`) VALUES
                       (NULL, :productName, :productDesc, :productPrice,
                         :productStock, '0', :productImage, :categoryName);";

                    $query = $conn->prepare($sql);

                    // runs the query
                    $query->execute(array(
                        ':productName' => $_POST['productName'],
                        ':productDesc' => $_POST['productDesc'],
                        ':productPrice' => $_POST['productPrice'],
                        ':productStock' => $_POST['productStock'],
                        ':productImage' => $_FILES['productImage']['name'],
                        ':categoryName' => $_POST['categoryName']
                    ));

                    // obtains the query results
                    $array = $query->fetchAll(PDO::FETCH_ASSOC);

                    // encodes the results to a json string
                    $json = json_encode($array);
                }
                catch (PDOException $e) {
                    echo $e->getMessage();
                }

            }
        } else {
            echo 'HTTP ERROR 400 BAD REQUEST';
        }
        break;

    case 'DELETE':

        try {
            // setup the connection
            include(ROOT_PATH . 'inc/database/dbconn.php');

            $sql   = 'SELECT productImage FROM product WHERE productID=:productID';
            $query = $conn->prepare($sql);
            $query->execute(array(
                ':productID' => $_GET['productID']
            ));

            $imageResult = $query->fetch(PDO::FETCH_ASSOC);
            $filename    = ROOT_PATH . 'cms/images/' . $imageResult['productImage'];

            // deletes the product image
            if (file_exists($filename)) {
                unlink($filename);
            }

            // sql to delete the product from the database
            $sql   = 'DELETE FROM product WHERE productID=:productID';
            $query = $conn->prepare($sql);

            // deletes the product from the database
            $query->execute(array(
                ':productID' => $_GET['productID']
            ));
        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;

    case 'PUT':

        try {
            // setup the database connection
            include(ROOT_PATH . 'inc/database/dbconn.php');

            // sql statement to update a product
            $sql = 'UPDATE `product` SET `productName` = :productName,
                `productDesc` = :productDesc, `productPrice` = :productPrice,
                 `productStock` = :productStock, `categoryName` = :categoryName
                WHERE `product`.`productID` = :productID';

            $query = $conn->prepare($sql);

            // runs the query
            $query->execute(array(
                ':productName' => $_GET['productName'],
                ':productDesc' => $_GET['productDesc'],
                ':productPrice' => $_GET['productPrice'],
                ':productStock' => $_GET['productStock'],
                ':categoryName' => $_GET['categoryName'],
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
        break;

    default:
        header($method);
        break;
}
?>
