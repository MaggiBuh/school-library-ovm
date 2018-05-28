<?php

class InsertNewBookClass
{
    private $_dbConn;

    function insertNewBook()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT * FROM book";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $conn->close();
    }
}
