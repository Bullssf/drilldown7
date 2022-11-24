import { sortObjectArrayByStringKeyCollator } from "@mikezimm/npmfunctions/dist/Services/Arrays/sorting";
import { IEasyLink } from "./componentPage";

import { Web, } from '@pnp/sp/presets/all';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

//Interfaces
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultOverflowTab, EasyPagesDevTab, ISourceProps, EasyPagesSysPages, EasyPagesCCSPages, EasyPagesSysTab } from './epTypes'; //SourceInfo, 

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
  let systemTab: any = false;  //  https://github.com/mikezimm/drilldown7/issues/280

  items.map( item => {
    item.tabs.map( tab => {

      if ( tab === EasyPagesSysTab ) {
        systemTab = true;  //  https://github.com/mikezimm/drilldown7/issues/280

      } else if ( foundTabs.indexOf( tab ) < 0 ) {
        foundTabs.push( tab );

      } else if ( tab === sourceProps.EasyPageOverflowTab ) {
        showOverFlow = true;
      }

    } );
  });

  const sortedTabs: string[] = [];
  sourceProps.meta1.map( tab => { if ( foundTabs.indexOf( tab ) > -1 ) sortedTabs.push( tab ) ;} );
  if ( showOverFlow === true ) sortedTabs.push( sourceProps.EasyPageOverflowTab );
  if ( systemTab === true ) sortedTabs.push( EasyPagesSysTab );  //  https://github.com/mikezimm/drilldown7/issues/280

  return sortedTabs;

}

/**
 * This gets Site Pages content, based on ALVFinMan7 model
 * @param sourceProps 
 * @returns 
 */
export interface IGetPagesContent { items: IEasyLink[], performance: ILoadPerformance, errMessage: string }

export interface IItemsError {
  items: any[];
  errMessage: string;
}

export async function fetchPages( sourceProps: ISourceProps, alertMe: boolean | undefined, consoleLog: boolean | undefined,) : Promise<IItemsError> {

  let items : any[]= [];
  const expColumns = getExpandColumns( sourceProps.columns );
  const selColumns = getSelectColumns( sourceProps.columns );

  const expandThese = expColumns.join(",");
  //Do not get * columns when using standards so you don't pull WikiFields
  const baseSelectColumns = sourceProps.selectThese ? sourceProps.selectThese : sourceProps.columns;
  const selectThese = [ baseSelectColumns, ...selColumns].join(",");
  const restFilter = sourceProps.restFilter ? sourceProps.restFilter : '';
  const orderBy = sourceProps.orderBy ? sourceProps.orderBy : null;

  const web = Web(`${sourceProps.webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${sourceProps.webUrl}`);

  let errMessage: string = '';
  try {
    if ( orderBy ) {
      //This does NOT DO ANYTHING at this moment.  Not sure why.
      items = await web.lists.getByTitle( sourceProps.listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).orderBy(orderBy.prop, orderBy.asc ).getAll();

    } else {
      items = await web.lists.getByTitle( sourceProps.listTitle ).items
      .select(selectThese).expand(expandThese).filter(restFilter).getAll();
    }

  } catch (e) {
    errMessage = getHelpfullErrorV2( e, alertMe, consoleLog, 'getPagesContent ~ 73');
    console.log('sourceProps', sourceProps );
  }

  return { items: items, errMessage: errMessage };

}

export async function getPagesContent( sourceProps: ISourceProps, EasyIconObject: IEasyIcons = EasyIconObjectDefault, parentLink: string, ): Promise<IGetPagesContent> {

  //"List 'Site Pages' does not exist at site with URL
  const performance: ILoadPerformance = createBasePerformanceInit( 1, false );
  performance.ops.fetch1 = startPerformOp( 'fetch1 - getPages', null );

  const fetchResults = await fetchPages( sourceProps, false, true );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
  let { items, errMessage, } = fetchResults;

  if ( errMessage.indexOf(`"List 'Site Pages' does not exist`) > 1 ) alert( `I'm sorry, this site does NOT have a library Titled 'Site Pages :(`);

  performance.ops.fetch1 = updatePerformanceEnd( performance.ops.fetch1, true, items.length );

  if ( parentLink ) items.push( //'Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl'
    {
      Title: '.. ^ Go to Parent Site',
      Description: 'Quick link to parent site Home page',
      File: { ServerRelativeUrl: parentLink },
      type: 'current',
    } as any
  );

  performance.ops.analyze1 = startPerformOp( 'analyze1 - addSearchMeta', null );
  items = addSearchMeta( items, sourceProps, EasyIconObject );

  performance.ops.analyze1 = updatePerformanceEnd( performance.ops.analyze1, true, items.length );

  items = sortObjectArrayByStringKeyCollator( items, 'asc', 'title', true, 'en' );

  // eslint-disable-next-line no-eval
  if ( sourceProps.evalFilter ) items = items.filter( item => eval( sourceProps.evalFilter ) === true );

  console.log( sourceProps.defType, sourceProps.listTitle , items );

  return { items: items as IEasyLink[], performance: performance, errMessage: errMessage };

}

const DefaultThumbCCS : string = `https://www.crowcanyon.com/wp-content/uploads/2020/12/NITRO_Studio_Transparent2.png`;
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

    // https://github.com/mikezimm/drilldown7/issues/280
    EasyPagesCCSPages.map( ccs => {
      if ( item.url?.toLocaleLowerCase().indexOf( `/${ccs.toLocaleLowerCase()}.aspx`  ) > -1 ) { item.imageUrl = DefaultThumbCCS; }
    });

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

    // https://github.com/mikezimm/drilldown7/issues/280
    EasyPagesSysPages.map( sysPage => {
      if ( item.searchTextLC.indexOf( sysPage.toLocaleLowerCase() ) > -1 ) item.tabs.push( EasyPagesSysTab );
    });

    //Only add to user tabs if it's NOT a known System page
    if ( item.tabs.indexOf( EasyPagesSysTab ) < 0 ) {
      sourceProps.meta1.map( ( tab : string ) => {
        if ( item.searchTextLC.indexOf( tab.toLocaleLowerCase() ) > -1 ) item.tabs.push( tab );
      } );
    }

  });

  items.map( item => {
    if ( item.tabs.length === 0 ) item.tabs.push( sourceProps.EasyPageOverflowTab );

  });

  return items;

}