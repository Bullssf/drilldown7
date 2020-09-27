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

import { createIconButton } from "../createButtons/IconButton";

import { createAdvancedContentChoices } from '../fields/choiceFieldBuilder';

import { IContentsToggles, makeToggles } from '../fields/toggleFieldBuilder';

import { IPickedList, IPickedWebBasic, IMyPivots, IPivot,  ILink, IUser, IMyProgress, IMyIcons, IMyFonts, IChartSeries, ICharNote, IRefinerRules, RefineRuleValues, ICustViewDef, IRefinerStat, ICSSChartSeries, ICSSChartTypes } from '../IReUsableInterfaces';

import { createLink } from '../HelpInfo/AllLinks';

import { IRefiners, IRefinerLayer, IItemRefiners, } from '../IReUsableInterfaces';

import { PageContext } from '@microsoft/sp-page-context';

import { pivotOptionsGroup, } from '../../../../services/propPane';

import * as links from '../HelpInfo/AllLinks';

import { getHelpfullError, } from '../../../../services/ErrorHandler';

import MyDrillItems from './drillListView';

import ReactListItems from './reactListView';

//parentListFieldTitles

import { getAllItems, buildRefinersObject } from './drillFunctions';

import ResizeGroupOverflowSetExample from './refiners/commandBar';

import { ICMDItem } from './refiners/commandBar';

import stylesD from './drillComponent.module.scss';
import {  } from '../../../../services/listServices/viewTypes';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { unstable_renderSubtreeIntoContainer } from 'react-dom';

import Cssreactbarchart from '../CssCharts/Cssreactbarchart';

export type IRefinerStyles = 'pivot' | 'commandBar' | 'other';

export interface IDrillWeb extends Partial<IPickedWebBasic> {
    title?: string;
    ServerRelativeUrl?: string;
    guid?: string;
    url: string;
    siteIcon?: string;
  }


  export interface IDrillList extends Partial<IPickedList> {
    title: string;
    name?: string;
    guid?: string;
    isLibrary?: boolean;
    webURL?: string;
    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    emptyRefiner: string;
    refinerRules: IRefinerRules[][];
    refinerStats: IRefinerStat[];
  }

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


export interface IDrillItemInfo extends Partial<any>{

    sort: string;
    searchString: string;
    meta: string[];

    Created: any;
    Modified: any;
    Author: any;
    Editor: any;
    timeCreated : ITheTime;

    timeModified : ITheTime;
    bestCreate: string;
    bestMod: string;

    author: IUser;
    editor: IUser;

    refiners: IItemRefiners; //String of Keys representing the static name of the column used for drill downs

    Id: any;

}

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
    
    listName : string;
    
    allLoaded: boolean;

    viewType?: IViewType;
    viewDefs?: ICustViewDef[];
    parentListFieldTitles: string;

    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb?: string;
    analyticsList?: string;

    // 2 - Source and destination list information

    refiners: string[]; //String of Keys representing the static name of the column used for drill downs
    showDisabled?: boolean;
    updateRefinersOnTextSearch?: boolean;

    showCatCounts?: boolean;
    showSummary?: boolean;

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

}

export type IStatType = 'sum' | 'max' | 'mini' | 'range' | '';

export interface IStat {
    prop: string;
    label: string;
    type: IStatType;
    val1?: any;
    val2?: any;
    result?: string;
}

export const RefinerChartTypes : ICSSChartTypes[] = ['stacked-column-labels', 'pareto-dec'];

export interface IDrillDownState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webURL?: string;

    allLoaded: boolean;

    showTips: boolean;

    showCatCounts: boolean;
    showSummary: boolean;

    currentPage: string;
    searchCount: number;

    searchText: string;
    searchMeta: string[];

    searchedItems: IDrillItemInfo[];
    stats: IStat[];
    first20searchedItems: IDrillItemInfo[];

    progress: IMyProgress;

    allItems: IDrillItemInfo[];

    viewType?: IViewType;

    meta: string[];

    errMessage: string | JSX.Element;

    drillList: IDrillList;

    WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
    WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

    refinerObj: IRefinerLayer;
    showDisabled?: boolean;

    pivotCats: IMyPivCat[][];
    cmdCats: ICMDItem[][];

    style: IRefinerStyles; //RefinerStyle

    groupByFields: IGrouping[];

    
}

export default class DrillDown extends React.Component<IDrillDownProps, IDrillDownState> {

/***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */

    private getAppropriateViewFields ( viewDefs: ICustViewDef[], currentWidth: number ) {
        let result : IViewField[] = [];

        let maxViewWidth = 0 ;

        viewDefs.map( vd => {
            if ( currentWidth >= vd.minWidth && vd.minWidth >= maxViewWidth ) {
                result = vd.viewFields;
                maxViewWidth = vd.minWidth;
            }
        });

 //       console.log('getAppropriateViewFields BEST Width:', maxViewWidth );

        let avgWidth = result.length > 0 ? currentWidth/result.length : 100;
        let completeResult = result.map( f => {

            let thisField = f;
            let minWidth = thisField.minWidth ? thisField.minWidth : avgWidth;
            let maxWidth = thisField.maxWidth ? thisField.maxWidth : minWidth  + 100;
            if ( thisField.minWidth === undefined ) { thisField.minWidth = minWidth; }
            if ( thisField.maxWidth === undefined ) { thisField.maxWidth = maxWidth; }
            if ( thisField.isResizable === undefined ) { thisField.isResizable = true; }
            if ( thisField.sorting === undefined ) { thisField.sorting = true; }
            return thisField;
        });

        //console.log('getAppropriateViewFields:', completeResult);
        return completeResult;

    }

    private getAppropriateViewGroups ( viewDefs: ICustViewDef[], currentWidth: number ) {
        let result : IGrouping[] = [];

        let maxViewWidth = 0 ;

        viewDefs.map( vd => {
            if ( currentWidth >= vd.minWidth && vd.minWidth >= maxViewWidth ) {
                result = vd.groupByFields;
                maxViewWidth = vd.minWidth;
            }
        });
        console.log('getAppropriateViewFields: ', result);
        return result;

    }

    private getAppropriateDetailMode ( viewDefs: ICustViewDef[], currentWidth: number ) {
        let result : boolean = false;

        let maxViewWidth = 0 ;
        viewDefs.map( vd => {
            if ( currentWidth >= vd.minWidth && vd.minWidth >= maxViewWidth ) {
                result = vd.includeDetails;
                maxViewWidth = vd.minWidth;
            }
        });
        //console.log('includeDetails: ', result);
        return result;

    }

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

    private buildSummaryCountCharts( title: string, refinerObj: IRefinerLayer , chartTypes: ICSSChartTypes[] ) {
        let resultSummary = null;

        let labels = refinerObj.childrenKeys ;
        let counts = refinerObj.childrenMultiCounts;

        let chartKey : string = labels.join('') + counts.join('');

//        console.log('buildSummaryCountCharts labels:', labels );
//        console.log('buildSummaryCountCharts counts:', counts );

        let chartData : ICSSChartSeries = {
            title: title,
            labels: labels,
            chartTypes: chartTypes,
            barValueAsPercent: false,

            //The string value here must match the object key below
            barValues: 'val1',
            val1: counts ,
            key: chartKey,

            stylesChart: { paddingBottom: 0, marginBottom: 0, marginTop: 0},
            
        };
//        console.log('2 Creating Chart data: ',labels );
//        console.log('2 Creating Chart data: ',counts );

        resultSummary = 
        <Cssreactbarchart 
            chartData = { [chartData] }
        ></Cssreactbarchart>;

        return resultSummary;

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

    private createDrillList(webURL: string, name: string, isLibrary: boolean, refiners: string[], rules: string, stats: string, title: string = null) {

        let list: IDrillList = {
            title: title,
            name: name,
            guid: '',
            isLibrary: isLibrary,
            webURL: webURL,
            refiners: refiners,
            emptyRefiner: 'Unknown',
            refinerRules: this.createEmptyRefinerRules( rules ),
            refinerStats: this.createRefinerRuleCalcs( stats ),
        };

        return list;
    }

    public constructor(props:IDrillDownProps){
        super(props);

        /**
         * This is copied later in code when you have to call the data in case something changed.
         */
        let drillList = this.createDrillList(this.props.webURL, this.props.listName, false, this.props.refiners, this.props.rules, this.props.stats, '');
        let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.props.rules : '';
        if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; } 

        this.state = { 

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
            WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width - 50 ,

            drillList: drillList,

            showTips: false,
            showCatCounts: this.props.showCatCounts ? this.props.showCatCounts : false,
            showSummary: this.props.showSummary ? this.props.showSummary : false,

            viewType: this.props.viewType === undefined || this.props.viewType === null ? 'React' : this.props.viewType,

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            currentPage: 'Click Button to start',
            allLoaded: false,

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

            refinerObj: {thisKey: '', childrenKeys: this.props.refiners, childrenObjs: [], childrenCounts: [], childrenMultiCounts: [] , multiCount: 0, itemCount: 0 },
            showDisabled: this.props.showDisabled ? this.props.showDisabled : false,

            pivotCats: [],
            cmdCats: [],

            groupByFields : [],

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

            let toggleTipsButton = createIconButton('Help','Toggle Tips',this.toggleTips.bind(this), null, null );

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
            let showRefiner1 = this.state.searchMeta.length >= 1 && this.state.searchMeta[0] !== 'All' ? true : false;
            let showRefiner2 = this.state.searchMeta.length >= 2 && this.state.searchMeta[1] !== 'All' ? true : false;

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

                thisIsRefiner0 = showRefiner0 ? <div><ResizeGroupOverflowSetExample
                    items={ this.state.cmdCats[0] }
                    cachingEnabled = { true }
                    checkedItem = { this.state.searchMeta[0] }
                    onClick = { this._onSearchForMetaCmd0.bind(this)}
                    showCatCounts = { this.state.showCatCounts }
                ></ResizeGroupOverflowSetExample></div> : null;

                thisIsRefiner1 = showRefiner1 ?  <div><ResizeGroupOverflowSetExample
                    items={ this.state.cmdCats[1] }
                    cachingEnabled = { true }
                    checkedItem = { this.state.searchMeta[1] }
                    onClick = { this._onSearchForMetaCmd1.bind(this)}
                    showCatCounts = { this.state.showCatCounts }
                ></ResizeGroupOverflowSetExample></div> : null;

                thisIsRefiner2 = showRefiner2 ?  <div><ResizeGroupOverflowSetExample
                    items={ this.state.cmdCats[2] }
                    cachingEnabled = { true }
                    checkedItem = { this.state.searchMeta[2] }
                    onClick = { this._onSearchForMetaCmd2.bind(this)}
                    showCatCounts = { this.state.showCatCounts }
                ></ResizeGroupOverflowSetExample></div> : null;

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

                let viewDefMode = this.getAppropriateDetailMode( this.props.viewDefs, this.state.WebpartWidth );
                let currentViewFields: any[] = [];
                if ( this.props.viewDefs.length > 0 )  { currentViewFields = this.getAppropriateViewFields( this.props.viewDefs, this.state.WebpartWidth ); }

                let currentViewGroups : IGrouping[] =  this.getAppropriateViewGroups( this.props.viewDefs , this.state.WebpartWidth );

                let reactListItems  = this.state.searchedItems.length === 0 ? <div>NO ITEMS FOUND</div> : <ReactListItems 
                    parentListFieldTitles={ this.props.viewDefs.length > 0 ? null : this.props.parentListFieldTitles }
                    viewFields={ currentViewFields }
                    groupByFields={ currentViewGroups }
                    items={ this.state.searchedItems}
                    includeDetails= { viewDefMode }
                ></ReactListItems>;


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

                let summaryCharts = [];
                if ( this.state.showSummary === true ) {
                    summaryCharts.push( this.buildSummaryCountCharts( this.props.refiners[0], this.state.refinerObj, RefinerChartTypes ) );

                    if ( this.state.searchMeta[0] !== 'All' ) {

                        let childIndex0 = this.state.refinerObj.childrenKeys.indexOf(this.state.searchMeta[0]);
                        summaryCharts.push( this.buildSummaryCountCharts( this.props.refiners[1], this.state.refinerObj.childrenObjs[childIndex0], RefinerChartTypes ) );

                        if ( this.state.searchMeta.length > 1 && this.state.searchMeta[1] !== 'All' ) {

                            let childIndex1 = this.state.refinerObj.childrenObjs[childIndex0].childrenKeys.indexOf(this.state.searchMeta[1]);
                            summaryCharts.push( this.buildSummaryCountCharts( this.props.refiners[2], this.state.refinerObj.childrenObjs[childIndex0].childrenObjs[childIndex1],  RefinerChartTypes ) );

                        }

                    }

                } else { summaryCharts = null ; }


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


                let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;



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
                        <div className={styles.floatRight}>{ toggleTipsButton }</div>
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

                        <div> { summaryCharts } </div>

                        <div>

                            <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>

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
        let drillList = this.createDrillList(this.props.webURL, this.props.listName, false, this.props.refiners, this.props.rules, this.props.stats, '');
        let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.props.rules : '';
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
        console.log('addTheseItemsToState: childrenKeys',refinerObj.childrenKeys );
        console.log('addTheseItemsToState: childrenCounts',refinerObj.childrenCounts );
        console.log('addTheseItemsToState: childrenMultiCounts',refinerObj.childrenMultiCounts );

        console.log('addTheseItemsToState allItems: ', allItems);

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
        if ( this.state.showCatCounts === true ) {
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

    //This function works great for Pivots, not neccessarily anything with icons.
    public _onSearchForMetaCmd0 = (item): void => {
        //This sends back the correct pivot category which matches the category on the tile.
        let validText = this.findMatchtingElementText( item );
        validText = this._getValidCountFromClickItem( item, validText );

        this.searchForItems( this.state.searchText, [validText], 0, 'meta' );
    }

    public _onSearchForMetaPivot1= (item): void => {
        this._onSearchForMeta1(item.props.itemKey);
    }

    public _onSearchForMetaCmd1= (item): void => {
        let validText = this.findMatchtingElementText(item);
        validText = this._getValidCountFromClickItem( item, validText );

        this._onSearchForMeta1(validText);
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
        let validText = this.findMatchtingElementText(item);
        validText = this._getValidCountFromClickItem( item, validText );

        this._onSearchForMeta2(validText);
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

    console.log('getCurrentRefinerTree: ', result);
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


    searchCount = newFilteredItems.length;

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
            makeRefiners = refiners.join().split(',');
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

    private getPageToggles() {

        let togCounts = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Counts</span>,
            key: 'togggleCount',
            _onChange: this.updateTogggleCount.bind(this),
            checked: this.state.showCatCounts === true ? true : false,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let togSummary = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Summary</span>,
            key: 'togggleStats',
            _onChange: this.updateTogggleSummary.bind(this),
            checked: this.state.showSummary === true ? true : false,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let togView = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>View</span>,
            key: 'togggleView',
            _onChange: this.updateTogggleView.bind(this),
            checked: this.state.viewType === 'React' ? true : false,
            onText: 'React',
            offText: 'MZ',
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

        let theseToggles = [togCounts, togSummary, togView , togRefinerStyle];

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

    private updateTogggleSummary() {
        this.setState({
            showSummary: !this.state.showSummary,
          });
    }

    private updateTogggleCount() {
        this.setState({
            showCatCounts: !this.state.showCatCounts,
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