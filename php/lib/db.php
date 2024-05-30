<?php
$servername = "localhost";
$dbusername = "cuuller";
$dbpassword = "EhVfz6nyhXgP";
$database = "my_cuuller";

$conn = new mysqli($servername, $dbusername, $dbpassword, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
