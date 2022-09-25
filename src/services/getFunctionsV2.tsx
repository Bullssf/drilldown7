import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { DoNotExpandLinkColumns, DoNotExpandColumns, DoNotExpandFuncColumns } from './getInterfaceV2';

/**
 * 2020-09-28:  getFunctions.ts intro
 * 
 * The first 3 functions in this file were pulled from PivotTiles.tsx.
 * They are used for fetching items, finding select and expand columns.
 * 
 * Here's how they are used in PivotTiles.tsx
 * 
        let selectCols: string = "*";
        let expandThese = "";

        let allColumns = this.getKeysLike(this.props,"col","Begins");
        let expColumns = this.getExpandColumns(allColumns);
        let selColumns = this.getSelectColumns(allColumns);


        selColumns.length > 0 ? selectCols += "," + selColumns.join(",") : selectCols = selectCols;
        if (expColumns.length > 0) { expandThese = expColumns.join(","); }

        web.lists.getByTitle(useTileList).items
          .select(selectCols).expand(expandThese).filter(restFilter).orderBy(restSort,true).getAll()
 */


/**
 * getKeysLike function takes an object like "props"
 *      looks for specific keys that begin with a string like 'col'
 *      and returns those keys back in an array.
 *      Use case:  Look for props that begin with 'col' which will then return all the known or mapped static column names
 * @param thisProps 
 * @param findMe 
 * @param findOp 
 */

  export function getKeysLikeV2(thisProps: any, findMe: string, findOp: string){
    //Sample call:  getKeysLike(this.props,"col","begins")
    //console.log('FoundProps that ' + findOp + ' with ' + findMe);
    //console.log(thisProps);
    const allKeys = Object.keys(thisProps);
    let foundKeys = [];
    const lFind = findMe.length;

    findMe = findMe.toLowerCase();
    findOp = findOp.toLowerCase();

    if (findOp==="begins") {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) === 0);
    } else if (findOp === "ends") {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) === ( k.length - lFind));
    } else {
      foundKeys = allKeys.filter(k => k.toLowerCase().indexOf(findMe) > -1);
    }

    let foundProps = [];
    for (let thisProp of foundKeys) {
      if (thisProp && thisProp !== "" ) { foundProps.push(thisProps[thisProp]) ; }
    }

    return foundProps;
  }

  /**
   * getSelectColumns function will take an array of column names (string format)
   *    and return an array of the columns that need to be added to the select variable in getItems
   *    It pushes the entire expanded name like:  Created/ID
   * @param lookupColumns 
   */
  
   /**
    * NOTE All this should be gotten from npmFunctions!!!!
    * Lists/getFunctions.ts
    *  
    */

  export function getSelectColumnsV2(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandColumns ){

    let baseSelectColumns = [];
    let DoNotExpandColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;
    let DoNotExpandFuncColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name
      if (thisColumn && thisColumn.indexOf("/") > -1 ) {
        let isLookup = thisColumn.indexOf("/");
        if(isLookup) {
          let splitCol = thisColumn.split("/");
          // let baseColumn = splitCol[ 0 ] ; //This is always the zero index splitCol period
          let nextPart = splitCol[ 1 ];
          let rightSide = splitCol[ splitCol.length -1 ];

          let hasFunctionError = false;
          if ( rightSide.toLowerCase().indexOf('before') > -1 && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase().replace('before','b4'))  > -1 ) {
            hasFunctionError = true;
          }

          if ( nextPart && DoNotExpandColumnsLC.indexOf( nextPart.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns

          } else if ( splitCol && splitCol.length === 2 && hasFunctionError === true  ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns
            baseSelectColumns.push( splitCol[ 0 ] );

          } else if ( splitCol && splitCol.length === 3 ) {
            //Then check since this is likely an expanded column with special function
            if ( nextPart && DoNotExpandColumnsLC.indexOf( nextPart.toLowerCase() ) < 0 ) {
              let temp = hasFunctionError !== true ? '/' + splitCol[ 1 ] : '';
              baseSelectColumns.push( splitCol[ 0 ] + temp );

            }

          } else if ( rightSide.toLowerCase().indexOf('object.') === 0 ) {
            // This is an object function - should be text or rich text so do not expand
            // baseSelectColumns.push( splitCol[ 0 ] );

          } else {
            baseSelectColumns.push(thisColumn);

          }
        }
      }
    }
    return baseSelectColumns;
  }

  export function getLinkColumnsV2(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandLinkColumns ){

    let baseLinkColumns = [];
    let DoNotExpandLinkColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name

          let splitCol = thisColumn.split("/");
          // let leftSide = splitCol[0];
          let rightSide = splitCol[ splitCol.length -1 ];
          if ( rightSide && DoNotExpandLinkColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns
            if ( baseLinkColumns.indexOf( thisColumn ) < 0 ) { baseLinkColumns.push(thisColumn); }
          }

    }
    return baseLinkColumns;
  }

  export function getFuncColumnsV2(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandFuncColumns ){

    let allFuncColumns = [];
    let funcErrors = [];
    let actualFuncColumns = [];
    let DoNotExpandFuncColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name

          let splitCol = thisColumn.split("/");
          let leftSide = splitCol.length === 3 ? splitCol[0] + '/' + splitCol[1]: splitCol[0] ;
          let rightSide = splitCol[ splitCol.length -1 ];

          if ( rightSide && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Func Columns
            if ( allFuncColumns.indexOf( thisColumn ) < 0 ) { 
              allFuncColumns.push( thisColumn );

              //This extra if-then is required because there could be 2 functions pointing to the same actual column
              if ( actualFuncColumns.indexOf( leftSide ) < 0 ) { actualFuncColumns.push( leftSide ); }

            }
          } else if ( rightSide && rightSide.toLowerCase().indexOf( 'object.' ) ===0 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Func Columns
            allFuncColumns.push( thisColumn );
            
          }

          let funcIdx =  DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase() );
          if ( rightSide.toLowerCase().indexOf('before') > -1 && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase().replace('before','b4'))  > -1 ) {
            // funcErrors.push ( `For: ${thisColumn},  function ${rightSide} is Not Valid :)`);
            funcErrors.push ( <span>For: <b>{leftSide}/</b><b style={{color: 'red'}}>{rightSide}</b>, replace <b style={{color: 'red'}}>{escape(`'before'`)}</b> with <b style={{color: 'green'}}>{escape(`'b4'`)}</b> :)</span> );

          } else if ( splitCol.length === 3 && funcIdx < 0 ) {
            // funcErrors.push ( `For: ${thisColumn},  function ${rightSide} is Not Valid :)`);
            funcErrors.push ( <span>For: <b>{thisColumn}</b>,  function <b style={{color: 'red'}}>{rightSide}</b> is Not Valid :)</span> );
          }

    }
    return { all: allFuncColumns, actual: actualFuncColumns, funcErrors: funcErrors };
  }

    /**
   * getExpandColumns function will take an array of column names (string format)
   *    and return an array of the columns that need to be added to the expand variable in getItems
   *    It pushes the just the column name: It finds: Created/ID and returns just Created
   * @param lookupColumns 
   */

   //column 'names' that are special and do not get expanded:


  export function getExpandColumnsV2(lookupColumns : string[] , DoNotExpandColumnsIn: string[] = DoNotExpandColumns ){

    let baseExpandColumns = [];
    let DoNotExpandColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name
      if (thisColumn && thisColumn.indexOf("/") > -1 ) {
        let splitCol = thisColumn.split("/");
        // let leftSide = splitCol.length === 3 ? splitCol[0] + '/' + splitCol[1]: splitCol[0] ;
        let baseColumn = splitCol[ 0 ] ; //This is always the zero index splitCol period
        let nextPart = splitCol[ 1 ];

        // Need to check 2 special cases:
        // #1 is splitCol[1] = link column?  If so, do not expand
        // #2 is if splitCol[1] = any other special column, do not expand

        if ( nextPart && DoNotExpandColumnsLC.indexOf( nextPart.toLowerCase() ) > -1 ) {
          //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns

        } else if ( nextPart.toLowerCase().indexOf('object.') === 0 ) {
          //Do not expand since this is an object column which should be text or multiline text

        } else if(baseExpandColumns.indexOf(baseColumn) < 0) {
          baseExpandColumns.push(baseColumn);

        }
      }
    }
    return baseExpandColumns;
  }