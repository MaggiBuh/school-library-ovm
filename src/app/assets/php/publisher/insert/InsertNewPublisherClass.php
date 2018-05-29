<?php

class InsertNewPublisherClass
{
    private $_dbConn;

    function insertNewPublisher($newPublisher)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "INSERT INTO publisher_order_number (number) 
                  VALUES ('" . $newPublisher['orderNumber'] . "')";

        $res = $conn->query($query);
        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $orderNumberId = $conn->insert_id;

        $query = "INSERT INTO publisher (name, website, email, phonenumber, ordernumber_id)
                  VALUES ('" . $newPublisher['name'] . "', 
                          '" . $newPublisher['website'] . "',
                          '" . $newPublisher['email'] . "',
                          '" . $newPublisher['phoneNumber'] . "',
                          $orderNumberId)";

        $res = $conn->query($query);

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        $publisherId = $conn->insert_id;

        $conn->close();
        echo json_encode([
            'publisherId' => $publisherId
        ]);
    }
}
