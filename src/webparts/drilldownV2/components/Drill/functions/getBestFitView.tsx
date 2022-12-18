// import { IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
// import { IViewFieldDD } from '../reactListView';
// import { ICustViewDef } from '@mikezimm/npmfunctions/dist/Views/IListViews';

// /***
//  *     d888b  d88888b d888888b      db    db d888888b d88888b db   d8b   db      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888.
//  *    88' Y8b 88'     `~~88~~'      88    88   `88'   88'     88   I8I   88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP
//  *    88      88ooooo    88         Y8    8P    88    88ooooo 88   I8I   88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.
//  *    88  ooo 88~~~~~    88         `8b  d8'    88    88~~~~~ Y8   I8I   88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b.
//  *    88. ~8~ 88.        88          `8bd8'    .88.   88.     `8b d8'8b d8'      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D
//  *     Y888P  Y88888P    YP            YP    Y888888P Y88888P  `8b8' `8d8'       YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y'
//  *
//  *
//  */
// function getBestFitView(OrigViewDefs: ICustViewDef[], currentWidth: number) {

//   /**
//    * 2022-01-18:  Something in this function mutates the viewDefs which caused the webpart to crash after
//    */
//   //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  getBestFitView  (One of these fixed it!)
//   let viewDefs: ICustViewDef[] = JSON.parse(JSON.stringify(OrigViewDefs));
//   let result: ICustViewDef = null;
//   let minResult: ICustViewDef = null;

//   let maxViewWidth: number = 0;
//   let minViewWidth: number = 10000;

//   viewDefs.map(vd => {
//     let thisWidth: number = typeof vd.minWidth === 'string' ? parseInt(vd.minWidth, 10) : vd.minWidth;
//     if (currentWidth >= thisWidth && thisWidth >= maxViewWidth) {
//       result = vd;
//       maxViewWidth = thisWidth;
//     }
//   });

//   //This section was created in case the webpart width is smaller than the smallest defined width
//   if (result === null) {
//     console.log('getAppropriateViewFields ERR:  User defined are to big for this webpart width.');
//     viewDefs.map(vd => {
//       let thisWidth: number = typeof vd.minWidth === 'string' ? parseInt(vd.minWidth, 10) : vd.minWidth;
//       if (thisWidth < minViewWidth) {
//         minResult = vd;
//         minViewWidth = thisWidth;
//       }
//     });
//     result = minResult;
//   }

//   // console.log('getAppropriateViewFields: currentWidth = ', currentWidth);
//   // console.log('getAppropriateViewFields: Width >= ', maxViewWidth);
//   // console.log('getAppropriateViewFields: vd result', result);
//   return result;

// }


// export function getAppropriateViewFields(OrigViewDefs: ICustViewDef[], currentWidth: number) {

//   //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  (One of these fixed it!)
//   //2022-01-18:  Skipped the parse/stringify for performance after determining it was not causing the crash.
//   let viewDefs: ICustViewDef[] = OrigViewDefs; //JSON.parse(JSON.stringify(OrigViewDefs));

//   let result: IViewFieldDD[] = [];

//   if (viewDefs) {

//     let viewFields: any[] = getBestFitView(viewDefs, currentWidth).viewFields;
//     result = viewFields as IViewFieldDD[];

//     let avgWidth = result.length > 0 ? currentWidth / result.length : 100;
//     let completeResult = result.map(f => {

//       let thisField = f;
//       let minWidth = thisField.minWidth ? thisField.minWidth : avgWidth;
//       let maxWidth = thisField.maxWidth ? thisField.maxWidth : minWidth + 100;
//       if (thisField.minWidth === undefined) { thisField.minWidth = minWidth; }
//       if (thisField.maxWidth === undefined) { thisField.maxWidth = maxWidth; }
//       if (thisField.isResizable === undefined) { thisField.isResizable = true; }
//       if (thisField.sorting === undefined) { thisField.sorting = true; }
//       return thisField;
//     });
//     /*        */
//     console.log('getAppropriateViewFields: completeResult', completeResult);

//     return completeResult;

//   } else {
//     alert('View Def is not available... can not show any items! - see getAppropriateViewFields()');
//     return null;
//   }

// }

// export function getAppropriateViewGroups(OrigViewDefs: ICustViewDef[], currentWidth: number) {

//   //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  (One of these fixed it!)
//   //2022-01-18:  Skipped the parse/stringify for performance after determining it was not causing the crash.
//   let viewDefs: ICustViewDef[] = OrigViewDefs; //JSON.parse(JSON.stringify(OrigViewDefs));

//   let result: IGrouping[] = [];

//   if (viewDefs) {

//     result = getBestFitView(viewDefs, currentWidth).groupByFields;
//     //console.log('getAppropriateViewGroups: ', result);
//     return result;

//   } else {
//     alert('View Def is not available... can not show any items! - see getAppropriateViewGroups()');
//     return null;
//   }

// }
// //Check npmFunctions v2.1.63 for ICustViewDefKeys to replace prop interface

// export function getAppropriateViewProp(OrigViewDefs: ICustViewDef[], currentWidth: number, prop: 'includeDetails' | 'includeAttach' | 'includeListLink' | 'createItemLink') {

//   //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  (One of these fixed it!)
//   //2022-01-18:  Skipped the parse/stringify for performance after determining it was not causing the crash.
//   let viewDefs: ICustViewDef[] = OrigViewDefs; // JSON.parse(JSON.stringify(OrigViewDefs));

//   let result: boolean = false;

//   if (viewDefs) {
//     result = getBestFitView(viewDefs, currentWidth)[prop];
//     //console.log('getAppropriateDetailMode: ', result);
//     return result;
//   } else {
//     alert('View Def is not available... can not show any items! - see getAppropriateViewProp()');
//     return null;
//   }
// }
