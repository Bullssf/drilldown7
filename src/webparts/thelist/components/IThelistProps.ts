
import { IRefiners, IRefinerLayer, IRefinerStat,IItemRefiners, RefineRuleValues, 
  RefinerStatTypes, IRefinerStats, IRefinerStatType, ICSSChartDD } from '../../drilldown7/components/IReUsableInterfaces';

//For Webpart Title component
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IThelistProps {
  description: string;

  callBackID: string;
  listPropsDD: any;

/**
 *  TITLE:  For Webpart Title component
*/
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;

}
