import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { IWebAddResult, IWebInfo, IWeb, } from "@pnp/sp/webs/types";

import "@pnp/sp/webs";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { convertNumberArrayToRelativePercents, doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../services/arrayServices';

import { ITheTime, weekday3, monthStr3 } from '../../../../services/dateServices';

import styles from '../Contents/contents.module.scss';

import InfoPage from '../HelpInfo/infoPages';

import ButtonCompound from '../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../createButtons/ICreateButtons";

import { createIconButton , defCommandIconStyles} from "../createButtons/IconButton";

import { createAdvancedContentChoices } from '../fields/choiceFieldBuilder';

import { IContentsToggles, makeToggles } from '../fields/toggleFieldBuilder';

import { IPickedList, IPickedWebBasic, IMyPivots, IPivot,  ILink, IUser, IMyProgress, IMyIcons, IMyFonts, IChartSeries, 
    ICharNote, IRefinerRules, RefineRuleValues, ICustViewDef, IRefinerStat, ICSSChartSettings, ICSSChartData, ICSSChartTypes, QuickCommandsTMT } from '../IReUsableInterfaces';

import { createLink } from '../HelpInfo/AllLinks';

import { IRefiners, IRefinerLayer, IItemRefiners, IQuickButton, IQuickCommands, IListViewDD } from '../IReUsableInterfaces';

import { PageContext } from '@microsoft/sp-page-context';

import { pivotOptionsGroup, } from '../../../../services/propPane';

import { getExpandColumns, getKeysLike, getSelectColumns } from '../../../../services/getFunctions';

import * as links from '../HelpInfo/AllLinks';

import { getHelpfullError, } from '../../../../services/ErrorHandler';

import MyDrillItems from './drillListView';

import ReactListItems from './reactListView';

//parentListFieldTitles

import { getAllItems, buildRefinersObject, processAllItems, } from './drillFunctions';

import ResizeGroupOverflowSetExample from './refiners/commandBar';

import { ICMDItem } from './refiners/commandBar';

import stylesD from './drillComponent.module.scss';
import {  } from '../../../../services/listServices/viewTypes';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { unstable_renderSubtreeIntoContainer } from 'react-dom';

import Cssreactbarchart from '../CssCharts/Cssreactbarchart';

import {buildCountChartsObject ,  buildStatChartsArray} from '../CssCharts/cssChartFunctions';

import { getAppropriateViewFields, getAppropriateViewGroups, getAppropriateViewProp } from './listFunctions';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import  EarlyAccess from '../HelpInfo/EarlyAccess';

export type IRefinerStyles = 'pivot' | 'commandBar' | 'other';

/***
 *    d888888b      d8888b. d8888b. d888888b db      db      db      d888888b .d8888. d888888b 
 *      `88'        88  `8D 88  `8D   `88'   88      88      88        `88'   88'  YP `~~88~~' 
 *       88         88   88 88oobY'    88    88      88      88         88    `8bo.      88    
 *       88         88   88 88`8b      88    88      88      88         88      `Y8b.    88    
 *      .88.        88  .8D 88 `88.   .88.   88booo. 88booo. 88booo.   .88.   db   8D    88    
 *    Y888888P      Y8888D' 88   YD Y888888P Y88888P Y88888P Y88888P Y888888P `8888Y'    YP    
 *                                                                                             
 *                                                                                             
 */

  export interface IDrillList extends Partial<IPickedList> {
    title: string;
    name?: string;
    guid?: string;
    fetchCount: number;
    fetchCountMobile: number;
    restFilter: string;
    isLibrary?: boolean;
    webURL?: string;
    parentListURL?: string;
    contextUserInfo?: IUser;  //For site you are on ( aka current page context )
    sourceUserInfo?: IUser;   //For site where the list is stored

    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    emptyRefiner: string;
    refinerRules: IRefinerRules[][];
    refinerStats: IRefinerStat[];
    viewDefs: ICustViewDef[];
    staticColumns: string[];
    selectColumns: string[];
    expandColumns: string[];
    staticColumnsStr: string;
    selectColumnsStr: string;
    expandColumnsStr: string;
    removeFromSelect: string[];
  }

/***
 *    d888888b      d8888b. d888888b db    db  .o88b.  .d8b.  d888888b .d8888. 
 *      `88'        88  `8D   `88'   88    88 d8P  Y8 d8' `8b `~~88~~' 88'  YP 
 *       88         88oodD'    88    Y8    8P 8P      88ooo88    88    `8bo.   
 *       88         88~~~      88    `8b  d8' 8b      88~~~88    88      `Y8b. 
 *      .88.        88        .88.    `8bd8'  Y8b  d8 88   88    88    db   8D 
 *    Y888888P      88      Y888888P    YP     `Y88P' YP   YP    YP    `8888Y' 
 *                                                                             
 *                                                                             
 */

export interface IMyPivCat {
    title: string;
    desc: string;
    order: number;
    count: number;
}

export const pivCats = {
    all: {title: 'All', desc: '', order: 1, count: null },
    newWebs: {title: 'New' , desc: '', order: 1, count: null },
    recCreate:  {title: 'RecentlyCreated' , desc: '', order: 1, count: null },
    oldCreate: {title: 'Old', desc: '', order: 9, count: null  },
    recUpdate: {title: 'RecentlyUpdated', desc: '', order: 9, count: null  },
    oldUpdate: {title: 'Stale', desc: '', order: 9, count: null  },
};

/***
 *    d888888b      d8888b. d8888b. d888888b db      db           d888888b d888888b d88888b .88b  d88.      d888888b d8b   db d88888b  .d88b.  
 *      `88'        88  `8D 88  `8D   `88'   88      88             `88'   `~~88~~' 88'     88'YbdP`88        `88'   888o  88 88'     .8P  Y8. 
 *       88         88   88 88oobY'    88    88      88              88       88    88ooooo 88  88  88         88    88V8o 88 88ooo   88    88 
 *       88         88   88 88`8b      88    88      88              88       88    88~~~~~ 88  88  88         88    88 V8o88 88~~~   88    88 
 *      .88.        88  .8D 88 `88.   .88.   88booo. 88booo.        .88.      88    88.     88  88  88        .88.   88  V888 88      `8b  d8' 
 *    Y888888P      Y8888D' 88   YD Y888888P Y88888P Y88888P      Y888888P    YP    Y88888P YP  YP  YP      Y888888P VP   V8P YP       `Y88P'  
 *                                                                                                                                             
 *                                                                                                                                             
 */

export interface IDrillItemInfo extends Partial<any>{

    sort: string;
    searchString: string;
    meta: string[];

    Created: any;
    Modified: any;
    Author: any;
    Editor: any;
    timeCreated : ITheTime;

    goToItemPreview: string;
    goToItemLink: string;
    goToPropsLink: string;
    isFile: boolean;

    timeModified : ITheTime;
    bestCreate: string;
    bestMod: string;

    author: IUser;
    editor: IUser;

    refiners: IItemRefiners; //String of Keys representing the static name of the column used for drill downs

    Id: any;

}


/***
 *    d888888b      d8888b. d8888b. d888888b db      db      d8888b.  .d88b.  db   d8b   db d8b   db      d8888b. d8888b.  .d88b.  d8888b. .d8888. 
 *      `88'        88  `8D 88  `8D   `88'   88      88      88  `8D .8P  Y8. 88   I8I   88 888o  88      88  `8D 88  `8D .8P  Y8. 88  `8D 88'  YP 
 *       88         88   88 88oobY'    88    88      88      88   88 88    88 88   I8I   88 88V8o 88      88oodD' 88oobY' 88    88 88oodD' `8bo.   
 *       88         88   88 88`8b      88    88      88      88   88 88    88 Y8   I8I   88 88 V8o88      88~~~   88`8b   88    88 88~~~     `Y8b. 
 *      .88.        88  .8D 88 `88.   .88.   88booo. 88booo. 88  .8D `8b  d8' `8b d8'8b d8' 88  V888      88      88 `88. `8b  d8' 88      db   8D 
 *    Y888888P      Y8888D' 88   YD Y888888P Y88888P Y88888P Y8888D'  `Y88P'   `8b8' `8d8'  VP   V8P      88      88   YD  `Y88P'  88      `8888Y' 
 *                                                                                                                                                 
 *                                                                                                                                                 
 */


export type IViewType = 'React' | 'MZ' | 'Other' ;

export interface IDrillDownProps {
    // 0 - Context
    description: string;
    
    pageContext: PageContext;
    wpContext: WebPartContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allowRailsOff?: boolean;
    allowSettings?: boolean;

    tenant: string;
    urlVars: {};
    today: ITheTime;
    WebpartElement: HTMLElement;   //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    webURL?: string;
    parentListURL?: string;

    listName : string;
    
    allLoaded: boolean;

    toggles: {
        togRefinerCounts: boolean;
        togCountChart: boolean;
        togStats: boolean;
        togOtherListview:  boolean;
        togOtherChartpart:  boolean;
    };

    performance: {
        fetchCount: number;
        fetchCountMobile: number;
        restFilter: string;
    };

    quickCommands?: IQuickCommands;

    viewType?: IViewType;
    viewDefs?: ICustViewDef[];
    parentListFieldTitles: string;

    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb?: string;
    analyticsList?: string;

    // 2 - Source and destination list information

    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data
    updateRefinersOnTextSearch?: boolean;

    showRefinerCounts?: boolean;
    showCountChart?: boolean;

    /**    
     * 'parseBySemiColons' |
     * 'groupBy10s' |  'groupBy100s' |  'groupBy1000s' |  'groupByMillions' |
     * 'groupByDays' |  'groupByMonths' |  'groupByYears' |
     * 'groupByUsers' | 
     * 
     * rules string formatted as JSON : [ string[] ]  =  [['parseBySemiColons''groupByMonths'],['groupByMonths'],['groupByUsers']]
     * [ ['parseBySemiColons''groupByMonths'],
     * ['groupByMonths'],
     * ['groupByUsers'] ]
     * 
    */

    // 6 - User Feedback:
    progress: IMyProgress;

    rules: string;
    stats: string;

    WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
    WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    pivotSize: string;
    pivotFormat: string;
    pivotOptions: string;
    pivotTab: string;  //May not be needed because we have projectMasterPriority

    /**
     * 2020-09-08:  Add for dynamic data refiners.   onRefiner0Selected  -- callback to update main web part dynamic data props.
     */
    onRefiner0Selected?: any;

    style: IRefinerStyles; //RefinerStyle

    //For DD
    handleSwitch: any;
    handleListPost: any;

}

/***
 *    d888888b      .d8888. d888888b  .d8b.  d888888b 
 *      `88'        88'  YP `~~88~~' d8' `8b `~~88~~' 
 *       88         `8bo.      88    88ooo88    88    
 *       88           `Y8b.    88    88~~~88    88    
 *      .88.        db   8D    88    88   88    88    
 *    Y888888P      `8888Y'    YP    YP   YP    YP    
 *                                                    
 *                                                    
 */

export type IStatType = 'sum' | 'max' | 'mini' | 'range' | '';

export interface IStat {
    prop: string;
    label: string;
    type: IStatType;
    val1?: any;
    val2?: any;
    result?: string;
}


/***
 *    d888888b      d8888b. d8888b. d888888b db      db      d8888b.  .d88b.  db   d8b   db d8b   db      .d8888. d888888b  .d8b.  d888888b d88888b 
 *      `88'        88  `8D 88  `8D   `88'   88      88      88  `8D .8P  Y8. 88   I8I   88 888o  88      88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *       88         88   88 88oobY'    88    88      88      88   88 88    88 88   I8I   88 88V8o 88      `8bo.      88    88ooo88    88    88ooooo 
 *       88         88   88 88`8b      88    88      88      88   88 88    88 Y8   I8I   88 88 V8o88        `Y8b.    88    88~~~88    88    88~~~~~ 
 *      .88.        88  .8D 88 `88.   .88.   88booo. 88booo. 88  .8D `8b  d8' `8b d8'8b d8' 88  V888      db   8D    88    88   88    88    88.     
 *    Y888888P      Y8888D' 88   YD Y888888P Y88888P Y88888P Y8888D'  `Y88P'   `8b8' `8d8'  VP   V8P      `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                                                                  
 *                                                                                                                                                  
 */
export const RefinerChartTypes : ICSSChartTypes[] = ['stacked-column-labels', 'pareto-dec'];

export interface IDrillDownState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webURL?: string;

    allLoaded: boolean;

    bannerMessage: any[];

    showTips: boolean;

    showRefinerCounts: boolean;
    showCountChart: boolean;
    showStats: boolean;

    currentPage: string;
    searchCount: number;

    searchText: string;
    searchMeta: string[];

    searchedItems: IDrillItemInfo[];
    stats: IStat[];
    first20searchedItems: IDrillItemInfo[];

    progress: IMyProgress;

    quickCommands: IQuickCommands;

    allItems: IDrillItemInfo[];

    viewType?: IViewType;

    meta: string[];

    errMessage: string | JSX.Element;

    drillList: IDrillList;

    WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
    WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    rules: string;
    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    maxRefinersToShow: number;
    refinerObj: IRefinerLayer;
    showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data

    pivotCats: IMyPivCat[][];
    cmdCats: ICMDItem[][];

    style: IRefinerStyles; //RefinerStyle

    groupByFields: IGrouping[];

    
}


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d8888b. d88888b d88888b       .o88b. db       .d8b.  .d8888. .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'      88  `8D 88'     88'          d8P  Y8 88      d8' `8b 88'  YP 88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88         88   88 88ooooo 88ooo        8P      88      88ooo88 `8bo.   `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88         88   88 88~~~~~ 88~~~        8b      88      88~~~88   `Y8b.   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88         88  .8D 88.     88           Y8b  d8 88booo. 88   88 db   8D db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y8888D' Y88888P YP            `Y88P' Y88888P YP   YP `8888Y' `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */


export default class DrillDown extends React.Component<IDrillDownProps, IDrillDownState> {



    /***
     *    d8888b. db    db d888888b db      d8888b.      .d8888. db    db .88b  d88.       .o88b.  .d88b.  db    db d8b   db d888888b       .o88b. db   db  .d8b.  d8888b. d888888b .d8888. 
     *    88  `8D 88    88   `88'   88      88  `8D      88'  YP 88    88 88'YbdP`88      d8P  Y8 .8P  Y8. 88    88 888o  88 `~~88~~'      d8P  Y8 88   88 d8' `8b 88  `8D `~~88~~' 88'  YP 
     *    88oooY' 88    88    88    88      88   88      `8bo.   88    88 88  88  88      8P      88    88 88    88 88V8o 88    88         8P      88ooo88 88ooo88 88oobY'    88    `8bo.   
     *    88~~~b. 88    88    88    88      88   88        `Y8b. 88    88 88  88  88      8b      88    88 88    88 88 V8o88    88         8b      88~~~88 88~~~88 88`8b      88      `Y8b. 
     *    88   8D 88b  d88   .88.   88booo. 88  .8D      db   8D 88b  d88 88  88  88      Y8b  d8 `8b  d8' 88b  d88 88  V888    88         Y8b  d8 88   88 88   88 88 `88.    88    db   8D 
     *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      `8888Y' ~Y8888P' YP  YP  YP       `Y88P'  `Y88P'  ~Y8888P' VP   V8P    YP          `Y88P' YP   YP YP   YP 88   YD    YP    `8888Y' 
     *                                                                                                                                                                                      
     *                                                                                                                                                                                      
     */

     /**
      * This builds the refiner count horizontal stacked bars
      */
    private buildCountCharts( title: string, callBackID: string, refinerObj: IRefinerLayer , chartTypes: ICSSChartTypes[] ) {
        let resultSummary = null;

        let resultSummaryObject = buildCountChartsObject( title, callBackID, refinerObj , chartTypes );

        resultSummary = 
        <Cssreactbarchart 
            chartData = { resultSummaryObject.chartData }
            chartSettings = { resultSummaryObject.chartSettings }
            callBackID = { resultSummaryObject.callBackID }
            WebpartWidth = { this.state.WebpartWidth }
            //onAltClick = { this.changeRefinerOrder.bind(this) }
        ></Cssreactbarchart>;

        return resultSummary;

    }

    
    /***
     *    d8888b. db    db d888888b db      d8888b.      .d8888. d888888b  .d8b.  d888888b       .o88b. db   db  .d8b.  d8888b. d888888b .d8888. 
     *    88  `8D 88    88   `88'   88      88  `8D      88'  YP `~~88~~' d8' `8b `~~88~~'      d8P  Y8 88   88 d8' `8b 88  `8D `~~88~~' 88'  YP 
     *    88oooY' 88    88    88    88      88   88      `8bo.      88    88ooo88    88         8P      88ooo88 88ooo88 88oobY'    88    `8bo.   
     *    88~~~b. 88    88    88    88      88   88        `Y8b.    88    88~~~88    88         8b      88~~~88 88~~~88 88`8b      88      `Y8b. 
     *    88   8D 88b  d88   .88.   88booo. 88  .8D      db   8D    88    88   88    88         Y8b  d8 88   88 88   88 88 `88.    88    db   8D 
     *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      `8888Y'    YP    YP   YP    YP          `Y88P' YP   YP YP   YP 88   YD    YP    `8888Y' 
     *                                                                                                                                           
     *                                                                                                                                           
     */

     /**
      * This builds the custom stat charts (that are set to consumer = 0 --> inside this webpart)
      */
    private buildStatCharts(  statArray) {

        let statChart = null;
        let theseCharts : any[] = [];
        if ( statArray == null || statArray.length === 0 ) {
            //Do nothing

        } else {
            statArray.map( chartDataObject => {

                statChart = 
                <Cssreactbarchart 
                    chartData = { chartDataObject.chartData }
                    chartSettings = { chartDataObject.chartSettings }
                    callBackID = { chartDataObject.callBackID }
                    WebpartWidth = { this.state.WebpartWidth }
                    //onAltClick = { this.changeRefinerOrder.bind(this) }
                ></Cssreactbarchart>;

                theseCharts.push( statChart );

            });
        }

        return theseCharts;

    }

/***
 *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d8888b. d88888b d88888b d888888b d8b   db d88888b d8888b.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88  `8D 88'     88'       `88'   888o  88 88'     88  `8D      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88oobY' 88ooooo 88ooo      88    88V8o 88 88ooooo 88oobY'      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88`8b   88~~~~~ 88~~~      88    88 V8o88 88~~~~~ 88`8b        88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *    Y8b  d8 88 `88. 88.     88   88    88    88.          88 `88. 88.     88        .88.   88  V888 88.     88 `88.      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      88   YD Y88888P YP      Y888888P VP   V8P Y88888P 88   YD      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                                                       
 *                                                                                                                                                                                                       
 */
    
    private createEmptyRefinerRules( rules: string ) {
        let emptyRules : any = null;
        try {
            emptyRules = JSON.parse(rules);
        } catch(e) {
            alert('createEmptyRefinerRules: ' + e);
            emptyRules = undefined;
        }

        return emptyRules;
    }


    private createRefinerRuleCalcs( calcs: string ) {
        let theCalcs : any = null;
        try {
            calcs = calcs.replace(/\\\"/g,'"').replace(/\\'"/g,"'"); //Replace any cases where I copied the hashed characters from JSON file directly.
            theCalcs = JSON.parse(calcs);
        } catch(e) {
            alert('createRefinerRuleCalcs: ' + e);
            theCalcs = [];
        }

        return theCalcs;
    }


/***
 *    db    db d8888b. d8888b.  .d8b.  d888888b d88888b      d8888b. d8888b. d888888b db      db      db      d888888b .d8888. d888888b       .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888. 
 *    88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88  `8D 88  `8D   `88'   88      88      88        `88'   88'  YP `~~88~~'      d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP 
 *    88    88 88oodD' 88   88 88ooo88    88    88ooooo      88   88 88oobY'    88    88      88      88         88    `8bo.      88         8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.   
 *    88    88 88~~~   88   88 88~~~88    88    88~~~~~      88   88 88`8b      88    88      88      88         88      `Y8b.    88         8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b. 
 *    88b  d88 88      88  .8D 88   88    88    88.          88  .8D 88 `88.   .88.   88booo. 88booo. 88booo.   .88.   db   8D    88         Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D 
 *    ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      Y8888D' 88   YD Y888888P Y88888P Y88888P Y88888P Y888888P `8888Y'    YP          `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y' 
 *                                                                                                                                                                                                         
 *                                                                                                                                                                                                         
 */


    private updateDrillListColumns( list: IDrillList ) {
       
        let selectCols: string = "*";
        let expandThese = "";
  
        let allColumns = ['Title','Id','Created','Modified','Author/Title','Author/ID','Author/Name','Editor/Title','Editor/ID','Editor/Name'];

        //Add all refiner columns to array.
        list.refiners.map( r => { allColumns.push(r); }); 

        //Add ViewDef columns to column list
        list.viewDefs.map( vd => {
            vd.viewFields.map( vf => {
                if ( allColumns.indexOf( vf.name ) < 0 && list.removeFromSelect.indexOf(vf.name) < 0 ) {
                    allColumns.push( vf.name );
                }
            });
        });

        //Add refinerStats to column list
        //2020-11-04:  Fix testing error :  e.refinerStats.map is not a function 
        if ( list.refinerStats && list.refinerStats.length > 0 ) {
            list.refinerStats.map( rs => {
                if ( rs.primaryField && rs.primaryField.length > 0 && allColumns.indexOf( rs.primaryField) < 0  && list.removeFromSelect.indexOf(rs.primaryField) < 0 ) { allColumns.push( rs.primaryField ); }
                if ( rs.secondField && rs.secondField.length > 0  && allColumns.indexOf( rs.secondField) < 0  && list.removeFromSelect.indexOf(rs.secondField) < 0 ) { allColumns.push( rs.secondField ); }
            });
        }


        let expColumns = getExpandColumns(allColumns);
        let selColumns = getSelectColumns(allColumns);

        selColumns.length > 0 ? selectCols += "," + allColumns.join(",") : selectCols = selectCols;
        if (expColumns.length > 0) { expandThese = expColumns.join(","); }

        list.selectColumns = selColumns;
        list.staticColumns = allColumns;
        list.expandColumns = expColumns;

        list.selectColumnsStr = selColumns.join(',') ;
        list.staticColumnsStr = allColumns.join(',');
        list.expandColumnsStr = expColumns.join(',');

        return list;

    }


    /***
     *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d8888b. d8888b. d888888b db      db           db      d888888b .d8888. d888888b 
     *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88  `8D 88  `8D   `88'   88      88           88        `88'   88'  YP `~~88~~' 
     *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88   88 88oobY'    88    88      88           88         88    `8bo.      88    
     *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88   88 88`8b      88    88      88           88         88      `Y8b.    88    
     *    Y8b  d8 88 `88. 88.     88   88    88    88.          88  .8D 88 `88.   .88.   88booo. 88booo.      88booo.   .88.   db   8D    88    
     *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y8888D' 88   YD Y888888P Y88888P Y88888P      Y88888P Y888888P `8888Y'    YP    
     *                                                                                                                                          
     *                                                                                                                                          
     */

    private createDrillList(webURL: string, name: string, isLibrary: boolean, refiners: string[], rules: string, stats: string, viewDefs: ICustViewDef[], togOtherChartpart: boolean, title: string = null) {

        let refinerRules = this.createEmptyRefinerRules( rules );
        let refinerStats: IRefinerStat[] = this.createRefinerRuleCalcs( stats );

        if ( togOtherChartpart === true && refinerStats && refinerStats.length > 0 ) {
            //set consumer = 1 to all charts that are not explicitly defined.
            refinerStats.map( s => {
                if ( s.consumer === undefined || s.consumer === null ) { s.consumer = 1 ; }
            });
        }

        let list: IDrillList = {
            title: title,
            name: name,
            guid: '',
            contextUserInfo: {
                LoginName: this.props.pageContext.user.loginName,
                Title: this.props.pageContext.user.displayName,
                email: this.props.pageContext.user.email,
            },
            sourceUserInfo: null,
            fetchCount: this.props.performance.fetchCount,
            fetchCountMobile: this.props.performance.fetchCountMobile,
            restFilter: !this.props.performance.restFilter ? ' ' : this.props.performance.restFilter,

            isLibrary: isLibrary,
            webURL: webURL,
            parentListURL: this.props.parentListURL,
            refiners: refiners,
            emptyRefiner: 'Unknown',
            refinerRules: refinerRules,
            refinerStats: refinerStats,
            viewDefs: viewDefs,
            staticColumns: [],
            selectColumns: [],
            expandColumns: [],
            staticColumnsStr: '',
            selectColumnsStr: '',
            expandColumnsStr: '',
            removeFromSelect: ['currentTime','currentUser'],
        };

        list = this.updateDrillListColumns( list ) ;

        return list;
    }


    /***
     *     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
     *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
     *    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
     *    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
     *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
     *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
     *                                                                                                  
     *                                                                                                  
     */

    public constructor(props:IDrillDownProps){
        super(props);

        /**
         * This is copied later in code when you have to call the data in case something changed.
         */
        let drillList = this.createDrillList(this.props.webURL, this.props.listName, false, this.props.refiners, this.props.rules, this.props.stats, this.props.viewDefs, this.props.toggles.togOtherChartpart, '');
        let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.props.rules : '';
        if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; } 

        let maxRefinersToShow = 1;
        if ( this.props.refiners ) {
            if ( this.props.refiners.length > 1 ) { maxRefinersToShow = 2; }
            if ( this.props.refiners.length > 2 ) { maxRefinersToShow = 3; }
        }

        let quickCommands : IQuickCommands = this.props.quickCommands ? JSON.parse( JSON.stringify(this.props.quickCommands )) : null ;
        
        if ( quickCommands.onUpdateReload === true ) {
            quickCommands.refreshCallback = this._reloadOnUpdate.bind(this);
        }

        this.state = { 

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
            WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width - 50 ,

            drillList: drillList,

            bannerMessage: [],
            showTips: false,
            showRefinerCounts: this.props.showRefinerCounts ? this.props.showRefinerCounts : false,
            showCountChart: this.props.showCountChart ? this.props.showCountChart : false,
            showStats: false,

            viewType: this.props.viewType === undefined || this.props.viewType === null ? 'React' : this.props.viewType,

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            currentPage: 'Click Button to start',
            allLoaded: false,

            quickCommands: quickCommands,

            allItems: [],
            searchedItems: [],
            stats: [],
            first20searchedItems: [],
            searchCount: 0,

            meta: [],

            webURL: this.props.webURL,

            searchMeta: [pivCats.all.title],
            searchText: '',

            errMessage: errMessage,

            progress: null,

            rules: this.props.rules,
            refinerObj: {thisKey: '', childrenKeys: this.props.refiners, childrenObjs: [], childrenCounts: [], childrenMultiCounts: [] , multiCount: 0, itemCount: 0 },
            showDisabled: this.props.showDisabled ? this.props.showDisabled : false,

            pivotCats: [],
            cmdCats: [],

            groupByFields : [],
            refiners: this.props.refiners,
            maxRefinersToShow: maxRefinersToShow,

            style: this.props.style ? this.props.style : 'commandBar',

        };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    }

  public componentDidMount() {
    this._updateStateOnPropsChange();
    console.log('Mounted!');
  }


  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

public componentDidUpdate(prevProps){

    let rebuildPart = false;
//   console.log('DIDUPDATE setting Progress:', this.props.progress);
    if (this.props.progress !== prevProps.progress) {  rebuildPart = true ; }

    if ( JSON.stringify(prevProps.refiners) !== JSON.stringify(this.props.refiners )) {
        rebuildPart = true;
    }
    if ( prevProps.listName !== this.props.listName || prevProps.webURL !== this.props.webURL ) {
      rebuildPart = true ;
    }

    if ( prevProps.performance.fetchCount !== this.props.performance.fetchCount ) {
        rebuildPart = true ;
    }
    if ( prevProps.performance.fetchCountMobile !== this.props.performance.fetchCountMobile ) {
        rebuildPart = true ;
    }
    if ( prevProps.performance.restFilter !== this.props.performance.restFilter ) {
        rebuildPart = true ;
    }
    if ( prevProps.toggles !== this.props.toggles ) {
        rebuildPart = true ;
    }

    if ( prevProps.WebpartHeight !== this.props.WebpartHeight || prevProps.WebpartWidth !== this.props.WebpartWidth ) {
        rebuildPart = true ;
      }
      if ( prevProps.showDisabled !== this.props.showDisabled ) {
        rebuildPart = true ;
      }
    if (rebuildPart === true) {
      this._updateStateOnPropsChange();
    }
  }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

    public render(): React.ReactElement<IDrillDownProps> {

        let x = 1;
        if ( x === 1 ) {

/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */

            //console.log('renderStateWebs', this.state.allItems );

            let thisPage = null;
            let tipsStyles = defCommandIconStyles;

            let toggleTipsButton = <div style={{marginRight: "20px", background: 'white', opacity: '.7', borderRadius: '10px' }}>
                 { createIconButton('Help','Toggle Tips',this.toggleTips.bind(this), null, tipsStyles ) } </div>;

            /***
             *    d888888b d8b   db d88888b  .d88b.       d8888b.  .d8b.   d888b  d88888b 
             *      `88'   888o  88 88'     .8P  Y8.      88  `8D d8' `8b 88' Y8b 88'     
             *       88    88V8o 88 88ooo   88    88      88oodD' 88ooo88 88      88ooooo 
             *       88    88 V8o88 88~~~   88    88      88~~~   88~~~88 88  ooo 88~~~~~ 
             *      .88.   88  V888 88      `8b  d8'      88      88   88 88. ~8~ 88.     
             *    Y888888P VP   V8P YP       `Y88P'       88      YP   YP  Y888P  Y88888P 
             *                                                                            
             *                                                                            
             */

            const infoPage = <div>
            <InfoPage 
                allLoaded={ true }
                showInfo={ true }
                parentProps= { this.props }
                parentState= { this.state }
            ></InfoPage>
            </div>;

            let errMessage = this.state.errMessage === '' ? null : <div>
                { this.state.errMessage }
            </div>;

            /***
             *    .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db      d8888b.  .d88b.  db    db 
             *    88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88      88  `8D .8P  Y8. `8b  d8' 
             *    `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88      88oooY' 88    88  `8bd8'  
             *      `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88      88~~~b. 88    88  .dPYb.  
             *    db   8D 88.     88   88 88 `88. Y8b  d8 88   88      88   8D `8b  d8' .8P  Y8. 
             *    `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP      Y8888P'  `Y88P'  YP    YP 
             *                                                                                   
             *                                                                                   
             */

            /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
            let searchBox =  
            <div className={[styles.searchContainer, styles.padLeft20 ].join(' ')} >
              <SearchBox
                className={styles.searchBox}
                styles={{ root: { maxWidth: this.props.allowRailsOff === true ? 200 : 300 } }}
                placeholder="Search"
                onSearch={ this._searchForText.bind(this) }
                onFocus={ () => console.log('this.state',  this.state) }
                onBlur={ () => console.log('onBlur called') }
                onChange={ this._searchForText.bind(this) }
              />
              <div className={styles.searchStatus}>
                { 'Searching ' + this.state.searchCount + ' items' }
                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
              </div>
            </div>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };

            /***
             *    d8888b. d88888b d88888b d888888b d8b   db d88888b d8888b. .d8888. 
             *    88  `8D 88'     88'       `88'   888o  88 88'     88  `8D 88'  YP 
             *    88oobY' 88ooooo 88ooo      88    88V8o 88 88ooooo 88oobY' `8bo.   
             *    88`8b   88~~~~~ 88~~~      88    88 V8o88 88~~~~~ 88`8b     `Y8b. 
             *    88 `88. 88.     88        .88.   88  V888 88.     88 `88. db   8D 
             *    88   YD Y88888P YP      Y888888P VP   V8P Y88888P 88   YD `8888Y' 
             *                                                                      
             *                                                                      
             */

            //                <div> { resizePage0 } </div>
            let showRefiner0 = true;
            let showRefiner1 = this.state.maxRefinersToShow >= 2 && this.state.searchMeta[0] !== 'All' && this.state.cmdCats.length > 1 ? true : false;
            let showRefiner2 = this.state.maxRefinersToShow >= 3 && this.state.searchMeta.length >= 2 && this.state.searchMeta[1] !== 'All' && this.state.cmdCats.length > 2 ? true : false;

            let thisIsRefiner0 = null;
            let thisIsRefiner1 = null;
            let thisIsRefiner2 = null;

            let refinersObjects = [];
            if ( this.state.style === 'pivot' ) {

                let drillPivots0 = this.createPivotObject(this.state.searchMeta[0], '', 0);
                let drillPivots1 = showRefiner1 ? this.createPivotObject(this.state.searchMeta[1], '', 1) : null;
                let drillPivots2 = showRefiner2 ?  this.createPivotObject(this.state.searchMeta[2], '', 2) : null;


                if ( showRefiner0 ) { refinersObjects.push( drillPivots0 ) ; }
                if ( showRefiner1 ) { refinersObjects.push( drillPivots1 ) ; }
                if ( showRefiner2 ) { refinersObjects.push( drillPivots2 ) ; }

            } else if ( this.state.style === 'commandBar' ) {

                let pinCmd1 = createIconButton('Pin','Pin ' + this.state.refiners[1] + ' to top, Alt-Click to move DOWNOne level.',this.changeRefinerOrder1.bind(this), null, null );
                let pinCmd2 = createIconButton('Pin','Pin ' + this.state.refiners[2] + ' to top, Alt-Click to move UP One level.',this.changeRefinerOrder2.bind(this), null, null );
                let pinSpanStyle = { paddingLeft: '8px', height: '0px' } ;

                thisIsRefiner0 = showRefiner0 ? <div><ResizeGroupOverflowSetExample
                    items={ this.state.cmdCats[0] }
                    cachingEnabled = { true }
                    checkedItem = { this.state.searchMeta[0] }
                    onClick = { this._onSearchForMetaCmd0.bind(this) }
                    showRefinerCounts = { this.state.showRefinerCounts }
                    regroupKey = { this.state.cmdCats.length === 0 ? 'showRefiner0' : this.state.cmdCats[0].map( i => { return i.name;  }).join('|||') }
                ></ResizeGroupOverflowSetExample></div> : null;

                thisIsRefiner1 = showRefiner1 ?  <div style={{ display: 'inline-block', width: '100%' }}><div style={ pinSpanStyle }>{pinCmd1}</div><div style={{ marginLeft: '40px', left: '0px'}}><ResizeGroupOverflowSetExample
                    items={ this.state.cmdCats[1] }
                    cachingEnabled = { true }
                    checkedItem = { this.state.searchMeta[1] }
                    onClick = { this._onSearchForMetaCmd1.bind(this)}
                    showRefinerCounts = { this.state.showRefinerCounts }
                    regroupKey = { this.state.cmdCats.length === 0 ? 'showRefiner1' : this.state.cmdCats[1].map( i => { return i.name;  }).join('|||') }
                ></ResizeGroupOverflowSetExample></div></div> : null;

                thisIsRefiner2 = showRefiner2 ?  <div style={{ display: 'inline-block', width: '100%' }}><div style={ pinSpanStyle }>{pinCmd2}</div><div style={{ marginLeft: '40px', left: '0px'}}><ResizeGroupOverflowSetExample
                    items={ this.state.cmdCats[2] }
                    cachingEnabled = { true }
                    checkedItem = { this.state.searchMeta[2] }
                    onClick = { this._onSearchForMetaCmd2.bind(this)}
                    showRefinerCounts = { this.state.showRefinerCounts }
                    regroupKey = { this.state.cmdCats.length === 0 ? 'showRefiner2' : this.state.cmdCats[2].map( i => { return i.name;  }).join('|||') }
                ></ResizeGroupOverflowSetExample></div></div> : null;

                if ( showRefiner0 ) { refinersObjects.push( thisIsRefiner0 ) ; }
                if ( showRefiner1 ) { refinersObjects.push( thisIsRefiner1 ) ; }
                if ( showRefiner2 ) { refinersObjects.push( thisIsRefiner2 ) ; }

            }

            let noInfo = [];
            noInfo.push( <h3>{'Found ' + this.state.searchCount + ' items with this search criteria:'}</h3> )  ;
            if ( this.state.searchText != '' ) { noInfo.push( <p>{'Search Text: ' + this.state.searchText}</p> )  ; }
            if ( this.state.searchMeta[0] != '' ) { noInfo.push( <p>{'Refiner: ' + this.state.searchMeta[0]}</p> ) ; }

            if ( this.state.allItems.length === 0 ) {
                thisPage = <div style={{ paddingBottom: 30 }}className={styles.contents}>
                { errMessage }</div>;
            } else {

                /***
                 *    db      d888888b .d8888. d888888b      d888888b d888888b d88888b .88b  d88. .d8888. 
                 *    88        `88'   88'  YP `~~88~~'        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP 
                 *    88         88    `8bo.      88            88       88    88ooooo 88  88  88 `8bo.   
                 *    88         88      `Y8b.    88            88       88    88~~~~~ 88  88  88   `Y8b. 
                 *    88booo.   .88.   db   8D    88           .88.      88    88.     88  88  88 db   8D 
                 *    Y88888P Y888888P `8888Y'    YP         Y888888P    YP    Y88888P YP  YP  YP `8888Y' 
                 *                                                                                        
                 *                                                                                        
                 */

                let blueBar = this.state.searchMeta.map( m => { return <span><span style={{ paddingLeft: 0 }}> {'>'} </span><span style={{ paddingLeft: 10, paddingRight: 20 }}> { m } </span></span>; });


                let drillItems = this.state.searchedItems.length === 0 ? <div>NO ITEMS FOUND</div> : <div>
                    <MyDrillItems 
                        items={ this.state.searchedItems }
                        blueBar={ blueBar }
                    ></MyDrillItems>
                    </div>;

                let includeDetails = getAppropriateViewProp( this.props.viewDefs, this.state.WebpartWidth, 'includeDetails' );
                let includeAttach = getAppropriateViewProp( this.props.viewDefs, this.state.WebpartWidth, 'includeAttach' );
                let includeListLink = getAppropriateViewProp( this.props.viewDefs, this.state.WebpartWidth, 'includeListLink' );
                
                let currentViewFields: any[] = [];
                if ( this.props.viewDefs.length > 0 )  { currentViewFields = getAppropriateViewFields( this.props.viewDefs, this.state.WebpartWidth ); }

                let currentViewGroups : IGrouping[] =  getAppropriateViewGroups( this.props.viewDefs , this.state.WebpartWidth );

                let reactListItems  = null;

                if ( this.props.toggles.togOtherListview === false ) {

                    reactListItems  = this.state.searchedItems.length === 0 ? <div>NO ITEMS FOUND</div> : <ReactListItems 
                    parentListFieldTitles={ this.props.viewDefs.length > 0 ? null : this.props.parentListFieldTitles }

                    webURL = { this.state.drillList.webURL }
                    parentListURL = { this.state.drillList.parentListURL }
                    listName = { this.state.drillList.name }

                    contextUserInfo = { this.state.drillList.contextUserInfo }
                    sourceUserInfo = { this.state.drillList.sourceUserInfo }

                    viewFields={ currentViewFields }
                    groupByFields={ currentViewGroups }
                    items={ this.state.searchedItems}
                    includeDetails= { includeDetails }
                    includeAttach= { includeAttach }
                    includeListLink = { includeListLink }
                    quickCommands={ this.state.quickCommands }
                    
                     ></ReactListItems>;
                }



                /***
                 *    .d8888. db    db .88b  d88. .88b  d88.  .d8b.  d8888b. db    db 
                 *    88'  YP 88    88 88'YbdP`88 88'YbdP`88 d8' `8b 88  `8D `8b  d8' 
                 *    `8bo.   88    88 88  88  88 88  88  88 88ooo88 88oobY'  `8bd8'  
                 *      `Y8b. 88    88 88  88  88 88  88  88 88~~~88 88`8b      88    
                 *    db   8D 88b  d88 88  88  88 88  88  88 88   88 88 `88.    88    
                 *    `8888Y' ~Y8888P' YP  YP  YP YP  YP  YP YP   YP 88   YD    YP    
                 *                                                                    
                 *                                                                    
                 */

                let countCharts = [];
                let statCharts = [];
                let statRefinerObject = null;
                let buildStats = this.state.drillList.refinerStats && this.state.drillList.refinerStats.length > 0 ? true : false;
                let buildCount = this.state.showCountChart;

                let statsVisible = this.props.toggles.togOtherChartpart === true || this.props.toggles.togStats === true ? true : false;
                let textMaxRefinersToShow = 0;
                let childIndex0 = null;
                let childIndex1 = null;

                if ( buildStats ) {  statRefinerObject = this.state.refinerObj; }

                if ( this.state.maxRefinersToShow > 1 && this.state.searchMeta[0] !== 'All' ) { 
                    textMaxRefinersToShow = 1;
                    childIndex0 = this.state.refinerObj.childrenKeys.indexOf(this.state.searchMeta[0]);
                    if ( buildStats ) {  statRefinerObject = this.state.refinerObj.childrenObjs[childIndex0]; }
                }
                if ( textMaxRefinersToShow >= 1 && this.state.maxRefinersToShow > 2 && this.state.searchMeta.length > 1 && this.state.searchMeta[1] !== 'All' ) { 
                    textMaxRefinersToShow = 2;
                    childIndex1 = this.state.refinerObj.childrenObjs[childIndex0].childrenKeys.indexOf(this.state.searchMeta[1]);
                    if ( buildStats ) {  statRefinerObject = this.state.refinerObj.childrenObjs[childIndex0].childrenObjs[childIndex1]; }
                }

                if ( this.state.showCountChart === true || statsVisible === true ) {
                    if ( buildCount ) { countCharts.push( this.buildCountCharts( this.state.refiners[0], 'refiner0' , this.state.refinerObj, RefinerChartTypes ) ); }
                    if ( textMaxRefinersToShow >= 1 ) {
                        if ( buildCount ) {  countCharts.push( this.buildCountCharts( this.state.refiners[1], 'refiner1' , this.state.refinerObj.childrenObjs[childIndex0], RefinerChartTypes ) ); }
                        if ( textMaxRefinersToShow >= 2 ) {
                            if ( buildCount ) {  countCharts.push( this.buildCountCharts( this.state.refiners[2], 'refiner2' , this.state.refinerObj.childrenObjs[childIndex0].childrenObjs[childIndex1],  RefinerChartTypes ) ); }
                        }
                    }

                    if ( countCharts.length === 0 ) { countCharts = null ; }
                    if ( buildStats && statsVisible === true && statRefinerObject && statRefinerObject.childrenKeys.length > 0  ) {
                        let statChartArray = buildStatChartsArray( this.state.drillList.refinerStats, 'summaries', statRefinerObject );
                        statCharts = this.buildStatCharts( statChartArray );

                    } else {

                    }
    
                }
                if ( statRefinerObject && statRefinerObject.childrenKeys.length > 0  ) {

                    //Update Dynamic Data cssChartData  cssChartProps : ICssChartProps
                    this.props.handleSwitch ( this.state.drillList.refinerStats, 'summaries', statRefinerObject, this.state.searchMeta ) ; //resultSummaryArray  ); //: //  { chartData : ICSSChartSeries[], callBackID: string }[]  

                } else {
                    //Update Dynamic Data cssChartData
                    this.props.handleSwitch ( null, null, null ); //: ICssChartProps
                }

                /***
                 *    d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
                 *    `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
                 *       88    88    88 88      88      88      88ooooo `8bo.   
                 *       88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
                 *       88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
                 *       YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
                 *                                                              
                 *                                                              
                 */


                let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles( statCharts.length > 0 ? true : false )) } </div>;

                let messages : any[] = [];
                if ( this.state.WebpartWidth > 800 ) { 
                    messages.push( <div><span><b>{ 'Welcome to ALV Webpart Early Access!!!' }</b></span></div> ) ;
                    messages.push( <div><span><b>{ 'Get more info here -->' }</b></span></div> ) ;
                }
                else if ( this.state.WebpartWidth > 700 ) {
                    messages.push( <div><span><b>{ 'Webpart Early Access!' }</b></span></div> ) ;
                    messages.push( <div><span><b>{ 'More info ->' }</b></span></div> ) ;
                } else if ( this.state.WebpartWidth > 600 ) {
                    messages.push( <div><span><b>{ 'info ->' }</b></span></div> ) ;

                } else if ( this.state.WebpartWidth > 400 ) {
                    messages.push( <div><span><b>{ 'info ->' }</b></span></div> ) ;
                }

                let earlyAccess = 
                <div style={{ marginBottom: '15px'}}><EarlyAccess 
                        image = { "https://autoliv.sharepoint.com/sites/crs/PublishingImages/Early%20Access%20Image.png" }
                        messages = { messages }
                        links = { [ this.state.WebpartWidth > 450 ? links.gitRepoDrilldown7WebPart.wiki : null, 
                            this.state.WebpartWidth > 600 ? links.gitRepoDrilldown7WebPart.issues : null ]}
                        email = { 'mailto:General - WebPart Dev <0313a49d.Autoliv.onmicrosoft.com@amer.teams.ms>?subject=Drilldown Webpart Feedback&body=Enter your message here :)  \nScreenshots help!' }
                        farRightIcons = { [ toggleTipsButton ] }
                    ></EarlyAccess>
                </div>;

                let bannerMessage = <div style={{ width: '100%'}} 
                    className={ [ stylesD.bannerStyles,  this.state.bannerMessage === null ? stylesD.bannerHide : stylesD.bannerShow ].join(' ') }>
                    { this.state.bannerMessage.map( m => { return <div> { m } </div>; }) }
                </div>;


                /***
                 *    d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
                 *    `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
                 *       88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
                 *       88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
                 *       88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
                 *       YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
                 *                                                                           
                 *                                                                           
                 */
                    
                thisPage = <div className={styles.contents}>
                    <div className={stylesD.drillDown}>
                        { earlyAccess }
                        {  /* <div className={styles.floatRight}>{ toggleTipsButton }</div> */ }
                        <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ this.state.errMessage } </div>
                        {  /* <p><mark>Check why picking Assists does not show Help as a chapter even though it's the only chapter...</mark></p> */ }
                        <div className={( this.state.showTips ? '' : styles.hideMe )}>
                            { infoPage }
                        </div>
                        <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                            { searchBox } { toggles } 
                        </Stack>

                        <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens} className={ stylesD.refiners }>{/* Stack for Buttons and Webs */}
                            { refinersObjects  }
                        </Stack>

                        <div> { this.state.showCountChart === true ? countCharts : null } </div>
                        <div> { this.state.showStats === true ? statCharts : null } </div>

                        <div>

                            <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>
                            { bannerMessage }
                            <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                                { this.state.viewType === 'React' ? reactListItems : drillItems }
                                {   }
                            </Stack>
                        </div> { /* Close tag from above noInfo */}
                    </div>
                </div>;

                if ( this.state.allItems.length === 0 ) {
                    thisPage = <div style={{ paddingBottom: 30 }}className={styles.contents}>
                    { errMessage }</div>;
                }
            }


/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                 
 *                                                                 
 */

            return (
                <div className={ styles.contents }>
                <div className={ styles.container }>
                <div className={ styles.rightPivot }>
                        { thisPage }
                </div></div></div>
            );

        } else {
            console.log('DrillDown.tsx return null');
            return (  <div className={ styles.contents }>
                <h2>There is nothing to see</h2>
            </div> );
        }

    }   //End Public Render


    private getAllItemsCall() {

        /**
         * This is copied from constructor when you have to call the data in case something changed.
         */
        let drillList = this.createDrillList(this.props.webURL, this.props.listName, false, this.props.refiners, this.state.rules, this.props.stats, this.props.viewDefs, this.props.toggles.togOtherChartpart, '');
        let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.state.rules : '';
        if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; } 

        let result : any = getAllItems( drillList, this.addTheseItemsToState.bind(this), this.setProgress.bind(this), null );

    }

    private addTheseItemsToState( drillList: IDrillList, allItems , errMessage : string, refinerObj: IRefinerLayer ) {

        //let newFilteredItems : IDrillItemInfo[] = this.getNewFilteredItems( '', this.state.searchMeta, allItems, 0 );
        let pivotCats : any = [];
        let cmdCats : any = [];
        pivotCats.push ( refinerObj.childrenKeys.map( r => { return this.createThisPivotCat(r,'',0); }));
        let countTree: number[] = refinerObj.childrenObjs.map( o => { return o.itemCount; }) ;

        cmdCats.push ( this.convertRefinersToCMDs( ['All'],  refinerObj.childrenKeys, countTree, 0 , 0, refinerObj) );

        console.log('addTheseItemsToState: refinerObj',refinerObj );
        console.log('drillList.refinerStats: ', drillList.refinerStats );
//        console.log('addTheseItemsToState: childrenKeys',refinerObj.childrenKeys );
//        console.log('addTheseItemsToState: childrenCounts',refinerObj.childrenCounts );
//        console.log('addTheseItemsToState: childrenMultiCounts',refinerObj.childrenMultiCounts );

        if ( allItems.length < 300 ) {
            console.log('addTheseItemsToState allItems: ', allItems);
        } {
            console.log('addTheseItemsToState allItems: QTY: ', allItems.length );
        }


        let maxRefinersToShow = 1;
        if ( this.props.refiners ) {
            if ( this.props.refiners.length > 1 ) { maxRefinersToShow = 2; }
            if ( this.props.refiners.length > 2 ) { maxRefinersToShow = 3; }
        }
        if ( this.props.toggles.togOtherListview === true ) {
            let listViewDD : IListViewDD = {

                parentListFieldTitles: this.props.viewDefs.length > 0 ? null : this.props.parentListFieldTitles,
                togOtherListview: this.props.toggles.togOtherListview,
                webURL : drillList.webURL,
                parentListURL : drillList.parentListURL,
                listName : drillList.name,
        
                viewDefs: this.props.viewDefs,
                viewFields: null, // This is derived from viewDefs
                groupByFields: null, // This is derived from viewDefs
        
                contextUserInfo: drillList.contextUserInfo,  //For site you are on ( aka current page context )
                sourceUserInfo: drillList.sourceUserInfo,   //For site where the list is stored

                quickCommands: this.state.quickCommands,
        
                items : allItems,
                breadCrumb: [pivCats.all.title],

            };
        
            this.props.handleListPost( listViewDD );
        } else {

            let listViewDD : IListViewDD = {

                parentListFieldTitles: null,
                webURL :null,
                parentListURL : null,
                listName : null,
                togOtherListview: this.props.toggles.togOtherListview,
        
                viewDefs: null,
                viewFields: null, // This is derived from viewDefs
                groupByFields: null, // This is derived from viewDefs
        
                contextUserInfo: null,  //For site you are on ( aka current page context )
                sourceUserInfo: null,   //For site where the list is stored

                quickCommands: null,
        
                items : [],
                breadCrumb: null,
        
            };
        
            this.props.handleListPost( listViewDD );

        }

        this.setState({
            allItems: allItems,
            searchedItems: allItems, //newFilteredItems,  //Replaced with allItems to update when props change.
            searchCount: allItems.length,
            errMessage: errMessage,
            searchText: '',
            searchMeta: [pivCats.all.title],
            refinerObj: refinerObj,
            pivotCats: pivotCats,
            cmdCats: cmdCats,
            drillList: drillList,
            refiners: drillList.refiners,
            maxRefinersToShow: maxRefinersToShow,
            rules: JSON.stringify(drillList.refinerRules),
        });

        //This is required so that the old list items are removed and it's re-rendered.
        //If you do not re-run it, the old list items will remain and new results get added to the list.
        //However the list will show correctly if you click on a pivot.
        //this.searchForItems( '', this.state.searchMeta, 0, 'meta' );
        return true;
    }

    private createThisPivotCat ( title, desc, order ) {

        let pivCat : IMyPivCat = {
            title: title,
            desc: desc,
            order: order,
            count: null,
        };

        return pivCat;

    }

/***
 *         .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db 
 *         88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88 
 *         `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88 
 *           `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88 
 *         db   8D 88.     88   88 88 `88. Y8b  d8 88   88 
 *         `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP 
 *                                                         
 *                                                         
 */

 //Can't use this
    private findMatchtingElementTextOriginal(arr: string[], item: any ) {

        let hasItemKey = item.props && item.props.itemKey ? true : false ;
        let hasTargetInnerText = item.target && item.target.innerText ? true : false;
        if ( hasTargetInnerText === true ) {  //This loop is just for debugging if needed.
            let testString = item.target.innerText;
            let testStringL = testString.length;
            let arr0 = arr[0];
            let arr0L = arr0.length;

        }
        let hasTargetChildInnerText = item.target && item.target.lastElementChild && item.target.lastElementChild.innerText ? true : false;

        //Added the .trim() everywhere because of the "Assit" not being found.
        if ( hasItemKey && arr.indexOf( item.props.itemKey ) > -1 ) { return item.props.itemKey; }  //This should catch Pivot values without count or icons.
        else if ( hasTargetInnerText &&  arr.indexOf( item.target.innerText ) > -1 ) { return item.target.innerText; } //This should catch command bars without icons
        else if ( hasTargetChildInnerText &&  arr.indexOf( item.target.lastElementChild.innerText ) > -1 ) { return item.target.lastElementChild.innerText; } //This should catch command bars with icon
        alert('We had a problem with this filter.  It could be that you have a special character in the selection that I can\'t figure out.');
        return '';
    }

    private findCountOfAriaLabel( item: any ) {
        let result = '';
        if ( item === null ) { return result; }
        let isValue = false;
        if ( item.currentTarget && item.currentTarget.ariaLabel && item.currentTarget.ariaLabel.length > 0 ) {

            //Modified version of this answer:  https://stackoverflow.com/a/13807294  (less the [^\d]* )

            let searchText: string = item.currentTarget.ariaLabel;
            let openPar = searchText.lastIndexOf('(');
            let closePar = searchText.lastIndexOf(')');

            let regex = /^.*?\((\d+)[^\d]*\).*$/g;
            searchText.match(regex);


            if ( openPar > 1 && closePar > openPar) {
                //Found a pair of paranthesis, assume number is in between it.
                result = searchText.substring(openPar + 1, closePar);
                isValue = /^\d+$/.test(result);

                console.log('findCountOfAriaLabel:', result, isValue );
            } else {
                console.log ('Did not find numbers between ()' );
            }
        }
        return result;
    }

    private findMatchtingElementText( item: any ) {

        if ( item === null ) { return '' ; }

        let hasItemKey = item.props && item.props.itemKey ? true : false ;
        let hasTargetInnerText = item.target && item.target.innerText ? true : false;
        let targetInnerText = hasTargetInnerText && item.target.innerText.length > 0 ? item.target.innerText : "";
        let hasTargetInnerIcon = item.target && item.target.innerText && item.target.className.indexOf('ms-button-icon')? true : false;
        let hasTargetNextElemSib = hasTargetInnerIcon && item.target.nextElementSibling !== null ? true : false;
        let nextElemSibInnerText = hasTargetNextElemSib ? item.target.nextElementSibling.innerText : null;
        if ( hasTargetInnerText === true ) {  //This loop is just for debugging if needed.
            let testString = item.target.innerText;
            let testStringL = testString.length;

        }
        let hasTargetChildInnerText = item.target && item.target.lastElementChild && item.target.lastElementChild.innerText ? true : false;

        //Added the .trim() everywhere because of the "Assit" not being found.
        if ( hasItemKey ) { return item.props.itemKey; }  //This should catch Pivot values without count or icons.
        else if ( hasTargetChildInnerText ) { return item.target.lastElementChild.innerText; } //This should catch command bars with icon
        else if ( hasTargetNextElemSib ) { return nextElemSibInnerText; } //This find text label after the icon
        else if ( hasTargetInnerText ) { return targetInnerText; } //This should catch command bars without icons
        alert('We had a problem with this filter.  It could be that you have a special character in the selection that I can\'t figure out.');
        return '';
    }

    public _getValidCountFromClickItem( item, validText: string) {
        if ( this.state.showRefinerCounts === true ) {
            let countOf = this.findCountOfAriaLabel( item );
            validText = validText.replace(' ('+countOf+')','');
        }
        return validText;
    }
    public _searchForText = (item): void => {
        //This sends back the correct pivot category which matches the category on the tile.
        this.searchForItems( item, this.state.searchMeta, 0, 'text' );
    }

    //This function works great for Pivots, not neccessarily anything with icons.
    public _onSearchForMetaPivot0 = (item): void => {
        //This sends back the correct pivot category which matches the category on the tile.
        let validText = item.props.itemKey;
        this.searchForItems( this.state.searchText, [validText], 0, 'meta' );
    }


    private getClickInfo ( e , item ) {

        //This sends back the correct pivot category which matches the category on the tile.
        let validText = this.findMatchtingElementText( item );
        validText = this._getValidCountFromClickItem( item, validText );

        let clickInfo = {
            isAltClick : e.altKey,
            isShfitClick : e.shiftKey,
            isCtrlClick : e.ctrlKey,
            validText : validText,
        };

//        console.log('clickInfo:  ' , clickInfo );

        return clickInfo;

    }
    //This function works great for Pivots, not neccessarily anything with icons.
    public _onSearchForMetaCmd0 = (item): void => {
        let e: any = event;
        let clickInfo = this.getClickInfo( e, item );
        if ( clickInfo.isAltClick === '!Value' ) {
            this.changeRefinerOrder('refiner0', clickInfo.validText ) ;
        } else {
            this.searchForItems( this.state.searchText, [clickInfo.validText], 0, 'meta' );
        }
    }

    public _onSearchForMetaPivot1= (item): void => {
        this._onSearchForMeta1(item.props.itemKey);
    }

    public _onSearchForMetaCmd1= (item): void => {
        let e: any = event;
        let clickInfo = this.getClickInfo( e, item );
        if ( clickInfo.isAltClick === '!Value' ) {
            this.changeRefinerOrder('refiner1', clickInfo.validText ) ;
        } else {
            this._onSearchForMeta1(clickInfo.validText);
        }
    }

    public _onSearchForMeta1 (validText) {
        //This sends back the correct pivot category which matches the category on the tile.
        //let e: any = event;
        //console.log('searchForItems: e',e);
        //console.log('searchForItems: item', item);
        //console.log('searchForItems: this', this);

        //Be sure to pass item.props.itemKey to get filter value
        //let validText = this.findMatchtingElementText( this.state.refinerObj.childrenKeys , item);

        let lastMeta = this.state.searchMeta;
        let newMeta : string[] = [];
        if ( lastMeta.length === 1 || lastMeta.length === 2 || lastMeta.length === 3 ) { 
            newMeta.push( lastMeta[0] );
            newMeta.push( validText ) ; 
        } else { alert('Had unexpected error in _onSearchForMeta1, lastMeta.length = ' + lastMeta.length); }

        this.searchForItems( this.state.searchText, newMeta, 1, 'meta' );
      }

    public _onSearchForMetaPivot2= (item): void => {
        this._onSearchForMeta2(item.props.itemKey);
    }

    public _onSearchForMetaCmd2= (item): void => {
        let e: any = event;
        let clickInfo = this.getClickInfo( e, item );
        if ( clickInfo.isAltClick === '!Value' ) {
            this.changeRefinerOrder('refiner2', clickInfo.validText ) ;
        } else {
            this._onSearchForMeta2(clickInfo.validText);
        }
    }

  public _onSearchForMeta2 = (validText): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    //let e: any = event;
    //console.log('searchForItems: e',e);
    //console.log('searchForItems: item', item);
    //console.log('searchForItems: this', this);

    //Be sure to pass item.props.itemKey to get filter value

    let lastMeta = this.state.searchMeta;
    let newMeta : string[] = [];
    if ( lastMeta.length === 1 || lastMeta.length === 2 || lastMeta.length === 3 ) { 
        newMeta.push( lastMeta[0] );
        newMeta.push( lastMeta[1] );
        newMeta.push( validText ) ; 
    } else { alert('Had unexpected error in _onSearchForMeta2, lastMeta.length = ' + lastMeta.length); }

    this.searchForItems( this.state.searchText, newMeta, 2, 'meta' );
  }

    private changeRefinerOrder1() { 
        let e: any = event;
        let clickInfo = this.getClickInfo( e, null );
        this.changeRefinerOrder( 'refiner1', clickInfo );
    }

    private changeRefinerOrder2() {
        let e: any = event;
        let clickInfo = this.getClickInfo( e, null );
        this.changeRefinerOrder( 'refiner2', clickInfo );  
    }

  private changeRefinerOrder( newLeadRefiner: string, clickInfo ) {

    let refiners: string[] = [];
    let refinersOrig: string[] = JSON.parse(JSON.stringify( this.state.refiners ));
    let refinerRulesNew: IRefinerRules[][] = [];
    let refinerRulesOrig: IRefinerRules[][] = JSON.parse(JSON.stringify( this.state.drillList.refinerRules ));

    if ( newLeadRefiner === 'refiner0' ) {
        let newOrder = clickInfo.isAltClick !== true ? [0,1,2] : [1,0,2];
        newOrder.map( i => { refiners.push( refinersOrig[i] ); refinerRulesNew.push( refinerRulesOrig[i] ); });

    } else if ( newLeadRefiner === 'refiner1' ) {
        let newOrder = clickInfo.isAltClick !== true ? [1,0,2] : [0,2,1];
        newOrder.map( i => { refiners.push( refinersOrig[i] ); refinerRulesNew.push( refinerRulesOrig[i] ); });

    } else if ( newLeadRefiner === 'refiner2' ) {
        let newOrder = clickInfo.isAltClick !== true ? [2,0,1] : [0,2,1];
        newOrder.map( i => { refiners.push( refinersOrig[i] ); refinerRulesNew.push( refinerRulesOrig[i] ); });

    } else {
        alert ("I think there is a problem with changeRefinerOrder, " + newLeadRefiner + " was not expected." );

    }

    let drillList = this.createDrillList(this.props.webURL, this.props.listName, false, refiners, JSON.stringify(refinerRulesNew), this.props.stats, this.props.viewDefs, this.props.toggles.togOtherChartpart, '');
    let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.state.rules : '';
    if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; }

    processAllItems( this.state.allItems, errMessage, drillList, this.addTheseItemsToState.bind(this), this.setProgress.bind(this), null );

  }

  private getCurrentRefinerTree(newMeta: string[] ) {

    let result = {
        refinerTree: null,
        countTree: null,
        multiTree: null,
    };

    let refinerTree: any[] = [];  
    let countTree: any[] = [];
    let multiTree: any[] = [];
    // End result would be something like this:
    /**
     * 
     * newMeta = [Daily,Break]  -- the list of selected refiners
     * 
     * refiners = [             -- the array of all the refiner keys down to the last level
     *  [Daily,Meetings,Training],
     *  [Break,Email triage],
     * ]
     */
    refinerTree.push ( this.state.refinerObj.childrenKeys);
    countTree.push( this.state.refinerObj.childrenObjs.map( o => { return o.itemCount; }) );
    multiTree.push( this.state.refinerObj.childrenObjs.map( o => { return o.multiCount; }) );

    let newKeyIndex0 = this.state.refinerObj.childrenKeys.indexOf(newMeta[ 0 ]);
    if ( newKeyIndex0 > -1 ) { 
        refinerTree.push ( this.state.refinerObj.childrenObjs[newKeyIndex0].childrenKeys);
        countTree.push( this.state.refinerObj.childrenObjs[newKeyIndex0].childrenObjs.map( o => { return o.itemCount; }) );
        multiTree.push( this.state.refinerObj.childrenObjs[newKeyIndex0].childrenObjs.map( o => { return o.multiCount; }) );

        let newKeyIndex1 = this.state.refinerObj.childrenObjs[newKeyIndex0].childrenKeys.indexOf(newMeta[ 1 ]);
        if ( newKeyIndex1 !== null && newKeyIndex1 > -1 ) { 
            refinerTree.push ( this.state.refinerObj.childrenObjs[newKeyIndex0].childrenObjs[newKeyIndex1].childrenKeys); // Recreate first layer of pivots
            countTree.push( this.state.refinerObj.childrenObjs[newKeyIndex0].childrenObjs[newKeyIndex1].childrenObjs.map( o => { return o.itemCount; }) );
            multiTree.push( this.state.refinerObj.childrenObjs[newKeyIndex0].childrenObjs[newKeyIndex1].childrenObjs.map( o => { return o.multiCount; }) );

            //let searchMeta2 =  this.state.searchMeta.length > 2 ? this.state.searchMeta[ 2 ] : null;
            let newKeyIndex2 = this.state.refinerObj.childrenObjs[newKeyIndex0].childrenObjs[newKeyIndex1].childrenKeys.indexOf(newMeta[ 2 ]);
        }
    }

    result = {
        refinerTree: refinerTree,
        countTree: countTree,
        multiTree: multiTree,
    };

    //console.log('getCurrentRefinerTree: ', result);
    return result;

  }

  public searchForItems = (text: string, newMeta: string[] , layer: number, searchType: 'meta' | 'text' ): void => {

    let searchItems : IDrillItemInfo[] = this.state.allItems;
    let searchCount = searchItems.length;

    let newFilteredItems : IDrillItemInfo[] = this.getNewFilteredItems( text, newMeta, searchItems, layer );

    let pivotCats : any = [];
    let cmdCats : any = [];
    let prevLayer = this.state.pivotCats.length ;

    let prevMetaString = JSON.stringify( this.state.searchMeta );
    let thisMetaString = JSON.stringify( newMeta );
    let metaChanged = prevMetaString === thisMetaString ? false : true;
    let refinerObj = this.state.refinerObj;

    /**
     * example of newMeta:
     * Clicking on 1st refiner:     newMeta: ["Daily"]
     * Clicking on 2nd refiner:     newMeta: ["Daily","Break"]
     * Clicking on 3rd refiner:     newMeta: ["Daily","Break","Third"]
     */

    //if ( searchType === 'meta' && layer !== prevLayer ) {
    if ( searchType === 'meta' ) {

        //refinerTree: null,
        //countTree: null,
        //multiTree: null,

        let refinerTreeObj = this.getCurrentRefinerTree( newMeta );
        let refinerTree = refinerTreeObj.refinerTree;
        let refinerCount = refinerTreeObj.countTree;
        let refinerMulit = refinerTreeObj.multiTree;
        let sendCount = refinerCount;

        pivotCats.push ( refinerTree[0].map( r => { return this.createThisPivotCat(r,'',0); })); // Recreate first layer of pivots
        cmdCats.push ( this.convertRefinersToCMDs( newMeta, refinerTree[0], sendCount[0], layer, 0, refinerObj ));

        if ( newMeta.length === 1 && newMeta[0] === 'All'){  //For some reason this was giving False when it should be true: if ( newMeta === ['All'] ) { }
            //Nothing is needed.
        } else if ( !metaChanged ) {
            //Need to remove previous layer
            pivotCats = this.state.pivotCats;
            cmdCats = this.state.cmdCats;

        } else { // Add new layer

            if ( refinerTree.length > 1 ) { 
                pivotCats.push ( refinerTree[1].map( r => { return this.createThisPivotCat(r,'',0); })); // Recreate first layer of pivots
                cmdCats.push ( this.convertRefinersToCMDs( newMeta, refinerTree[1], sendCount[1], layer, 1, refinerObj));
            }

            if ( refinerTree.length > 2 ) {
                pivotCats.push ( refinerTree[2].map( r => { return this.createThisPivotCat(r,'',0); })); // Recreate first layer of pivots
                cmdCats.push ( this.convertRefinersToCMDs( newMeta, refinerTree[2], sendCount[2], layer, 2, refinerObj));
            }
        }
    } else {

        pivotCats = this.state.pivotCats;
        cmdCats = this.state.cmdCats;
    }

    if ( searchType === 'text' && this.props.updateRefinersOnTextSearch === true ) {
        refinerObj = buildRefinersObject(newFilteredItems, this.state.drillList );
        pivotCats = [];
        cmdCats = [];
        pivotCats.push ( refinerObj.childrenKeys.map( r => { return this.createThisPivotCat(r,'',0); }));
        let countTree: number[] = this.state.refinerObj.childrenObjs.map( o => { return o.itemCount; }) ;
        cmdCats.push ( this.convertRefinersToCMDs( ['All'],  refinerObj.childrenKeys, countTree, 0 , 0 , refinerObj) );
    }

    if ( this.props.toggles.togOtherListview === true ) {
        let listViewDD : IListViewDD = {

            parentListFieldTitles: this.props.viewDefs.length > 0 ? null : this.props.parentListFieldTitles,
            webURL :this.state.drillList.webURL,
            parentListURL : this.state.drillList.parentListURL,
            listName : this.state.drillList.name,
            togOtherListview: this.props.toggles.togOtherListview,
    
            viewDefs: this.props.viewDefs,
            viewFields: null, // This is derived from viewDefs
            groupByFields: null, // This is derived from viewDefs
    
            contextUserInfo: this.state.drillList.contextUserInfo,  //For site you are on ( aka current page context )
            sourceUserInfo: this.state.drillList.sourceUserInfo,   //For site where the list is stored

            quickCommands: this.state.quickCommands,
    
            items : newFilteredItems,
            breadCrumb: newMeta,
    
        };
    
        this.props.handleListPost( listViewDD );
        searchCount = newFilteredItems.length;
    } else {
        let listViewDD : IListViewDD = {

            parentListFieldTitles: null,
            webURL :null,
            parentListURL : null,
            listName : null,
            togOtherListview: this.props.toggles.togOtherListview,
    
            viewDefs: null,
            viewFields: null, // This is derived from viewDefs
            groupByFields: null, // This is derived from viewDefs
    
            contextUserInfo: null,  //For site you are on ( aka current page context )
            sourceUserInfo: null,   //For site where the list is stored

            quickCommands: null,
    
            items : [],
            breadCrumb: null,
    
        };
    
        this.props.handleListPost( listViewDD );
        searchCount = newFilteredItems.length;
    }


    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      searchText: text.toLowerCase(),
      searchMeta: newMeta,
      pivotCats: pivotCats,
      cmdCats: cmdCats,
      refinerObj: refinerObj,

    });


    return ;
    
  } //End searchForItems

    
  private getNewFilteredItems(text: string, meta: string[] , searchItems : IDrillItemInfo[], layer: number ) {

    let newFilteredItems : IDrillItemInfo[] = [];

    for (let thisSearchItem of searchItems) {

        let showItem = false;
        let searchFails = 0;
        let searchString = thisSearchItem.searchString;

        if ( meta !== undefined && meta !== null && meta.length > 0 ) {
            for ( let m in meta ) {
                let itemMeta = thisSearchItem.refiners['lev' + m];
                let metaM = meta[m]; //Only make this so it's easier to debug.
                if ( meta[m] == 'All' || meta[m] == '' || itemMeta.indexOf(meta[m]) > -1 ) {
                    if( searchString === '' || searchString.indexOf(text.toLowerCase()) > -1 ) {
                        showItem = true;
                    } else { showItem = false; searchFails ++; }
                } else { showItem = false; searchFails ++;}
            }
        }

//        console.log('checking item.refiners: ' , thisSearchItem.refiners );
//        console.log('For searchMeta: ' , meta );
//        console.log('Results: showItem, searchFails' ,showItem , searchFails );        
        if ( showItem === true && searchFails === 0 ) {
            newFilteredItems.push(thisSearchItem);
        }

      }

      return newFilteredItems;

  }

     /**
    * 
    * @param progressHidden 
    * @param page : page you want to add this to 'E' | 'C' | 'V' | 'I'
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in page
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
    */
   private setProgress(progressHidden: boolean, page: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ){
    let thisTime = new Date().toLocaleTimeString();
    const percentComplete = ofThese !== 0 ? current/ofThese : 0;

    logLabel = current > 0 ? current + '/' + ofThese + ' - ' + logLabel : logLabel ;
    let progress: IMyProgress = {
        ref: ref,
        time: thisTime,
        logLabel: logLabel,
        label: label + '- at ' + thisTime,
        description: description,
        percentComplete: percentComplete,
        progressHidden: progressHidden,
        color: color,
        icon: icon,
      };

    //console.log('setting Progress:', progress);

    this.setState({
        progress: progress,
    });

  }
  
/***
 *         db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
 *         88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *         88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo 
 *         88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
 *         88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.     
 *         ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                          
 *                                                                                                          
 */

    private _reloadOnUpdate( message: any[] ) : void {
        this.setState({
            bannerMessage: message,
        });
        this.getAllItemsCall();

        setTimeout(() => {
            this.setState({ bannerMessage: [] });
        } , 3500);

    }

    private _updateStateOnPropsChange(): void {
        this.getAllItemsCall();
    }

    /**
     * 
     * @param newMeta 
     * @param refiners 
     * @param layer  - this is the layer that was clicked on?
     * @param refLayer - this is the layer of this particular control
     */
    private convertRefinersToCMDs( newMeta: string[], refiners: string[], thisCount: number[], layer: number, refLayer: number, refinerObj: IRefinerLayer ) {
        let result = [];

        //Get sum of array of numbers:  https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
        
        const arrSum = thisCount.reduce((a,b) => a + b, 0);

        result.push ({
            name: 'All',
            key: 'All',
            checked: 'All' === newMeta[layer] ? true : false ,
            icon: null,
            count: arrSum,
        });

        let makeRefiners : string[] = [];
        let groupByDayOfWeek: any  = "groupByDayOfWeek" ;
        let groupByMonth: any  = "groupByMonthsMMM" ;
        let disabledItems: string[] = [];
        if ( this.state.drillList.refinerRules[ refLayer ].indexOf( groupByDayOfWeek ) > -1 ) {
            //Re-order by day of week:
            weekday3['en-us'].map( d => {
                if ( refiners.indexOf( d ) > - 1 ) { makeRefiners.push(d ); } else { if ( this.state.showDisabled === true ) { makeRefiners.push( d ); } disabledItems.push(d); }
            });
        } else if ( this.state.drillList.refinerRules[ refLayer ].indexOf( groupByMonth ) > -1 ) {
            //Re-order by Month of year:
            monthStr3['en-us'].map( d => {
                if ( refiners.indexOf( d ) > - 1 ) { makeRefiners.push(d ); } else { if ( this.state.showDisabled === true ) { makeRefiners.push( d ); } disabledItems.push(d); }
            });
        } else {
            makeRefiners = refiners.join('./.').split('./.'); //changed split join from ',' to avoid issues where meta has a text comma

        }

        let n = 0;
        makeRefiners.map( i => {  

            let thisItem : ICMDItem = {
                name: i,
                key: i,
                checked: i === newMeta[layer] ? true : false ,
                disabled: disabledItems.indexOf( i ) > -1 ? true : false,
                icon: null,
                count: thisCount[n],
            };
            n ++;
            return result.push(thisItem);

        });

        return result;
    }



    /***
 *         d8888b. d888888b db    db  .d88b.  d888888b .d8888. 
 *         88  `8D   `88'   88    88 .8P  Y8. `~~88~~' 88'  YP 
 *         88oodD'    88    Y8    8P 88    88    88    `8bo.   
 *         88~~~      88    `8b  d8' 88    88    88      `Y8b. 
 *         88        .88.    `8bd8'  `8b  d8'    88    db   8D 
 *         88      Y888888P    YP     `Y88P'     YP    `8888Y' 
 *                                                             
 *                                                             
 */



    public createPivotObject(setPivot, display, layer){

        let theseStyles = null;
        let onLinkClick : any = null;

        if ( layer === 2 ) {
            onLinkClick = this._onSearchForMetaPivot2.bind(this);
        } else if ( layer === 1 ) {
            onLinkClick = this._onSearchForMetaPivot1.bind(this);
        } else {  onLinkClick = this._onSearchForMetaPivot0.bind(this); }

        if ( setPivot === undefined ) { setPivot = 'All' ; }

        let pivotWeb = 
        <Pivot 
          style={{ flexGrow: 1, paddingLeft: '10px', display: display }}
          styles={ theseStyles }
          linkSize= { pivotOptionsGroup.getPivSize('normal') }
          linkFormat= { pivotOptionsGroup.getPivFormat('links') }
          onLinkClick= { onLinkClick }  //{this.specialClick.bind(this)}
          selectedKey={ setPivot }
          headersOnly={true}>
            {this.getRefinerPivots(layer)}
        </Pivot>;
        return pivotWeb;
      }

      private getRefinerPivots(layer) {

        let thesePivots = [ ];
        if ( this.state.pivotCats.length === 0 ) {
            thesePivots = [this.buildFilterPivot( pivCats.all )];
        } else  {
            thesePivots = [this.buildFilterPivot( pivCats.all )];
            if ( layer <= this.state.pivotCats.length - 1 ) {
                thesePivots = thesePivots.concat(this.state.pivotCats[layer].map( pC => { return this.buildFilterPivot( pC ) ; }) ) ;
            }

        }

        return thesePivots;

      }

    private buildFilterPivot(pivCat: IMyPivCat) {

        if ( pivCat === undefined || pivCat === null ) {
            let p = <PivotItem 
                headerText={ 'ErrPivCat' }
                itemKey={ 'ErrPivCat' }
                >
                { 'ErrPivCat' }
            </PivotItem>;

        } else {
        let p = <PivotItem 
            headerText={ pivCat.title }
            itemKey={ pivCat.title }
            itemCount={ 0 }
            >
            { pivCat.desc }
        </PivotItem>;

        return p;
        }

    }

/***
 *         d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
 *         `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
 *            88    88    88 88      88      88      88ooooo `8bo.   
 *            88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
 *            88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
 *            YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
 *                                                                   
 *                                                                   
 */

    private getPageToggles( showStats ) {

        let togRefinerCounts = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Refiner Counts</span>,
            key: 'togggleCount',
            _onChange: this.updateRefinerCount.bind(this),
            checked: this.state.showRefinerCounts === true ? true : false,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let togCountChart = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Count Charts</span>,
            key: 'togggleCountChart',
            _onChange: this.updateTogggleCountChart.bind(this),
            checked: this.state.showCountChart === true ? true : false,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let togStats = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Stat Charts</span>,
            key: 'togggleStats',
            _onChange: this.updateTogggleStats.bind(this),
            checked: this.state.showStats === true ? true : false,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let togRefinerStyle = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Style</span>,
            key: 'togggleRefinerStyle',
            _onChange: this.updateTogggleRefinerStyle.bind(this),
            checked: this.state.style === 'pivot' ? true : false,
            onText: 'Pivot',
            offText: 'CommandBar',
            className: '',
            styles: '',
        };


        let theseToggles = [];

        if ( this.props.toggles.togRefinerCounts === true  ) {
            theseToggles.push( togRefinerCounts ) ;
        }
        if ( this.props.toggles.togCountChart === true  ) {
            theseToggles.push( togCountChart ) ;
        }
        if ( showStats && this.props.toggles.togStats === true  ) {
            theseToggles.push( togStats ) ;
        }
        
        let pageToggles : IContentsToggles = {
            toggles: theseToggles,
            childGap: this.props.allowRailsOff === true ? 30 : 30,
            vertical: false,
            hAlign: 'end',
            vAlign: 'start',
            rootStyle: { width: this.props.allowRailsOff === true ? 120 : 120 , paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
        };

        return pageToggles;

    }

    private updateTogggleCountChart() {
        this.setState({
            showCountChart: !this.state.showCountChart,
          });
    }

    
    private updateTogggleStats() {
        this.setState({
            showStats: !this.state.showStats,
          });
    }

    private updateRefinerCount() {
        this.setState({
            showRefinerCounts: !this.state.showRefinerCounts,
          });
    }

    private updateTogggleView() {

        let viewType : IViewType = 'MZ';
        if (this.state.viewType === 'MZ') { viewType = 'React'; }
        this.setState({
            viewType : viewType,
        });
    }

    private updateTogggleRefinerStyle() {

        let newStyle : IRefinerStyles = null;

        if ( this.state.style === 'pivot' ) {
            newStyle = 'commandBar';

        } else if ( this.state.style === 'commandBar' ) {
            newStyle = 'pivot';

        }

        this.setState({
            style: newStyle,
        });
    }

    public toggleTips = (item: any): void => {
        //This sends back the correct pivot category which matches the category on the tile.
      
        this.setState({
          showTips: !this.state.showTips,
        });
      
      } //End toggleTips  

}