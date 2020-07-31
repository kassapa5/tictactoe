// getting each element at 9 cells of play space pos11 means first row first column cell
const pos11 = document.getElementById("pos11");
const pos12 = document.getElementById("pos12");
const pos13 = document.getElementById("pos13");

const pos21 = document.getElementById("pos21");
const pos22 = document.getElementById("pos22");
const pos23 = document.getElementById("pos23");

const pos31 = document.getElementById("pos31");
const pos32 = document.getElementById("pos32");
const pos33 = document.getElementById("pos33");
// IsX determines the turn of player, if it is X or O, if value is true it is X's turn
let IsX = true;
// Filledpoints gets appended the filled cells as the game being played, this happens only once per cell
let FilledPoints = []
 
//Eventlistener for each cell
pos11.addEventListener("click",() => { placeXO(pos11.querySelector("text"))});
pos12.addEventListener("click",() => { placeXO(pos12.querySelector("text"))});
pos13.addEventListener("click",() => { placeXO(pos13.querySelector("text"))});

pos21.addEventListener("click",() => { placeXO(pos21.querySelector("text"))});
pos22.addEventListener("click",() => { placeXO(pos22.querySelector("text"))});
pos23.addEventListener("click",() => { placeXO(pos23.querySelector("text"))});

pos31.addEventListener("click",() => { placeXO(pos31.querySelector("text"))});
pos32.addEventListener("click",() => { placeXO(pos32.querySelector("text"))});
pos33.addEventListener("click",() => { placeXO(pos33.querySelector("text"))});

// function that put X or O into cell, the text element inside g tag is passed in to the function for the alteration if its inner html
function placeXO(a){
    // check for if text on cell has been changed, by looking at the values inside FilledPoints   
    if(FilledPoints.includes(a.id) === false){
        // X's turn, the class of text element is modified for colour, red and html element is modified as X
        if (IsX){
            a.innerHTML = "X"
            a.classList.add("red")
            a.classList.remove("black")
            IsX = false
        }
        // O's turn, the class of text element is modified for colour, black and html element is modified as O
        else{
            a.innerHTML = "O"
            a.classList.add("black")
            a.classList.remove("red")
            IsX = true
        }
        // FilledPoints gets appended, so that cell cannot be overwritten
        FilledPoints.push(a.id)
        // CheckWin checks if a player has won
        checkWin()
        console.log(FilledPoints)
    }
    
}
function checkWin(){
    // CheckO and CheckX are arrays defined they are appended with cell values of O and X
    let checkO = []
    let checkX = []
    // variable to set if any player has won
    let wonSelected = false
    // The earliest win of the game is from 5 moves, checks if there have been 5 moves
    if (FilledPoints.length>=5){
        // Since X starts the game all even indexes in FilledPoints array are Xs and they get appended into checkX
        for(let i = 0 ; i<FilledPoints.length;i+=2){
            checkX.push(FilledPoints[i])    
        }
        // All odd indexes in FilledPoints array are Xs and they get appended into checkX
        for(let i = 1 ; i<FilledPoints.length;i+=2){
            checkO.push(FilledPoints[i])   
        }
        inlineCheck(checkX,"X")
        inlineCheck(checkO,"O")
        // Check for if FilledPoints length has reached 9, if without a win game is a  cats game
        if(FilledPoints.length >= 9){
            if (wonSelected === false){
                setTimeout(function(){ if(!alert("Cats game!")){window.location.reload();}; }, 100);
            }
        }
        
        console.log(checkO)
        console.log(checkX)
        
    }
    // this function checks for wining cell arrangements, the cell values of player and player sign has to be passed
    function inlineCheck(arrayin,player){
        // row and column cell counters, gets incremented if adjacent pieces(Xs or Os) are equal 
        let inrowCount = 0
        let inColCount = 0
        
        for (var i = 1;i<=3;i++){
            for(var j= 1;j<=3;j++){
                // determination of winning row arrangements (outputs 3 cells near to each other in a row for 3 rows) 
                var rowPos = i.toString() + j.toString()
                // determination of winning column arrangements (outputs 3 columns near to each other in a column for 3 columns)
                var colPos = j.toString() + i.toString()
                // if a cell value determined above in array passed in (for Xs or Os) increase the counters respectively for rows or columns
                if(arrayin.includes(rowPos)){
                    inrowCount++
                }
                if(arrayin.includes(colPos)){
                    inColCount++
                }
                // if one of above counters has reached 3 the winner is selected 
                if(inrowCount>=3 || inColCount>=3){
                    
                    setTimeout(function(){ if(!alert(player+" has won")){window.location.reload();}; }, 100);
                    wonSelected = true;
                }  
            }
            inrowCount = 0
            inColCount = 0
            
        }
        // condition for winning in diagonals
        if((arrayin.includes("11")&&arrayin.includes("22")&&arrayin.includes("33")) || (arrayin.includes("13")&&arrayin.includes("22")&&arrayin.includes("31"))){
            setTimeout(function(){ if(!alert(player+" has won")){window.location.reload();}; }, 100);
            wonSelected = true;
        }
    }
}
