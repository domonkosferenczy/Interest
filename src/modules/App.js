import React from 'react';
import '../CSS/App.css';
import Form from './Form';
import List from './List';
import Graph from './Graph';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {balance: "1,000", percent: 4, MY: "Month", period: 8, data: undefined}
  }

  formCalculate = (inputs) => {
    this.setState({
      balance: inputs.balance,
      percent: inputs.percent,
      MY: inputs.MY,
      period: inputs.period,
      data: undefined
    }, () => this.updateData())
  }

  updateData(){
    let data = [];
      data.push({
        number: 1,
        previous: this.state.balance,
        percent: this.state.percent,
        total: (this.state.balance * (this.state.percent / 100 + 1) * 100) / 100
      })
      
      for(let i = 1; i < (this.state.period * ((this.state.MY === "Month")?12:1)) ; i++){
        data.push({
          number: i+1,
          previous: data[i-1].total,
          percent: this.state.percent,
          total: Math.round(data[i-1].total * (this.state.percent / 100 + 1) * 100) / 100
        })
      }

     if (this.state.MY === "Month"){
        data = data.filter(datum => datum.number % 12 === 0).map((datum, index) => {
          datum.previous = data[datum.number-12].previous
          datum.number = datum.number / 12
          return datum
        })
      }
      
      this.setState({
        data: data
      })
  }

  render(){
    return (
      <div className="App">
        <header>Compound Interest Calculator</header>
        <div className="Form_container">
          <Form
            balance={this.state.balance}
            percent={this.state.percent}
            MY={this.state.MY}
            period={this.state.period}
            formCalculate={this.formCalculate}
            >
          </Form>
        </div>
        <Graph
          data={this.state.data}
          >
        </Graph>
        <List 
          data={this.state.data}
          MY={this.state.MY}
          >
        </List>
        <div className="assign">Created By: <a href="https://domonkosferenczy.hu">domonkosferenczy.hu</a></div>
      </div>
    );
  }
}

export default App;
