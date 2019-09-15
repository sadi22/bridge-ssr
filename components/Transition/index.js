import React, { Component } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";

class Transition extends Component {
    state = {
        showList: true,
        highlightedHobby: false
      };
    
      switch = () => {
        this.setState(prevState => ({
          showList: !prevState.showList
        }));
      };
    
      listSwitch = () => {
        this.setState(state => ({
          highlightedHobby: !state.highlightedHobby
        }));
      };
    
      render() {
        return (
          <div>
            <p>hello</p>
            <style jsx>{`
                .my-node-enter {
                    opacity: 0;
                  }
                  .my-node-enter-active {
                    opacity: 1;
                    transition: opacity 200ms;
                  }
                  .my-node-exit {
                    opacity: 1;
                  }
                  .my-node-exit-active {
                    opacity: 0;
                    transition: opacity 200ms;
                  }
            `}</style>
          </div>
        );
      }
}

export default Transition;

