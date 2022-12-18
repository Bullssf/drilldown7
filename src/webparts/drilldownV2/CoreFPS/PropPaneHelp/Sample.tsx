// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';
// import ReactJson from "react-json-view";
// import {  PivotItem, } from 'office-ui-fabric-react/lib/Pivot';


// const SampleRelatedInfoProps =         {
//   description: 'Standards',
//   showItems: true,
//   isExpanded: true,
//   web: '/sites/financemanual/manual',
//   listTitle: 'Site Pages',
//   restFilter: 'StandardDocumentsId eq {{PageId}}',
//   linkProp: 'File/ServerRelativeUrl', // aka FileLeaf to open file name, if empty, will just show the value
//   displayProp: 'Title',
//   itemsStyle: '"fontWeight":600,"color":"yellow"',
// };


// export function putObjectIntoJSON ( obj: any, name: string = null ): JSX.Element {
//   // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
//   return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
// }

// export function getWebPartHelpElement (  ): JSX.Element {

//   const WebPartHelpElement = <PivotItem headerText={ 'RelatedInfo' } > 
//   <div className={ 'fps-pph-content' }>

//       <div className={ 'fps-pph-topic' }>Sample of tested settings.</div>
//         <ReactJson src={ SampleRelatedInfoProps } name={ 'Sample Props' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
//       </div>
//       <div>
//         <h3>This will do the following</h3>
//         <ol>
//           <li>showItems == true &gt; enables feature</li>
//           <li>Sets the heading for this section to Standards</li>
//           <li>Sets default visibility to Expanded</li>
//           <li>Gets related info from web:  /sites/financemanual/manual</li>
//           <li>Gets related info from Library:  Site Pages</li>
//           <li>{ escape( `Gets items where the lookup column  StandardDocuments has the same value as the current site's PageId` )} </li>
//           <li>Sets the goto link location as File/ServerRelativeUrl.  You could also use a text column for the link or build up a link to anything</li>
//           <li>Sets the display text of the link to the Title of the lookup item</li>
//         </ol>
//       </div>
// </PivotItem>;

// return WebPartHelpElement;

// }