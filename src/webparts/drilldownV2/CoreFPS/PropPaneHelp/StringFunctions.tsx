// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// import { ITrimB4, ITrimAfter, ITrimLink, ITrimSpecial, ITrimTimes, ITrimWords } from '../../../../services/getInterfaceV2';


// import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimWords, DoNotExpandTrimTimes, DoNotExpandTrimSpecial } from '../../../../services/getInterfaceV2';

// import ReactJson from "react-json-view";


// export function putObjectIntoJSON ( obj: any, name: string = null ) {
//   // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
//   return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
// }

// const padRight40: React.CSSProperties = { paddingRight: '40px' };

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem headerText={ 'String Functions' } > 
//   <div className={ 'fps-pph-content' }>
//       <div className={ 'fps-pph-topic' }>String Functions are like calculated columns without the work.</div>
//       <div>The goal of String functions are to make strings shorter for both <b>refiners</b> and <b>views</b>.</div>
//       <div>Can be applied to columns to modify the values for this webpart - like an ad-hoc calculated column but more.</div>
//       <div>For example, lets say you want to show the initials of the Editor (Modified By)</div>
//       <div>To get the full name of the editor, use <b>Editor/Title</b></div>
//       <div>To get their initials instead, use <b>Editor/Title<span style={{color: 'green'}}>/Initials</span></b></div>

//       <div style={{ display: 'flex' }}>
//           <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Split before character</div><ul>
//             { DoNotExpandTrimB4.map( ( rule : ITrimB4, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
//           </ul></div>
//           <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Split after character</div><ul>
//             { DoNotExpandTrimAfter.map( ( rule : ITrimAfter, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
//           </ul></div>
//           <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Words</div><ul>
//             { DoNotExpandTrimWords.map( ( rule : ITrimWords, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
//           </ul></div>
//           <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Initials</div><ul>
//             { DoNotExpandTrimSpecial.map( ( rule : ITrimSpecial, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
//           </ul></div>
//           <div>
//             <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Link columns</div><ul>
//               { DoNotExpandLinkColumns.map( ( rule : ITrimLink, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
//             </ul></div>
//             <div style={ padRight40 }><div className={ 'fps-pph-topic' } title="These automatically convert to your Local Time">Time columns - LOCAL</div><ul>
//               { DoNotExpandTrimTimes.map( ( rule : ITrimTimes, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
//             </ul></div>
//           </div>

//       </div>
//       <div className={ 'fps-pph-topic' }>Notes: </div>
//       <div>Words ending in Capital C - the C stands for Characters so FirstWord2C = First 2 characters of the first word</div>
//       <div>Words ending in Capital D - includes digits so InitalsD includes all Initials AND numbers</div>
//       <div>{escape(`at this time, 'TrimB42ndDot', 'FirstAcronym', 'SecondAcronym' are not implimented :( `)}</div>
//       <div>{escape(`Object. : If string column is parsable JSON:  ColumnName/Object.propKey to get the value for propKey in Text column called 'ColumnName'`)}</div>

//     </div>
//   </PivotItem> ;
 
//   return WebPartHelpElement;

// }