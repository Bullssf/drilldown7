import * as React from 'react';

// import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

export function errorsContent( ) {

    let thisPage = null;
    let messageRows = [];

    messageRows.push( <tr><td>Refiner just shows "All"</td><td>  </td><td>Refiner Rule must be compatible with the refiner.  For instance, you can't have a date rule for a person field.</td></tr> );
    messageRows.push( <tr><td></td><td>  </td><td>Check for extra 'space' characters in the refiner string.  NOTE as of #135, removing all spaces from refiners and viewField 'name' and 'linkPropertyName' strings before passing to react component.</td></tr> );


    messageRows.push( <tr><td>Dates formatted as <b>YYYY-MM</b></td><td>  </td><td><b>Any Calc or Choice column values</b> that could be interpreted as a Date, should use <b>Refiner Rule: groupByString</b>.  If not, it will convert it to a UTC date which may be shifted from the expected YYYY-MM</td></tr> );
    messageRows.push( <tr><td>List says x Items but is empty</td><td>  </td><td>Make sure List Views are set up with fields</td></tr> );
    messageRows.push( <tr><td>Refiner Summary Stack order</td><td>  </td><td>When you have refiner in date format MMM or DDD (like Jan Feb Mar), refiners are sorted in logical order but stacked bar chart is sorted alphabetically.  Given this is not used as much, adds a lot of complexity, it is not on the roadmap to correct.</td></tr> );


    messageRows.push( <tr><td>Separate Charts webpart empty</td><td>  </td><td>1.) Be sure your <b>Summary Stats</b> object (in main webpart) contains <b>"consumer": 1, -- this tells the webpart to publish chart to other webpart.</b>.</td></tr> );
    messageRows.push( <tr><td></td><td>  </td><td>2.) Be sure <b>Consumer webpart (chart)</b> is <b>connected</b> to main webpart.</td></tr> );
   



    thisPage = <div>
        <h2></h2>
        <table className={ 'single-page-info-table' } style={{ width: '100%' }}>
            <tr><th style={{ minWidth: '200px' }}>Issue</th><th>Links</th><th>Notes</th></tr>
            { messageRows }
        </table>
    </div>;

/***
*              d8888b. d88888b d888888b db    db d8888b. d8b   db 
*              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
*              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
*              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
*              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
*              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
*                                                                 
*                                                                 
*/

    let html1 =
        <div className={ 'single-page-info-pane' }>
            { thisPage }
        </div>;
        
    return { html1: html1 };

}
  

