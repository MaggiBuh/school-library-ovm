<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("getAllPublishersClass.php");

$allPublishers = new GetAllPublishersClass();
$allPublishers->getAllPublishersWithOrderId();

return;