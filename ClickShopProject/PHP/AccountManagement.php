<?php

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST["functionName"])){
    $_POST["functionName"]();
}



function login(){
    require('Database.php');
    $sql = "SELECT * FROM customer WHERE c_email = '".$_POST["userEmail"]."' AND c_password = '".$_POST["userPass"]."'";
    $result = $conn->query($sql);
    
    if($row = $result->fetch()){
        session_start();
        $_SESSION["id"]=$row["c_id"];
        $_SESSION["username"]=$row["c_name"];
        
        $conn=null;
        echo  json_encode(['state' => "user"]);
    
    }
    else{
        $sql = "SELECT * FROM admin WHERE a_email = '".$_POST["userEmail"]."' AND a_password = '".$_POST["userPass"]."'";
        $result = $conn->query($sql);
    
        if($row = $result->fetch()){
        session_start();
        $_SESSION["id"]=$row["a_id"];
        $_SESSION["username"]=$row["a_name"];
        
        $conn=null;
        echo  json_encode(['state' => "admin"]);
        
        
    }
    else{
        $sql = "SELECT * FROM seller WHERE s_email = '".$_POST["userEmail"]."' AND s_password = '".$_POST["userPass"]."'";
        $result = $conn->query($sql);
    
        if($row = $result->fetch()){
        session_start();
        $_SESSION["id"]=$row["s_id"];
        $_SESSION["username"]=$row["s_name"];
        
        $conn=null;
        echo  json_encode(['state' => "seller"]);
        
        
    
    }
    else{

        $conn=null;
        echo json_encode(['state' => false]);
    }
    }
    }
}

function signupUser(){

    require('Database.php');
    $sql = "INSERT INTO customer (c_name,c_email,c_pNumber,c_password,c_gender)
    VALUES ('".$_POST["userName"]."','".$_POST["userEmail"]."','".$_POST["userPhone"]."','".$_POST["userPass"]."','".$_POST["userGender"]."');";
    $result = $conn->query($sql);
    $conn=null;
}

function checkEmail(){
    
    require('Database.php');
    $sql = "SELECT * FROM customer WHERE c_email = '".$_POST["userEmail"]."'";
    $result = $conn->query($sql);

    if(!$result->fetch()){
        $sql = "SELECT * FROM admin WHERE a_email = '".$_POST["userEmail"]."'";
        $result = $conn->query($sql);

        if(!$result->fetch()){
            $sql = "SELECT * FROM seller WHERE s_email = '".$_POST["userEmail"]."'";
            $result = $conn->query($sql);

            if(!$result->fetch()){
            $conn=null;

            echo  json_encode(['exist' => false]);
    
    }
    else{

        $conn=null;
        echo json_encode(['exist' => true]);
    }
           
    
    }
    else{

        $conn=null;
        echo json_encode(['exist' => true]);
    }
        
    
    }
    else{

        $conn=null;
        echo json_encode(['exist' => true]);
    }

}




?>