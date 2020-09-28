import { ICSSChartSeries, ICSSChartTypes } from '../IReUsableInterfaces';

export interface ICssreactbarchartProps {
  chartData?: ICSSChartSeries[];
  callBackID: string;
  onCtrlClick?: any;
  onShftClick?: any;
  onAltClick?: any;

}

export interface ICssreactbarchartState {
  chartData?: ICSSChartSeries[];
  useProps: boolean;
  chartKeys: string;
}
