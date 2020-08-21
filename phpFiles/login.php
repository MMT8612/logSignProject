<?php
     $username = $_POST['uname'];
     $password = $_POST['pwd'];

     $host = "127.0.0.1";
     $dbUsername = "root";
     $dbPassword = "";
     $dbname = "userInfo";

     $conn = new mysqli($host,$dbUsername,$dbPassword,$dbname);
     
     if(mysqli_connect_error()){
          die('Connect Error('.mysqli_connect_errno().')'.mysqli_connect_error());
     }
     else{
        $select = "SELECT username,password from user where username = ? and password = ?";

        $stmt = $conn->prepare($select);
        $stmt->bind_param("ss",$username,$password);
        $stmt->execute();
        $stmt->bind_result($username,$password);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if($rnum==0){
            echo "Username_or_Password_is_incorrect";
        }
        else{
            echo "Successfully Logged in";
        }

        $stmt->close();
        $conn->close();
     }
    
?>
