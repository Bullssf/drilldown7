// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem headerText={ 'Performance' } > 
//         <div className={ 'fps-pph-content' }>
//           {/* <div className={ 'fps-pph-topic' }>{escape(`Performance settings`)}</div> */}

//           {/* <div>User columns (Single/Multi) on the main list (can not be part of lookup column)</div> */}

//           <div className={ 'fps-pph-topic' }>{escape(`Performance settings`)} on this page require advanced Javascript knowledge</div>
//           <div>{escape(`Please contact your SharePoint team for assistance :)`)}</div>

//           <div className={ 'fps-pph-topic' }>Rest filter to load only specific items</div>
//           <div>Rest filters are applied when the web part fetches the information.</div>
//           <div>Pre-filtering the data with a rest filter will improve loading times and reduce data on mobile.</div>
//           <div>In rest filters, <b>{escape(`everything is case sensitive`)}</b> and requires using { LinkFindInternalName }</div>
//           <ul>
//             <li>{escape(`Status eq '4. Completed'  --- Only retrieve items where Status column equals '4. Completed'`)}</li>
//             <li>Approver eq [Me]  --- Only retrieve items where Approver column equals currently logged in user</li>
//             <li>You can combine filters but there are limitations.</li>
//             <ul>
//               <li>You CAN NOT filter on more than one User or Lookup column at a time</li>
//               <li>You CAN filter on a User column AND other column types</li>
//             </ul>
//           </ul>

//           <div className={ 'fps-pph-topic' }>Javascript eval</div>
//           <div>Javascript filters are applied after the data is fetched.</div>
//           <div>If the result of this eval === true, then the item is shown.</div>
//           <div>Only fetched columns can be used in Javascript eval.</div>
//           <div>{escape(`You may need to toggle the 'Get all item props' if a column is not a refiner or on a view.`)}</div>
//           <div>Having both rest and javascript eval filters allow you to limit what items and refiners you see.</div>
//           <div>In Javascript eval filters, <b>{escape(`everything is case sensitive`)}</b> and requires using { LinkFindInternalName }</div>
//           <ul>
//             <li>item.Author<b>Id</b> === sourceUserInfo.Id || item.Editor<b>Id</b> === sourceUserInfo.Id</li>
//             <li>The previous example filters items where CreatedBy OR ModifiedBy is the currently logged in user</li>
//             <div><mark><b>NOT seeing any items with example?:</b></mark> Be sure to add Id after the <b>Internal Column names</b>.</div>
//             <li>{escape(`The javascript syntax for an item's User columns is InternalColumName followed by either Id or Title - with no space or .dot.`)}</li>
//           </ul>

//         </div>
//       </PivotItem>
//   ;
 
//   return WebPartHelpElement;

// }