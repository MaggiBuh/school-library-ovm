<?php

class GetOwnerByBookOwnerIdClass
{
    private $_dbConn;

    function getOwnerByBookOwnerId($id)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT * FROM owner WHERE id = '$id'";

        $res = $conn->query($query);
        $owner = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($owner, $row);
            }
        }

        $conn->close();
        return $owner;
    }
}
