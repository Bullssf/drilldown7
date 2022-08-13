import * as React from 'react';

import { Icon } from 'office-ui-fabric-react';

import * as links from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/banner/SinglePage/ISinglePageProps';

export function whyContent( repoLinks: IRepoLinks ) {

    return null;

    let table : IHelpTable  = {
        heading: 'Why use Pivot Tiles',
        headers: ['Web part','Features benefits, comparison'],
        rows: [],
    };

    // let iconSize = 'large';

    // let iconStyles: any = { root: {
    //     fontSize: 'x-large',
    //     fontWeight: 600,
    //     paddingRight: '10px',
    //     paddingLeft: '10px',
    // }};

    // let gridIcon = <Icon iconName={"GridViewSmall"}  style={ iconStyles } />; 

    let thisBenefits = <div>
        <ul>
            <li>Require HTML/Scripts to be contained in approved locations.</li>
            <li>Log who edits webpart properties (ie who is determining what scritps site users will run). <b> - Optional</b></li>
            <li>Log what scripts were executed by users and when - to allow tracability of there is a security issue. <b> - Optional</b></li>
            <li>Content Editor Code breakdown - including all js, css, links, images referenced in the html</li>
            <li>Code breakdown - of the loaded web part or entire page</li>
            <li>Performance analytics right in the web part</li>
            <li>Easy visiblity and access to the Site, Library and file that is embeded/loaded.</li>
            <li>FPS Web part options - Banner, Gear, Expando, Go to Home, Go to Parent site etc...</li>
        </ul>
    </div>;

    table.rows.push( createWhyRow(<b>ALV Financial Manual</b>, <span style={{ color: 'darkgreen', fontSize: 'larger' }}><b>{ `Benefits` } </b></span>, repoLinks ) );
    table.rows.push( createWhyRow(``, thisBenefits, repoLinks ) );

    table.rows.push( createWhyRow(<b>Pnp Script Editor</b>, <span>See notes below.</span>, repoLinks ) );
    table.rows.push( createWhyRow(<b>Pnp Content Editor</b>, <span>See notes below.</span>, repoLinks ) );
    table.rows.push( createWhyRow(<b>Classic Content Editor</b>, <span>See notes below.</span>, repoLinks ) );
    table.rows.push( createWhyRow(<b>Classic Content Editor</b>, <span>See notes below.</span>, repoLinks ) );
    
    table.rows.push( createWhyRow(``, ``, repoLinks ) );

    let ootbLimitations = <div>
        <ul>
            <li><span>Anyone can run any code contained anywhere without any tenant controls or logging.</span></li>
        </ul>
    </div>;

    table.rows.push( createWhyRow(<b>All MSFT Webparts</b>, <span  style={{ color: 'red', fontSize: 'larger' }}><b>Limitations</b></span>, repoLinks ) );
    table.rows.push( createWhyRow(``, ootbLimitations, repoLinks ) );

    table.rows.push( createWhyRow( ``, ``, repoLinks ) );

    return { table: table };

}
  
function createWhyRow( webpart: any, comments: any, repoLinks: IRepoLinks | null ) {

    let fullFocus = convertIssuesMarkdownStringToSpan( comments, repoLinks );

    let tds = [<span style={{whiteSpace: 'nowrap'}} >{ webpart }</span>,
        <span>{ fullFocus }</span>,] ;

    return tds;
}
