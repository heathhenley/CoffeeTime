import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import v60Steps from './BrewSteps';
import gh_logo from './assets/GitHub_Logo.png';


function Controls(props){
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.direction}>
    </button>
  );
}

function AppHeader() {
  return (
    <header className="App-header shadow">
      <h1>V60 Coffee Timer</h1>
    </header>
  );
}

function AppFooter(props) {
  return (
    <div className="App-footer shadow">
      <div className="center">
        Help improve this app on <a href="https://github.com/heathhenley/CoffeeTime" >
          <img className="logo" src={gh_logo}/></a>
      </div>
    </div>
  );
}

class CoffeeSteps extends React.Component {
  
  constructor (props){
    super(props);
    this.state = {
      water: this.props.water,
      brew_step: 0,
      max_step: v60Steps.length-1,
      min_step: 0
    };
  }
  
  handleAdvance () {
    const brew_step = this.state.brew_step
    if ( brew_step < this.state.max_step ){
      this.setState({brew_step : brew_step + 1});
    }
  }

  handleGoBack () {
    const brew_step = this.state.brew_step
    if ( brew_step > this.state.min_step){
      this.setState({brew_step : brew_step - 1});
    }
  }

  handleChangedWaterAmount(e) {
    this.setState({water: Number(e.target.value)});
  }

  getCoffeeAmount(water){
    return (20.0 / 340.0) * water;
  }

  render() {
    // Should I set up routing so that refreshes will return to the proper
    // step?
    let StepView = v60Steps[this.state.brew_step];
    let props = {
            brew_step: this.state.brew_step,
            water: this.state.water,
            coffee: this.getCoffeeAmount(this.state.water),
            onChangedWater: (e) => {this.handleChangedWaterAmount(e)}
    };
    return (
      <div className="content shadow">
        {StepView(props)}
        <div className="navigation">
          <Controls
            direction="prev"
            onClick={() => {this.handleGoBack()}}
            disabled={!(this.state.brew_step > this.state.min_step)} />
          <Controls
            direction="next"
            onClick={() => {this.handleAdvance()}}
            disabled={!(this.state.brew_step < this.state.max_step)} />
        </div>
      </div>
    )};
}

function App() {
  return (
    <div className="App container">
        <AppHeader />
        <CoffeeSteps water={340} />
        <AppFooter />
    </div>
  );
}

export default App;
