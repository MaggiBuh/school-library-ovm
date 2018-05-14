<?php

class GetAllOwnersClass
{
    private $_dbConn;

    function getAllOwner()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT * FROM owner";

        $res = $conn->query($query);
        $owner = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($owner, $row);
            }
            if (count($owner) > 0) {
                echo json_encode($owner);
            } else {
                echo json_encode(
                    [
                        'error' => true,
                        'error_message' => 'Kene Owner in der Datenbank gespeichert!'
                    ]
                );
            }
        }

        $conn->close();
    }
}
