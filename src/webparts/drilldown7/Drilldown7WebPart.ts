import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {   
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme } from '@microsoft/sp-component-base';

import { Web, IList, IItem } from "@pnp/sp/presets/all";

import * as strings from 'Drilldown7WebPartStrings';
import DrillDown from './components/Drill/drillComponent';
import { IDrillDownProps, IWhenToShowItems } from './components/Drill/drillComponent';
import { consoleRef } from './components/Drill/drillFunctions';

import { makeTheTimeObject } from '@mikezimm/npmfunctions/dist/Services/Time/timeObject';

import * as links from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

require('../../services/GrayPropPaneAccordions.css');
export const repoLink: IRepoLinks = links.gitRepoDrillDownSmall;

import { _LinkIsValid } from '@mikezimm/npmfunctions/dist/Links/AllLinks';

import { importProps, } from '@mikezimm/npmfunctions/dist/Services/PropPane/ImportFunctions';

import { sortStringArray, sortObjectArrayByStringKey, sortNumberArray, sortObjectArrayByNumberKey, sortKeysByOtherKey 
} from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';

import { IBuildBannerSettings , buildBannerProps, IMinWPBannerProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerSetup';

import { buildExportProps, buildFPSAnalyticsProps } from './BuildExportProps';

import { setExpandoRamicMode } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSExpandoramic';
import { getUrlVars } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';

//encodeDecodeString(this.props.libraryPicker, 'decode')
import { encodeDecodeString, } from "@mikezimm/npmfunctions/dist/Services/Strings/urlServices";

import { verifyAudienceVsUser } from '@mikezimm/npmfunctions/dist/Services/Users/CheckPermissions';

import { bannerThemes, bannerThemeKeys, makeCSSPropPaneString, createBannerStyleStr, createBannerStyleObj } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/defaults';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { IWebpartHistory, IWebpartHistoryItem2 } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistoryInterface';
import { createWebpartHistory, ITrimThis, updateWebpartHistory, upgradeV1History } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistoryFunctions';

import { saveAnalytics3 } from '@mikezimm/npmfunctions/dist/Services/Analytics/analytics2';
import { IZLoadAnalytics, IZSentAnalytics, } from '@mikezimm/npmfunctions/dist/Services/Analytics/interfaces';

import { getSiteInfo, getWebInfoIncludingUnique } from '@mikezimm/npmfunctions/dist/Services/Sites/getSiteInfo';
import { IFPSUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { getFPSUser } from '@mikezimm/npmfunctions/dist/Services/Users/FPSUser';

import { createStyleFromString, getReactCSSFromString, ICurleyBraceCheck } from '@mikezimm/npmfunctions/dist/Services/PropPane/StringToReactCSS';
import { IWebpartBannerProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/bannerProps';

import { setPageFormatting, } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSFormatFunctions';

import { IFPSPage, } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSInterfaces';
import { createFPSWindowProps, initializeFPSSection, initializeFPSPage, webpartInstance, initializeMinimalStyle } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSDocument';
import { IFPSWindowProps, IFPSSection, IFPSSectionStyle } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSInterfaces';
import { setSectionStyles } from '@mikezimm/npmfunctions/dist/Services/DOM/setAllSectionStyles';
import { minimizeHeader } from '@mikezimm/npmfunctions/dist/Services/DOM/minimzeHeader';
import { minimizeToolbar } from '@mikezimm/npmfunctions/dist/Services/DOM/minimzeToolbar';
import { minimizeQuickLaunch } from '@mikezimm/npmfunctions/dist/Services/DOM/quickLaunch';

import { replaceHandleBars } from '@mikezimm/npmfunctions/dist/Services/Strings/handleBars';

//Checks
import { doesObjectExistInArrayInt, doesObjectExistInArray, compareArrays, getKeySummary, getKeyChanges
} from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { sp } from '@pnp/sp';

import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';
import { getAllItems } from '../../services/propPane/PropPaneFunctions';

import { IMyProgress,  ICSSChartDD } from './components/IReUsableInterfaces';

import { IListViewDDDrillDown } from '@mikezimm/npmfunctions/dist/Views/IDrillViews';
import { ICustViewDef, } from '@mikezimm/npmfunctions/dist/Views/IListViews';

import { IQuickButton, IQuickCommands, IQuickField } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { IRefinerLayer, IRefiners, IItemRefiners, IRefinerStats, RefineRuleValues,
  IRefinerRules, IRefinerStatType, RefinerStatTypes, IRefinerStat } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

  import { visitorPanelInfo } from './components/VisitorPanel/PanelComponent';

import { exportIgnoreProps, importBlockProps, } from './IDrilldown7WebPartProps';
import { css } from 'office-ui-fabric-react';
import { PreConfiguredProps } from './PreConfiguredSettings';
import { getThisSitesPreConfigProps, IConfigurationProp, ISitePreConfigProps, IPreConfigSettings, IAllPreConfigSettings } from '@mikezimm/npmfunctions/dist/PropPaneHelp/PreConfigFunctions';

/**
 * DD Provider: Step 1 - import from sp-dynamic-data
 */
import { IDynamicDataCallables, IDynamicDataPropertyDefinition} from '@microsoft/sp-dynamic-data';

import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { IDrilldown7WebPartProps } from './IDrilldown7WebPartProps';


require('../../services/propPane/GrayPropPaneAccordions.css');

  /**
   * DD Provider: Step 2 - add impliments IDynamicDataCallables
   */
export default class Drilldown7WebPart extends BaseClientSideWebPart<IDrilldown7WebPartProps>  implements IDynamicDataCallables {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

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
  private minHideToolbar: boolean = false;

  //For FPS Banner
  private forceBanner = true ;
  private modifyBannerTitle = true ;
  private modifyBannerStyle = true ;

  
  //Common FPS variables

  private sitePresets : ISitePreConfigProps = null;

  private _unqiueId;
  private validDocsContacts: string = '';

  private trickyApp = 'FPS PageInfo';
  private wpInstanceID: any = webpartInstance( this.trickyApp );

  private FPSUser: IFPSUser = null;

  private urlParameters: any = {};

  private  expandoDefault = false;
  private filesList: any = [];

  private exitPropPaneChanged = false;

  private expandoErrorObj = {

  };

  //ADDED FOR WEBPART HISTORY:  
  private thisHistoryInstance: IWebpartHistoryItem2 = null;

  private importErrorMessage = '';
    
  // private performance : ILoadPerformanceALVFM = null;
  private bannerProps: IWebpartBannerProps = null;

  private beAReader: boolean = false; //2022-04-07:  Intent of this is a one-time per instance to 'become a reader' level user.  aka, hide banner buttons that reader won't see

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private analyticsWasExecuted: boolean = false;

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

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
  public onInit():Promise<void> {
    return super.onInit().then(_ => {
      
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
      sp.setup({
        spfxContext: this.context
      });

      

      /***
     *     .d88b.  d8b   db      d888888b d8b   db d888888b d888888b      d8888b. db   db  .d8b.  .d8888. d88888b      .d888b. 
     *    .8P  Y8. 888o  88        `88'   888o  88   `88'   `~~88~~'      88  `8D 88   88 d8' `8b 88'  YP 88'          VP  `8D 
     *    88    88 88V8o 88         88    88V8o 88    88       88         88oodD' 88ooo88 88ooo88 `8bo.   88ooooo         odD' 
     *    88    88 88 V8o88         88    88 V8o88    88       88         88~~~   88~~~88 88~~~88   `Y8b. 88~~~~~       .88'   
     *    `8b  d8' 88  V888        .88.   88  V888   .88.      88         88      88   88 88   88 db   8D 88.          j88.    
     *     `Y88P'  VP   V8P      Y888888P VP   V8P Y888888P    YP         88      YP   YP YP   YP `8888Y' Y88888P      888888D 
     *                                                                                                                         
     *                                                                                                                         
     */

      //NEED TO APPLY THIS HERE as well as follow-up in render for it to not visibly change
      this.presetCollectionDefaults();

      this.properties.pageLayout =  this.context['_pageLayoutType']?this.context['_pageLayoutType'] : this.context['_pageLayoutType'];

      // DEFAULTS SECTION:  Performance   <<< ================================================================
      // this.performance = startPerformInit( this.displayMode, false );

      // DEFAULTS SECTION:  FPSUser


      // (property) BaseClientSideWebPart<IAlvFinManWebPartProps>.context: WebPartContext
      // {@inheritDoc @microsoft/sp-component-base#BaseComponent.context}

      // Argument of type 'import("C:/Users/dev/Documents/GitHub/ALVFinMan7/node_modules/@microsoft/sp-webpart-base/dist/index-internal").WebPartContext' is not assignable to parameter of type 'import("C:/Users/dev/Documents/GitHub/ALVFinMan7/node_modules/@mikezimm/npmfunctions/node_modules/@microsoft/sp-webpart-base/dist/index-internal").WebPartContext'.
      //   Types have separate declarations of a private property '_domElement'.ts(2345)
      //Typed this.context as any to remove above error
      this.FPSUser = getFPSUser( this.context as any, links.trickyEmails, this.trickyApp ) ;
      console.log( 'FPSUser: ', this.FPSUser );


      // // DEFAULTS SECTION:  Expandoramic   <<< ================================================================
      // this.expandoDefault = this.properties.expandoDefault === true && this.properties.enableExpandoramic === true && this.displayMode === DisplayMode.Read ? true : false;
      // if ( this.urlParameters.Mode === 'Edit' ) { this.expandoDefault = false; }
      // let expandoStyle: any = {};

      // //2022-04-07:  Could use the function for parsing JSON for this... check npmFunctions
      // try {
      //   expandoStyle = JSON.parse( this.properties.expandoStyle );

      // } catch(e) {
      //   console.log('Unable to expandoStyle: ', this.properties.expandoStyle);
      // }

      // let padding = this.properties.expandoPadding ? this.properties.expandoPadding : 20;
      // setExpandoRamicMode( this.context.domElement, this.expandoDefault, expandoStyle,  false, false, padding, this.properties.pageLayout  );
      this.properties.showRepoLinks = false;
      this.properties.showExport = false;
      this.properties.enableExpandoramic = false; //Always hide expandoramic for PageInfo Web Part
      this.properties.showBanner = true; //Always show banner

      // DEFAULTS SECTION:  Banner   <<< ================================================================
      //This updates unlocks styles only when bannerStyleChoice === custom.  Rest are locked in the ui.
      if ( this.properties.bannerStyleChoice === 'custom' ) { this.properties.lockStyles = false ; } else { this.properties.lockStyles = true; }

      if ( this.properties.bannerHoverEffect === undefined ) { this.properties.bannerHoverEffect = false; }

      let defBannerTheme = 'corpDark1';
      if ( this.context.pageContext.site.serverRelativeUrl.toLowerCase().indexOf( '/sites/lifenet') === 0 ) {
          defBannerTheme = 'corpWhite1'; }

      if ( !this.properties.bannerStyle ) { this.properties.bannerStyle = createBannerStyleStr( defBannerTheme, 'banner') ; }

      if ( !this.properties.bannerCmdStyle ) { 

        //Adjust the default size down compared to PinMe buttons which are primary functions in the web part
        let bannerCmdStyle = createBannerStyleStr( defBannerTheme, 'cmd').replace('"fontSize":20,', '"fontSize":16,') ;
        bannerCmdStyle = bannerCmdStyle.replace('"marginRight":"9px"', '"marginRight":"0px"') ;
        bannerCmdStyle = bannerCmdStyle.replace('"padding":"7px"', '"padding":"7px 4px"') ;

        this.properties.bannerCmdStyle = bannerCmdStyle;

       }

      // DEFAULTS SECTION:  Panel   <<< ================================================================
      if ( !this.properties.fullPanelAudience || this.properties.fullPanelAudience.length === 0 ) {
        this.properties.fullPanelAudience = 'Page Editors';
      }
      if ( !this.properties.documentationLinkDesc || this.properties.documentationLinkDesc.length === 0 ) {
        this.properties.documentationLinkDesc = 'Documentation';
      }


      // DEFAULTS SECTION:  webPartHistory   <<< ================================================================
      //Preset this on existing installations
      // if ( this.properties.forceReloadScripts === undefined || this.properties.forceReloadScripts === null ) {
      //   this.properties.forceReloadScripts = false;
      // }
      //ADDED FOR WEBPART HISTORY:  This sets the webpartHistory
      this.thisHistoryInstance = createWebpartHistory( 'onInit' , 'new', this.context.pageContext.user.displayName );
      let priorHistory : IWebpartHistoryItem2[] = this.properties.webpartHistory ? upgradeV1History( this.properties.webpartHistory ).history : [];
      this.properties.webpartHistory = {
        thisInstance: this.thisHistoryInstance,
        history: priorHistory,
      };

      //Have to insure selectedProperties always is an array from AdvancedPagePropertiesWebPart.ts
      // if ( !this.properties.selectedProperties ) { this.properties.selectedProperties = []; }

      this.renderCustomStyles( false );

    });
    
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

    
    /***
 *    d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *    88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *    88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *    88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *    88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *    88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                     
 *                                                     
 */


  /***
   *    d8888b. d88888b d8b   db d8888b. d88888b d8888b.       .o88b.  .d8b.  db      db      .d8888. 
   *    88  `8D 88'     888o  88 88  `8D 88'     88  `8D      d8P  Y8 d8' `8b 88      88      88'  YP 
   *    88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY'      8P      88ooo88 88      88      `8bo.   
   *    88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b        8b      88~~~88 88      88        `Y8b. 
   *    88 `88. 88.     88  V888 88  .8D 88.     88 `88.      Y8b  d8 88   88 88booo. 88booo. db   8D 
   *    88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD       `Y88P' YP   YP Y88888P Y88888P `8888Y' 
   *                                                                                                  
   *           Source:   PivotTiles 1.5.2.6                                                                                
   */
   this.renderCustomStyles();

   //Preset infoElement to question mark circle for this particular web part if it's not specificed - due to pin icon being important and usage in pinned location
   if ( !this.properties.infoElementChoice ) { this.properties.infoElementChoice = 'IconName=Unknown'; }  //May not be normally needed if in the presets
   if ( !this.properties.infoElementText ) { this.properties.infoElementText = 'Question mark circle'; }  //May not be normally needed if in the presets

   this._unqiueId = this.context.instanceId;

   // quickRefresh is used for SecureScript for when caching html file.  <<< ================================================================
   let renderAsReader = this.displayMode === DisplayMode.Read && this.beAReader === true ? true : false;

   // if ( this.properties.documentationIsValid !== true ) { errMessage += ' Invalid Support Doc Link: ' + ( this.properties.documentationLinkUrl ? this.properties.documentationLinkUrl : 'Empty.  ' ) ; this.validDocsContacts += 'DocLink,'; }
   // if ( !this.properties.supportContacts || this.properties.supportContacts.length < 1 ) { errMessage += ' Need valid Support Contacts' ; this.validDocsContacts += 'Contacts,'; }

   let errorObjArray :  any[] =[];

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

     let replacePanelWarning = `Anyone with lower permissions than '${this.properties.fullPanelAudience}' will ONLY see this content in panel`;

     console.log('mainWebPart: buildBannerSettings ~ 387',   );
 
     let buildBannerSettings : IBuildBannerSettings = {
 
       FPSUser: this.FPSUser,
       //this. related info
       context: this.context as any,
       clientWidth: ( this.domElement.clientWidth - ( this.displayMode === DisplayMode.Edit ? 250 : 0) ),
       exportProps: buildExportProps( this.properties, this.wpInstanceID, this.context.pageContext.web.serverRelativeUrl ),
 
       //Webpart related info
       panelTitle: 'FPS Page Info',
       modifyBannerTitle: this.modifyBannerTitle,
       repoLinks: repoLink,
 
       //Hard-coded Banner settings on webpart itself
       forceBanner: this.forceBanner,
       earyAccess: false,
       wideToggle: false,
       expandAlert: false,
       expandConsole: false,
 
       replacePanelWarning: replacePanelWarning,
       //Error info
       errMessage: errMessage,
       errorObjArray: errorObjArray, //In the case of Pivot Tiles, this is manualLinks[],
       expandoErrorObj: this.expandoErrorObj,
 
       beAUser: renderAsReader,
       showBeAUserIcon: false,
 
     };
 
     // console.log('mainWebPart: showTricks ~ 322',   );
     let showTricks: any = false;
     links.trickyEmails.map( getsTricks => {
       if ( this.context.pageContext.user && this.context.pageContext.user.loginName && this.context.pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { 
         showTricks = true ;
         this.properties.showRepoLinks = true; //Always show these users repo links
       }
       } );
 
     // console.log('mainWebPart: verifyAudienceVsUser ~ 341',   );
     this.properties.showBannerGear = verifyAudienceVsUser( this.FPSUser , showTricks, this.properties.homeParentGearAudience, null, renderAsReader );
 
     let bannerSetup = buildBannerProps( this.properties , this.FPSUser, buildBannerSettings, showTricks, renderAsReader, this.displayMode );
 
     errMessage = bannerSetup.errMessage;
     this.bannerProps = bannerSetup.bannerProps;
     let expandoErrorObj = bannerSetup.errorObjArray;
 
     this.bannerProps.enableExpandoramic = false; //Hard code this option for FPS PageInfo web part only because of PinMe option

     // console.log('mainWebPart: visitorPanelInfo ~ 405',   );
     this.properties.replacePanelHTML = visitorPanelInfo( this.properties, );
 
     this.bannerProps.replacePanelHTML = this.properties.replacePanelHTML;





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
        
        bannerProps: this.bannerProps,

        webpartHistory: this.properties.webpartHistory,

        sitePresets: this.sitePresets,

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

  private async UpdateTitles(): Promise<boolean> {

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
      thisListObject.expand('RootFolder, ParentWeb').select('Title,RootFolder/ServerRelativeUrl, ParentWeb/Url').get().then( (response) => {
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


  private presetCollectionDefaults() {
    
    this.sitePresets = getThisSitesPreConfigProps( PreConfiguredProps, this.properties, this.context.pageContext.web.serverRelativeUrl );

    this.sitePresets.presets.map( setting => {
      if ( this.properties[setting.prop] === setting.value ) { 
        setting.status = 'valid';

      } else if ( this.properties[setting.prop] === undefined || this.properties[setting.prop] === null ) { //Changed from just !this... because if value was 'false' it would set to true
        this.properties[setting.prop] = setting.value ;
        setting.status = 'preset';

      }
    });

    this.sitePresets.forces.map( setting => {
      if ( this.properties[setting.prop] === setting.value ) { 
        setting.status = 'valid';

      } else if ( !this.properties[setting.prop] ) { 
        this.properties[setting.prop] = setting.value ;
        setting.status = 'preset';

      } else if ( this.properties[setting.prop] !== setting.value ) { 
        this.properties[setting.prop] = setting.value ;
        setting.status = 'changed';

      }

    });

    console.log('Preset props used:', this.sitePresets );

  }


  /***
 *    d88888b d8888b. .d8888.       .d88b.  d8888b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *    88'     88  `8D 88'  YP      .8P  Y8. 88  `8D `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *    88ooo   88oodD' `8bo.        88    88 88oodD'    88       88    88    88 88V8o 88 `8bo.   
 *    88~~~   88~~~     `Y8b.      88    88 88~~~      88       88    88    88 88 V8o88   `Y8b. 
 *    88      88      db   8D      `8b  d8' 88         88      .88.   `8b  d8' 88  V888 db   8D 
 *    YP      88      `8888Y'       `Y88P'  88         YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                              
 *                                                                                              
 */

   private renderCustomStyles( doHeadings: boolean = true ) {

    //Used with FPS Options Functions
    this.setQuickLaunch( this.properties.quickLaunchHide );
    minimizeHeader( document, this.properties.pageHeaderHide, false, true );
    this.setThisPageFormatting( this.properties.fpsPageStyle );
    this.setToolbar( this.properties.toolBarHide );
    this.updateSectionStyles( );
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
   * @param quickLaunchHide 
   */
  private setToolbar( hideToolbar: boolean ) {

      if(this.displayMode == DisplayMode.Read && this.urlParameters.tool !== 'true' ){
        let value = hideToolbar === true ? 'none' : null;
        let toolBarStyle: IFPSSectionStyle = initializeMinimalStyle( 'Miminze Toolbar', this.wpInstanceID, 'display', value );
        minimizeToolbar( document, toolBarStyle, false, true );
        this.minHideToolbar = true;
      }

  }

  /**
   * Used with FPS Options Functions
   * @param fpsPageStyle 
   */
  private setThisPageFormatting( fpsPageStyle: string ) {

    let fpsPage: IFPSPage = initializeFPSPage( this.wpInstanceID, this.fpsPageDone, fpsPageStyle, this.fpsPageArray  );
    fpsPage = setPageFormatting( this.domElement, fpsPage );
    this.fpsPageArray = fpsPage.Array;
    this.fpsPageDone = fpsPage.do;

  }


  private updateSectionStyles( ) {

    let allSectionMaxWidth = this.properties.allSectionMaxWidthEnable !== true ? null : this.properties.allSectionMaxWidth;
    let allSectionMargin = this.properties.allSectionMarginEnable !== true ? null : this.properties.allSectionMargin;
    let sectionStyles = initializeFPSSection( this.wpInstanceID, allSectionMaxWidth, allSectionMargin,  );

    setSectionStyles( document, sectionStyles, true, true );

  }


}