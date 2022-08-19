import { IFPSCorePinMeReactComponentProps, IFPSCorePinMeReactComponentState, ILoadPerformance } from '../../fpsReferences';

import { IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { ITheTime, } from '../../fpsReferences';

import { IPickedList, IMyProgress, ICSSChartTypes, ILabelColor } from '../../fpsReferences';

import { ICustViewDef } from '../../fpsReferences';

import { IUser } from '../../fpsReferences';

import { IQuickCommands } from '../../fpsReferences';

import { IRefinerLayer, IRefinerRules, IRefinerStat } from '../../fpsReferences';

import { IMyPivCat } from '../../fpsReferences';

import { ICMDItem } from './refiners/commandBar';

import { IDrillItemInfo } from '../../fpsReferences';



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
    itteration: number;
    location: string;

    language: string; // used for sorting items/refiners with local language
    title: string;
    name?: string;
    guid?: string;
    fetchCount: number;
    fetchCountMobile: number;
    restFilter: string;
    hideFolders: boolean;
    isLibrary?: boolean;
    hasAttach: boolean;
    webURL?: string;
    togStats: boolean;
    parentListURL?: string;
    contextUserInfo?: IUser;  //For site you are on ( aka current page context )
    sourceUserInfo?: IUser;   //For site where the list is stored

    refinerInstructions: string[];

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
    linkColumnsStr: string;
    multiSelectColumns: string[];
    linkColumns: string[];
    funcColumns: string[];
    funcColumnsActual: string[];    
    removeFromSelect: string[];

    errors: any[];

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

export const pivCats = {
    all: {title: 'All', desc: '', order: 1, count: null },
    newWebs: {title: 'New' , desc: '', order: 1, count: null },
    recCreate:  {title: 'RecentlyCreated' , desc: '', order: 1, count: null },
    oldCreate: {title: 'Old', desc: '', order: 9, count: null  },
    recUpdate: {title: 'RecentlyUpdated', desc: '', order: 9, count: null  },
    oldUpdate: {title: 'Stale', desc: '', order: 9, count: null  },
};

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

export type IRefinerStyles = 'pivot' | 'commandBar' | 'other';

export type IWhenToShowItems = 0 | 1 | 2 | 3;

export type IViewType = 'React' | 'MZ' | 'Other' ;

/**
 * ## Property Pane updates:
Page owner can set:
- min Refiner level required to hide instructions: whenToShowItems
- minItemsForHide to avoid instructions ( in case count is below this hide instructions )
- First line of instruction text
- Instruction text for each refiner to be clicked
- If nothing is touched, it will  do it's best to tell the user what to do.

## Logic should be:

- If the item count is greater than minItemsForHide && user has not clicked enough refiners, ONLY instructions are shown.
- If instructions are shown, user can always 'Hide' them via button in instructions div.
- This setting sticks unless the user clicks on certain things that trigger a reload of the data.
- At any time the user can press the "Instructions" button in the right side of banner element to show instructions.

## Properties Added this the code

```js
//Added to webpart props and property pane:
  whenToShowItems: IWhenToShowItems;
  minItemsForHide: number;
  instructionIntro: string;
  refinerInstruction1: string;
  refinerInstruction2: string;
  refinerInstruction3: string;

//Added to IDrillDownProps
    showItems: {
        whenToShowItems: IWhenToShowItems;
        minItemsForHide: number;
        instructionIntro: string;
        refinerInstruction1: string;
        refinerInstruction2: string;
        refinerInstruction3: string;
    };

//Added to IDrillDownSTATE
    whenToShowItems: IWhenToShowItems;
    instructionsHidden: 'force' | 'hide' | 'dynamic';
```


![image](https://user-images.githubusercontent.com/49648086/159371801-c2977995-6abe-4ade-8cd8-2932b538ab58.png)

 */




/**
 * Extends IFPSCorePinMeReactComponentProps with all basics required for FPS Banner
 */

export interface IDrillDownProps extends IFPSCorePinMeReactComponentProps {

    
    /**
     * Default 1.14 properties
     */
     description: string;
     isDarkTheme: boolean;
     environmentMessage: string;
     hasTeamsContext: boolean;
     userDisplayName: string;

     loadPerformance: ILoadPerformance;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allowRailsOff?: boolean;
    allowSettings?: boolean;

    tenant: string;
    urlVars: {};
    today: ITheTime;
    WebpartElement: HTMLElement;   //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    webURL?: string;
    parentListURL?: string;
    hideFolders: boolean;

    listName : string;
    language: string; //local language list data is saved in (needed to properly sort refiners)
    
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

    showItems: {
        whenToShowItems: IWhenToShowItems;
        minItemsForHide: number;
        instructionIntro: string;
        refinerInstructions: string[];
    };

    quickCommands?: IQuickCommands;

    viewType?: IViewType;
    viewDefs?: ICustViewDef[];
    parentListFieldTitles: string;

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

  export interface ICSSChartData {
    
    axisTitle?: string;
    val1?: number[];
    percents?: any[];
    count?: number;
    avg?: number;
    sum?: number;
    min?: number;
    max?: number;
    total?: number; //Added for cssBarCharts to have total "value" on top of chart... like total sum, total avg, total count
    changes?: any[];
    changeNotes?: string[];
    warnNotes?: string[];
    errorNotes?: string[];

    barValueAsPercent? : boolean;
    
    key: string; //This needs to be in data because this is the join of the currently selected refiners which can change.

    labels: any[];

  }

  export interface ICSSChartSettings {
    title: string;

    chartTypes: ICSSChartTypes[];
    activeType?: number;

    valueIsCount?: boolean;

    //isCollapsed = false shows expanded with accordion, true means isCollapsed with accordion, undefined means no accordion
    isCollapsed: number; 

    height?: number | string ; //This would be horizonal bar height... one horizontal layer
    barValues?: 'val1' | 'sums' | 'avgs' | 'percents' | string ;
    titleLocation?: 'top' | 'side';

    barColors?: 'blue' | 'green' |'brown' | 'gray' | 'red' | 'brown' | 'themed' | 'custom' ;
    customColors?: ILabelColor[];

    stylesChart?: any;
    stylesTitle?: any;
    stylesRow?: any;
    stylesBlock?: any;
    stylesLabel?: any;
    stylesValue?: any;
    stylesFigure?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.
    stylesGraphic?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.

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


/**
 * Extends IFPSCoreReactComponentState with all basics required for FPS Banner
 */

export interface IDrillDownState extends IFPSCorePinMeReactComponentState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webURL?: string;

    allLoaded: boolean;

    showPropsHelp: boolean;
    bannerMessage: any;

    showTips: boolean;

    showRefinerCounts: boolean;
    showCountChart: boolean;
    showStats: boolean;

    currentPage: string;
    searchCount: number;

    searchText: string;
    searchMeta: string[];

    whenToShowItems: IWhenToShowItems;
    instructionsHidden: 'force' | 'hide' | 'dynamic';

    // refinerInstructions: string[];

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

