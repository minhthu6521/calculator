import React, { Component } from 'react';


const OperationButton = ({operator, operationFunction}) => {return (
  <div className="operation-button" value={operator} onClick={operationFunction}>{operator}</div>
)}

const NumberButton = ({number, numberFunction}) => {return (
  <div className="number-button" value={number} onClick={numberFunction}>{number}</div>
)}

class Buttons extends Component {
  render() {
    return (
      <div className="buttons">
        <div className="calculator-button cancel-button" onClick={this.props.clear} id="cancel">AC</div>
        <div className="calculator-button operator" onClick={this.props.operate} id="divide" data-value="/">/</div>
        <div className="calculator-button operator" onClick={this.props.operate} id="multiply" data-value="*">*</div>
        <div className="calculator-button operator" onClick={this.props.operate} id="minus" data-value="-">-</div>
        <div className="calculator-button operator" onClick={this.props.operate} id="plus" data-value="+">+</div>
        <div className="calculator-button number" onClick={this.props.operate} id="one" data-value="1">1</div>
        <div className="calculator-button number" onClick={this.props.operate} id="two" data-value="2">2</div>
        <div className="calculator-button number" onClick={this.props.operate} id="three" data-value="3">3</div>
        <div className="calculator-button number" onClick={this.props.operate} id="four" data-value="4">4</div>
        <div className="calculator-button number" onClick={this.props.operate} id="five" data-value="5">5</div>
        <div className="calculator-button number" onClick={this.props.operate} id="six" data-value="6">6</div>
        <div className="calculator-button number" onClick={this.props.operate} id="seven" data-value="7">7</div>
        <div className="calculator-button number" onClick={this.props.operate} id="eight" data-value="8">8</div>
        <div className="calculator-button number" onClick={this.props.operate} id="nine" data-value="9">9</div>
        <div className="calculator-button number" onClick={this.props.operate} id="zero" data-value="0">0</div>
        <div className="calculator-button separator" onClick={this.props.handleDecimal} id="decimal" data-value=".">.</div>
        <div className="calculator-button operator" onClick={this.props.getResult} id="equal" data-value="=">=</div>
      </div>
    )
  }
}

class Output extends Component {
  render() {
    return (<div id="display" className="outputScreen"><span>{this.props.currentValue}</span></div>)
  }
}

class Formula extends Component {
  render() {
    return (<div id="formula" className="formulaScreen"><span>{this.props.formula}</span></div>)
  }
}

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.numbers = Array.from({length: 10}, (x,i) => (i).toString());
    this.operators = ['+', '-', '/', '*'];
    this.state = {
      formula: "",
      result: 0,
      display: ""
    }
  }

  clear = () => {
      this.setState({
        formula: "",
        display: ""
      })
  }

  isNumber(i) {
    return this.numbers.indexOf(i) !== -1
  }

  isOperator(i) {
    return this.operators.indexOf(i) !== -1
  }

  operate = (e) => {
    let formula = this.state.formula;
    const currentInput = e.target.dataset.value,
          lastInput = formula.charAt(formula.length - 1);
    if (this.isNumber(currentInput)) {
      if(formula.indexOf("=") !== -1) {
        formula = currentInput;
      } else {
        formula += this.isNumber(lastInput) ? currentInput : " " + currentInput;
      }
    } else {
      if(formula.indexOf("=") !== -1) {
        formula = this.state.display;
      }
      if(this.isOperator(lastInput)) {
        formula = formula.slice(0, -1);
        formula += currentInput;
      } else {
        formula = formula + " " + currentInput;
      }
    }
    this.setState({
      formula: formula,
      display: lastInput
    })
  }

  getResult = () => {
    let formula = this.state.formula;
    let lastInput = formula.charAt(formula.length - 1);;
    if(this.isOperator(lastInput) || lastInput === "."){
        formula = formula.slice(0, -1);
    }
    let result = eval(formula);
    formula = formula + " = " + result;
    this.setState({
      formula:formula,
      display:result
    })
  }

  handleDecimal() {
    console.log("");
  }

  render() {
    return (
      <div className="calculator">
        <div className="screen">
          <Formula formula={this.state.formula}/>
          <Output currentValue={this.state.display}/>
        </div>
        <Buttons operate={this.operate} clear={this.clear} handleDecimal={this.handleDecimal} getResult={this.getResult}/>
      </div>
    )
  }
}
