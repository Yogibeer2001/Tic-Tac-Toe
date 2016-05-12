// $(function(){

/*jslint browser: true*/
/*jslint node: true */
/*global $, jQuery, alert, Audio, window*/

var avatar = $('.avatars img');
var avatarOne = $('.avatars #avatarOne');
var avatarTwo = $('.avatars #avatarTwo');
var playerOne = '';
var playerTwo = '';
var reloadButton = $('#reload');
var startButton = $('#newGame');
var singleButton = $('#singlePlayer');
var multiButton = $('#multiPlayer');
var scoreBoardOne = $('.scoreBoard>#playerOne');
var scoreBoardTwo = $('.scoreBoard>#playerTwo');
var currentPlayer;
var turn = 0;
var winner = 0;
var grid =  [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
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
var trumpIntro = new Audio("./Sound/trump-intro.wav");
var abbott = new Audio("./Sound/abbottSound.mp3");
var hitler = new Audio("./Sound/hitlerSound.mp3");
var hitlerIntro = new Audio("./Sound/hitler-intro.mp3");
var marley = new Audio("./Sound/marleySound.mp3");
var vader = new Audio("./Sound/vaderSound.mp3");
var vaderIntro = new Audio("./Sound/vader-intro.mp3");
var noWinner = new Audio("./sound/noWinner.mp3");
var winSound = new Audio("./sound/win.mp3");
var computerMode = false;

function avatarIntro(player) {
  switch (player.name) {
    case 'Hillary Clinton': clinton.play();
        break;
    case 'Bernie Sanders': bernie.play();
        break;
    case 'Donald Trump': trumpIntro.play();
        break;
    case 'Tony Abbott': abbott.play();
        break;
    case 'Adolf Hitler': hitlerIntro.play();
        break;
    case 'Bob Marley': marley.play();
        break;
    case 'Darth Vader': vaderIntro.play();
        break;
    }
}
function avatarSound(player) {
  switch (player.name) {
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
    }
}
function setTurn() {
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
    return currentPlayer;
}
function boardMsg(x) {
      return $("#board").text(x);
    }
function turnNote(x) {
  return $('#turn').text(x);
}
function start() {
            turn = "";
            grid =  [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            boardMsg("");

    $(".column").map(function() {
            $(this).text("");
        })
                .get();
        $(".column").css('background-image', 'none');
        winner = 0;
        turn = 0;
        $('#gameField').css({'display': 'inline-block'});
        setTurn();
}
function computerRandom () {
  var cordinateX = (Math.floor((Math.random() * 3)+1));
  var cordinateY = (Math.floor((Math.random() * 3)+1));
    if(grid[cordinateX][cordinateY] == 0) {
      grid[cordinateX][cordinateY] = 2;
    } else {
        computerRandom();
  }
}


avatar.on('click', function () {
            if (playerOne === '') {
        playerOne = this;
        avatarOne.append(playerOne).css('display', 'flex');
        avatarIntro(playerOne);
        scoreBoardOne.text(playerOne.name + ' : ' + playerOneScore);
        console.log(playerOne.name);
        console.log(playerOne.alt);
    }
          else if (playerTwo === '') {
              playerTwo = this;
              avatarTwo.append(playerTwo).css('display', 'flex');
              avatarIntro(playerTwo);
              scoreBoardTwo.text(playerTwo.name + ' : ' + playerTwoScore);
              console.log(playerTwo.name);
              console.log(playerTwo.alt);
    } else {
        setTurn();
        $('.menu').css('display', 'none');
        $('.game').css('display', 'block');
        }
});
reloadButton.on('click', function (event) {
    location.reload();
});
startButton.on('click', function (event) {
  console.log('clicked');
    start();
});
singleButton.on('click', function (event) {
  console.log('not working yet');
  computerMode = true;
});
multiButton.on('click', function (event) {
  console.log('no stress go ahead');
});

$('.column').on('click', function() {
  var row = $(this).parent().index();
  var column = $(this).index();
    function checkWinner(n,playerName) {
        if(
            (grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
            (grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
            (grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||
            (grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
            (grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
            (grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||
            (grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
            (grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)
            ) {
            winner = 1;
            turn=0;
            return true;
        }
        return false;
      }
    if(grid[row][column] !==0) {
          alert("This position is taken. Please try other position.");
          return;
      }
    if (currentPlayer == playerOne.src) {
      grid[row][column] = 1;
      win = checkWinner(1,playerOne);
      if(winner !== 0)
        {
          $('#gameField').css('display', 'none');
          $('#gameField').css('background-image', 'playerOne');
          boardMsg(playerOne.alt)
                  .css({'color': 'red',
                        'display': 'block',
                        'margin-left' : '15%',
                        'margin-right' : '15%',
                        'margin-top' : '0%',
                        'width': '300px',
                        'height': '300px',
                        'font-size': '40px'
                      })
                      .append(playerOne);
          $(playerOne)
              .css({'width': '350px',
                    'height': '350px'});
          turnNote(playerOne.name + ' wins this round!');
          avatarSound(playerOne);
          playerOneScore++;
          winSound.play();
          scoreBoardOne.text(playerOne.name + ' : ' + playerOneScore)
                    .css({"color": "red",
                          'font-size' : '30px',
                          'font-weight' : 'bold',
                          'display': 'block'});
        }
        $(this).css('background-image', 'url(' + currentPlayer + ')');
        currentPlayer = playerTwo.src;
    }
    else
    {
      grid[row][column] = 2;
      win = checkWinner(2,'Player 2');
        if(winner !== 0)
          {
            $('#gameField').css('display', 'none');
            $('#gameField').css('background-image', 'playerTwo');

            boardMsg(playerTwo.alt)
                    .css({'color': 'red',
                          'display': 'block',
                          'margin-left' : '15%',
                          'margin-right' : '15%',
                          'margin-top' : '0%',
                          'width': '350px',
                          'height': '350px',
                          'font-size': '40px'
                          })
                    .append(playerTwo);
          $(playerTwo)
              .css({'width': '400px',
                    'height': '400px'});

            turnNote(playerTwo.name + ' wins this round!');
            avatarSound(playerTwo);

            playerTwoScore++;
            winSound.play();

            scoreBoardTwo.text(playerTwo.name + ' : ' + playerTwoScore);
          }
          $(this).css('background-image', 'url(' + currentPlayer + ')');
          currentPlayer = playerOne.src;
    }
  turn++;

      if(turn === 9)
      {
        $('#gameField').css('display', 'none');
        boardMsg("No one moves into the white house!")
          .css({'color': 'red',
                'margin' : '10%',
                'margin-top' : '10%',
                'display' : 'inline-block',
                'width': '40%',
                'text-align':'center'});
        noWinnerSound();
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
