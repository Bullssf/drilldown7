import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

export function tricksTable( repoLinks: IRepoLinks ) {

    let table : IHelpTable  = {
        heading: 'Undocumented and dangerous url parameters',
        headers: ['Param','Value','Active?', 'Notes'],
        rows: [],
    };

    let hasSearch = window.location.search && window.location.search.length > 0 ? true : false;
    let searchParams = hasSearch === true ? window.location.search : '';

    searchParams = searchParams.split('%3a').join(':');
    let hasSearchParams = searchParams.length > 0 ? '&' : '?';

    let hasScenarioDev = searchParams.indexOf('scenario=dev') > -1 ? 
        makeCenteredBoldSpan( 'true' ) : 
        makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + 'scenario=dev' }>Activate!</a> ) ;

    let hasAllowOther = searchParams.indexOf('allowOtherSites=true') > -1 ?  
        makeCenteredBoldSpan('true') : 
        makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + 'allowOtherSites=true' }>Activate!</a> ) ;

    let hasCrazy = searchParams.indexOf('crazy=true') > -1 ?  
        makeCenteredBoldSpan('true') : '' ;

    let hasCreate = searchParams.indexOf('create=true') > -1 ?  
        makeCenteredBoldSpan('true') : '' ;

    //Just replacing : with encoded url based on testing.
    let gulpParam1 = 'debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js';
    let gulpParam2 = 'debug=true&noredir=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js';

    let bareLink = hasSearch ?  
        makeCenteredBoldSpan (<a href={ window.location.pathname }>Activate!</a> ) :
        makeCenteredBoldSpan('true');

    let hasGulp = searchParams.indexOf( gulpParam1 ) > -1 || searchParams.indexOf( gulpParam2 ) > -1 
        ? makeCenteredBoldSpan('true') 
        : makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + gulpParam1 }>Activate!</a> ) ;

    table.rows.push( [ makeCenteredSpan('scenario'), makeCenteredSpan('dev'), hasScenarioDev,    <span>Opens up additional options - 'Rails Off' meaning limited safety checks. </span>] );
    table.rows.push( [ makeCenteredSpan('gulp serve'), makeCenteredSpan('dev'), hasGulp,    <span>Adds param to Url to use gulp serve code instead of published code</span>] );
    table.rows.push( [ makeCenteredSpan('allowOtherSites'), makeCenteredSpan('true'), hasAllowOther,   <span>Allows you to do some 'Rails Off' functions on other sites { '' } </span>] );
    table.rows.push( [ makeCenteredSpan('clearParams'), makeCenteredSpan( `${hasSearch}` ), bareLink,   <span>Reload without any parameters (everything after the ? in the url ) </span>] );

    // table.rows.push( [ makeCenteredSpan('crazy'), makeCenteredSpan('true'), hasCrazy,   <span>Opens up additional even more options - 'DO NOT USE UNLESS YOU KNOW WHAT YOU ARE DOING'.</span>] );
    // table.rows.push( [ makeCenteredSpan('create'), makeCenteredSpan('true'), hasCreate,   <span>Opens up additional options - create sample items in lists</span>] );

    // table.rows.push( [ makeCenteredSpan('scenario'), makeCenteredSpan('dev'),    <span>Opens up additional options</span>] );

    /*
    table.rows.push( ['2021-00-00', '1.0.0.0',    <span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>,    ''] );
    */
    
    return { table: table };

}

export function makeCenteredSpan( info: any ) {
    return { info: info, style: { textAlign: 'center'} } ;
}

export function makeCenteredBoldSpan( info: any ) {
    return { info: info, style: { textAlign: 'center', fontWeight: 'bolder' } } ;
}