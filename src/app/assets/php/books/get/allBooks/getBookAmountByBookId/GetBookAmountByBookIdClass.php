<?php

class GetBookAmountByBookIdClass
{
    private $_dbConn;

    function getBookAmountByBookId($id)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT st.id, st.name, st.type, COUNT(bsr.storage_id) - COUNT(ubsr.book_id) AS current_amount, COUNT(bsr.storage_id) AS amount
                  FROM book_storage_relation AS bsr
                  INNER JOIN storage AS st
                  ON bsr.storage_id = st.id
                  LEFT JOIN user_book_storage_relation AS ubsr
                  ON ubsr.storage_id = st.id
                  WHERE bsr.book_id = '$id'
                  GROUP BY bsr.book_id, st.id";

        $res = $conn->query($query);
        $amount = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($amount, $row);
            }
        }

        $conn->close();
        return $amount;
    }
}


