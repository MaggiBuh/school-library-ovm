<?php

class GetPublisherByBookPublisherIdClass
{
    private $_dbConn;

    function getOwnerByBookPublisherId($id)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT * FROM publisher WHERE id = '$id'";

        $res = $conn->query($query);
        $publisher = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($publisher, $row);
            }
        }

        $conn->close();
        return $publisher;
    }
}
