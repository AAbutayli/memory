import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      score: 0,
      openedCard: [],
      lastOpenedIndex: -1
    };
    this.createCards();
    //console.log(this.state.cardList);
  }

  createCards() {
    let letterList = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    letterList = _.shuffle(letterList);
    for (let i = 0; i < 16; i++) {
      var card = {
        value: '?',
        letter: letterList[i],
        flipped: false,
        matched: false,
        cardClass: 'card'
      };

      this.state.cardList.push(card);
    }
  }

  renderCard(i) {

    let card = this.state.cardList[i];
    return (
      <div className='col-3'>
        <div className='card-border'>
          <div
            onClick={() => this.x(i)}
            className={card.cardClass}
            
          >
            {card.value}
          </div>
        </div>
      </div>
    );

  }

  renderBoard() {
    
    return (
      <div>
        <div>
          <div className='board-row'>
            {this.renderCard(0)}
            {this.renderCard(1)}
            {this.renderCard(2)}
            {this.renderCard(3)}
          </div>
          <div className='board-row'>
            {this.renderCard(4)}
            {this.renderCard(5)}
            {this.renderCard(6)}
            {this.renderCard(7)}
          </div>
          <div className='board-row'>
            {this.renderCard(8)}
            {this.renderCard(9)}
            {this.renderCard(10)}
            {this.renderCard(11)}
          </div>
          <div className='board-row'>
            {this.renderCard(12)}
            {this.renderCard(13)}
            {this.renderCard(14)}
            {this.renderCard(15)}
          </div>
        </div>
        <div>
          <div className='board-row'>
              <span>Score: </span>
              {this.state.score}
          </div>
        </div>

      </div>
    );

  }

  incrment() {
    this.state.score++;
  }

  isFirst(){
    return this.state.openedCard.length % 2 == 0;
  }

  flip(i){
    var card = this.state.cardList[i]
    if(card.flipped){
      card.cardClass = 'card'
      card.value = '?'
      card.flipped = false
      this.state.cardList[i]= card
      this.setState({cards: this.state.cardList})
      this.state.openedCard.splice(this.state.openedCard.length - 1, 1) 

    }
    else{
      card.cardClass = 'flippedCard'
      card.value = card.letter
      card.flipped = true
      this.state.cardList[i]= card
      this.setState({cards: this.state.cardList})

    }
  }
  
  isMatched(card){
    
    let i = this.state.openedCard.length -1
    let openedCard = this.state.openedCard[i]
    if (i<0){
      return false
    }    

    return openedCard.value == card.value;
  }

  x(i){
    if (this.isFirst()) {
      if (!this.state.cardList[i].matched) {
        this.flip(i)
        this.state.openedCard.push(this.state.cardList[i])
        this.state.lastOpenedIndex = i
        this.incrment()
      }
    }
    else{
      if (!this.state.cardList[i].matched && i!= this.state.lastOpenedIndex) {
       
        this.flip(i)
        this.incrment()
        if(this.isMatched(this.state.cardList[i])){
          this.state.openedCard.push(this.state.cardList[i])
          this.state.cardList[i].matched = true
          this.state.cardList[this.state.lastOpenedIndex].matched = true
          this.setState({cards: this.state.cardList})
          this.state.lastOpenedIndex = -1
        }else{           
          this.flip(i) 
          this.flip(this.state.lastOpenedIndex)
          this.state.lastOpenedIndex = -1
          this.state.openedCard.splice(this.state.openedCard.length - 1, 1)
        }
        
      }
    }
  }

  render(){

    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

}








































/*
class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '?',
      flipped: false,
      letter: 'A',
      matched: false,
      cardClass: 'card',
    };
  }

  render() {
    return (
      <div className='card-border'>
        <div
          className={this.state.cardClass}
        /*onClick={() => this.setState({ value: "letter" })}
        >
          {this.state.value}
        </div>
      </div>
    );
  }


  flipToLetter(Card) {
    this.state.cardClass = 'flippedCard'
    this.state.value = this.state.letter
    this.state.flipped = true
    this.state.matched = Card.state.letter == this.state.letter


  }

  flipToQMark() {
    if (!this.state.matched) {
      this.state.cardClass = 'card'
      this.state.value = '?'
      this.state.flipped = false
    }
  }


  change() {
    if (this.state.matched) {
      return;

    }
    else if (!this.state.flipped) {
      this.state.cardClass = 'flippedCard'
      this.state.value = this.state.letter
      this.state.flipped = true
    }
    else {
      this.state.cardClass = 'card'
      this.state.value = '?'
      this.state.flipped = false
    }

  }
}

class Board extends React.Component {



  renderCard(i) {
    return (
      <div className='col-3'>
        <Card />
      </div>
    );
  }

  render() {
    return (
      this.createBoard()
    );
  }

  createBoard() {
    return (<div>
      <div>
        <div className='board-row'>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
        </div>
        <div className='board-row'>
          {this.renderCard(4)}
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
        </div>
        <div className='board-row'>
          {this.renderCard(8)}
          {this.renderCard(9)}
          {this.renderCard(10)}
          {this.renderCard(11)}
        </div>
        <div className='board-row'>
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
          {this.renderCard(15)}
        </div>
      </div>
      <div>
        <div className='board-row'>
          <Score />
        </div>
      </div>

    </div>);

  }
}

class Score extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    };

  }
  render() {
    return (
      <div>
        <span>Score: </span>
        <span>{this.state.count}</span>
      </div>
    );
  }

  incrment() {
    this.state.count += 1;

  }
}*/
