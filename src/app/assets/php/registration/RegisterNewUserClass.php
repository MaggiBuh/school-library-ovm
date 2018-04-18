<?php

class RegisterNewUserClass
{
    private $_dbConn;

    function registerNewUser($userData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO user (username, lastname, firstname, email, role, class, password)
                  VALUES ('".$userData['userName']."', '".$userData['lastName']."', 
                          '".$userData['firstName']."','".$userData['email']."', 
                          '".$userData['role']."', '".$userData['userClass']."', 
                          '".$userData['password']."')";
        if ($conn->query($query) === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $conn->close();
    }
}