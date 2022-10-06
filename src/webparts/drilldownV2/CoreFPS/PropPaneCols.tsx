import * as React from 'react';

import { useState, useEffect } from 'react';

import { IWeb, Web, IFieldInfo } from "@pnp/sp/presets/all";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";

// import { IContentsFieldInfo, IFieldBucketInfo } from './IFieldComponentTypes';

// import { doesObjectExistInArray, } from '../fpsReferences';
// import {  addItemToArrayIfItDoesNotExist } from '../fpsReferences';

import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';  //    webURL = getFullUrlFromSlashSitesUrl( webURL );

import { getHelpfullErrorV2 } from '../fpsReferences';

// import { isGuid, } from '../fpsReferences';

// import { BaseErrorTrace } from '../fpsReferences';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

export type IValidTemplate = 100 | 101;

export interface IMinField extends IFieldInfo {

}

export interface IFieldPanelProps {
  webURL: string;
  listTitle: string,
}

const ListFieldsHook: React.FC<IFieldPanelProps> = ( props ) => {

  const {
     listTitle,
     webURL,
  } = props;

  // Got https://reactjs.org/docs/error-decoder.html/?invariant=321 on this line

  const [ status, setStatus ] = useState<string>('Nothing');
  const [ fetch, setFetch ] = useState<boolean>(false);
  const [ listFields, setListFields ] = useState<IMinField[]>([]);

  useEffect(() => {
    ( async () => {
      if ( fetch === true ) {
        console.log( 'ListFieldsHook: started', webURL, listTitle, fetch );
        try {
          if ( listTitle && webURL ) {
            //setListFields( await allAvailableFields( webURL, listTitle, ) );
            const fetchWebURL = getFullUrlFromSlashSitesUrl( webURL );
            let thisWebInstance : IWeb = Web(fetchWebURL);
            let allFields : IMinField[] = await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
            const FilteredFields : IMinField[] = allFields.filter( field => field.Hidden !== true );
            setListFields( FilteredFields )
            setStatus( 'Fetched columns!' );
            console.log( 'ListFieldsHook: finished!', listFields  );
          } else { 
            setStatus('Did NOT fetch anything'); 
          }

        } catch (e) {
          getHelpfullErrorV2( e , false, true, null );
          setStatus( 'Failed to fetch' );
        }

      }
    });

  }, [ fetch ]);  //Tried  [listTitle, webURL,] but got react #321

  const fieldRows : any [] = [];

  if ( listFields.length > 0 ) {
    fieldRows.push( 
      <tr>
        <th>Type</th>
        <th>Title</th>
        <th>InternalName</th>
        <th>Description</th>
      </tr>
    );

    listFields.map( ( field: IMinField ) => {
      const row = <tr>
        <td>{field.TypeDisplayName}</td>
        <td>{field.Title}</td>
        <td>{field.InternalName}</td>
        <td>{field.Description}</td>
      </tr>;
      fieldRows.push( row );

    });
  }

  const onFetchClick = (): void => {
    const  newFetch = fetch === true ? false : true
    setStatus( newFetch === true ? 'Attempting to fetch' : 'Not fetching'); 
    setFetch ( newFetch );
  };

  return (

    <div style ={{ padding:'15px',background: 'lightblue'}}>
      <div style={{ display: 'flex' }}>
        <button onClick={ () => onFetchClick() } >Fetch</button>
        <div>{ status }</div>
      </div>

      <table>
        { fieldRows }
      </table>
    </div>
  );
}


//export async function provisionTestPage( makeThisPage:  IContentsFieldInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
  export async function allAvailableFields( webURL: string, listTitle: string, ): Promise<IMinField[] | any> { //addTheseFieldsToState: any, 

    webURL = getFullUrlFromSlashSitesUrl( webURL );

    let allFields : IMinField[] = [];

    let thisWebInstance : IWeb = Web(webURL);
    allFields= await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
    allFields = allFields.filter( field => field.Hidden !== true );

    return allFields;

    // try {
    //   if ( listTitle != '' ) {
    //     thisWebInstance = Web(webURL);
    //     allFields= await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
    //     allFields = allFields.filter( field => field.Hidden !== true )

    //   }
    // } catch (e) {
    //     errMessage = getHelpfullErrorV2(e, false, true, [  , 'Failed', 'get allFields ~ 106' ].join('|') );

    // }

    // return { allFields: allFields, scope: scope, errMessage: errMessage } ;

}



// export async function GetFieldPanel( fieldPanel: IFieldPanelProps ) {
//   const fields = await allAvailableFields( fieldPanel.webURL, fieldPanel.listTitle, null );
//   const fieldRows : any [] = [];

//   fieldRows.push( 
//     <tr>
//       <th>Type</th>
//       <th>Title</th>
//       <th>InternalName</th>
//       <th>Description</th>
//     </tr>

//   )
//   fields.map( ( field: IMinField ) => {
//     const row = <tr>
//       <td>{field.TypeDisplayName}</td>
//       <td>{field.Title}</td>
//       <td>{field.InternalName}</td>
//       <td>{field.Description}</td>
//     </tr>;

//     fieldRows.push( row );

//   });

//   return fieldRows;

// }

export default ListFieldsHook;