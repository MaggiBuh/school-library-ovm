<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("InsertNewOwnerClass.php");

$newOwner = new InsertNewOwnerClass();
$data = json_decode(file_get_contents("php://input"), true);
$newOwner->insertNewOwner($data);

return;