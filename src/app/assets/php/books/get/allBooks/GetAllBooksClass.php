<?php

include('getAuthorByBookId/GetAuthorByBookIdClass.php');
include('getGenreByBookId/GetGenreByBookIdClass.php');
include('getOwnerByBookOwnerId/GetOwnerByBookOwnerIdClass.php');
include('getPublisherByBookPublisherId/GetPublisherByBookPublisherIdClass.php');
include('getBookAmountByBookId/GetBookAmountByBookIdClass.php');

class GetAllBooksClass
{
    private $_dbConn;

    function getAllBooks()
    {
        $this->_dbConn = new GetDatabaseConnectionClass();
        $conn = $this->_dbConn->getDBConnectionAndCheckIfFailed();
        $authorData = new GetAuthorByBookIdClass();
        $genreData = new GetGenreByBookIdClass();
        $ownerData = new GetOwnerByBookOwnerIdClass();
        $publisherData = new GetPublisherByBookPublisherIdClass();
        $bookAmount = new GetBookAmountByBookIdClass();

        $query = "SELECT * FROM book";

        $res = $conn->query($query);
        $books = [];

        if ($res === FALSE) {
            echo "Error: " . $query . "<br>" . $conn->error;
        } else {
            foreach ($res as $row) {
                array_push($books, [
                    'bookId' => $row['book_id'],
                    'BookName' => $row['book_name'],
                    'isbn' => $row['isbn'],
                    'bookDescription' => $row['description'],
                    'releaseDate' => $row['release_date'],
                    'imageUrl' => $row['imageurl'],
                    'disk' => $row['disk'],
                    'website' => $row['website'],
                    'storage' => $bookAmount->getBookAmountByBookId($row['book_id']),
                    'genre' => $genreData->getGenreByBookId($row['book_id']),
                    'publisher' => $publisherData->getOwnerByBookPublisherId($row['publisher_id']),
                    'owner' => $ownerData->getOwnerByBookOwnerId($row['owner_id']),
                    'author' => $authorData->getAuthorByBookId($row['book_id']),
                ]);
            }
            if (count($books) > 0) {
                echo json_encode($books);
            } else {
                echo json_encode(
                    [
                        'error' => true,
                        'error_message' => 'Keine Bücher in der Databank gespeichert!'
                    ]
                );
            }
        }

        $conn->close();
    }
}
