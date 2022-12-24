
import { DisplayMode, } from '@microsoft/sp-core-library';

/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *                                                                                          
 *                                                                                          
 */

import { IDrilldownV2Props } from '../components/Drill/IDrillProps';
import { check4Gulp, ILoadPerformance, } from '../fpsReferences';
import { saveAnalytics3, getMinPerformanceString } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/saveAnalytics';
import { IZLoadAnalytics, IZSentAnalytics, } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/interfaces';
import { IThisFPSWebPartClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/IThisFPSWebPartClass';

export const analyticsViewsList: string = "Drilldown";
export const analyticsWeb: string = "/sites/Templates/Analytics/";

/***
 *     .d8b.  d8b   db  .d8b.  db      db    db d888888b d888888b  .o88b. .d8888. 
 *    d8' `8b 888o  88 d8' `8b 88      `8b  d8' `~~88~~'   `88'   d8P  Y8 88'  YP 
 *    88ooo88 88V8o 88 88ooo88 88       `8bd8'     88       88    8P      `8bo.   
 *    88~~~88 88 V8o88 88~~~88 88         88       88       88    8b        `Y8b. 
 *    88   88 88  V888 88   88 88booo.    88       88      .88.   Y8b  d8 db   8D 
 *    YP   YP VP   V8P YP   YP Y88888P    YP       YP    Y888888P  `Y88P' `8888Y' 
 *                                                                                
 *                                                                                
 */

export const CodeVersion = 'v2.1.0.0 +';  //  ==>  https://github.com/mikezimm/drilldown7/issues/190
export function saveViewAnalytics( Title: string, Result: string, thisProps: IDrilldownV2Props, analyticsWasExecuted: boolean, performanceObj: ILoadPerformance ) : boolean {

  if ( analyticsWasExecuted === true ) {
    console.log('saved view info already');

  } else {

    const {  context, displayMode, analyticsProps } = thisProps.bannerProps;

    // Do not save anlytics while in Edit Mode... only after save and page reloads
    if ( displayMode === DisplayMode.Edit ) { return; }

    const loadProperties: IZLoadAnalytics = {
      SiteID: context.pageContext.site.id['_guid'] as any,  //Current site collection ID for easy filtering in large list
      WebID:  context.pageContext.web.id['_guid'] as any,  //Current web ID for easy filtering in large list
      SiteTitle:  context.pageContext.web.title as any, //Web Title
      TargetSite:  context.pageContext.web.serverRelativeUrl,  //Saved as link column.  Displayed as Relative Url
      ListID:  `${context.pageContext.list.id}`,  //Current list ID for easy filtering in large list
      ListTitle:  context.pageContext.list.title,
      TargetList: `${context.pageContext.web.serverRelativeUrl}`,  //Saved as link column.  Displayed as Relative Url

    };


    const zzzRichText1Obj: any = null;
    const zzzRichText2Obj: any = null;
    const zzzRichText3Obj: any = null;

    console.log( 'zzzRichText1Obj:', zzzRichText1Obj);
    console.log( 'zzzRichText2Obj:', zzzRichText2Obj);
    console.log( 'zzzRichText3Obj:', zzzRichText3Obj);

    const performance : string = getMinPerformanceString( performanceObj );

    // let FPSProps: string = analyticsProps;

    let FPSProps: string = null;
    if ( analyticsProps ) {
      try {
        FPSProps = JSON.stringify( analyticsProps );
      } catch(e) {
        if ( check4Gulp() === true ) {
          alert( 'Unable to stringify FPSProps in analytics' );
        }
      }
    }

    // let performance = minPerformance ? JSON.stringify( minPerformance ) : null;
    let zzzRichText1 = '';
    let zzzRichText2 = '';
    let zzzRichText3 = '';

    //This will get rid of all the escaped characters in the summary (since it's all numbers)
    // let zzzRichText3 = ''; //JSON.stringify( fetchInfo.summary ).replace('\\','');
    //This will get rid of the leading and trailing quotes which have to be removed to make it real json object
    // zzzRichText3 = zzzRichText3.slice(1, zzzRichText3.length - 1);

    if ( zzzRichText1Obj ) { zzzRichText1 = JSON.stringify( zzzRichText1Obj ); }
    if ( zzzRichText2Obj ) { zzzRichText2 = JSON.stringify( zzzRichText2Obj ); }
    if ( zzzRichText3Obj ) { zzzRichText3 = JSON.stringify( zzzRichText3Obj ); }

    console.log('zzzRichText1 length:', zzzRichText1 ? zzzRichText1.length : 0 );
    console.log('zzzRichText2 length:', zzzRichText2 ? zzzRichText2.length : 0 );
    console.log('zzzRichText3 length:', zzzRichText3 ? zzzRichText3.length : 0 );

    // let FPSProps = null;
    // let FPSPropsObj = buildFPSAnalyticsProps( thisProps, this.wpInstanceID, context.pageContext.web.serverRelativeUrl );
    // const FPSProps = JSON.stringify( FPSPropsObj );

    const saveObject: IZSentAnalytics = {
      loadProperties: loadProperties,

      Title: Title,  //General Label used to identify what analytics you are saving:  such as Web Permissions or List Permissions.

      Result: Result,  //Success or Error

      // zzzText1: `${ this.properties.defPinState } - ${ this.properties.forcePinState ===  true ? 'forced' : '' }`,

      // zzzText2: `${ this.properties.showTOC } - ${  ( this.properties.tocExpanded  ===  true ? 'expanded' : '' ) } - ${  !this.properties.TOCTitleField ? 'Empty Title' : this.properties.TOCTitleField }`,
      // zzzText3: `${ this.properties.minHeadingToShow }`,

      // zzzText4: `${ this.properties.showSomeProps } - ${ this.properties.propsExpanded  ===  true ? 'expanded' : 'collapsed' } -${ !this.properties.propsTitleField ? 'Empty Title' : this.properties.propsTitleField }`,
      // zzzText5: `${ this.properties.showOOTBProps } - ${ this.properties.showCustomProps } - ${ this.properties.showApprovalProps }}`,

      // //Info1 in some webparts.  Simple category defining results.   Like Unique / Inherited / Collection
      // zzzText6: `${   this.properties.selectedProperties.join('; ') }`, //Info2 in some webparts.  Phrase describing important details such as "Time to check old Permissions: 86 snaps / 353ms"

      // zzzNumber1: fetchInfo.fetchTime,
      // zzzNumber2: fetchInfo.regexTime,
      // zzzNumber3: fetchInfo.Block.length,
      // zzzNumber4: fetchInfo.Warn.length,
      // zzzNumber5: fetchInfo.Verify.length,
      // zzzNumber6: fetchInfo.Secure.length,
      // zzzNumber7: fetchInfo.js.length,

      zzzRichText1: zzzRichText1,  //Used to store JSON objects for later use, will be stringified
      zzzRichText2: zzzRichText2,
      zzzRichText3: zzzRichText3,

      CodeVersion: CodeVersion,  //  ==>  https://github.com/mikezimm/drilldown7/issues/190

      performance: performance,

      FPSProps: FPSProps,

    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = saveAnalytics3( analyticsWeb , `${analyticsViewsList}` , saveObject, true );
 
    const saved = true;
    console.log('saved view info' );
    return saved;

  }

}

export const LegacyUpdatesList: string = 'LegacyUpdates';

export function saveLegacyAnalytics( Title: string, Result: string, WPClass: IThisFPSWebPartClass, legacyProps: any ) : boolean {

  if ( !legacyProps || legacyProps.length === 0 ) { return ; }

  // Do not save anlytics while in Edit Mode... only after save and page reloads
  if ( WPClass.displayMode === DisplayMode.Edit ) { return; }

  const loadProperties: IZLoadAnalytics = {
    SiteID: WPClass.context.pageContext.site.id['_guid'] as any,  //Current site collection ID for easy filtering in large list
    WebID:  WPClass.context.pageContext.web.id['_guid'] as any,  //Current web ID for easy filtering in large list
    SiteTitle:  WPClass.context.pageContext.web.title as any, //Web Title
    TargetSite:  WPClass.context.pageContext.web.serverRelativeUrl,  //Saved as link column.  Displayed as Relative Url
    ListID:  `${WPClass.context.pageContext.list.id}`,  //Current list ID for easy filtering in large list
    ListTitle:  WPClass.context.pageContext.list.title,
    TargetList: `${WPClass.context.pageContext.web.serverRelativeUrl}`,  //Saved as link column.  Displayed as Relative Url

  };

  const zzzRichText1Obj: any = legacyProps;

  console.log( 'zzzRichText1Obj:', zzzRichText1Obj);

  const zzzRichText1 = zzzRichText1Obj ? JSON.stringify( zzzRichText1Obj ) : '';

  console.log('zzzRichText1 length:', zzzRichText1 ? zzzRichText1.length : 0 );

  const saveObject: IZSentAnalytics = {
    loadProperties: loadProperties,
    Title: Title,  //General Label used to identify what analytics you are saving:  such as Web Permissions or List Permissions.
    Result: Result,  //Success or Error
    zzzRichText1: zzzRichText1,  //Used to store JSON objects for later use, will be stringified
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = saveAnalytics3( analyticsWeb , `${LegacyUpdatesList}` , saveObject, true );

  const saved = true;
  console.log('saved view info' );
  return saved;


}
