<?php



 
    
    if(isset($_POST["RD"])){
        switch ($_POST['RD']) {
            case 'AB':
                addBrand();
                break;
                case 'AS':
                    addSeller();
                    break;
                    
                }
            }
        
        else{
$_POST = json_decode(file_get_contents('php://input'), true);

        if(isset($_POST["functionName"])){
        $_POST["functionName"]();
         }
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

function addAdmin(){

    require('Database.php');
    $sql = "INSERT INTO admin (a_name,a_email,a_phoneNumber,a_password,a_gender)
    VALUES ('".$_POST["userName"]."','".$_POST["userEmail"]."','".$_POST["userPhone"]."','".$_POST["userPass"]."','".$_POST["userGender"]."');";
    $result = $conn->query($sql);
    $conn=null;
}

function addBrand(){

    require('Database.php');

    $img_name = $_FILES['img']['name'];
    $tmp_name = $_FILES['img']['tmp_name'];
     $new_img_name;
    $img_extension = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));

    $new_img_name = uniqid("IMG-", true).'.'.$img_extension;
	$img_upload_path = '../Media/ProductImages/'.$new_img_name;
    move_uploaded_file($tmp_name, $img_upload_path);


    $sql = "INSERT INTO brand (b_name,b_profilePic,b_businessDescription)
    VALUES ('".$_POST["name"]."','".$new_img_name."','".$_POST["desc"]."');";
    $result = $conn->query($sql);
    $conn=null;
    header("Location: ../Admin/adminHome/adminhome.html");
}
function addSeller(){

    require('Database.php');

    $img_name = $_FILES['img']['name'];
    $tmp_name = $_FILES['img']['tmp_name'];
     $new_img_name;
    $img_extension = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));

    $new_img_name = uniqid("IMG-", true).'.'.$img_extension;
	$img_upload_path = '../Media/ProductImages/'.$new_img_name;
    move_uploaded_file($tmp_name, $img_upload_path);

    $sql = "INSERT INTO seller (s_name,s_profilePic,s_businessDescription,s_email,s_password)
    VALUES ('".$_POST["name"]."','".$new_img_name."','".$_POST["desc"]."','".$_POST["email"]."','".$_POST["pass"]."');";
    $result = $conn->query($sql);
    $conn=null;
    // header("Location: ../Admin/adminHome/adminhome.html");
}
function SaveImageOnServer(){
    
    // return $new_img_name;
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