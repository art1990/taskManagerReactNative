import React from "react";
import { View } from "react-native";
import { Svg, Rect, G, Text } from "react-native-svg";
import { AbstractChart } from "react-native-chart-kit";

const barWidth = 32;

class StackedBarChart extends AbstractChart {
  getBarPercentage = () => {
    const { barPercentage = 0.4 } = this.props.chartConfig;
    return barPercentage;
  };

  getBarRadius = (ret, x) => {
    return this.props.chartConfig.barRadius && ret.length === x.length - 1
      ? this.props.chartConfig.barRadius
      : 0;
  };

  renderBars = (config) => {
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
      border,
      colors,
      stackedBar = false,
    } = config;
    return data.map((x, i) => {
      const barWidth = 32 * this.getBarPercentage();
      const ret = [];
      let h = 0;
      let st = paddingTop;
      let fac = 1;
      if (stackedBar) {
        fac = 0.7;
      }
      for (let z = 0; z < x.length; z++) {
        h = (height - 55) * (x[z] / border);
        const y = (height / 4) * 3 - h + st;
        const xC =
          (paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2) *
          fac;
        ret.push(
          <Rect
            key={Math.random()}
            x={xC}
            y={y}
            rx={this.getBarRadius(ret, x)}
            ry={this.getBarRadius(ret, x)}
            width={barWidth}
            height={h}
            fill={colors[i][z]}
          />
        );
        st -= h;
      }

      return ret;
    });
  };

  renderLegend = (config) => {
    const { legend, colors, width, height } = config;
    return legend.map((x, i) => {
      return (
        <G key={Math.random()}>
          <Rect
            width="16px"
            height="16px"
            fill={colors[i]}
            rx={8}
            ry={8}
            x={width * 0.71}
            y={height * 0.7 - i * 50}
          />
          <Text
            x={width * 0.78}
            y={height * 0.76 - i * 50}
            {...this.getPropsForLabels()}
          >
            {x}
          </Text>
        </G>
      );
    });
  };

  render() {
    const paddingTop = 10;
    const paddingRight = 30;
    const {
      width: w,
      height,
      style = {},
      data,
      withHorizontalLabels = true,
      withVerticalLabels = true,
      segments = 4,
      decimalPlaces,
    } = this.props;

    const width = w * 1.22;
    const { borderRadius = 0 } = style;
    const config = {
      width,
      height,
    };
    let border = 0;
    for (let i = 0; i < data.data.length; i++) {
      const actual = data.data[i].reduce((pv, cv) => pv + cv, 0);
      if (actual > border) {
        border = actual;
      }
    }
    var stackedBar = data.legend && data.legend.length == 0 ? false : true;
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig,
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLine({
              ...config,
              paddingTop,
              paddingRight,
            })}
          </G>
          <G>
            {this.renderVerticalLine({
              ...config,
              paddingTop,
              paddingRight,
            })}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                  ...config,
                  count: segments,
                  data: [0, border],
                  paddingTop,
                  paddingRight,
                  decimalPlaces,
                })
              : null}
          </G>

          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                  ...config,
                  labels: data.labels,
                  paddingRight: paddingRight * 1.3,
                  stackedBar,
                  paddingTop,
                  decimalPlaces,
                  horizontalOffset: barWidth,
                })
              : null}
          </G>

          <G>
            {this.renderBars({
              ...config,
              data: data.data,
              border,
              colors: this.props.data.barColors,
              paddingTop,
              paddingRight: paddingRight * 1.27,
              stackedBar,
            })}
          </G>
          {data.legend &&
            data.legend.length != 0 &&
            this.renderLegend({
              ...config,
              legend: data.legend,
              colors: this.props.data.barColors,
            })}
        </Svg>
      </View>
    );
  }
}
export default StackedBarChart;
