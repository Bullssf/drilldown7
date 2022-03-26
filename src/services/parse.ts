/**
 * Eventually this should be in npmFunctions, possibly under Services/Strings
 * 
 */
import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimSpecial } from './getInterface';
import { ITrimLink, ITrimB4, ITrimAfter, ITrimSpecial } from './getInterface';
import { DoNotExpandFuncColumns, DoNotExpandColumns, } from './getInterface';
import { convertArrayToLC, } from './getInterface';

/**
 *  Typical exports
 * 
import { createThisItemProp,  } from '@mikezimm/npmfunctions/dist/Services/'; //Main function to update item

import { DidNotTrim, TrimAfterColon, TrimAfterTilda, TrimAfterHyphen, TrimAfterThis, NothingChanged } from '@mikezimm/npmfunctions/dist/Services/';

import { GetFirstWord, GetLastWord } from '@mikezimm/npmfunctions/dist/Services/';

 */


import { getDetailValueType } from '@mikezimm/npmfunctions/dist/Services/typeServices';

export const DidNotTrim = 'NothingChanged';

/***
 *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d888888b d888888b d88888b .88b  d88.                  
 *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'            `88'   `~~88~~' 88'     88'YbdP`88                  
 *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo         88       88    88ooooo 88  88  88                  
 *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~         88       88    88~~~~~ 88  88  88                  
 *    Y8b  d8 88 `88. 88.     88   88    88    88.            .88.      88    88.     88  88  88                  
 *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y888888P    YP    Y88888P YP  YP  YP                  
 *                                                                                                                
 *                                                                                                                
 *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db      d8888b. d8888b.  .d88b.  d8888b. 
 *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88      88  `8D 88  `8D .8P  Y8. 88  `8D 
 *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88      88oodD' 88oobY' 88    88 88oodD' 
 *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88      88~~~   88`8b   88    88 88~~~   
 *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888      88      88 `88. `8b  d8' 88      
 *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P      88      88   YD  `Y88P'  88      
 *                                                                                                                
 *                                                                                                                
 */

export function createItemFunctionProp ( staticColumn: string, item: any ) {

  let splitCol = staticColumn.split("/");
  let leftSide = splitCol[0];
  let rightSide = splitCol[1] ? splitCol[1] : null;
  let rightSideLC = rightSide ? rightSide.toLowerCase() : null;
  let newProp = leftSide + rightSide;

  let detailType = getDetailValueType(  item[leftSide] );

  if ( detailType.indexOf('string') > -1 && item[leftSide].length > 0 ) {
    let trimmedItem = item[ leftSide ].trim();

    //Handle all TrimB4
    if ( convertArrayToLC( DoNotExpandTrimB4 ).indexOf( rightSideLC ) > -1 ) {
      item[ newProp ] = trimB4( trimmedItem, rightSideLC as any );

    //Handle all TrimAfter
    } else if ( convertArrayToLC( DoNotExpandTrimAfter ).indexOf( rightSideLC ) > -1 ) {
      let newValue = DidNotTrim;
      newValue = trimAfter( trimmedItem, rightSideLC as any );

      if ( newValue !== DidNotTrim ) { item[ newProp ] = newValue; }
    
    //Hanlde FirstWord
    } else if ( rightSideLC === 'FirstWord'.toLowerCase() ) {
      item[ newProp ] = GetFirstWord( trimmedItem );

    //Hanlde LastWord
    } else if ( rightSideLC === 'LastWord'.toLowerCase() ) {
      item[ newProp ] = GetLastWord( trimmedItem );


    // 'FirstLetter' | 'FirstNumber' | 'FirstInLast' | 'Initials' | 'FirstAcronym' | 'SecondAcronym';
    }





  }

  return item;

}

/***
 *    d888888b d8888b. d888888b .88b  d88.      d8888b.   j88D  
 *    `~~88~~' 88  `8D   `88'   88'YbdP`88      88  `8D  j8~88  
 *       88    88oobY'    88    88  88  88      88oooY' j8' 88  
 *       88    88`8b      88    88  88  88      88~~~b. V88888D 
 *       88    88 `88.   .88.   88  88  88      88   8D     88  
 *       YP    88   YD Y888888P YP  YP  YP      Y8888P'     VP  
 *                                                              
 *                                                              
 */

/**
 * 
 * @param str 
 * @param trimCommand 
 * @param item - Currently not used since updateThisItemKey handles this part
 */
export function trimB4( str: string, trimCommand: ITrimB4, ) {

  let parser: string = '';
  let result: string = '';

  if ( trimCommand === 'TrimB4Hyphen'.toLowerCase() ) { parser = '-'; }
  else if ( trimCommand === 'TrimB4Space'.toLowerCase() ) { parser = ' '; }
  else if ( trimCommand === 'TrimB4Tilda'.toLowerCase() ) { parser = '~'; }
  else if ( trimCommand === 'TrimB4Par'.toLowerCase() ) { parser = ')'; }
  else if ( trimCommand === 'TrimB4Colon'.toLowerCase() ) { parser = ':'; }
  else if ( trimCommand === 'TrimB4Dot'.toLowerCase() ) { parser = '.'; }
  else if ( trimCommand === 'TrimB42ndDot'.toLowerCase() ) { 
    //This does not currently work... DO NOT USE
    var pos1 = str.indexOf(".");           // 3
    var pos2 = str.indexOf(".", pos1 + 1); // 7
    result= str.split('.')[0].trim() ;
  }

  if ( parser !== '' ) { result = str.split( parser )[0].trim() ; }

  return result;

}

/***
 *    d888888b d8888b. d888888b .88b  d88.       .d8b.  d88888b d888888b d88888b d8888b.      db    db 
 *    `~~88~~' 88  `8D   `88'   88'YbdP`88      d8' `8b 88'     `~~88~~' 88'     88  `8D      `8b  d8' 
 *       88    88oobY'    88    88  88  88      88ooo88 88ooo      88    88ooooo 88oobY'       `8bd8'  
 *       88    88`8b      88    88  88  88      88~~~88 88~~~      88    88~~~~~ 88`8b         .dPYb.  
 *       88    88 `88.   .88.   88  88  88      88   88 88         88    88.     88 `88.      .8P  Y8. 
 *       YP    88   YD Y888888P YP  YP  YP      YP   YP YP         YP    Y88888P 88   YD      YP    YP 
 *                                                                                                     
 *                                                                                                     
 */

export function trimAfter( str: string, trimCommand: ITrimAfter, ) {

  let parser: string = '';
  let result: string = DidNotTrim;

  if ( trimCommand === 'TrimAfterHyphen'.toLowerCase() ) { parser = '-'; }
  else if ( trimCommand === 'TrimAfterTilda'.toLowerCase() ) { parser = '~'; }
  else if ( trimCommand === 'TrimAfterColon'.toLowerCase() ) { parser = ':'; }
  else if ( trimCommand === 'TrimAfterPar'.toLowerCase() ) { parser = ')'; }
  else if ( trimCommand === 'TrimAfterDot'.toLowerCase() ) { parser = '.'; }

  if ( parser !== '' ) { 
    result = TrimAfterThis( str, parser );
  }

  return result;

}

export function TrimAfterColon( str: string ) {
  return TrimAfterThis( str, ':' );
}

export function TrimAfterTilda( str: string ) {
  return TrimAfterThis( str, '~' );
}

export function TrimAfterHyphen( str: string ) {
  return TrimAfterThis( str, '-' );
}

export function TrimAfterThis( str: string, parser: string ) {
  if ( typeof str !== 'string' ) { return str; }
  let idx = str.indexOf( parser );
  return idx > -1 ? str.substring(idx + 1 ).trim() : DidNotTrim;
}

/***
 *     d888b  d88888b d888888b      d88888b d888888b d8888b. .d8888. d888888b      db   d8b   db  .d88b.  d8888b. d8888b. 
 *    88' Y8b 88'     `~~88~~'      88'       `88'   88  `8D 88'  YP `~~88~~'      88   I8I   88 .8P  Y8. 88  `8D 88  `8D 
 *    88      88ooooo    88         88ooo      88    88oobY' `8bo.      88         88   I8I   88 88    88 88oobY' 88   88 
 *    88  ooo 88~~~~~    88         88~~~      88    88`8b     `Y8b.    88         Y8   I8I   88 88    88 88`8b   88   88 
 *    88. ~8~ 88.        88         88        .88.   88 `88. db   8D    88         `8b d8'8b d8' `8b  d8' 88 `88. 88  .8D 
 *     Y888P  Y88888P    YP         YP      Y888888P 88   YD `8888Y'    YP          `8b8' `8d8'   `Y88P'  88   YD Y8888D' 
 *                                                                                                                        
 *                                                                                                                        
 */

/**
 * GetFirstWord is what was tested to pull the first word from a string
 * This will get the first 'word' consisting of letters and numbers
 * @param str 
 */
export function GetFirstWord( str: string ) {

  if ( !str ) { return str; }
  if ( typeof str !== 'string' ) { return str; }

  let newValue = str.trim();
  newValue = str.split(/^[^a-zA-Z]*/gm)[1];

  if ( newValue === undefined ) { 
      newValue = str.split(/^[^a-zA-Z]*/gm)[0].split(/\W/gm)[0] ;

  } else {
      newValue = newValue.split(/\W/gm)[0] ;
  }
  return newValue ; 

}

/***
 *     d888b  d88888b d888888b      db       .d8b.  .d8888. d888888b      db   d8b   db  .d88b.  d8888b. d8888b. 
 *    88' Y8b 88'     `~~88~~'      88      d8' `8b 88'  YP `~~88~~'      88   I8I   88 .8P  Y8. 88  `8D 88  `8D 
 *    88      88ooooo    88         88      88ooo88 `8bo.      88         88   I8I   88 88    88 88oobY' 88   88 
 *    88  ooo 88~~~~~    88         88      88~~~88   `Y8b.    88         Y8   I8I   88 88    88 88`8b   88   88 
 *    88. ~8~ 88.        88         88booo. 88   88 db   8D    88         `8b d8'8b d8' `8b  d8' 88 `88. 88  .8D 
 *     Y888P  Y88888P    YP         Y88888P YP   YP `8888Y'    YP          `8b8' `8d8'   `Y88P'  88   YD Y8888D' 
 *                                                                                                               
 *                                                                                                               
 */

/**
 * This REGEX was tested and seems to work
 * This will get the LAST 'word' consisting of letters and/or numbers, even if the last word is only 1 char/digit
 * @param str 
 */
export function GetLastWord( str: string ) {

  if ( !str ) { return str; }
  if ( typeof str !== 'string' ) { return str; }

  let newValue = str.trim();
  newValue = str.split(/\b(\w+)\W*$/g)[1];

  if ( newValue === undefined ) { 
      newValue = str.split(/\b(\w+)\W*$/g)[0].split(/\W/gm)[0] ;

  } else {
      newValue = newValue.split(/\W/gm)[0] ;
  }
  return newValue ; 

}

