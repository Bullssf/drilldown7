
import { DoNotExpandLinkColumns, DoNotExpandColumns, DoNotExpandFuncColumns } from './getInterface';

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

  export function getKeysLike(thisProps,findMe,findOp){
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

  export function getSelectColumns(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandColumns ){

    let baseSelectColumns = [];
    let DoNotExpandColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name
      if (thisColumn && thisColumn.indexOf("/") > -1 ) {
        let isLookup = thisColumn.indexOf("/");
        if(isLookup) {
          let splitCol = thisColumn.split("/");
          let rightSide = splitCol[1];
          if ( rightSide && DoNotExpandColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns

          } else {
            baseSelectColumns.push(thisColumn);
          }
        }
      }
    }
    return baseSelectColumns;
  }

  export function getLinkColumns(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandLinkColumns ){

    let baseLinkColumns = [];
    let DoNotExpandLinkColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name

          let splitCol = thisColumn.split("/");
          let leftSide = splitCol[0];
          let rightSide = splitCol[1];
          if ( rightSide && DoNotExpandLinkColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns
            if ( baseLinkColumns.indexOf( thisColumn ) < 0 ) { baseLinkColumns.push(thisColumn); }
          }

    }
    return baseLinkColumns;
  }

  export function getFuncColumns(lookupColumns : string[], DoNotExpandColumnsIn: string[] = DoNotExpandFuncColumns ){

    let baseFuncColumns = [];
    let DoNotExpandFuncColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name

          let splitCol = thisColumn.split("/");
          let leftSide = splitCol[0];
          let rightSide = splitCol[1];
          if ( rightSide && DoNotExpandFuncColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
            //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Func Columns
            if ( baseFuncColumns.indexOf( thisColumn ) < 0 ) { baseFuncColumns.push(thisColumn); }
          }

    }
    return baseFuncColumns;
  }

    /**
   * getExpandColumns function will take an array of column names (string format)
   *    and return an array of the columns that need to be added to the expand variable in getItems
   *    It pushes the just the column name: It finds: Created/ID and returns just Created
   * @param lookupColumns 
   */

   //column 'names' that are special and do not get expanded:


  export function getExpandColumns(lookupColumns : string[] , DoNotExpandColumnsIn: string[] = DoNotExpandColumns ){

    let baseExpandColumns = [];
    let DoNotExpandColumnsLC = DoNotExpandColumnsIn.map( item => { return item.toLowerCase(); } ) ;

    for (let thisColumn of lookupColumns) {
      // Only look at columns with / in the name
      if (thisColumn && thisColumn.indexOf("/") > -1 ) {
        let splitCol = thisColumn.split("/");
        let leftSide = splitCol[0];
        let rightSide = splitCol[1];

        if ( rightSide && DoNotExpandColumnsLC.indexOf( rightSide.toLowerCase() ) > -1 ) {
          //Then do nothing since this column is a 'faux expanded column' used in Drilldown for Link Columns

        } else if(baseExpandColumns.indexOf(leftSide) < 0) {
          baseExpandColumns.push(leftSide);

        }
      }
    }
    return baseExpandColumns;
  }