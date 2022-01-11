import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

import * as devLinks from '@mikezimm/npmfunctions/dist/Links/LinksDevDocs';

export const panelVersionNumber = '2021-12-07 -  1.5.1.1'; //Added to show in panel

export function aboutTable() {

    let underScoreIssue = <a href="https://github.com/mikezimm/Pivot-Tiles/issues/30" target="_blank">Issue #30</a>;

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

//     <table className={styles.infoTable}>
//     <tr><th>Date</th><th>Version</th><th>Focus</th><th>Notes</th></tr>
//     <tr><td>2020-11-03</td><td>{'1.1.0.3'}</td><td>Prod Testing bugs, collapsable charts, displays in narrow section</td><td></td></tr>
//     <tr><td>2020-11-03</td><td>{'1.1.0.3'}</td><td>Change solution guid back to 892e5eab42f8</td><td></td></tr>
//     <tr><td>2020-11-02</td><td>{'1.1.0.1'}</td><td>Change solution guid from 892e5eab42f8 to bf19e6f8-99d0-47c2-9578-a8379831da9a</td><td></td></tr>
//     <tr><td>2020-11-01</td><td>{'1.1.0.0'}</td><td>Add separate webparts for additional page layouts - 3 webparts available:  <b>Filters, Charts, List</b> </td><td></td></tr>
//     <tr><td>2020-11-01</td><td>{'1.1.0.0'}</td><td>Add <b>Quick Commands</b> including Filtering buttons, updating <b>Text, People, Dates, Numbers</b></td><td></td></tr>
//     <tr><td>2020-10-14</td><td>{'1.0.4.6'}</td><td>Add <b>Early Access bar</b></td><td></td></tr>
//     <tr><td>2020-10-08</td><td>{'1.0.4.5'}</td><td>Add support to view <b>List attachments, List link, Stat chart updates</b></td><td></td></tr>
//     <tr><td>2020-10-06</td><td>{'1.0.4.4'}</td><td>Fix Refiners based on numbers, add <b>Math Groupings</b></td><td>+ Bug fixes</td></tr>
//     <tr><td>2020-10-01</td><td>{'1.0.4.3'}</td><td>Add Buttons to Property Pane</td><td></td></tr>
//     <tr><td>2020-10-01</td><td>{'1.0.4.2'}</td><td>Update Prop pane for Toggles and other settings</td><td></td></tr>
//     <tr><td>2020-10-01</td><td>{'1.0.4.1'}</td><td>Add Summary <b>Stats charts</b>, add <b>kpi-tiles</b> chart type</td><td></td></tr>
//     <tr><td>2020-09-29</td><td>{'1.0.3.1'}</td><td>Property Pane <b>listDefinition Selector</b> works now</td><td></td></tr>
//     <tr><td>2020-09-25</td><td>{'1.0.2.2'}</td><td>Bump to test hosting issue</td><td></td></tr>
//     <tr><td>2020-09-25</td><td>{'1.0.2.1'}</td><td>Summary <b>Refiner charts</b> working</td><td>Including On-Click Reformat</td></tr>
//     <tr><td>2020-09-15</td><td>{'1.0.2.0'}</td><td>Add Data and Charts</td><td>Testing note</td></tr>
//     <tr><td>2020-09-15</td><td>{'1.0.1.0'}</td><td>Add React based list</td><td>With sorting, columnwidths, grouping and details button</td></tr>
//     <tr><td>2020-09-14</td><td>{'1.0.0.1'}</td><td>Baseline Drilldown from Generic Project</td><td>With basic Pivot and Command bar options</td></tr>
// </table>

    table.rows.push( createAboutRow('2020-10-14',"1.1.0.2","Add Site News BannerImageUrl.Url for Image" ) );
    
    return { table: table };

}

function createAboutRow( date: string, version: string, focus: any ) {
    let tds = [<span style={{whiteSpace: 'nowrap'}} >{ date }</span>, 
        <span style={{whiteSpace: 'nowrap'}} >{ version }</span>, 
        <span>{ focus }</span>,] ;

    return tds;
}