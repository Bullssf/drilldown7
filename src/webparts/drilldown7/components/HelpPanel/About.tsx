import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/banner/SinglePage/ISinglePageProps';

import * as devLinks from '@mikezimm/npmfunctions/dist/Links/LinksDevDocs';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

export const panelVersionNumber = '2022-04-04 -  1.2.0.11'; //Added to show in panel

export function aboutTable( repoLinks: IRepoLinks, showRepoLinks: boolean ) {

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    table.rows.push( createAboutRow('2022-04-04','1.2.0.11'  ,'#135, #137 - Assist in refiner typos, #136 - Show Unknown items tab for when multiselect column is empty.  #139 - trim functions', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-28','1.2.0.10'  ,'#128, #129 - number & Multi User Id refiners fix, #130, #131 - UI', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-28','1.2.0.9'  ,'#115 - links, #119 - refiner bug, #122 - more parsing on more things, npmFunctions v1.0.199', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#123 - improve error message, #124 - prop pane help, #125 - prop pane refresh', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-28','1.2.0.8'  ,'#80, #115, add text parsing to refiners, refactor gets', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-24','1.2.0.7'  ,'#111 - Special function column features', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-23','1.2.0.6'  ,'#107 - Special link column features', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2022-03-23','1.2.0.5'  ,'#103 - File Links, #104 - List Language for sorting', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2022-03-23','1.2.0.4'  ,'#96, #95, #42, #47, #94 - Fix Sorting with CAPS, trimming all refiner strings', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-22','1.2.0.3'  ,'#88, #90, Performance improvements', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#77, #78, #82, #83, #85 - Bug fixes', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#76, #86, #88, #92, #93, #97, #98, #99 - Improvements', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#85, #86 - Add Banner with Error Messages', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2022-03-18','1.2.0.2','Espanol language update, remove settings alerts!', showRepoLinks === true ? repoLinks : null ) );


    table.rows.push( createAboutRow('2022-01-23','1.2.0.1','HelpPanel, npmFunctions v1.0.133', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('"'         ,'"'      ,'Fix #64, #65, #66', showRepoLinks === true ? repoLinks : null ) );

    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Prod Testing bugs, collapsable charts, displays in narrow section', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Change solution guid back to 892e5eab42f8', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-11-02','1.1.0.1','Change solution guid from 892e5eab42f8 to bf19e6f8-99d0-47c2-9578-a8379831da9a', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0',<span>Add separate webparts for additional page layouts - 3 webparts available:  <b>Filters, Charts, List</b></span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0',<span>Add <b>Quick Commands</b> including Filtering buttons, updating <b>Text, People, Dates, Numbers</b></span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-10-14','1.0.4.6',<span>Add <b>Early Access bar</b></span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-10-08','1.0.4.5',<span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-10-06','1.0.4.4',<span>Fix Refiners based on numbers, add <b>Math Groupings</b> + Bug fixes</span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.3','Add Buttons to Property Pane', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.2','Update Prop pane for Toggles and other settings', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.1',<span>Add Summary <b>Stats charts</b>, add <b>kpi-tiles</b> chart type</span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-09-29','1.0.3.1','Property Pane <b>listDefinition Selector</b> works now', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.2','Bump to test hosting issue', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.1',<span>Summary <b>Refiner charts</b> workingIncluding On-Click Reformat</span>, showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.2.0','Add Data and Charts Testing note', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.1.0','Add React based list With sorting, columnwidths, grouping and details button', showRepoLinks === true ? repoLinks : null ) );
    table.rows.push( createAboutRow('2020-09-14','1.0.0.1','Baseline Drilldown from Generic Project With basic Pivot and Command bar options', showRepoLinks === true ? repoLinks : null ) );
  
    return { table: table };

}

export function createAboutRow( date: string, version: string, focus: any, repoLinks: IRepoLinks | null ) {

    let fullFocus = convertIssuesMarkdownStringToSpan( focus, repoLinks );

    let tds = [<span style={{whiteSpace: 'nowrap'}} >{ date }</span>, 
        <span style={{whiteSpace: 'nowrap'}} >{ version }</span>, 
        <span>{ fullFocus }</span>,] ;

    return tds;
}