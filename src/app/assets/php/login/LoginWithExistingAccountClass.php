<?php

class LoginWithExistingAccountClass
{
    private $_dbConn;

    function loginWithExistingAccount($loginData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $userName = $loginData['userName'];
        $password = $loginData['password'];

        $query = "SELECT * FROM user WHERE username = '$userName' AND password = '$password'";
        $res = $conn->query($query);

        $currentUser = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                $currentUser = $row;
            }
            if (count($currentUser) > 0) {
                $currentUser['error'] = false;
                echo json_encode($currentUser);
            } else {
                echo json_encode(
                    [
                        'error' => true,
                        'error_message' => 'Benutzer existiert nicht!'
                    ]
                );
            }
        }

        $conn->close();
        
        return;
    }
}