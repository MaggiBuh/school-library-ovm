<?php

class GetAllAuthorsClass
{
    private $_dbConn;

    function getAllAuthors()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT * FROM author";

        $res = $conn->query($query);
        $authors = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($authors, $row);
            }
            if (count($authors) > 0) {
                echo json_encode($authors);
            } else {
                echo json_encode(
                    [
                        'error' => true,
                        'error_message' => 'Benutzer existiert nicht!'
                    ]
                );
            }
        }

        $conn->close();
    }
}
