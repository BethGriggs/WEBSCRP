<?php
$conn = new PDO('mysql:host=' . DB_HOST . ';', DB_USER,DB_PASS);
$conn->exec('USE '. DB_NAME);
