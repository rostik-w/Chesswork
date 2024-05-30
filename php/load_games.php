<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

require 'lib/db.php';

$stmt = $conn->prepare("SELECT game FROM games WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$games = array();

while ($row = $result->fetch_assoc()) {
    $games[] = $row['game'];
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($games);
?>
