// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';
// import { IRefinerRulesStrs, IRefinerRulesInts, IRefinerRulesNums, IRefinerRulesTime, IRefinerRulesUser, IRefinerRulesEXPE, IRefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';
// import { RefinerRulesStrs, RefinerRulesInts, RefinerRulesNums, RefinerRulesTime, RefinerRulesUser,  } from '../../fpsReferences';
// const padRight15: React.CSSProperties = { paddingRight: '15px' };

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem headerText={ 'Refiner Rules' } > 
//   <div className={ 'fps-pph-content' }>
//       <div className={ 'fps-pph-topic' }>Rules are like calculated columns without the work - Only applies to refiners.</div>
//       <div><b>Example:</b>  If you have a date column, actual dates or times are not good refiners because they typically will have to many values to choose from.<br/>
//       {escape(`However if you apply a rule like 'groupByYears', it will bucket all your items into years based on the values in the column.`)}<br/></div>
//       <div><b>NOTE:</b>{escape(`  The web part only shows refiners based on the items it intially reads in. So in the case of 'groupByYears', `)}<b>you will not see a year if there are no items for that year</b>.</div>
//       <div><b>parseBy...</b> will take a string column and create Refiners by splitting the string by commas and semi-colons.</div>
//       <div><b>groupBy...</b> will take number or date column values and group them into larger buckets.</div>
//       <div>Generally speaking, only select one per refiner.</div>
//       <div style={{ display: 'flex' }}>
//           <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Number rules</div><ul>
//             { RefinerRulesNums.map( ( rule : IRefinerRulesNums, idx: number) => <li key={ idx }>{ rule }</li> ) }
//           </ul></div>
//           <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Integer rules</div><ul>
//             { RefinerRulesInts.map( ( rule : IRefinerRulesInts, idx: number) => <li key={ idx }>{ rule }</li> ) }
//           </ul></div>
//           <div style={ padRight15 }><div className={ 'fps-pph-topic' }>String rules</div><ul>
//             { RefinerRulesStrs.map( ( rule : IRefinerRulesStrs, idx: number) => <li key={ idx }>{ rule }</li> ) }
//           </ul></div>
//           <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Time rules</div><ul>
//             { RefinerRulesTime.map( ( rule : IRefinerRulesTime, idx: number) => <li key={ idx }>{ rule }</li> ) }
//           </ul></div>
//           <div style={ padRight15 }><div className={ 'fps-pph-topic' }>User rules</div><ul>
//             { RefinerRulesUser.map( ( rule : IRefinerRulesUser, idx: number) => <li key={ idx }>{ rule }</li> ) }
//           </ul></div>
//       </div>
//   </div>
// </PivotItem>
//   ;
 
//   return WebPartHelpElement;

// }