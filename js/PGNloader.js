function submitPGN() {
    var pgnText = document.getElementById('pgnText').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/php/save_game.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            document.getElementById('pgnForm').style.display = 'none';
        }
    };
    xhr.send("pgn=" + encodeURIComponent(pgnText));
}
