import * as React from 'react';

require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

import { ISitePreConfigProps, } from '@mikezimm/npmfunctions/dist/PropPaneHelp/PreConfigFunctions';

import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { defaultBannerCommandStyles, } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/defaults";

import { IQuickCommands } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { IRefinerRulesStrs, IRefinerRulesInts, IRefinerRulesNums, IRefinerRulesTime, IRefinerRulesUser, IRefinerRulesEXPE, IRefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';
import { RefinerRulesStrs, RefinerRulesInts, RefinerRulesNums, RefinerRulesTime, RefinerRulesUser, RefinerRulesEXPE, RefinerRulesNone } from '../fpsReferences';

import { gitRepoDrillDownSmall } from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { BannerHelp, FPSBasicHelp, FPSExpandHelp, ImportHelp, SinglePageAppHelp, VisitorHelp, PinMeHelp, SitePresetsInfo } from '@mikezimm/npmfunctions/dist/PropPaneHelp/FPSCommonOnNpm';

import {HandleBarReplacements } from '@mikezimm/npmfunctions/dist/Services/Strings/handleBars';

import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimWords, DoNotExpandTrimSpecial } from '../../../services/getInterface';

import ReactJson from "react-json-view";

const SampleViewJSON : any = [
  {
    "name": "Author/Title",
    "displayName": "Created by",
    "minWidth": 50
  },
  {
    "name": "FileRef",
    "displayName": "FileLeafRef",
    "maxWidth": 50,
    "linkPropertyName": "goToItemPreview"
  },
];

// const SampleCommands: any = {
//   "label": "Press Me",
//   "primary": false,
//   "confirm": "Are you sure?",
//   "alert": "We made our updates!",
//   "console": "Message to browser console",
//   "panelMessage": "Complete Panel Text",
//   "icon": "User",
//   "updateItem": {
//     "DueDate": "[today+14]",
//     "AssignedToId": "[Me]",
//     "Status": "In Process",
//     "ReviewDays": 99,
//     "Body": "Hi! It's [Today+3] and I'm $MyName$"
//   },
//   "showWhenEvalTrue": "item.AssignedToId !== sourceUserInfo.Id"
// };

const SampleCommands: any = {
  "buttons": [[{
      "label": "Press Me",
      "primary": false,
      "confirm": "Are you sure?",
      "alert": "We made our updates!",
      "console": "Message to browser console",
      "panelMessage": "Complete Panel Text",
      "icon": "User",
      "updateItem": {
        "DueDate": "[today+14]",
        "AssignedToId": "[Me]",
        "Status": "In Process",
        "ReviewDays": 99,
        "Body": "Hi! It's [Today+3] and I'm $MyName$"
      },
      "showWhenEvalTrue": "item.AssignedToId !== sourceUserInfo.Id"
    }
  ]],
  "fields": [],

};
 
const SampleCharts: any = [
  {
    "primaryField": "Id",
    "title": "Count of items",
    "stat": "count",
    "chartTypes": [
      "pareto-dec",
      "stacked-column-labels"
    ]
  }
];

const UserColumnRestPropertiesSPO : string[] = [ 'Title', 'Name', 'EMail', 'FirstName', 'UserName', 'ID', 'SipAddress', 'Office', 'Modified', 'Created', ];
const UserColumnRestPropertiesSPONOTWORK : string[] = [ 'MobilePhone', 'Department', 'JobTitle', 'WorkPhone', 'ImnName', 'NameWithPicture', 'NameWithPictureAndDetails', 'ContentTypeDisp', ];

export function putObjectIntoJSON ( obj: any, name: string = null ) {
  // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
  return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
}

const PleaseSeeWiki = <p>Please see the { gitRepoDrillDownSmall.wiki }  for more information</p>;

const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;

const padRight15: React.CSSProperties = { paddingRight: '15px' };
const padRight40: React.CSSProperties = { paddingRight: '40px' };

const tenantServiceRequestURL = `https://servicenow.${window.location.hostname}.com/`;

export function getWebPartHelpElement ( sitePresets : ISitePreConfigProps ) {

  let preSetsContent = SitePresetsInfo( sitePresets );

  const WebPartHelpElement = <div style={{ overflowX: 'scroll' }}>
  <Pivot 
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal}
      //   style={{ flexGrow: 1, paddingLeft: '10px' }}
      //   styles={ null }
      //   linkSize= { pivotOptionsGroup.getPivSize('normal') }
      //   linkFormat= { pivotOptionsGroup.getPivFormat('links') }
      //   onLinkClick= { null }  //{this.specialClick.bind(this)}
      //   selectedKey={ null }
      >
      <PivotItem headerText={ 'Refiner Columns' } > 
        <div className={ 'fps-pph-content' }>
          <div className={ 'fps-pph-topic' }>Setting the Refiner 'Column Value'</div>
          <div><mark><b>NOTE:</b></mark> ColumnNames in this webpart <b>MUST BE Internal Column names</b>.</div>
          <div><b>Internal Column names</b> ARE NOT the Column Titles you see. { LinkFindInternalName }</div>
          <div className={ 'fps-pph-topic' }>Simple column types (Text, Date, Number, Single/Multi Select Choice)</div>
          <div><b>InternalColumnName</b> - Nothing special require for these column types</div>
          {/* <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div> */}

          {/* <div>User columns (Single/Multi) on the main list (can not be part of lookup column)</div> */}

          <div className={ 'fps-pph-topic' }>User columns (Single/Multi) on the main list (can not be part of lookup column)</div>
          <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div>
          <div>See the Users tab in this page for more information on using User columns</div>

          <div className={ 'fps-pph-topic' }>Lookup columns (Single/Multi) - that are brought in under the LookupColumn</div>
          <div><b>LookupColumnName/Title</b> - /Title shows the Title field from the lookup item</div>
          <div><b>LookupColumnName/OtherField</b> - /OtherField is the InternalColumnName of the lookup column from the other list</div>

          <div className={ 'fps-pph-topic' } style={{ textDecoration: 'underline'}}>Example with real column names</div> 
          <div style={{ paddingTop: '8px'}}>Say you have a lookup column like 'CustomerPlant' which has a Title column (Plant name) and Country column (where it is located)</div>
          <div>To show Customer Plant Title, use <b>CustomerPlant/Title</b></div>
          <div>To show Customer Plant Country, use <b>CustomerPlant/Country</b></div>
        </div>
      </PivotItem>
    
      <PivotItem headerText={ 'String Functions' } > 
        <div className={ 'fps-pph-content' }>
            <div className={ 'fps-pph-topic' }>String Functions are like calculated columns without the work.</div>
            <div>The goal of String functions are to make strings shorter for both <b>refiners</b> and <b>views</b>.</div>
            <div>Can be applied to columns to modify the values for this webpart - like an ad-hoc calculated column but more.</div>
            <div>For example, lets say you want to show the initials of the Editor (Modified By)</div>
            <div>To get the full name of the editor, use <b>Editor/Title</b></div>
            <div>To get their initials instead, use <b>Editor/Title<span style={{color: 'green'}}>/Initials</span></b></div>

            <div style={{ display: 'flex' }}>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Split before character</div><ul>
                  { DoNotExpandTrimB4.map( rule => <li>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Split after character</div><ul>
                  { DoNotExpandTrimAfter.map( rule => <li>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Words</div><ul>
                  { DoNotExpandTrimWords.map( rule => <li>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Initials</div><ul>
                  { DoNotExpandTrimSpecial.map( rule => <li>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Link columns</div><ul>
                  { DoNotExpandLinkColumns.map( rule => <li>{ '/' + rule }</li> ) }
                </ul></div>
            </div>
            <div>Note:  at this time, 'TrimB42ndDot', 'FirstAcronym', 'SecondAcronym' are not implimented :( </div>
        </div>
      </PivotItem>
{/* 
      <PivotItem headerText={ 'String Functions' } > 
        <div className={ 'fps-pph-content' }>
            <div className={ 'fps-pph-topic' }>String Functions are like calculated columns without the work.</div>
            <div>The goal of String functions are to make strings shorter for both <b>refiners</b> and <b>views</b>.</div>
            <div>Can be applied to columns to modify the values for this webpart - like an ad-hoc calculated column but more.</div>
            <div>For example, lets say you want to show the initials of the Editor (Modified By)</div>
            <div>To get the full name of the editor, use <b>Editor/Title</b></div>
            <div>To get their initials instead, use <b>Editor/Title<span style={{color: 'green'}}>/Initials</span></b></div>

            <div className={ 'fps-pph-topic' }>Splitting text Before a character</div>
            <div> /{ DoNotExpandTrimB4.join(', /') } </div>
            <div className={ 'fps-pph-topic' }>Splitting text After a character</div>
            <div> /{ DoNotExpandTrimAfter.join(', /') } </div>
            <div className={ 'fps-pph-topic' }>Words and initials</div>
            <div> /{ DoNotExpandTrimSpecial.join(', /') } </div>

            <div className={ 'fps-pph-topic' }>Getting link columns</div>
            <div> /{ DoNotExpandLinkColumns.join(', /') } </div>
        </div>
      </PivotItem> */}

      <PivotItem headerText={ 'Refiner Rules' } > 
        <div className={ 'fps-pph-content' }>
            <div className={ 'fps-pph-topic' }>Rules are like calculated columns without the work - Only applies to refiners.</div>
            <div><b>Example:</b>  If you have a date column, actual dates or times are not good refiners because they typically will have to many values to choose from.<br/>
            However if you apply a rule like 'groupByYears', it will bucket all your items into years based on the values in the column.<br/></div>
            <div><b>NOTE:</b>  The web part only shows refiners based on the items it intially reads in. So in the case of 'groupByYears', <b>you will not see a year if there are no items for that year</b>.</div>
            <div><b>parseBy...</b> will take a string column and create Refiners by splitting the string by commas and semi-colons.</div>
            <div><b>groupBy...</b> will take number or date column values and group them into larger buckets.</div>
            <div>Generally speaking, only select one per refiner.</div>
            <div style={{ display: 'flex' }}>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Number rules</div><ul>
                  { RefinerRulesNums.map( rule => <li>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Integer rules</div><ul>
                  { RefinerRulesInts.map( rule => <li>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>String rules</div><ul>
                  { RefinerRulesStrs.map( rule => <li>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Time rules</div><ul>
                  { RefinerRulesTime.map( rule => <li>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>User rules</div><ul>
                  { RefinerRulesUser.map( rule => <li>{ rule }</li> ) }
                </ul></div>
            </div>
        </div>
      </PivotItem>

      <PivotItem  headerText={ 'Views' } >
        <div className={ 'fps-pph-content' }>
          <div>Views are how  you define your list view in the web part.</div>
          <div>The easiest way to get started, is to unlock our Pre-Configured List definitions in page 1 of properties.  Then select one of the pre-configured lists. Or contact your local SharePoint team if you have a good candidate for a company wide template.</div>
          <div style={{ display: 'flex' }}>
            <div>
              <div className={ 'fps-pph-topic' }>Sample view</div>
              { putObjectIntoJSON( SampleViewJSON ) }
            </div>
            <div>
              <div className={ 'fps-pph-topic' }>About view structure</div>
              <ul>
                <li>A view definition is an array of view fields.</li>
                <li>A view field defines how you want each column to look.</li>
                <li><mark>NOTE: </mark> <b>Quotes</b> are required per the example. <br/>All column names and view properties are <b>Case Sensitive</b>!</li>
                <li>Some common properties of view fields are...</li>
                <ul>
                  <li><b>name:</b> is the Internal Column name for the field.  { LinkFindInternalName }</li>
                  <li><b>displayName:</b> is the what you want the column heading to show</li>
                  <li><b>minWidth:</b> typically is the number of pixels for minimum column width</li>
                  <li><b>maxWidth:</b> typically is the number of pixels for maximum column width</li>
                  <li><b>linkPropertyName:</b> is the column or property with the Url if you want to have a link</li>
                  <li>Typical values you can use in <b>linkPropertyName</b> are:  FileRef, goToItemPreview, goToItemLink, goToPropsLink</li>
                </ul>
              </ul>
            </div>
          </div>
          { PleaseSeeWiki }
        </div>
      </PivotItem>

      <PivotItem  headerText={ 'Stats' } >
        <div className={ 'fps-pph-content' }>
          <div className={ 'fps-pph-topic' }>Stats are basic kpi style charts embeded into the webpart</div>
          <ul>
            <li>If you want basic KPI charts (like counting items) with little effort, these are for you!</li>
            <li>These are not intended for anything advanced.  Use PowerBI or other alternatives for that.</li>
            <li>Basic Charts include Tiles with Counts, Horizontal Bars, and Paretos</li>
            <li>They give the end user a simple button to see charts defined in the property pane.</li>
            <li>These require some advanced settings.  Please contact the SharePoint team or Join ShareLab to get more information.</li>
          </ul>
          <div style={{ display: 'flex' }}>
            <div>
              <div className={ 'fps-pph-topic' }>Sample Chart property</div>
              { putObjectIntoJSON( SampleCharts ) }
            </div>
            <div>
              <div className={ 'fps-pph-topic' }>About Charts structure</div>
              <ul>
                <li>Must follow this minimum structure.</li>
                <li>Charts structure is made up of an array of charts ( even if you only have one ).</li>
                <li>A typical chart is made up of these common properites</li>
                <ul>
                  <li><b>primaryField:</b> InternalColumnName</li>
                  <li><b>title:</b> Title above the chart</li>
                  <li><b>stat:</b> What math operation you want to do on the primaryField</li>
                  <div>Available stats: 'sum' , 'avg' , 'max' , 'min' , 'count', 'daysAgo' , 'monthsAgo' , 'eval'</div>

                  <li><b>chartTypes:</b> Differnt types of charts you toggle through when you click on the chart bars.</li>
                  <div>Available types: 'pareto-asc' | 'pareto-dec' | 'pareto-labels' | 'stacked-column-labels' | 'stacked-column-dec' | 'stacked-column-asc' | 'kpi-tiles'</div>
                  <div>The best advice for the types is just try some and see what they do :)</div>
                </ul>
                <div className={ 'fps-pph-topic' }>The example shown here will:</div>
                <ol>
                  <li>get the field called 'Id'</li>
                  <li>get a count of the items (broken down by your refiner categories)</li>
                  <li>first show a pareto chart decending by the count (highest total count per refiner on top)</li>
                  <li>If you click on a bar in the chart, it will toggle between a pareto chart and a stacked Horizontal bar chart</li>
                </ol>
              </ul>
            </div>
          </div>
          { PleaseSeeWiki }
        </div>
      </PivotItem>

      <PivotItem  headerText={ 'Commands' } >
        <div className={ 'fps-pph-content' }>
          <div className={ 'fps-pph-topic' }>Commands are buttons that can do updates to your list.</div>
          <div>Commands can be simple or advanced.  Please join ShareLab if you want some help or have questions.</div>
          <div style={{ display: 'flex' }}>
            <div>
              <div className={ 'fps-pph-topic' }>Sample Command</div>
              { putObjectIntoJSON( SampleCommands ) }
            </div>
            <div>
              <div className={ 'fps-pph-topic' }>About Commands structure</div>
              <ul>
                <li>Must follow this minimum structure.</li>
                <li><mark>NOTE: </mark> <b>Quotes</b> are required per the example. <br/>All column names and view properties are <b>Case Sensitive</b>!</li>
                <li>Quick Commands structure is made up of an array of buttons, view fields may not yet be supported.</li>
                <li>the "buttons" is an array of rows.  Each row can have specific command buttons in it</li>
                <li>A typical button is made up of these common properites</li>
                <ul>
                  <li><b>label:</b> Button text</li>
                  <li><b>primary:</b> true for highlighted button, false for typical button</li>
                  <li><b>secondary:</b> Additional button text for primary buttons</li>
                  <li><b>confirm:</b> Popup text asking to confirm update</li>
                  <li><b>alert:</b> Popup text alert after save</li>
                  <li><b>icon:</b> Icon name.  Go to <a href="https://www.flicon.io/" target="_blank">www.flicon.io</a> for complete list.</li>
                  <li><b>updateItem:</b> JSON structure of the item to save.  See the full web part wiki for how to update dates, users and other list values.</li>
                  <li><b>showWhenEvalTrue:</b> Shows button for specific user.  In this example, when the current user is NOT the person in the AssignedTo column.</li>
                </ul>
              </ul>
            </div>
          </div>
          { PleaseSeeWiki }
        </div>
      </PivotItem>

      <PivotItem  headerText={ 'Users' } >
        <div className={ 'fps-pph-content' }>
          <div className={ 'fps-pph-topic' }>Properties you can get from a Single/Multi User Column.</div>

          <div style={{ display: 'flex' }}>


            <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Valid User Props</div><ul>
              { UserColumnRestPropertiesSPO.map( rule => <li>{ rule }</li> ) }
              </ul></div>

            <div style={ padRight15 }><div className={ 'fps-pph-topic' }>May not work in SPO</div><ul>
                { UserColumnRestPropertiesSPONOTWORK.map( rule => <li>{ rule }</li> ) }
                </ul></div>

            <div>
              <div className={ 'fps-pph-topic' }>Sample User Props</div>
              <ul>
                <li><b>Title</b> ~ John Smith</li>
                <li><b>Name</b> ~ i:0#.f|membership|john.smith@fps.com</li>
                <li><b>EMail</b> ~ john.smith@fps.com</li>
                <li><b>Office</b> ~ Office in Delve</li>
                <li><b>ID</b> ~ 79</li>
                <li><b>FirstName</b> ~ John</li>
                <li><b>LastName</b> ~ Smith</li>
                <li><b>UserName</b> ~ john.smith@fps.com</li>
                <li><b>SipAddress</b> ~ john.smith@fps.com</li>
              </ul>
            </div>
          </div>
          <a href="https://sharepoint.stackexchange.com/a/272687" target="_blank">source:  stack exchange</a>
        </div>
      </PivotItem>
      { PinMeHelp }
      { VisitorHelp }
      { BannerHelp }
      { FPSBasicHelp }
      { FPSExpandHelp }
      { SinglePageAppHelp }
      { ImportHelp }
      { !preSetsContent ? null : 
        <PivotItem headerText={ null } itemIcon='Badge'>
          { preSetsContent }
          </PivotItem>
      }
    </Pivot>
  </div>;
 
  return WebPartHelpElement;

}