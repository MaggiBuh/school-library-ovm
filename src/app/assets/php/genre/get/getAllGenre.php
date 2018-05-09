<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("getAllGenreClass.php");

$allGenre = new GetAllGenreClass();
$allGenre->getAllGenre();

return;