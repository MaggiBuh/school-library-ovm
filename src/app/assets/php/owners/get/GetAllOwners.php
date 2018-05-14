<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("GetAllOwnersClass.php");

$allOwner = new GetAllOwnersClass();
$allOwner->getAllOwner();

return;