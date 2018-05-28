<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("InsertNewBookClass.php");

$newBook = new InsertNewBookClass();
$newBook->insertNewBook();

return;