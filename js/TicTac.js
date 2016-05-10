// $(function(){


var avatar = $('.avatars img');
var avatarOne = $('.avatars #avatarOne');
var avatarTwo = $('.avatars #avatarTwo');
// var playerOne = '<img src="images/Clinton.jpg"/>';
// var playerTwo = '<img src="images/Bernie.jpg"/>';
// works fine with that
var playerOne = '';
var playerTwo = '';
var reloadButton = $('#reload');
var startButton = $('#newGame');
var scoreBoardOne = $('.scoreBoard>#playerOne');
var scoreBoardTwo = $('.scoreBoard>#playerTwo');
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
var winningMessage =['Peace with more firepower!',
                      'Feel the burn!',
                      'Kick out the immigrants!',
                      'WTF!',
                      'We need more labor camps!',
                      'I m jamming...',
                      'Come to the dark side...'];


  avatar.on('click', function()
          {
            if(playerOne === '')
              {
                playerOne = this;
                avatarOne.append(playerOne).css('display', 'flex');
                console.log(playerOne);
              }
          else if (playerTwo === '')
            {
              playerTwo = this;
              avatarTwo.append(playerTwo).css('display', 'flex');
              console.log(playerTwo);
            }
          else
            {
              $('.menu').css('display', 'none');
              $('.game').css('display', 'block');
            }
        });
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
            )
        {
            winner = 1;
            turn=0;
            return true;
        }
        return false;
      }
    if(grid[row][column] !==0)
      {
          alert("This position is taken. Please try other position.");
          return;
      }
    if (turn%2 === 0)
    {
      currentPlayer = playerOne.src;
      console.log(currentPlayer);
      grid[row][column] = 1;

      win = checkWinner(1,playerOne);
      if(winner !== 0)
        {
          $('#gameField').css('display', 'none');
          boardMsg("Peace by more firepower").css({'color': 'red','margin-left' : '20px', 'margin-top' : '0px'});

          playerOneScore++;
          scoreBoardOne.text('Clinton: ' + playerOneScore)
                    .css({"color": "red",
                          'font-size' : '30px',
                          'font-weight' : 'bold',
                          'display': 'block'});
        }
    }
    else
    {
      currentPlayer = playerTwo.src;
      console.log(currentPlayer);
      grid[row][column] = 2;

      win = checkWinner(2,'Player 2');
        if(winner !== 0)
          {
            $('#gameField').css('display', 'none');
            boardMsg("Feel the Burn!").css({'color': 'red','margin-left' : '20px','margin-top' : '0px'});

            playerTwoScore++;
            scoreBoardTwo.text('Bernie: ' + playerTwoScore);
          }
    }
  turn++;

    $(this).css('background-image', 'url('+currentPlayer+ ')');

      if(turn === 9)
      {
        $('#gameField').css('display', 'none');
        boardMsg("No one moves into the white house!").css({'color': 'red','margin' : '10%', 'margin-top' : '10%', 'display' : 'inline-block', 'width': '40%', 'text-align':'center'});
        winner = 1;
        turn=0;
      }

});




// });

// * Use timers to display "waiting..." messages while users are waiting to be matched
// * Allow game customizable options, time limits, board size, game rounds, name & profiles etc
// * Allow players to customize their token (X, O, name, picture, avatar etc)
// * Get inventive with your styling ** use CSS effects or animations to spiff things up
// * Use **LocalStorage** or **SessionStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
// * Be creative with the game, bend the rules, give it a twist
// ​
// ### EXTRA Bonus
// ​
// * Connect to a prebuilt backend service for persistence (research **firebase** and try some of their examples)
// ​
// ___________________________________________________________________________________
// ​
