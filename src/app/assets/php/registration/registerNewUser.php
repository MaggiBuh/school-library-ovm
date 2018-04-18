<?php

include("../databaseConnection/GetDatabaseConnectionClass.php");
include("RegisterNewUserClass.php");

$newUser = new RegisterNewUserClass();
$data = json_decode(file_get_contents("php://input"), true);
$newUser->registerNewUser($data);

return;