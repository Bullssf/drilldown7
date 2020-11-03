
import { IRefiners, IRefinerLayer, IRefinerStat,IItemRefiners, RefineRuleValues, 
  RefinerStatTypes, IRefinerStats, IRefinerStatType, ICSSChartDD } from '../../drilldown7/components/IReUsableInterfaces';

//For Webpart Title component
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ICssChartProps {
  
  description: string;
  stats: IRefinerStat[];
  callBackID: string;
  refinerObj: IRefinerLayer;
  chartElements: any[];
  cssChartDD: ICSSChartDD;

  stylesChartTitle?: string;

  WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

  WebpartWidth:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
  
  //For Webpart Title component
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;

}
