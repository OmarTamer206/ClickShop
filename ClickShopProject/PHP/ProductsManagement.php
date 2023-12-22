<?php


if(isset($_POST["RD"])){
    switch ($_POST['RD']) {
        case 'SAP':
            addProduct();
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







function addProduct(){

    require('Database.php');
    session_start();
    $img_name = $_FILES['img']['name'];
    $tmp_name = $_FILES['img']['tmp_name'];
     $new_img_name;
    $img_extension = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));

    $new_img_name = uniqid("IMG-", true).'.'.$img_extension;
	$img_upload_path = '../Media/ProductImages/'.$new_img_name;
    move_uploaded_file($tmp_name, $img_upload_path);

    $sql = "INSERT INTO product (p_name,p_image,p_description,p_price,p_qty,b_id,cat_id,s_id)
    VALUES ('".$_POST["name"]."','".$new_img_name."','".$_POST["desc"]."','".$_POST["price"]."','".$_POST["qty"]."','".$_POST["brand"]."','".$_POST["category"]."','".$_SESSION["id"]."');";
    $result = $conn->query($sql);
    $conn=null;
    header("Location: ../Seller/SellerPage/sellerhome.html");
}


function getBrandsAndCategories(){
    require('Database.php');

    $brands=[];
    $categories=[];

    $sql = "SELECT * FROM brand ";
    $result = $conn->query($sql);
    
    while($row = $result->fetch()){

        $brands[$row["b_id"]]=$row["b_name"];   
    }
    $sql = "SELECT * FROM category ";
    $result = $conn->query($sql);
    
    while($row = $result->fetch()){

        $categories[$row["cat_id"]]=$row["cat_name"];   
    }
    $conn=null;
    echo  json_encode(['categories' => $categories,'brands' => $brands]);
}


function getProductsOfSeller(){
    require('Database.php');
    session_start();
    if($_POST["direction"]=="asc"){
        $direction="ASC";
    }
    else{
        $direction="DESC";

    }

    $products=[];
    if($_POST["sort"]=="price"){
        // echo json_encode(["1"=>"2"]);
        $num=1;
       $sql = "SELECT * FROM product WHERE s_id = '".$_SESSION["id"]."' ORDER BY p_price ".$direction.";";
    }
    else if($_POST["sort"]=="ratings"){
        // echo json_encode(["3"=>"4"]);
        $num=2;
        $sql = "SELECT * FROM product WHERE s_id = '".$_SESSION["id"]."' ORDER BY p_rating ".$direction.";";
    }
    else if($_POST["sort"]=="date"){
        // echo json_encode(["5"=>"6"]);
        $num=3;
        $sql = "SELECT * FROM product WHERE s_id = '".$_SESSION["id"]."' ORDER BY p_id ".$direction.";";
    }
    
    
    $result = $conn->query($sql);
    $i=1;
    while($row = $result->fetch()){

        $products[$i++] = ["id"=>$row["p_id"],"name"=>$row["p_name"],"image"=>$row["p_image"],"rate"=>$row["p_rating"],"price"=>$row["p_price"]];   
    }

    echo json_encode(["products"=>$products ,"sort"=>$num,"dir"=>$direction]);
}

?>