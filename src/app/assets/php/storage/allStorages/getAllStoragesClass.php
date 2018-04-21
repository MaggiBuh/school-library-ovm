<?php

class GetAllStoragesClass
{
    private $_dbConn;

    function getAllStorages()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT id, name, type FROM storage";

        $res = $conn->query($query);
        $storages = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($storages, $row);
            }
            if (count($storages) > 0) {
                $storages['error'] = false;
                echo json_encode($storages);
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
