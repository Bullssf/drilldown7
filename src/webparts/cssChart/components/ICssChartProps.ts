
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

  //For Webpart Title component
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;

}
