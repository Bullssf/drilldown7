import * as React from 'react';
import * as ReactDom from 'react-dom';
import { SPPermission, } from '@microsoft/sp-page-context';

import {
  IPropertyPaneConfiguration, IPropertyPaneGroup,

} from '@microsoft/sp-property-pane';
// import { BaseClientSideWebPart,  } from '@microsoft/sp-webpart-base';
import {   
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ThemeProvider,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ThemeChangedEventArgs,
  IReadonlyTheme } from '@microsoft/sp-component-base';


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

import * as strings from 'DrilldownV2WebPartStrings';

import { IDrilldownV2WebPartProps } from './IDrilldownV2WebPartProps';
import DrilldownV2 from './components/Drill/drillComponent';
import { IDrilldownV2Props, IWhenToShowItems } from './components/Drill/IDrillProps';



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


import { IQuickButton, IQuickCommandsDesign, makeTheTimeObject, updatePerformanceEnd } from './fpsReferences';

import { doesObjectExistInArray, } from './fpsReferences';

import { getPreConfigItems } from '@mikezimm/fps-library-v2/lib/pnpjs/PreConfigItems/getPreConfig';

import { ICustViewDef, } from './fpsReferences';

import { IGrouping, } from "@pnp/spfx-controls-react/lib/ListView";
import { IViewFieldDD } from './fpsReferences';
import { buildQuickCommandsGroup } from './PropPaneGroups/Page2/QuickCommands';
import { buildAgeSliderGroup } from '@mikezimm/fps-library-v2/lib/components/atoms/FPSAgeSlider/FPSAgePropPaneGroup';

import { getNumberArrayFromString } from './fpsReferences';



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

 import { initializeIcons } from '@uifabric/icons';
 initializeIcons();
 
 require('@mikezimm/fps-styles/dist/GrayPropPaneAccordions.css');
 require('@mikezimm/fps-styles/dist/FPSPinMe.css');
 require('@mikezimm/fps-styles/dist/FPSHeadings.css');
 require('@mikezimm/fps-styles/dist/PropPanelHelp.css');
 require('@mikezimm/fps-styles/dist/performance.css');
 
 
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
  import { verifyAudienceVsUser, } from '@mikezimm/fps-library-v2/lib/logic/Users/CheckPermissions';
  import { PreConfiguredProps,  } from './CoreFPS/PreConfiguredSettings';

  import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
  import { getAllDefaultFPSFeatureGroups } from '@mikezimm/fps-library-v2/lib/banner/propPane/AllDefaultFPSGroups';

  import { WebPartInfoGroup, } from '@mikezimm/fps-library-v2/lib/banner/propPane/WebPartInfoGroup';

  import { exportIgnorePropsWP, importBlockPropsWP, WebPartAnalyticsChanges, WebPartPanelChanges,  } from './IDrilldownV2WebPartProps';

  import { gitRepoDrillDownSmall } from '@mikezimm/fps-library-v2/lib/components/atoms/Links/LinksRepos';
  import { runFPSSuperOnInit } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runSuperOnInit';
  import { runFPSWebPartRender } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runWebPartRender';
  import { onFPSPropPaneCHanged } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runOnPropChange';
  import { FPSBaseClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/FPSBaseClass';
  import { IThisFPSWebPartClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/IThisFPSWebPartClass';

  import { createAgeSliderWPProps } from '@mikezimm/fps-library-v2/lib/components/atoms/FPSAgeSlider/createAgeSliderWPProps';

  import { IMinFetchListProps } from '@mikezimm/fps-pnp2/lib/services/sp/fetch/lists/fetchListProps';
  import { getSourceList, IGetMinSourceListReturn } from '@mikezimm/fps-library-v2/lib/pnpjs/Lists/getList/getSourceList';
  import { Version } from '@microsoft/sp-core-library';
// import { convertLegacyProps, LegacyPropChanges } from './CoreFPS/LegacyPropChanges';
import { saveLegacyAnalytics } from './CoreFPS/Analytics';


export default class DrilldownV2WebPart extends FPSBaseClass<IDrilldownV2WebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _quickCommands : IQuickCommandsDesign = null;

  private _themeVariant: IReadonlyTheme | undefined;

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

    this._repoLink = gitRepoDrillDownSmall; //Set as any but will get created in FPSSuperOnOnit
    this._exportIgnorePropsWP = exportIgnorePropsWP;
    this._importBlockPropsWP = importBlockPropsWP;
    this._trickyApp = 'FPS UPDATE FPSBaseClass';
    this._trickyEmailsWP = []; // These are emails that get tricky functionality for this specific web part
    this._allowPinMe = true;
    this._allowFieldPanel = 'Auto';
    this._FieldPanelDesignMode = 'Disabled';
    this._FieldPanelWebProp = 'webUrl';
    this._FieldPanelListProp = 'listTitle'
    this._allowSiteThemeChoice = true;

    return super.onInit().then(_ => {

      /**
       *
       * DO NOT REMOVE UNTIL LATE 2023 - VERIFY LegacyUpdates Analytics list for web parts using old props
       * THIS SECTION WAS ADDED DUE TO Property name changed
       *  https://github.com/mikezimm/drilldown7/issues/300
       */
      const legacyUpdates: any[] = [];
      if ( !this.properties.webUrl && this.properties[`parentListWeb`] ) { 
        this.properties.webUrl = `${this.properties[`parentListWeb`]}`;
        legacyUpdates.push( { webUrl : `${this.properties[`parentListWeb`]}` } );
      }
      if ( !this.properties.listTitle && this.properties[`parentListTitle`] ) { 
        this.properties.listTitle = `${this.properties[`parentListTitle`]}`;
        legacyUpdates.push( { listTitle : `${this.properties[`parentListTitle`]}` } );
      }
      if ( !this.properties.listUrl && this.properties[`parentListURL`] ) { 
        this.properties.listUrl = `${this.properties[`parentListURL`]}`;
        legacyUpdates.push( { listUrl : `${this.properties[`parentListURL`]}` } );
      }
      if ( legacyUpdates.length > 0 ) {
        saveLegacyAnalytics( 'Drilldown >= 2.2.0.3', 'Required', this as any, legacyUpdates );
      }

      runFPSSuperOnInit( this as any, PreConfiguredProps, SPPermission );

      this.getQuickCommandsObject( 'Group Quick Commands', this.properties.quickCommands);

    });

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


  public getQuickCommandsObject( message: string, str: string ): IQuickCommandsDesign {

    let result : IQuickCommandsDesign = undefined;

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

              const thisButtonObject = JSON.parse(JSON.stringify( thisButtonObjectOriginal ));

              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const strPrev: RegExp = thisButtonObject.strPrev ? new RegExp(`{strPrev}`,'gi') : undefined;
              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const str1: RegExp = thisButtonObject.str1 ? new RegExp(`{str1}`,'gi') : undefined;
              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const str2: RegExp = thisButtonObject.str2 ? new RegExp(`{str2}`,'gi') : undefined;
              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const str3: RegExp = thisButtonObject.str3 ? new RegExp(`{str3}`,'gi') : undefined;
              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const strNext: RegExp = thisButtonObject.strNext ? new RegExp(`{strNext}`,'gi') : undefined;

              Object.keys( thisButtonObject ).map( (key: string) => {

                if ( [ 'strPrev', 'str1', 'str2', 'str3', 'strNext', ].indexOf( key ) < 0 ) {
                  let oldValue: any = thisButtonObject[key] ;

                  if ( typeof oldValue === 'string' ) {
                    if ( strPrev ) oldValue = oldValue.replace( strPrev, thisButtonObject.strPrev.toString() );
                    if ( str1 ) oldValue = oldValue.replace( str1, thisButtonObject.str1.toString() );
                    if ( str2 ) oldValue = oldValue.replace( str2, thisButtonObject.str2.toString() );
                    if ( str3 ) oldValue = oldValue.replace( str3, thisButtonObject.str3.toString() );
                    if ( strNext ) oldValue = oldValue.replace( strNext, thisButtonObject.strNext.toString() );
                    thisButtonObjectOriginal[key] = oldValue;
  
                  } else if ( typeof oldValue === 'object' || Array.isArray( oldValue ) ) {
                    let objString = JSON.stringify( oldValue ); //Stringify to update all children
                    if ( strPrev ) objString = objString.replace( strPrev, thisButtonObject.strPrev.toString() );
                    if ( str1 ) objString = objString.replace( str1, thisButtonObject.str1.toString() );
                    if ( str2 ) objString = objString.replace( str2, thisButtonObject.str2.toString() );
                    if ( str3 ) objString = objString.replace( str3, thisButtonObject.str3.toString() );
                    if ( strNext ) objString = objString.replace( strNext, thisButtonObject.strNext.toString() );
                    thisButtonObjectOriginal[key] = JSON.parse( objString );
                  }
                }

              });
            });
          }
        });
      }

      this._quickCommands = result;

      if ( this.properties.quickCommands.indexOf('sourceUserInfo') > 1 || 
        // Needed to add these for later https://github.com/mikezimm/drilldown7/issues/225
        this.properties.quickCommands.indexOf('[MyName]') > 1 || 
        this.properties.quickCommands.indexOf('$MyName$') > 1 || 
        this.properties.quickCommands.match(/{{.*?append\s.*?}}/i  ) 
      ) {
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
  public getViewFieldsObject(message: string, str: string, grp: string ): IViewFieldDD[] {

    let result : IViewFieldDD[] = undefined;
    
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


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bannerProps = runFPSWebPartRender( this as any, strings, WebPartAnalyticsChanges, WebPartPanelChanges, );


    let errMessage = '';
    //Be sure to always pass down an actual URL if the webpart prop is empty at this point.
    //If it's undefined, null or '', get current page context value
    const parentWeb = this.properties.webUrl && this.properties.webUrl != '' ? this.properties.webUrl : this.context.pageContext.web.absoluteUrl; // eslint-disable-line eqeqeq

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
    const viewFields2Any : any[] = this.properties.syncViews === true ? viewFields1Any : this.getViewFieldsObject('Med Size view', this.properties.viewJSON2, this.properties.groupByFields );
    const viewFields3Any : any[] = this.properties.syncViews === true ? viewFields1Any : this.getViewFieldsObject('Small Size view', this.properties.viewJSON3, this.properties.groupByFields );

    let viewFields1 : IViewFieldDD[] = viewFields1Any;
    let viewFields2 : IViewFieldDD[] = viewFields2Any;
    let viewFields3 : IViewFieldDD[] = viewFields3Any;

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

     console.log('verifyAudienceVsUser - _FPSUser', this._FPSUser);
     console.log('verifyAudienceVsUser - showTricks', bannerProps.showTricks);
     console.log('verifyAudienceVsUser - detailsAudience', this.properties.detailsAudience);
     console.log('verifyAudienceVsUser - null', null);
     console.log('verifyAudienceVsUser - _beAReader', this._beAReader);

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


    // This seems to be a duplicate of the line below before const element... so removing from here
    // this._performance.ops.renderWebPartStart = updatePerformanceEnd( this._performance.ops.renderWebPartStart, true, null );

    this._performance.getAllProps =this.properties.getAllProps ;

    let language = this.properties.language;
    try {
      language = language.toLowerCase();
    } catch( e ) {
      console.log('Unable to convert language to lower case.' );
    }

    /** 
     * PERFORMANCE - UPDATE
     * This is how you can UPDATE a performance snapshot - make the _performance.ops.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
     * NOTE IN THIS CASE to do it before you refreshPanelHTML :)
     */
    this._performance.ops.renderWebPartStart = updatePerformanceEnd( this._performance.ops.renderWebPartStart, true, 555 );


    const element: React.ReactElement<IDrilldownV2Props> = React.createElement(
      DrilldownV2,
      {
        /**
         * Default 1.14 properties
         */
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        themeVariant: this._themeVariant,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,



        loadPerformance: this._performance,

        bannerProps: bannerProps,

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
            fetchNewer: this.properties.fetchNewer,
            itemsPerPage: this.properties.itemsPerPage,
            fetchCountMobile: this.properties.fetchCountMobile,
            getAllProps: this.properties.getAllProps,
            restFilter: !this.properties.restFilter ? '' : this.properties.restFilter,
            evalFilter: !this.properties.evalFilter ? '' : this.properties.evalFilter,
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
        listTitle: this.properties.listTitle,
        isLibrary: this.properties.isLibrary,
        webUrl: parentWeb,
        listUrl: this.properties.listUrl,
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

        richHeights: getNumberArrayFromString( this.properties.richHeight, ';', true, true, 'asis', 2 ),
        autoRichHeight: this.properties.autoRichHeight,

        WebpartHeight: this.domElement.getBoundingClientRect().height ,
        WebpartWidth:  this.domElement.getBoundingClientRect().width - 50 ,

        pivotSize: this.properties.pivotSize,
        pivotFormat: this.properties.pivotFormat,
        pivotOptions: this.properties.pivotOptions,
        pivotTab: 'Projects', //this.properties.pivotTab (was setTab in pivot-tiles)


        ageSliderWPProps: createAgeSliderWPProps( this.properties ),
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



  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // https://dreamsof.dev/2020-09-21-typescript-upgrade-breaking-dataversion-get-override-spfx11/
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
      this.properties.newMap = await getPreConfigItems( this.properties, 'DrilldownPreConfigProps' );
      this.context.propertyPane.refresh();
    }



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias
    const thisAsAny: IThisFPSWebPartClass = this as any;
    let groups: IPropertyPaneGroup[] = [ WebPartInfoGroup( this._repoLink, 'Sample FPS Banner component :)', PropertyPaneWebPartInformation ) ];
    const FPSGroups: IPropertyPaneGroup[] = getAllDefaultFPSFeatureGroups ( thisAsAny );

    const DrillGroups1 : IPropertyPaneGroup[] = [
      buildPreConfigGroup( this.properties ), //End this group
      buildYourListGroup( ),
      buildPerformanceGroup( this.properties, ),
      buildRefinerGroup( this.properties, ),
      buildTogglesGroup( this.properties ),
    ];

    groups = [ ...groups, ...DrillGroups1, ...FPSGroups ];

    return {
      pages: [
        {
          // header: {
          //   description: strings.PropertyPaneDescription
          // },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: groups
        },
        {
          // header: {
          //   description: strings.PropertyPaneDescription
          // },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: [
            buildCustomizeGroup(  ),
            buildRefinerInstructionsGroup( this.properties ),
            buildAgeSliderGroup( this.properties ),
            buildListGroupingGroup( ),
            buildViewGroupFields( 'Wide', 1, true, false ),
            buildViewGroupFields( 'Medium', 2, false, this.properties.syncViews ),
            buildViewGroupFields( 'Small', 3, false, this.properties.syncViews ),

            buildViewTogglesGroup( this.properties ),
            buildStatsGroup( ),
            buildQuickCommandsGroup(),

          ]
        }
      ]
    };
  }

  
  // //runAsync is an idea that is not currently being used.
  // protected async _getListDefintions(forceUpdate: boolean, runAsync: boolean) {
  //   /**
  //    * This section is for Templated properties
  //    */

  //   let newMap = [];
  //   if ( !this.properties.newMap || forceUpdate === true ) { 
  //     console.log('GETTING LIST DEFINITIONS');
  //     let configWebURL = this.context.pageContext.site.absoluteUrl;
  //     configWebURL = configWebURL.substring( 0, configWebURL.indexOf('/sites/') );
  //     configWebURL += '/sites/PreConfigProps/';

  //     let thisProps: string[] = Object.keys( this.properties );

  //     let restFilterLD = '';

  //     if ( this.properties.webPartScenario !== '' && this.properties.webPartScenario != null ) { // eslint-disable-line eqeqeq
  //       //newMap = getAllItems(configWebURL, 'DrilldownPreConfigProps', thisProps );
  //       restFilterLD = "webPartScenario eq '" + this.properties.webPartScenario + "'";
  //       // console.log('_getListDefintions restFilterLD:', restFilterLD );
  //     }

  //     //Must remove 'newMap' from props because it's one can't be mapped.
  //     //let newMapIdx = thisProps.indexOf('newMap');
  //     //if (newMapIdx > -1) { thisProps.splice(newMapIdx, 1); }

  //     //if ( runAsync === true ) {
  //       newMap = await getAllItems(configWebURL, 'DrilldownPreConfigProps', thisProps, restFilterLD, runAsync );
  //     //} else {
  //     //  newMap = getAllItems(configWebURL, 'DrilldownPreConfigProps', thisProps, runAsync );
  //     //}

  //     this.properties.newMap = newMap;
  //     // console.log('this.properties.newMap:',  this.properties.newMap );

  //   } else {
  //     console.log('NOT GETTING LIST DEFINITIONS, already fetched:', this.properties.newMap);
  //     newMap = this.properties.newMap;

  //   }
  //   return newMap;
  // }

  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any) {
    //Added super during fps-library-v2 update because it was found in the Pnpjs-v2Upgrade webpart
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await onFPSPropPaneCHanged( this as any, propertyPath, oldValue, newValue );

    this.context.propertyPane.refresh();


//    console.log('PropFieldChange:', propertyPath, oldValue, newValue);
    if (propertyPath === 'listDefinition' && newValue !== oldValue) {

      this.properties.isLibrary = newValue.toLowerCase().indexOf('library') > -1 ? true : false;

      let thisProps: string[] = Object.keys( this.properties );
      const hasValues = Object.keys(this.properties.newMap).length;

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
      } else {
        console.log('Did NOT List Defintion... updating column name props');

      }

      this.context.propertyPane.refresh();

    }

    if ( propertyPath === 'listDefinition' || propertyPath === 'webUrl' || propertyPath === 'listTitle' ) {
      let webUrl = propertyPath === 'webUrl' ? newValue : this.properties.webUrl;
      let parentWeb = webUrl && webUrl !== '' ? webUrl : this.context.pageContext.web.absoluteUrl;

      let listTitle = propertyPath === 'listTitle' ? newValue : this.properties.listTitle;

      const fetchProps: IMinFetchListProps = {
        webUrl: parentWeb,
        listTitle: listTitle,
        selectThese: [ 'Title', 'RootFolder/ServerRelativeUrl', 'ParentWebUrl', ],
        expandThese: [ 'RootFolder' ],
      }

      const FetchList: IGetMinSourceListReturn = await getSourceList( fetchProps, false, true );

      if ( FetchList.status === 'Success' ) {

        this.properties.listUrl = `${window.location.origin}${FetchList.list.RootFolder.ServerRelativeUrl}`;
        this.properties.isLibrary = FetchList.list.BaseType === 1 ? true : false;
        this.context.propertyPane.refresh();
      } else if ( FetchList.status === 'Error' ) {
        let errMessage = FetchList.errorInfo.friendly;
        console.log(errMessage);
        if (errMessage.indexOf('missing a column') > -1) {

        } else {

        }
      }

    } else if ( propertyPath === 'viewJSON1' || propertyPath === 'syncViews' ) {  //Update viewJSON if synced is selected

      let doSync = propertyPath === 'syncViews' ? newValue : this.properties.syncViews;

      if ( doSync === true ) {
        if ( propertyPath === 'viewJSON1' ) { this.properties.viewJSON1 = newValue; }
        const syncValue = propertyPath === 'viewJSON1' ? newValue : this.properties.viewJSON1;
        this.properties.viewJSON2 = syncValue;
        this.properties.viewJSON3 = syncValue;

      }

    }

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'setSize','setTab','otherTab','setTab','otherTab','setTab','otherTab','setTab','otherTab',
      'parentListFieldTitles','progress','UpdateTitles','listTitle','webUrl','childListWeb', 'stats',
      'rules0','rules1','rules2', 'syncViews',
      'togRefinerCounts', 'togCountChart', 'togStats', 'togOtherListview', 'togOtherChartpart',
      'fetchCount', 'fetchCountMobile', 'restFilter', 'quickCommands', 'definitionToggle', 'includeListLink',
    ];

    if ( propertyPath === 'quickCommands' ) {
      this.getQuickCommandsObject( 'Group Quick Commands', this.properties.quickCommands);
    }

    console.log('onPropertyPaneFieldChanged:', propertyPath, oldValue, newValue);
    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works

    }
    this.render();
  }

}
