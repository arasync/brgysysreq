<?php

if ($_SERVER["REQUEST_METHOD"] == "POST"){

    $email = $_POST['email'];
    $password = $_POST['password'];

    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "admin";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error){
        die("Connection Failed: ". $conn->connection_error);
    } 

    $query = "SELECT *FROM login WHERE email='$email' AND password = '$password'";

    $result = $conn->query($query);

    if($result->num_rows == 1){
        exit();
    }
    else{
        exit();
    }

    $conn->close();

}

?>