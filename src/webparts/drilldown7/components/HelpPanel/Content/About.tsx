import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

import * as devLinks from '@mikezimm/npmfunctions/dist/Links/LinksDevDocs';

export const panelVersionNumber = '2021-12-07 -  1.5.1.1'; //Added to show in panel

export function aboutTable() {

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    table.rows.push( createAboutRow('2022-01-18','1.2.0.0','HelpPanel, npmFunctions v1.0.138, Fix reload on update crash' ) );

    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Prod Testing bugs, collapsable charts, displays in narrow section' ) );
    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Change solution guid back to 892e5eab42f8' ) );
    table.rows.push( createAboutRow('2020-11-02','1.1.0.1','Change solution guid from 892e5eab42f8 to bf19e6f8-99d0-47c2-9578-a8379831da9a' ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0','Add separate webparts for additional page layouts - 3 webparts available:  <b>Filters, Charts, List</b> ' ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0','Add <b>Quick Commands</b> including Filtering buttons, updating <b>Text, People, Dates, Numbers</b>' ) );
    table.rows.push( createAboutRow('2020-10-14','1.0.4.6','Add <b>Early Access bar</b>' ) );
    table.rows.push( createAboutRow('2020-10-08','1.0.4.5','Add support to view <b>List attachments, List link, Stat chart updates</b>' ) );
    table.rows.push( createAboutRow('2020-10-06','1.0.4.4','Fix Refiners based on numbers, add <b>Math Groupings</b></td><td>+ Bug fixes' ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.3','Add Buttons to Property Pane' ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.2','Update Prop pane for Toggles and other settings' ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.1','Add Summary <b>Stats charts</b>, add <b>kpi-tiles</b> chart type' ) );
    table.rows.push( createAboutRow('2020-09-29','1.0.3.1','Property Pane <b>listDefinition Selector</b> works now' ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.2','Bump to test hosting issue' ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.1','Summary <b>Refiner charts</b> working</td><td>Including On-Click Reformat' ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.2.0','Add Data and Charts</td><td>Testing note' ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.1.0','Add React based list</td><td>With sorting, columnwidths, grouping and details button' ) );
    table.rows.push( createAboutRow('2020-09-14','1.0.0.1','Baseline Drilldown from Generic Project</td><td>With basic Pivot and Command bar options' ) );
  
    return { table: table };

}

function createAboutRow( date: string, version: string, focus: any ) {
    let tds = [<span style={{whiteSpace: 'nowrap'}} >{ date }</span>, 
        <span style={{whiteSpace: 'nowrap'}} >{ version }</span>, 
        <span>{ focus }</span>,] ;

    return tds;
}