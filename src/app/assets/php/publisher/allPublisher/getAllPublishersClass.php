<?php

class GetAllPublishersClass
{
    private $_dbConn;

    function getAllPublishersWithOrderId()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT p.id AS publisher_id, p.name, pon.number 
                  FROM publisher AS p
                  INNER JOIN publisher_order_number AS pon
                  ON p.ordernumber_id = pon.id";

        $res = $conn->query($query);
        $publish = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($publish, $row);
            }
            if (count($publish) > 0) {
                $publish['error'] = false;
                echo json_encode($publish);
            } else {
                echo json_encode(
                    [
                        'error' => true,
                        'error_message' => 'Benutzer existiert nicht!'
                    ]
                );
            }
            $conn->close();
        }
    }
}
