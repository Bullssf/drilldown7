import * as React from 'react';

import { IHelpTable, } from '../../fpsReferences';
import { repoLink, IRepoLinks } from '../../fpsReferences';
import { convertIssuesMarkdownStringToSpan } from '../../fpsReferences';
import { makeid } from '../../fpsReferences';

// import { createAboutRow } from '../../fpsReferences';


export function whyContent( ): any{

    // return null;

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
            <li>Get the benefits of grouping by columns.</li>
            <li>You can group in ways not possible using out of the box functionality</li>
            <li>Consolidate values using built in string functions - like FirstWord or First Character - See PropPaneHelp.</li>
            <div>There are over 20 Refiner rules and 40 String functions built in</div>
            <li>You can group by multi-select columns like choice, lookup</li>
            <li>You can group by date groups like converting date values to Years or Months</li>
            <li>You can group by Lookup value extended properties... the properties tied to lookup items</li>
            <li>Performance analytics right in the web part</li>
        </ul>
    </div>;

    table.rows.push( createWhyRow(<b>Drilldown Webpart</b>, <span style={{ color: 'darkgreen', fontSize: 'larger' }}><b>{ `Benefits` } </b></span>, repoLink ) );
    table.rows.push( createWhyRow(``, thisBenefits, repoLink ) );
    table.rows.push( createWhyRow(<b>Drilldown Webpart</b>, <span style={{ color: 'red', fontSize: 'larger' }}><b>{ `Limitations` } </b></span>, repoLink ) );
    table.rows.push( createWhyRow( ``, <div>Can not use Out of box Column and View Formatting</div>, repoLink ) );


    // table.rows.push( createWhyRow(<b>Out of box list view</b>, <span>See notes below.</span>, repoLink ) );

    table.rows.push( createWhyRow(``, ``, repoLink ) );

    let ootbLimitations = <div>
        <ul>
            <li>Can not group by multi-select columns</li>
        </ul>
    </div>;

    table.rows.push( createWhyRow(<b>All MSFT Webparts</b>, <span  style={{ color: 'red', fontSize: 'larger' }}><b>Limitations</b></span>, repoLink ) );
    table.rows.push( createWhyRow(``, ootbLimitations, repoLink ) );

    table.rows.push( createWhyRow(<b>All MSFT Webparts</b>, <span  style={{ color: 'green', fontSize: 'larger' }}><b>Benefits</b></span>, repoLink ) );
    table.rows.push( createWhyRow(``, <li>Can use column and view formatting</li>, repoLink ) );

    return { table: table };

}
  
function createWhyRow( webpart: any, comments: any, repoLink: IRepoLinks | undefined ) {

    let fullFocus = convertIssuesMarkdownStringToSpan( comments, repoLink );

    let tds = [<span key={ makeid( 6 )}style={{whiteSpace: 'nowrap'}} >{ webpart }</span>,
        <span key={ makeid( 6 )}>{ fullFocus }</span>,] ;

    return tds;
}
