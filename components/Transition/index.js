import React, { Component } from "react";
import ReactDOM from "react-dom";

class Transition extends Component {
  state = {
    showList: false
  };

  switch = () => {
    this.setState(prevState => ({
      showList: !prevState.showList
    }));
  };

  render() {
    return (
      <div className="container list-box">
        <button className="display" onClick={this.switch}>
          List
        </button>
        {this.state.showList && (
          <div className="menu">
            <ul className="list">
              <li className="list-item">Feed the dog</li>
              <li className="list-item">Cut hair</li>
              <li className="list-item">Do the dishs</li>
              <li className="list-item">Buy grossries</li>
            </ul>
          </div>
        )}
        <style jsx>{`
            .list-box {
                min-height: 200px;
                position: relative;
            }
            .display {
                position: relative;
                z-index: 1;
                width: 120px;
                height: 40px;
                background-color: #5a564c;
                border: none;
                border-radius: 5px;
                outline: none;
                cursor: pointer;
                transition: background-color 350ms;
            }
            .menu {
                position: absolute;
                top: 45px;
                z-index: 1;
                box-sizing: border-box;
                width: 200px;
                padding: 0 20px;
                overflow: hidden;
                background-color: #9e8949;
                border-radius: 5px;
            }
        `}</style>
      </div>
    );
  }
}

export default Transition;
