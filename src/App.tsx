import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import './style.css';
import { useState } from 'react';
import { winningCombos } from './winningCombos';

function App() {
  const initialGameState = { //declaring an object
    topLeft: false,
    topCenter: false,
    topRight: false,
    centerLeft: false,
    centerCenter: false,
    centerRight: false,
    bottomLeft: false,
    bottomCenter: false,
    bottomRight: false,
  }
  const initialBoardState = {
    topLeft: '',
    topCenter: '',
    topRight: '',
    centerLeft: '',
    centerCenter: '',
    centerRight: '',
    bottomLeft: '',
    bottomCenter: '',
    bottomRight: '',
  }
  const initialHeadingState = 'Play Game, X goes first';
  const [player1, setPlayer1] = useState({ ...initialGameState }); //spread operator
  const [player2, setPlayer2] = useState({ ...initialGameState });
  const [counter, setCounter] = useState(0);
  const [turn, setTurn] = useState('X');
  const [boardState, setBoardState] = useState({ ...initialBoardState });
  const [headingState, setHeadingState] = useState(initialHeadingState);
  const [endGame, setEndGame] = useState(null as any);  //react hooks define the state
  function resetBoard() {
    setPlayer1({ ...initialGameState });
    setPlayer2({ ...initialGameState });
    setCounter(0);
    setTurn('X');
    setBoardState({ ...initialBoardState });
    setHeadingState(initialHeadingState);
    setEndGame(null);
  }
  function handleClick(event: any) {
    if (boardState[event.target.id] !== '' || endGame) { //this is working anyway, blocks clicks after win
      return;
    }
    console.log(event.target.id);
    setBoardState({
      ...boardState,
      [event.target.id]: turn
    })
    const isPlayer1 = turn === 'X'
    const updatedPlayerState = {
      ...(isPlayer1 ? player1 : player2),
      [event.target.id]: true
    }

    for (const winningCombo of winningCombos) {   //for of loop
      const keys = Object.keys(winningCombo);  //of the key/object pairs
      if (
        updatedPlayerState[keys[0]] &&
        updatedPlayerState[keys[1]] &&  //typescript errors
        updatedPlayerState[keys[2]]
      ) {
        setEndGame(`
        ${isPlayer1 ? 'Player 1' : 'Player 2'} wins
        `)
        return
      }
    }
    if (counter === 8) {
      setEndGame('It\'s a draw');
      return;
    }
    if (isPlayer1) {
      setPlayer1(updatedPlayerState);  //keeping track of players to determine who won
    } else {
      setPlayer2(updatedPlayerState);
    }
    const nextTurn = turn === 'X' ? 'O' : 'X';   //shorthand if statement
    setTurn(nextTurn);
    setHeadingState(`${nextTurn}'s turn`);
    setCounter(counter + 1);
  }
  return (
    <>
      {endGame && (
        <Alert>{endGame}</Alert>
      )}
      <h1>{headingState}</h1>
      <div id="gameboard">
        <Container fluid>
          <Row className="my-4">
            <Col><div id='topLeft' onClick={handleClick} className="tile">{boardState.topLeft}</div></Col>
            <Col><div id='topCenter' onClick={handleClick} className="tile">{boardState.topCenter}</div></Col>
            <Col><div id='topRight' onClick={handleClick} className="tile">{boardState.topRight}</div></Col>
          </Row>
          <Row className="my-4">
            <Col><div id='centerLeft' onClick={handleClick} className="tile">{boardState.centerLeft}</div></Col>
            <Col><div id='centerCenter' onClick={handleClick} className="tile">{boardState.centerCenter}</div></Col>
            <Col><div id='centerRight' onClick={handleClick} className="tile">{boardState.centerRight}</div></Col>
          </Row>
          <Row className="my-4">
            <Col><div id='bottomLeft' onClick={handleClick} className="tile">{boardState.bottomLeft}</div></Col>
            <Col><div id='bottomCenter' onClick={handleClick} className="tile">{boardState.bottomCenter}</div></Col>
            <Col><div id='bottomRight' onClick={handleClick} className="tile">{boardState.bottomRight}</div></Col>
          </Row>
        </Container>
      </div>
      <Button onClick={resetBoard} variant="danger">Reset</Button>
    </>
  )
}

export default App
