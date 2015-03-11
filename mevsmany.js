var init = function() {

  var board,
    boardStatus,
    game = new Chess(),
    statusEl = $('#status'),
    fenEl = $('#fen'),
    pgnEl = $('#pgn'),
    myFirebaseRef = new Firebase('https://intense-fire-2841.firebaseio.com/'),
    startPos;

  var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';

  // check Firebase for previously stored board status
  myFirebaseRef.limitToLast(1).on("value", function(snapshot) {
    startPos = (snapshot.val().fen);
    game.load(startPos);
    params.position = startPos;
    board = new ChessBoard('board', params);
    console.log(startPos);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  var onDragStart = function(source, piece, position, orientation) {
    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  };

  var onDrop = function(source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

    updateStatus();
  };

  // update the board position after the piece snap 
  // for castling, en passant, pawn promotion
  var onSnapEnd = function() {
    board.position(game.fen());
  };

  var updateStatus = function() {
    var status = '';

    var moveColor = 'White';
    if (game.turn() === 'b') {
      moveColor = 'Black';
    }

    if (moveColor === 'White') {
      $('.message').empty().append("The World's turn");
      $('.emailEntry').empty();
    } else {
      $('.message').empty().append("Mark's turn");
      $('.emailEntry').empty().append("Sign up here to be notified when Mark takes his turn.");
    }

    // checkmate?
    if (game.in_checkmate() === true) {
      status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.in_draw() === true) {
      status = 'Game over, drawn position';
    }

    // game still on
    else {
      status = moveColor + ' to move';

      // check?
      if (game.in_check() === true) {
        status += ', ' + moveColor + ' is in check';
      }
    }

    statusEl.html(status);
    fenEl.html(game.fen());
    pgnEl.html(game.pgn());
  };

  var onChange = function(oldPos, newPos) {
    console.log("Position changed: ", game.fen());
    myFirebaseRef.update({
      fen: game.fen()
    }); 
  };

  updateStatus();

  var params = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    showNotation: false,
    onChange: onChange,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd

  }

};

$(document).ready(init);