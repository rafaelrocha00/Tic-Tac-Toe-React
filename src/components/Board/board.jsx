import React from 'react';
import BoardElement from '../BoardElement/BoardElement';
import './board.css';

class Board extends React.Component {

    constructor(probs) {
        super(probs);
        this.state = { boardElements: ['', '', '', '', '', '', '', '', ''],
                        boardElementColors: ['', '', '', '', '', '', '', '', ''],
                       gameHasEnded: false,
                       victories: 0,
                       defeats: 0}
    }

    render() {
        return (
            <div className='mainScreen'>
                <h1>Jogo Da Velha</h1>
                <div className='mainBoard'>
                    {this.state.boardElements.map((element, index) => this.generateBoardElements(element, index))}
                </div>
                <button onClick={() => {this.restartGame()}}><div className='buttonText'>Restart</div></button>
                <div className='result positive'>Victories: {this.state.victories}</div>
                <div className='result negative'>Defeats: {this.state.defeats}</div>


            </div>
        );
    }

    generateBoardElements(element, index) {
        return (
            <BoardElement style={this.getColor(index)} key={index} markPlayerFunction={() => this.tryToMarkElement(index)} value={this.state.boardElements.at(index)}></BoardElement>
        )
    }

    getColor(index){
        return "boardElement " + this.state.boardElementColors[index];
    }

    tryToMarkElement = (index) => {
        if(this.state.gameHasEnded == true) return;

        if (this.state.boardElements[index] != '') {
            return;
        }

        let newElementsBoard = Array.from(this.state.boardElements);
        newElementsBoard[index] = 'X';
        newElementsBoard = this.EnemyTryToMarkElement(newElementsBoard);
        this.setState({ boardElements: newElementsBoard});
    }


    EnemyTryToMarkElement = (boardElements) => {

        let index  = 0;
        let orderOfActions = [1,3,6,7,0,2,5,8,4];

        for (let i = 0; i < orderOfActions.length; i++) {
            if(boardElements[orderOfActions[i]] == ""){
                index = orderOfActions[i];
            }
            
        }

        let newElementsBoard = Array.from(boardElements);
        newElementsBoard[index] = "O";
        this.setState({ boardElements: newElementsBoard });
        this.CheckGameState(newElementsBoard);
        return newElementsBoard;
    }

    CheckGameState = (boardElements) => {
      this.checkVerticalBoardElements(boardElements);
      this.checkHorizontalBoardElements(boardElements);
      this.checkDiagonalBoardElements(boardElements);
      this.CheckTie(boardElements);
    }

    CheckTie = (boardElements) => {
        for (let i = 0; i < boardElements.length; i++) {
            const element = boardElements[i];
            if(element == "") return;
        }

        this.declareTie();
    }

    checkHorizontalBoardElements = (boardElements) => {
        if(!boardElements){
            console.log("Board elements is null");
        }

        for (let i = 0; i < 3; i++) {
            let row = i * 3;
            let element1 = boardElements[row];
            let element2 = boardElements[row + 1];
            let element3 = boardElements[row + 2];

            console.log(`rows: ${row}:${element1} ${row + 1}:${element2} ${row + 2}:${element3}`)
            this.checkResult(row, row+1, row+2, boardElements);
        }
    }

    checkVerticalBoardElements = (boardElements) => {
        if(!boardElements){
            console.log("Board elements is null");
        }

        for (let i = 0; i < 3; i++) {
            let row = i;
            this.checkResult(row,row+3, row+6, boardElements);
        }
    }

    checkDiagonalBoardElements = (boardElements) => {
        if(!boardElements){
            console.log("Board elements is null");
        }

        let element1 = boardElements[0];
        let element2 = boardElements[4];
        let element3 = boardElements[8];

        this.checkResult(0, 4, 8, boardElements);


         element1 = boardElements[2];
         element2 = boardElements[4];
         element3 = boardElements[6];

         this.checkResult(2, 4, 6, boardElements);

    }

    checkIfPlayerWon=(testElement) => {
    return testElement === "X";
    }

    checkResult(index1, index2, index3, boardElement){
        let element1 = boardElement[index1];
        let element2 = boardElement[index2];
        let element3 = boardElement[index3];


        if(element1 == "") return;
        if(element2 == "") return;
        if(element3 == "") return;

        console.log(`elementos passados: ${element1}, ${element2}, ${element3}`)

        if (this.checkIfIsEqual(element1, element2, element3)) 
        {
            if(this.checkIfPlayerWon(element1)){
                this.declareVictory();
                this.changeColorToVictory(index1, index2, index3);
            }else{
                this.declareDefeat();
                this.changeColorToDefeat(index1, index2, index3);
            }

        }
    }

    checkIfIsEqual = (element1, element2, element3) => {
        return ((element1 === element2) && (element2 === element3));
    }

    declareVictory = () =>{
        if(this.state.gameHasEnded) return;
        this.setState({victories: this.state.victories+1})
        this.setState({gameHasEnded: true}, () => {console.log(this.state.gameHasEnded)});
        console.log("Player Won!");
    }

    changeColorToVictory = (index1, index2, index3) =>{
        let newBoardElementColors = Array.from(this.state.boardElementColors);
        newBoardElementColors[index1] = "victoryColor";
        newBoardElementColors[index2] = "victoryColor";
        newBoardElementColors[index3] = "victoryColor";
        this.setState({boardElementColors: newBoardElementColors})
    }

    changeColorToDefeat = (index1, index2, index3) =>{
        let newBoardElementColors = Array.from(this.state.boardElementColors);
        newBoardElementColors[index1] = "defeatColor";
        newBoardElementColors[index2] = "defeatColor";
        newBoardElementColors[index3] = "defeatColor";
        this.setState({boardElementColors: newBoardElementColors})
    }


    declareDefeat = () => {
        if(this.state.gameHasEnded) return;
        this.setState({defeats: this.state.defeats+1})
        this.setState({gameHasEnded: true }, () => {console.log(this.state.gameHasEnded)});
        console.log("Player Lost!");
    }

    declareTie = () =>{
        if(this.state.gameHasEnded) return;

        this.setState({gameHasEnded: true }, () => {console.log(this.state.gameHasEnded)});
        console.log("Is a Tie");
    }

    restartGame = () => {
        this.setState({gameHasEnded:false});
        this.setState({ boardElements: ['', '', '', '', '', '', '', '', '']});
        this.setState({ boardElementColors: ['', '', '', '', '', '', '', '', '']});

    }
}

export default Board;