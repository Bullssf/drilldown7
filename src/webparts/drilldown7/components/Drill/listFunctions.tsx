
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { ICustViewDef } from '../../components/IReUsableInterfaces';

 /***
 *     d888b  d88888b d888888b      db    db d888888b d88888b db   d8b   db      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *    88' Y8b 88'     `~~88~~'      88    88   `88'   88'     88   I8I   88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *    88      88ooooo    88         Y8    8P    88    88ooooo 88   I8I   88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *    88  ooo 88~~~~~    88         `8b  d8'    88    88~~~~~ Y8   I8I   88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *    88. ~8~ 88.        88          `8bd8'    .88.   88.     `8b d8'8b d8'      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *     Y888P  Y88888P    YP            YP    Y888888P Y88888P  `8b8' `8d8'       YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                             
 *                                                                                                                                                             
 */

export function getAppropriateViewFields ( viewDefs: ICustViewDef[], currentWidth: number ) {
    let result : IViewField[] = [];

    let maxViewWidth = 0 ;

    if ( viewDefs ) {
        viewDefs.map( vd => {
            if ( currentWidth >= vd.minWidth && vd.minWidth >= maxViewWidth ) {
                result = vd.viewFields;
                maxViewWidth = vd.minWidth;
            }
        });
    
        let avgWidth = result.length > 0 ? currentWidth/result.length : 100;
        let completeResult = result.map( f => {
    
            let thisField = f;
            let minWidth = thisField.minWidth ? thisField.minWidth : avgWidth;
            let maxWidth = thisField.maxWidth ? thisField.maxWidth : minWidth  + 100;
            if ( thisField.minWidth === undefined ) { thisField.minWidth = minWidth; }
            if ( thisField.maxWidth === undefined ) { thisField.maxWidth = maxWidth; }
            if ( thisField.isResizable === undefined ) { thisField.isResizable = true; }
            if ( thisField.sorting === undefined ) { thisField.sorting = true; }
            return thisField;
        });
    
        console.log('getAppropriateViewFields:', completeResult);
        return completeResult;

    } else {
        alert('View Def is not available... can not show any items! - see getAppropriateViewFields()');
        return null;
    }

}

export function getAppropriateViewGroups ( viewDefs: ICustViewDef[], currentWidth: number ) {
    let result : IGrouping[] = [];

    let maxViewWidth = 0 ;

    if ( viewDefs ) {
        viewDefs.map( vd => {
            if ( currentWidth >= vd.minWidth && vd.minWidth >= maxViewWidth ) {
                result = vd.groupByFields;
                maxViewWidth = vd.minWidth;
            }
        });
        console.log('getAppropriateViewGroups: ', result);
        return result;
    } else {
        alert('View Def is not available... can not show any items! - see getAppropriateViewGroups()');
        return null;
    }

}

export function getAppropriateViewProp ( viewDefs: ICustViewDef[], currentWidth: number, prop: 'includeDetails' | 'includeAttach' | 'includeListLink' ) {
    let result : boolean = false;

    if ( viewDefs ) {
        let maxViewWidth = 0 ;
        viewDefs.map( vd => {
            if ( currentWidth >= vd.minWidth && vd.minWidth >= maxViewWidth ) {
                result = vd[prop];
                maxViewWidth = vd.minWidth;
            } else {

            }
        });
        console.log('getAppropriateDetailMode: ', result);
        return result;
    } else {
        alert('View Def is not available... can not show any items! - see getAppropriateViewProp()');
        return null;
    }
}
