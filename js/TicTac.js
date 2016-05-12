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
var trumpIntro = new Audio("./Sound/trump-intro.mp3");
var abbott = new Audio("./Sound/abbottSound.mp3");
var hitler = new Audio("./Sound/hitlerSound.mp3");
var hitlerIntro = new Audio("./Sound/hitler-intro.mp3");
var marley = new Audio("./Sound/marleySound.mp3");
var vader = new Audio("./Sound/vaderSound.mp3");
var vaderIntro = new Audio("./Sound/vader-intro.mp3");
var noWinner = new Audio("./Sound/noWinner.mp3");
var winSound = new Audio("./Sound/win.mp3");
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
        turnNote(playerOne.name+"'s turn to start!").css('display', 'center');
    }
    else
    {
      currentPlayer = playerTwo.src;
        turnNote(playerTwo.name +"'s turn to start!").css('display', 'center');
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

function confettiShoot()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particle = [];
    particleCount = 0,
      gravity = 0.1,
      colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        '#FF5722', '#795548'
      ];
    for (var i = 0; i < 500; i++) {

      particle.push({
        x: width / 2,
        y: height / 2,
        boxW: randomRange(5, 20),
        boxH: randomRange(5, 20),
        size: randomRange(2, 8),

        spikeran: randomRange(3, 5),

        velX: randomRange(-8, 8),
        velY: randomRange(-50, -10),

        angle: convertToRadians(randomRange(0, 360)),
        color: colors[Math.floor(Math.random() * colors.length)],
        anglespin: randomRange(-0.2, 0.2),

        draw: function() {

          context.save();
          context.translate(this.x, this.y);
          context.rotate(this.angle);
          context.fillStyle = this.color;
          context.beginPath();
          // drawStar(0, 0, 5, this.boxW, this.boxH);
          context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
          context.fill();
          context.closePath();
          context.restore();
          this.angle += this.anglespin;
          this.velY *= 0.999;
          this.velY += 0.3;

          this.x += this.velX;
          this.y += this.velY;
          if (this.y < 0) {
            this.velY *= -0.2;
            this.velX *= 0.9;
          };
          if (this.y > height) {
            this.anglespin = 0;
            this.y = height;
            this.velY *= -0.2;
            this.velX *= 0.9;
          };
          if (this.x > width || this.x < 0) {

            this.velX *= -0.5;
          };

        },

      });

    }
    r1 = {
      x: width / 2 - 150,
      y: height / 2 - 150,
      width: 300,
      height: 300,
      velX: 0,
      velY: -10,
      alphatop: 0
    };
    function drawScreen() {
      size = 50;
      pFontName = "Lucida Sans Unicode";
      if (r1.alphatop < 1) {
        r1.alphatop += 0.01;
      } else {
        r1.alphatop = 1;
      }
      context.globalAlpha = r1.alphatop;

      if (r1.alphatop === 1) {
        r1.velY *= 0.999;
        r1.velY += 0.3;

        r1.x += r1.velX;
        r1.y += r1.velY;
      }

      if (r1.y + r1.height > height) {
        r1.anglespin = 0;
        r1.y = height - r1.height;
        r1.velY *= -0.8;
        r1.velX *= 0.9;
      };

      context.globalAlpha = 1;
      for (var i = 0; i < particle.length; i++) {
        particle[i].draw();

      }

    }
    function loadImage(url) {
      var img = document.createElement("img");
      img.src = url;
      return img;
    }
    function update() {

      context.clearRect(0, 0, width, height);

      drawScreen();

      requestAnimationFrame(update);
    }
    update();
    function randomRange(min, max) {
      return min + Math.random() * (max - min);
    }
    function randomInt(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }
    function convertToRadians(degree) {
      return degree * (Math.PI / 180);
    }
    function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
      var rot = Math.PI / 2 * 3;
      var x = cx;
      var y = cy;
      var step = Math.PI / spikes;

      context.strokeSyle = "#000";
      context.beginPath();
      context.moveTo(cx, cy - outerRadius)
      for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y)
        rot += step
      }
      context.lineTo(cx, cy - outerRadius)
      context.closePath();
      context.fillStyle = color;
      context.fill();

    }
}

avatar.on('click', function () {
            if (playerOne === '') {
        playerOne = this;
        avatarOne.append(playerOne).css('display', 'inline');
        avatarIntro(playerOne);
        scoreBoardOne.text(playerOne.name + ' : ' + playerOneScore);
        console.log(playerOne.name);
        console.log(playerOne.alt);
    }
          else if (playerTwo === '') {
              playerTwo = this;
              avatarTwo.append(playerTwo)/*.css('display', 'inline-flex')*/;
              avatarIntro(playerTwo);
              scoreBoardTwo.text(playerTwo.name + ' : ' + playerTwoScore);
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
                'max-width': '350px',
                'maxheight': '350px',
                'font-size': '40px'
                })
          .append(playerOne);
          $(playerOne)
          .css({'width': '350px',
                'height': '350px'});
          turnNote(playerOne.name + ' wins this round!')
  //             .animate({opacity: 0.65,
  //                       top: "+=50",
  //                       left: '-=50px',
  //                       width: "toggle"
  // }, 3000);
  $('#board').append('<canvas id="canvas"></canvas>').css('z-index', '-1');
  confettiShoot();

          avatarSound(playerOne);
          playerOneScore++;
          winSound.play();
          scoreBoardOne.text(playerOne.name + ' : ' + playerOneScore)
                    .css({"color": "red",
                          'font-size' : '30px',
                          'font-weight' : 'bold',
                          'display': 'block'})
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
                    'max-width': '350px',
                    'maxheight': '350px',
                    'font-size': '40px'
                          })
              .append(playerTwo);
          $(playerTwo)
              .css({'width': '300px',
                    'height': '300px'});
$('#board').append('<canvas id="canvas"></canvas>').css('z-index', '-1');
confettiShoot();
            turnNote(playerTwo.name + ' wins this round!')
//             .animate({opacity: 0.65,
//                       top: "+=50",
//                       left: '-=50px',
//                       width: "toggle"
// }, 3000);
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
                'text-align':'center'})
    //             .animate({opacity: 0.85,
    //                       top: "-=50",
    //                       left: '+=50px',
    //                       width: "toggle"
    // }, 5000);
        noWinner.play();
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
