import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  // babel will create a constructor from this
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    console.log("componentDidMount");
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log("position acquired");
        // we called setState!!!
        this.setState({ lat: position.coords.latitude });

        // we should never never nver do like
        // this.state.lat = posotion.coords.latitude
        // one single exception is the first initialization
      },
      err => {
        console.log("error happened");
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div> Error: {this.state.errorMessage} </div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner text="checking location" />;
  }

  // React says we have to define render()
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
