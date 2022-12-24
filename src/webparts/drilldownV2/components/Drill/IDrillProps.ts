
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import { IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { ITheTime, } from '@mikezimm/fps-library-v2/lib/logic/Time/Interfaces';

import { ICSSChartTypes, ILabelColor } from '@mikezimm/fps-library-v2/lib/components/interfaces/CSSCharts/ICSSCharts';
import { IMyProgress, } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces';
import { IPickedList, } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/Picked/IPickedList';

import { ICustViewDef } from '../../fpsReferences';

import { IUser } from '@mikezimm/fps-library-v2/lib/logic/Users/IUserInterfaces';

import { IQuickCommandsDesign } from '../../fpsReferences';

import { IRefinerLayer, IRefinerRules, IRefinerStat } from '../../fpsReferences';

import { IMyPivCat } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/IzPivots';

import { ICMDItem } from './refiners/commandBar';

import { IDrillItemInfo } from '../../fpsReferences';

import { IFPSAgeSliderWPProps,  } from '@mikezimm/fps-library-v2/lib/components/atoms/FPSAgeSlider/FPSAgeTypes';

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
    fetchNewer: boolean;
    fetchCountMobile: number;
    restFilter: string;
    evalFilter: string;
    hideFolders: boolean;
    isLibrary?: boolean;
    getAllProps: boolean; //If getAllProps, then it gets * in select.  Can be slower for pages which also get CanvasContent.
    hasAttach: boolean;
    webUrl?: string;
    togStats: boolean;
    listUrl?: string;
    contextUserInfo?: IUser;  //For site you are on ( aka current page context )
    // sourceUserInfo?: IUser;   //For site where the list is stored

    refinerInstructions: string[];

    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    emptyRefiner: string;
    refinerRules: IRefinerRules[][];
    refinerStats: IRefinerStat[];
    viewDefs: ICustViewDef[];
    staticColumns: string[];
    selectColumns: string[];
    expandColumns: string[];
    richColumns: string[];  //This is for:  https://github.com/mikezimm/drilldown7/issues/224
    imageColumns: string[];
    ageColumns: string[];

    staticColumnsStr: string;
    selectColumnsStr: string;
    expandColumnsStr: string;
    linkColumnsStr: string;
    richColumnsStr: string;  //This is for:  https://github.com/mikezimm/drilldown7/issues/224
    imageColumnsStr: string;
    ageColumnsStr: string;

    multiSelectColumns: string[];
    linkColumns: string[];
    funcColumns: string[];
    specialColumns: string[]; // https://github.com/mikezimm/drilldown7/issues/294
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

export interface IPivCats {
  all: IMyPivCat;
  newWebs: IMyPivCat;
  recCreate: IMyPivCat;
  oldCreate: IMyPivCat;
  recUpdate: IMyPivCat;
  oldUpdate: IMyPivCat;

}

export const pivCats: IPivCats= {
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

import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';
import { ILoadPerformance } from '../../fpsReferences';



/**
 * Extends IFPSCorePinMeReactComponentProps with all basics required for FPS Banner
 */

export interface IDrilldownV2Props extends IFPSCoreReactComponentProps {
    /**
     * Default 1.14 properties
     */
     description: string;
     isDarkTheme: boolean;
     environmentMessage: string;
     hasTeamsContext: boolean;
     userDisplayName: string;
     themeVariant: IReadonlyTheme | undefined;

     loadPerformance: ILoadPerformance;

     ageSliderWPProps: IFPSAgeSliderWPProps;

    // allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    tenant: string;
    urlVars: {};
    today: ITheTime;
    WebpartElement: HTMLElement;   //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    webUrl?: string;
    listUrl?: string;
    hideFolders: boolean;

    listTitle : string;
    isLibrary: boolean;  //determined in picker
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
        fetchNewer: boolean;
        restFilter: string;
        evalFilter: string;
        itemsPerPage: number;
        getAllProps: boolean; //If getAllProps, then it gets * in select.  Can be slower for pages which also get CanvasContent.
    };

    showItems: {
        whenToShowItems: IWhenToShowItems;
        minItemsForHide: number;
        instructionIntro: string;
        refinerInstructions: string[];
    };

    quickCommands?: IQuickCommandsDesign;

    viewType?: IViewType;
    viewDefs?: ICustViewDef[];
    richHeights: number[];  //=>> maxHeight: 55em ; address:  https://github.com/mikezimm/drilldown7/issues/270
    autoRichHeight: string;  //=>> maxQty;maxHeight ; address:  https://github.com/mikezimm/drilldown7/issues/271
    parentListFieldTitles: string;

    // 2 - Source and destination list information
    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data
    updateRefinersOnTextSearch?: boolean;

    showRefinerCounts?: boolean;
    showCountChart?: boolean;

    rules: string;
    stats: string;

    WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
    WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    pivotSize: string;
    pivotFormat: string;
    pivotOptions: string;
    pivotTab: string;  //May not be needed because we have projectMasterPriority

    style: IRefinerStyles; //RefinerStyle

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

    // allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webUrl?: string;

    allLoaded: boolean;

    showPropsHelp: boolean;

    showTips: boolean;

    showRefinerCounts: boolean;
    showCountChart: boolean;
    showStats: boolean;

    currentPage: string;
    searchCount: number;

    searchText: string;
    searchMeta: string[];
    searchAge: number;

    whenToShowItems: IWhenToShowItems;
    instructionsHidden: 'force' | 'hide' | 'dynamic';

    // refinerInstructions: string[];

    searchedItems: IDrillItemInfo[];
    stats: IStat[];
    first20searchedItems: IDrillItemInfo[];

    progress: IMyProgress;

    quickCommands: IQuickCommandsDesign;

    allItems: IDrillItemInfo[];

    viewType?: IViewType;

    meta: string[];
    resetArrows?: string;  //unique Id used to reset arrows to starting position
    // richHeight: number;  //=>> maxHeight: 55em ; address:  https://github.com/mikezimm/drilldown7/issues/270

    errMessage: string | JSX.Element;

    drillList: IDrillList;
    // sourceUserInfo?: IUser;   //For site where the list is stored

    WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
    WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    rules: string;
    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    maxRefinersToShow: number;
    refinerObj: IRefinerLayer;
    showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data
  // ICMDItem[][] | IRefinerStyles | IGrouping[] | IRefinerLayer
    pivotCats: IMyPivCat[][];
    cmdCats: ICMDItem[][];

    style: IRefinerStyles; //RefinerStyle

    groupByFields: IGrouping[];


}

