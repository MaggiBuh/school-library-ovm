<?php

include("../databaseConnection/GetDatabaseConnectionClass.php");
include("LoginWithExistingAccountClass.php");

$login = new LoginWithExistingAccountClass();
$data = json_decode(file_get_contents("php://input"), true);
$login->loginWithExistingAccount($data);

return;