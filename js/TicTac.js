$(function(){

var playerOne = 'X';
var playerTwo = '0';
var reloadButton = $('#reload');
var currentPlayer;
var turn = 0;
var winner = 0;
var grid =  [[0,0,0],[0,0,0],[0,0,0]];
var row = $(this).parent().index();
var column = $(this).index();



reloadButton.on('click',function(event)
  {
  location.reload();
  });

function boardMsg(x)
    {
      return $("#board").text(x);
    }

function start()
{
            turn = "";
            grid =  [[0,0,0],[0,0,0],[0,0,0]];
            boardMsg("");
    $(".column").map(function()
      {
                $(this).text("");
      })
            .get();
            winner = 0;
            turn=0;
}




$('.column').on('click', function()
{
  var row = $(this).parent().index();
  var column = $(this).index();
    function checkWinner ()
    {
        // console.log('indexOf 0:' + grid[1].indexOf(0));
        // console.log('indexOf 1:' + grid[1].indexOf(1));
        // console.log('indexOf 2:' + grid[1].indexOf(2));
      if(grid[row].indexOf(1) !== -1 && grid[row].indexOf(0) == -1)
        {
          winner = 'Player 1';
          console.log('Player 1 wins');

        }
      if(grid[row].indexOf(2) !== -1 && grid[row].indexOf(0) === -1)
        {
          winner = 'Player 2'
          console.log('Player 2 wins');
        }
      return winner;
    }

    if(grid[row][column] !==0)
      {
          console.log("This position is taken. Please try other position.");
          return;
      }
  if (turn%2 === 0)
    {
      currentPlayer = playerOne;
      grid[row][column] = 1;
      for (var i = 0; i < grid.length; i++) {
        console.log(grid[i][column]);
      }
      checkWinner();



      if(winner !== 0)
        {
          $('.column').off('click');
        }
    }
  else
    {
      currentPlayer = playerTwo;
      grid[row][column] = 2;
      for (var i = 0; i < grid.length; i++) {
        console.log(grid[i][column]);
      }
      checkWinner();
      // for (var i = 0; i < grid.length; i++) {
      //   console.log(grid[i][column]);
      // }


      if(winner !== 0)
        {
          $('.column').off('click');
        }
    }
  turn++;
  $(this).append(currentPlayer)

      if(turn === 9)
      {
        console.log('Draw');
      }

});



// for (var i = 0; i < grid.length; i++) {
//   console.log(grid[i][column]);
// }




});
