<?php

class GetAllGenreClass
{
    private $_dbConn;

    function getAllGenre()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT * FROM genre";

        $res = $conn->query($query);
        $genre = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($genre, $row);
            }
            if (count($genre) > 0) {
                echo json_encode($genre);
            } else {
                echo json_encode(
                    [
                        'error' => true,
                        'error_message' => 'Kene Genre in der Datenbank gespeichert!'
                    ]
                );
            }
        }

        $conn->close();
    }
}
