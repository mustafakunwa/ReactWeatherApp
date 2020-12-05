/* App.js */
import React, { Component, Fragment } from 'react';
import CanvasJSReact from './canvasjs.react';
import Toolbar from './toolbar/toolbar';
import './App.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { datapoints: [] }
  }

  render() {
    const options = {
      theme: "light2",
      title: {
        text: "Temp through out day"
      },
      axisY: {
        title: "Temp",
        suffix: "°C"
      },
      data: [{
        type: "line",
        xValueFormatString: "HH:mm",
        yValueFormatString: "#,##0.00 °C",
        dataPoints: this.state.dataPoints
      }]
    }
    return (
      <Fragment>
        <Toolbar />
        <main className="main">
          <CanvasJSChart options={options}
            onRef={ref => this.chart = ref}
          />
        </main>
      </Fragment>
    );
  }

  componentDidMount() {
    this.loadData()
    setInterval(this.loadData.bind(this), 5000);
  }

  async loadData() {
    try {
      var chart = this.chart;
      fetch('http://localhost:3000/weather')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ dataPoints: [] })
          var points = [];
          for (var i = 0; i < data.forecast.length; i++) {
            points.push({
              x: new Date(data.forecast[i].time),
              y: data.forecast[i].temp_f
            });
          }
          this.setState({ dataPoints: points })
          chart.render();
        });
    } catch (e) {
      console.log(e);
    }
  }

}

export default App  