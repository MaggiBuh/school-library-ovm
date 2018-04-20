<?php

include('getBookUserRelationsByUserIdClass.php');

class getExistingLoginUserDataByUsernameAndPasswordClass
{
    private $_dbConn;

    function getCurrentUserDataByUserId($userData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $bookUserRelation = new GetBookUserRelationsByUserIdClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();
        $currentUserData = [];

        $query = "SELECT * FROM user WHERE username = '".$userData['userName']."' AND password = '".$userData['password']."'";
        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                $currentUserData = [
                    'user_id' => $row['user_id'],
                    'userName' => $row['username'],
                    'firstName' => $row['firstname'],
                    'lastName' => $row['lastname'],
                    'userClass' => $row['class'],
                    'role' => $row['role'],
                    'email' => $row['email'],
                ];
            }
            $currentUserData['books'] = $bookUserRelation->getCurrentUserDataByUserId($currentUserData['user_id']);
            if (count($currentUserData) > 0) {
                $currentUserData['error'] = false;
                echo json_encode($currentUserData);
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