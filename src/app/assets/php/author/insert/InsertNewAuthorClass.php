<?php

class InsertNewAuthorClass
{
    private $_dbConn;

    function insertNewAuthor($newAuthorData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO author (firstname, lastname, email, website)
                  VALUES ('" . $newAuthorData['firstname'] . "', 
                          '" . $newAuthorData['lastname'] . "',
                          '" . $newAuthorData['email'] . "',
                          '" . $newAuthorData['website'] . "');";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $conn->close();
    }
}
