$(function(){

// var playerOne = 'x';
// var playerTwo = '0';
var playerOne = '<img src="images/Clinton.jpg"/>';
var playerTwo = '<img src="images/Bernie.jpg"/>';
var reloadButton = $('#reload');
var startButton = $('#newGame');
var currentPlayer;
var turn = 0;
var winner = 0;
var grid =  [[0,0,0],[0,0,0],[0,0,0]];
var row = $(this).parent().index();
var column = $(this).index();
var win;
var maxHeight = 100;
var maxWidth = 100;
var playerOneScore = 0;
var playerTwoScore = 0;


reloadButton.on('click',function(event)
  {
  location.reload();
  });

startButton.on('click',function(event)
{
  console.log('clicked');
  start();
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
        turn = 0;
        $('#gameField').css('display', 'inline-block');
}



$('.column').on('click', function()
{
  var row = $(this).parent().index();
  var column = $(this).index();
  function checkWinner(n,playerName)
  {
      if(
          (grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
          (grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
          (grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

          (grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
          (grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
          (grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

          (grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
          (grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)

          ){
          boardMsg(playerName + " won the game!").css('color', 'red');
          winner = 1;
          turn=0;
          return true;
      }
      return false;
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
      win = checkWinner(1,playerOne);
      if(winner !== 0)
        {
          $('#gameField').css('display', 'none');
          boardMsg("Peace by more firepower").css('color', 'red');

          playerOneScore++;
        }

    }
  else
    {
      currentPlayer = playerTwo;
      grid[row][column] = 2;
      win = checkWinner(2,'Player 2');


      if(winner !== 0)
        {
          $('#gameField').css('display', 'none');
          boardMsg("Feel the Burn!").css('color', 'red');

          playerTwoScore++;

        }
    }
  turn++;

    $(this).append(currentPlayer);
    console

      if(turn === 9)
      {
        console.log('Draw');
        $('#gameField').css('display', 'none');
        boardMsg("No on moves into the white house!").css('color', 'red');
        winner = 1;
        turn=0;
      }

});




});
