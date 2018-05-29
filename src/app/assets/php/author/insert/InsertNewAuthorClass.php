<?php

class InsertNewAuthorClass
{
    private $_dbConn;

    function insertNewAuthor($newAuthorData)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO author (firstname, lastname, email, website)
                  VALUES ('" . $newAuthorData['firstName'] . "', 
                          '" . $newAuthorData['lastName'] . "',
                          '" . $newAuthorData['email'] . "',
                          '" . $newAuthorData['website'] . "');";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $authorId = $conn->insert_id;

        $conn->close();
        echo json_encode([
            'authorId' => $authorId
        ]);
    }
}
