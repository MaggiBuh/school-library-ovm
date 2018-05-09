<?php

include("../databaseConnection/GetDatabaseConnectionClass.php");
include("getExistingLoginUserDataByUsernameAndPasswordClass.php");

$login = new getExistingLoginUserDataByUsernameAndPasswordClass();
$data = json_decode(file_get_contents("php://input"), true);
$login->getCurrentUserDataByUserId($data);

return;