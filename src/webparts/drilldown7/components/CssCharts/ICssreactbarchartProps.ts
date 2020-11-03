import { ICSSChartSettings, ICSSChartData, ICSSChartTypes } from '../IReUsableInterfaces';

export interface ICssreactbarchartProps {
  chartData?: ICSSChartData[];
  chartSettings?: ICSSChartSettings[];
  WebpartWidth:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
  callBackID: string;
  onCtrlClick?: any;
  onShftClick?: any;
  onAltClick?: any;
  
}

export interface ICssreactbarchartState {
  chartData?: ICSSChartData[];
  chartSettings?: ICSSChartSettings[];
  useProps: boolean;
  chartKeys: string;
}
