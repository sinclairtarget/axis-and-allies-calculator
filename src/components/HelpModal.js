import React, { Component } from 'react';

import './HelpModal.scss';

class HelpModal extends Component {
  handleExit() {
    this.props.onExit();
  }

  render() {
    return (
      <div className="HelpModal" onClick={() => this.handleExit()}>
        <div className="text-container">
          <h3 className="heading">Simulator Options</h3>
          <p>You can tweak the behavior of the battle simulator using the
          following options:</p>

          <h4 className="subheading">Prioritize Conquest</h4>
          <p>By default, the simulator assigns hits (on both sides) to the
      lowest-cost units first. This is usually a good idea,
      because it minimizes your IPC losses in battle. But if, in a real game,
      you were to attack a land territory with a single tank and four fighters,
      you would probably take hits on the fighters before the tank in order to
      ensure that you conquer the province.</p>
          <p>The <strong>Prioritize Conquest</strong> option allows you to emulate
          this strategy. When the option is enabled, the simulator will pick the
      highest-cost attacking unit that can occupy the territory as a
      "designated survivor." This unit will be hit last, even if there are more
      expensive units in the attacking force.</p>

          <h4 className="subheading">Retreat After One Round</h4>
          <p>By default, the simulator will simulate each battle to its
      bitter end, which is almost always when one or the other side runs out of
      units. With the <strong>Retreat After One Round</strong> option enabled,
      only a single round of combat will be simulated.</p>
          <button className="exit-button"
                  onClick={() => this.handleExit()}>X</button>
        </div>
      </div>
    );
  }
}

export default HelpModal;
