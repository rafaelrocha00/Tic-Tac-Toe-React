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
            <BoardElement style={"boardElement"} key={index} markPlayerFunction={() => this.tryToMarkElement(index)} value={this.state.boardElements.at(index)}></BoardElement>
        )
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

            if (this.checkIfIsEqual(element1, element2, element3)) 
            {
                this.checkWhoWon(element1);
            }
        }
    }

    checkVerticalBoardElements = (boardElements) => {
        if(!boardElements){
            console.log("Board elements is null");
        }

        for (let i = 0; i < 3; i++) {
            let row = i;
            let element1 = boardElements[row];
            let element2 = boardElements[row + 3];
            let element3 = boardElements[row + 6];

            if (this.checkIfIsEqual(element1, element2, element3)) 
            {
                this.checkWhoWon(element1);
            }
        }
    }

    checkDiagonalBoardElements = (boardElements) => {
        if(!boardElements){
            console.log("Board elements is null");
        }

        let element1 = boardElements[0];
        let element2 = boardElements[4];
        let element3 = boardElements[8];

        if (this.checkIfIsEqual(element1, element2, element3)) 
        {
            this.checkWhoWon(element1);
        }

         element1 = boardElements[2];
         element2 = boardElements[4];
         element3 = boardElements[6];

        if (this.checkIfIsEqual(element1, element2, element3)) 
        {
            this.checkWhoWon(element1);
        }
    }

    checkIfIsEqual = (element1, element2, element3) => {
        return ((element1 === element2) && (element2 === element3));
    }

    checkWhoWon = (elementOfTest) => {
        if(elementOfTest === "") return;

        if (elementOfTest === "X") 
        {
            this.declareVictory();
            return;
        }

        this.declareDefeat();
    }

    declareVictory = () =>{
        if(this.state.gameHasEnded) return;
        this.setState({victories: this.state.victories+1})
        this.setState({gameHasEnded: true}, () => {console.log(this.state.gameHasEnded)});
        console.log("Player Won!");
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
    }
}

export default Board;