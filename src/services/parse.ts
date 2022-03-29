/**
 * Eventually this should be in npmFunctions, possibly under Services/Strings
 * 
 */
import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimSpecial } from './getInterface';
import { ITrimLink, ITrimB4, ITrimAfter, ITrimSpecial, IDoNotExpandColumns } from './getInterface';
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

export function createItemFunctionProp ( staticColumn: string, item: any, defaultValue: string | 'originalValue' ) {

  const DoNotExpandTrimB4LC = convertArrayToLC( DoNotExpandTrimB4 );
  const DoNotExpandTrimAfterLC = convertArrayToLC( DoNotExpandTrimAfter );
  const DoNotExpandColumnsLC = convertArrayToLC( DoNotExpandColumns );

  /**
   * MEMO TO SELF... WHere you left off...
   * Test here:  https://tenant.sharepoint.com/sites/SharePointLists/SitePages/Training-List---Drilldown-Sample.aspx?debug=true&noredir=true&debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js
   * 
   *  In this loop, the 
   *  let isMultiSelect = typeof itemLeftSide === 'object' && Array.isArray( itemLeftSide ) === true ? true : false;
   */

         /**
       * MEMO TO SELF... The problem here is that item [ splitCol[0] ] is AN ARRAY OF LOOKUP VALUES.... SO YOU HAVE TO LOOP THROUGH ALL OF THEM :(
       * CURRENTLY itemLeftSide[ Role ] [ Department ] is undefined because you need to actually do something like:  itemLeftSide[ Role ] [ DepartmentCalc ] [ i ] 
       * BASICALLY Create an Array of values like I did somewhere else if it were multi-select
       * Like arrValues = itemLeftSide[ Role ] [ DepartmentCalc ];
       */

  /**
   * 

  if ( rightSide && DoNotExpandColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
    // this column is a 'faux expanded column' used in Drilldown for Link Columns

    if ( splitCol.length === 3 ) {
      leftSide = [ splitCol[0], splitCol[1] ] ;
      //Added ternary to the update below for cases where the base column ( like person column is null or empty )



       stop here now ^^^^^ SEE NOTES ABOVE

      if ( item [ splitCol[0] ] ) {
        itemLeftSide =  item [ splitCol[0] ] [ splitCol[1] ] ;

      } else {
        itemLeftSide = null ;
      }

    }  else if ( splitCol.length === 2 ) {
      leftSide = [ splitCol[0] ] ;
      itemLeftSide = item [ splitCol[0] ] ;
    }

  } else {
    // baseSelectColumns.push(thisColumn);
    rightSide = '';
  }
  */

  let splitCol = staticColumn.split("/");
  let rightSide = splitCol[ splitCol.length -1 ];
  let leftSide = [];
  let itemLeftSide: any = null;

    /**
     * MEMO TO SELF... The problem here is that item [ splitCol[0] ] is AN ARRAY OF LOOKUP VALUES.... SO YOU HAVE TO LOOP THROUGH ALL OF THEM :(
     * CURRENTLY itemLeftSide[ Role ] [ Department ] is undefined because you need to actually do something like:  itemLeftSide[ Role ] [ DepartmentCalc ] [ i ] 
     * BASICALLY Create an Array of values like I did somewhere else if it were multi-select
     * Like arrValues = itemLeftSide[ Role ] [ DepartmentCalc ];
     */

     /**
      * This is what lookup column looks like at this point:
      * Main column ('Role' is an array of objects)
      * Secondary columns (Title, DepartmentCalc are arrays of string)
      * 
      * Role: Array(4)
          0: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: 'c5c603c4-73cf-407c-8a59-96da495a3687', Title: 'Coordinador de QMS', DepartmentCalc: 'Quality'}
          1: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: '1fb880e9-4bfa-4560-be4a-9b9290246f9d', Title: 'ING de cal Proveedores', DepartmentCalc: 'Other'}
          2: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: '252f0759-588b-4f94-b5f7-86030ea64cb6', Title: 'Ingeniero de Calidad', DepartmentCalc: 'Quality'}
          3: {odata.type: 'SP.Data.TrainingRolesListItem', odata.id: 'a3886af4-d85e-46aa-986b-764a2eba25f7', Title: 'Supervisor de Calidad', DepartmentCalc: 'Quality'}
          length: 4
          [[Prototype]]: Array(0)
        Role@odata.navigationLinkUrl: "Web/Lists(guid'7057e999-09a5-4044-9310-f1192153ee59')/Items(358)/Role"
        RoleDepartmentCalc: (2) ['Quality', 'Other']
        RoleId: (4) [7, 6, 5, 4]
        RoleTitle: (4) ['Coordinador de QMS', 'ING de cal Proveedores', 'Ingeniero de Calidad', 'Supervisor de Calidad']

        11:02 initial StaticColumn testing the value:  "Role/DepartmentCalc/initials"

        LeftSideItem would be RoleDepartmentCalc which is an array by this point.

      */

  if ( splitCol.length === 3 ) {
    leftSide = [ splitCol[0], splitCol[1] ] ;
    //Added ternary to the update below for cases where the base column ( like person column is null or empty )

    if ( item [ splitCol[0] ] ) {
      itemLeftSide =  item [ splitCol[0] + splitCol[1] ] ;

    } else {
      itemLeftSide = null ;
    }

  }  else if ( splitCol.length === 2 ) {
    leftSide = [ splitCol[0] ] ;
    itemLeftSide = item [ splitCol[0] ] ;
  }

  let rightSideLC = rightSide ? rightSide.toLowerCase() : null;
  let newProp = leftSide.join('') + rightSide;
  let itemTypes: string[] = [];
  let newValuesArray: any[] = [];

  let detailType = getDetailValueType(  itemLeftSide );

  let isMultiSelect = typeof itemLeftSide === 'object' && Array.isArray( itemLeftSide ) === true ? true : false;

  //Added this to apply rules to multi-select items
  let arrayOfItemValues = isMultiSelect === true ?  itemLeftSide : [ itemLeftSide ] ;

  //Get an array of all the individual item types (for multi-select items)
  if ( isMultiSelect === true ) {
    itemLeftSide.map ( singleItem => { itemTypes.push( getDetailValueType( singleItem ) ) ; } );
  } else { itemTypes.push( detailType ) ; }


  //Added this to apply rules to multi-select items
  arrayOfItemValues.map( ( singleItemValue, idx ) => {

    let singleItemType = itemTypes[ idx ];

    //If this is singleItemValue is a string and length > 0, then apply the rules
    if ( singleItemType.indexOf('string') > -1 && singleItemValue.length > 0 ) {
      let trimmedItem = singleItemValue.trim();

      //Handle all TrimB4
      if ( DoNotExpandTrimB4LC.indexOf( rightSideLC ) > -1 ) {
        singleItemValue = trimB4( trimmedItem, rightSideLC as any );
  
      //Handle all TrimAfter
      } else if ( DoNotExpandTrimAfterLC.indexOf( rightSideLC ) > -1 ) {
        let newValue = DidNotTrim;
        newValue = trimAfter( trimmedItem, rightSideLC as any );
  
        if ( newValue !== DidNotTrim ) { singleItemValue = newValue; }
      
      //Hanlde FirstWord
      } else if ( rightSideLC === 'FirstWord'.toLowerCase() ) {
        singleItemValue = GetFirstWord( trimmedItem, false, false );
  
      //Hanlde LastWord
      } else if ( rightSideLC === 'LastWord'.toLowerCase() ) {
        singleItemValue = GetLastWord( trimmedItem, false, false  );

      //Hanlde FirstWord
      } else if ( rightSideLC === 'FirstLetter'.toLowerCase() ) {
        singleItemValue = GetFirstWord( trimmedItem, false, true );

      } else if ( rightSideLC === 'FirstLetterAsCap'.toLowerCase() ) {
        singleItemValue = GetFirstWord( trimmedItem, true, true );

      } else if ( rightSideLC === 'FirstInFirst'.toLowerCase() ) {
        singleItemValue = GetFirstWord( trimmedItem, false, true  );

      } else if ( rightSideLC === 'FirstInFirstAsCap'.toLowerCase() ) {
        singleItemValue = GetFirstWord( trimmedItem, true, true  );

      } else if ( rightSideLC === 'FirstInLast'.toLowerCase() ) {
        singleItemValue = GetLastWord( trimmedItem, false, true );
  
      } else if ( rightSideLC === 'FirstInLastAsCap'.toLowerCase() ) {
        singleItemValue = GetLastWord( trimmedItem, true, true );
  
      } else if ( rightSideLC === 'Initials'.toLowerCase() ) {
        singleItemValue = getInitials( trimmedItem, false, false ); 

      } else if ( rightSideLC === 'InitialsAsCaps'.toLowerCase() ) {
        singleItemValue = getInitials( trimmedItem, true, false ); 

      } else if ( rightSideLC === 'InitialsD'.toLowerCase() ) {
        singleItemValue = getInitials( trimmedItem, false, true ); 

      } else if ( rightSideLC === 'InitialsAsCapsD'.toLowerCase() ) {
        singleItemValue = getInitials( trimmedItem, true, true ); 
        
      } else if ( rightSideLC === 'FirstNumber'.toLowerCase() ) {
        let firstNumber = trimmedItem.match(/(\d+)/);
        singleItemValue = firstNumber ? firstNumber[0] : ''; 
        
      }

      if ( singleItemValue === '' && defaultValue !== 'originalValue' ) { singleItemValue = defaultValue ; }

    } else { //Opposite of:  If this is singleItemValue is a string and length > 0, then apply the rules

    }

    newValuesArray.push( singleItemValue );

  });

  if ( isMultiSelect === true ) {
    item[ newProp ] = newValuesArray;
  } else {
    item[ newProp ] = newValuesArray [ 0 ];
  }

  return { item: item, isMultiSelect: isMultiSelect } ;

}

export const regexInitials = /[^a-zA-Z- ]/g;
export const regexInitialsWithNumbers = /[^a-zA-Z-\d ]/g;

export function getInitials( str: string, asCaps: boolean, includeNumbers: boolean ) {

  let useRegex = includeNumbers === true ? regexInitialsWithNumbers : regexInitials;

  //Get array of initials based on the includeNumbers option
  let initials = str.replace( useRegex, "").match(/\b\w/g);

  let inititalString = initials ? initials.join('') : '';

  if ( asCaps === true ) {
    inititalString = inititalString.toLocaleUpperCase();
  }
  
  return inititalString;

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
  if ( trimCommand === 'TrimB4Dash'.toLowerCase() ) { parser = '-'; }
  else if ( trimCommand === 'TrimB4Space'.toLowerCase() ) { parser = ' '; }
  else if ( trimCommand === 'TrimB4Tilda'.toLowerCase() ) { parser = '~'; }
  else if ( trimCommand === 'TrimB4Par'.toLowerCase() ) { parser = ')'; }
  else if ( trimCommand === 'TrimB4LPar'.toLowerCase() ) { parser = '('; }
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
  if ( trimCommand === 'TrimAfterDash'.toLowerCase() ) { parser = '-'; }
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
 * 
 * HOWEVER, testing shows that: 
 *  a value of all numbers: '2003/88', will return just ''
 *  whereas '10a08/2334' will return 'a08'
 * 
 *  ALSO, this does NOT work on non-arabic characters so 'Código' just returns a 'C'
 * 
 *   IN THOSE CASES, a Tested option would be 'TrimB4Space' or other triming
 * 
 * @param str 
 * 
 */
export function GetFirstWord( str: string, asCaps: boolean, justInitial: boolean ) {

  if ( !str ) { return str; }
  if ( typeof str !== 'string' ) { return str; }

  let newValue = str.trim();
  newValue = str.split(/^[^a-zA-Z]*/gm)[1];

  if ( newValue === undefined ) { 
      newValue = str.split(/^[^a-zA-Z]*/gm)[0].split(/\W/gm)[0] ;

  } else {
      newValue = newValue.split(/\W/gm)[0] ;
  }
  if ( justInitial === true ) { newValue = newValue.charAt(0) ; }

  if ( asCaps === true ) {
    newValue = newValue.toLocaleUpperCase();
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
export function GetLastWord( str: string, asCaps: boolean, justInitial: boolean  ) {

  if ( !str ) { return str; }
  if ( typeof str !== 'string' ) { return str; }

  let newValue = str.trim();
  newValue = str.split(/\b(\w+)\W*$/g)[1];

  if ( newValue === undefined ) { 
      newValue = str.split(/\b(\w+)\W*$/g)[0].split(/\W/gm)[0] ;

  } else {
      newValue = newValue.split(/\W/gm)[0] ;
  }
  
  if ( justInitial === true ) { newValue = newValue.charAt(0) ; }

  if ( asCaps === true ) {
    newValue = newValue.toLocaleUpperCase();
  }

  return newValue ; 

}

