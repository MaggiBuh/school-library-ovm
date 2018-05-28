<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("InsertNewGenreClass.php");

$newGenre = new InsertNewGenreClass();
$data = json_decode(file_get_contents("php://input"), true);
$newGenre->insertNewAuthor($data);

return;