<?php
require 'lib/db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT id, password FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($user_id, $hashed_password);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    if (password_verify($password, $hashed_password)) {
        session_start();
        $_SESSION['user_id'] = $user_id;
        echo "Login successful!";
    } else {
        echo "Login failed. Please check your username and password.";
    }
} else {
    echo "Login failed. Please check your username and password.";
}

$stmt->close();
$conn->close();
?>
