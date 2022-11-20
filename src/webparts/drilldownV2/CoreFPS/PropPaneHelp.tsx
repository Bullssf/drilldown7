import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';
// import { defaultBannerCommandStyles, } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/defaults";

// import { IQuickCommands } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

// import { IRefinerRulesStrs, IRefinerRulesInts, IRefinerRulesNums, IRefinerRulesTime, IRefinerRulesUser, IRefinerRulesEXPE, IRefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';
import { RefinerRulesStrs, RefinerRulesInts, RefinerRulesNums, RefinerRulesTime, RefinerRulesUser,  } from '../fpsReferences';
// import { RefinerRulesEXPE, RefinerRulesNone } from '../fpsReferences';

import { gitRepoDrillDownSmall } from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { ITrimB4, ITrimAfter, ITrimLink, ITrimSpecial, ITrimTimes, ITrimWords } from '../../../services/getInterfaceV2';
// import { ITrimFunctions, } from '../../../services/getInterfaceV2';

// import { IRefinerLayer, IRefinerRules, IRefinerStat, RefineRuleValues } from '../fpsReferences';
// import { IRefiners, IItemRefiners, IRefinerStats, IRefinerStatType, RefinerStatTypes, } from '../fpsReferences';
import { IRefinerRulesInts, IRefinerRulesNums, IRefinerRulesStrs, IRefinerRulesTime, IRefinerRulesUser } from '../fpsReferences';  //../fpsReferences

import { BannerHelp, FPSBasicHelp, FPSExpandHelp, ImportHelp, VisitorHelp, } from '../fpsReferences'; //removed since this now has SPA version SinglePageAppHelp

import { ISitePreConfigProps, SitePresetsInfo } from '../fpsReferences';

import { getEasyIconsHelp } from '../components/EasyIcons/eiHelp';
import { EasyIconObjectDefault } from '../components/EasyIcons/eiTypes';

// import {HandleBarReplacements } from '../fpsReferences';

import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimWords, DoNotExpandTrimTimes, DoNotExpandTrimSpecial } from '../../../services/getInterfaceV2';

import ReactJson from "react-json-view";

import { repoLink } from '../fpsReferences';

import ListFieldsHook from './PropPaneCols'

import {IFieldPanelProps } from './PropPaneCols';

const SampleViewJSON : any = [
  // https://github.com/mikezimm/drilldown7/issues/161
  {
    "name": "Id",
    "displayName": "Id",
    "minWidth": 20,
    "maxWidth": 35,
    "linkPropertyName":"goToPropsLink"
  },
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
  {
    "name": "TextColumn",
    "displayName": "Link formula",
    "maxWidth": 50,
    "linkSubstitute": "https://www.google.com/search?q={{Editor/Title}}",
    "textSubstitute": "{{Editor/Title}} was the last to modify this item",
    "showEmptyAsEmpty": true,
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
      "strPrev": "PREVIOUS Choice Value",  // https://github.com/mikezimm/drilldown7/issues/246
      "str1": "In Process",
      "strNext": "NEXT Choice Value",  // https://github.com/mikezimm/drilldown7/issues/246
      "label": "Set to {str1}",
      "primary": false,
      "confirm": "Are you sure you want to Set to {str1}",
      "alert": "We made our updates!",
      "console": "Message to browser console",
      "panelMessage": "Updated item to {str1}",
      "icon": "User",
      "updateItem": {
        "DueDate": "[today+14]",
        "AssignedToId": "[Me]",
        "Status": "{str1}",
        "ReviewDays": 99,
        "Body": "Hi! It's [Today+3] and I'm $MyName$",
      },
        // https://github.com/mikezimm/drilldown7/issues/246
      "showWhenEvalTrue": "item.AssignedToTitle !== sourceUserInfo.Title && item.Status === {strPrev}"
    }
  ]],
  "fields": [],

};
 
const AdvancedCommands: any = {

      "updateItem": {
        "Comments": "{{append rich stamp require}}",
          // https://github.com/mikezimm/drilldown7/issues/245
        "CaptchaField":"{{captcha=Author/Title?Verify Created By Name}}",
        //https://github.com/mikezimm/drilldown7/issues/244,   // https://github.com/mikezimm/drilldown7/issues/246
        "ConditionalDate": "eval( item.TESTCOLUMN===`{str1}` ? `[Today]` : item.TESTCOLUMN===`{strNext}` ? null : item.TESTCOLUMN )",
      }
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

// const tenantServiceRequestURL = `https://servicenow.${window.location.hostname}.com/`;

export function getWebPartHelpElement ( sitePresets : ISitePreConfigProps, fieldPanel : IFieldPanelProps = null ) {

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
        <PivotItem headerText={ 'Performance' } > 
        <div className={ 'fps-pph-content' }>
          {/* <div className={ 'fps-pph-topic' }>{escape(`Performance settings`)}</div> */}

          {/* <div>User columns (Single/Multi) on the main list (can not be part of lookup column)</div> */}

          <div className={ 'fps-pph-topic' }>{escape(`Performance settings`)} on this page require advanced Javascript knowledge</div>
          <div>{escape(`Please contact your SharePoint team for assistance :)`)}</div>

          <div className={ 'fps-pph-topic' }>Rest filter to load only specific items</div>
          <div>Rest filters are applied when the web part fetches the information.</div>
          <div>Pre-filtering the data with a rest filter will improve loading times and reduce data on mobile.</div>
          <div>In rest filters, <b>{escape(`everything is case sensitive`)}</b> and requires using { LinkFindInternalName }</div>
          <ul>
            <li>{escape(`Status eq '4. Completed'  --- Only retrieve items where Status column equals '4. Completed'`)}</li>
            <li>Approver eq [Me]  --- Only retrieve items where Approver column equals currently logged in user</li>
            <li>You can combine filters but there are limitations.</li>
            <ul>
              <li>You CAN NOT filter on more than one User or Lookup column at a time</li>
              <li>You CAN filter on a User column AND other column types</li>
            </ul>
          </ul>

          <div className={ 'fps-pph-topic' }>Javascript eval</div>
          <div>Javascript filters are applied after the data is fetched.</div>
          <div>If the result of this eval === true, then the item is shown.</div>
          <div>Only fetched columns can be used in Javascript eval.</div>
          <div>{escape(`You may need to toggle the 'Get all item props' if a column is not a refiner or on a view.`)}</div>
          <div>Having both rest and javascript eval filters allow you to limit what items and refiners you see.</div>
          <div>In Javascript eval filters, <b>{escape(`everything is case sensitive`)}</b> and requires using { LinkFindInternalName }</div>
          <ul>
            <li>item.Author<b>Id</b> === sourceUserInfo.Id || item.Editor<b>Id</b> === sourceUserInfo.Id</li>
            <li>The previous example filters items where CreatedBy OR ModifiedBy is the currently logged in user</li>
            <div><mark><b>NOT seeing any items with example?:</b></mark> Be sure to add Id after the <b>Internal Column names</b>.</div>
            <li>{escape(`The javascript syntax for an item's User columns is InternalColumName followed by either Id or Title - with no space or .dot.`)}</li>
          </ul>

        </div>
      </PivotItem>
      <PivotItem headerText={ 'Refiner Columns' } > 
        <div className={ 'fps-pph-content' }>
          <div className={ 'fps-pph-topic' }>{escape(`Setting the Refiner 'Column Value'`)}</div>
          <div><mark><b>NOTE:</b></mark> ColumnNames in this webpart <b>MUST BE Internal Column names</b>.</div>
          <div><b>Internal Column names</b> ARE NOT the Column Titles you see. { LinkFindInternalName }</div>
          <div className={ 'fps-pph-topic' }>Simple column types (Text, Date, Number, Single/Multi Select Choice)</div>
          <div><b>InternalColumnName</b> - Nothing special require for these column types</div>
          {/* <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div> */}

          {/* <div>User columns (Single/Multi) on the main list (can not be part of lookup column)</div> */}

          <div className={ 'fps-pph-topic' }>{escape(`User columns (Single/Multi) on the main list (can not be part of lookup column)`)}</div>
          <div><b>UserColumnName/Title</b>{escape(` - /Title shows the person's Name`)}</div>
          <div>See the Users tab in this page for more information on using User columns</div>

          <div className={ 'fps-pph-topic' }>Lookup columns (Single/Multi) - that are brought in under the LookupColumn</div>
          <div><b>LookupColumnName/Title</b> - /Title shows the Title field from the lookup item</div>
          <div><b>LookupColumnName/OtherField</b> - /OtherField is the InternalColumnName of the lookup column from the other list</div>

          <div className={ 'fps-pph-topic' } style={{ textDecoration: 'underline'}}>Example with real column names</div> 
          <div style={{ paddingTop: '8px'}}>{escape(`Say you have a lookup column like 'CustomerPlant' which has a Title column (Plant name) and Country column (where it is located)`)}</div>
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
                  { DoNotExpandTrimB4.map( ( rule : ITrimB4, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Split after character</div><ul>
                  { DoNotExpandTrimAfter.map( ( rule : ITrimAfter, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Words</div><ul>
                  { DoNotExpandTrimWords.map( ( rule : ITrimWords, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
                </ul></div>
                <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Initials</div><ul>
                  { DoNotExpandTrimSpecial.map( ( rule : ITrimSpecial, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
                </ul></div>
                <div>
                  <div style={ padRight40 }><div className={ 'fps-pph-topic' }>Link columns</div><ul>
                    { DoNotExpandLinkColumns.map( ( rule : ITrimLink, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
                  </ul></div>
                  <div style={ padRight40 }><div className={ 'fps-pph-topic' } title="These automatically convert to your Local Time">Time columns - LOCAL</div><ul>
                    { DoNotExpandTrimTimes.map( ( rule : ITrimTimes, idx: number) => <li key={ idx }>{ '/' + rule }</li> ) }
                  </ul></div>
                </div>

            </div>
            <div className={ 'fps-pph-topic' }>Notes: </div>
            <div>Words ending in Capital C - the C stands for Characters so FirstWord2C = First 2 characters of the first word</div>
            <div>Words ending in Capital D - includes digits so InitalsD includes all Initials AND numbers</div>
            <div>{escape(`at this time, 'TrimB42ndDot', 'FirstAcronym', 'SecondAcronym' are not implimented :( `)}</div>
            <div>{escape(`Object. : If string column is parsable JSON:  ColumnName/Object.propKey to get the value for propKey in Text column called 'ColumnName'`)}</div>

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
            {escape(`However if you apply a rule like 'groupByYears', it will bucket all your items into years based on the values in the column.`)}<br/></div>
            <div><b>NOTE:</b>{escape(`  The web part only shows refiners based on the items it intially reads in. So in the case of 'groupByYears', `)}<b>you will not see a year if there are no items for that year</b>.</div>
            <div><b>parseBy...</b> will take a string column and create Refiners by splitting the string by commas and semi-colons.</div>
            <div><b>groupBy...</b> will take number or date column values and group them into larger buckets.</div>
            <div>Generally speaking, only select one per refiner.</div>
            <div style={{ display: 'flex' }}>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Number rules</div><ul>
                  { RefinerRulesNums.map( ( rule : IRefinerRulesNums, idx: number) => <li key={ idx }>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Integer rules</div><ul>
                  { RefinerRulesInts.map( ( rule : IRefinerRulesInts, idx: number) => <li key={ idx }>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>String rules</div><ul>
                  { RefinerRulesStrs.map( ( rule : IRefinerRulesStrs, idx: number) => <li key={ idx }>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>Time rules</div><ul>
                  { RefinerRulesTime.map( ( rule : IRefinerRulesTime, idx: number) => <li key={ idx }>{ rule }</li> ) }
                </ul></div>
                <div style={ padRight15 }><div className={ 'fps-pph-topic' }>User rules</div><ul>
                  { RefinerRulesUser.map( ( rule : IRefinerRulesUser, idx: number) => <li key={ idx }>{ rule }</li> ) }
                </ul></div>
            </div>
        </div>
      </PivotItem>

      <PivotItem  headerText={ 'Views' } >
        <div className={ 'fps-pph-content' }>
          <div>Views are how  you define your list view in the web part.</div>
          <div>The easiest way to get started, is to unlock our Pre-Configured List definitions in page 1 of properties.  Then select one of the pre-configured lists. Or contact your local SharePoint team if you have a good candidate for a company wide template.</div>
          <div>TIP:  Enable sync views option in Wide View to copy those settings to all widths</div>

          <div className={ 'fps-pph-topic' }>RichText max-hights</div>
          <div>This setting lets you adjust the height of multi-line-text fields.</div>
          <div>Enter semi-colon separated numbers for the heights in css em values.</div>
          <div>If your view has a multi-line-text field, you will see a hamburger icon <Icon iconName='CollapseMenu'/></div>
          <div>Click this icon to cycle through your max-heights set in the property pane setting.</div>

          <div className={ 'fps-pph-topic' }>Auto-Expand Rich text Height</div>
          <div>This setting over-rides your max-heights when there are only a few items.</div>
          <div>Enter semi-colon separated numbers for maximum rows;max-height per row.</div>
          <div>The default will set max-height any time your list shows 5 or less items.  Cool huh?</div>

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
              <div className={ 'fps-pph-topic' }>Advanced View capability</div>
              <ul>
                <li><b>linkSubstitute</b> property of a view can calculate the url for a clickable link based on column values.
                  <ul>
                    <li><b>{`"https://www.google.com/search?q={{Editor/Title}}"`}</b> - Example syntax</li>
                    <li><b>{`{{ Editor/Title }}`}</b> - Place Column Name to Subsititue between double curley braces</li>
                    <li>Rules of linkSubstitute syntax
                      <ol>
                        <li>Link formula <b>must start with either {`"http" or "/sites/"`}</b> or it will NOT be considered a link.</li>
                        <li>If the column you select <b>does not have a value</b>, it will NOT create a link, only show the value from the items view column name.</li>
                        <li>In the example to left, if the <b>item.Editor/Title</b> was empty or not valid, the column will show <b>item.TextColumn</b> as a text value.</li>
                        <li>Only put single column name between curley braces</li>
                        <li>Can do up to two substitutions in a linkSubstitute</li>
                        <li>Value between the double curley braces must be valid Internal Name</li>
                        <li><b>String Functions</b> syntax on that help tab are also valid</li>
                        <li>use {`"showEmptyAsEmpty" = true`} if you do not want any textSubstitute value if a field in the substitution is empty.  
                            In this example, if Editor/Title was empty, then no text will show.  
                            You can use this to NOT show a link or text if it would not be valid due to incomplete substitution.</li>
                      </ol>
                    </li>
                  </ul>
                </li>
                <li><b>textSubstitute</b> property of a view can calculate a text value based on column values.
                  <ul>
                    <li><b>{`"{{Editor/Title}} was the last to modify this item"`}</b> - Example syntax</li>
                    <li><b>{`{{ Editor/Title }}`}</b> - Place Column Name to Subsititue between double curley braces</li>
                    <li>Rules of textSubstitute syntax
                      <ol>
                        <li>Same rules as linkSubstitute except string does NOT have to be considered a link</li>
                        <li>If the column you select <b>does not have a value</b>, it will substitute the column name instead.</li>
                      </ol>
                    </li>
                  </ul>
                </li>
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
                  <div>{escape(`Available stats: 'sum' , 'avg' , 'max' , 'min' , 'count', 'daysAgo' , 'monthsAgo' , 'eval'`)}</div>

                  <li><b>chartTypes:</b> Differnt types of charts you toggle through when you click on the chart bars.</li>
                  <div>{escape(`Available types: 'pareto-asc' | 'pareto-dec' | 'pareto-labels' | 'stacked-column-labels' | 'stacked-column-dec' | 'stacked-column-asc' | 'kpi-tiles'`)}</div>
                  <div>The best advice for the types is just try some and see what they do :)</div>
                </ul>
                <div className={ 'fps-pph-topic' }>The example shown here will:</div>
                <ol>
                  <li>{escape(`get the field called 'Id'`)}</li>
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
                <li>{`the "buttons" is an array of rows.  Each row can have specific command buttons in it`}</li>
                <li>A typical button is made up of these common properites</li>
                <ul>
                  <li><b>str1:</b> Use this like a variable to add a string to multiple places</li>
                  <li><b>str2:</b> ^^^^^^^^, use like this:  label:{escape(`{str1}`)}</li>
                  <li><b>label:</b> Button text</li>
                  <li><b>primary:</b> true for highlighted button, false for typical button</li>
                  <li><b>secondary:</b> Additional button text for primary buttons</li>
                  <li><b>confirm:</b> Popup text asking to confirm update</li>
                  <li><b>alert:</b> Popup text alert after save</li>
                  <li><b>icon:</b> Icon name.  Go to <a href="https://www.flicon.io/" target="_blank">www.flicon.io</a> for complete list.</li>
                  <li><b>updateItem:</b> JSON structure of the item to save.  See the full web part wiki for how to update dates, users and other list values.
                    {/* <div><b>How to prompt for comments or text?</b></div>
                    <ul>
                      <li>{escape(`ColumnName: {{append rich stamp}}`)} will append a comment with settings in the curley braces listed below</li>
                      <li><b>append</b> keyword:  will add comments to top of existing multi-line text field</li>
                      <li><b>stamp</b> keyword:  will add User Initials and Date Stamp above your comment</li>
                      <li><b>rich</b> keyword:  will <b>bold the Date Stamp</b> above your comment</li>
                      <li>{escape(`ColumnName: {{}}`)} Use this syntax to replace current text with unformatted comment</li>
                    </ul>
                    <div><mark>NOTE:</mark>If you press Cancel to inputing a text comment, the item will still Update but set the value to null</div> */}
                  </li>
                  
                  <li><b>showWhenEvalTrue:</b> Shows button for specific user.  In this example, when the current user is NOT the person in the AssignedTo column.</li>
                </ul>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div>
              <div className={ 'fps-pph-topic' }>Advanced Column Updates</div>
              { putObjectIntoJSON( AdvancedCommands ) }
            </div>
            <div>
              <div className={ 'fps-pph-topic' }>Advanced Updates styntax and structure</div>
              <ul>
                <li>Must follow this minimum structure listed above</li>
                <li>For simplicity, this portion just shows the updateItem object: fields that are updated.</li>
                <div style={{height: '15px' }}/>
                <li><mark>NOTE: </mark> <b>Quotes</b> are required per the example. <br/>All column names are <b>Case Sensitive</b>!</li>
                  <li>Use the <b>{escape(`"{{append rich stamp required}}"`)}</b> syntax to prompt user for Comments or Text
                    <ul>
                      <li>Can include any or all of the above keywords inside the curley braces</li>
                      <li>use <b>append</b> to add new text to the top of an existing multi-line text field</li>
                      <li>use <b>stamp</b> to add a line above the comment with user initials and current timestamp</li>
                      <li>use <b>rich</b> to make the stamp <b>bold rich text</b></li>
                      <li>use <b>required</b> to require an actual comment - at least a single letter or number.  Empty or cancel will fail</li>
                    </ul>
                  </li>
                  <div style={{height: '15px' }}/>
                  <li>Use the <b>{`"{{captcha=Author/Title?Verify Created By Name}}"`}</b> syntax to prompt user for a specific response
                    <ul>
                      <li>You could use this to ask a person to verify their name is in a particular field for successful save.</li>
                      <li>This <b>DOES NOT</b> actually verify who they are!</li>
                      <li>It will just force them to type something in and possibly prevent them from updating an item that you do not want them to update.</li>
                      <li>For instance, if you have a generic account pc and want someone to confirm they picked something up, you could target the column their name would be in.</li>
                      <li>It would not prevent someone from typing in someone elses name, just give them a test to make sure they are not accepting someone elses item by accident.</li>
                      <li>Another potential use case, prompt to scan a unique bar code or tracability number that is already stored on the list item in another field.</li>
                      <li>Must have following components:</li>
                      <li><b>{`"{{  captcha    =    InternalFieldNameHere  ?   Prompt Text-Hint Here }}"`}</b></li>
                      <li>More specifically, these strings are required:  <b>{`"{{  captcha    =     ?   }}"`}</b></li>
                      <li>Require Captcha text meets same casing as test:  <b>{`"{{  captcha^    =     ?   }}"`}</b></li>
                      <li>Require Item has a value to compare to to pass:  <b>{`"{{  captcha*    =     ?   }}"`}</b> - if no * and item does not have comparision to make, auto-passes</li>
                      <li>Require Item has a value to compare AND proper CaSE is entered:  <b>{`"{{  captcha^*    =     ?   }}"`}</b> - MUST spell exactly like <b>captcha^*</b> </li>
                      <li>You fill in the parts in between like <b>InternalFieldNameHere</b> and <b>Prompt Text-Hint Here</b></li>
                      <li><b>Prompt Text-Hint Here</b> MUST NOT contain any of these special characters or words <b>{`"{{  captcha    =     ?   }}"`}</b></li>
                      <li>Examples of <b>InternalFieldNameHere</b>
                        <ul>
                          <li>{`"{{ captcha = Author/Title ? }}"`} - Require CreatedBy Users name/title</li>
                          <li>{`"{{ captcha = Receiver/Title ? }}"`} - Require Users name/title in a column called Receiver</li>
                          <li>{`"{{ captcha* = Modified/YYYY-MM-DD ? }}"`} - Require Modified Date in format:  2022-12-25</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <div style={{height: '15px' }}/>
                  <li>Use the <b>{`"eval(  javascript function  )"`}</b> to assign a value using a condition
                    <ul>
                      <li><mark>NOTE: </mark> <b>This option requires knowledge of Javascript AND interal logic of the web part.</b></li>
                      <li><b>If you are not using this with help from the SharePoint team, it is not supported.</b></li>
                      <li>Must have following components: {`with all the correct "  \` and ' `} quote marks</li>
                      <li>Double quotes around the entire eval object.</li>
                      <li>Single quotes around the entire eval string within the braces.</li>
                      <li>Back-tick quotes around string values in the eval function.</li>
                      <div style={{height: '10px' }}/>
                      <li><b>{`"eval( 'javascript function which returns the value you want' )"`}</b></li>
                      <div style={{height: '10px' }}/>
                      <li><b>{`"eval( 'item.TESTCOLUMN===\`RequiredValue\` ? \`[Today]\` : item.TESTCOLUMN===\`OtherValue\` ? null : item.TESTCOLUMN' )"`}</b></li>
                      <div style={{height: '10px' }}/>
                      <li>In the above example, if the column called TESTCOLUMN is equal to RequiredValue, then the column will be set with todays date.</li>
                      <li>If the column called TESTCOLUMN is equal to OtherValue, then the column will be set to null.</li>
                      <li>If neither of the conditions are met, the column will be set to the current value.... basically not change.</li>
                    </ul>
                  </li>

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
              { UserColumnRestPropertiesSPO.map( ( rule : string, idx: number) => <li key={ idx }>{ rule }</li> ) }
              </ul></div>

            <div style={ padRight15 }><div className={ 'fps-pph-topic' }>May not work in SPO</div><ul>
                { UserColumnRestPropertiesSPONOTWORK.map( ( rule : string, idx: number) => <li key={ idx }>{ rule }</li> ) }
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
      {/* { PinMeHelp } */}
      { !fieldPanel ? null : 
        <PivotItem headerText={ null } itemIcon='ColumnOptions'>
          { ListFieldsHook( fieldPanel) }
          </PivotItem>
      }

      { getEasyIconsHelp( EasyIconObjectDefault, repoLink ) }
      { VisitorHelp }
      { BannerHelp }
      { FPSBasicHelp }
      { FPSExpandHelp }
      {/* { SinglePageAppHelp } */}
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