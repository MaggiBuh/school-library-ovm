<?php

class GetAuthorByBookIdClass
{
    private $_dbConn;

    function getAuthorByBookId($id)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT au.* 
                  FROM author AS au 
                  INNER JOIN author_book_relation AS abr 
                  ON au.id = abr.author_id 
                  INNER JOIN book AS b 
                  ON b.book_id = abr.book_id 
                  WHERE b.book_id = '$id'";

        $res = $conn->query($query);
        $author = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($author, $row);
            }
        }

        $conn->close();
        return $author;
    }
}
