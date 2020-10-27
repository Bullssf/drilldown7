
import { IRefiners, IRefinerLayer, IRefinerStat,IItemRefiners, RefineRuleValues, 
  RefinerStatTypes, IRefinerStats, IRefinerStatType, ICSSChartDD, IListViewDD } from '../../drilldown7/components/IReUsableInterfaces';

  
import { WebPartContext } from '@microsoft/sp-webpart-base';

//For Webpart Title component
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IThelistProps {
  description: string;

  wpContext: WebPartContext;
  WebpartElement: HTMLElement;   //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

  WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
  WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

  callBackID: string;
  listPropsDD: IListViewDD;

/**
 *  TITLE:  For Webpart Title component
*/
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;

}
