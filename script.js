document.getElementById('pickCross').addEventListener('click', () => game.chooseMarker('cross'));
document.getElementById('pickCircle').addEventListener('click', () => game.chooseMarker('circle'));
document.getElementById('popupIllegalMoveButton').addEventListener('click', () => document.getElementById('popupIllegalMove').style.display = "none")

document.getElementById('popupRoundWinnerButton').addEventListener('click', () => {
    document.getElementById('popupRoundWinner').style.display = "none";
    game.nextRound();
});

document.getElementById('popupGameWinnerButton').addEventListener('click', () =>{
    document.getElementById('popupGameWinner').style.display = "none";
    game.newGame();
});

document.getElementById('popupTieButton').addEventListener('click', () => {
    document.getElementById('popupTie').style.display = "none";
    game.nextRound();
})

document.getElementById('Player2Human').addEventListener('click', () => {
    game.Player2.AI = false;
    document.getElementById('popupChoosePlayer2').style.display = "none";
});

document.getElementById('Player2Easy').addEventListener('click', () => {
    game.Player2.AI = true;
    game.Player2.AIdifficulty = 1;
    document.getElementById('popupChoosePlayer2').style.display = "none";
});

document.getElementById('Player2Medium').addEventListener('click', () => {
    game.Player2.AI = true;
    game.Player2.AIdifficulty = 2;
    document.getElementById('popupChoosePlayer2').style.display = "none";
});

document.getElementById('Player2Hard').addEventListener('click', () => {
    game.Player2.AI = true;
    game.Player2.AIdifficulty = 3;
    document.getElementById('popupChoosePlayer2').style.display = "none";
});


const cell_a1 = document.getElementById('a1')
cell_a1.addEventListener("click", () => game.playTurn('a1'))

const cell_a2 = document.getElementById('a2')
cell_a2.addEventListener("click", () => game.playTurn('a2'))

const cell_a3 = document.getElementById('a3')
cell_a3.addEventListener("click", () => game.playTurn('a3'))

const cell_b1 = document.getElementById('b1')
cell_b1.addEventListener("click", () => game.playTurn('b1'))

const cell_b2 = document.getElementById('b2')
cell_b2.addEventListener("click", () => game.playTurn('b2'))

const cell_b3 = document.getElementById('b3')
cell_b3.addEventListener("click", () => game.playTurn('b3'))

const cell_c1 = document.getElementById('c1')
cell_c1.addEventListener("click", () => game.playTurn('c1'))

const cell_c2 = document.getElementById('c2')
cell_c2.addEventListener("click", () => game.playTurn('c2'))

const cell_c3 = document.getElementById('c3')
cell_c3.addEventListener("click", () => game.playTurn('c3'))
    
const game = {
    markers: {
        circle: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><circle style="fill:none; stroke-width:2;stroke-miterlimit:10;" cx="16" cy="16" r="11"/></svg>',

        cross: `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="cross" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><line id="primary" x1="19" y1="19" x2="5" y2="5" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><line id="primary-2" data-name="primary" x1="19" y1="5" x2="5" y2="19" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg>`
    },

    updateBoard(cell) {
        if (this.currentPlayer === 1) {
            this.Player1.marker === "cross" ? document.getElementById(cell).innerHTML = this.markers.cross : document.getElementById(cell).innerHTML = this.markers.circle;
        } else if (this.currentPlayer === 2) {
            this.Player2.marker === "cross" ? document.getElementById(cell).innerHTML = this.markers.cross : document.getElementById(cell).innerHTML = this.markers.circle;
        }       
    },

    resetBoard() {
        this.availableCells = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.innerHTML = "")
    },

    displayPopUpChooseMarker() {
        document.getElementById('popupChooseMarker').style.display = "flex"
    },

    displayPopUpIllegalMove() {
        document.getElementById('popupIllegalMove').style.display = "flex"
    },

    displayPopUpChoosePlayer2() {
        document.getElementById('popupChoosePlayer2').style.display = "flex";
    },

    chooseMarker(sym) {
        if (sym === "cross") {
            this.Player1.marker = "cross";
            this.Player2.marker = "circle";
            document.getElementById('Player1marker').innerHTML = this.markers.cross
            document.getElementById('Player2marker').innerHTML = this.markers.circle
        } else if (sym === "circle") {
            this.Player1.marker = "circle";
            this.Player2.marker = "cross";
            document.getElementById('Player1marker').innerHTML = this.markers.circle
            document.getElementById('Player2marker').innerHTML = this.markers.cross
        }
        document.getElementById('popupChooseMarker').style.display = "none"
        game.displayPopUpChoosePlayer2();
    },

    availableCells: ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'],

    Player1: {
        score: 0,
        marker: "cross",
        playedCells: [],
    },

    Player2: {
        score: 0,
        marker: "circle",
        playedCells: [],
        AI: "",
        AIdifficulty: "",
    },

    currentPlayer: 1,

    currentRound: 1,

    lastMovePlayed: "",

    switchPlayers() {
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
            this.announceCurrentTurn()
        } else if (this.currentPlayer === 2) {
            this.currentPlayer = 1;
            this.announceCurrentTurn()
        }
    },

    announceCurrentTurn() {
        const currentTurn = document.getElementById('currentTurn');
        currentTurn.innerText = `Current turn: Player ${this.currentPlayer}`
    },

    registerMove(cell) {
        if (this.currentPlayer === 1) {
            this.Player1.playedCells.push(cell);
        } else if (this.currentPlayer === 2) {
            this.Player2.playedCells.push(cell);
        }
        this.lastMovePlayed = cell;
        this.availableCells.splice(this.availableCells.indexOf(cell), 1)
    },

    playTurn(cell) {
        if (this.currentPlayer === 1 && this.availableCells.includes(cell)) {
            this.registerMove(cell),
            this.updateBoard(cell),
            this.endTurn(this.availableCells, this.Player1.playedCells, this.Player2.playedCells);
        } else if (this.currentPlayer === 2 && this.availableCells.includes(cell)) {
            this.registerMove(cell),
            this.updateBoard(cell),
            this.endTurn(this.availableCells, this.Player1.playedCells, this.Player2.playedCells);
        } else {
            game.displayPopUpIllegalMove();
        }
    },

    isRoundEnded(availableMoves, movesPlayer1, movesPlayer2) {
        if (
            movesPlayer1.includes("a1") && movesPlayer1.includes("a2") && movesPlayer1.includes("a3") ||
            movesPlayer1.includes("b1") && movesPlayer1.includes("b2") && movesPlayer1.includes("b3") ||
            movesPlayer1.includes("c1") && movesPlayer1.includes("c2") && movesPlayer1.includes("c3") ||
            movesPlayer1.includes("a1") && movesPlayer1.includes("b1") && movesPlayer1.includes("c1") ||
            movesPlayer1.includes("a2") && movesPlayer1.includes("b2") && movesPlayer1.includes("c2") ||
            movesPlayer1.includes("a3") && movesPlayer1.includes("b3") && movesPlayer1.includes("c3") ||
            movesPlayer1.includes("a1") && movesPlayer1.includes("b2") && movesPlayer1.includes("c3") ||
            movesPlayer1.includes("a3") && movesPlayer1.includes("b2") && movesPlayer1.includes("c1")
        ) {
            return "Player1Won";
        } else if (
            movesPlayer2.includes("a1") && movesPlayer2.includes("a2") && movesPlayer2.includes("a3") ||
            movesPlayer2.includes("b1") && movesPlayer2.includes("b2") && movesPlayer2.includes("b3") ||
            movesPlayer2.includes("c1") && movesPlayer2.includes("c2") && movesPlayer2.includes("c3") ||
            movesPlayer2.includes("a1") && movesPlayer2.includes("b1") && movesPlayer2.includes("c1") ||
            movesPlayer2.includes("a2") && movesPlayer2.includes("b2") && movesPlayer2.includes("c2") ||
            movesPlayer2.includes("a3") && movesPlayer2.includes("b3") && movesPlayer2.includes("c3") ||
            movesPlayer2.includes("a1") && movesPlayer2.includes("b2") && movesPlayer2.includes("c3") ||
            movesPlayer2.includes("a3") && movesPlayer2.includes("b2") && movesPlayer2.includes("c1")
        ) {
            return "Player2Won"
        } else if (availableMoves.length === 0) {
            return "tie";
        } else {
            return "continue"
        }
    },

    endTurn(availableMoves, movesPlayer1, movesPlayer2) {
        if (this.isRoundEnded(availableMoves, movesPlayer1, movesPlayer2) === "Player1Won") {
            this.PlayerWonRound(this.Player1);
        } else if (this.isRoundEnded(availableMoves, movesPlayer1, movesPlayer2) === "Player2Won") {
            this.PlayerWonRound(this.Player2)
        } else if (this.isRoundEnded(availableMoves, movesPlayer1, movesPlayer2) === "tie") {
            this.announceTie();
        } else if (this.isRoundEnded(availableMoves, movesPlayer1, movesPlayer2) === "continue") {
            if(!this.Player2.AI) {
               this.switchPlayers(); 
            } else if (this.Player2.AI && this.currentPlayer === 2) {
                this.switchPlayers();
            } else if (this.Player2.AI && this.currentPlayer === 1){
                this.switchPlayers();
                this.playTurn(this.computerPlays(this.Player2.AIdifficulty));
            }
        }
    },

    announceRoundWinner() {
        document.getElementById('roundWinnerAnnouncer').innerText = `Player ${this.currentPlayer} won this round!`;
        document.getElementById('Player1Score').innerText = this.Player1.score;
        document.getElementById('Player2Score').innerText = this.Player2.score;
        document.getElementById('popupRoundWinner').style.display = "flex";
    },

    announceTie() {
        document.getElementById('popupTie').style.display = "flex";
        document.getElementById('Player1Score-tie').innerText = this.Player1.score;
        document.getElementById('Player2Score-tie').innerText = this.Player2.score;
    },

    announceCurrentScore() {
        document.getElementById('counterPlayer1').innerText = `Score: ${this.Player1.score}`
        document.getElementById('counterPlayer2').innerText = `Score: ${this.Player2.score}`
    },

    announceCurrentRound() {
        document.getElementById("currentRound").innerText = `Current round: ${this.currentRound}` 
    },

    PlayerWonRound(player) {
        player.score ++
        if(player.score >= 3) {
            this.announceWinner()
        } else {
            this.currentRound ++;
            this.announceRoundWinner();
            this.announceCurrentScore();
        }
    },

    nextRound() {
        this.resetBoard();
        this.resetPlayedCells();
        this.switchPlayers();
        this.announceCurrentRound();
        this.announceCurrentTurn();
        if (this.Player2.AI && this.currentPlayer === 2) {
            this.playTurn(this.computerPlays(this.Player2.AIdifficulty))
        }
    },

    announceWinner() {
        document.getElementById('gameWinnerAnnouncer').innerText = `Player ${this.currentPlayer} won the game!`;
        document.getElementById('Player1TotalScore').innerText = this.Player1.score;
        document.getElementById('Player2TotalScore').innerText = this.Player2.score;
        document.getElementById('popupGameWinner').style.display = "flex"
    },

    newGame() {
        this.resetBoard();
        this.resetScore();
        this.resetMarkers();
        this.resetPlayedCells();
        this.currentRound = 1;
        this.displayPopUpChooseMarker();
        this.announceCurrentScore();
        this.announceCurrentRound();
    },

    resetScore() {
        this.Player1.score = 0;
        this.Player2.score = 0;
    },

    resetMarkers() {
        this.Player1.marker = "";
        this.Player2.marker = "";
    },

    resetPlayedCells() {
        this.Player1.playedCells = [];
        this.Player2.playedCells = [];
    },

    computerPlays(lvl) {
        if (lvl === 1) {
            let maxIndex = game.availableCells.length - 1;
            let n = Math.floor(Math.random() * maxIndex)
            return game.availableCells[n];
        } else if (lvl === 2) {
            let n = Math.floor(Math.random() * 100)
            if (n <= 60) {
                let move = game.findOptimalMove(this.lastMovePlayed, this.availableCells, this.Player1.playedCells, this.Player1.playedCells, 2, depth = 0)
                return move.cell
            } else if (n >= 61) {
                let maxIndex = game.availableCells.length - 1;
                let n = Math.floor(Math.random() * maxIndex)
                return game.availableCells[n];
            }
        } else if (lvl === 3) {
            let move = game.findOptimalMove(this.lastMovePlayed, this.availableCells, this.Player1.playedCells, this.Player1.playedCells, 2, depth = 0)
            return move.cell
        }
    },

    findOptimalMove(lastMove, availableMoves, movesPlayer1, movesPlayer2, Player, depth = 0) {
        let lastMovePlayed = lastMove;        
        let cellsFree = [...availableMoves];
        let cellsP1 = [...movesPlayer1];
        let cellsP2 = [...movesPlayer2];
        let potentialMove = {
            cell: "",
            eval: "",
        };
        //Evaluate current position if round is over.
        if (this.isRoundEnded(cellsFree, cellsP1, cellsP2) === "Player1Won") {
            let potentialMove = {
                cell: lastMovePlayed,
                eval: -10 + depth,
            };
            return potentialMove
        } else if (this.isRoundEnded(cellsFree, cellsP1, cellsP2) === "Player2Won") {
            let potentialMove = {
                cell: lastMovePlayed,
                eval: +10 - depth,
            };
            return potentialMove
        } else if (this.isRoundEnded(cellsFree, cellsP1, cellsP2) === "tie") {
            let potentialMove = {
                cell: lastMovePlayed,
                eval: 0,
            };
            return potentialMove
        }

        if (Player === 1) {
            potentialMove.eval = +Infinity //Player 1 is looking for the lowest value move.
            
            //Since the game is not over yet, consider the first available move as potential move and evaluate again, this time for other player.
            for (let i = 0; i <= cellsFree.length - 1; i++) {
                let newLastMove = cellsFree[i];
                let newCellsFree = [...cellsFree];
                newCellsFree = newCellsFree.filter(move => move !== cellsFree[i]);
                
                let newCellsP1 = [...cellsP1]             
                newCellsP1.push(cellsFree[i])

                depth++ // Depth is how far ahead the function is currently looking. Since we "made" new move, now it's looking one step further

                //Function call for next player
                let eval = this.findOptimalMove(newLastMove, newCellsFree, newCellsP1, cellsP2, 2, depth);

                //Check if reached value is lower, then current. If it is - this is our new move.
                if (eval.eval < potentialMove.eval) {
                    potentialMove.cell = eval.cell;
                    potentialMove.eval = eval.eval ;
                }
            };
            return potentialMove;

        } else if (Player === 2) {
            potentialMove.eval = -Infinity //Player 1 is looking for the highest value move.
            
            for (let i = 0; i <= cellsFree.length - 1; i++) {
                let newLastMove = cellsFree[i];

                let newCellsFree = [...cellsFree];
                newCellsFree = cellsFree.filter(move => move !== cellsFree[i]);

                let newCellsP2 = [...cellsP2]
                newCellsP2.push(cellsFree[i]);

                depth++
                let eval = this.findOptimalMove(newLastMove, newCellsFree, cellsP1, newCellsP2, 1, depth);

                if (eval.eval > potentialMove.eval) {
                    potentialMove.cell = eval.cell;
                    potentialMove.eval = eval.eval
                }
            }
            return potentialMove;
        }
    }
}

game.displayPopUpChooseMarker();