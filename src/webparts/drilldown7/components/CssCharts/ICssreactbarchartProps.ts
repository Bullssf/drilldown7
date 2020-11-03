import { ICSSChartSeries, ICSSChartTypes } from '../IReUsableInterfaces';

export interface ICssreactbarchartProps {
  chartData?: ICSSChartSeries[];
  WebpartWidth:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
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
