<?php

include("../../databaseConnection/GetDatabaseConnectionClass.php");
include("getAllPublisherClass.php");

$allPublisher = new GetAllPublisherClass();
$allPublisher->getAllPublisherWithOrderId();

return;