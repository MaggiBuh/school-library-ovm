<?php

class GetBookUserRelationsByUserIdClass
{
    private $_dbConn;

    function getCurrentUserDataByUserId($userId)
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();

        $query = "SELECT b.book_id, book_name, isbn, release_date, disk, imageurl, owner_id, publisher_id, website
                  FROM book AS b
                  INNER JOIN user_book_relation AS ub
                  ON b.book_id = ub.book_id 
                  INNER JOIN user AS u
                  ON ub.user_id = u.user_id 
                  WHERE u.user_id = '$userId'";

        $res = $conn->query($query);
        $bookUserRelationData = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($bookUserRelationData, [
                        'book_id' => $row['book_id'],
                        'bookName' => $row['book_name'],
                        'disk' => $row['disk'],
                        'imageUrl' => $row['imageurl'],
                        'isbn' => $row['isbn'],
                        'owner_id' => $row['owner_id'],
                        'publisher_id' => $row['publisher_id'],
                        'releaseDate' => $row['release_date'],
                        'website' => $row['website']
                    ]
                );
            }
        }

        $conn->close();
        return $bookUserRelationData;
    }
}