<?php 

$dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'clickshop';

    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);



    // $sql = 'SELECT * FROM testinglines';
    // $result = $conn->query($sql);



?>