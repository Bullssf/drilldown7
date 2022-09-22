import * as React from 'react';
// import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { DisplayMode, } from '@microsoft/sp-core-library';


import { IDrillDownProps, IDrillDownState, IDrillList, IViewType, IRefinerStyles, RefinerChartTypes } from './IDrillProps';
import { pivCats } from './IDrillProps';

import { saveViewAnalytics } from '../../CoreFPS/Analytics';

import { Stack, IStackTokens, Icon, } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pivot, PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// import { sp } from "@pnp/sp";
// import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

// import { IWebAddResult, IWebInfo, IWeb, } from "@pnp/sp/webs/types";

import "@pnp/sp/webs";

// import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

// import { ITheTime, } from '@mikezimm/npmfunctions/dist/Services/Time/Interfaces';
import { weekday3,  } from '../../fpsReferences';
import { monthStr3 } from '../../fpsReferences';

import styles from '../Contents/contents.module.scss';

import { createIconButton , defCommandIconStyles} from "../createButtons/IconButton";

import { IContentsToggles, makeToggles } from '../fields/toggleFieldBuilder';

import { IMyProgress, ICSSChartTypes, IMyPivCat } from '../../fpsReferences';

import { ICustViewDef } from '../../fpsReferences';

// import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { IQuickCommands } from '../../fpsReferences';

import { IListViewDDDrillDown } from '../../fpsReferences';

// import { gitRepoDrillDown } from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { IRefinerLayer, IRefinerRules, IRefinerStat } from '../../fpsReferences';

// import { PageContext } from '@microsoft/sp-page-context';

import { pivotOptionsGroup, } from '../../fpsReferences';
import { IFPSUser, } from '../../fpsReferences';

import { getExpandColumnsV2, getSelectColumnsV2, getLinkColumnsV2, getFuncColumnsV2 } from '../../../../services/getFunctionsV2';

// import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimSpecial } from '../../../../services/getInterface';

// import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

// import MyDrillItems from './drillListView';

import ReactListItems from './reactListView';

//parentListFieldTitles

import { getAllItems, buildRefinersObject, processAllItems, consoleMe, consoleRef, } from './drillFunctions';

import ResizeGroupOverflowSetExample from './refiners/commandBar';

import { ICMDItem } from './refiners/commandBar';

import stylesD from './drillComponent.module.scss';
// import {  } from '../../../../services/listServices/viewTypes';
import { IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import Cssreactbarchart from '../CssCharts/Cssreactbarchart';

import {buildCountChartsObject ,  buildStatChartsArray} from '../CssCharts/cssChartFunctions';

import { getAppropriateViewFields, getAppropriateViewGroups, getAppropriateViewProp } from './listFunctions';

// import FetchBanner from '../CoreFPS/FetchBannerElement';
import FetchBanner from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/FetchBannerElement';
// import FetchBanner from '../../CoreFPS/FetchBannerElement';

import { ISpecialMessage, specialUpgrade } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/special/interface';


import { getWebPartHelpElement } from '../../CoreFPS/PropPaneHelp';
import { getBannerPages, } from '../HelpPanel/AllContent';
import { IBannerPages } from '../../fpsReferences';

import { ILoadPerformance, startPerformOp, updatePerformanceEnd, ILoadPerformanceOps } from "../../fpsReferences";

import { IDrillItemInfo } from '../../fpsReferences';
import { defaultBannerCommandStyles } from '../../fpsReferences';


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

export interface IClickInfo  {
  isAltClick : boolean | '!Value'; //NO IDEA WHY THIS IS TYPED THIS WAY
  isShfitClick : boolean;
  isCtrlClick : boolean;
  validText : string;
}

export default class DrillDown extends React.Component<IDrillDownProps, IDrillDownState> {

    
    private _performance: ILoadPerformance = null;

    private _webPartHelpElement = getWebPartHelpElement( this.props.sitePresets );
    private _contentPages : IBannerPages = getBannerPages( this.props.bannerProps );

    
    private _newRefreshId() {

        const startTime = new Date();
        const refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();
        return refreshId;

    }

    /***
 *    d8b   db d88888b  .d8b.  d8888b.      d88888b  .d8b.  d8888b.      d88888b db      d88888b 
 *    888o  88 88'     d8' `8b 88  `8D      88'     d8' `8b 88  `8D      88'     88      88'     
 *    88V8o 88 88ooooo 88ooo88 88oobY'      88ooo   88ooo88 88oobY'      88ooooo 88      88ooooo 
 *    88 V8o88 88~~~~~ 88~~~88 88`8b        88~~~   88~~~88 88`8b        88~~~~~ 88      88~~~~~ 
 *    88  V888 88.     88   88 88 `88.      88      88   88 88 `88.      88.     88booo. 88.     
 *    VP   V8P Y88888P YP   YP 88   YD      YP      YP   YP 88   YD      Y88888P Y88888P Y88888P 
 *                                                                                               
 *                                                                                               
 */

     private _farBannerElements = this._buildFarBannerElements();
 
     private _buildNearBannerElements() {
       //See banner/NearAndFarSample.js for how to build this.
       let elements: any[] = [];
       // defaultBannerCommandStyles.fontWeight = 'bolder';
       // elements.push(<div style={{ paddingRight: null }} className={ '' } title={ title}>
       //   <Icon iconName='WindDirection' onClick={ this.jumpToParentSite.bind(this) } style={ defaultBannerCommandStyles }/>
       // </div>);
       return elements;
     }
   
     private _buildFarBannerElements() {
       let farElements: any[] = [];
   
       if ( this.props.bannerProps.showTricks === true ) {
         farElements.push( null );
       }
       return farElements;
     }

     private _makeDebugCmdStyles( withLeftMargin: boolean ) {
        let propsCmdCSS: React.CSSProperties = JSON.parse(JSON.stringify( this.props.bannerProps.bannerCmdReactCSS ));
        propsCmdCSS.backgroundColor = 'transparent';
        propsCmdCSS.marginRight = '30px';
        propsCmdCSS.fontSize = '24px'; //Make sure icon is always visible
    
        return propsCmdCSS;
      }
    
      private _debugCmdStyles: React.CSSProperties = this._makeDebugCmdStyles( true );

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
    private _buildCountCharts( title: string, callBackID: string, refinerObj: IRefinerLayer , chartTypes: ICSSChartTypes[] ) {
        let resultSummary = null;

        let resultSummaryObject = buildCountChartsObject( title, callBackID, refinerObj , chartTypes );

        resultSummary = 
        <Cssreactbarchart 
            chartData = { resultSummaryObject.chartData }
            chartSettings = { resultSummaryObject.chartSettings }
            callBackID = { resultSummaryObject.callBackID }
            WebpartWidth = { this.state.WebpartWidth }
            //onAltClick = { this._changeRefinerOrder.bind(this) }
        />;

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
    private _buildStatCharts(  statArray: any[]) {

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
                    //onAltClick = { this._changeRefinerOrder.bind(this) }
                />;

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
    
    private _createEmptyRefinerRules( rules: string ) {
        let emptyRules : any = null;
        try {
            emptyRules = JSON.parse(rules);
        } catch(e) {
            alert('createEmptyRefinerRules: ' + e);
            emptyRules = undefined;
        }

        return emptyRules;
    }


    private _createRefinerRuleCalcs( calcs: string ) {
        let theCalcs : any = null;
        //Close https://github.com/mikezimm/drilldown7/issues/78
        if ( calcs === '' ) { return []; }
        try {
            //2022-01-17:  replace does not modify the original value.
            //But I created a new value here because it did modify "itself" which I don't think I wanted to do.

            let newcalcs = calcs.replace(/\\"/g,'"').replace(/\\'"/g,"'"); //Replace any cases where I copied the hashed characters from JSON file directly.
            theCalcs = JSON.parse(newcalcs);
        } catch(e) {
            alert('createRefinerRuleCalcs: ' + e);
            theCalcs = [];
        }

        return theCalcs;
    }

    private _buildInstructionIcons() {
        //See banner/NearAndFarSample.js for how to build this.
        let elements = [];
        defaultBannerCommandStyles.fontWeight = 'bolder';
        defaultBannerCommandStyles.fontSize = 'normal';
        
        elements.push(<span style={{ paddingLeft: '20px' }} className={ '' } title={ 'Hide instructions based on webpart settings' }>
          <Icon iconName='Hide3' onClick={ this._hideInstructions.bind(this) } style={ defaultBannerCommandStyles }/></span>);
        return elements;
      }

    private _createInstructionRow( row : 0 | 1 | 2 ){
        let isDone = this.state.searchMeta.length > row && this.state.searchMeta[ row ] !== 'All' ? true : false;
        let isNext = row === this.state.searchMeta.length && this.state.searchMeta[ row ] !== 'All' ? true : false;
        //Make this adjustment for first row
        if ( row === 0 && this.state.searchMeta[ 0 ] === 'All' ) { isNext = true ; }
        else if ( row === 1 && this.state.searchMeta[ 0 ] === 'All' ) { isNext = false ; }

        let itemStyle = isDone ? stylesD.complete : stylesD.incomplete;
        const liIcon = <Icon iconName={ isDone === true ? 'CheckboxComposite' : 'Error' } styles={{ root: { } }}/>;
        const itemTextEnd = isDone ? <span style={{paddingLeft: '10px'}}><b>{this.state.searchMeta[row]}</b>  is selected</span> : null;
        let rowText = row === 0 ? 'First... ' : isNext === true ? 'Now... ' : 'Then... ';
        rowText += this.state.drillList.refinerInstructions[ row ];
        let itemText = <span style={{ fontWeight: isNext === true ? 600 : null }}>
            { rowText }
            { itemTextEnd }
        </span>;

        return <li className={ itemStyle }>{liIcon}{ itemText }</li>;

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


    private _updateDrillListColumns( list: IDrillList ) {
       
        let selectCols: string = "*";
        let expandThese = "";
        const nonColumnViewItemProps: string[] = ['goToItemPreview', 'goToItemLink', 'goToPropsLink' ]; //,'linkDesc', 'linkUrl'
  
        let allColumns = ['Title','Id','Created','Modified','Author/Title','Author/ID','Author/Name','Editor/Title','Editor/ID','Editor/Name'];

        //Add all refiner columns to array.
        list.refiners.map( r => { allColumns.push(r); }); 

        //Add ViewDef columns to column list
        list.viewDefs.map( vd => {
            vd.viewFields.map( vf => {
                if ( allColumns.indexOf( vf.name ) < 0 && list.removeFromSelect.indexOf(vf.name) < 0 ) {
                    allColumns.push( vf.name );
                }
                // if linkPropertyName seems to be a column, then add to select columns
                // Should fix https://github.com/mikezimm/drilldown7/issues/103
                if ( vf.linkPropertyName && nonColumnViewItemProps.indexOf( vf.linkPropertyName ) < 0 && allColumns.indexOf( vf.linkPropertyName ) < 0 ) {
                    allColumns.push( vf.linkPropertyName );                 
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

        let expColumns = getExpandColumnsV2(allColumns);
        let selColumns = getSelectColumnsV2(allColumns);
        let linkColumns = getLinkColumnsV2(allColumns);
        let funcColumns = getFuncColumnsV2(allColumns);

        if ( selColumns.length > 0 ) selectCols += "," + allColumns.join(",");
        if (expColumns.length > 0) { expandThese = expColumns.join(","); }

        list.selectColumns = selColumns;
        list.staticColumns = allColumns;
        list.expandColumns = expColumns;
        list.linkColumns = linkColumns;
        list.funcColumns = funcColumns.all;
        list.funcColumnsActual = funcColumns.actual;
        list.errors = [ ...funcColumns.funcErrors ];

        list.selectColumnsStr = selColumns.join(',') ;
        list.staticColumnsStr = allColumns.join(',');
        list.expandColumnsStr = expColumns.join(',');
        list.linkColumnsStr = linkColumns.join(',');

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

    private _createDrillList(webURL: string, name: string, isLibrary: boolean, refiners: string[], rules: string, stats: string, 
        OrigViewDefs: ICustViewDef[], togOtherChartpart: boolean, title: string = null, stateSourceUserInfo: boolean, language: string, location: string, itteration: number ) {

        let viewDefs = JSON.parse(JSON.stringify(OrigViewDefs)) ;
        let refinerRules = this._createEmptyRefinerRules( rules );
        let refinerStats: IRefinerStat[] = this._createRefinerRuleCalcs( stats );

        if ( togOtherChartpart === true && refinerStats && refinerStats.length > 0 ) {
            //set consumer = 1 to all charts that are not explicitly defined.
            refinerStats.map( s => {
                if ( s.consumer === undefined || s.consumer === null ) { s.consumer = 1 ; }
            });
        }

        let list: IDrillList = {
            itteration: itteration + 1,
            location: location,
            language: language,
            title: title,
            name: name,
            guid: '',
            contextUserInfo: {
                LoginName: this.props.bannerProps.pageContext.user.loginName,
                Title: this.props.bannerProps.pageContext.user.displayName,
                email: this.props.bannerProps.pageContext.user.email,
            },
            sourceUserInfo: stateSourceUserInfo === true ? this.state.drillList.sourceUserInfo : null,
            fetchCount: this.props.performance.fetchCount,
            fetchCountMobile: this.props.performance.fetchCountMobile,
            restFilter: !this.props.performance.restFilter ? ' ' : this.props.performance.restFilter,
            hideFolders: this.props.hideFolders,
            isLibrary: isLibrary,
            getAllProps: this.props.performance.getAllProps,
            hasAttach: false,
            togStats: this.props.toggles.togStats,

            webURL: webURL,
            parentListURL: this.props.parentListURL,
            refiners: refiners,
            emptyRefiner: 'Unknown',
            refinerRules: refinerRules,

            refinerInstructions: [ 
                this.props.showItems.refinerInstructions[0],
                this.props.showItems.refinerInstructions[1],
                this.props.showItems.refinerInstructions[2],
            ],

            refinerStats: refinerStats,
            viewDefs: viewDefs,
            staticColumns: [],
            selectColumns: [],
            expandColumns: [],
            multiSelectColumns: [],
            linkColumns: [],
            funcColumns: [],
            funcColumnsActual: [],
            staticColumnsStr: '',
            selectColumnsStr: '',
            expandColumnsStr: '',
            linkColumnsStr: '',
            removeFromSelect: ['currentTime','currentUser'],
            errors:  [],
        };

        consoleMe( 'createDL' + location , this.state ? this.state.allItems : null , list );
        list = this._updateDrillListColumns( list ) ;

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

        if ( this._performance === null ) { this._performance = this.props.loadPerformance;  }
        /**
         * This is copied later in code when you have to call the data in case something changed.
         */

        let drillList = this._createDrillList(this.props.webURL, this.props.listName, this.props.isLibrary, this.props.refiners, this.props.rules, this.props.stats, this.props.viewDefs, this.props.toggles.togOtherChartpart, '', false, this.props.language, 'constructor', 0);
        let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.props.rules : '';
        if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; } 

        let maxRefinersToShow = 1;
        if ( this.props.refiners ) {
            if ( this.props.refiners.length > 1 ) { maxRefinersToShow = 2; }
            if ( this.props.refiners.length > 2 ) { maxRefinersToShow = 3; }
        }

        let quickCommands : IQuickCommands = this.props.quickCommands ? JSON.parse( JSON.stringify(this.props.quickCommands )) : null ;

        if ( quickCommands !== null ) {
            if ( quickCommands.onUpdateReload === true ) {
                quickCommands.refreshCallback = this._reloadOnUpdate.bind(this);
            }
            if ( quickCommands.successBanner === undefined || quickCommands.successBanner === null ) {
                quickCommands.successBanner = 3.5 * 1000;
            } else { quickCommands.successBanner = quickCommands.successBanner * 1000; }
        }

        this.state = { 
            pinState: this.props.fpsPinMenu.defPinState ? this.props.fpsPinMenu.defPinState : 'disabled',
            showDevHeader: false,
            lastStateChange: '', 
            analyticsWasExecuted: false,
            refreshId: this._newRefreshId(),

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
            WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width - 50 ,

            drillList: drillList,

            bannerMessage: null,
            showPropsHelp: false,
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

            whenToShowItems: this.props.showItems.whenToShowItems,
            instructionsHidden: 'dynamic',

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
    // const analyticsWasExecuted: boolean = saveViewAnalytics( 'Drilldown Webpart', 'didMount', this.props, this.state.analyticsWasExecuted );

    this._updateStateOnPropsChange();
    console.log('DrillComponent Mounted!');
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

public componentDidUpdate( prevProps: IDrillDownProps ){

    let rebuildPart = false;

    const refresh = this.props.displayMode !== prevProps.displayMode ? true : false;

    if ( refresh === true ) {
      this._webPartHelpElement = getWebPartHelpElement( this.props.sitePresets );
      this._contentPages = getBannerPages( this.props.bannerProps );
    }

    if (this.props.progress !== prevProps.progress) {  rebuildPart = true ; }

    if ( JSON.stringify(prevProps.refiners) !== JSON.stringify(this.props.refiners )) {
        rebuildPart = true;
    }

    if ( JSON.stringify(prevProps.viewDefs) !== JSON.stringify(this.props.viewDefs )) {
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

        const {
            bannerProps,
            // isDarkTheme,
            // environmentMessage,
            // hasTeamsContext,
            // userDisplayName,
          } = this.props;

        let x = 1;
        if ( x === 1 ) {

        /**
         * 2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  
         * After deeper testing, adding this to getBestFitView solved it but that was getting called a lot so I'm just doing it once in the render
         */
        let viewDefsString = JSON.stringify(this.props.viewDefs);
        
        // this.state.drillList.linkColumns.map( linkColumn => {
        //     viewDefsString = viewDefsString.replace( linkColumn , linkColumn.replace(/\//g,'') );
        // });
        // this.state.drillList.funcColumns.map( linkColumn => {
        //     viewDefsString = viewDefsString.replace( linkColumn , linkColumn.replace(/\//g,'') );
        // });
        // this.state.drillList.multiSelectColumns.map( msColumn => {
        //     viewDefsString = viewDefsString.replace( msColumn , msColumn.replace(/\//g,'') + 'MultiString' );
        // });
        
        let viewDefs: ICustViewDef[] = JSON.parse(viewDefsString);

        viewDefs.map( view => {
            view.viewFields.map ( field => {
                if (  this.state.drillList.multiSelectColumns.indexOf( field.name ) > -1 ) {
                    field.name += 'MultiString';
                }
                field.name = field.name.replace(/\//g,'');
                // Since linkPropertyName is optional, first check to make sure it exists and is a string.
                if ( typeof field.linkPropertyName === 'string' ) { field.linkPropertyName = field.linkPropertyName.replace(/\//g,''); }

            });
        });

        let drillListErrors = this.state.drillList.errors.length === 0 ? null : <div style={{ padding: '20px'}}>
            <h3>These column functions have errors... Check refiners or ViewFields :)</h3>
            { this.state.drillList.errors.map( ( message: string, idx : number ) => {
                return <li key={idx}> { message }</li>;
            }) }
        </div>;
        
        let createBanner = this.state.quickCommands !== null && this.state.quickCommands.successBanner > 0 ? true : false;
        let bannerMessage = createBanner === false ? null : <div style={{ width: '100%'}} 
            className={ [ stylesD.bannerStyles,  this.state.bannerMessage === null ? stylesD.bannerHide : stylesD.bannerShow ].join(' ') }>
            { this.state.bannerMessage }
        </div>;

        /***
            *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b. 
            *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D 
            *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY' 
            *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b   
            *    88   8D 88   88 88  V888 88  V888 88.     88 `88. 
            *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD 
            *                                                      
            *                                                      
            */


        // let farBannerElementsArray = [];
        let farBannerElementsArray = [...this._farBannerElements,
            <Icon key={ 'forceInstructions' } iconName='BookAnswers' onClick={ this._forceInstructions.bind(this) } style={ this._debugCmdStyles }/>,
        ];

        const FPSUser : IFPSUser = this.props.bannerProps.FPSUser;
        const showSpecial = FPSUser.manageWeb === true || FPSUser.managePermissions === true || FPSUser.manageLists === true ? true : false;
        const Special : ISpecialMessage = showSpecial === true ? specialUpgrade( 'warn', '/sites/TheSharePointHub/SitePages/DrillDown-WebPart-Upgrade---v2.aspx', ) : undefined;
        // Special.style = { color: 'black', background: 'limegreen' };

        const Banner = <FetchBanner 

            // bonusHTML1={ this._bonusHTML }
            panelPerformance={ this._performance }
            // bonusHTML2={ this._bonusHTML }

            parentProps={ this.props }
            parentState={ this.state }

            nearBannerElementsArray={ [] }
            farBannerElementsArray={ farBannerElementsArray }

            contentPages={ this._contentPages }
            WebPartHelpElement={ this._webPartHelpElement }

            SpecialMessage = { Special }

            updatePinState = { null }
            pinState = { this.state.pinState }

        />;

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

            let thisPage = null;
            let tipsStyles = defCommandIconStyles;

            let performanceMessage = false;

            if ( typeof this.state.errMessage === 'string' && this.state.errMessage.indexOf('Performance') === 0 ) {
                performanceMessage = true;
            }

            if ( this.props.errMessage ) {
                let issues : string[] = this.props.errMessage.split(';');
                let issueElements = issues.map( ( issue: string, idx : number ) => {
                    return <li key={idx}>{ issue } </li>;
                });
                thisPage = <div>
                    { Banner }
                    <h2>The webpart props have some issues</h2>
                    { issueElements }
                    { drillListErrors }
                </div>;

            } else if ( this.state.errMessage && performanceMessage !== true  ) {
                let issues = [];
                if ( typeof this.state.errMessage === 'string' ) {
                    issues = this.state.errMessage.split('--');
                } else { issues = [this.state.errMessage] ; }

                let issueElements = issues.map( ( issue: any, idx : number ) => {
                    return <li key={idx}>{ issue } </li>;
                });
                thisPage = <div>
                    { Banner }
                    <h2>The webpart props have some issues</h2>
                    { issueElements }
                    { drillListErrors }
                </div>;

            } else {

                let toggleTipsButton = <div style={{marginRight: "20px", background: 'white', opacity: '.7', borderRadius: '10px' }}>
                { createIconButton('Help','Toggle Tips',this._toggleTips.bind(this), null, tipsStyles ) } </div>;

                let errMessage = this.state.errMessage === '' ? null : <div>
                    { this.state.errMessage }
                </div>;
                if ( performanceMessage === true && typeof this.state.errMessage === 'string' ) {
                    let issues = this.state.errMessage.split('--');
                    let issueElements = issues.map( ( issue: any, idx : number ) => {
                        return <li key={idx}>{ issue } </li>;
                    });
                    errMessage = this.state.errMessage === '' ? null : <div>
                    <h2>{escape(`Detected potential performance issues... :(`)}</h2>
                    { issueElements }
                    </div>;
                }


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
                <div className={[styles.searchContainer, styles.padLeft20, styles.padTop20, styles.padBot10 ].join(' ')} >
                    <SearchBox
                    className={styles.searchBox}
                    styles={{ root: { maxWidth: this.props.allowRailsOff === true ? 200 : 300 } }}
                    placeholder="Search"
                    onSearch={ this._searchForText.bind(this) }
                    onFocus={ null } // () => console.log('this.state',  this.state)
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

                    let drillPivots0 = this._createPivotObject(this.state.searchMeta[0], '', 0);
                    let drillPivots1 = showRefiner1 ? this._createPivotObject(this.state.searchMeta[1], '', 1) : null;
                    let drillPivots2 = showRefiner2 ?  this._createPivotObject(this.state.searchMeta[2], '', 2) : null;

                    if ( showRefiner0 ) { refinersObjects.push( drillPivots0 ) ; }
                    if ( showRefiner1 ) { refinersObjects.push( drillPivots1 ) ; }
                    if ( showRefiner2 ) { refinersObjects.push( drillPivots2 ) ; }

                } else if ( this.state.style === 'commandBar' ) {

                    let pinCmd1 = createIconButton('Pin','Pin ' + this.state.refiners[1] + ' to top, Alt-Click to move DOWNOne level.',this._changeRefinerOrder1.bind(this), null, null );
                    let pinCmd2 = createIconButton('Pin','Pin ' + this.state.refiners[2] + ' to top, Alt-Click to move UP One level.',this._changeRefinerOrder2.bind(this), null, null );
                    let pinSpanStyle = { paddingLeft: '8px', height: '0px' } ;

                    thisIsRefiner0 = showRefiner0 ? <div><ResizeGroupOverflowSetExample
                        items={ this.state.cmdCats[0] }
                        cachingEnabled = { true }
                        checkedItem = { this.state.searchMeta[0] }
                        onClick = { this._onSearchForMetaCmd0.bind(this) }
                        showRefinerCounts = { this.state.showRefinerCounts }
                        regroupKey = { this.state.cmdCats.length === 0 ? 'showRefiner0' : this.state.cmdCats[0].map( i => { return i.name;  }).join('|||') }
                    /></div> : null;

                    thisIsRefiner1 = showRefiner1 ?  <div style={{ display: 'inline-block', width: '100%' }}><div style={ pinSpanStyle }>{pinCmd1}</div><div style={{ marginLeft: '40px', left: '0px'}}><ResizeGroupOverflowSetExample
                        items={ this.state.cmdCats[1] }
                        cachingEnabled = { true }
                        checkedItem = { this.state.searchMeta[1] }
                        onClick = { this._onSearchForMetaCmd1.bind(this)}
                        showRefinerCounts = { this.state.showRefinerCounts }
                        regroupKey = { this.state.cmdCats.length === 0 ? 'showRefiner1' : this.state.cmdCats[1].map( i => { return i.name;  }).join('|||') }
                    /></div></div> : null;

                    thisIsRefiner2 = showRefiner2 ?  <div style={{ display: 'inline-block', width: '100%' }}><div style={ pinSpanStyle }>{pinCmd2}</div><div style={{ marginLeft: '40px', left: '0px'}}><ResizeGroupOverflowSetExample
                        items={ this.state.cmdCats[2] }
                        cachingEnabled = { true }
                        checkedItem = { this.state.searchMeta[2] }
                        onClick = { this._onSearchForMetaCmd2.bind(this)}
                        showRefinerCounts = { this.state.showRefinerCounts }
                        regroupKey = { this.state.cmdCats.length === 0 ? 'showRefiner2' : this.state.cmdCats[2].map( i => { return i.name;  }).join('|||') }
                    /></div></div> : null;

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

                    // let blueBar = this.state.searchMeta.map( m => { return <span><span style={{ paddingLeft: 0 }}> {'>'} </span><span style={{ paddingLeft: 10, paddingRight: 20 }}> { m } </span></span>; });


                    // let drillItems = this.state.searchedItems.length === 0 ? <div>NO ITEMS FOUND</div> : <div>
                    //     <MyDrillItems 
                    //         items={ this.state.searchedItems }
                    //         blueBar={ blueBar }
                    //     ></MyDrillItems>
                    //     </div>;

                    let includeDetails = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'includeDetails' );
                    let includeAttach = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'includeAttach' );
                    let includeListLink = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'includeListLink' );
                    let createItemLink = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'createItemLink' );
                    
                    if ( this.state.drillList.hasAttach !== true ) { includeAttach = false; }
                    let currentViewFields: any[] = [];

                    if ( viewDefs.length > 0 )  { currentViewFields = getAppropriateViewFields( viewDefs, this.state.WebpartWidth ); }

                    let currentViewGroups : IGrouping[] =  getAppropriateViewGroups( viewDefs , this.state.WebpartWidth );

                    let instructionBlock  = null;
                    let reactListItems  = null;

                    if ( this.props.toggles.togOtherListview === false ) {

                        let showListItems = true;

                        //This loop just checks props vs items to see if the instructions or items list should show.
                        if ( this.state && this.state.whenToShowItems > 0 ) {
                            if ( this.state.searchedItems.length > this.props.showItems.minItemsForHide ) {
                                //Here we see if the refiner level clicked matches the whenToShowItems... if not, then show instructions
                                if ( this.state.whenToShowItems > this.state.searchMeta.length || this.state.searchMeta [ this.state.whenToShowItems -1 ] === 'All' ) {
                                    showListItems = false;
                                }
                            }
                        }

                        let instructions = [];
                        if ( this.state.drillList.refinerInstructions[0].length > 0 && this.props.refiners.length > 0 ) { //Updated to solve #95
                            instructions.push( this._createInstructionRow(0));
                        } 
                        if ( this.state.drillList.refinerInstructions[1].length > 0 && this.props.refiners.length > 1 ) { //Updated to solve #95
                            instructions.push( this._createInstructionRow(1));
                        } 
                        if ( this.state.drillList.refinerInstructions[2].length > 0 && this.props.refiners.length > 2 ) { //Updated to solve #95
                            instructions.push( this._createInstructionRow(2));
                        } 
                        let instructionContent = <div className={ [stylesD.instructions, null ].join(' ') }>
                            <div className={ stylesD.instHeading } style={{ }}>{ this.props.showItems.instructionIntro } { this._buildInstructionIcons() }</div>
                            <ul style={{ listStyleType: 'decimal' }}>
                                { instructions }
                            </ul>
                        </div>;

                        if ( showListItems === false || this.state.instructionsHidden === 'force' ) {
                            instructionBlock = instructionContent;

                        } else {
                            instructionBlock = null;
                            reactListItems  = this.state.searchedItems.length === 0 ? <div>NO ITEMS FOUND</div> : 
                            <ReactListItems 
                                parentListFieldTitles={ viewDefs.length > 0 ? null : this.props.parentListFieldTitles }
    
                                webURL = { this.state.drillList.webURL }
                                parentListURL = { this.state.drillList.parentListURL }
                                listName = { this.state.drillList.name }
                                isLibrary = { this.state.drillList.isLibrary }
    
                                contextUserInfo = { this.state.drillList.contextUserInfo }
                                sourceUserInfo = { this.state.drillList.sourceUserInfo }
    
                                viewFields={ currentViewFields }
                                groupByFields={ currentViewGroups }
                                items={ this.state.searchedItems }
                                itemsPerPage={ this.props.performance.itemsPerPage }
                                includeDetails= { includeDetails }
                                includeAttach= { includeAttach }
                                includeListLink = { includeListLink }
                                createItemLink = { createItemLink }
                                quickCommands={ this.state.quickCommands }
                            
                            />;
                        }
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

                    let countCharts : any[] = [];
                    let statCharts = [];
                    let statRefinerObject = null;
                    let buildStats = this.state.drillList.refinerStats && this.state.drillList.refinerStats.length > 0 ? true : false;
                    let buildCount = this.state.showCountChart;

                    let statsVisible = this.props.toggles.togOtherChartpart === true || this.props.toggles.togStats === true ? true : false;
                    let textMaxRefinersToShow = 0;
                    let childIndex0 = null;
                    let childIndex1 = null;

                    if ( buildStats ) {  statRefinerObject = this.state.refinerObj; }

                    consoleRef( 'rederObjects1', this.state.refinerObj );
                    if ( this.state.maxRefinersToShow > 1 && this.state.searchMeta[0] !== 'All' ) { 
                        textMaxRefinersToShow = 1;
                        childIndex0 = this.state.refinerObj.childrenKeys.indexOf(this.state.searchMeta[0]);
                        if ( buildStats ) {  statRefinerObject = this.state.refinerObj.childrenObjs[childIndex0]; }
                        consoleRef( 'rederObjects2', this.state.refinerObj );
                    }
                    if ( textMaxRefinersToShow >= 1 && this.state.maxRefinersToShow > 2 && this.state.searchMeta.length > 1 && this.state.searchMeta[1] !== 'All' ) { 
                        textMaxRefinersToShow = 2;
                        childIndex1 = this.state.refinerObj.childrenObjs[childIndex0].childrenKeys.indexOf(this.state.searchMeta[1]);
                        if ( buildStats ) {  statRefinerObject = this.state.refinerObj.childrenObjs[childIndex0].childrenObjs[childIndex1]; }
                        consoleRef( 'rederObjects3', this.state.refinerObj );
                    }

                    if ( this.state.showCountChart === true || statsVisible === true ) {
                        if ( buildCount ) { countCharts.push( this._buildCountCharts( this.state.refiners[0], 'refiner0' , this.state.refinerObj, RefinerChartTypes ) ); }
                        if ( textMaxRefinersToShow >= 1 ) {
                            if ( buildCount ) {  countCharts.push( this._buildCountCharts( this.state.refiners[1], 'refiner1' , this.state.refinerObj.childrenObjs[childIndex0], RefinerChartTypes ) ); }
                            if ( textMaxRefinersToShow >= 2 ) {
                                if ( buildCount ) {  countCharts.push( this._buildCountCharts( this.state.refiners[2], 'refiner2' , this.state.refinerObj.childrenObjs[childIndex0].childrenObjs[childIndex1],  RefinerChartTypes ) ); }
                            }
                        }

                        if ( countCharts.length === 0 ) { countCharts = null ; }
                        if ( buildStats && statsVisible === true && statRefinerObject && statRefinerObject.childrenKeys.length > 0  ) {
                            let statChartArray = buildStatChartsArray( this.state.drillList.refinerStats, 'summaries', statRefinerObject );
                            statCharts = this._buildStatCharts( statChartArray );

                        } else {

                        }

                    }
                    if ( statRefinerObject && statRefinerObject.childrenKeys.length > 0  ) {
                        //Update Dynamic Data cssChartData  cssChartProps : ICssChartProps
                        if ( this.props.handleSwitch ) {
                            this.props.handleSwitch ( this.state.drillList.refinerStats, 'summaries', statRefinerObject, this.state.searchMeta ) ; //resultSummaryArray  ); //: //  { chartData : ICSSChartSeries[], callBackID: string }[]  
                        }
                    } else {
                        //Update Dynamic Data cssChartData
                        if ( this.props.handleSwitch ) {
                            this.props.handleSwitch ( null, null, null ); //: ICssChartProps
                        }
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


                    let toggles = <div style={{ float: 'right' }}> { makeToggles(this._getPageToggles( statCharts.length > 0 ? true : false )) } </div>;

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
                    thisPage = <div>
                         {/* <div style={{ width: 50, height: 50, background: this.props.themeVariant.palette.themePrimary }}></div> */}
                        { Banner }
                        <div className={styles.contents}>
                            <div className={stylesD.drillDown}>
                                {  /* <div className={styles.floatRight}>{ toggleTipsButton }</div> */ }
                                <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ errMessage } </div>
                                {  /* <p><mark>Check why picking Assists does not show Help as a chapter even though it's the only chapter...</mark></p> */ }
                                <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                                    { searchBox } { toggles } 
                                </Stack>

                                <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens} className={ stylesD.refiners }>{/* Stack for Buttons and Webs */}
                                    { refinersObjects  }
                                </Stack>

                                { drillListErrors }
                                { instructionBlock }

                                <div> { this.state.showCountChart === true ? countCharts : null } </div>
                                <div> { this.state.showStats === true ? statCharts : null } </div>

                                <div>

                                    <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>
                                    { bannerMessage }

                                    <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                                        {/* { this.state.viewType === 'React' ? reactListItems : drillItems } */}

                                        { reactListItems }
                                        {   }
                                    </Stack>
                                </div> { /* Close tag from above noInfo */}
                            </div>
                        </div>
                    </div>;

                    if ( this.state.allItems.length === 0 ) {
                        thisPage = <div style={{ paddingBottom: 30 }}className={styles.contents}>
                        { errMessage }
                        { drillListErrors }
                        </div>;
                    }
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

    private _getAllItemsCall( viewDefs: ICustViewDef[], refiners: string[] ) {

        //Start tracking performance
        this._performance.fetch1 = startPerformOp( 'fetch1 data', this.props.displayMode );

        /**
         * This is copied from constructor when you have to call the data in case something changed.
         */

        let drillList = this._createDrillList(this.props.webURL, this.props.listName, this.props.isLibrary, refiners, this.state.rules, this.props.stats, viewDefs, this.props.toggles.togOtherChartpart, '', false, this.props.language, 'getAllItemsCall', this.state.drillList.itteration );
        let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.state.rules : '';
        if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; } 

        let result : any = getAllItems( drillList, this._addTheseItemsToState.bind(this), this._setProgress.bind(this), null,  this._updatePerformance.bind( this ), this.props.quickCommands ? this.props.quickCommands.quickCommandsRequireUser : false );

    }

    private _addTheseItemsToState( drillList: IDrillList, allItems: IDrillItemInfo[] , errMessage : string, refinerObj: IRefinerLayer ) {

        this._performance.analyze2 = startPerformOp( 'analyze2 addItems', this.props.displayMode );

        consoleRef( 'addTheseItems1REF', refinerObj );
        consoleMe( 'addTheseItems1' , allItems, drillList );
        //let newFilteredItems : IDrillItemInfo[] = this.getNewFilteredItems( '', this.state.searchMeta, allItems, 0 );
        let pivotCats : any = [];
        let cmdCats : any = [];
        pivotCats.push ( refinerObj.childrenKeys.map( r => { return this._createThisPivotCat(r,'',0); }));
        let countTree: number[] = refinerObj.childrenObjs.map( o => { return o.itemCount; }) ;

        cmdCats.push ( this._convertRefinersToCMDs( ['All'],  refinerObj.childrenKeys, countTree, 0 , 0, refinerObj) );

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

        /**
         * 2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  
         * After deeper testing, adding this to getBestFitView solved it but that was getting called a lot so I'm just doing it once in the render
         */
        let viewDefs: ICustViewDef[] = JSON.parse(JSON.stringify(this.props.viewDefs));

        if ( this.props.toggles.togOtherListview === true ) {

            //2022-03-22:  This will update the listViewDD for other parts if it's turned on in main webpart props.
            let listViewDD : IListViewDDDrillDown = {

                parentListFieldTitles: this.props.viewDefs.length > 0 ? null : this.props.parentListFieldTitles,
                togOtherListview: this.props.toggles.togOtherListview,
                webURL : drillList.webURL,
                parentListURL : drillList.parentListURL,
                listName : drillList.name,
        
                viewDefs: viewDefs,
                viewFields: null, // This is derived from viewDefs
                groupByFields: null, // This is derived from viewDefs
        
                contextUserInfo: drillList.contextUserInfo,  //For site you are on ( aka current page context )
                sourceUserInfo: drillList.sourceUserInfo,   //For site where the list is stored

                quickCommands: this.state.quickCommands,
        
                items : allItems,
                breadCrumb: [pivCats.all.title],

            };

            if ( this.props.handleListPost ) { this.props.handleListPost( listViewDD ); }

        } else {

            //2022-03-22:  This will just clear the listViewDD for other parts if it's turned off in main webpart props.
            let listViewDD : IListViewDDDrillDown = {

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

            if ( this.props.handleListPost ) { this.props.handleListPost( listViewDD ); }

        }
        consoleRef( 'addTheseItems2REF', refinerObj );
        consoleMe( 'addTheseItems2' , allItems, drillList );

        console.log('addTheseItemsToState: props',this.props );
        console.log('addTheseItemsToState: refinerObj',refinerObj );
        console.log('addTheseItemsToState: drillList',drillList );
        console.log('addTheseItemsToState: refinerStats', drillList.refinerStats );

        //End tracking performance
        this._performance.analyze2 = updatePerformanceEnd( this._performance.analyze2, true, allItems.length );

        const analyticsWasExecuted: boolean = saveViewAnalytics( 'Drilldown Webpart', 'addItems', this.props, this.state.analyticsWasExecuted, this._performance );

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
            instructionsHidden: 'dynamic',
            analyticsWasExecuted: true,
        });



        //This is required so that the old list items are removed and it's re-rendered.
        //If you do not re-run it, the old list items will remain and new results get added to the list.
        //However the list will show correctly if you click on a pivot.
        //this._searchForItems( '', this.state.searchMeta, 0, 'meta' );
        return true;
    }

    private _createThisPivotCat ( title: string, desc: any, order: number ) {

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
    private _findMatchtingElementTextOriginal(arr: string[], item: any ) {

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

    private _findCountOfAriaLabel( item: any ) {
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

    private _findMatchtingElementText( item: any ) {

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

    public _getValidCountFromClickItem( item: any, validText: string) {
        if ( this.state.showRefinerCounts === true ) {
            let countOf = this._findCountOfAriaLabel( item );
            validText = validText.replace(' ('+countOf+')','');
        }
        return validText;
    }
    public _searchForText = (item: any): void => {
        //This sends back the correct pivot category which matches the category on the tile.
        let searchString = item && item.target && item.target.value ? item.target.value : '';
        this._searchForItems( searchString, this.state.searchMeta, 0, 'text' );
    }

    //This function works great for Pivots, not neccessarily anything with icons.
    public _onSearchForMetaPivot0 = (item: any): void => {
        //This sends back the correct pivot category which matches the category on the tile.
        let validText = item.props.itemKey;
        this._searchForItems( this.state.searchText, [validText], 0, 'meta' );
    }


    private _getClickInfo ( e: MouseEvent , item: any ) : IClickInfo {

        //This sends back the correct pivot category which matches the category on the tile.
        let validText = this._findMatchtingElementText( item );
        this._consoleClick( 'getClickInfo1 - validText' , validText );
        validText = this._getValidCountFromClickItem( item, validText );
        this._consoleClick( 'getClickInfo2 - validText' , validText );
        let clickInfo: IClickInfo = {
            isAltClick : e.altKey,
            isShfitClick : e.shiftKey,
            isCtrlClick : e.ctrlKey,
            validText : validText,
        };
        this._consoleClick( 'getClickInfo - clickInfo' , clickInfo );
        return clickInfo;

    }
    //This function works great for Pivots, not neccessarily anything with icons.
    public _onSearchForMetaCmd0 = (item: any): void => {
        let e: any = event;
        let clickInfo: IClickInfo = this._getClickInfo( e, item );
        if ( clickInfo.isAltClick === '!Value' ) {
            this._changeRefinerOrder('refiner0', clickInfo.validText ) ;
        } else {
            this._searchForItems( this.state.searchText, [clickInfo.validText], 0, 'meta' );
        }
    }

    public _onSearchForMetaPivot1= (item: any): void => {
        this._onSearchForMeta1(item.props.itemKey);
    }

    public _onSearchForMetaCmd1= (item: any): void => {
        let e: any = event;
        let clickInfo: IClickInfo = this._getClickInfo( e, item );
        if ( clickInfo.isAltClick === '!Value' ) {
            this._changeRefinerOrder('refiner1', clickInfo.validText ) ;
        } else {
            this._onSearchForMeta1(clickInfo.validText);
        }
    }

    public _onSearchForMeta1 (validText: string) {
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

        this._searchForItems( this.state.searchText, newMeta, 1, 'meta' );
      }

    public _onSearchForMetaPivot2= (item: any): void => {
        this._onSearchForMeta2(item.props.itemKey);
    }

    public _onSearchForMetaCmd2= (item: any): void => {
        let e: any = event;
        let clickInfo = this._getClickInfo( e, item );
        if ( clickInfo.isAltClick === '!Value' ) {
            this._changeRefinerOrder('refiner2', clickInfo.validText ) ;
        } else {
            this._onSearchForMeta2(clickInfo.validText);
        }
    }

  public _onSearchForMeta2 = (validText: string): void => {
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

    this._searchForItems( this.state.searchText, newMeta, 2, 'meta' );
  }

    private _changeRefinerOrder1() { 
        let e: any = event;
        let clickInfo: IClickInfo = this._getClickInfo( e, null );
        this._changeRefinerOrder( 'refiner1', clickInfo );
    }

    private _changeRefinerOrder2() {
        let e: any = event;
        let clickInfo: IClickInfo = this._getClickInfo( e, null );
        this._changeRefinerOrder( 'refiner2', clickInfo );  
    }

  private _changeRefinerOrder( newLeadRefiner: string, clickInfo: any ) {

    let refiners: string[] = [];
    let refinersOrig: string[] = JSON.parse(JSON.stringify( this.state.refiners ));
    let refinerRulesNew: IRefinerRules[][] = [];
    let refinerRulesOrig: IRefinerRules[][] = JSON.parse(JSON.stringify( this.state.drillList.refinerRules ));

    let newOrder: number[] = [];
    if ( newLeadRefiner === 'refiner0' ) {
        newOrder = clickInfo.isAltClick !== true ? [0,1,2] : [1,0,2];
        
    } else if ( newLeadRefiner === 'refiner1' ) {
        newOrder = clickInfo.isAltClick !== true ? [1,0,2] : [0,2,1];

    } else if ( newLeadRefiner === 'refiner2' ) {
        newOrder = clickInfo.isAltClick !== true ? [2,0,1] : [0,2,1];

    } else {
        alert ("I think there is a problem with changeRefinerOrder, " + newLeadRefiner + " was not expected." );

    }

    let stateRefinerInstructions: string[] = [];

    this._consoleClick( 'changeRefinerOrder - newOrder' , newOrder );
    
    newOrder.map( i => { 
        refiners.push( refinersOrig[i] );
        refinerRulesNew.push( refinerRulesOrig[i] );
        stateRefinerInstructions.push( `${this.state.drillList.refinerInstructions[i]}` ); // Put this in quotes to insure it is not a direct pointer to the current drillList instructions
    });

    this._consoleClick( 'changeRefinerOrder - refiners', refiners );

    /**
     * 2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  
     * After deeper testing, adding this to getBestFitView solved it but that was getting called a lot so I'm just doing it once in the render
     */ 
    let viewDefs: ICustViewDef[] = JSON.parse(JSON.stringify(this.props.viewDefs));

    let drillList = this._createDrillList(this.props.webURL, this.props.listName, this.props.isLibrary, refiners, JSON.stringify(refinerRulesNew), this.props.stats, viewDefs, this.props.toggles.togOtherChartpart, '', true, this.props.language, 'changeRefinerOrder', this.state.drillList.itteration  );

    drillList.refinerInstructions = stateRefinerInstructions;
    
    let errMessage = drillList.refinerRules === undefined ? 'Invalid Rule set: ' +  this.state.rules : '';
    if ( drillList.refinerRules === undefined ) { drillList.refinerRules = [[],[],[]] ; }

    processAllItems( this.state.allItems, errMessage, drillList, this._addTheseItemsToState.bind(this), this._setProgress.bind(this), null, );

  }

  private _updatePerformance( key: ILoadPerformanceOps, phase: 'start' | 'update', note: string = '', count: number ) {

    if ( phase === 'start' ) {
        this._performance[key] = startPerformOp( `${key} ${ note ? ' - ' + note : '' }`, this.props.displayMode );

    } else if ( phase === 'update' ) {
        this._performance[key] = updatePerformanceEnd( this._performance[key], true , count );

    }
  }

  private _getCurrentRefinerTree(newMeta: string[] ) {

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

    const result = {
        refinerTree: refinerTree,
        countTree: countTree,
        multiTree: multiTree,
    };

    return result;

  }

  public _searchForItems = (text: string, newMeta: string[] , layer: number, searchType: 'meta' | 'text' ): void => {

    consoleMe( 'searchForItems1: ' + text , this.state.allItems, this.state.drillList );
    let searchItems : IDrillItemInfo[] = this.state.allItems;
    let searchCount = searchItems.length;

    let newFilteredItems : IDrillItemInfo[] = this._getNewFilteredItems( text, newMeta, searchItems, layer );

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

        let refinerTreeObj = this._getCurrentRefinerTree( newMeta );
        let refinerTree = refinerTreeObj.refinerTree;
        let refinerCount = refinerTreeObj.countTree;
        let refinerMulit = refinerTreeObj.multiTree;
        let sendCount = refinerCount;

        pivotCats.push ( refinerTree[0].map( ( r: any ) => { return this._createThisPivotCat(r,'',0); })); // Recreate first layer of pivots
        cmdCats.push ( this._convertRefinersToCMDs( newMeta, refinerTree[0], sendCount[0], layer, 0, refinerObj ));

        if ( newMeta.length === 1 && newMeta[0] === 'All'){  //For some reason this was giving False when it should be true: if ( newMeta === ['All'] ) { }
            //Nothing is needed.
        } else if ( !metaChanged ) {
            //Need to remove previous layer
            pivotCats = this.state.pivotCats;
            cmdCats = this.state.cmdCats;

        } else { // Add new layer

            if ( refinerTree.length > 1 ) { 
                pivotCats.push ( refinerTree[1].map( ( r: any ) => { return this._createThisPivotCat(r,'',0); })); // Recreate first layer of pivots
                cmdCats.push ( this._convertRefinersToCMDs( newMeta, refinerTree[1], sendCount[1], layer, 1, refinerObj));
            }

            if ( refinerTree.length > 2 ) {
                pivotCats.push ( refinerTree[2].map( ( r: any ) => { return this._createThisPivotCat(r,'',0); })); // Recreate first layer of pivots
                cmdCats.push ( this._convertRefinersToCMDs( newMeta, refinerTree[2], sendCount[2], layer, 2, refinerObj));
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
        pivotCats.push ( refinerObj.childrenKeys.map( r => { return this._createThisPivotCat(r,'',0); }));
        let countTree: number[] = this.state.refinerObj.childrenObjs.map( o => { return o.itemCount; }) ;
        cmdCats.push ( this._convertRefinersToCMDs( ['All'],  refinerObj.childrenKeys, countTree, 0 , 0 , refinerObj) );
    }

    if ( this.props.toggles.togOtherListview === true ) {
        let listViewDD : IListViewDDDrillDown = {

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
    
        if ( this.props.handleListPost ) { this.props.handleListPost( listViewDD ); }
        searchCount = newFilteredItems.length;
    } else {
        let listViewDD : IListViewDDDrillDown = {

            parentListFieldTitles: null,
            webURL :null,
            parentListURL : null,
            listName : null,
            togOtherListview: this.props.toggles.togOtherListview,
    
            viewDefs: null,
            viewFields: null, // This is derived from viewDefs
            groupByFields: null, // This is derived from viewDefs
    
            contextUserInfo: this.state.drillList.contextUserInfo,  //For site you are on ( aka current page context )
            sourceUserInfo: this.state.drillList.sourceUserInfo,   //For site where the list is stored

            quickCommands: null,
    
            items : [],
            breadCrumb: null,
    
        };
    
        if ( this.props.handleListPost ) { this.props.handleListPost( listViewDD ); }
        searchCount = newFilteredItems.length;
    }

    consoleMe( 'searchForItems2: ' + text , this.state.allItems, this.state.drillList );
    consoleRef( 'searchForItems2: ' + text , refinerObj );
    this._consoleClick('searchForItems2: cmdCats', cmdCats );
    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      searchText: text.toLowerCase(),
      searchMeta: newMeta,
      pivotCats: pivotCats,
      cmdCats: cmdCats,
      refinerObj: refinerObj,
      instructionsHidden: 'dynamic',
    });


    return ;
    
  } //End searchForItems

    
  private _getNewFilteredItems(text: string, meta: string[] , searchItems : IDrillItemInfo[], layer: number ) {

    let newFilteredItems : IDrillItemInfo[] = [];

    for (let thisSearchItem of searchItems) {

        let showItem = false;
        let searchFails = 0;
        let searchString = thisSearchItem.searchString;

        if ( meta !== undefined && meta !== null && meta.length > 0 ) {
            for ( let m in meta ) {
                let itemMeta = thisSearchItem.refiners['lev' + m];
                let metaM = typeof meta[m] === 'string' ? meta[m] : JSON.stringify(meta[m]); //Only make this so it's easier to debug.
                if ( metaM == 'All' || metaM == '' || ( Array.isArray(itemMeta) && itemMeta.indexOf(metaM) > -1 ) ) {
                    if( searchString === '' || searchString.indexOf(text.toLowerCase()) > -1 ) {
                        showItem = true;
                    } else { showItem = false; searchFails ++; }
                } else { showItem = false; searchFails ++;}
            }
        }

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
   private _setProgress(progressHidden: boolean, page: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ){
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

    private _reloadOnUpdate( message: string, hasError: boolean ) : void {

        /**
         * 2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  
         * After deeper testing, adding this to getBestFitView solved it but that was getting called a lot so I'm just doing it once in the render
         */
        let viewDefs: ICustViewDef[] = JSON.parse(JSON.stringify(this.props.viewDefs));

        this.setState({
            bannerMessage: message,
        });

        consoleMe( '_reloadOnUpdate' , this.state.allItems, this.state.drillList );

        this._getAllItemsCall( viewDefs, this.state.refiners );

        let delay = hasError === true ? 10000 : this.state.quickCommands.successBanner;

        setTimeout(() => {
            this.setState({ bannerMessage: null });
        } , delay);

    }

    private _updateStateOnPropsChange(): void {
        /**
         * 2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  
         * After deeper testing, adding this to getBestFitView solved it but that was getting called a lot so I'm just doing it once in the render
         */
        let viewDefs: ICustViewDef[] = JSON.parse(JSON.stringify(this.props.viewDefs));
        this._getAllItemsCall( viewDefs, this.props.refiners );
    }

    /**
     * 
     * @param newMeta 
     * @param refiners 
     * @param layer  - this is the layer that was clicked on?
     * @param refLayer - this is the layer of this particular control
     */
    private _convertRefinersToCMDs( newMeta: string[], refiners: string[], thisCount: number[], layer: number, refLayer: number, refinerObj: IRefinerLayer ) {
        let result = [];

        //Get sum of array of numbers:  https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
        const arrSum = thisCount.reduce((a,b) => a + b, 0);

        result.push ({
            name: 'All',
            key: 'All',
            checked: 'All' === newMeta[layer] ? true : false ,
            icon: '',
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



    public _createPivotObject(setPivot: string, display: string, layer:number){

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
            {this._getRefinerPivots(layer)}
        </Pivot>;
        return pivotWeb;
      }

      private _getRefinerPivots(layer: number) {

        let thesePivots = [ ];
        if ( this.state.pivotCats.length === 0 ) {
            thesePivots = [this._buildFilterPivot( pivCats.all )];
        } else  {
            thesePivots = [this._buildFilterPivot( pivCats.all )];
            if ( layer <= this.state.pivotCats.length - 1 ) {
                thesePivots = thesePivots.concat(this.state.pivotCats[layer].map( pC => { return this._buildFilterPivot( pC ) ; }) ) ;
            }

        }

        return thesePivots;

      }

    private _buildFilterPivot(pivCat: IMyPivCat) {

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

    private _togglePropsHelp(){
        let newState = this.state.showPropsHelp === true ? false : true;
        this.setState( { showPropsHelp: newState });

    }
    private _hideInstructions(){
        let newState = this.state.whenToShowItems === 0 ? this.props.showItems.whenToShowItems : 0;
        this.setState( { whenToShowItems: newState, instructionsHidden: 'hide' });

    }

    private _forceInstructions(){
        let newState = this.state.whenToShowItems === 0 ? this.props.showItems.whenToShowItems : 0;
        this.setState( { whenToShowItems: newState, instructionsHidden: 'force' });

    }

    private _getPageToggles( showStats: boolean ) {

        let togRefinerCounts = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Refiner Counts</span>,
            key: 'togggleCount',
            _onChange: this._updateRefinerCount.bind(this),
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
            _onChange: this._updateTogggleCountChart.bind(this),
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
            _onChange: this._updateTogggleStats.bind(this),
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
            _onChange: this._updateTogggleRefinerStyle.bind(this),
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

    private _updateTogggleCountChart() {
        this.setState({
            showCountChart: !this.state.showCountChart,
          });
    }

    
    private _updateTogggleStats() {
        this.setState({
            showStats: !this.state.showStats,
          });
    }

    private _updateRefinerCount() {
        this.setState({
            showRefinerCounts: !this.state.showRefinerCounts,
          });
    }

    private _updateTogggleView() {

        let viewType : IViewType = 'MZ';
        if (this.state.viewType === 'MZ') { viewType = 'React'; }
        this.setState({
            viewType : viewType,
        });
    } //

    private _updateTogggleRefinerStyle() {

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

    public _toggleTips = (item: any): void => {
        //This sends back the correct pivot category which matches the category on the tile.
      
        this.setState({
          showTips: !this.state.showTips,
        });
      
      } //End toggleTips  

      
    private _consoleClick( location: string, info: any ) {

        return; //Not needed for now.

        let info2 = JSON.parse(JSON.stringify(info));

        console.log('Error#94: - Click', location, info2 );

    }
}