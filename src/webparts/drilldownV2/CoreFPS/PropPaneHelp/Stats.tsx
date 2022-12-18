// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem  headerText={ 'Stats' } >
//     <div className={ 'fps-pph-content' }>
//       <div className={ 'fps-pph-topic' }>Stats are basic kpi style charts embeded into the webpart</div>
//       <ul>
//         <li>If you want basic KPI charts (like counting items) with little effort, these are for you!</li>
//         <li>These are not intended for anything advanced.  Use PowerBI or other alternatives for that.</li>
//         <li>Basic Charts include Tiles with Counts, Horizontal Bars, and Paretos</li>
//         <li>They give the end user a simple button to see charts defined in the property pane.</li>
//         <li>These require some advanced settings.  Please contact the SharePoint team or Join ShareLab to get more information.</li>
//       </ul>
//       <div style={{ display: 'flex' }}>
//         <div>
//           <div className={ 'fps-pph-topic' }>Sample Chart property</div>
//           { putObjectIntoJSON( SampleCharts ) }
//         </div>
//         <div>
//           <div className={ 'fps-pph-topic' }>About Charts structure</div>
//           <ul>
//             <li>Must follow this minimum structure.</li>
//             <li>Charts structure is made up of an array of charts ( even if you only have one ).</li>
//             <li>A typical chart is made up of these common properites</li>
//             <ul>
//               <li><b>primaryField:</b> InternalColumnName</li>
//               <li><b>title:</b> Title above the chart</li>
//               <li><b>stat:</b> What math operation you want to do on the primaryField</li>
//               <div>{escape(`Available stats: 'sum' , 'avg' , 'max' , 'min' , 'count', 'daysAgo' , 'monthsAgo' , 'eval'`)}</div>

//               <li><b>chartTypes:</b> Differnt types of charts you toggle through when you click on the chart bars.</li>
//               <div>{escape(`Available types: 'pareto-asc' | 'pareto-dec' | 'pareto-labels' | 'stacked-column-labels' | 'stacked-column-dec' | 'stacked-column-asc' | 'kpi-tiles'`)}</div>
//               <div>The best advice for the types is just try some and see what they do :)</div>
//             </ul>
//             <div className={ 'fps-pph-topic' }>The example shown here will:</div>
//             <ol>
//               <li>{escape(`get the field called 'Id'`)}</li>
//               <li>get a count of the items (broken down by your refiner categories)</li>
//               <li>first show a pareto chart decending by the count (highest total count per refiner on top)</li>
//               <li>If you click on a bar in the chart, it will toggle between a pareto chart and a stacked Horizontal bar chart</li>
//             </ol>
//           </ul>
//         </div>
//       </div>
//       { PleaseSeeWiki }
//     </div>
//   </PivotItem>
//   ;
 
//   return WebPartHelpElement;

// }