<?php

include("../../../databaseConnection/GetDatabaseConnectionClass.php");
include("GetAllBooksClass.php");

$allBooks = new GetAllBooksClass();
$allBooks->getAllBooks();

return;