var globalScore,currentScore,activePlayer,gamePlaying;
init();

var lastDice;

document.querySelector('.roll-btn').addEventListener('click',function(){
    if (gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.random-dice').style.display='block';
        document.querySelector('.random-dice').src = 'dice-'+ dice +'.png';

        if (dice === 6 && lastDice === 6) {
            
            globalScore[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if(dice !== 1){
            currentScore += dice;
            document.querySelector('#local-score-'+activePlayer).textContent= currentScore;
        } else{
        nextPlayer();
        }
        lastDice = dice;
    }

});

document.querySelector('.hold-btn').addEventListener('click',function(){
    if(gamePlaying){
        globalScore[activePlayer] += currentScore;

        document.querySelector('#score-'+activePlayer).textContent=globalScore[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        if(globalScore[activePlayer] >= winningScore){
            document.querySelector('#name-'+activePlayer).textContent='Winner!';
            document.querySelector('.random-dice').style.display='none'; 
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying=false;
    
        }else{
        nextPlayer();
        }
    }
  
});

document.querySelector('.new-game-btn').addEventListener('click', init);

function nextPlayer(){
    currentScore=0;
    document.getElementById('local-score-'+ activePlayer).textContent=currentScore;

    activePlayer === 0 ?  activePlayer=1 :  activePlayer=0;

    document.querySelector('.random-dice').style.display='none'; 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
function init(){
    globalScore = [0,0];
    currentScore = 0;
    activePlayer=0;
    gamePlaying=true;
    document.querySelector('.random-dice').style.display='none'; 
    document.getElementById('score-0').textContent='0';
    document.getElementById('local-score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('local-score-1').textContent='0';
    document.querySelector('#name-0').textContent='PLAYER 1';
    document.querySelector('#name-1').textContent='PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}