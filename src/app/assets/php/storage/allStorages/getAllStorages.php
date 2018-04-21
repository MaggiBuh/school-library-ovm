<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("getAllStoragesClass.php");

$allStorages = new GetAllStoragesClass();
$allStorages->getAllStorages();

return;