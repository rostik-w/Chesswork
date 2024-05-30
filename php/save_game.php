<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

require 'lib/db.php';
$pgn = $_POST['pgn'];

$stmt = $conn->prepare("INSERT INTO games (user_id, game) VALUES (?, ?)");
$stmt->bind_param("is", $user_id, $pgn);

if ($stmt->execute()) {
    echo "Game saved successfully.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
