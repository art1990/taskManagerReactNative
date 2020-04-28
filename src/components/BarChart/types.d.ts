export interface IDayChartProps {
  chartName?: string;
  dayData: { labels?: string[]; data: string | number[]; barColors: string[] };
  updateDate?: (date: Date | string) => void;
  currentDate?: number;
  inputStyle?: IInputWithIconProps["inputStyle"];
  yLabel?: string;
  xLabelsList?: string[];
}
