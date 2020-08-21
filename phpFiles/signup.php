<?php
     $firstName = $_POST['fname'];
     $lastName = $_POST['lname'];
     $username = $_POST['uname'];
     $password = $_POST['pwd'];

     $host = "127.0.0.1";
     $dbUsername = "root";
     $dbPassword = "France@90";
     $dbname = "userInfo";

     $conn = new mysqli($host,$dbUsername,$dbPassword,$dbname);
     
     if(mysqli_connect_error()){
          die('Connect Error('.mysqli_connect_errno().')'.mysqli_connect_error());
     }
     else{
          $select = "SELECT username from user where username = ? Limit 1";
          $insert = "INSERT Into user (firstName,lastName,username,password) values (?,?,?,?)";

          $stmt = $conn->prepare($select);
          $stmt->bind_param("s",$username);
          $stmt->execute();
          $stmt->bind_result($username);
          $stmt->store_result();
          $rnum = $stmt->num_rows;

          if($rnum==0){
               $stmt->close();

               $stmt = $conn->prepare($insert);
               $stmt->bind_param("ssss",$firstName,$lastName,$username,$password);
               $stmt->execute();
               echo "New record inserted successfully";
          }
          else{
               echo "Username_already_exists";
          }
          $stmt->close();
          $conn->close();

     }
    
?>