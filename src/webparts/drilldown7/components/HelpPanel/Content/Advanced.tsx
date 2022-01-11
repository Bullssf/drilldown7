import * as React from 'react';

import styles from '../banner/SinglePage/InfoPane.module.scss';

import * as devLinks from '@mikezimm/npmfunctions/dist/Links/LinksDevDocs';

export function advancedContent() {



/**
* 
'parseBySemiColons' | 'parseByCommas' | 'groupBy10s' |  'groupBy100s' |  'groupBy1000s' |  'groupByMillions' | 
'isDate' | 'groupByDays' | 'groupByWeeks' |  'groupByMonths' |  'groupByYears' | 'groupByDayOfWeek' |  'groupByDateBuckets' |
'groupByUsers' | 'invalidRules' | '
*/

    let row00 = <tr><td>Refiner Rules</td><td></td><td></td></tr>;
    let row01 = <tr><td>Parse text</td><td>parseBySemiColons, parseByCommas</td><td></td></tr>;
    let row03 = <tr><td>Group Numbers</td><td>groupBy10s, groupBy100s, groupBy1000s, groupByMillions</td><td></td></tr>;


    let row07 = <tr><td>Dates        </td><td>isDate, groupByDays, groupByWeeks, groupByMonths, groupByYears</td><td></td></tr>;
    let row08 = <tr><td>             </td><td>groupByDayOfWeek, groupByMonthsMMM, groupByDayOfWeek, </td><td></td></tr>;
    let row09 = <tr><td>             </td><td>groupByDateBuckets</td><td></td></tr>;
    let row10 = <tr>Summary Stats    <td></td><td></td><td></td></tr>;
    let row11 = <tr><td>             </td><td> </td><td></td></tr>;
    let row12 = <tr><td>             </td><td> </td><td></td></tr>;
    let row13 = <tr><td>             </td><td> </td><td></td></tr>;

    let thisPage = <div>
        <h2></h2>
        <table >
            <tr><th>Info</th><th>Example</th><th>Details</th></tr>
            { row00 }
            { row01 }
            {  }
            { row03 }
            {  }
            {  }
            {  }

            { row07 }
            { row08 }
            { row09 }
            { row10 }
            { row11 }
            { row12 }
            { row13 }
        </table>
    </div>;

return { html1: thisPage };

let messageRows = [];
 
// messageRows.push( <tr><td></td><td></td><td></td></tr> );
messageRows.push( <tr><td>Open Site Admin Permissions</td><td>CTRL-Click <strong>Admins</strong> tab</td><td>Only available to Site Admins when in <strong>Groups</strong> or <strong>Permissions</strong> tabs.</td></tr> );
let rows: Element[] = [];

    messageRows.push( <tr></tr> );

    thisPage = <div>
        <h2></h2>
        <table className={styles.infoTable} style={{ width: '100%' }}>
            <tr><th>Info</th><th>Example</th><th>Details</th></tr>
            { messageRows }
        </table>
    </div>;


    return { html1: thisPage };

}
  

