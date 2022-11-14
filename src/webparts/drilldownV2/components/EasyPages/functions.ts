import { sortObjectArrayByStringKeyCollator } from "@mikezimm/npmfunctions/dist/Services/Arrays/sorting";
import { IEasyLink } from "./componentPage";

import { Web, } from '@pnp/sp/presets/all';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

//Interfaces
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultOverflowTab, EasyPagesDevTab, ISourceProps, } from './epTypes'; //SourceInfo, 

import { getExpandColumns, getSelectColumns } from '../../fpsReferences';
import { createBasePerformanceInit, startPerformOp, updatePerformanceEnd } from '../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IPerformanceOp, ILoadPerformance, IHistoryPerformance, ILoadPerformanceOps } from '../../fpsReferences';
// import { warnMutuallyExclusive } from 'office-ui-fabric-react';

import { getHelpfullErrorV2 } from '../../fpsReferences';
import { EasyIconLocation, EasyIconObjectDefault, IEasyIcons,  } from "../EasyIcons/eiTypes";
import { getEasyIcon } from "../EasyIcons/eiFunctions";

/**
 * This filters first by a meta string and then by text search string
 * @param items 
 * @param MetaFilter 
 * @param SearchString 
 * @returns 
 */
export function compoundArrayFilter( items: IEasyLink[], MetaFilter: string, SearchString: string ) :  IEasyLink[] {

    const SearchStringLc = SearchString.toLocaleLowerCase();

    const links: IEasyLink[] = !MetaFilter ? items : items.filter( ( link ) => link.tabs.indexOf( MetaFilter ) > -1 );

    let filtered: IEasyLink[] = [];

    if ( !SearchStringLc ) {
      filtered = links;

    } else {

      links.map( ( item: IEasyLink) => {
        const textFound: number = !SearchStringLc ? 0 : item.searchTextLC.indexOf( SearchStringLc ) ;
        if ( textFound > -1 ) filtered.push( item );
      });

    }

    return filtered;
}

/**
 * This returns only tabs that were found and in the original order provided by props.
 * @param sourceProps 
 * @param items 
 * @returns 
 */
export function getUsedTabs( sourceProps: ISourceProps, items: IEasyLink[] ) : string[] {
  const foundTabs: string[] = [];
  let showOverFlow: any = false;

  items.map( item => {
    item.tabs.map( tab => { 
      if ( foundTabs.indexOf( tab ) < 0 ) foundTabs.push( tab );
      if ( tab === sourceProps.overflowTab ) showOverFlow = true;
    } )
  })
  const sortedTabs: string[] = [];
  sourceProps.meta1.map( tab => { if ( foundTabs.indexOf( tab ) > -1 ) sortedTabs.push( tab ) ;} );
  if ( showOverFlow === true ) sortedTabs.push( sourceProps.overflowTab );

  return sortedTabs;

}

/**
 * This gets Site Pages content, based on ALVFinMan7 model
 * @param sourceProps 
 * @returns 
 */
export interface IGetPagesContent { items: IEasyLink[], performance: ILoadPerformance }
export async function getPagesContent( sourceProps: ISourceProps, EasyIconObject: IEasyIcons = EasyIconObjectDefault, parentLink: string, ): Promise<IGetPagesContent> {

  const performance: ILoadPerformance = createBasePerformanceInit( 1, false );
  performance.ops.fetch1 = startPerformOp( 'fetch1 - getPages', null );

  // debugger;
  const web = Web(`${sourceProps.webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${sourceProps.webUrl}`);

  const expColumns = getExpandColumns( sourceProps.columns );
  const selColumns = getSelectColumns( sourceProps.columns );

  const expandThese = expColumns.join(",");
  //Do not get * columns when using standards so you don't pull WikiFields
  const baseSelectColumns = sourceProps.selectThese ? sourceProps.selectThese : sourceProps.columns;
  const selectThese = [ baseSelectColumns, ...selColumns].join(",");
  const restFilter = sourceProps.restFilter ? sourceProps.restFilter : '';
  const orderBy = sourceProps.orderBy ? sourceProps.orderBy : null;
  let items : IEasyLink[]= [];

  try {
    if ( orderBy ) {
      //This does NOT DO ANYTHING at this moment.  Not sure why.
      items = await web.lists.getByTitle( sourceProps.listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).orderBy(orderBy.prop, orderBy.asc ).getAll();
      performance.ops.fetch1 = updatePerformanceEnd( performance.ops.fetch1, true, items.length );

      // 2022-11-13:  Verified this does get quick launch items
      // {
      //   "odata.type": "SP.NavigationNode",
      //   "odata.id": "https://tenant.sharepoint.com/sites/SolutionTesting/DDv2/_api/Web/Navigation/GetNodeById(2002)",
      //   "odata.editLink": "Web/Navigation/GetNodeById(2002)",
      //   "AudienceIds": null,
      //   "CurrentLCID": 1033,
      //   "Id": 2002,
      //   "IsDocLib": true,
      //   "IsExternal": true,
      //   "IsVisible": true,
      //   "ListTemplateType": 0,
      //   "Title": "Notebook",
      //   "Url": "/sites/SolutionTesting/DDv2/_layouts/15/Doc.aspx?sourcedoc={dc2ddca8-7375-4af8-b4bd-76bfa96fde26}&action=editnew"
      // }
      // const quick = await web.navigation.quicklaunch();
      // console.log( `${sourceProps.webUrl} quick launch:` , quick );

    } else {
      items = await web.lists.getByTitle( sourceProps.listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).getAll();
    }


  } catch (e) {
    getHelpfullErrorV2( e, true, true, 'getPagesContent ~ 73');
    console.log('sourceProps', sourceProps );
  }

  if ( parentLink ) items.push( //'Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl'
    {
      Title: '.. ^ Go to Parent Site',
      Description: 'Quick link to parent site Home page',
      File: { ServerRelativeUrl: parentLink },
      type: 'current',
    } as any
  );

  // if ( showTricks === true ) { items = [ ...items, ...EasyDevPages ]; }

  // debugger;
  performance.ops.analyze1 = startPerformOp( 'analyze1 - addSearchMeta', null );
  items = addSearchMeta( items, sourceProps, EasyIconObject );

  performance.ops.analyze1 = updatePerformanceEnd( performance.ops.analyze1, true, items.length );

  items = sortObjectArrayByStringKeyCollator( items, 'asc', 'title', true, 'en' );

  // eslint-disable-next-line no-eval
  if ( sourceProps.jsFilter ) items = items.filter( item => eval( sourceProps.jsFilter ) === true );

  console.log( sourceProps.defType, sourceProps.listTitle , items );

  return { items: items, performance: performance };

}

const DefaultThumbEasyContents : string = `https://cdn.hubblecontent.osi.office.net/m365content/publish/8833527d-1d55-40be-8d14-0e45b17ce81b/thumbnails/large.jpg`;
const DefaultThumbExtreme : string = `https://cdn.hubblecontent.osi.office.net/m365content/publish/3232a7cd-821f-48bd-bf98-9d84185566a5/thumbnails/large.jpg`;
const DefaultThumbEarth : string = `https://cdn.hubblecontent.osi.office.net/m365content/publish/a505371c-2fca-4d30-ba21-8e4d36e41e65/thumbnails/large.jpg`;

export const DefaultSiteLogo : string = `_layouts/15/images/sitepagethumbnail.png`;

/**
 * This adds Search String and Meta arrays to items
 * @param items 
 * @param sourceProps 
 * @returns 
 */
export function addSearchMeta ( items: IEasyLink[], sourceProps: ISourceProps, EasyIcons: IEasyIcons  ): IEasyLink[] {

  items.map( item => {
    item.tabs = [];
    item.title = item.Title;
    item.description = item.Description;
    item.url = item.File?.ServerRelativeUrl;
    item.imageUrl =  item.BannerImageUrl?.Url;
    item.imageDesc = item.BannerImageUrl?.Description;
    if ( !item.imageUrl || item.imageUrl.indexOf( DefaultSiteLogo ) > - 1 ) {
      if ( item.title?.indexOf( 'Contents' ) > -1 ) { item.imageUrl = DefaultThumbEasyContents; }
      else if ( item.title?.toLocaleLowerCase().indexOf( 'extreme' ) > -1 ) { item.imageUrl = DefaultThumbExtreme; }
      else if ( item.title === 'Home' ) { item.imageUrl = DefaultThumbEarth; }
      else {
        const EasyIconUrl = getEasyIcon( EasyIcons, item );
        if ( EasyIconUrl ) item.imageUrl = EasyIconUrl ? EasyIconUrl : item.imageUrl; // If one is found, then use it, else use the defaul sitepagelogo
        if ( EasyIconUrl ) item.imageDesc = EasyIconUrl ? `Using EasyIcon:) ${ EasyIconUrl.replace( EasyIconLocation, '' )}` : item.imageDesc; // If one is found, then use it, else use the defaul sitepagelogo
      }

    }
    item.searchTextLC = `${item.Title} || ${item.Description}`.toLocaleLowerCase();
    sourceProps.meta1.map( ( tab : string ) => {
      if ( item.searchTextLC.indexOf( tab.toLocaleLowerCase() ) > -1 ) item.tabs.push( tab );
    } );
  });

  items.map( item => {
    if ( item.tabs.length === 0 ) item.tabs.push( sourceProps.overflowTab );

  });


  return items;


}