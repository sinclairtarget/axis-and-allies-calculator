import React, { Component } from 'react';

import InsetHeading from '../InsetHeading.js';
import ReviewSection from './ReviewSection.js';
import ConquestChance from './ConquestChance.js';
import FatButton from '../FatButton.js';
import FrequencyPlot from './FrequencyPlot.js';
import { ATTACKER_KEY, DEFENDER_KEY } from '../../lib/simulation-results.js';

import './SimulationReview.scss';

const VIZ_WIDTH = 600;
const VIZ_HEIGHT = 400;
const VIZ_MAX_TICKS = 10; // Max x-axis ticks

class SimulationReview extends Component {
  handleClick() {
    this.props.onBack();
  }

  render() {
    let props = this.props;
    return (
      <div className="SimulationReview" ref={this.scrollRef}>
        <InsetHeading text="Simulation Results" />
        <div className="sections">
          <ReviewSection title="Conquest Chance">
            <ConquestChance simulation={props.simulation} />
          </ReviewSection>
          <ReviewSection title="Attacker Losses">
            <FrequencyPlot simulation={props.simulation}
                           vizKey={ATTACKER_KEY}
                           width={VIZ_WIDTH}
                           height={VIZ_HEIGHT}
                           maxTicks={VIZ_MAX_TICKS} />
          </ReviewSection>
          <ReviewSection title="Defender Losses">
            <FrequencyPlot simulation={props.simulation}
                           vizKey={DEFENDER_KEY}
                           width={VIZ_WIDTH}
                           height={VIZ_HEIGHT}
                           maxTicks={VIZ_MAX_TICKS} />
          </ReviewSection>
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
