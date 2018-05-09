<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("getAllAuthorsClass.php");

$allAuthors = new GetAllAuthorsClass();
$allAuthors->getAllAuthors();

return;