<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("InsertNewPublisherClass.php");

$newPublisher = new InsertNewPublisherClass();
$data = json_decode(file_get_contents("php://input"), true);
$newPublisher->insertNewPublisher($data);

return;