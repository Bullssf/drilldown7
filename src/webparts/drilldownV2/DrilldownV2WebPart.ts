import * as React from 'react';
import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import {
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';


import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  // PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {   
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme } from '@microsoft/sp-component-base';

import { Web, } from "@pnp/sp/presets/all"

/***
 *    d888888b db   db d888888b .d8888.      db   d8b   db d88888b d8888b.      d8888b.  .d8b.  d8888b. d888888b 
 *    `~~88~~' 88   88   `88'   88'  YP      88   I8I   88 88'     88  `8D      88  `8D d8' `8b 88  `8D `~~88~~' 
 *       88    88ooo88    88    `8bo.        88   I8I   88 88ooooo 88oooY'      88oodD' 88ooo88 88oobY'    88    
 *       88    88~~~88    88      `Y8b.      Y8   I8I   88 88~~~~~ 88~~~b.      88~~~   88~~~88 88`8b      88    
 *       88    88   88   .88.   db   8D      `8b d8'8b d8' 88.     88   8D      88      88   88 88 `88.    88    
 *       YP    YP   YP Y888888P `8888Y'       `8b8' `8d8'  Y88888P Y8888P'      88      YP   YP 88   YD    YP    
 *                                                                                                               
 *                                                                                                               
 */

// STANDARD PROJECT IMPORTS


import * as strings from 'DrilldownV2WebPartStrings';
// import DrilldownV2 from './components/DrilldownV2';

import { IDrilldownV2WebPartProps } from './IDrilldownV2WebPartProps';
import DrilldownV2 from './components/Drill/drillComponent';
import { IDrilldownV2Props, IWhenToShowItems } from './components/Drill/IDrillProps';
import { consoleRef } from './components/Drill/drillFunctions';


/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *
 *    USED IN PRESETTING PROPS
 */

 import { applyPresetCollectionDefaults, ISitePreConfigProps,  } from './fpsReferences';
 import { PreConfiguredProps,  } from './CoreFPS/PreConfiguredSettings';
 
 
 /***
  *     .d88b.  d8b   db      d888888b d8b   db d888888b d888888b 
  *    .8P  Y8. 888o  88        `88'   888o  88   `88'   `~~88~~' 
  *    88    88 88V8o 88         88    88V8o 88    88       88    
  *    88    88 88 V8o88         88    88 V8o88    88       88    
  *    `8b  d8' 88  V888        .88.   88  V888   .88.      88    
  *     `Y88P'  VP   V8P      Y888888P VP   V8P Y888888P    YP    
  *
  *     USED FIRST IN ONINIT
  */
 
 import { webpartInstance, IFPSUser, getFPSUser, repoLink, trickyEmails } from './fpsReferences';
 import { createBasePerformanceInit, startPerformOp, updatePerformanceEnd } from './fpsReferences';
 import { IPerformanceOp, ILoadPerformance, IHistoryPerformance, ILoadPerformanceOps } from './fpsReferences';  // eslint-disable-line @typescript-eslint/no-unused-vars
 
 /***
  *    .d8888. d888888b db    db db      d88888b .d8888. 
  *    88'  YP `~~88~~' `8b  d8' 88      88'     88'  YP 
  *    `8bo.      88     `8bd8'  88      88ooooo `8bo.   
  *      `Y8b.    88       88    88      88~~~~~   `Y8b. 
  *    db   8D    88       88    88booo. 88.     db   8D 
  *    `8888Y'    YP       YP    Y88888P Y88888P `8888Y' 
  *
  *    USED FOR STYLES
  */
 
 import { renderCustomStyles, updateBannerThemeStyles, expandoOnInit, refreshBannerStylesOnPropChange } from './fpsReferences';
 
 
 /***
  *    db   d8b   db d8888b.      db   db d888888b .d8888. d888888b  .d88b.  d8888b. db    db 
  *    88   I8I   88 88  `8D      88   88   `88'   88'  YP `~~88~~' .8P  Y8. 88  `8D `8b  d8' 
  *    88   I8I   88 88oodD'      88ooo88    88    `8bo.      88    88    88 88oobY'  `8bd8'  
  *    Y8   I8I   88 88~~~        88~~~88    88      `Y8b.    88    88    88 88`8b      88    
  *    `8b d8'8b d8' 88           88   88   .88.   db   8D    88    `8b  d8' 88 `88.    88    
  *     `8b8' `8d8'  88           YP   YP Y888888P `8888Y'    YP     `Y88P'  88   YD    YP    
  *
  *     USED FOR WEB PART HISTORY
  */
 
 import { getWebPartHistoryOnInit, updateWebpartHistoryV2,  } from './fpsReferences';
 
 /***
  *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b. 
  *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D 
  *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY' 
  *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b   
  *    88   8D 88   88 88  V888 88  V888 88.     88 `88. 
  *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD 
  *
  *     USED FOR CREATING BANNER
  */
 
 import { verifyAudienceVsUser, } from './fpsReferences';
 import { IWebpartBannerProps, } from './fpsReferences';
 import { buildExportProps, buildFPSAnalyticsProps , } from './CoreFPS/BuildExportProps';
 
//  import { mainWebPartRenderBannerSetup } from './fpsReferences';
//  import { mainWebPartRenderBannerSetup } from './CoreFPS/WebPartRenderBanner';

//For whatever reason, THIS NEEDS TO BE CALLED Directly and NOT through fpsReferences or it gives error.
import { mainWebPartRenderBannerSetup, refreshPanelHTML } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/WebPartRenderBannerV2';  // eslint-disable-line @typescript-eslint/no-unused-vars


 /***
  *    d8888b. d8888b.  .d88b.  d8888b.       d888b  d8888b.  .d88b.  db    db d8888b. .d8888. 
  *    88  `8D 88  `8D .8P  Y8. 88  `8D      88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D 88'  YP 
  *    88oodD' 88oobY' 88    88 88oodD'      88      88oobY' 88    88 88    88 88oodD' `8bo.   
  *    88~~~   88`8b   88    88 88~~~        88  ooo 88`8b   88    88 88    88 88~~~     `Y8b. 
  *    88      88 `88. `8b  d8' 88           88. ~8~ 88 `88. `8b  d8' 88b  d88 88      db   8D 
  *    88      88   YD  `Y88P'  88            Y888P  88   YD  `Y88P'  ~Y8888P' 88      `8888Y' 
  *
  *    USED FOR PROPERTY PANE GROUPS
  */
 

  import { buildYourListGroup } from './PropPaneGroups/Page1/ListInfo';
  import { buildPreConfigGroup } from './PropPaneGroups/Page1/PreConfigSetup';
  import { buildPerformanceGroup } from './PropPaneGroups/Page1/Performance';
  import { buildRefinerGroup } from './PropPaneGroups/Page1/Refiners';
  import { buildTogglesGroup } from './PropPaneGroups/Page1/Toggles';


  import { buildRefinerInstructionsGroup } from './PropPaneGroups/Page2/RefinerInstructions';
  import { buildCustomizeGroup } from './PropPaneGroups/Page2/Customize';
  import { buildListGroupingGroup } from './PropPaneGroups/Page2/Grouping';
  import { buildViewTogglesGroup } from './PropPaneGroups/Page2/ViewToggles';
  import { buildStatsGroup } from './PropPaneGroups/Page2/StatsGroup';
  import { buildViewGroupFields } from './PropPaneGroups/Page2/Views';

  
 import { WebPartInfoGroup, } from './fpsReferences';
 import { FPSOptionsGroupBasic, } from './fpsReferences';
 import { FPSBanner4BasicGroup, FPSBanner3NavGroup, FPSBanner3ThemeGroup } from './fpsReferences';
 import { FPSBanner3VisHelpGroup } from './fpsReferences';
 import { FPSPinMePropsGroup } from './fpsReferences';  // eslint-disable-line @typescript-eslint/no-unused-vars
 import { FPSOptionsExpando, } from './fpsReferences'; //expandAudienceChoicesAll
 
 
 /***
  *    d8888b. d8888b.  .d88b.  d8888b.      d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b d888888b d8b   db  d888b  
  *    88  `8D 88  `8D .8P  Y8. 88  `8D        `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'   `88'   888o  88 88' Y8b 
  *    88oodD' 88oobY' 88    88 88oodD'         88    88  88  88 88oodD' 88    88 88oobY'    88       88    88V8o 88 88      
  *    88~~~   88`8b   88    88 88~~~           88    88  88  88 88~~~   88    88 88`8b      88       88    88 V8o88 88  ooo 
  *    88      88 `88. `8b  d8' 88             .88.   88  88  88 88      `8b  d8' 88 `88.    88      .88.   88  V888 88. ~8~ 
  *    88      88   YD  `Y88P'  88           Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP    Y888888P VP   V8P  Y888P  
  *
  *    USED for IMPORTING and EXPORTING
  */
 
 import { updateFpsImportProps, FPSImportPropsGroup, validateDocumentationUrl } from './fpsReferences';
 
 /***
  *     .d8b.  d8b   db  .d8b.  db      db    db d888888b d888888b  .o88b. .d8888. 
  *    d8' `8b 888o  88 d8' `8b 88      `8b  d8' `~~88~~'   `88'   d8P  Y8 88'  YP 
  *    88ooo88 88V8o 88 88ooo88 88       `8bd8'     88       88    8P      `8bo.   
  *    88~~~88 88 V8o88 88~~~88 88         88       88       88    8b        `Y8b. 
  *    88   88 88  V888 88   88 88booo.    88       88      .88.   Y8b  d8 db   8D 
  *    YP   YP VP   V8P YP   YP Y88888P    YP       YP    Y888888P  `Y88P' `8888Y' 
  *
  *    USED FOR ANALYTICS AND LOGGING
  */
 
 import { importBlockProps,  } from './IDrilldownV2WebPartProps';
 
 /***
  *     .o88b. .d8888. .d8888.      d8888b. d88888b  .d88b.  db    db d888888b d8888b. d88888b .d8888. 
  *    d8P  Y8 88'  YP 88'  YP      88  `8D 88'     .8P  Y8. 88    88   `88'   88  `8D 88'     88'  YP 
  *    8P      `8bo.   `8bo.        88oobY' 88ooooo 88    88 88    88    88    88oobY' 88ooooo `8bo.   
  *    8b        `Y8b.   `Y8b.      88`8b   88~~~~~ 88    88 88    88    88    88`8b   88~~~~~   `Y8b. 
  *    Y8b  d8 db   8D db   8D      88 `88. 88.     `8P  d8' 88b  d88   .88.   88 `88. 88.     db   8D 
  *     `Y88P' `8888Y' `8888Y'      88   YD Y88888P  `Y88'Y8 ~Y8888P' Y888888P 88   YD Y88888P `8888Y' 
  *
  *     USED BY BANNER COMPONENTS
  */
 

require('@mikezimm/npmfunctions/dist/Services/PropPane/GrayPropPaneAccordions.css');
require('@mikezimm/npmfunctions/dist/Services/DOM/PinMe/FPSPinMe.css');
require('@mikezimm/npmfunctions/dist/HeadingCSS/FPSHeadings.css');
require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');
require('@mikezimm/npmfunctions/dist/Performance/styles.css');





import { makeTheTimeObject } from './fpsReferences';

//Checks
import { doesObjectExistInArray, } from './fpsReferences';

import { getHelpfullError } from './fpsReferences';

import { sp } from '@pnp/sp';

// import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';
import { getAllItems } from '../../services/propPane/PropPaneFunctions';

import { ICSSChartDD } from './fpsReferences';

import { IListViewDDDrillDown } from './fpsReferences';
import { ICustViewDef, } from './fpsReferences';

import { IQuickCommands, IQuickButton } from './fpsReferences';

import { IRefinerLayer, RefineRuleValues, IRefinerStat } from './fpsReferences'; // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * DD Provider: Step 1 - import from sp-dynamic-data
 */
import { IDynamicDataCallables, IDynamicDataPropertyDefinition} from '@microsoft/sp-dynamic-data';  // eslint-disable-line @typescript-eslint/no-unused-vars

import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { buildQuickCommandsGroup } from './PropPaneGroups/Page2/QuickCommands';






export default class DrilldownV2WebPart extends BaseClientSideWebPart<IDrilldownV2WebPartProps> {

  private _windowAny: any = window;

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  
  //Common FPS variables

  private _sitePresets : ISitePreConfigProps = null;
  private _trickyApp = 'FPS Core114';
  private _wpInstanceID: any = webpartInstance( this._trickyApp );
  private _FPSUser: IFPSUser = null;

  //For FPS Banner
  private _forceBanner = true ;
  private _modifyBannerTitle = true ;
  private _modifyBannerStyle = true ;

  private _exitPropPaneChanged = false;
  private _importErrorMessage = '';
  
  private _keysToShow : ILoadPerformanceOps[] = [ ];
  private _performance : ILoadPerformance = null;

  //2022-04-07:  Intent of this is a one-time per instance to 'become a reader' level user.  aka, hide banner buttons that reader won't see
  private _beAReader: boolean = false; 

    /**
   * DD Provider: Step 6 - (9:51) add _selectedSwitch to be the placeholder for what was selected
   */
  private _selected_cssChartProps : ICSSChartDD;
  private _selected_listProps : any;

  private _quickCommands : IQuickCommands = null;

  /**
   * 2020-09-08:  Add for dynamic data refiners.
   */
  private _selectedRefiner0Name: string;
  private _selectedRefiner0Value: string;
  private _filterBy: any;

  // //For FPS options
  // private fpsPageDone: boolean = false;
  // private fpsPageArray: any[] = null;
  // private minQuickLaunch: boolean = false;
  // private minHideToolbar: boolean = false;

  private _unqiueId: string = '';

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  /** Add Theme including on SPAs
   * 
   *   https://n8d.at/how-to-make-css-variables-work-in-every-web-part-context
   */
  /// Converts JSON Theme Slots it CSS variables
  private setCSSVariables(theming: any) {

    // request all key defined in theming
    let themingKeys = Object.keys(theming);
    // if we have the key
    if (themingKeys !== null) {
      // loop over it
      themingKeys.forEach(key => {
        // add CSS variable to style property of the web part
        this.domElement.style.setProperty(`--${key}`, theming[key]);

      });

    }

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
  public async onInit():Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    return super.onInit().then(_ => {
      


      /** Add Theme including on SPAs
       * 
       *   https://n8d.at/how-to-make-css-variables-work-in-every-web-part-context
       */

      // Consume the new ThemeProvider service
      this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

      // If it exists, get the theme variant
      this._themeVariant = this._themeProvider.tryGetTheme();

      console.debug('Theme variant ::: ', this._themeVariant);

      // If there is a theme variant
      if (this._themeVariant) {

        // we set transfer semanticColors into CSS variables
        this.setCSSVariables(this._themeVariant.semanticColors);

      } else if (this._windowAny["__themeState__"].theme) {

        // FALLBACK TO App Page

        // we set transfer semanticColors into CSS variables
        this.setCSSVariables(this._windowAny["__themeState__"].theme);

      }


      /**
       * DD Provider: Step 3 - add / update OnInit
       *  Tell DD Service that this is a provider
       */
      this.context.dynamicDataSourceManager.initializeSource(this);

      // if ( !this.properties.rules0 ) { 
      //   this.properties.rules0 = [] ; 
      // }
      // if ( !this.properties.rules1 ) { 
      //   this.properties.rules1 = [] ; 
      // }
      // if ( !this.properties.rules2 ) { 
      //   this.properties.rules2 = [] ; 
      // }

      /**
       * MOVED TO PRECONFIG PROPS
       */
      //Added for https://github.com/mikezimm/drilldown7/issues/95  
      // if ( this.properties.whenToShowItems === undefined || this.properties.whenToShowItems === null ) { this.properties.whenToShowItems = 2; }
      // if ( this.properties.minItemsForHide === undefined || this.properties.minItemsForHide === null ) { this.properties.minItemsForHide = 30; }
      // if ( !this.properties.instructionIntro ) { this.properties.instructionIntro = `Please click filters (above) to see items :)`; }
      // if ( !this.properties.refinerInstruction1 ) { this.properties.refinerInstruction1 = `Select a {{refiner0}}`; }
      // if ( !this.properties.refinerInstruction2 ) { this.properties.refinerInstruction2 = `Select a {{refiner1}}`; }
      // if ( !this.properties.refinerInstruction3 ) { this.properties.refinerInstruction3 = `Select a {{refiner2}}`; }
      // if ( !this.properties.language ) { this.properties.language = `en-us`; }

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

      // this._getListDefintions(true, true);
      //console.log('window.location',window.location);
      sp.setup({
        spfxContext: this.context as any, //2022-09-22:  HAD TO SET as any to not get error
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

      // DEFAULTS SECTION:  Performance   <<< ================================================================
      this._performance = createBasePerformanceInit( this.displayMode, false );
      this._performance.ops.superOnInit = startPerformOp( 'superOnInit', this.displayMode );

      //NEED TO APPLY THIS HERE as well as follow-up in render for it to not visibly change
      this._sitePresets = applyPresetCollectionDefaults( this._sitePresets, PreConfiguredProps, this.properties, this.context.pageContext.web.serverRelativeUrl ) ;

      //This indicates if its SPA, Teams etc.... always keep.
      this.properties.pageLayout =  this.context['_pageLayoutType']?this.context['_pageLayoutType'] : this.context['_pageLayoutType'];
      // this.urlParameters = getUrlVars();

      this._FPSUser = getFPSUser( this.context as any, trickyEmails, this._trickyApp ) ;
      console.log( 'FPSUser: ', this._FPSUser );

      expandoOnInit( this.properties, this.context.domElement, this.displayMode );

      updateBannerThemeStyles( this.properties, this.properties.bannerStyleChoice ? this.properties.bannerStyleChoice : 'corpDark1', true, this.properties.defPinState, this._sitePresets.forces );
 
      this.properties.webpartHistory = getWebPartHistoryOnInit( this.context.pageContext.user.displayName, this.properties.webpartHistory );

      renderCustomStyles( 
        { wpInstanceID: this._wpInstanceID, domElement: this.domElement, wpProps: this.properties, 
          displayMode: this.displayMode,
          doHeadings: false } ); //doHeadings is currently only used in PageInfo so set to false.

      this._performance.ops.superOnInit = updatePerformanceEnd( this._performance.ops.superOnInit, true, null );  


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
      //Replace any cases where I copied the hashed characters from JSON file directly.  
      str = str.replace(/\\"/g,'"').replace(/\\'"/g,"'");
      if ( str === '[]' || str === '' ) { str = '{}' ; }
      result = JSON.parse(str);
      if ( !result.buttons ) { result.buttons = []; }
      if ( !result.fields ) { result.fields = []; }
      if ( !result.onUpdateReload ) { result.onUpdateReload = true; }

      this.properties.quickCommands = JSON.stringify(result);

      if ( result.buttons.length > 0 ) {

        result.buttons.map( ( buttonRow: IQuickButton[] ) => {
          if ( buttonRow.length > 0 ) {
            buttonRow.map( ( thisButtonObjectOriginal: IQuickButton ) => {

              const thisButtonObject = JSON.parse(JSON.stringify( thisButtonObjectOriginal ))
              const str1: RegExp = thisButtonObject.str1 ? new RegExp(`{str1}`,'gi') : undefined;
              const str2: RegExp = thisButtonObject.str2 ? new RegExp(`{str2}`,'gi') : undefined;
              const str3: RegExp = thisButtonObject.str3 ? new RegExp(`{str3}`,'gi') : undefined;

              Object.keys( thisButtonObject ).map( (key: string) => {

                if ( key !== 'str1' && key !== 'str2'  && key !== 'str3' ) {
                  let oldValue: any = thisButtonObject[key] ;

                  if ( typeof oldValue === 'string' ) {
                    if ( str1 ) oldValue = oldValue.replace( str1, thisButtonObject.str1.toString() );
                    if ( str2 ) oldValue = oldValue.replace( str2, thisButtonObject.str2.toString() );
                    if ( str3 ) oldValue = oldValue.replace( str3, thisButtonObject.str3.toString() );
                    thisButtonObjectOriginal[key] = oldValue;
  
                  } else if ( typeof oldValue === 'object' || Array.isArray( oldValue ) ) {
                    let objString = JSON.stringify( oldValue ); //Stringify to update all children
                    if ( str1 ) objString = objString.replace( str1, thisButtonObject.str1.toString() );
                    if ( str2 ) objString = objString.replace( str2, thisButtonObject.str2.toString() );
                    if ( str3 ) objString = objString.replace( str3, thisButtonObject.str3.toString() );
                    thisButtonObjectOriginal[key] = JSON.parse( objString );
                  }
                }

              });
            });
          }
        });
      }

      this._quickCommands = result;

      if ( this.properties.quickCommands.indexOf('sourceUserInfo') > 1 ) {
        this._quickCommands.quickCommandsRequireUser = true;

      }

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
      //Replace any cases where I copied the hashed characters from JSON file directly. 
      str = str.replace(/\\\"/g,'"').replace(/\\'"/g,"'"); // eslint-disable-line no-useless-escape
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
      let propsGroups: string[]; // eslint-disable-line @typescript-eslint/no-unused-vars
      let groupByFieldsJSON : any = {};

      if ( grp === null || grp === undefined ) { return result; }
      try {
        //Replace any cases where I copied the hashed characters from JSON file directly. 
        grp = grp.replace(/\\\"/g,'"').replace(/\\'"/g,"'"); // eslint-disable-line no-useless-escape
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


  public render(): void {


  /**
   * PERFORMANCE - START
   * This is how you can start a performance snapshot - make the _performance.ops.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
   */ 
   this._performance.ops.renderWebPartStart = startPerformOp( 'renderWebPartStart', this.displayMode );

    renderCustomStyles(  { wpInstanceID: this._wpInstanceID, domElement: this.domElement, wpProps: this.properties, 
      displayMode: this.displayMode,
      doHeadings: false } );  //doHeadings is currently only used in PageInfo so set to false.
  
     const exportProps = buildExportProps( this.properties , this._wpInstanceID, this.context.pageContext.web.serverRelativeUrl );
  
     const bannerProps: IWebpartBannerProps = mainWebPartRenderBannerSetup( this.displayMode, this._beAReader, this._FPSUser, //repoLink.desc, 
         this.properties, repoLink, trickyEmails, exportProps, strings , this.domElement.clientWidth, this.context as any, this._modifyBannerTitle,  // 2022-09-22:  Set this.context as any
         this._forceBanner, false, null, this._keysToShow, true, true );
  
      if ( bannerProps.showBeAUserIcon === true ) { bannerProps.beAUserFunction = this._beAUserFunction.bind(this); }
  
      // console.log('mainWebPart: baseFetchInfo ~ 308',   );
      // this._fetchInfo = baseFetchInfo( '', this._performance );
  
      // This gets done a second time if you do not want to pass it in the first time.
      // bannerProps.replacePanelHTML = visitorPanelInfo( this.properties, repoLink, '', '', createPerformanceTableVisitor( this._fetchInfo.performance ) );
      console.log('mainWebPart: createElement ~ 316',   );


    let errMessage = '';
    //Be sure to always pass down an actual URL if the webpart prop is empty at this point.
    //If it's undefined, null or '', get current page context value
    const parentWeb = this.properties.parentListWeb && this.properties.parentListWeb != '' ? this.properties.parentListWeb : this.context.pageContext.web.absoluteUrl; // eslint-disable-line eqeqeq

    const refiners: string[] = [];

    if ( this.properties.refiner0 && this.properties.refiner0.length > 0 ) { refiners.push( this.properties.refiner0.replace(/\s/g,'') ) ;}
    if ( this.properties.refiner1 && this.properties.refiner1.length > 0 ) { refiners.push( this.properties.refiner1.replace(/\s/g,'') ) ;}
    if ( this.properties.refiner2 && this.properties.refiner2.length > 0 ) { refiners.push( this.properties.refiner2.replace(/\s/g,'') ) ;}

    //Added for https://github.com/mikezimm/drilldown7/issues/95
    let whenToShowItems: IWhenToShowItems = this.properties.whenToShowItems;
    if ( whenToShowItems > refiners.length ) { whenToShowItems = refiners.length as any ; }

    // const rules1: RefineRuleValues[] = ['parseBySemiColons']; // eslint-disable-line @typescript-eslint/no-unused-vars
    // const rules2: RefineRuleValues[] = ['parseBySemiColons']; // eslint-disable-line @typescript-eslint/no-unused-vars
    // const rules3: RefineRuleValues[] = ['groupByMonthsMMM']; // eslint-disable-line @typescript-eslint/no-unused-vars

    let rules = [];
    if ( this.properties.rules0 && this.properties.rules0.length > 0 ) { rules.push ( this.properties.rules0 ) ; } else { rules.push( ['']) ; }
    if ( this.properties.rules1 && this.properties.rules1.length > 0 ) { rules.push ( this.properties.rules1) ; } else { rules.push( ['']) ; }
    if ( this.properties.rules2 && this.properties.rules2.length > 0 ) { rules.push ( this.properties.rules2) ; } else { rules.push( ['']) ; }

    const viewDefs : ICustViewDef[] = [];

    //2022-07-21:  Tried to case as any to get rid of incompatibility issues
    const viewFields1Any : any[] = this.getViewFieldsObject('Full Size view', this.properties.viewJSON1, this.properties.groupByFields );
    const viewFields2Any : any[] = this.getViewFieldsObject('Med Size view', this.properties.viewJSON2, this.properties.groupByFields );
    const viewFields3Any : any[] = this.getViewFieldsObject('Small Size view', this.properties.viewJSON3, this.properties.groupByFields );

    let viewFields1 : IViewField[] = viewFields1Any;
    let viewFields2 : IViewField[] = viewFields2Any;
    let viewFields3 : IViewField[] = viewFields3Any;

    if ( !viewFields1 ) { errMessage += 'viewFields1 has an error; '; viewFields1 = [] ; }
    if ( !viewFields2 ) { errMessage += 'viewFields2 has an error; '; viewFields2 = [] ; }
    if ( !viewFields3 ) { errMessage += 'viewFields3 has an error; '; viewFields3 = [] ; }

    if ( errMessage.indexOf('viewFields') > -1 ) { errMessage += 'Tip:  Extra commas after last object can cause this!'; }

    let groupByFields: IGrouping[] = this.getViewGroupFields( 'Group View Fields', this.properties.groupByFields);

    if ( !groupByFields ) { errMessage += 'groupByFields has an error; '; groupByFields = []; }


    const includeAttach = this.properties.includeAttach;

    const viewWidth1 = this.properties.viewWidth1;
    const viewWidth2 = this.properties.viewWidth2;
    const viewWidth3 = this.properties.viewWidth3;


    /**
     * NEED TO CHECK:  CREATE ITEM LINK  LIST LINK AUDIENCE
     */
    const canUseDetails = verifyAudienceVsUser( this._FPSUser, bannerProps.showTricks, this.properties.detailsAudience , null, this._beAReader );
    const includeDetails = this.properties.includeDetails === true && canUseDetails === true ? true : false ;

    const canUseListLink = verifyAudienceVsUser( this._FPSUser, bannerProps.showTricks, this.properties.listLinkAudience , null, this._beAReader );
    const includeListLink = this.properties.includeListLink === true && canUseListLink === true ? true : false ;

    const canUseCreateLink = verifyAudienceVsUser( this._FPSUser, bannerProps.showTricks, this.properties.createItemAudience , null, this._beAReader );
    const createItemLink = this.properties.createItemLink === true && canUseCreateLink === true ? true : false ;

    if (viewFields1 !== undefined ) { viewDefs.push( { minWidth: viewWidth1, viewFields: viewFields1, groupByFields: groupByFields, includeDetails: includeDetails, includeAttach: includeAttach, includeListLink: includeListLink, createItemLink: createItemLink }); }
    if (viewFields2 !== undefined ) { viewDefs.push( { minWidth: viewWidth2, viewFields: viewFields2, groupByFields: groupByFields, includeDetails: includeDetails, includeAttach: includeAttach, includeListLink: includeListLink, createItemLink: createItemLink }); }
    if (viewFields3 !== undefined ) { viewDefs.push( { minWidth: viewWidth3, viewFields: viewFields3, groupByFields: groupByFields, includeDetails: includeDetails, includeAttach: includeAttach, includeListLink: includeListLink, createItemLink: createItemLink }); }

    const stringRules: string = JSON.stringify( rules );

    //Just for test purposes
    //stringRules = JSON.stringify( [rules1,rules2,rules3] );

    /** 
     * PERFORMANCE - UPDATE
     * This is how you can UPDATE a performance snapshot - make the _performance.ops.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
     * NOTE IN THIS CASE to do it before you refreshPanelHTML :)
     */

    this._performance.ops.renderWebPartStart = updatePerformanceEnd( this._performance.ops.renderWebPartStart, true, null );
    // this._performance.sets.getAllProps = { label: 'getAllProps', value: this.properties.getAllProps };
    this._performance.getAllProps =this.properties.getAllProps ;

    let language = this.properties.language;
    try {
      language = language.toLowerCase();
    } catch( e ) {
      console.log('Unable to convert language to lower case.' );
    }



    const element: React.ReactElement<IDrilldownV2Props> = React.createElement(
      DrilldownV2,
      {
        // description: this.properties.description,
        // isDarkTheme: this._isDarkTheme,
        // environmentMessage: this._environmentMessage,
        // hasTeamsContext: !!this.context.sdks.microsoftTeams,
        // userDisplayName: this.context.pageContext.user.displayName

                /**
         * Default 1.14 properties
         */
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        themeVariant: this._themeVariant,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,

      // 0 - Context
      context: this.context as any,  //2022-09-22:  Had to set as any to pass in
      displayMode: this.displayMode,

      loadPerformance: this._performance,

      // saveLoadAnalytics: this.saveLoadAnalytics.bind(this),
      FPSPropsObj: buildFPSAnalyticsProps( this.properties, this._wpInstanceID, this.context.pageContext.web.serverRelativeUrl ),

      bannerProps: bannerProps,

      webpartHistory: this.properties.webpartHistory,

      sitePresets: this._sitePresets,

      errMessage: errMessage,

      tenant: this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,""),
      urlVars: this.getUrlVars(),
      today: makeTheTimeObject(''),
      parentListFieldTitles: this.properties.parentListFieldTitles,

      //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
      WebpartElement: this.domElement,

      // 1 - Analytics options
    
      toggles: {
          togRefinerCounts: this.properties.togRefinerCounts,
          togCountChart: this.properties.togCountChart,
          togStats: this.properties.togStats,
          togOtherListview:  this.properties.togOtherListview,
          togOtherChartpart: this.properties.togOtherChartpart,
      },
  
      performance: {
          fetchCount: this.properties.fetchCount,
          itemsPerPage: this.properties.itemsPerPage,
          fetchCountMobile: this.properties.fetchCountMobile,
          getAllProps: this.properties.getAllProps,
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

      quickCommands: this._quickCommands,

      // 2 - Source and destination list information
      listName: this.properties.parentListTitle,
      isLibrary: this.properties.isLibrary,
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

      fpsPinMenu: {
        defPinState: 'disabled',
        forcePinState: true,
        domElement: this.context.domElement,
        pageLayout: this.properties.pageLayout,
      }
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }



  
  /**
   * DD Provider: Step 7 - (10:45) add handleSwichSelected - handler for when things changed.
   * 1) Set value of selected Switch on the internal property
   * 2) Tell anybody who subscribed, that property changed
   */
   private handleSwitch = ( stats: IRefinerStat[], callBackID: string, refinerObj: IRefinerLayer, breadCrumb: string[] ) : void => {

    consoleRef( 'handleSwitch', refinerObj );
    let e = event; // eslint-disable-line @typescript-eslint/no-unused-vars

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
      let e = event; // eslint-disable-line @typescript-eslint/no-unused-vars

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

  
  /***
 *    d8888b. d88888b       .d8b.       db    db .d8888. d88888b d8888b. 
 *    88  `8D 88'          d8' `8b      88    88 88'  YP 88'     88  `8D 
 *    88oooY' 88ooooo      88ooo88      88    88 `8bo.   88ooooo 88oobY' 
 *    88~~~b. 88~~~~~      88~~~88      88    88   `Y8b. 88~~~~~ 88`8b   
 *    88   8D 88.          88   88      88b  d88 db   8D 88.     88 `88. 
 *    Y8888P' Y88888P      YP   YP      ~Y8888P' `8888Y' Y88888P 88   YD 
 *                                                                       
 *                                                                       
 */

   private _beAUserFunction() {
    console.log('_beAUserFunction:',   );
    if ( this.displayMode === DisplayMode.Edit ) {
      alert("'Be a regular user' mode is only available while viewing the page.  \n\nOnce you are out of Edit mode, please refresh the page (CTRL-F5) to reload the web part.");

    } else {
      this._beAReader = this._beAReader === true ? false : true;
      this.render();
    }

  }
  

  private async UpdateTitles(): Promise<boolean> {

    let listName = this.properties.parentListTitle ? this.properties.parentListTitle : 'ParentListTitle';
    const list = sp.web.lists.getByTitle(listName);
    const r = await list.fields();

    //2020-05-13:  Remove Active since it's replaced with StatusTMT which is not applicable here
    let defFields = ["Title","Author","Editor","Created","Modified"];
    let filterFields=[]; //["SSChoice1","SSChoiceA","MSChoice2","MSChoiceB"];
    if ( this.properties.refiner0 != '' ) { filterFields.push( this.properties.refiner0 ); } // eslint-disable-line eqeqeq
    if ( this.properties.refiner1 != '' ) { filterFields.push( this.properties.refiner1 ); } // eslint-disable-line eqeqeq
    if ( this.properties.refiner2 != '' ) { filterFields.push( this.properties.refiner2 ); } // eslint-disable-line eqeqeq

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


    /**
     * Copied from AdvancedPagePropertiesWebPart.ts
     * 
     * Hopefully resolves https://github.com/mikezimm/drilldown7/issues/184
     */
    
    protected async onPropertyPaneConfigurationStart(): Promise<void> {
      console.log(`onPropertyPaneConfigurationStart`);
      await this._getListDefintions(true, true);
      this.context.propertyPane.refresh();
    }


  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return propertyPaneBuilder.getPropertyPaneConfiguration(
  //     this.properties,
  //     this.UpdateTitles.bind(this),
  //     this._getListDefintions.bind(this),
  //     this._forceBanner, this._modifyBannerTitle, this._modifyBannerStyle
  //     );
  // }







  
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    // Log.Write(`getPropertyPaneConfiguration`);

    return {
      pages: [
        {
          // header: {
          //   description: strings.PropertyPaneDescription
          // },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: [
            WebPartInfoGroup( repoLink, 'Best TOC and Page Info available :)' ),
            buildPreConfigGroup( this.properties ), //End this group
            buildYourListGroup( ),
            buildPerformanceGroup( this.properties, ),
            buildRefinerGroup( this.properties, ),
            buildTogglesGroup( this.properties ),
            
            FPSBanner3VisHelpGroup( this.context, this.onPropertyPaneFieldChanged, this.properties ),
            FPSBanner4BasicGroup( this._forceBanner , this._modifyBannerTitle, this.properties.showBanner, this.properties.infoElementChoice === 'Text' ? true : false, true, true ),
            FPSBanner3NavGroup(), 
            FPSBanner3ThemeGroup( this._modifyBannerStyle, this.properties.showBanner, this.properties.lockStyles, false ),

            FPSOptionsGroupBasic( false, true, true, true, this.properties.allSectionMaxWidthEnable, true, this.properties.allSectionMarginEnable, true ), // this group
            FPSOptionsExpando( this.properties.enableExpandoramic, this.properties.enableExpandoramic,null, null ),
            // FPSOptionsExpando( this.properties.enableExpandoramic, this.properties.enableExpandoramic,null, null ),
  
            FPSImportPropsGroup, // this group
          ]
        },
        {
          // header: {
          //   description: strings.PropertyPaneDescription
          // },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: [
            buildCustomizeGroup(  ),
            buildRefinerInstructionsGroup( this.properties ),
            buildListGroupingGroup( ),
            buildViewGroupFields( 'Wide', 1),
            buildViewGroupFields( 'Medium', 2),
            buildViewGroupFields( 'Small', 3),

            buildViewTogglesGroup( this.properties ),
            buildStatsGroup( ),
            buildQuickCommandsGroup(),

            // FPSOptionsExpando( this.properties.enableExpandoramic, this.properties.enableExpandoramic,null, null ),
  
            FPSImportPropsGroup, // this group
          ]
        }
      ]
    };
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

      if ( this.properties.webPartScenario !== '' && this.properties.webPartScenario != null ) { // eslint-disable-line eqeqeq
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

    try {
      await validateDocumentationUrl ( this.properties, propertyPath , newValue );
    } catch(e) {
      alert('unalbe to validateDocumentationUrl' );
    }

    this.properties.webpartHistory = updateWebpartHistoryV2( this.properties.webpartHistory , propertyPath , newValue, this.context.pageContext.user.displayName, [], [] );

//    console.log('PropFieldChange:', propertyPath, oldValue, newValue);
    if (propertyPath === 'listDefinition' && newValue !== oldValue) {
      //alert("Hey! " +propertyPath +" new value is " + newValue);
      //this.properties.listTitle = "TitleChanged!";
      //this.properties.colTitleText = "TitleTextChanged!";

      this.properties.isLibrary = newValue.toLowerCase().indexOf('library') > -1 ? true : false;

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

                  //Replace any cases where I copied the hashed characters from JSON file directly. 
                  potentialValue = potentialValue.replace('\"','"'); // eslint-disable-line no-useless-escape

                  if ( typeof this.properties[thisWebPartProp] === 'boolean') {
                    if ( potentialValue === "true" ) { potentialValue = true; }
                    else if ( potentialValue === "false" ) { potentialValue = false; }
                  }

                  /**
                   * Deal with special cases where potentialValue needs to be converted to an array first.
                   */
                  if ( ['rules0','rules1','rules2'].indexOf(thisWebPartProp) > -1 ) { //These should be arrays of strings

                    if ( potentialValue !== null && potentialValue !== undefined ) {
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

                    if ( potentialValue !== null && potentialValue !== undefined ) {
                      potentialValue = JSON.parse(potentialValue);
                    } else { potentialValue = [] ; }

                    if ( thisWebPartProp === 'rules0' && potentialValue !== null) {
                      //rules0 was found in list item and so we should update rules0 in props.
                      this.properties.rules0 = potentialValue;
                    } else if ( thisWebPartProp === 'rules1' && potentialValue !== null) {
                      //rules0 was found in list item and so we should update rules0 in props.
                      this.properties.rules1 = potentialValue;
                    } else if ( thisWebPartProp === 'rules2' && potentialValue !== null) {
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
    } else if ( propertyPath === 'fpsImportProps' ) {
  
      this._importErrorMessage = updateFpsImportProps( this.properties, importBlockProps, propertyPath, newValue,
        this.context.propertyPane.refresh,
        this.onPropertyPaneConfigurationStart,
        this._exitPropPaneChanged,
      );

     } else if ( propertyPath === 'bannerStyle' || propertyPath === 'bannerCmdStyle' )  {

      refreshBannerStylesOnPropChange( this.properties, propertyPath, newValue, this.context.propertyPane.refresh );

    } else if (propertyPath === 'bannerStyleChoice')  {
      // bannerThemes, bannerThemeKeys, makeCSSPropPaneString

      updateBannerThemeStyles( this.properties , newValue, true, this.properties.defPinState, this._sitePresets.forces );

      if ( newValue === 'custom' || newValue === 'lock' ) {
        //Do nothing for these cases.
        
      } else {
        //Reset main web part styles to defaults

      }

    } else if ( propertyPath === 'parentListWeb' || propertyPath === 'parentListTitle' ) {
      let webUrl = propertyPath === 'parentListWeb' ? newValue : this.properties.parentListWeb;
      let parentWeb = webUrl && webUrl !== '' ? webUrl : this.context.pageContext.web.absoluteUrl;

      let listTitle = propertyPath === 'parentListTitle' ? newValue : this.properties.parentListTitle;

      let thisListWeb = Web( parentWeb );
      let thisListObject : any = thisListWeb.lists.getByTitle(listTitle);
      thisListObject.expand('RootFolder, ParentWeb').select('Title,RootFolder/ServerRelativeUrl, ParentWeb/Url').get().then( (response: any) => {
          let tenantURL = response.ParentWeb.Url.substring(0, response.ParentWeb.Url.indexOf('/sites/') );
          this.properties.parentListURL = tenantURL + response.RootFolder.ServerRelativeUrl;
          this.context.propertyPane.refresh();
      }).catch((e: any) => {
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
