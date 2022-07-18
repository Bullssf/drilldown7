import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

import { Web, IList, IItem } from "@pnp/sp/presets/all";

import * as strings from 'Drilldown7WebPartStrings';
import DrillDown from './components/Drill/drillComponent';
import { IDrillDownProps, IWhenToShowItems } from './components/Drill/drillComponent';
import { consoleRef } from './components/Drill/drillFunctions';

import { PageContext } from '@microsoft/sp-page-context';

import { makeTheTimeObject } from '@mikezimm/npmfunctions/dist/Services/Time/timeObject';

import * as links from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

require('../../services/GrayPropPaneAccordions.css');

import { createStyleFromString, getReactCSSFromString, ICurleyBraceCheck } from '@mikezimm/npmfunctions/dist/Services/PropPane/StringToReactCSS';
import { IWebpartBannerProps, IWebpartBannerState } from './components/HelpPanel/banner/onNpm/bannerProps';

import { setPageFormatting } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSFormatFunctions';
import { IFPSPage } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSInterfaces';

import { minimizeQuickLaunch } from '@mikezimm/npmfunctions/dist/Services/DOM/quickLaunch';

//Checks
import { doesObjectExistInArrayInt, doesObjectExistInArray, compareArrays, getKeySummary, getKeyChanges
} from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';
import { getAllItems } from '../../services/propPane/PropPaneFunctions';

import { IMyProgress,  ICSSChartDD } from './components/IReUsableInterfaces';


import { IListViewDDDrillDown } from '@mikezimm/npmfunctions/dist/Views/IDrillViews';
import { ICustViewDef, } from '@mikezimm/npmfunctions/dist/Views/IListViews';

import { IQuickButton, IQuickCommands, IQuickField } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { IRefinerLayer, IRefiners, IItemRefiners, IRefinerStats, RefineRuleValues,
  IRefinerRules, IRefinerStatType, RefinerStatTypes, IRefinerStat } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

/**
 * DD Provider: Step 1 - import from sp-dynamic-data
 */
import { IDynamicDataCallables, IDynamicDataPropertyDefinition} from '@microsoft/sp-dynamic-data';

import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";

import { ICssChartProps } from '../cssChart/components/ICssChartProps';

require('../../services/propPane/GrayPropPaneAccordions.css');

export interface IDrilldown7WebPartProps {

  description: string;

  // 0 - Context
  pageContext: PageContext;


  // 1 - Analytics options
  useListAnalytics: boolean;
  analyticsWeb?: string;
  analyticsList?: string;
  stressMultiplier?: number;

  
    
  //General settings for Banner Options group
  // export interface IWebpartBannerProps {
    bannerTitle: string;
    bannerStyle: string;
    showBanner: boolean;
    
    showGoToHome: boolean;  //defaults to true
    showGoToParent: boolean;  //defaults to true

    bannerHoverEffect: boolean;
    showTricks: boolean;
  // }

  //General settings for FPS Options group
  searchShow: boolean;
  fpsPageStyle: string;
  fpsContainerMaxWidth: string;
  quickLaunchHide: boolean;
  showBannerGear: boolean;
  uniqueId: string;

  // 2 - Source and destination list information
  createVerifyLists: boolean;
  parentListTitle: string;
  parentListWeb: string;
  parentListURL?: string;
  hideFolders: boolean;
  language: string; //local language list data is saved in (needed to properly sort refiners)

  refiner0: string;
  refiner1: string;
  refiner2: string;

  rules0def: string;
  rules1def: string;
  rules2def: string;

  rules0: string[];
  rules1: string[];
  rules2: string[];

  togRefinerCounts: boolean;
  togCountChart: boolean;
  togStats: boolean;
  togOtherListview:  boolean;
  togOtherChartpart:  boolean;
  includeListLink: boolean;
  fetchCount: number;
  fetchCountMobile: number;
  restFilter: string;

  showCatCounts: boolean;
  showSummary: boolean;

  stats: string;

  newMap?: any[];

  showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data
  updateRefinersOnTextSearch?: boolean;

  parentListFieldTitles: string;

  onlyActiveParents: boolean;

  quickCommands?: string;

  // 3 - General how accurate do you want this to be

  // 4 - Info Options

  // 5 - UI Defaults

  viewWidth1: number;
  viewWidth2: number;
  viewWidth3: number;

  viewJSON1: string;
  viewJSON2: string;
  viewJSON3: string;

  includeDetails: boolean;
  includeAttach: boolean;

  groupByFields: string;

  // 6 - User Feedback:
  progress: IMyProgress;

  whenToShowItems: IWhenToShowItems;
  minItemsForHide: number;
  instructionIntro: string;
  refinerInstruction1: string;
  refinerInstruction2: string;
  refinerInstruction3: string;


  // 7 - TBD

  // 9 - Other web part options
  webPartScenario: string; //DEV, TEAM, CORP
  definitionToggle: boolean;
  listDefinition: any; //Picked list defintion :  Title

  advancedPivotStyles: boolean;
  pivotSize: string;
  pivotFormat: string;
  pivotOptions: string;
  pivotTab: string;

  /**
   * DD Provider: Step 0 - add this.properties.switches to WebPartProps
   */
  cssChartProps?: ICssChartProps;
  listProps?: any;
}

  /**
   * DD Provider: Step 2 - add impliments IDynamicDataCallables
   */
export default class Drilldown7WebPart extends BaseClientSideWebPart<IDrilldown7WebPartProps>  implements IDynamicDataCallables {

    /**
   * DD Provider: Step 6 - (9:51) add _selectedSwitch to be the placeholder for what was selected
   */
  private _selected_cssChartProps : ICSSChartDD;
  private _selected_listProps : any;

  private quickCommands : IQuickCommands = null;

  /**
   * 2020-09-08:  Add for dynamic data refiners.
   */
  private _selectedRefiner0Name: string;
  private _selectedRefiner0Value: string;
  private _filterBy: any;

  //For FPS options
  private fpsPageDone: boolean = false;
  private fpsPageArray: any[] = null;
  private minQuickLaunch: boolean = false;

  //For FPS Banner
  private forceBanner = true ;
  private modifyBannerTitle = true ;
  private modifyBannerStyle = true ;

/***
*          .d88b.  d8b   db d888888b d8b   db d888888b d888888b 
*         .8P  Y8. 888o  88   `88'   888o  88   `88'   `~~88~~' 
*         88    88 88V8o 88    88    88V8o 88    88       88    
*         88    88 88 V8o88    88    88 V8o88    88       88    
*         `8b  d8' 88  V888   .88.   88  V888   .88.      88    
*          `Y88P'  VP   V8P Y888888P VP   V8P Y888888P    YP    
*                                                               
*                                                               
*/

  //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
  // public onInit():Promise<void> {
  protected async onInit(): Promise<void> {
    
    await super.onInit();
    const sp = spfi().using(SPFx(this.context));

    // return super.onInit().then(_ => {
      
      /**
       * DD Provider: Step 3 - add / update OnInit
       *  Tell DD Service that this is a provider
       */
      this.context.dynamicDataSourceManager.initializeSource(this);

      if ( !this.properties.rules0 ) { 
        this.properties.rules0 = [] ; 
      }
      if ( !this.properties.rules1 ) { 
        this.properties.rules1 = [] ; 
      }
      if ( !this.properties.rules2 ) { 
        this.properties.rules2 = [] ; 
      }

      //Added for https://github.com/mikezimm/drilldown7/issues/95
      if ( this.properties.whenToShowItems === undefined || this.properties.whenToShowItems === null ) { this.properties.whenToShowItems = 2; }
      if ( this.properties.minItemsForHide === undefined || this.properties.minItemsForHide === null ) { this.properties.minItemsForHide = 30; }
      if ( !this.properties.instructionIntro ) { this.properties.instructionIntro = `Please click filters (above) to see items :)`; }
      if ( !this.properties.refinerInstruction1 ) { this.properties.refinerInstruction1 = `Select a {{refiner0}}`; }
      if ( !this.properties.refinerInstruction2 ) { this.properties.refinerInstruction2 = `Select a {{refiner1}}`; }
      if ( !this.properties.refinerInstruction3 ) { this.properties.refinerInstruction3 = `Select a {{refiner2}}`; }
      if ( !this.properties.language ) { this.properties.language = `en-us`; }

      this.getQuickCommandsObject( 'Group Quick Commands', this.properties.quickCommands);
      
      // other init code may be present

      let mess = 'onInit - ONINIT: ' + new Date().toLocaleTimeString();

      console.log(mess);

      //https://stackoverflow.com/questions/52010321/sharepoint-online-full-width-page
      if ( window.location.href &&  
        window.location.href.toLowerCase().indexOf("layouts/15/workbench.aspx") > 0 ) {
          
        if (document.getElementById("workbenchPageContent")) {
          document.getElementById("workbenchPageContent").style.maxWidth = "none";
        }
      } 

      this._getListDefintions(true, true);
      //console.log('window.location',window.location);

      // spfi().using(SPFx({pageContext: context.pageContext}));
      // const sp = spfi().using(SPFx(this.context));
      // sp.setup({
      //   spfxContext: this.context
      // });
    // });
  }


  /**
   * DD Provider: Step 4 - (8:25) add getPropertyDefinitions
   * This tells SPFx what properties I can publish
   */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition>{
    return [
      {
        id: 'cssChartProps',
        title: 'Summary Stats 1'
      },
      {
        id: 'listProps',
        title: 'List Items',
      },
      {
        id: 'refiner0Name',
        title: 'Field you are filtering on',
      },
      {
        id: 'refiner0Value',
        title: 'Value you are filtering on',
      },
      {
        id: 'filterBy',
        title: 'Filter by refiner component',
      }
    ];
  }

  /**
   * DD Provider: Step 5 - (8:43) add getPropertyValue
   * When something changes, SPFx needs to call the webpart and find out the updated property value
   *  This is defined on the interface
   * This takes in the name of the property that you want to return back.
   * string | any => any could be any interface if you want to use Interface
   */
  public getPropertyValue(propertyId: string): string | ICSSChartDD {
    switch(propertyId) {
      case 'refiner0Name': 
        return this._selectedRefiner0Name;
      case 'refiner0Value':
        return this._selectedRefiner0Value;
      case 'filterBy':
        return this._filterBy;
      case 'cssChartProps':
        return this._selected_cssChartProps;
      case 'listProps': 
        return this._selected_listProps;
    }
    throw new Error('Bad property ID');

  }

  public getUrlVars(): {} {
    var vars = {};
    vars = location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, pair) => {
      const [key, value] = pair.map(decodeURIComponent);
      return ({ ...obj, [key]: value }) ;
    }, {});
    return vars;
  }


  public getQuickCommandsObject( message: string, str: string ) {

    let result : IQuickCommands = undefined;
    
    if ( str === null || str === undefined ) { return result; }
    try {
      str = str.replace(/\\\"/g,'"').replace(/\\'"/g,"'"); //Replace any cases where I copied the hashed characters from JSON file directly.
      if ( str === '[]' || str === '' ) { str = '{}' ; }
      result = JSON.parse(str);
      if ( !result.buttons ) { result.buttons = []; }
      if ( !result.fields ) { result.fields = []; }
      if ( !result.onUpdateReload ) { result.onUpdateReload = true; }

      this.properties.quickCommands = JSON.stringify(result);
      this.quickCommands = result;

    } catch(e) {
      console.log(message + ' is not a valid JSON object.  Please fix it and re-run');

    }

  }

  /**
   * This will just add the same Group By fields to all the views.
   * @param message 
   * @param str 
   * @param grp 
   */
  public getViewFieldsObject(message: string, str: string, grp: string ) {

    let result : IViewField[] = undefined;
    
    if ( str === null || str === undefined ) { return result; }
    try {
      str = str.replace(/\\\"/g,'"').replace(/\\'"/g,"'"); //Replace any cases where I copied the hashed characters from JSON file directly.
      result = JSON.parse(str);

      //Solve this but in view fields:  https://github.com/mikezimm/drilldown7/issues/135
      result.map( field => {
        field.name = typeof field.name === 'string' ? field.name.replace(/\s/g,'') : field.name;
        field.linkPropertyName = typeof field.linkPropertyName === 'string' ? field.linkPropertyName.replace(/\s/g,'') : field.linkPropertyName;
      });

    } catch(e) {
      console.log(message + ' is not a valid JSON object.  Please fix it and re-run');

    }
    
    return result;
  }

  public getViewGroupFields(message: string,  grp: string ){
      let result: IGrouping[] = [];
      let propsGroups: string[];
      let groupByFieldsJSON : any = {};

      if ( grp === null || grp === undefined ) { return result; }
      try {
        grp = grp.replace(/\\\"/g,'"').replace(/\\'"/g,"'"); //Replace any cases where I copied the hashed characters from JSON file directly.
        groupByFieldsJSON = JSON.parse(grp);
  
      } catch(e) {
        console.log(message + ' is not a valid JSON object.  Please fix it and re-run');
  
      }

      if ( groupByFieldsJSON ) {
        //propsGroups = grp.indexOf(';') > -1 ? grp.split(';') : [grp];  //This was if I just made it comma separated names.  But I'm going to keep the JSON object so sorting can be included.
        //result = propsGroups.map ( g => {
          ///return { name: g, order: 1, };
        //});
        console.log('groupByFieldsJSON: ', groupByFieldsJSON );
      }
      
      return groupByFieldsJSON;
  }

  public render(): void {

    let errMessage = '';    
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

    let showTricks = false;
    links.trickyEmails.map( getsTricks => {
      if ( this.context.pageContext.user.loginName && this.context.pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { showTricks = true ; }   } ); 

    let bannerTitle = this.modifyBannerTitle === true && this.properties.bannerTitle && this.properties.bannerTitle.length > 0 ? this.properties.bannerTitle : `Drilldown`;
    let bannerStyle: ICurleyBraceCheck = getReactCSSFromString( 'bannerStyle', this.properties.bannerStyle, {background: "#7777",fontWeight:600, fontSize: 'larger', height: '43px'} );
    let showBannerGear = this.properties.showBannerGear === false ? false : true;
    
    let anyContext: any = this.context;
    console.log('_pageLayoutType:', anyContext._pageLayoutType );
    console.log('pageLayoutType:', anyContext.pageLayoutType );


    let bannerProps: IWebpartBannerProps = {
    
      pageContext: this.context.pageContext,
      panelTitle: `Drilldown webpart - ${this.properties.parentListTitle}`,
      bannerWidth : this.domElement.clientWidth,
      showBanner: this.forceBanner === true || this.properties.showBanner !== false ? true : false,
      showTricks: showTricks,
      showBannerGear: showBannerGear,
      showGoToHome: this.properties.showGoToHome === false ? false : true,
      showGoToParent: this.properties.showGoToParent === false ? false : true,
      // onHomePage: anyContext._pageLayoutType === 'Home' ? true : false,
      onHomePage: this.context.pageContext.legacyPageContext.isWebWelcomePage === true ? true : false,
      hoverEffect: this.properties.bannerHoverEffect === false ? false : true,
      title: bannerStyle.errMessage !== '' ? bannerStyle.errMessage : bannerTitle ,
      bannerReactCSS: bannerStyle.errMessage === '' ? bannerStyle.parsed : { background: "yellow", color: "red", },
      gitHubRepo: links.gitRepoDrillDownSmall,
      farElements: [],
      nearElements: [],
      earyAccess: false,
      wideToggle: true,

    };
    //close #129:  This makes the maxWidth added in fps options apply to banner as well.
    if ( this.properties.fpsContainerMaxWidth && this.properties.fpsContainerMaxWidth.length > 0 ) {
      bannerProps.bannerReactCSS.maxWidth = this.properties.fpsContainerMaxWidth;
    }


    //Used with FPS Options Functions
    this.setThisPageFormatting( this.properties.fpsPageStyle );
    this.setQuickLaunch( this.properties.quickLaunchHide );


    //Be sure to always pass down an actual URL if the webpart prop is empty at this point.
    //If it's undefined, null or '', get current page context value
    let parentWeb = this.properties.parentListWeb && this.properties.parentListWeb != '' ? this.properties.parentListWeb : this.context.pageContext.web.absoluteUrl;

    let refiners: string[] = [];

    if ( this.properties.refiner0 && this.properties.refiner0.length > 0 ) { refiners.push( this.properties.refiner0.replace(/\s/g,'') ) ;}
    if ( this.properties.refiner1 && this.properties.refiner1.length > 0 ) { refiners.push( this.properties.refiner1.replace(/\s/g,'') ) ;}
    if ( this.properties.refiner2 && this.properties.refiner2.length > 0 ) { refiners.push( this.properties.refiner2.replace(/\s/g,'') ) ;}

    //Added for https://github.com/mikezimm/drilldown7/issues/95
    let whenToShowItems: IWhenToShowItems = this.properties.whenToShowItems;
    if ( whenToShowItems > refiners.length ) { whenToShowItems = refiners.length as any ; }

    let rules1: RefineRuleValues[] = ['parseBySemiColons'];
    let rules2: RefineRuleValues[] = ['parseBySemiColons'];
    let rules3: RefineRuleValues[] = ['groupByMonthsMMM'];

    let rules = [];
    if ( this.properties.rules0 && this.properties.rules0.length > 0 ) { rules.push ( this.properties.rules0 ) ; } else { rules.push( ['']) ; }
    if ( this.properties.rules1 && this.properties.rules1.length > 0 ) { rules.push ( this.properties.rules1) ; } else { rules.push( ['']) ; }
    if ( this.properties.rules2 && this.properties.rules2.length > 0 ) { rules.push ( this.properties.rules2) ; } else { rules.push( ['']) ; }

    let viewDefs : ICustViewDef[] = [];
    let viewFields1 : IViewField[] = this.getViewFieldsObject('Full Size view', this.properties.viewJSON1, this.properties.groupByFields );
    let viewFields2 : IViewField[] = this.getViewFieldsObject('Med Size view', this.properties.viewJSON2, this.properties.groupByFields );
    let viewFields3 : IViewField[] = this.getViewFieldsObject('Small Size view', this.properties.viewJSON3, this.properties.groupByFields );

    if ( !viewFields1 ) { errMessage += 'viewFields1 has an error; '; viewFields1 = [] ; }
    if ( !viewFields2 ) { errMessage += 'viewFields2 has an error; '; viewFields2 = [] ; }
    if ( !viewFields3 ) { errMessage += 'viewFields3 has an error; '; viewFields3 = [] ; }

    if ( errMessage.indexOf('viewFields') > -1 ) { errMessage += 'Tip:  Extra commas after last object can cause this!'; }

    let groupByFields: IGrouping[] = this.getViewGroupFields( 'Group View Fields', this.properties.groupByFields);

    if ( !groupByFields ) { errMessage += 'groupByFields has an error; '; groupByFields = []; }

    let includeDetails = this.properties.includeDetails;
    let includeAttach = this.properties.includeAttach;
    let viewWidth1 = this.properties.viewWidth1;
    let viewWidth2 = this.properties.viewWidth2;
    let viewWidth3 = this.properties.viewWidth3;

    let includeListLink = this.properties.includeListLink;

    if (viewFields1 !== undefined ) { viewDefs.push( { minWidth: viewWidth1, viewFields: viewFields1, groupByFields: groupByFields, includeDetails: includeDetails, includeAttach: includeAttach, includeListLink: includeListLink }); }
    if (viewFields2 !== undefined ) { viewDefs.push( { minWidth: viewWidth2, viewFields: viewFields2, groupByFields: groupByFields, includeDetails: includeDetails, includeAttach: includeAttach, includeListLink: includeListLink }); }
    if (viewFields3 !== undefined ) { viewDefs.push( { minWidth: viewWidth3, viewFields: viewFields3, groupByFields: groupByFields, includeDetails: includeDetails, includeAttach: includeAttach, includeListLink: includeListLink }); }

    let stringRules: string = JSON.stringify( rules );

    //Just for test purposes
    //stringRules = JSON.stringify( [rules1,rules2,rules3] );

    let language = this.properties.language;
    try {
      language = language.toLowerCase();
    } catch( e ) {
      console.log('Unable to convert language to lower case.' );
    }

    const element: React.ReactElement<IDrillDownProps> = React.createElement(
      DrillDown,
      {
        description: 'this.properties.description',
        
        // 0 - Context
        pageContext: this.context.pageContext,
        wpContext: this.context,
        displayMode: this.displayMode,
        bannerProps: bannerProps,

        errMessage: errMessage,

        tenant: this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,""),
        urlVars: this.getUrlVars(),
        today: makeTheTimeObject(''),
        parentListFieldTitles: this.properties.parentListFieldTitles,

        //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
        WebpartElement: this.domElement,

        // 1 - Analytics options
        useListAnalytics: this.properties.useListAnalytics,
        analyticsWeb: strings.analyticsWeb,
        analyticsList: strings.analyticsList,
      
        toggles: {
            togRefinerCounts: this.properties.togRefinerCounts,
            togCountChart: this.properties.togCountChart,
            togStats: this.properties.togStats,
            togOtherListview:  this.properties.togOtherListview,
            togOtherChartpart: this.properties.togOtherChartpart,
        },
    
        performance: {
            fetchCount: this.properties.fetchCount,
            fetchCountMobile: this.properties.fetchCountMobile,
            restFilter: !this.properties.restFilter ? '' : this.properties.restFilter,
        },

        showItems: {
            //Modified for https://github.com/mikezimm/drilldown7/issues/95
            whenToShowItems: whenToShowItems,
            minItemsForHide: this.properties.minItemsForHide,
            instructionIntro: this.properties.instructionIntro,
            refinerInstructions: [ 
              this.properties.refinerInstruction1.replace(`{{refiner0}}`, this.properties.refiner0 ),
              this.properties.refinerInstruction2.replace(`{{refiner1}}`, this.properties.refiner1 ),
              this.properties.refinerInstruction3.replace(`{{refiner2}}`, this.properties.refiner2 ),
          ],

        },

        quickCommands: this.quickCommands,

        // 2 - Source and destination list information
        listName: this.properties.parentListTitle,
        webURL: parentWeb,
        parentListURL: this.properties.parentListURL,
        hideFolders: this.properties.hideFolders,
        language: language,

        refiners: refiners,
        showDisabled: this.properties.showDisabled,
        updateRefinersOnTextSearch: this.properties.updateRefinersOnTextSearch ? this.properties.updateRefinersOnTextSearch : false,

        rules: stringRules,
        stats: this.properties.stats,

        allLoaded: true,

        style: 'commandBar',
        viewDefs: viewDefs,

        // 3 - General how accurate do you want this to be

        // 4 - Info Options

        // 5 - UI Defaults

        // 6 - User Feedback:
        /*
        progress: {
          label: '',
          description: '',
          percentComplete: 0,
          progressHidden: true,
        },
        */
        progress: null,
        // 7 - TBD

        // 9 - Other web part options
        WebpartHeight: this.domElement.getBoundingClientRect().height ,
        WebpartWidth:  this.domElement.getBoundingClientRect().width - 50 ,
  
        pivotSize: this.properties.pivotSize,
        pivotFormat: this.properties.pivotFormat,
        pivotOptions: this.properties.pivotOptions,
        pivotTab: 'Projects', //this.properties.pivotTab (was setTab in pivot-tiles)
        
        onRefiner0Selected: this._handleRefiner0Selected,

        /**
         * DD Provider: Step 0 - add props to React Component to receive the switches and the handler.
         */
        handleSwitch: this.handleSwitch,  //Commented out due to something causing viewFields names to get messed up (removed the / for expanded columns )
        // handleSwitch: null,
        handleListPost: this.handleListPost,  //Commented out due to something causing viewFields names to get messed up (removed the / for expanded columns )
        // handleListPost: null,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * DD Provider: Step 7 - (10:45) add handleSwichSelected - handler for when things changed.
   * 1) Set value of selected Switch on the internal property
   * 2) Tell anybody who subscribed, that property changed
   */
  private handleSwitch = ( stats: IRefinerStat[], callBackID: string, refinerObj: IRefinerLayer, breadCrumb: string[] ) : void => {

    consoleRef( 'handleSwitch', refinerObj );
    let e = event;

    let cssChartProps : ICSSChartDD = {
      stats: stats,
      callBackID: callBackID,
      refinerObj: refinerObj,
      breadCrumb: breadCrumb,
    };

    this._selected_cssChartProps = cssChartProps;
    this.context.dynamicDataSourceManager.notifyPropertyChanged( 'cssChartProps' );

  }

    /**
   * DD Provider: Step 7 - (10:45) add handleSwichSelected - handler for when things changed.
   * 1) Set value of selected Switch on the internal property
   * 2) Tell anybody who subscribed, that property changed
   */
  private handleListPost = ( listProps : IListViewDDDrillDown ) : void => {
    consoleRef( 'handleListPost-No Object', null );
    console.log('this.props.viewDefs ~ 638 - handleListPost: callback listProps if any other webparts are listening', listProps );
    if ( this.properties.togOtherListview === true ) {
      let e = event;

      this._selected_listProps = listProps;
      this.context.dynamicDataSourceManager.notifyPropertyChanged( 'listProps' );
    }
  }


  /**
   * 2020-09-08:  Add for dynamic data refiners.   private handleFieldSelected:
   * @param field 
   */
  private _handleRefiner0Selected = ( field: string, value: any ) : void => {
    console.log( '_handleRefiner0Selected:', field, value );
    this._selectedRefiner0Name = field;
    this._selectedRefiner0Value = value;
    this._filterBy = {
      field: field,
      value: value,
    };

    console.log('Main Webpart: Refiners updated: ', field, value);
    this.context.dynamicDataSourceManager.notifyPropertyChanged('refiner0Name');
    this.context.dynamicDataSourceManager.notifyPropertyChanged('refiner0Value');
    this.context.dynamicDataSourceManager.notifyPropertyChanged('filterBy');

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  /**
   * Used with FPS Options Functions
   * @param quickLaunchHide 
   */
  private setQuickLaunch( quickLaunchHide: boolean ) {

    if ( quickLaunchHide === true && this.minQuickLaunch === false ) {
      minimizeQuickLaunch( document , quickLaunchHide );
      this.minQuickLaunch = true;
    }

  }

  /**
   * Used with FPS Options Functions
   * @param fpsPageStyle 
   */
  private setThisPageFormatting( fpsPageStyle: string ) {
    let fpsPage: IFPSPage = {
      // Done: this.fpsPageDone, // 2022-03-28: Errored out in npmFunctions v1.0.199, removing for now

      // VVVV JUST SET THESE BY HAND TO MAKE ERRORS GO AWAY.  NEEDS UPDATING
      attempted: false,
      title: 'setThisPageFormatting',
      wpInstanceID: 'wpInstanceID',
      do: true,
      errors: null,
      success: null,
      // ^^^^ JUST SET THESE BY HAND TO MAKE ERRORS GO AWAY.  NEEDS UPDATING


      Style: fpsPageStyle,
      Array: this.fpsPageArray,
    };

    fpsPage = setPageFormatting( this.domElement, fpsPage );
    this.fpsPageArray = fpsPage.Array;
    // this.fpsPageDone = fpsPage.Done;  // 2022-03-28: Errored out in npmFunctions v1.0.199, removing for now
  }

  private async UpdateTitles(): Promise<boolean> {
    const sp = spfi().using(SPFx(this.context));
    let listName = this.properties.parentListTitle ? this.properties.parentListTitle : 'ParentListTitle';
    const list = sp.web.lists.getByTitle(listName);
    const r = await list.fields();

    //2020-05-13:  Remove Active since it's replaced with StatusTMT which is not applicable here
    let defFields = ["Title","Author","Editor","Created","Modified"];
    let filterFields=[]; //["SSChoice1","SSChoiceA","MSChoice2","MSChoiceB"];
    if ( this.properties.refiner0 != '' ) { filterFields.push( this.properties.refiner0 ); }
    if ( this.properties.refiner1 != '' ) { filterFields.push( this.properties.refiner1 ); }
    if ( this.properties.refiner2 != '' ) { filterFields.push( this.properties.refiner2 ); }

    let allFields = defFields.concat(filterFields);

    let fieldTitles = r.filter(f => f.Hidden !== true && allFields.indexOf(f.StaticName) > -1).map( 
      f => {return [f.StaticName,f.Title,f.Description,f.Required,f.FieldTypeKind];});
    
    //Update properties here:
    this.properties.parentListFieldTitles = JSON.stringify(fieldTitles);

    console.log('list fields: ', r);
    console.log('fieldTitles: ', fieldTitles);
    
    return true;

  } 


  /***
  *         d8888b. d8888b.  .d88b.  d8888b.      d8888b.  .d8b.  d8b   db d88888b 
  *         88  `8D 88  `8D .8P  Y8. 88  `8D      88  `8D d8' `8b 888o  88 88'     
  *         88oodD' 88oobY' 88    88 88oodD'      88oodD' 88ooo88 88V8o 88 88ooooo 
  *         88~~~   88`8b   88    88 88~~~        88~~~   88~~~88 88 V8o88 88~~~~~ 
  *         88      88 `88. `8b  d8' 88           88      88   88 88  V888 88.     
  *         88      88   YD  `Y88P'  88           88      YP   YP VP   V8P Y88888P 
  *                                                                                
  *                                                                                
  */


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return propertyPaneBuilder.getPropertyPaneConfiguration(
      this.properties,
      this.UpdateTitles.bind(this),
      this._getListDefintions.bind(this),
      this.forceBanner, this.modifyBannerTitle, this.modifyBannerStyle
      );
  }

  //Promise<IDrillItemInfo[]>
  //was originally:  
  //protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

  //runAsync is an idea that is not currently being used.
  protected async _getListDefintions(forceUpdate: boolean, runAsync: boolean) {
    /**
     * This section is for Templated properties
     */

    let newMap = [];
    if ( !this.properties.newMap || forceUpdate === true ) { 
      console.log('GETTING LIST DEFINITIONS');
      let configWebURL = this.context.pageContext.site.absoluteUrl;
      configWebURL = configWebURL.substring( 0, configWebURL.indexOf('/sites/') );
      configWebURL += '/sites/PreConfigProps/';

      let thisProps: string[] = Object.keys( this.properties );

      let restFilterLD = '';

      if ( this.properties.webPartScenario !== '' && this.properties.webPartScenario != null ) {
        //newMap = getAllItems(configWebURL, 'DrilldownPreConfigProps', thisProps );
        restFilterLD = "webPartScenario eq '" + this.properties.webPartScenario + "'";
        // console.log('_getListDefintions restFilterLD:', restFilterLD );
      }

      //Must remove 'newMap' from props because it's one can't be mapped.
      //let newMapIdx = thisProps.indexOf('newMap');
      //if (newMapIdx > -1) { thisProps.splice(newMapIdx, 1); }

      //if ( runAsync === true ) {
        newMap = await getAllItems(configWebURL, 'DrilldownPreConfigProps', thisProps, restFilterLD, runAsync );
      //} else {
      //  newMap = getAllItems(configWebURL, 'DrilldownPreConfigProps', thisProps, runAsync );
      //}

      this.properties.newMap = newMap;
      // console.log('this.properties.newMap:',  this.properties.newMap );

    } else {
      console.log('NOT GETTING LIST DEFINITIONS, already fetched:', this.properties.newMap);
      newMap = this.properties.newMap;

    }
    
    return newMap;
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {

//    console.log('PropFieldChange:', propertyPath, oldValue, newValue);
    if (propertyPath === 'listDefinition' && newValue !== oldValue) {
      //alert("Hey! " +propertyPath +" new value is " + newValue);
      //this.properties.listTitle = "TitleChanged!";
      //this.properties.colTitleText = "TitleTextChanged!";

      let thisProps: string[] = Object.keys( this.properties );
      const hasValues = Object.keys(this.properties.newMap).length;
//      console.log('listDefinition Old & New: ', oldValue, newValue );
//      console.log('PropFieldChange keys: ', hasValues );

      if (hasValues !== 0) {
        /**
         * defIndex is the propertie's list item index that was found for this listDefinition.
         */
        let defIndex : any = doesObjectExistInArray(this.properties.newMap,'Title',newValue);
        if ( defIndex !== false ) {

          /**
           * thisProps is an array of of the keys of this webpart's 'properties' keys (properties)
           */
          thisProps.map( thisWebPartProp => {

            /**
             * Add columns here that are in the PreConfigProps list that should be ignored and are not an actual mapped property.
             * webPartScenario is an example which is a list column but is used to filter out what list items to load.
             */
            let ignoreTheseColumns = ['webPartScenario']; 

            if ( ignoreTheseColumns.indexOf( thisWebPartProp) > -1 ) {  
              console.log('not mapping this property: ', thisWebPartProp );

            } else if ( thisWebPartProp === 'listDefinition' ) { 
                console.log('thisWebPartProp === listDefinition:', defIndex, thisWebPartProp);
                this.properties[thisWebPartProp] = newValue;

            } else {

              /**
               * this.properties.newMap is the property defs loaded from the tenanat list.
               */
              if ( Object.keys(this.properties.newMap[defIndex]).indexOf(thisWebPartProp) < 0 ) {
                console.log('This thisWebPartProp is not to be mapped or updated:', thisWebPartProp );
              } else {

                /**
                 * At this point, we should only find current this.properties.keys( thisWebPartProp ) found in the newMap list as a column.
                 * 
                 * potentialValue is the value found in the list that should be set for this webpart prop.  Currently all are rich text fields.
                 */

                let potentialValue = this.properties.newMap[defIndex][thisWebPartProp] ? this.properties.newMap[defIndex][thisWebPartProp] : undefined;

                if ( potentialValue ) { //If value exists, continue

                  potentialValue = potentialValue.replace('\"','"'); //Replace any cases where I copied the hashed characters from JSON file directly.

                  if ( typeof this.properties[thisWebPartProp] === 'boolean') {
                    if ( potentialValue === "true" ) { potentialValue = true; }
                    else if ( potentialValue === "false" ) { potentialValue = false; }
                  }

                  /**
                   * Deal with special cases where potentialValue needs to be converted to an array first.
                   */
                  if ( ['rules0','rules1','rules2'].indexOf(thisWebPartProp) > -1 ) { //These should be arrays of strings

                    if ( potentialValue != null && potentialValue != undefined ) {
                      try {
                        potentialValue = JSON.parse(potentialValue);
                      } catch (e) {
                        alert('Hey!  Check the PreConfigProps list ' + thisWebPartProp + ' field.  It should be valid JSON array string, it currently is: ' + potentialValue + '  Drilldown7WebPart.ts onPropertyPaneFieldChanged');
                      }

                    } else { potentialValue = [] ; }

                    this.properties[thisWebPartProp] = potentialValue;

                  } else if ( this.properties[thisWebPartProp] !== potentialValue ) { //If values are different, then update
                      if ( potentialValue === '') { //If value is intentionally empty string, do the update
                        this.properties[thisWebPartProp] = potentialValue;
                      } else {
                        this.properties[thisWebPartProp] = potentialValue;
                      }
                  }

                } else { 
                  if ( ['rules0','rules1','rules2'].indexOf(thisWebPartProp) > -1 ) { //These should be arrays of strings
                    if ( thisWebPartProp === 'newMap' ) { alert('Hey!  Why are we trying to set newMap????') ; }

                    if ( potentialValue != null && potentialValue != undefined ) {
                      potentialValue = JSON.parse(potentialValue);
                    } else { potentialValue = [] ; }

                    if ( thisWebPartProp === 'rules0' && potentialValue != null) {
                      //rules0 was found in list item and so we should update rules0 in props.
                      this.properties.rules0 = potentialValue;
                    } else if ( thisWebPartProp === 'rules1' && potentialValue != null) {
                      //rules0 was found in list item and so we should update rules0 in props.
                      this.properties.rules1 = potentialValue;
                    } else if ( thisWebPartProp === 'rules2' && potentialValue != null) {
                      //rules0 was found in list item and so we should update rules0 in props.
                      this.properties.rules2 = potentialValue;
                    }

                  } else {
                    this.properties[thisWebPartProp] = '';
                  }
  
                }
              }


            }

          });

        } else {
          if ( newValue.toLowerCase() !== 'na') {
            alert('I think there is an error in onPropertyPaneFieldChanged:  \ndefIndex is false.\nCan\'t find listDefintion of ' + newValue);
          } else {
            console.log('I think there is an error in onPropertyPaneFieldChanged:  \ndefIndex is false.\nCan\'t find listDefintion of ' + newValue);
          }

        }

        //this.properties.listTitle = newMap.listDisplay;
        //this.properties.colTitleText = newMap.listMapping.colTitleText;
        //this.properties.colHoverText = newMap.listMapping.colHoverText;

      } else {
        console.log('Did NOT List Defintion... updating column name props');

      }
      this.context.propertyPane.refresh();
    }

    if ( propertyPath === 'parentListWeb' || propertyPath === 'parentListTitle' ) {
      let webUrl = propertyPath === 'parentListWeb' ? newValue : this.properties.parentListWeb;
      let parentWeb = webUrl && webUrl != '' ? webUrl : this.context.pageContext.web.absoluteUrl;

      let listTitle = propertyPath === 'parentListTitle' ? newValue : this.properties.parentListTitle;

      let thisListWeb = Web( parentWeb );
      let thisListObject : any = thisListWeb.lists.getByTitle(listTitle);
      thisListObject.expand('RootFolder, ParentWeb').select('Title,RootFolder/ServerRelativeUrl, ParentWeb/Url')().then( (response) => {
          let tenantURL = response.ParentWeb.Url.substring(0, response.ParentWeb.Url.indexOf('/sites/') );
          this.properties.parentListURL = tenantURL + response.RootFolder.ServerRelativeUrl;
          this.context.propertyPane.refresh();
      }).catch((e) => {
        let errMessage = getHelpfullError(e, false, true);
        console.log(errMessage);
        if (errMessage.indexOf('missing a column') > -1) {
          
        } else {

        }
      });

    }

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'setSize','setTab','otherTab','setTab','otherTab','setTab','otherTab','setTab','otherTab',
      'parentListFieldTitles','progress','UpdateTitles','parentListTitle','childListTitle','parentListWeb','childListWeb', 'stats',
      'rules0','rules1','rules2',
      'togRefinerCounts', 'togCountChart', 'togStats', 'togOtherListview', 'togOtherChartpart',
      'fetchCount', 'fetchCountMobile', 'restFilter', 'quickCommands', 'definitionToggle', 'includeListLink',
    ];

    if ( propertyPath === 'quickCommands' ) {
      this.getQuickCommandsObject( 'Group Quick Commands', this.properties.quickCommands);
    }

    //alert('props updated');
    console.log('onPropertyPaneFieldChanged:', propertyPath, oldValue, newValue);
    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works

    }
    this.render();
  }
}