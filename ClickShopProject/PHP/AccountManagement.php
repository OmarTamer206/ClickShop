<?php


    if(isset($_GET["fn"])){
        $_GET["fn"]();
    }
 
    else if(isset($_POST["RD"])){
        switch ($_POST['RD']) {
            case 'AB':
                addBrand();
                break;
                case 'AS':
                    addSeller();
                    break;
                    
                
                case 'EP':
                    editProfile();
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
        $_SESSION["type"]="customer";
        
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
        $_SESSION["type"]="admin";

        
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
        $_SESSION["type"]="seller";

        
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
    $newRecordId= $conn->lastInsertId();
    session_start();
    $_SESSION["id"]=$newRecordId;
    $_SESSION["username"]=$row["c_name"];
    $conn=null;
}

function checkAuth(){

    session_start();

    if(isset($_SESSION["id"])){
        echo json_encode(["state"=>true]);
    }
    else{
        echo json_encode(["state"=>false]);

    }

}

function getUserType(){

    session_start();

    if(isset($_SESSION["type"])){
    echo json_encode(["type"=>$_SESSION["type"]]);

    }
    else{
    echo json_encode(["type"=>false]);

    }

}

function logout(){

    session_start();

    session_unset();
    session_regenerate_id(true); //delete old session id
    session_destroy();
    header("Location: ../index.html");

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
	$img_upload_path = '../Media/Brands/'.$new_img_name;
    move_uploaded_file($tmp_name, $img_upload_path);


    $sql = "INSERT INTO brand (b_name,b_profilePic)
    VALUES ('".$_POST["name"]."','".$new_img_name."');";
    $result = $conn->query($sql);
    $conn=null;
    header("Location: ../Admin/adminHome/adminhome.html");
}
function addSeller(){

    require('Database.php');

    

    $sql = "INSERT INTO seller (s_name,s_email,s_password)
    VALUES ('".$_POST["name"]."','".$_POST["email"]."','".$_POST["pass"]."');";
    $result = $conn->query($sql);
    $conn=null;
    header("Location: ../Admin/adminHome/adminhome.html");
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

function sendFeedback(){

    require('Database.php');
    session_start();
    $currentDateTime = new DateTime();
    $formattedDateTime = $currentDateTime->format('Y-m-d H:i:s');

    $sql = "INSERT INTO feedback (c_id,f_date,f_email,f_message)
    VALUES ('".$_SESSION["id"]."','".$formattedDateTime."','".$_GET["email"]."','".$_GET["message"]."');";
    $result = $conn->query($sql);
    $conn=null;
    header("Location: ../index.html");


}


function editProfile(){
    require('Database.php');
    session_start();
    
       

        $sql = "UPDATE customer SET c_name = '".$_POST["name"]."',c_email = '".$_POST["email"]."' , c_password = '".$_POST["pass"]."' , c_pNumber = '".$_POST["phone"]."', c_gender = '".$_POST["gender"]."' WHERE  c_id = '".$_SESSION["id"]."'";
        $result = $conn->query($sql);

   
        header("Location: ../index.html");

     

      
}


function getProfileData(){
    require('Database.php');
    session_start();
    
    

 
    $sql = "SELECT * FROM customer WHERE c_id = '".$_SESSION["id"]."' ";
     $result = $conn->query($sql);
    
     $row = $result->fetch();



     
     echo json_encode(["name"=>$row["c_name"],"email"=>$row["c_email"],"phone"=>$row["c_pNumber"],"gender"=>$row["c_gender"]]);
     exit;

     }



   
    



?>