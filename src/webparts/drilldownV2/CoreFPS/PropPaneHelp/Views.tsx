// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';
// import ReactJson from "react-json-view";

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// gitRepoDrillDownSmall

// const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;
// const PleaseSeeWiki = <p>Please see the { gitRepoDrillDownSmall.wiki }  for more information</p>;

// export function putObjectIntoJSON ( obj: any, name: string = null ) {
//   // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
//   return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
// }


// const SampleViewJSON : any = [
//   // https://github.com/mikezimm/drilldown7/issues/161
//   {
//     "name": "Id",
//     "displayName": "Id",
//     "minWidth": 20,
//     "maxWidth": 35,
//     "linkPropertyName":"goToPropsLink"
//   },
//   {
//     "name": "Author/Title",
//     "displayName": "Created by",
//     "minWidth": 50
//   },
//   {
//     "name": "FileRef",
//     "displayName": "FileLeafRef",
//     "maxWidth": 50,
//     "linkPropertyName": "goToItemPreview"
//   },
//   {
//     "name": "TextColumn",
//     "displayName": "Link formula",
//     "maxWidth": 50,
//     "linkSubstitute": "https://www.google.com/search?q={{Editor/Title}}",
//     "textSubstitute": "{{Editor/Title}} was the last to modify this item",
//     "showEmptyAsEmpty": true,
//   },
// ];

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem  headerText={ 'Views' } >
//     <div className={ 'fps-pph-content' }>
//       <div>Views are how  you define your list view in the web part.</div>
//       <div>The easiest way to get started, is to unlock our Pre-Configured List definitions in page 1 of properties.  Then select one of the pre-configured lists. Or contact your local SharePoint team if you have a good candidate for a company wide template.</div>
//       <div>TIP:  Enable sync views option in Wide View to copy those settings to all widths</div>

//       <div style={{ display: 'flex' }}>
//         <div>
//           <div className={ 'fps-pph-topic' }>Sample view</div>
//           { putObjectIntoJSON( SampleViewJSON ) }
//         </div>
//         <div>
//           <div className={ 'fps-pph-topic' }>About view structure</div>
//           <ul>
//             <li>A view definition is an array of view fields.</li>
//             <li>A view field defines how you want each column to look.</li>
//             <li><mark>NOTE: </mark> <b>Quotes</b> are required per the example. <br/>All column names and view properties are <b>Case Sensitive</b>!</li>
//             <li>Some common properties of view fields are...</li>
//             <ul>
//               <li><b>name:</b> is the Internal Column name for the field.  { LinkFindInternalName }</li>
//               <li><b>displayName:</b> is the what you want the column heading to show</li>
//               <li><b>minWidth:</b> typically is the number of pixels for minimum column width</li>
//               <li><b>maxWidth:</b> typically is the number of pixels for maximum column width</li>
//               <li><b>linkPropertyName:</b> is the column or property with the Url if you want to have a link</li>
//               <li>Typical values you can use in <b>linkPropertyName</b> are:  FileRef, goToItemPreview, goToItemLink, goToPropsLink</li>
//             </ul>
//           </ul>
//           <div className={ 'fps-pph-topic' }>Advanced View capability</div>
//           <ul>
//             <li><b>linkSubstitute</b> property of a view can calculate the url for a clickable link based on column values.
//               <ul>
//                 <li><b>{`"https://www.google.com/search?q={{Editor/Title}}"`}</b> - Example syntax</li>
//                 <li><b>{`{{ Editor/Title }}`}</b> - Place Column Name to Subsititue between double curley braces</li>
//                 <li>Rules of linkSubstitute syntax
//                   <ol>
//                     <li>Link formula <b>must start with either {`"http" or "/sites/"`}</b> or it will NOT be considered a link.</li>
//                     <li>If the column you select <b>does not have a value</b>, it will NOT create a link, only show the value from the items view column name.</li>
//                     <li>In the example to left, if the <b>item.Editor/Title</b> was empty or not valid, the column will show <b>item.TextColumn</b> as a text value.</li>
//                     <li>Only put single column name between curley braces</li>
//                     <li>Can do up to two substitutions in a linkSubstitute</li>
//                     <li>Value between the double curley braces must be valid Internal Name</li>
//                     <li><b>String Functions</b> syntax on that help tab are also valid</li>
//                     <li>use {`"showEmptyAsEmpty" = true`} if you do not want any textSubstitute value if a field in the substitution is empty.  
//                         In this example, if Editor/Title was empty, then no text will show.  
//                         You can use this to NOT show a link or text if it would not be valid due to incomplete substitution.</li>
//                   </ol>
//                 </li>
//               </ul>
//             </li>
//             <li><b>textSubstitute</b> property of a view can calculate a text value based on column values.
//               <ul>
//                 <li><b>{`"{{Editor/Title}} was the last to modify this item"`}</b> - Example syntax</li>
//                 <li><b>{`{{ Editor/Title }}`}</b> - Place Column Name to Subsititue between double curley braces</li>
//                 <li>Rules of textSubstitute syntax
//                   <ol>
//                     <li>Same rules as linkSubstitute except string does NOT have to be considered a link</li>
//                     <li>If the column you select <b>does not have a value</b>, it will substitute the column name instead.</li>
//                   </ol>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//       { PleaseSeeWiki }
      
//       <div className={ 'fps-pph-topic' }>RichText max-hights</div>
//       <div>This setting lets you adjust the height of multi-line-text fields.</div>
//       <div>Enter semi-colon separated numbers for the heights in css em values.</div>
//       <div>If your view has a multi-line-text field, you will see a hamburger icon <Icon iconName='CollapseMenu'/></div>
//       <div>Click this icon to cycle through your max-heights set in the property pane setting.</div>

//       <div className={ 'fps-pph-topic' }>Auto-Expand Rich text Height</div>
//       <div>This setting over-rides your max-heights when there are only a few items.</div>
//       <div>Enter semi-colon separated numbers for maximum rows;max-height per row.</div>
//       <div>The default will set max-height any time your list shows 5 or less items.  Cool huh?</div>
//     </div>
//   </PivotItem>
//   ;
 
//   return WebPartHelpElement;

// }
