function loginUser() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            if(xhr.responseText === "Login successful!") {
                window.location.href = "index.html";
            } else {
                alert("Login failed. Please check your username and password.");
            }
        }
    };
    xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}

function registerUser() {
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/php/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            if(xhr.responseText === "Registration successful!") {
                alert("Registration successful! You can now log in.");
            } else {
                alert("Registration failed: " + xhr.responseText);
            }
        }
    };
    xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}
