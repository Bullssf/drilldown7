import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

import * as devLinks from '@mikezimm/npmfunctions/dist/Links/LinksDevDocs';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

export const panelVersionNumber = '2022-03-23 -  1.2.0.6'; //Added to show in panel

export function aboutTable( repoLinks: IRepoLinks ) {

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };
    table.rows.push( createAboutRow('2022-03-23','1.2.0.6'  ,'#107 - Special link column features', repoLinks ) );

    table.rows.push( createAboutRow('2022-03-23','1.2.0.5'  ,'#103 - File Links, #104 - List Language for sorting', repoLinks ) );
    table.rows.push( createAboutRow('2022-03-23','1.2.0.4'  ,'#96, #95, #42, #47, #94 - Fix Sorting with CAPS, trimming all refiner strings', repoLinks ) );

    table.rows.push( createAboutRow('2022-03-22','1.2.0.3'  ,'#88, #90, Performance improvements', repoLinks ) );
    table.rows.push( createAboutRow('"','"'                 ,'#77, #78, #82, #83, #85 - Bug fixes', repoLinks ) );
    table.rows.push( createAboutRow('"','"'                 ,'#76, #86, #88, #92, #93, #97, #98, #99 - Improvements', repoLinks ) );
    table.rows.push( createAboutRow('"','"'                 ,'#85, #86 - Add Banner with Error Messages', repoLinks ) );

    table.rows.push( createAboutRow('2022-03-18','1.2.0.2','Espanol language update, remove settings alerts!', repoLinks ) );


    table.rows.push( createAboutRow('2022-01-23','1.2.0.1','HelpPanel, npmFunctions v1.0.133', repoLinks ) );
    table.rows.push( createAboutRow('"'         ,'"'      ,'Fix #64, #65, #66', repoLinks ) );

    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Prod Testing bugs, collapsable charts, displays in narrow section', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Change solution guid back to 892e5eab42f8', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-02','1.1.0.1','Change solution guid from 892e5eab42f8 to bf19e6f8-99d0-47c2-9578-a8379831da9a', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0',<span>Add separate webparts for additional page layouts - 3 webparts available:  <b>Filters, Charts, List</b></span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0',<span>Add <b>Quick Commands</b> including Filtering buttons, updating <b>Text, People, Dates, Numbers</b></span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-10-14','1.0.4.6',<span>Add <b>Early Access bar</b></span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-10-08','1.0.4.5',<span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-10-06','1.0.4.4',<span>Fix Refiners based on numbers, add <b>Math Groupings</b> + Bug fixes</span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.3','Add Buttons to Property Pane', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.2','Update Prop pane for Toggles and other settings', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.1',<span>Add Summary <b>Stats charts</b>, add <b>kpi-tiles</b> chart type</span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-09-29','1.0.3.1','Property Pane <b>listDefinition Selector</b> works now', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.2','Bump to test hosting issue', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.1',<span>Summary <b>Refiner charts</b> workingIncluding On-Click Reformat</span>, repoLinks ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.2.0','Add Data and Charts Testing note', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.1.0','Add React based list With sorting, columnwidths, grouping and details button', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-14','1.0.0.1','Baseline Drilldown from Generic Project With basic Pivot and Command bar options', repoLinks ) );
  
    return { table: table };

}


function createAboutRow( date: string, version: string, focus: any, repoLinks: IRepoLinks | null ) {

    let fullFocus = convertIssuesMarkdownStringToSpan( focus, repoLinks );

    let tds = [<span style={{whiteSpace: 'nowrap'}} >{ date }</span>, 
        <span style={{whiteSpace: 'nowrap'}} >{ version }</span>, 
        <span>{ fullFocus }</span>,] ;

    return tds;
}