<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("InsertNewAuthorClass.php");

$newAuthor = new InsertNewAuthorClass();
$data = json_decode(file_get_contents("php://input"), true);
$newAuthor->insertNewAuthor($data);

return;