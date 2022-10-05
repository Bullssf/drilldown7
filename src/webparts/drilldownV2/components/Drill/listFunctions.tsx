
import { IViewField, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { Web,  } from "@pnp/sp/presets/all";

import { ICustViewDef,  } from '@mikezimm/npmfunctions/dist/Views/IListViews';
import { IUser,  } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { IQuickButton, } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

//Manipulation
import { removeItemFromArrayAll, } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

import { IDrillItemInfo } from '@mikezimm/npmfunctions/dist/WebPartInterfaces/DrillDown/IDrillItem';
import { getInitials } from "../../../../services/parse";

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

function getBestFitView (  OrigViewDefs: ICustViewDef[], currentWidth: number ) {

    /**
     * 2022-01-18:  Something in this function mutates the viewDefs which caused the webpart to crash after 
     */
    //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  getBestFitView  (One of these fixed it!)
    let viewDefs: ICustViewDef[] = JSON.parse(JSON.stringify(OrigViewDefs));
    let result : ICustViewDef = null;
    let minResult : ICustViewDef = null;

    let maxViewWidth: number = 0 ;
    let minViewWidth: number = 10000;

    viewDefs.map( vd => {
        let thisWidth: number = typeof vd.minWidth === 'string' ? parseInt(vd.minWidth,10) : vd.minWidth;
        if ( currentWidth >= thisWidth && thisWidth >= maxViewWidth ) {
            result = vd;
            maxViewWidth = thisWidth;
        }
    });

    //This section was created in case the webpart width is smaller than the smallest defined width
    if ( result === null ) {
        console.log('getAppropriateViewFields ERR:  User defined are to big for this webpart width.');
        viewDefs.map( vd => {
            let thisWidth: number = typeof vd.minWidth === 'string' ? parseInt(vd.minWidth,10) : vd.minWidth;
            if ( thisWidth < minViewWidth ) {
                minResult = vd;
                minViewWidth = thisWidth;
            }
        });
        result = minResult;
    }

    // console.log('getAppropriateViewFields: currentWidth = ', currentWidth);
    // console.log('getAppropriateViewFields: Width >= ', maxViewWidth);
    // console.log('getAppropriateViewFields: vd result', result);

    return result;
    
}


export function getAppropriateViewFields ( OrigViewDefs: ICustViewDef[], currentWidth: number ) {

    //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  (One of these fixed it!)
    //2022-01-18:  Skipped the parse/stringify for performance after determining it was not causing the crash.
    let viewDefs: ICustViewDef[] = OrigViewDefs; //JSON.parse(JSON.stringify(OrigViewDefs));

    let result : IViewField[] = [];

    if ( viewDefs ) {

        let viewFields: any[] = getBestFitView( viewDefs, currentWidth ).viewFields ;
        result = viewFields as IViewField[];
    
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
        /*        */

        console.log('getAppropriateViewFields: completeResult', completeResult);

        return completeResult;

    } else {
        alert('View Def is not available... can not show any items! - see getAppropriateViewFields()');
        return null;
    }

}

export function getAppropriateViewGroups ( OrigViewDefs: ICustViewDef[], currentWidth: number ) {

    //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  (One of these fixed it!)
    //2022-01-18:  Skipped the parse/stringify for performance after determining it was not causing the crash.
    let viewDefs: ICustViewDef[] = OrigViewDefs; //JSON.parse(JSON.stringify(OrigViewDefs));

    let result : IGrouping[] = [];

    if ( viewDefs ) {

        result = getBestFitView( viewDefs, currentWidth ).groupByFields;
        //console.log('getAppropriateViewGroups: ', result);
        return result;

    } else {
        alert('View Def is not available... can not show any items! - see getAppropriateViewGroups()');
        return null;
    }

}

//Check npmFunctions v2.1.63 for ICustViewDefKeys to replace prop interface

export function getAppropriateViewProp ( OrigViewDefs: ICustViewDef[], currentWidth: number, prop: 'includeDetails' | 'includeAttach' | 'includeListLink' | 'createItemLink' ) {

    //2022-01-17:  Added this to see if this gets mutated and breaks on refresh items.  (One of these fixed it!)
    //2022-01-18:  Skipped the parse/stringify for performance after determining it was not causing the crash.
    let viewDefs: ICustViewDef[] = OrigViewDefs; // JSON.parse(JSON.stringify(OrigViewDefs));

    let result : boolean = false;

    if ( viewDefs ) {
        result = getBestFitView( viewDefs, currentWidth )[prop];
        //console.log('getAppropriateDetailMode: ', result);
        return result;
    } else {
        alert('View Def is not available... can not show any items! - see getAppropriateViewProp()');
        return null;
    }
}

export function findAllMatches( command: string, regEx: RegExp) {

  // let regEx = /text|rich|append/ig;
  let result: any = null;
  const matches: string[] = [];
  while ((result = regEx.exec(command)) !== null) {
    matches.push(result[0]);
  }
  return matches;

}


export async function updateReactListItem( webUrl: string, listName: string, Id: number, thisButtonObject : IQuickButton, sourceUserInfo: IUser, panelItem: IDrillItemInfo ): Promise<string>{


    //lists.getById(listGUID).webs.orderBy("Title", true).get().then(function(result) {
    //let allItems : IDrillItemInfo[] = await sp.web.webs.get();

    const currentTime = new Date().toLocaleString();

    // let results : any[] = [];

    const thisListWeb = Web(webUrl);

    let errMessage = null;

    let newUpdateItem = JSON.stringify(thisButtonObject.updateItem);

    //Replace [Today] with currect time
    newUpdateItem = newUpdateItem.replace(/\B\[Today\]\B/gi, currentTime);


    //Regex looks for anything matching [Today-+xxx] and replaces with date string
    var newUpdateItem2 = newUpdateItem.replace(/\[Today(.*?)\]/gi, (match =>  {
        let numb = parseInt(match.toLowerCase().substring(6).replace("]",""),10);
        const today = new Date();
        var newdate = new Date();
        newdate.setDate(today.getDate()+numb);
        let newDateString = newdate.toLocaleString();
        return newDateString;
    }) );



    // Replace [MyName] with userId.Title
    newUpdateItem2 = newUpdateItem2.replace(/\[MyName\]/gi, sourceUserInfo.Title );

    let newUpdateItemObj = JSON.parse(newUpdateItem2);


    //Replace [Me]
    Object.keys(newUpdateItemObj).map( k => {
        let thisColumn: any = newUpdateItemObj[k];
        if ( typeof thisColumn === 'string' ) { 
            const thisColumnLC = thisColumn?.toLowerCase();
            //Single value set to current user

            // const CommentCommands = [ 'append rich text', 'new rich text', 'append rich stamp', 'new rich stamp'  ].map( ( cmd: string ) => { return cmd.toLowerCase() });

            const isSpecial = thisColumnLC.indexOf('{{') === 0 && thisColumnLC.indexOf('}}') > 2 ? true : false;

            if ( isSpecial === true ) {

              const makeNew = thisColumnLC.indexOf('append') < 0 ? true : false; // Replaces current value if it doesn't find append
              const addStamp = thisColumnLC.indexOf('stamp') > 1 ? true : false; // Replaces current value if it doesn't find append
              const detectedRich: unknown = panelItem[k] && panelItem[k].indexOf('<div class="ExternalClass') === 0 ? true : null; // Treats as rich text if finds rich
              const detectedPlain: unknown = panelItem[k] && panelItem[k].indexOf('<div class="ExternalClass') !== 0 ? true : null; // Treats as rich text if finds rich

              // If existing data says it's rich or plain, goes with that.  Else goes by command
              const makeRich = detectedRich === true ? true : detectedPlain === true ? false : thisColumnLC.indexOf('rich') > 1 ? true : false; 

              const lineFeed = makeRich === true || detectedRich === true ? '<br>' : `\n`;

              let timeStamp : string = '';

              if ( addStamp === true ) {   //Add User Intials and Date Stamp
                const userInitals = sourceUserInfo?.Title ? getInitials( sourceUserInfo.Title, true, false ) : '';

                if ( makeRich === true ) {
                  timeStamp = `<span style="font-weight:bold">${userInitals} - ${currentTime}</span>${lineFeed}`;

                } else {
                  timeStamp = `${userInitals} - ${currentTime}${lineFeed}`;
                }
              }

              let userComment = prompt( `Add comment to:  ${k} - ${  timeStamp ? 'Is auto-date-stamped :)' : '' }`, 'Enter comment' );

              //https://github.com/mikezimm/drilldown7/issues/215
              if ( makeRich === true ) userComment = `<span>${userComment}</span>`;
              if ( makeNew === false ) userComment = `${userComment}${lineFeed}${lineFeed}`;

              console.log('timeStamp: ', timeStamp );

              console.log('userComment:',userComment );

              if ( userComment && makeNew === false ) {  //Append else make new
                thisColumn = panelItem[k] ? `${timeStamp}${userComment}${lineFeed}${panelItem[k]}` : `${timeStamp}${userComment}` ;

              } else { thisColumn = `${timeStamp}${userComment}` ; }
              console.log('thisColumn:',thisColumn );

            } else if ( thisColumnLC === '[me]' ) {
                thisColumn = sourceUserInfo.Id; 
                console.log('thisColumn is: ', thisColumn ) ;

            //Single value only remove you
            } else if ( thisColumnLC === '[-me]' ) {
                thisColumn = panelItem[k] === sourceUserInfo.Id ? null : panelItem[k]; 

            //Multi value set to current user
            } else if ( thisColumnLC === '{me}' ) { 
                thisColumn = { results: [ sourceUserInfo.Id ]}; 

            //Multi value add current user
            } else if ( thisColumnLC === '{+me}' ) { 

                if ( panelItem[k] ) {
                    try {
                        //thisColumn = panelItem[k].results.push( sourceUserInfo.Id ); //Errored out
                        thisColumn = panelItem[k];
                        if ( thisColumn.indexOf( sourceUserInfo.Id ) < 0 )  { thisColumn.push( sourceUserInfo.Id ); }
                        thisColumn = { results: thisColumn };

                    } catch (e) {
                        let err = getHelpfullError(e);
                        alert( `Error updating item Column ${k} : \n\n${err}` );
                        console.log( `Error updating item Column ${k} :`, err );
                    }
                } else { 
                    thisColumn = { results: [ sourceUserInfo.Id ]} ;
                }

            //Multi value remove current user
            } else if ( thisColumnLC === '{-me}' ) { 

                if ( panelItem[k] ) {
                    try {
                        thisColumn = panelItem[k];
                        thisColumn = removeItemFromArrayAll(thisColumn, sourceUserInfo.Id);
                        thisColumn = { results: thisColumn };

                    } catch (e) {
                        let err = getHelpfullError(e);
                        alert( `Error updating item Column ${k} : \n\n${err}` );
                        console.log( `Error updating item Column ${k} :`, err );
                    }
                } { console.log( `Did not find Column ${k} and could not remove you from it.`, panelItem );
                    console.log( `Here's the full panelItem:`, panelItem );
                }
            } 

            newUpdateItemObj[k] = thisColumn;
        } // END This key value is string
    });

    try {
        let thisListObject = await thisListWeb.lists.getByTitle(listName);
        await thisListObject.items.getById(Id).update( newUpdateItemObj ).then((response) => {
            if ( thisButtonObject.alert )  { alert( 'Success!\n' + thisButtonObject.alert ); }
            if ( thisButtonObject.console )  { console.log(thisButtonObject.console, response ); }
            
        });

    } catch (e) {
        errMessage = getHelpfullError(e, true, true);
        if ( thisButtonObject.alert )  { 
            alert( 'Update Failed!\n' + thisButtonObject.alert + "\n" + errMessage );
         }
         console.log('Update Failed!\n' + thisButtonObject.alert + "\n" + errMessage );
    }

    return errMessage;

}