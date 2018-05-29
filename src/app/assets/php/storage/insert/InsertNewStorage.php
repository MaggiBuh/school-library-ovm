<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("InsertNewStorage.php");

$newStorage = new InsertNewStorageClass();
$data = json_decode(file_get_contents("php://input"), true);
$newStorage->insertNewStorage($data);

return;