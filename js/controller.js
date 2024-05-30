var timeBlackSpan = document.getElementById('bt');
var timeWhiteSpan = document.getElementById('wt');


function updateSpanContent(blackTime, whiteTime) {

    timeBlackSpan.textContent = blackTime;
    timeWhiteSpan.textContent = whiteTime;
}

updateSpanContent("10:00", "15:00");
