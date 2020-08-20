import React, { Component } from 'react';

import InsetHeading from '../InsetHeading.js';
import ReviewSection from './ReviewSection.js';
import ConquestChance from './ConquestChance.js';
import FatButton from '../FatButton.js';

import './SimulationReview.scss';

class SimulationReview extends Component {
  handleClick() {
    this.props.onBack();
  }

  render() {
    let props = this.props;
    return (
      <div className="SimulationReview">
        <InsetHeading text="Simulation Results" />
        <div className="sections">
          <ReviewSection title="Conquest Chance">
            <ConquestChance simulation={props.simulation} />
          </ReviewSection>
          <ReviewSection title="Attacker Losses">
          </ReviewSection>
          <ReviewSection title="Defender Losses">
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
