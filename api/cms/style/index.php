<?php
require_once('../../../inc/config/config.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case 'POST':
        try {
            // fie destination
            $file    = ROOT_PATH . 'css/style.php';
            // obtains file contents
            $current = file_get_contents($file);
            $json    = json_encode($_POST);
            // writes the JSON array to the file
            file_put_contents($file, $json);
        }
        catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;
    case 'DELETE':
        try {
            // file destination
            $file    = ROOT_PATH . 'css/style.php';
            $current = file_get_contents($file);
            // writes an empty JSON array to the file 
            $current = '{}';
            file_put_contents($file, $current);
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
