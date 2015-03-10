var params = {
  draggable: true,
  dropOffBoard: 'snapback',
  position: 'start',
  showNotation: false
}



var init = function(){
  var board = new ChessBoard('board', params);
};

$(document).ready(init);