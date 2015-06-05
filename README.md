Chesswork:  SwiftStack Game Status Board
========================================

Viewing the board state
--------------------------------------

Clone this repo, then 

   runserver.sh

Visit http://localhost:8000 and have fun!

Changing the board state
--------------------------------------

Edit data/games.js, which contains a javascript array of games in PGN format.  The top game should be the current one.  Add a move, check it in, and push!


Credits
--------------------------------------

Adapted from pgnviewer: 
* https://github.com/siansell/pgnviewer/

Includes:
* chessboard.js: https://github.com/oakmac/chessboardjs
* chess.js: https://github.com/jhlywa/chess.js

License
--------------------------------------

This code is released under the [MIT License](https://github.com/siansell/pgnviewer/blob/master/LICENSE).
