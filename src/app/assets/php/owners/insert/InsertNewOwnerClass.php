<?php

class InsertNewOwnerClass
{
    private $_dbConn;

    function insertNewOwner($newOwnerData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO owner (firstname, lastname, company)
                  VALUES ('" . $newOwnerData['firstName'] . "', 
                          '" . $newOwnerData['lastName'] . "', 
                          '" . $newOwnerData['company'] . "')";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $ownerId = $conn->insert_id;

        $conn->close();
        echo json_encode([
            'ownerId' => $ownerId
        ]);
    }
}
