import { Web, } from "@pnp/sp/presets/all";

// import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/site-users/web";


import { IDrillItemInfo } from '../../fpsReferences';

import { IDrillList, } from  './IDrillProps';


import { makeTheTimeObject } from '../../fpsReferences';
import { monthStr3 } from '@mikezimm/fps-library-v2/lib/logic/Time/monthLabels';
import { getBestTimeDelta, getAge } from '@mikezimm/fps-library-v2/lib/logic/Time/deltas';


import { addItemToArrayIfItDoesNotExist, } from '@mikezimm/fps-library-v2/lib/logic/Arrays/manipulation';
import { sortKeysByOtherKey, } from '@mikezimm/fps-library-v2/lib/logic/Arrays/sorting/objects';


import { getDetailValueType, ITypeStrings } from '@mikezimm/fps-library-v2/lib/logic/Types/typeServices';


import { IRefinerLayer, IItemRefiners, RefineRuleValues, IRefinerStatType, IRefinerStat } from '../../fpsReferences';

import { IUser } from '@mikezimm/fps-library-v2/lib/logic/Users/IUserInterfaces';
// import { IQuickButton } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { createItemFunctionProp,  } from '@mikezimm/fps-library-v2/lib/logic/Strings/drillParse/createItemFunctionProp'; //Main function to update item

import { DoNotExpandColumns } from "@mikezimm/fps-library-v2/lib/pnpjs/Lists/getVX/IGetInterfaceV2";

import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IMinSourceFetchProps } from '@mikezimm/fps-pnp2/lib/services/sp/fetch/items/fetchSourceItems';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs";



// }

//   d888b  d88888b d888888b  .d8b.  db      db      d888888b d888888b d88888b .88b  d88. .d8888. 
//  88' Y8b 88'     `~~88~~' d8' `8b 88      88        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP 
//  88      88ooooo    88    88ooo88 88      88         88       88    88ooooo 88  88  88 `8bo.   
//  88  ooo 88~~~~~    88    88~~~88 88      88         88       88    88~~~~~ 88  88  88   `Y8b. 
//  88. ~8~ 88.        88    88   88 88booo. 88booo.   .88.      88    88.     88  88  88 db   8D 
//   Y888P  Y88888P    YP    YP   YP Y88888P Y88888P Y888888P    YP    Y88888P YP  YP  YP `8888Y' 
//                                                                                                
//        

// This is what it was before I split off the other part
export async function getAllItems( drillList: IDrillList, addTheseItemsToState: any, setProgress: any, markComplete: any, updatePerformance: any, sourceUser: IUser ): Promise<void>{

    let errMessage = '';

    updatePerformance( 'fetch2', 'start', 'items', null  );


    let selColumns = drillList.selectColumnsStr;

    //Needed to add these to select columns as well as say it's a library
    if ( drillList.isLibrary !== true ) {
        if ( drillList.staticColumns.indexOf( 'FileLeafRef' ) > -1 ) {
            drillList.isLibrary = true;
        } else if ( drillList.staticColumns.indexOf( 'FileRef' ) > -1 ) {
            drillList.isLibrary = true;
        }
    }

    //Always add these columns if it's a library to get links
    if ( drillList.isLibrary === true ) {
        selColumns += ',FileLeafRef,FileRef,OData__UIVersion';//,_ComplianceTag,_ISRecord,_IpLabelHash,_IpLabelPromotionCtagVersion,OData__ComplianceTag is not available on the library
    }
    //Always add this column to fetch an embed url
    selColumns += ',ServerRedirectedEmbedUrl';

    // let selectCols = '*,' + staticCols;
    let selectCols = drillList.getAllProps === true ? '*,' + selColumns : selColumns;

    //Added for https://github.com/mikezimm/drilldown7/issues/176.... Can be improved though.
    if ( drillList.getAllProps === false ) {
      const selectColsArr = selectCols.split(',');
      if ( drillList.staticColumns.length > 0 ) {
        drillList.staticColumns.map( column => {
          if ( selectColsArr.indexOf( column ) < 0 ) { selectColsArr.push( column ) ;}
        });
        const cleanSelectCols: string[] = [];
        selectColsArr.map( column => { 
          let cleanColumn: string = `${column}`;
          if ( column.indexOf('/') > -1 ) {
            DoNotExpandColumns.map( doNotExp => {
              //https://reactgo.com/javascript-variable-regex/
              const removeStr = `/${doNotExp}`;
              const regex =  new RegExp(removeStr,'gi'); // eslint-disable-line @rushstack/security/no-unsafe-regexp
              if ( doNotExp.toLowerCase() === 'object.' ) {
                const cleanSplit = cleanColumn.split(regex); // it works  
                cleanColumn = cleanSplit[0];
              } else {
                cleanColumn = cleanColumn.replace(regex,''); // it works  
              }
              
            });
          }
          cleanSelectCols.push( cleanColumn ); // it works  
        });

        selectCols = cleanSelectCols.join(',');

      }
    }

    /**
     * IN FUTURE, ALWAYS BE SURE TO PUT SELECT AND EXPAND AFTER .ITEMS !!!!!!
     */
    drillList.selectColumns = selectCols.split(',');
    drillList.selectColumnsStr = selectCols;

    const DrillSource: IMinSourceFetchProps = {
      webUrl: drillList.webURL,
      listTitle: drillList.title,
      fetchCount: drillList.fetchCount,
      selectThese: drillList.selectColumns,
      expandThese: drillList.expandColumns,

    }

    const getItems = await getSourceItems( DrillSource as ISourceProps, true, true )

    getItems.items = processAllItems( getItems.items, errMessage, drillList, addTheseItemsToState, setProgress, updatePerformance, sourceUser );


}

export function processAllItems( allItems : IDrillItemInfo[], errMessage: string, drillList: IDrillList, addTheseItemsToState: any, setProgress: any, updatePerformance: any, sourceUser: IUser ){

    updatePerformance( 'fetch2', 'update', '', allItems.length );

    updatePerformance( 'analyze1', 'start', 'process'  );

    console.log('processAllItems: sourceUser', sourceUser ); //Added console log so no unused var eslint error
    // const DoNotExpandFuncColumnsLC = convertArrayToLC(DoNotExpandFuncColumns);

    let allRefiners : IRefinerLayer = null;
    let itemRefinerErrors: string[] = [];
    let thisIsNow = new Date().toLocaleString();

    let itemsHaveAttachments = false;
    let finalItems : IDrillItemInfo[] = [];
    let skippedItems : IDrillItemInfo[] = [];


    allItems.map( ( item, i ) => {

        let skipItem = false;
        if ( drillList.hideFolders === true ) {
            if ( item.FileSystemObjectType === 1 ) { 
                skipItem = true;
            }
        }

        // This applies filter on returned items based on evalFilter.
        // result of eval must equal true to include item
        if ( drillList.evalFilter ) {
          try {
            skipItem = eval( drillList.evalFilter ) === true ? false : true ;
            console.log('drillFunctions ~ 200 - evalFilter failed:', drillList.evalFilter );
          } catch (e) {
            console.log('drillFunctions ~ 200 - evalFilter failed:', drillList.evalFilter );
            skipItem = true;

          }
        }

        if ( skipItem === true ) {
            skippedItems.push( item );

        } else {
            if ( item.timeCreated === undefined ) {
                drillList.ageColumns.map( column => {
                  if ( item[ `${column}` ] ) item[ `time${column}` ] = makeTheTimeObject(item[ column ]);
                });
    
                item.bestCreate = getBestTimeDelta(item.Created, thisIsNow);
                item.bestMod = getBestTimeDelta(item.Modified, thisIsNow);
            }
    
            /**
             * This loop flattens expanded column objects
             */
            if ( drillList.selectColumns.length > 0 ) {
                drillList.selectColumns.map( expCol => {
                    if ( expCol ) { expCol = expCol.trim(); }
                    if (expCol.indexOf('/') > -1 ) {
                        let oldCol = expCol.split('/');
                        let newProp = oldCol.join('');
                        let thisColumn = item[oldCol[0]] ? item[oldCol[0]] : null;

                        //This if looks for multi-select columns
                        if ( Array.isArray( thisColumn ) === true ) {
                            if ( drillList.multiSelectColumns.indexOf( expCol ) < 0 ) { drillList.multiSelectColumns.push( expCol ) ; }
                            item[newProp] = [];
                            thisColumn.map( ( oneItem: any ) => {
                                if ( oneItem[oldCol[1]] ) { item[ newProp ] = addItemToArrayIfItDoesNotExist( item[newProp], oneItem[oldCol[1]] ) ; }
                            });

                        //This loop handles all the others.
                        } else {

                            let detailType = getDetailValueType(  oldCol[0] );

                            if ( detailType === 'link' ) {
                                if ( drillList.linkColumns.indexOf( expCol ) < 0 ) { drillList.linkColumns.push( expCol ) ; }
                                item[newProp + 'Url' ] = item[newProp].Url;
                                item[newProp + 'Desc' ] = item[newProp].Description;

                            } else {
                                item[newProp] = item[oldCol[0]] ? item[oldCol[0]][oldCol[1]] : null;

                            }

                        }
                    }
                });
            }

            //This section will look for any other multi-select columns 
            drillList.staticColumns.map( staticColumn => {
                if ( drillList.selectColumns.indexOf( staticColumn ) < 0 
                && drillList.multiSelectColumns.indexOf( staticColumn ) < 0 ) {
                    if ( Array.isArray( item[staticColumn] ) === true ) {
                        drillList.multiSelectColumns.push( staticColumn );
                    }
                } 
            });
    
            //This checks for richText columns:  https://github.com/mikezimm/drilldown7/issues/224
            drillList.staticColumns.map( staticColumn => {
              if ( drillList.richColumns.indexOf(staticColumn) < 0 && typeof item[staticColumn] === 'string' ) {
                if ( item[staticColumn].indexOf('<div') === 0 && item[staticColumn].lastIndexOf('</div>') === item[staticColumn].length-6 )
                  drillList.richColumns.push( staticColumn );
              }
            });

            // console.log(`Showing rich text columns: ~ 278`, drillList.richColumns );

            if ( item.Id === 8 ) {
                console.log('Check item 8' );
            }
            //This section will look for any other Link
            drillList.staticColumns.map( staticColumn => {
                if ( drillList.linkColumns.indexOf( staticColumn ) > -1 ) {
                    let splitCol = staticColumn.split("/");
                    let leftSide = splitCol[0];
                    // let rightSide = splitCol[1];

                    let detailType = getDetailValueType(  item[leftSide] );

                    if ( detailType === 'link' ) {
                        const itemUrl: string = item[ leftSide ].Url;
                        item[ leftSide + 'GetLinkUrl' ] = itemUrl ? itemUrl : null;
                        item[ leftSide + 'ShowSitesUrl' ] = itemUrl ? itemUrl : null;
                        const firstSites: number = itemUrl.indexOf('/sites/');
                        item[ leftSide + 'ShowSitesUrl' ] = itemUrl && firstSites > -1 ? itemUrl.substring( firstSites ) : `<>SharePoint`;
                        item[ leftSide + 'ShowCollUrl' ] = itemUrl  && firstSites > -1 ? item[ leftSide + 'ShowSitesUrl' ].replace(`/sites`,'' ) : null;  //ShowPageName
                        // item[ leftSide + 'ShowSitesUrl' ] = itemUrl ? itemUrl.replace(window.location.origin,'' ) : null;
                        // item[ leftSide + 'ShowCollUrl' ] = itemUrl ? itemUrl.replace(`${window.location.origin}/sites`,'' ) : null;  //ShowPageName
                        if ( item[ leftSide + 'ShowCollUrl' ] ) {
                          const collUrl: string = item[ leftSide + 'ShowSitesUrl' ];
                          const aspx: number = collUrl.indexOf('.aspx');
                          const pageRelUrl: string = aspx > 5 ? collUrl.substring( 0, aspx > 15 ? aspx + 5: 250 ) : item[ leftSide + 'ShowCollUrl' ];

                          const lastSlash: number = pageRelUrl && pageRelUrl.toLowerCase().indexOf('.aspx') > 0 ? pageRelUrl.lastIndexOf('/') : -1;
                          const pageName: string = lastSlash > -1 ? collUrl.substring( lastSlash + 1, aspx > 15 ? aspx: 250 ) : pageRelUrl;

                          if ( pageRelUrl )  item[ leftSide + 'ShowPageUrl' ] = pageRelUrl;
                          if ( pageName )  item[ leftSide + 'ShowPageName' ] = pageName;

                        }
                        item[ leftSide + 'GetLinkDesc' ] = item[ leftSide ].Description;

                    } else {
                        //This is not a link column but set props anyway
                        item[ leftSide + 'GetLinkUrl' ] = null;
                        item[ leftSide + 'ShowSitesUrl' ] = 'No Link - No Clicky!';
                        item[ leftSide + 'ShowCollUrl' ] = 'No Link - No Clicky!';
                        item[ leftSide + 'ShowPageName' ] = 'No Link - No Clicky!';
                        item[ leftSide + 'ShowPageUrl' ] = 'No Link - No Clicky!';
                        item[ leftSide + 'GetLinkDesc' ] = 'No Link Description';
                    }
                } else if ( drillList.funcColumns.indexOf( staticColumn ) > -1 ) {

                    const itemFunctionResult = createItemFunctionProp( staticColumn, item, drillList.emptyRefiner );
                    item = itemFunctionResult.item;

                    if ( itemFunctionResult.isMultiSelect === true && drillList.multiSelectColumns.indexOf( staticColumn ) < 0 ) {
                        drillList.multiSelectColumns.push( staticColumn );
                    }

                }
            });


            if ( drillList.isLibrary === true || item.ServerRedirectedEmbedUrl || item.FileRef ) {
                const useUrl = item.ServerRedirectedEmbedUrl ? item.ServerRedirectedEmbedUrl : item.FileRef;
                item.goToItemPreview = useUrl;
                item.goToItemLink = useUrl ? useUrl.replace('&action=interactivepreview','') : null ;
                item.goToPropsLink = drillList.parentListURL + "/Forms/DispForm.aspx?ID=" + item.Id;
                item.isFile = true;

                drillList.isLibrary = true;

            } else {
                item.goToItemPreview = drillList.parentListURL + "/DispForm.aspx?ID=" + item.Id;
                item.goToItemLink = drillList.parentListURL + "/DispForm.aspx?ID=" + item.Id;
                item.goToPropsLink = drillList.parentListURL + "/DispForm.aspx?ID=" + item.Id;
                item.isFile = false;
            }

            drillList.multiSelectColumns.map( msColumn => {

                let msColumnNoSlash = msColumn.replace(/\//g,'');
                // let msColumnStr = rightSide? `${leftSide}MultiString${rightSide}` : `${leftSide}MultiString`;
                let msColumnStr = `${msColumnNoSlash}MultiString`;

                //Switched if from && to || 
                if ( item[msColumnNoSlash] === null || item[msColumnNoSlash] === undefined ) {
                    item[msColumnStr] = '';
                } else if ( item[msColumnNoSlash].length === 1 ) {
                    item[msColumnStr] = item[msColumnNoSlash][0];
                    if ( typeof item[msColumnStr] === 'number'  ) { item[msColumnStr] = item[msColumnStr].toString(); }
                } else {

                    //Added number to this join because numbers can be joined into a string.

                    //Added this first if for https://github.com/mikezimm/drilldown7/issues/136
                    if (  item[msColumnNoSlash].length === 0 ) {
                        item [msColumnStr ] = drillList.emptyRefiner ;

                    } else if (  typeof item[msColumnNoSlash][0] === 'string' || typeof item[msColumnNoSlash][0] === 'number' ) {
                        item [msColumnStr ] = item[msColumnNoSlash].join('; ');

                    } else {
                        item [msColumnStr ] = 'Must be string' ;
                    }
                }


            });

            if ( item.Attachments === true ) { itemsHaveAttachments = true ; } 
            item.refiners = getItemRefiners( drillList, item );
    
            item.refiners.comments.map( c => {
                itemRefinerErrors.push( c );
            });
            item.meta = buildMetaFromItem(item);
            item.searchString = buildSearchStringFromItem(item, drillList.staticColumns );

            finalItems.push( item );
        }

    });

    drillList.linkColumns.map( linkColumn => {
        linkColumn = linkColumn.replace(/\//g,'');
    });

    drillList.hasAttach = itemsHaveAttachments;
    
    if ( errMessage === '' && finalItems.length === 0 ) { 
        errMessage = 'This list or library does not have any items that you can see.';
     }

     console.log('skippedDrillItems', skippedItems );
     if ( itemRefinerErrors.length > 0 ) {
//        console.log('HEY!  Had some problems with your item refiners:', itemRefinerErrors);
        console.log('HEY!  Had some problems with your item refiners:', itemRefinerErrors.length);
        console.log('First error:', itemRefinerErrors[0]);

        if ( finalItems.length > 0 && itemRefinerErrors.length > 20 && itemRefinerErrors.length/finalItems.length > .1 ) {
            errMessage += [
                'Performance Warning:',
                `Detected ${itemRefinerErrors.length} Refiner Errors on ${finalItems.length} total items.`,
                `Here's the first warning.  Check them all in the console.`,
                `${itemRefinerErrors[0]}`,
            ].join('--');
        }

     }

    console.log('drillList.refiners =', drillList.refiners );
    //for ( let i = 0 ; i < 5000 ; i++ ) {
    allRefiners = buildRefinersObject( finalItems, drillList );

    allRefiners = sortRefinerObject(allRefiners, drillList);

    updatePerformance( 'analyze1', 'update', '', allItems.length );

    addTheseItemsToState(drillList, finalItems, errMessage, allRefiners );
    return finalItems;

}

//    88.    .d88b.  d8888b. d888888b      d8888b. d88888b d88888b d888888b d8b   db d88888b d8888b. 
//  88'  YP .8P  Y8. 88  `8D `~~88~~'      88  `8D 88'     88'       `88'   888o  88 88'     88  `8D 
//  `8bo.   88    88 88oobY'    88         88oobY' 88ooooo 88ooo      88    88V8o 88 88ooooo 88oobY' 
//    `Y8b. 88    88 88`8b      88         88`8b   88~~~~~ 88~~~      88    88 V8o88 88~~~~~ 88`8b   
//  db   8D `8b  d8' 88 `88.    88         88 `88. 88.     88        .88.   88  V888 88.     88 `88. 
//  `8888Y'  `Y88P'  88   YD    YP         88   YD Y88888P YP      Y888888P VP   V8P Y88888P 88   YD 
//                                                                                                   
//    

function sortRefinerObject ( allRefiners: IRefinerLayer, drillList: IDrillList ) {

    consoleRef( 'buildRefinersObject1', allRefiners );

    //Adding collator per:  https://stackoverflow.com/a/52369951
    const collator = new Intl.Collator(drillList.language, { numeric: true, sensitivity: 'base' });
    allRefiners.childrenObjs.sort((a, b) => { return collator.compare(a.thisKey, b.thisKey); });

    let statsToSort : string[] = ['childrenCounts','childrenMultiCounts'];

    let i = -1;
    drillList.refinerStats.map(( ) => {
      i ++;
      statsToSort.push('stat' + i);
      statsToSort.push('stat' + i + 'Count');
    });
    allRefiners = sortKeysByOtherKey ( allRefiners, 'childrenKeys', 'asc', 'string', statsToSort, null, drillList.language  );
    allRefiners.childrenObjs = sortRefinerLayer( allRefiners.childrenObjs, drillList );

    consoleRef( 'buildRefinersObject2', allRefiners );
    return allRefiners;

}

function sortRefinerLayer ( allRefiners: IRefinerLayer[], drillList: IDrillList ) {

  allRefiners.map( (refinerLayer: IRefinerLayer ) => {

      //Adding collator per:  https://stackoverflow.com/a/52369951
      const collator = new Intl.Collator(drillList.language, { numeric: true, sensitivity: 'base' });
      refinerLayer.childrenObjs.sort((a, b) => { return collator.compare(a.thisKey, b.thisKey); });

      // refinerLayer.childrenObjs.sort((a, b) => ( a.thisKey.toLowerCase() > b.thisKey.toLowerCase() ) ? 1 : -1);
      let statsToSort : string[] = ['childrenCounts','childrenMultiCounts'];

      let i = -1;
      drillList.refinerStats.map(( ) => {
        i ++;
          statsToSort.push('stat' + i);
          statsToSort.push('stat' + i + 'Count');
      });

      refinerLayer = sortKeysByOtherKey ( refinerLayer, 'childrenKeys', 'asc', 'string', statsToSort, null, drillList.language );
      refinerLayer.childrenObjs = sortRefinerLayer( refinerLayer.childrenObjs, drillList );
    } );

    return allRefiners;
}

//  d8888b. db    db d888888b db      d8888b.      d8888b. d88888b d88888b d888888b d8b   db d88888b d8888b. 
//  88  `8D 88    88   `88'   88      88  `8D      88  `8D 88'     88'       `88'   888o  88 88'     88  `8D 
//  88oooY' 88    88    88    88      88   88      88oobY' 88ooooo 88ooo      88    88V8o 88 88ooooo 88oobY' 
//  88~~~b. 88    88    88    88      88   88      88`8b   88~~~~~ 88~~~      88    88 V8o88 88~~~~~ 88`8b   
//  88   8D 88b  d88   .88.   88booo. 88  .8D      88 `88. 88.     88        .88.   88  V888 88.     88 `88. 
//  Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      88   YD Y88888P YP      Y888888P VP   V8P Y88888P 88   YD 
//                                                                                                           
//      


function createNewRefinerLayer( thisKey: string, drillList: IDrillList ) {
    let newRefiner : IRefinerLayer = {
        multiCount: 0,
        itemCount: 0,
        thisKey: thisKey,
        childrenKeys: [],
        childrenObjs: [],
        childrenCounts: [],
        childrenMultiCounts: [],
    };

    let i = -1;
    drillList.refinerStats.map(( ) => {
      i ++;
        newRefiner['stat' + i] = [];
        newRefiner['stat' + i + 'Count'] = [];
    });

    return newRefiner;
}


export function updateRefinerStats( i: IDrillItemInfo , topKeyZ: number,  refiners:IRefinerLayer, drillList: IDrillList ) {

    //if ( i.EntryType !== 'start') {
        let i2 = -1;
        drillList.refinerStats.map(( ) => {
          i2 ++;
            const statKey : string = `stat${i2}`;
            const statKeyCount : string = `stat${i2}Count`;

            let thisStat = drillList.refinerStats[i2].stat;
            let thisValue = i.refiners[statKey] ;
            
            const refinersStat: number[] = refiners[statKey] as number[];
            const refinersStatCount: number[] = refiners[statKeyCount] as number[];

            let currentRefinerValue = refinersStat[topKeyZ] ;
            let currentRefinerCount = refinersStatCount[topKeyZ] ;

            if ( thisStat === 'count' ) {
                currentRefinerValue ++;
                currentRefinerCount ++;

            } else if ( thisStat === 'sum' || thisStat === 'avg' || thisStat === 'daysAgo' || thisStat === 'monthsAgo' ) {
                //Add numbers up here and divide by total count later
                //Only add and count if there is an actual value.
                if ( typeof thisValue === 'number' || typeof thisValue === 'bigint' ) {
                    currentRefinerValue += thisValue as number;
                    currentRefinerCount ++;
                }
            } else if ( thisStat === 'max' ) {
                if ( thisValue > currentRefinerValue || currentRefinerValue === null ) {
                    //Add numbers up here and divide by total count later
                    currentRefinerValue = thisValue as number;
                    currentRefinerCount ++;
                } else {
                    console.log( 'no update: ' + thisValue + ' is NOT LARGER than ' +currentRefinerValue );
                }

            } else if ( thisStat === 'min' ) {
                if ( thisValue < currentRefinerValue || currentRefinerValue === null ) {
                    //Add numbers up here and divide by total count later
                    currentRefinerValue = thisValue as number;
                    currentRefinerCount ++;
                } else {
                    console.log( 'no update: ' + thisValue + ' is NOT LESS than ' +currentRefinerValue );
                }


            } else { console.log('Not sure what to do with this stat: ', thisStat, i.refiners ) ; }

            refinersStat[topKeyZ] = currentRefinerValue;
            refinersStatCount[topKeyZ] = currentRefinerCount;

        });
    //}

    return refiners;

}

export function updateThisRefiner( r0: any, topKeyZ: number,  thisRefiner0: any, refiners:IRefinerLayer, drillList: IDrillList ) {

    let refinerType = typeof thisRefiner0;

    let thisRefiner0Str = refinerType === 'string' ? thisRefiner0 : refinerType === 'number' ? thisRefiner0.toString() : thisRefiner0;
    
    if ( topKeyZ < 0 ) { //Add to topKeys and create keys child object
        refiners.childrenKeys.push( thisRefiner0Str );
        refiners.childrenObjs.push( createNewRefinerLayer ( thisRefiner0Str, drillList ) );
        refiners.childrenCounts.push( 0 );
        refiners.childrenMultiCounts.push( 0 );
        topKeyZ = refiners.childrenKeys.length -1;
        //Add empty object in array for later use

        let i2 = -1;
        drillList.refinerStats.map(( ) => {
          i2 ++;
          //Updated this for ESLinting errors
            const statKey : string = `stat${i2}`;
            const statKeyCount : string = `stat${i2}Count`;
            const refinerStat: number[] = refiners[statKey] as number[] ;
            const refinerStatCount: number[] = refiners[statKeyCount] as number[] ;
            refinerStat.push(null);
            refinerStatCount.push(0);
        });

    }

    refiners.multiCount ++;
    refiners.childrenCounts[topKeyZ] ++;
    refiners.childrenMultiCounts[topKeyZ] ++;
    if ( r0 === '0' || r0 === 0 ) { refiners.itemCount ++; }

    return refiners;


}

export function buildRefinersObject ( items: IDrillItemInfo[], drillList: IDrillList ) {

    let refiners : IRefinerLayer = {
        thisKey: '',
        multiCount: 0,
        itemCount: 0,
        childrenKeys: [],
        childrenObjs: [],
        childrenCounts: [],
        childrenMultiCounts: [],
    };

    let i = -1;
    drillList.refinerStats.map(( ) => {
      i ++;
        refiners['stat' + i] = [];
        refiners['stat' + i + 'Count'] = [];
    });

//    drillList.refinerStats.map( s => {
//    });
    //    refinerStats: IRefinerStat[];

    //Go through all items
    items.map( ( i: IDrillItemInfo ) => {
        if ( i.refiners ) { //If Item has refiners (all should)
            if ( i.Id === 2626 || i.Id === 2618 ) {
                // console.log( 'item:', i );
            }

            //Do just level 1 
            let thisRefinerValuesLev0 : any[] = i.refiners['lev' + 0] as any[];
            //Go through each array of refiners... 

            thisRefinerValuesLev0.map( ( thisRefiner0: any, r0: number ) => {

                let thisRefiner0Str = typeof thisRefiner0 === 'string' ? thisRefiner0 : 
                    typeof thisRefiner0 === 'number' ? JSON.stringify( thisRefiner0 ) : thisRefiner0 ;

                let topKey0 = refiners.childrenKeys.indexOf( thisRefiner0Str );

                refiners = updateThisRefiner( r0, topKey0,  thisRefiner0, refiners, drillList );
                if (topKey0 < 0 ) { topKey0 = refiners.childrenKeys.length -1; }
                refiners = updateRefinerStats( i , topKey0,  refiners, drillList );

                let thisRefinerValuesLev1 : any[] = i.refiners['lev' + 1] as any[];
                //Go through each array of refiners... 

                thisRefinerValuesLev1.map( ( thisRefiner1: any, r1: number ) => {

                    let refiners1 = refiners.childrenObjs[topKey0];

                    let thisRefiner1Str = typeof thisRefiner1 === 'string' ? thisRefiner1 : 
                        typeof thisRefiner1 === 'number' ? JSON.stringify( thisRefiner1 ) : thisRefiner1 ;

                    let topKey1 = refiners1.childrenKeys.indexOf( thisRefiner1Str );

                    refiners1 =updateThisRefiner( r0, topKey1,  thisRefiner1, refiners1, drillList );
                    if (topKey1 < 0 ) { topKey1 = refiners1.childrenKeys.length -1; }
                    refiners1 = updateRefinerStats( i , topKey1,  refiners1, drillList );

                    let thisRefinerValuesLev2: any[] = i.refiners['lev' + 2] as any[];
                    //Go through each array of refiners... 
                    thisRefinerValuesLev2.map( ( thisRefiner2: any ) => {

                        let refiners2 = refiners1.childrenObjs[topKey1];

                        let thisRefiner2Str = typeof thisRefiner2 === 'string' ? thisRefiner2 : 
                            typeof thisRefiner2 === 'number' ? JSON.stringify( thisRefiner2 ) : thisRefiner2 ;

                        let topKey2 = refiners2.childrenKeys.indexOf( thisRefiner2Str );

                        refiners2 =updateThisRefiner( r0, topKey2,  thisRefiner2, refiners2, drillList );
                        if (topKey2 < 0 ) { topKey2 = refiners2.childrenKeys.length -1; }
                        refiners2 = updateRefinerStats( i , topKey2,  refiners2, drillList );

                    }); //for ( let r2 in thisRefinerValuesLev2 )
                }); //for ( let r1 in thisRefinerValuesLev1 )
            }); //for ( let r0 in thisRefinerValuesLev0 )
        }
    });

    consoleRef( 'buildRefinersObject', refiners );
    return refiners;

}

//   d888b  d88888b d888888b      d8888b. d88888b d88888b d888888b d8b   db d88888b d8888b. 
//  88' Y8b 88'     `~~88~~'      88  `8D 88'     88'       `88'   888o  88 88'     88  `8D 
//  88      88ooooo    88         88oobY' 88ooooo 88ooo      88    88V8o 88 88ooooo 88oobY' 
//  88  ooo 88~~~~~    88         88`8b   88~~~~~ 88~~~      88    88 V8o88 88~~~~~ 88`8b   
//  88. ~8~ 88.        88         88 `88. 88.     88        .88.   88  V888 88.     88 `88. 
//   Y888P  Y88888P    YP         88   YD Y88888P YP      Y888888P VP   V8P Y88888P 88   YD 
//                                                                                          
//        


export function getItemRefiners( drillList: IDrillList, item: IDrillItemInfo ) {
    let refiners = drillList.refiners;
    let itemRefiners : IItemRefiners = {
        lev0: [],
        lev1: [],
        lev2: [],
        comments: [],
    };

    if ( item.Id === 2626 ) {
        // console.log('Checking Id: 2626 refiners' );
    }
    
    let ri = -1;
    drillList.refinerStats.map( () => {
      ri ++;
        itemRefiners['stat' + ri] = [];
    });

    if ( refiners && refiners.length > 0 ) {
        // let x = 0;
        let i = 0;
        let allRules = drillList.refinerRules;
        for ( let r of refiners ) {
            if ( r != null ) { // eslint-disable-line eqeqeq
                r = r.replace(/\//g,'');
                let thisRuleSet : any = allRules[i];
                let fieldValue = item[r];

                if ( Array.isArray( fieldValue ) === true ) {
                    itemRefiners['lev' + i] = [];

                    //Added this first if for https://github.com/mikezimm/drilldown7/issues/136
                    if ( fieldValue.length === 0 ) {
                        itemRefiners['lev' + i] = [drillList.emptyRefiner];

                    } else {
                        fieldValue.map( ( singleValue: any ) => {
                            let possibleValue = getRefinerFromField( singleValue , thisRuleSet , drillList.emptyRefiner );
                            itemRefiners['lev' + i] = addItemToArrayIfItDoesNotExist( itemRefiners['lev' + i] as any[] , possibleValue[0] );
                        });
                    }

                } else {
                    itemRefiners['lev' + i] = getRefinerFromField( fieldValue , thisRuleSet , drillList.emptyRefiner );

                }
            }
            i++;
        }
    }

    itemRefiners = getRefinerStatsForItem( drillList, item, itemRefiners );

    return itemRefiners;
}

/**
 * This function should go through the stats requirements and build the applicable stat
 * @param drillList 
 * @param item 
 * @param result 
 */
export function getRefinerStatsForItem( drillList: IDrillList, item: IDrillItemInfo, itemRefiners: IItemRefiners ) {

    //Added for performance:  https://github.com/mikezimm/drilldown7/issues/88
    if ( drillList.togStats !== true ) {
        return itemRefiners;
    }

    drillList.refinerStats.map( ( refinerStat: IRefinerStat, i: number ) => {

        let primaryField = refinerStat.primaryField;
        let secondField = refinerStat.secondField;
        let title = refinerStat.title;
        let stat : IRefinerStatType = refinerStat.stat;
        // let chartType = refinerStat.chartTypes;
        // let evalX = refinerStat.eval;
        // let x = RefinerStatTypes;
        // let thisStat = undefined;

        let testPrimary = false;
        let primaryType : ITypeStrings = 'unknown';

        if ( primaryField !== undefined || primaryField !== null ) { testPrimary = true; }

        //This was added to be able to do summary stats on an object property
        primaryField = primaryField.replace('/Object.','Object.').replace('/object.','object.');

        if ( testPrimary === true) {
            primaryType = getDetailValueType(  item[primaryField] );
        }

        let testSecond = false;
        let secondType : ITypeStrings = 'unknown'; // eslint-disable-line @typescript-eslint/no-unused-vars
        if ( secondField !== undefined || secondField !== null ) { testSecond = true; }
        if ( testSecond === true) {
            secondType = getDetailValueType(  item[secondField] );  // eslint-disable-line @typescript-eslint/no-unused-vars
        }

        if ( stat === 'count' ) { 
            itemRefiners['stat' + i] = 1 ;

        } else if ( stat === 'sum' ) { 
            if ( primaryType === 'numberstring' ) {
                itemRefiners['stat' + i] = parseFloat(item[primaryField]) ;

            } else if ( primaryType === 'number' ) {
                itemRefiners['stat' + i] = item[primaryField] ;

            } else if ( primaryType === 'null' || primaryType === 'undefined' ) {
                const comments = `Sum Err: ${item['Id']} does not have a value in property: ${primaryField}.  assuming it's Zero for Sum operations.`;
                itemRefiners.comments.push( comments ) ;
                itemRefiners['stat' + i] = 0 ;

            } else {
                const comments = `Sum Err: Unable to do ${stat} on ${primaryField} ( ${primaryType} ) Value...: ${item[primaryField] }.  assuming it's null`
                itemRefiners.comments.push( comments ) ;
                itemRefiners['stat' + i] = null ;

            }

        } else if ( stat === 'avg' || stat === 'max' || stat === 'min' ) { 
            if ( primaryType === 'numberstring' ) {
                itemRefiners['stat' + i] = parseFloat(item[primaryField]) ;

            } else if ( primaryType === 'number' ) {
                itemRefiners['stat' + i] = item[primaryField] ;

            } else if ( primaryType === 'null' || primaryType === 'undefined' ) {
                itemRefiners['stat' + i] = null ;

            } else if ( primaryType === 'datestring' ) {
                itemRefiners['stat' + i] = new Date(item[primaryField]).getTime() ;

            } else {
              const comments = `AvgMaxMin Err: Unable to do ${stat} on ${primaryType}  Value...: ${item[primaryField]}.  assuming it's null`;
                itemRefiners.comments.push( comments ) ;
                itemRefiners['stat' + i] = null ;

            }

        } else if ( stat === 'daysAgo' || stat === 'monthsAgo' ) {
            if ( primaryType === 'datestring' ) {

                itemRefiners['stat' + i] = getAge( item[primaryField], stat === 'daysAgo' ? 'days' : 'months' ) ;

            } else {
              const comments = `TimeAgo Err: Unable to do ${stat} on ${primaryType}  Value...: ${item[primaryField]}.  assuming it's null`;
                itemRefiners.comments.push( comments ) ;
                itemRefiners['stat' + i] = null ;
            }

        } else if ( stat === 'eval' ) {
            itemRefiners.comments.push( 'Eval Err: eval is not yet available:  not calculating ' + title ) ;

        }

    });

    return itemRefiners;
}


function getRefinerFromField ( fieldValue : any, ruleSet: RefineRuleValues[], emptyRefiner: string ) {

    let result : any[] = [];

    // Basic types copied from:  https://www.w3schools.com/js/tryit.asp?filename=tryjs_typeof_all

    let detailType = getDetailValueType ( fieldValue );

    if ( detailType === 'null' || detailType === 'undefined' || detailType === 'function' ){
        result = [ emptyRefiner ];

    } else if ( detailType === 'boolean'  ){
        result = [ fieldValue === true ? 'true' : 'false' ];

    } else if ( detailType === 'number' ){
        result = [ getGroupByNumber(fieldValue, detailType, ruleSet ) ];

    } else if ( detailType === 'array' ){
        result = fieldValue;

        //Applying this logic would cause the refiner list to grow for some  reason... likely due to nesting
        // result = fieldValue.map( value => {
        //     return getRefinerFromField( value, ruleSet, emptyRefiner );
        // });

    } else if ( detailType === 'object' ){
        result = [ JSON.stringify(fieldValue) ];

    } else if ( detailType === 'datestring' && ruleSet.indexOf('groupByString') < 0 ) {
        fieldValue = fieldValue.trim();
        let tempDate = makeTheTimeObject( fieldValue );
        let reFormattedDate = null;
        // 'groupByDays' | 'groupByWeeks' |  'groupByMonths' |  'groupByYears' | 'groupByDayOfWeek' | 
        if ( ruleSet.indexOf('groupByDays') > -1 ) {
            reFormattedDate = tempDate.dayYYYYMMDD;

        } else if ( ruleSet.indexOf('groupByWeeks') > -1 ) {
            reFormattedDate = tempDate.year + '-'+ tempDate.week;

        } else if ( ruleSet.indexOf('groupByMonthsYYMM') > -1 ) {
            reFormattedDate = tempDate.year + '-'+ ("0" + (tempDate.month + 1)).slice(-2) ;

        } else if ( ruleSet.indexOf('groupByMonthsMMM') > -1 ) {
            reFormattedDate = monthStr3['en-us'][tempDate.month] ;

        } else if ( ruleSet.indexOf('groupByYears') > -1 ) {
            reFormattedDate = tempDate.year.toString();

        } else if ( ruleSet.indexOf('groupByDayOfWeek') > -1 ) {
            reFormattedDate = tempDate.dayOfWeekDDD;

        } else if ( ruleSet.indexOf('groupByDateBuckets') > -1 ) {
            if ( tempDate.daysAgo > 360 ) {
                reFormattedDate = '> 1 Year' ;

            } else if ( tempDate.daysAgo > 30 ) {
                reFormattedDate = '> 1 Month' ;

            } else if ( tempDate.daysAgo > 7 ) {
                reFormattedDate = '> 1 Week' ;

            } else if ( tempDate.daysAgo > 1 ) {
                reFormattedDate = '> 1 Day' ;

            } else { reFormattedDate = 'Today' ; }

        }
        result = [ reFormattedDate ];


    } else if ( detailType === 'numberstring' && ruleSet.indexOf('groupByString') < 0   ) {


      fieldValue = fieldValue.trim();
      result = [  getGroupByNumber(fieldValue, detailType, ruleSet ) ];

    } else if ( detailType === 'string' || ruleSet.indexOf('groupByString') > -1 ){

        //If it's a string, then test if it's a date, return the best date in an array.   Object.prototype.toString.call(date) === '[object Date]'  //https://stackoverflow.com/a/643827
        //As of 2020-09-01:  This does not accurately detect dates.
        fieldValue = fieldValue.trim();
                //parse by semiColon or comma if rule dictates
        if ( ruleSet.indexOf('parseBySemiColons')  > -1 && fieldValue.indexOf(';') > -1 ) {
            fieldValue = getRefinerFromField ( fieldValue.split(';') , ruleSet, emptyRefiner );

        } else if (ruleSet.indexOf('parseByCommas')  > -1 && fieldValue.indexOf(',') > -1 ) {
            fieldValue = getRefinerFromField ( fieldValue.split(',') , ruleSet, emptyRefiner );

        //This loop closes https://github.com/mikezimm/drilldown7/issues/83
        } else if (ruleSet.indexOf('groupByString')  > -1 && fieldValue === '' ) {
            result = [ emptyRefiner ];

        } else { // This should be a string
            result = [ fieldValue ];

        }

    }

    return result;

}

function doThisMathOp( val: number, toThis: number, ref: RefineRuleValues[] ) {
    let result = val;

    if ( ref.indexOf('mathCeiling') > -1 ) {
        result = Math.ceil(result/toThis) * toThis ;

    } else if ( ref.indexOf('mathFloor') > -1 ) {
        result = Math.floor(result/toThis) * toThis ;

    } else if ( ref.indexOf('mathRound') > -1 ) {
        result = Math.round(result/toThis) * toThis ;

    } else { //This would be default
        result = Math.round(result/toThis) * toThis ;

    }

    return result;

}

export function getGroupByNumber( fieldValue : any, type : ITypeStrings , ruleSet: RefineRuleValues[] ) {

    //textAsNumber, 
    let result = fieldValue;

    if ( type === 'numberstring' && ruleSet.indexOf('textAsNumber') === -1 ) {
        return result; // Do not apply any special rules.

    } else if ( type === 'numberstring' ) { //This needs to be converted to number
        result = parseFloat(fieldValue);

    } else if ( type === 'number' ) { //This is already a number... do nothing

    } else { //Just for kicks
        alert('Not sure why this is happening... check out function:  \ngetGroupByNumber');

    }

    if ( ruleSet.indexOf( 'groupBy10s' ) > -1 ) {
        result = doThisMathOp( result, 10, ruleSet ).toString();

    } else if ( ruleSet.indexOf( 'groupBy100s' ) > -1 ) {
        result = doThisMathOp( result, 100, ruleSet ).toString();

    } else if ( ruleSet.indexOf( 'groupBy1000s' ) > -1 ) {
        result = doThisMathOp( result, 1000, ruleSet ).toString();

    } else if ( ruleSet.indexOf( 'groupByMillions' ) > -1 ) {
        result = doThisMathOp( result, 1000000, ruleSet ).toString();

    } else if ( ruleSet.indexOf( '<log10Group' ) > -1 ) {
        if ( result < 0 ) { result = '<0' ; } else
        if ( result < .001 ) { result = '<.001' ; } else
        if ( result < .01 ) { result = '<.01' ; } else
        if ( result < .1 ) { result = '<.1' ; } else
        if ( result < 1 ) { result = '<1' ; } else
        if ( result < 10 ) { result = '<10' ; } else
        if ( result < 100 ) { result = '<100' ; } else
        if ( result < 1000 ) { result = '<1,000' ; } else
        if ( result < 10000 ) { result = '<10,000' ; } else
        if ( result < 100000 ) { result = '<100,000' ; } else
        if ( result < 1000000 ) { result = '<1,000,000' ; } else
        if ( result < 10000000 ) { result = '<10,000,000' ; } else
        if ( result < 100000000 ) { result = '<100,000,000' ; } else
        if ( result < 1000000000 ) { result = '<1,000,000,000' ; }   

    } else if ( ruleSet.indexOf( '>log10Group' ) > -1 ) {
        if ( result > 1000000000 ) { result = '>1,000,000,000' ; } else  
        if ( result > 100000000 ) { result = '>100,000,000' ; } else
        if ( result > 10000000 ) { result = '>10,000,000' ; } else
        if ( result > 1000000 ) { result = '>1,000,000' ; } else
        if ( result > 100000 ) { result = '>100,000' ; } else
        if ( result > 10000 ) { result = '>10,000' ; } else
        if ( result > 1000 ) { result = '>1,000' ; } else
        if ( result > 100 ) { result = '>100' ; } else
        if ( result > 10 ) { result = '>10' ; } else
        if ( result > 1 ) { result = '>1' ; } else
        if ( result > .1 ) { result = '>.1' ; } else
        if ( result > .01 ) { result = '>.01' ; } else
        if ( result > .001 ) { result = '>.001' ; } else
        if ( result > 0 ) { result = '>0' ; } else
         { result = '<0' ; }

    } else if ( ruleSet.indexOf( 'log10e3' ) > -1 ) {
        if ( result < .001 ) { result = '<.001' ; } else
        if ( result < 1 ) { result = '<1' ; } else
        if ( result < 1000 ) { result = '<1,000' ; } else
        if ( result < 1000000 ) { result = '<1,000,000' ; } else   
        if ( result < 1000000000 ) { result = '<1,000,000,000' ; } else   
        if ( result < 1000000000000 ) { result = '<1,000,000,000,000' ; }   

    }

    // if ( typeof result !== 'string' && ruleSet.indexOf( 'numberAsText' ) > -1 ) {
    //2022-03-31:  For now, going to just assume any number should be converted to string at this point because the refiner filter function is always going to get the label to compare to which is a string.
    if ( typeof result !== 'string' ) {
        result = result.toString();
    }

    return result;

}

export function getBestFieldType ( item: any ) {

// let thisType = 'unknown';
  console.log('doing nothing here')

}

//  d8888b. db    db d888888b db      d8888b.      .88b  d88. d88888b d888888b  .d8b.  
//  88  `8D 88    88   `88'   88      88  `8D      88'YbdP`88 88'     `~~88~~' d8' `8b 
//  88oooY' 88    88    88    88      88   88      88  88  88 88ooooo    88    88ooo88 
//  88~~~b. 88    88    88    88      88   88      88  88  88 88~~~~~    88    88~~~88 
//  88   8D 88b  d88   .88.   88booo. 88  .8D      88  88  88 88.        88    88   88 
//  Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      YP  YP  YP Y88888P    YP    YP   YP 
//                                                                                     
//     

function buildMetaFromItem( theItem: IDrillItemInfo ) {
    let meta: string[] = ['All'];

    if ( theItem.timeCreated.daysAgo === 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, 'New');
    } else {
        meta = theItem.timeCreated.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyCreated') : addItemToArrayIfItDoesNotExist(meta, 'Old');
    }

    meta = theItem.timeModified.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyUpdated') : addItemToArrayIfItDoesNotExist(meta, 'Stale');
    meta = theItem.FileSystemObjectType === 1 ? addItemToArrayIfItDoesNotExist(meta, 'IsFolder') : addItemToArrayIfItDoesNotExist(meta, 'IsItem');

    // for ( let L of Object.keys(theItem.refiners) ) {
    Object.keys(theItem.refiners).map( ( iRefinerKey: any ) => {
        //Gets rid of the 'undefined' meta key found at the end of the keys
        //Only do this if it is the lev0, lev1 or lev2 arrays
        if (iRefinerKey.indexOf('lev') === 0 ) { 
            const itemRefinerLev: any[] = theItem.refiners[iRefinerKey] as any[];
            itemRefinerLev.map( ( keyValue : any ) => {
            // for ( let R in theItem.refiners[iRefinerKey] ) {
                if ( Array.isArray( itemRefinerLev ) === true ) {
                  itemRefinerLev.map( ( value: any ) => {
                        meta = addItemToArrayIfItDoesNotExist(meta, value);
                    });

                } else {
                    meta = addItemToArrayIfItDoesNotExist(meta, itemRefinerLev[keyValue]);
                }
            });
        }
    });

    meta = addItemToArrayIfItDoesNotExist( meta, theItem.sort );

    return meta;
}

//  d8888b. db    db d888888b db      d8888b.      .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db 
//  88  `8D 88    88   `88'   88      88  `8D      88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88 
//  88oooY' 88    88    88    88      88   88      `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88 
//  88~~~b. 88    88    88    88      88   88        `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88 
//  88   8D 88b  d88   .88.   88booo. 88  .8D      db   8D 88.     88   88 88 `88. Y8b  d8 88   88 
//  Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP 
//                                                                                                 
//         

function buildSearchStringFromItem (newItem : IDrillItemInfo, staticColumns: string[]) {

    let result = '';
    let delim = '|||';

    if ( newItem.Title ) { result += 'Title=' + newItem.Title + delim ; }
    if ( newItem.Id ) { result += 'Id=' + newItem.Id + delim ; }

    staticColumns.map( c => {
        let thisCol = c.replace(/\//g,'');
        if ( newItem[thisCol] ) { result += c + '=' + newItem[thisCol] + delim ; }
    });

    if ( newItem['odata.type'] ) { result += newItem['odata.type'] + delim ; }

    if ( newItem.meta.length > 0 ) { result += 'Meta=' + newItem.meta.join(',') + delim ; }

    result = result.toLowerCase();

    return result;

}


export function consoleRef( location: string, refiners: IRefinerLayer ) {

    return; //Not needed for now.

    // let refiners2 = JSON.parse(JSON.stringify(refiners));

    // console.log('Error#94: - Refiners', refiners2 );

}

