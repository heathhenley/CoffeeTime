import Timer from "./Timer";
import coffee_cup from "./assets/coffee_in_cup.png"
import kettle from "./assets/kettle.png"
import grind from "./assets/grind.png"

const v60Steps = [
  IntroStep, PreHeatStep, AddGrounds, PreInfusion, FirstBrew, FinalBrew
];

export default v60Steps;

function IntroStep(props) {
  return (
    <div className="brews_step_text">
      <BrewStepHeader
        brew_step={props.brew_step}
        title="How much coffee?"
        max_steps={v60Steps.length}
      />
      <img src={coffee_cup} alt="A cup of coffee" />
      <p>
        How much liquid coffee (grams or ml) do you want to make?
      </p>
      <form>
      <div className="form-group row">
        <label htmlFor="liquid_input" className="col-5 col-form-label"> Liquid water:</label>
        <div className="col-4">
          <input
            id="liquid_input"
            value={props.water}
            onChange={props.onChangedWater}
            type="number"
            className="form-control"
          />
        </div>  
      </div>
      </form>
      <p>
      To make <strong>{props.water.toFixed(1)} ml</strong> of pour
      over coffee you will need
      <strong> {props.coffee.toFixed(1)} grams </strong> of ground
      coffee.
      </p>
      <BrewStepFooter />
    </div>);
}

function PreHeatStep(props) {
  return (
    <div className="brews_step_text">
      <BrewStepHeader
        brew_step={props.brew_step}
        title="Wet filter / warm V60"
        max_steps={v60Steps.length} />
      <div className="brews_step_body">
        <img src={kettle} alt=""/>
        <p>
          Pour some boiling water into the empty filter to wet and warm the filter and the brewer pitcher.
        </p>
        <p>
            Dump out the excess water from the pitcher.
        </p>
      </div>
      <BrewStepFooter />
    </div>);
}

function AddGrounds(props) {
  return (
    <div className="brews_step_text">
      <BrewStepHeader
        brew_step={props.brew_step}
        title="Add grounds"
        max_steps={v60Steps.length}/>
      <div className="brews_step_body">
        <img src={grind} alt=""/>
        <p>
          Add the <strong>{props.coffee.toFixed(1)} grams </strong> of ground coffee to the filter and level it.
        </p>
      </div>
      <BrewStepFooter />
    </div>);
}

function PreInfusion(props) {
  return (
    <div className="brews_step_text">
      <BrewStepHeader
        brew_step={props.brew_step}
        title="Preinfusion"
        max_steps={v60Steps.length}/>
      <div className="brews_step_body">
        <Timer key="pre" counter={30} />
        <p>
          Pour {(props.water * 50 / 340.0).toFixed(1)} grams of water over the
          grounds, slowly.
        </p>
        <p>
          Stir or swirl the grounds lightly.
        </p>
      </div>
      <BrewStepFooter />
    </div>);
}

function FirstBrew(props) {
  return (
    <div className="brews_step_text">
      <BrewStepHeader
       brew_step={props.brew_step}
       title="First brew"
       max_steps={v60Steps.length}/>
      <Timer key="first" counter={90} />
      <div className="brews_step_body">
        <p>
          Pour {(props.water * 145.0 / 340.0).toFixed(1)} grams of water over the
          grounds slowly.
        </p>
        <p>
          This will take about 1 minute and 30 seconds.
        </p>
      </div>
      <BrewStepFooter />
    </div>);
}

function FinalBrew(props) {
  return (
    <div className="brews_step_text">
      <BrewStepHeader
        brew_step={props.brew_step}
        title="Finish the brew"
        max_steps={v60Steps.length}
      />
      <Timer key="final" counter={90} />
      <div className="brews_step_body">
        <p>
          Pour the remaining {(props.water * 145.0 / 340.0).toFixed(1)} grams of water over the
          grounds, slowly.
        </p>
        <p>
            This should take about another 1 minute and 30 seconds.
        </p>
      </div>
      <BrewStepFooter />
    </div>);
}

function BrewStepHeader(props) {
  let current_percent = 100 *  ((props.brew_step + 1) / props.max_steps);
  return (
    <div className="brews_step_header">
      <h2>{props.title}</h2>
      <div className="progress" role="progressbar"
        aria-valuenow={current_percent}
        aria-valuemax="100%"
        aria-valuemin="0">
        <div className="progress-bar"
          style={{width: current_percent + "%"}}>
            {props.brew_step + 1} of {props.max_steps}
            </div>
      </div>
    </div>
  );
}

function BrewStepFooter(props) {
  return ("");
}
