<?php

class GetDatabaseConnectionClass
{
    function getDBConnectionAndCheckIfFailed()
    {
        $servername = "127.0.0.1";
        $username = "root";
        $password = "";
        $dbname = "school_libary";

        $conn = new mysqli($servername, $username, $password, $dbname);
        $conn->set_charset("utf8");
        if ($conn->connect_error) {
            die('Error: Keine Verbindung möglich!');
        } else {
            return $conn;
        }
    }
}
