import * as React from 'react';

import styles from '../banner/SinglePage/InfoPane.module.scss';

import { Icon } from 'office-ui-fabric-react';

import * as links from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

export function basicsContent( repoLinks: IRepoLinks ) {

    return null;

    let messageRows = [];

    let iconSize = 'large';

    let iconStyles: any = { root: {
        fontSize: 'x-large',
        fontWeight: 600,
        paddingRight: '10px',
        paddingLeft: '10px',
    }};

    let gridIcon = <Icon iconName={"GridViewSmall"}  style={ iconStyles } />; 
    let tilesIcon = <Icon iconName={"Tiles"}  style={ iconStyles } />; 
    let filterIcon = <Icon iconName={"ClearFilter"}  style={ iconStyles } />;
    let dashIcon = <Icon iconName={"ChromeMinimize"}  style={ iconStyles } />;

    messageRows.push( <tr><td>CTRL-Click <b>Tile</b></td><td>Tile</td><td>Open Tile desstination in <b>NEW TAB</b></td></tr> );
    messageRows.push( <tr><td>CTRL-ALT-SHFT-Click <b>Tile</b></td><td>Tile</td><td>Go directly to that Tile item's properties</td></tr> );
    messageRows.push( <tr><td>CTRL-Click <b>Category</b></td><td>Top Left</td><td>Set that Category as the "Hero" Category</td></tr> );
    messageRows.push( <tr><td></td><td></td><td></td></tr> );
    messageRows.push( <tr><td>Click on &nbsp;&nbsp; <b>Grid Icon { gridIcon } { tilesIcon } </b></td><td>Upper Right</td><td>Change format of tiles to Cards, List, Tiles</td></tr> );
    messageRows.push( <tr><td>Click on &nbsp;&nbsp;<b>Filter X Icon  { filterIcon } </b></td><td>Upper Right</td><td>Show All Tiles</td></tr> );
    messageRows.push( <tr><td>Click on &nbsp;&nbsp;<b>-- Icon { dashIcon }</b></td><td>Upper Right</td><td>Hide All Tiles</td></tr> );

    messageRows.push( <tr><td></td><td></td><td></td></tr> );

    let thisTable = <div style={{ paddingTop: 15 }}>
        <h2>Easter Eggs</h2>
        <table className={styles.infoTable} style={{ width: '100%' }}>
            <tr><th style={{ minWidth: '200px' }}>Do this...</th><th>Where</th><th>What it does</th></tr>
            { messageRows }
        </table>
    </div>;

    let thisPage = null;
    thisPage = <div className={styles.infoPane}>

    <h3>Please submit any issues or suggestions on github (requires free account)</h3>
    { links.gitRepoPivotTiles.issues }
    { thisTable }
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
        <div className={ styles.infoPane }>
            { thisPage }
        </div>;

    return { html1: html1 };

}
  

