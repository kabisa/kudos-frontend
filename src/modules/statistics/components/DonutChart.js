import { h, Component } from "preact";

import PropTypes from "prop-types";

class DonutChart extends Component {
  render() {
    const halfsize = this.props.size * 0.5;
    const radius = halfsize - this.props.strokewidth * 0.5;
    const circumference = 2 * Math.PI * radius;
    const strokeval = (this.props.value * circumference) / 100;
    const dashval = strokeval + " " + circumference;

    const trackstyle = { strokeWidth: this.props.strokewidth };
    const indicatorstyle = {
      strokeWidth: this.props.strokewidth,
      strokeDasharray: dashval,
    };
    const rotateval = "rotate(-90 " + halfsize + "," + halfsize + ")";

    return (
      <svg
        width={this.props.size}
        height={this.props.size}
        className="donutchart"
        style={{ marginTop: "3em" }}
      >
        <circle
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={trackstyle}
          className="donutchart-track"
        />
        <circle
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={indicatorstyle}
          className="donutchart-indicator"
        />
        <text
          className="donutchart-text"
          x={halfsize}
          y={halfsize}
          style={{ textAnchor: "middle" }}
        >
          <tspan className="donutchart-text-val">{this.props.value}</tspan>
          <tspan className="donutchart-text-percent">%</tspan>
          <tspan
            className="donutchart-text-label"
            x={halfsize}
            y={halfsize + 10}
          >
            {this.props.valuelabel}
          </tspan>
        </text>
      </svg>
    );
  }
}

DonutChart.propTypes = {
  value: PropTypes.number, // value the chart should show
  valuelabel: PropTypes.string, // label for the chart
  size: PropTypes.number, // diameter of chart
  strokewidth: PropTypes.number, // width of chart line
};
DonutChart.defaultProps = {
  value: 0,
  valuelabel: "Completed",
  size: 150,
  strokewidth: 32,
};

export default DonutChart;
