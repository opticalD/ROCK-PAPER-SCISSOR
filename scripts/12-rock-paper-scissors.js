let score =
            JSON.parse(localStorage.getItem('Score')) ||
            {
                wins: 0,
                losses: 0,
                ties: 0
            };

        /*
    if(score === null){
        score = {
            wins: 0,
            losses: 0,
            ties: 0
        };
    }
    */

        console.log(score);

        
    //variable to keep track whether were playing or not

    let isAutoPlaying = false;
    let intervalId; 
   /*
    function autoPlay(){
        //while passing a function into another function, its recommended to use arrow function
        if(!isAutoPlaying){
         intervalId = setInterval(function(){
                const playerMove = pickComputerMove();
                playGame(playerMove);
            },1000);
            isAutoPlaying = true;
        }else{
            //stops set interva;
            clearInterval(intervalId);
            isAutoPlaying = false;
            //stop setinterval
            //setinterval returns a number which is like an id
            //but its different each time setinterval runs
        }
    }*/

       // const autoPlay = () => {};
    function autoPlay(){
        //while passing a function into another function, its recommended to use arrow function
        if(!isAutoPlaying){
         intervalId = setInterval(() => {
                const playerMove = pickComputerMove();
                playGame(playerMove);
            },1000);
            isAutoPlaying = true;
        }else{
            //stops set interva;
            clearInterval(intervalId);
            isAutoPlaying = false;
            //stop setinterval
            //setinterval returns a number which is like an id
            //but its different each time setinterval runs
        }
    }


    document.querySelector('.js-rock-button').addEventListener('click',() => {
        playGame('rock');
    });

    document.querySelector('.js-paper-button').addEventListener('click',() => {
        playGame('paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click',() => {
        playGame('scissors');
    });

    //so that if we press r,p,s anywhere on the screen on the webpage, we can play the game

    //the 2nd parameter i.e the event contains the key that we pressed as the event
    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r'){
            playGame('rock');
        }else if(event.key === 'p'){
            playGame('paper');
        }else if(event.key === 's'){
            playGame('scissors');
        }

    });

        function playGame(playerMove) {
            const compMoveVal = pickComputerMove();
            let result = '';


            if (playerMove == 'scissors') {
                if (compMoveVal == 'rock') {
                    result = 'lose';
                } else if (compMoveVal == 'paper') {
                    result = 'Win';
                } else {
                    result = 'Tie';
                }
            } else if (playerMove == 'rock') {
                if (compMoveVal == 'rock') {
                    result = 'Tie';
                } else if (compMoveVal == 'paper') {
                    result = 'lose';
                } else {
                    result = 'Win';
                }
            } else if (playerMove == 'paper') {
                if (compMoveVal == 'rock') {
                    result = 'Win';

                } else if (compMoveVal == 'paper') {
                    result = 'Tie';
                } else {
                    result = 'lose';
                }
            }

           console.log( document.querySelector('.js-result').innerHTML = `You ${result}`);

            document.querySelector('.js-moves').innerHTML = ` You
            <img class="move-icon" src="${playerMove}-emoji.png" alt="">
            <img class="move-icon" src="${compMoveVal}-emoji.png" alt="">
            Computer`;

            if (result === 'Win') {
                score.wins += 1;


            } else if (result === 'lose') {
                score.losses += 1;

            } else {
                score.ties += 1;

            }


            localStorage.setItem('Score', JSON.stringify(score));// name and value



           updateScoreElement();

        }


       function updateScoreElement(){
        document.querySelector('.js-score')
                .innerHTML = `
        Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
       }



        function pickComputerMove() {
            const compMove = Math.random();
            let compMoveVal = '';

            if (compMove >= 0 && compMove < 1 / 3) {
                compMoveVal = 'rock';
            } else if (compMove >= 1 / 3 && compMove < 2 / 3) {
                compMoveVal = 'paper';
            } else {
                compMoveVal = 'scissors';
            }

            return compMoveVal;
        };
