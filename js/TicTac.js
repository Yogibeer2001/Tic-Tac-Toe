// $(function(){


var avatar = $('.avatars img');
var avatarOne = $('.avatars #avatarOne');
var avatarTwo = $('.avatars #avatarTwo');
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
var clinton = new Audio("./Sound/clintonSound.mp3");
var bernie = new Audio("./Sound/bernieSound.mp3");
var trump = new Audio("./Sound/trumpSound.wav");
var abbott = new Audio("./Sound/abbottSound.mp3");
var hitler = new Audio("./Sound/hitlerSound.mp3");
var marley = new Audio("./Sound/marleySound.mp3");
var vader = new Audio("./Sound/vaderSound.mp3");
var noWinner = new Audio("./sound/noWinner.mp3");
var winSound = new Audio("./sound/win.mp3");

  avatar.on('click', function()
          {
            if(playerOne === '')
              {
                playerOne = this;
                avatarOne.append(playerOne).css('display', 'flex');
                avatarSound(playerOne);
                scoreBoardOne.text(playerOne.name + ' : ' + playerOneScore);

                console.log(playerOne.name);
                console.log(playerOne.alt);
              }
          else if (playerTwo === '')
            {
              playerTwo = this;
              avatarTwo.append(playerTwo).css('display', 'flex');
              avatarSound(playerTwo);
              scoreBoardTwo.text(playerTwo.name + ' : ' + playerTwoScore);
              console.log(playerTwo.name);
              console.log(playerTwo.alt);
            }
          else
            {
              setTurn();
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
function turnNote(x)
{
  return $('#turn').text(x);
}
// function selectPlayer1()
//     {
//       document.getElementById("candidate1").play();
//     };
// function selectPlayer2()
//     {
//       document.getElementById("candidate2").play();
//     };
// function winningSound()
//     {
//       document.getElementById("win").play();
//     };
// function noWinnerSound()
//     {
//       document.getElementById("noWinner").play();
//     };
//
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
    $(".column").css('background-image', 'none');
        winner = 0;
        turn = 0;
        $('#gameField');
        setTurn();
}
$(".column").mouseover(function()
{
  $(this).css({'background-opacity': '1' ,

  'transform': 'scale(1.2)'})
})
$(".column").mouseout (function()
{
  $(this).css({'transform':'scale(1)', 'background-opacity':'0'})
  });


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
          boardMsg(playerOne.alt).css({'color': 'red','margin-left' : '20px', 'margin-top' : '0px'});

          playerOneScore++;
          winSound.play();
          scoreBoardOne.text(playerOne.name + ' : ' + playerOneScore)
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
            boardMsg(playerTwo.alt).css({'color': 'red','margin-left' : '20px','margin-top' : '0px'});

            playerTwoScore++;
            winSound.play();

            scoreBoardTwo.text(playerTwo.name + ' : ' + playerTwoScore);
          }
    }
  turn++;

    $(this).css('background-image', 'url('+currentPlayer+ ')');

      if(turn === 9)
      {
        $('#gameField').css('display', 'none');
        boardMsg("No one moves into the white house!").css({'color': 'red','margin' : '10%', 'margin-top' : '10%', 'display' : 'inline-block', 'width': '40%', 'text-align':'center'});
        noWinnerSound();
        winner = 1;
        turn=0;
      }

});


function avatarSound(player)
{
  switch (player.name)
  {
    case 'Hillary Clinton': clinton.play();
    break;
    case 'Bernie Sanders': bernie.play();
    break;
    case 'Donald Trump': trump.play();
    break;
    case 'Tony Abbott': abbott.play();
    break;
    case 'Adolf Hitler': hitler.play();
    break;
    case 'Bob Marley': marley.play();
    break;
    case 'Darth Vader': vader.play();
    break;
    // default: noWinner.play()
  }
}

function setTurn()
{
    var randomNumber = Math.floor((Math.random() * 2) + 1);
    winner = 0;
    if(randomNumber == 1)
    {
      currentPlayer = playerOne.src;
        turnNote(playerOne.name+"'s turn to start!");
    }
    else
    {
      currentPlayer = playerTwo.src;
        turnNote(playerTwo.name +"'s turn to start!");
    }
}

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
