import * as React from 'react';

import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';

import { IQuickCommands } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { IRefinerRulesStrs, IRefinerRulesInts, IRefinerRulesNums, IRefinerRulesTime, IRefinerRulesUser, IRefinerRulesEXPE, IRefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';
import { RefinerRulesStrs, RefinerRulesInts, RefinerRulesNums, RefinerRulesTime, RefinerRulesUser, RefinerRulesEXPE, RefinerRulesNone } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

import { gitRepoDrillDownSmall } from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimSpecial } from '../../../../services/getInterface';

import stylesD from './drillComponent.module.scss';

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

const SampleCommands: any = {
  buttons: [{
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
  ],
  fields: [],

};
 
export function putObjectIntoJSON ( obj: any, name: string = null ) {
  return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
}

const PleaseSeeWiki = <p>Please see the { gitRepoDrillDownSmall.wiki }  for more information</p>;

const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;

const flexListStyles: React.CSSProperties = { paddingRight: '15px' };

export const WebPartHelpElement = <div>
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
      <div className={ stylesD.helpContent}>
          <div className={ stylesD.topic}>Setting the Refiner 'Column Value'</div>
          <div className={ stylesD.topic}>Simple column types (Text, Date, Number, Single/Multi Select Choice)</div>
          <div><b>InternalColumnName</b> - NOTE:  InternalColumn names are not the Titles you see. { LinkFindInternalName }</div>

          <div className={ stylesD.topic}>User columns (Single/Multi) on the main list (can not be part of lookup column)</div>
          <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div>

          <div className={ stylesD.topic}>Lookup columns (Single/Multi) - that are brought in under the LookupColumn</div>
          <div><b>LookupColumnName/Title</b> - /Title shows the Title field from the lookup item</div>
          <div><b>LookupColumnName/OtherField</b> - /OtherField is the InternalColumnName of the lookup column from the other list</div>
          <div style={{ paddingTop: '8px'}}>So if you have a lookup column like 'CustomerPlant' which has a Title column (Plant name) and Country column (where it is located)</div>
          <div>To show Customer Plant Title, use <b>CustomerPlant/Title</b></div>
          <div>To show Customer Plant Country, use <b>CustomerPlant/Country</b></div>
      </div>
    </PivotItem>

    <PivotItem headerText={ 'String Functions' } > 
      <div className={ stylesD.helpContent}>
          <div className={ stylesD.topic}>String Functions are like calculated columns without the work.</div>
          <div>The goal of String functions are to make strings shorter for both <b>refiners</b> and <b>views</b>.</div>
          <div>Can be applied to columns to modify the values for this webpart - like an ad-hoc calculated column but more.</div>
          <div>For example, lets say you want to show the initials of the Editor (Modified By)</div>
          <div>To get the full name of the editor, use <b>Editor/Title</b></div>
          <div>To get their initials instead, use <b>Editor/Title<span style={{color: 'green'}}>/Initials</span></b></div>

          <div className={ stylesD.topic}>Splitting text Before a character</div>
          <div> /{ DoNotExpandTrimB4.join(', /') } </div>
          <div className={ stylesD.topic}>Splitting text After a character</div>
          <div> /{ DoNotExpandTrimAfter.join(', /') } </div>
          <div className={ stylesD.topic}>Words and initials</div>
          <div> /{ DoNotExpandTrimSpecial.join(', /') } </div>

          <div className={ stylesD.topic}>Getting link columns</div>
          <div> /{ DoNotExpandLinkColumns.join(', /') } </div>
      </div>
    </PivotItem>

    <PivotItem headerText={ 'Refiner Rules' } > 
      <div className={ stylesD.helpContent}>
          <div className={ stylesD.topic}>Rules are like calculated columns without the work - Only applies to refiners.</div>
          <div><b>Example:</b>  If you have a date column, actual dates or times are not good refiners because they typically will have to many values to choose from.<br/>
          However if you apply a rule like 'groupByYears', it will bucket all your items into years based on the values in the column.<br/></div>
          <div><b>NOTE:</b>  The web part only shows refiners based on the items it intially reads in. So in the case of 'groupByYears', <b>you will not see a year if there are no items for that year</b>.</div>
          <div><b>parseBy...</b> will take a string column and create Refiners by splitting the string by commas and semi-colons.</div>
          <div><b>groupBy...</b> will take number or date column values and group them into larger buckets.</div>
          <div>Generally speaking, only select one per refiner.</div>
          <div style={{ display: 'flex' }}>
              <div style={ flexListStyles }><div className={ stylesD.topic}>Number rules</div><ul>
                { RefinerRulesNums.map( rule => <li>{ rule }</li> ) }
              </ul></div>
              <div style={ flexListStyles }><div className={ stylesD.topic}>Integer rules</div><ul>
                { RefinerRulesInts.map( rule => <li>{ rule }</li> ) }
              </ul></div>
              <div style={ flexListStyles }><div className={ stylesD.topic}>String rules</div><ul>
                { RefinerRulesStrs.map( rule => <li>{ rule }</li> ) }
              </ul></div>
              <div style={ flexListStyles }><div className={ stylesD.topic}>Time rules</div><ul>
                { RefinerRulesTime.map( rule => <li>{ rule }</li> ) }
              </ul></div>
              <div style={ flexListStyles }><div className={ stylesD.topic}>User rules</div><ul>
                { RefinerRulesUser.map( rule => <li>{ rule }</li> ) }
              </ul></div>
          </div>
      </div>
    </PivotItem>

    <PivotItem  headerText={ 'Views' } >
      <div className={ stylesD.helpContent}>
        <div>Views are how  you define your list view in the web part.</div>
        <div>The easiest way to get started, is to unlock our Pre-Configured List definitions in page 1 of properties.  Then select one of the pre-configured lists. Or contact your local SharePoint team if you have a good candidate for a company wide template.</div>
        <div style={{ display: 'flex' }}>
          <div>
            <div className={ stylesD.topic}>Sample view</div>
            { putObjectIntoJSON( SampleViewJSON ) }
          </div>
          <div>
            <div className={ stylesD.topic}>About view structure</div>
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
      <div className={ stylesD.helpContent}>
        <div className={ stylesD.topic}>Stats are basic kpi style charts embeded into the webpart</div>
        <ul>
          <li>If you want basic KPI charts (like counting items) with little effort, these are for you!</li>
          <li>These are not intended for anything advanced.  Use PowerBI or other alternatives for that.</li>
          <li>Basic Charts include Tiles with Counts, Horizontal Bars, and Paretos</li>
          <li>They give the end user a simple button to see charts defined in the property pane.</li>
          <li>These require some advanced settings.  Please contact the SharePoint team or Join ShareLab to get more information.</li>
        </ul>
        { PleaseSeeWiki }
      </div>
    </PivotItem>

    <PivotItem  headerText={ 'Commands' } >
      <div className={ stylesD.helpContent}>
        <div className={ stylesD.topic}>Commands are buttons that can do updates to your list.</div>
        <div>Commands can be simple or advanced.  Please join ShareLab if you want some help or have questions.</div>
        <div style={{ display: 'flex' }}>
          <div>
            <div className={ stylesD.topic}>Sample Command</div>
            { putObjectIntoJSON( SampleCommands ) }
          </div>
          <div>
            <div className={ stylesD.topic}>About Commands structure</div>
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
                <li><b>showWhenEvalTrue:</b> Shows button for specific user.  In this example, when the user is the person in the AssignedTo column.</li>
              </ul>
            </ul>
          </div>
        </div>
        { PleaseSeeWiki }
      </div>
    </PivotItem>
</Pivot>
</div>;