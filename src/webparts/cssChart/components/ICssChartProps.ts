
import { IRefiners, IRefinerLayer, IRefinerStat,IItemRefiners, RefineRuleValues, 
  RefinerStatTypes, IRefinerStats, IRefinerStatType, ICSSChartDD } from '../../drilldown7/components/IReUsableInterfaces';

export interface ICssChartProps {
  
  description: string;
  stats: IRefinerStat[];
  callBackID: string;
  refinerObj: IRefinerLayer;
  chartElements: any[];
  cssChartDD: ICSSChartDD;

}
