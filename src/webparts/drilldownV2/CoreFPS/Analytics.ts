
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

import { IDrillDownProps } from '../components/Drill/IDrillProps';
import { saveAnalytics3, IZLoadAnalytics, IZSentAnalytics, getMinPerformanceString } from '../fpsReferences';
import { ILoadPerformance, } from '../fpsReferences';
// import { LoadPerformanceOps, IMinPerformance, IMinPerformanceSetting, IMinPerformanceSettingLabels, IMinPerformanceSettingLabelSS7 } from '../fpsReferences';


/***
 *    db       .d88b.   .o88b.  .d8b.  db      
 *    88      .8P  Y8. d8P  Y8 d8' `8b 88      
 *    88      88    88 8P      88ooo88 88      
 *    88      88    88 8b      88~~~88 88      
 *    88booo. `8b  d8' Y8b  d8 88   88 88booo. 
 *    Y88888P  `Y88P'   `Y88P' YP   YP Y88888P 
 *                                             
 *                                             
 */

//  import { buildExportProps, buildFPSAnalyticsProps } from './BuildExportProps';


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


//  export function getMinPerformanceString( performanceObj: ILoadPerformance, capMS: number = 7000, capValue: any = 'paused?' ) : string {

//   let minPerformanceString = '';

//   if ( performanceObj ) {
//     const minPerformance : IMinPerformance = getMinPerformance( performanceObj , capMS, capValue );
//     minPerformanceString = JSON.stringify( minPerformance );
//   }

//   return minPerformanceString;

// }

// /**
//  * 
//  * @param performanceObj: ILoadPerformance 
//  * @capMS - max Milliseconds to save.... else return 'error' or null for that value.
//  * @capValue - if ms value exceeds capMS, return this value in place of value
//  * @returns 
//  */

// export function getMinPerformance( performanceObj: any, capMS: number = 7000, capValue: any = 'paused?' ) : IMinPerformance {

//   const minPerformance : IMinPerformance = {
//     mode: null as any,
//   };

//   if ( performanceObj && performanceObj.mode ) {
//     minPerformance.mode = performanceObj.mode ;
//   }

//   const keys: string[] = Object.keys( performanceObj );

//   keys.map( ( key : any ) => {
//     if ( LoadPerformanceOps.indexOf(key) > -1 ) {
//       const thisKey: any = key;
//       if ( key.indexOf( 'setting')  === 0 ) {

//         minPerformance[ thisKey ] = performanceObj[key] ;

//       } else if ( performanceObj[key] ) {

//         const ms: number  = performanceObj[key]['ms'] && performanceObj[key]['ms'] <= capMS ? performanceObj[key]['ms'] : capValue;

//         minPerformance[ thisKey ] = {
//           label: performanceObj[key]['label'],
//           ms: ms,
//         };

//       }
//     }
//   });

//   return minPerformance;

// }


export const CodeVersion = 'v1.3.2.3 +';  //  ==>  https://github.com/mikezimm/drilldown7/issues/190
export function saveViewAnalytics( Title: string, Result: string, thisProps: IDrillDownProps, analyticsWasExecuted: boolean, performanceObj: ILoadPerformance ) : boolean {

  if ( analyticsWasExecuted === true ) {
    console.log('saved view info already');

  } else {

    const {  context, displayMode, FPSPropsObj } = thisProps;

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
    // {
    //   mode: null,
    // };

    // if ( performanceObj && performanceObj.mode ) {
    //   minPerformance.mode = performanceObj.mode ;
    // }

    // Object.keys( performanceObj ).map( ( key : any ) => {
    //   if ( LoadPerformanceOps.indexOf(key) > -1 ) {
    //     if ( performanceObj[key] ) {
    //       minPerformance[key] = {
    //         label: performanceObj[key]['label'],
    //         ms: performanceObj[key]['ms'],
    //       };
    //     }
    //   }
    // });

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
    const FPSProps = JSON.stringify( FPSPropsObj );

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

    saveAnalytics3( analyticsWeb , `${analyticsViewsList}` , saveObject, true );

    const saved = true;
    console.log('saved view info');
    return saved;

  }

}

