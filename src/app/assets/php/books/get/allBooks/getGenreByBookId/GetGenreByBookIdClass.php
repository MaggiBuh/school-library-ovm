<?php

class GetGenreByBookIdClass
{
    private $_dbConn;

    function getGenreByBookId($id)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT ge.* 
                  FROM genre AS ge 
                  INNER JOIN genre_book_relation AS gbr 
                  ON ge.id = gbr.genre_id 
                  INNER JOIN book AS b 
                  ON b.book_id = gbr.book_id 
                  WHERE b.book_id = '$id'";

        $res = $conn->query($query);
        $genre = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($genre, $row);
            }
        }

        $conn->close();
        return $genre;
    }
}
