<?php

class GetAllPublisherClass
{
    private $_dbConn;

    function getAllPublisherWithOrderId()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT p.id, p.name, pon.id, pon.number
                  FROM publisher AS p
                  INNER JOIN publisher_order_number AS pon
                  ON p.ordernumber_id = pon.id";

        $res = $conn->query($query);
        $publisher = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($publisher, [
                    'publisher_id' => $row['p.id'],
                    'publisher_name' => $row['p.name'],
                    'publisher_order_number' => [
                        'order_id' => $row['pon.id'],
                        'order_number' => $row['pon.number']
                    ]
                ]);
            }
            if (count($publisher) > 0) {
                $publisher['error'] = false;
                echo json_encode($publisher);
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
