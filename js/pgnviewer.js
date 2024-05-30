// Function to write the game to the DOM
function writeGameText(g) {
  // Remove the header to get the moves
  var h = g.header();
  var gameHeaderText = '<h4>' + h.White + ' - ' + h.Black + '</h4>';
  gameHeaderText += '<h5>' + h.Event + ', ' + h.Site + ' ' + h.EventDate + '</h5>';
  var pgn = g.pgn();
  var gameMoves = pgn.replace(/\[(.*?)\]/gm, '').replace(h.Result, '').trim();

  // Format the moves so each one is individually identified, so it can be highlighted
  var moveArray = gameMoves.split(/([0-9]+\.\s)/).filter(function (n) { return n; });
  for (var i = 0, l = moveArray.length; i < l; ++i) {
      var s = $.trim(moveArray[i]);
      if (!/^[0-9]+\.$/.test(s)) { // Move numbers
          var m = s.split(/\s+/);
          for (var j = 0, ll = m.length; j < ll; ++j) {
              m[j] = '<span class="gameMove' + (i + j - 1) + '"><a id="myLink" href="#" onclick="goToMove(' + (i + j - 1) + ');return false;">' + m[j] + '</a></span>';
          }
          s = m.join(' ');
      }
      moveArray[i] = s;
  }

  var gameData = gameHeaderText + '<div class="gameMoves">' + moveArray.join(' ');
  if (h.Result)
      gameData += ' <span class="gameResult">' + h.Result + '</span></div>';
  $("#game-data").html(gameData);
}

// Buttons
$('#btnStart').on('click', function () {
  game.reset();
  currentPly = -1;
  board.position(game.fen());
});
$('#btnPrevious').on('click', function () {
  if (currentPly >= 0) {
      game.undo();
      currentPly--;
      board.position(game.fen());
  }
});
$('#btnNext').on('click', function () {
  if (currentPly < gameHistory.length - 1) {
      currentPly++;
      game.move(gameHistory[currentPly].san);
      board.position(game.fen());
  }
});
$('#btnEnd').on('click', function () {
  while (currentPly < gameHistory.length - 1) {
      currentPly++;
      game.move(gameHistory[currentPly].san);
  }
  board.position(game.fen());
});

// Key bindings
$(document).ready(function () {

  $(document).keydown(function (e) {
      if (e.keyCode == 39) { // Right arrow
          if (e.ctrlKey) {
              $('#btnEnd').click();
          } else {
              $('#btnNext').click();
          }
          return false;
      } else if (e.keyCode == 37) { // Left arrow
          if (e.ctrlKey) {
              $('#btnStart').click();
          } else {
              $('#btnPrevious').click();
          }
          return false;
      } else if (e.keyCode == 38) { // Up arrow
          if (currentGame > 0) {
              if (e.ctrlKey) {
                  loadGame(0);
              } else {
                  loadGame(currentGame - 1);
              }
          }
          $('#gameSelect').val(currentGame);
          return false;
      } else if (e.keyCode == 40) { // Down arrow
          if (currentGame < pgnData.length - 1) {
              if (e.ctrlKey) {
                  loadGame(pgnData.length - 1);
              } else {
                  loadGame(currentGame + 1);
              }
          }
          $('#gameSelect').val(currentGame);
          return false;
      }
  });
});

// Used for clickable moves in game text, not used for buttons for efficiency
function goToMove(ply) {
  if (ply > gameHistory.length - 1) ply = gameHistory.length - 1;
  game.reset();
  for (var i = 0; i <= ply; i++) {
      game.move(gameHistory[i].san);
  }
  currentPly = i - 1;
  board.position(game.fen());
}

var onChange = function onChange() { // Fires when the board position changes
  // Highlight the current move
  $("[class^='gameMove']").removeClass('highlight');
  $('.gameMove' + currentPly).addClass('highlight');
}

function loadGame(i) {
  game = new Chess();
  console.log(pgnData)
  game.load_pgn(formatPgn(pgnData[i]));
  console.log(game.pgn());
  console.log("test format game:  ",formatPgn(pgnData[i]));
  writeGameText(game);
  gameHistory = game.history({ verbose: true });
  goToMove(-1);
  currentGame = i;
}

// Function for loading games from the database
async function loadGamesFromDB() {
  try {
      const response = await fetch('/php/load_games.php');
      const data = await response.json();  // Parse JSON response
      pgnData = data;  // Save data in an array
      console.log(pgnData);  // Log array to console for verification

      // Populate the game select options
      for (var i = 0; i < pgnData.length; i++) {
          var g = new Chess();
          g.load_pgn(formatPgn(pgnData[i]));
          var h = g.header();
          $('#gameSelect')
              .append($('<option></option>')
                  .attr('value', i)
                  .text(h.White + ' - ' + h.Black + ', ' + h.Date));
      }

      // Set up the board
      var cfg = {
          pieceTheme: '/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
          position: 'start',
          showNotation: false,
          onChange: onChange
      };
      board = new ChessBoard('board', cfg);
      $(window).resize(board.resize);

      // Load the first game
      loadGame(0);
      goToMove(gameHistory.length - 1);

  } catch (error) {
      console.error('Error fetching games:', error);
  }
}

function formatPgn(pgnText) {
  const lines = pgnText.split('\n');
  const headers = [];
  const moves = [];
  let isMovesSection = false;

  lines.forEach(line => {
      if (line.startsWith('[')) {
          headers.push(line);
      } else if (line.trim() === '' && !isMovesSection) {
          isMovesSection = true;
      } else if (isMovesSection) {
          moves.push(line.trim());
      }
  });

  const formattedPgn = [
      ...headers,
      '',
      ...moves
  ];

  return formattedPgn.join('\n');
}

$('#loadGamesButton').on('click', async function () {
console.log("click")
  await loadGamesFromDB();

});