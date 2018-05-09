<?php

class GetStorageByBookIdClass
{
    private $_dbConn;

    function getStorageByBookId($id)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT st.* 
                  FROM storage AS st
                  INNER JOIN book_storage_relation AS bsr 
                  ON st.id = bsr.storage_id 
                  INNER JOIN book AS b 
                  ON b.book_id = bsr.book_id 
                  WHERE b.book_id = '$id'";

        $res = $conn->query($query);
        $storage = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($storage, $row);
            }
        }

        $conn->close();
        return $storage;
    }
}
