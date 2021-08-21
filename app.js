var userScore = 0;
var computerScore = 0;
var choice_History = "";
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const restart_button=document.getElementById("restart-button");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const game_over_h1 = document.getElementById("Message");


function convertToWord(letter){
    if(letter == 'r'){
        return "Rock";
    }
    if(letter == 'p'){
        return "Paper"};
    if(letter == 's') {
        return "Scissors"};
}

function generateNextMarkovResponse(choice_History){
    if (choice_History.length<20){
        var n_gram_len =1;
    }else{
        var n_gram_len=2;
    }
    var n_grams = {};
    for(var i = 0; i<choice_History.length-n_gram_len;i++){
        var gram = choice_History.substring(i,i+n_gram_len);
        if (!n_grams[gram]){
            n_grams[gram]=[];
            n_grams[gram].push(choice_History.charAt(i+n_gram_len));
        }else{
            n_grams[gram].push(choice_History.charAt(i+n_gram_len));
        }
    }
    if (!n_grams[choice_History.substring(choice_History.length-n_gram_len,choice_History.length)]){
        randomChoice=["r","p","c"];
        return randomChoice[Math.floor(Math.random()*3)];
    }else{
        var MarkovChoice=n_grams[choice_History.substring(choice_History.length-n_gram_len,choice_History.length)][Math.floor(Math.random()*n_grams[choice_History.substring(choice_History.length-n_gram_len,choice_History.length)].length)];
        if (MarkovChoice=="r"){
            console.log(n_grams);
            return "p";
        }else if(MarkovChoice=="p"){
            console.log(n_grams);
            return "s";
        }else{
            console.log(n_grams);
            return "r";
        }
    }

}
function win(userChoice,computerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML=convertToWord(userChoice) +" beats "+ convertToWord(computerChoice)+ ". You Win!";
    if(userScore==30){
        endGame("Player");
    }else if(computerScore==30){
        endGame("Markov")
    }
}
function lose(userChoice,computerChoice){
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML=convertToWord(computerChoice) +" beats "+ convertToWord(userChoice)+ ". You Lose!";
    if(userScore==30){
        endGame("Player");
    }else if(computerScore==30){
        endGame("Markov")
    }

}
function draw(userChoice,computerChoice){
    result_p.innerHTML=convertToWord(computerChoice) +" cancels "+ convertToWord(userChoice)+ ". Draw!";
}

function endGame(Winner){
    userScore_span.style.display="none";
    computerScore_span.style.display="none";
    scoreBoard_div.style.display="none";
    result_p.style.display="none";
    rock_div.style.display="none";
    paper_div.style.display="none";
    scissors_div.style.display="none";
    if(Winner=="Markov"){
        game_over_h1.innerHTML="Game Over! You have lost! "+computerScore+"-"+userScore+"! Click the Restart Button To Play Again!";
    }
    else{
        game_over_h1.innerHTML="CONGRATULATIONS! You have Won "+userScore+"-"+computerScore+"! Click the Restart Button To Play Again!";
    }
    game_over_h1.style.display="block";
}

function game(userChoice){
    var computerChoice=generateNextMarkovResponse(choice_History,1);
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice,computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice,computerChoice);
            break;
        case "pp":
        case "rr":
        case "ss":
            draw(userChoice,computerChoice);
            break;


    }
}

function main(){
rock_div.addEventListener("click",function(){
    console.log(choice_History)
    game("r");
    choice_History=choice_History.concat("r")
})
paper_div.addEventListener("click",function(){
    console.log(choice_History)
    game("p");
    choice_History=choice_History.concat("p")

})
scissors_div.addEventListener("click",function(){
    console.log(choice_History)
    game("s");
    choice_History=choice_History.concat("s")
})
restart_button.addEventListener("click",function(){
    window.location.reload();
})
}
main();