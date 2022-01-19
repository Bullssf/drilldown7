import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

import * as devLinks from '@mikezimm/npmfunctions/dist/Links/LinksDevDocs';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

export const panelVersionNumber = '2021-12-07 -  1.5.1.1'; //Added to show in panel

export function aboutTable( repoLinks: IRepoLinks ) {

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    table.rows.push( createAboutRow('2022-01-18','1.2.0.0','HelpPanel, npmFunctions v1.0.138, Fix #64, #65, #66', repoLinks ) );

    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Prod Testing bugs, collapsable charts, displays in narrow section', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Change solution guid back to 892e5eab42f8', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-02','1.1.0.1','Change solution guid from 892e5eab42f8 to bf19e6f8-99d0-47c2-9578-a8379831da9a', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0','Add separate webparts for additional page layouts - 3 webparts available:  <b>Filters, Charts, List</b> ', repoLinks ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0','Add <b>Quick Commands</b> including Filtering buttons, updating <b>Text, People, Dates, Numbers</b>', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-14','1.0.4.6','Add <b>Early Access bar</b>', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-08','1.0.4.5','Add support to view <b>List attachments, List link, Stat chart updates</b>', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-06','1.0.4.4','Fix Refiners based on numbers, add <b>Math Groupings</b></td><td>+ Bug fixes', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.3','Add Buttons to Property Pane', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.2','Update Prop pane for Toggles and other settings', repoLinks ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.1','Add Summary <b>Stats charts</b>, add <b>kpi-tiles</b> chart type', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-29','1.0.3.1','Property Pane <b>listDefinition Selector</b> works now', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.2','Bump to test hosting issue', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.1','Summary <b>Refiner charts</b> working</td><td>Including On-Click Reformat', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.2.0','Add Data and Charts</td><td>Testing note', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.1.0','Add React based list</td><td>With sorting, columnwidths, grouping and details button', repoLinks ) );
    table.rows.push( createAboutRow('2020-09-14','1.0.0.1','Baseline Drilldown from Generic Project</td><td>With basic Pivot and Command bar options', repoLinks ) );
  
    return { table: table };

}

//Regular expression for anything like #4 (github issue reference)
export const myRegexp = /\#(\d+)/g;   //https://stackoverflow.com/a/43622095

export function getStringArrayWithHashNumbers( testString: string, matches: string[] ) {
    //Replace any # with link to issue
    //First find all instances of # and digits

    console.log('getStringArrayWithHashNumbers matches: ', matches);
    let subSpans: string[] = [];
      let partialString: string = testString + '';
      matches.map( ( thisMatch, i ) =>  {
        console.log('getStringArrayWithHashNumbers partialString: ',partialString);
        let idx: number = partialString.indexOf(thisMatch);
        if ( idx === 0 )  {
          //This found string at beginning
          subSpans.push(`${thisMatch}`);
          partialString=partialString.substring(thisMatch.length);
          console.log( `${i} ${thisMatch}`, subSpans, 'idx===0');
          
        } else if ( idx > 0 ) {
          //This found string after beginning
          subSpans.push(partialString.substring(0,idx));
          subSpans.push(`${thisMatch}`);
          console.log( `${i} ${thisMatch}`, subSpans, 'idx>0 ');
          partialString=partialString.substring(idx + thisMatch.length);
        }
        
      });
    if ( partialString ) { subSpans.push( partialString ); }
    return subSpans;
}

export function replaceHashNumbWithRepoIssues( testString: string, repoLinks: IRepoLinks ) {
        //Replace any # with link to issue
        //First find all instances of # and digits
        let matches: string[] = testString.match(myRegexp);  //Should get array of all values like #3, #43. etc
        let createSpans: string[] = getStringArrayWithHashNumbers( testString, matches ); // Gets full array of strings including #3 and everything in between
        
        let spans: any[] = [];
        createSpans.map( thisSpan => {
            if (matches.indexOf( thisSpan ) > - 1) {  //Then replace text with  link
                // spans.push( `<<${thisSpan}>>` );
                spans.push( <a href={`${repoLinks.href}/issues/${ thisSpan.substr(1)}`} target="_blank">{thisSpan}</a> );
            } else { //Just push text
                spans.push( `${thisSpan}` );
            }
        });

        return spans;

}

function createAboutRow( date: string, version: string, focus: any, repoLinks: IRepoLinks | null ) {

    let fullFocus = null;
    if ( focus && repoLinks !== null && focus.indexOf('#') > -1 ) {

        fullFocus = <span>
            { replaceHashNumbWithRepoIssues( focus, repoLinks ) }
        </span>;

    } else { 
        fullFocus = focus;
    }

    let tds = [<span style={{whiteSpace: 'nowrap'}} >{ date }</span>, 
        <span style={{whiteSpace: 'nowrap'}} >{ version }</span>, 
        <span>{ fullFocus }</span>,] ;

    return tds;
}