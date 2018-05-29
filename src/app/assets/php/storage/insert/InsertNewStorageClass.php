<?php

class InsertNewStorageClass
{
    private $_dbConn;

    function insertNewStorage($newStorage)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO storage (name, type)
                  VALUES ('" . $newStorage['name'] . "', 
                          '" . $newStorage['type'] . "')";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $storageId = $conn->insert_id;

        $conn->close();
        echo json_encode([
            'storageId' => $storageId
        ]);
    }
}
