import React, { Component } from 'react';
import * as d3 from 'd3';

import InsetHeading from '../InsetHeading.js';
import ReviewSection from './ReviewSection.js';
import ConquestChance from './ConquestChance.js';
import FatButton from '../FatButton.js';
import ExpectedLoss from './ExpectedLoss.js';
import FrequencyPlot from './FrequencyPlot.js';
import { ATTACKER_KEY, DEFENDER_KEY } from '../../lib/simulation-results.js';

import './SimulationReview.scss';

const VIZ_WIDTH = 600;
const VIZ_HEIGHT = 400;
const VIZ_MAX_TICKS = 10; // Max x-axis ticks

let format = d3.format(',.0d');

//function sampleError(data) {
//  return d3.deviation(data) / Math.sqrt(data.length);
//}

class SimulationReview extends Component {
  handleClick() {
    this.props.onBack();
  }

//  printStats(data) {
//    let mean = d3.mean(data);
//    console.log('mean', mean);
//
//    let sem = sampleError(data);
//    console.log('sem', sem);
//
//    let interval = [mean - 1.96 * sem, mean + 1.96 * sem];
//    console.log('confidence interval', interval);
//  }

  render() {
    let props = this.props;
    return (
      <div className="SimulationReview" ref={this.scrollRef}>
        <InsetHeading text="Simulation Results" />
        <div className="sections">
          <ReviewSection title="Battle Type">
            <p className="battle-type">{props.simulation.battleTypeLabel}</p>
          </ReviewSection>
          <ReviewSection title="Conquest Chance">
            <ConquestChance simulation={props.simulation} />
          </ReviewSection>
          <ReviewSection title="Expected Attacker Losses">
            <ExpectedLoss simulation={props.simulation}
                          vizKey={ATTACKER_KEY} />
          </ReviewSection>
          <ReviewSection title="Probability Distribution of Attacker Losses">
            <FrequencyPlot simulation={props.simulation}
                           vizKey={ATTACKER_KEY}
                           width={VIZ_WIDTH}
                           height={VIZ_HEIGHT}
                           maxTicks={VIZ_MAX_TICKS} />
          </ReviewSection>
          <ReviewSection title="Expected Defender Losses">
            <ExpectedLoss simulation={props.simulation}
                          vizKey={DEFENDER_KEY} />
          </ReviewSection>
          <ReviewSection title="Probability Distribution of Defender Losses">
            <FrequencyPlot simulation={props.simulation}
                           vizKey={DEFENDER_KEY}
                           width={VIZ_WIDTH}
                           height={VIZ_HEIGHT}
                           maxTicks={VIZ_MAX_TICKS} />
          </ReviewSection>
          <p className="summary">
            These results were calculated using <strong>{format(this.props.simulation.n)}</strong> simulated battles.
          </p>
          <FatButton onClick={() => this.handleClick()}
                     enabled={true}>
            <span>Back</span>
          </FatButton>
        </div>
      </div>
    );
  }
}

export default SimulationReview;
