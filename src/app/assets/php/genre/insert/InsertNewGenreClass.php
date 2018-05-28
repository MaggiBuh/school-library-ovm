<?php

class InsertNewGenreClass
{
    private $_dbConn;

    function insertNewAuthor($newGenreData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO genre (name)
                  VALUES ('" . $newGenreData['name'] . "')";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $genreId = $conn->insert_id;

        $conn->close();
        echo json_encode([
            'genreId' => $genreId
        ]);
    }
}
