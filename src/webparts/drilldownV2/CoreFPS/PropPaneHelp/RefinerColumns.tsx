// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem headerText={ 'Refiner Columns' } > 
//     <div className={ 'fps-pph-content' }>
//       <div className={ 'fps-pph-topic' }>{escape(`Setting the Refiner 'Column Value'`)}</div>
//       <div><mark><b>NOTE:</b></mark> ColumnNames in this webpart <b>MUST BE Internal Column names</b>.</div>
//       <div><b>Internal Column names</b> ARE NOT the Column Titles you see. { LinkFindInternalName }</div>
//       <div className={ 'fps-pph-topic' }>Simple column types (Text, Date, Number, Single/Multi Select Choice)</div>
//       <div><b>InternalColumnName</b> - Nothing special require for these column types</div>
//       {/* <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div> */}

//       {/* <div>User columns (Single/Multi) on the main list (can not be part of lookup column)</div> */}

//       <div className={ 'fps-pph-topic' }>{escape(`User columns (Single/Multi) on the main list (can not be part of lookup column)`)}</div>
//       <div><b>UserColumnName/Title</b>{escape(` - /Title shows the person's Name`)}</div>
//       <div>See the Users tab in this page for more information on using User columns</div>

//       <div className={ 'fps-pph-topic' }>Lookup columns (Single/Multi) - that are brought in under the LookupColumn</div>
//       <div><b>LookupColumnName/Title</b> - /Title shows the Title field from the lookup item</div>
//       <div><b>LookupColumnName/OtherField</b> - /OtherField is the InternalColumnName of the lookup column from the other list</div>

//       <div className={ 'fps-pph-topic' } style={{ textDecoration: 'underline'}}>Example with real column names</div> 
//       <div style={{ paddingTop: '8px'}}>{escape(`Say you have a lookup column like 'CustomerPlant' which has a Title column (Plant name) and Country column (where it is located)`)}</div>
//       <div>To show Customer Plant Title, use <b>CustomerPlant/Title</b></div>
//       <div>To show Customer Plant Country, use <b>CustomerPlant/Country</b></div>
//     </div>
//   </PivotItem>
//   ;
 
//   return WebPartHelpElement;

// }