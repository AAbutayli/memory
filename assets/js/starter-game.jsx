import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: false };
  }

  swap(_ev) {
    let state1 = _.assign({}, this.state, { left: !this.state.left });
    this.setState(state1);
  }

  hax(_ev) {
    alert("hax!");
  }

  render() {
    /*let button = <div className="column" onMouseMove={this.swap.bind(this)}>
      <p><button onClick={this.hax.bind(this)}>Click Me</button></p>
    </div>;

    let blank = <div className="column">
      <p>Nothing here.</p>
    </div>;

    if (this.state.left) {
      return <div className="row">
        {button}
        {blank}
      </div>;
    }
    else {
      return <div className="row">
        {blank}
        {button}
      </div>;
    }
    */
    return (
      <div>
        <Board />
      </div>
    );



  }
}

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
      
      <div className='card-border'
      
      >
        <div
          className={this.state.cardClass}
          onClick={() => this.setState({ value: "letter" })}
          >
          {this.state.value}

        </div>
      </div>
    );
  }

  change(){
    if(this.state.matched){
      return ;

    }
    else if(!this.state.flipped){
      this.state.cardClass= 'flippedCard'
      this.state.value = this.state.letter
      this.state.flipped =true
    }
    else{
      this.state.cardClass= 'card'
      this.state.value = '?'
      this.state.flipped =false
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

  constructor(props){
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

  incrment(){
    this.state.count += 1

  }
}
