import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';

// import { getExpandColumns, getSelectColumns } from '../../fpsReferences';

require('./easypages.css');

// import styles from '../PropPaneCols.module.scss';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { easyLinkElement } from './elements';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sortObjectArrayByStringKeyCollator } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';

import { ISupportedHost } from '@mikezimm/npmfunctions/dist/Services/PropPane/FPSInterfaces';
import { IPinMeState } from "@mikezimm/npmfunctions/dist/Services/DOM/PinMe/FPSPinMenu";

import { ILoadPerformance, } from '@mikezimm/npmfunctions/dist/Performance/IPerformance';
import { createBasePerformanceInit, } from '@mikezimm/npmfunctions/dist/Performance/functions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createPerformanceTableVisitor, } from '@mikezimm/npmfunctions/dist/Performance/tables';

import { compoundArrayFilter, getPagesContent, getUsedTabs } from './functions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISourceProps, EasyPagesDevTab, EasyPagesRepoTab } from './epTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEasyIcons } from '../EasyIcons/eiTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EasyDevPages, getZGitLinks } from './devLinks';
import { IRepoLinks } from '../../fpsReferences';

export type ISourceName = 'Current' | 'Parent' | 'Alternate' | typeof EasyPagesDevTab | typeof EasyPagesRepoTab ;

export const EasyPageNoFetchTabs: ISourceName[] = [ EasyPagesDevTab, EasyPagesRepoTab ] ;

export interface IEasyPagesSourceProps {

  context: WebPartContext;
  pageLayout: ISupportedHost;  //  SharePointFullPage

  pinState: IPinMeState;      // To be used when rebuilding the Banner and FetchBanner components

  styles?: React.CSSProperties;  //Optional styles on entire page
  containerStyles?: React.CSSProperties;  //Optional styles on container element

  repo: IRepoLinks;   //This can eventually be taken from bannerProps directly
}

export interface IEasyPagesPageProps {
  expandedState: boolean;  //Is this particular page expanded
  tabs: string[];  // Tabs for Current site
  source: ISourceProps;
  sourceName: ISourceName;
  parentUrl: string;

}


export interface IEasyPagesPageHookProps {
  easyPagesPageProps: IEasyPagesPageProps;  // Props specific to this Source/Page component
  easyPagesCommonProps: IEasyPagesSourceProps;  // General props which apply to all Sources/Pages
  EasyIconsObject: IEasyIcons;
}

export interface IEasyLink extends Partial<any> {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  imageDesc: string;
  searchTextLC: string;
  type: 'current' | 'parent' | 'other' | 'nav';
  tabs: string[];
}

export const InfoTab = 'FetchInfoZz79';
export const InfoIcon = 'History';


/***
 *    .d8888. d888888b  .d8b.  d8888b. d888888b      db   db  .d88b.   .d88b.  db   dD 
 *    88'  YP `~~88~~' d8' `8b 88  `8D `~~88~~'      88   88 .8P  Y8. .8P  Y8. 88 ,8P' 
 *    `8bo.      88    88ooo88 88oobY'    88         88ooo88 88    88 88    88 88,8P   
 *      `Y8b.    88    88~~~88 88`8b      88         88~~~88 88    88 88    88 88`8b   
 *    db   8D    88    88   88 88 `88.    88         88   88 `8b  d8' `8b  d8' 88 `88. 
 *    `8888Y'    YP    YP   YP 88   YD    YP         YP   YP  `Y88P'   `Y88P'  YP   YD 
 *                                                                                     
 *                                                                                     
 */

const EasyPagesPageHook: React.FC<IEasyPagesPageHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, styles, containerStyles, repo } = props.easyPagesCommonProps;
  const { expandedState, tabs, source, sourceName, parentUrl } = props.easyPagesPageProps;

  /**
   * State related to tabs visible items
   */
  const [ tab, setTab ] = useState<string>( tabs.length > 0 ? tabs[0] : 'Pages' );
  const [ filtered, setFiltered ] = useState<IEasyLink[]>( sourceName === EasyPagesDevTab ? EasyDevPages : sourceName === EasyPagesRepoTab ? () => getZGitLinks( repo ) : [] );
  const [ activeTabs, setActiveTabs ] = useState<string[]>( tabs.length > 0 ? [ ...tabs, ...[ InfoTab ] ]: ['Pages'] );

  /**
   * State related to fetching the source props
   */
  const [ fetched, setFetched ] = useState<boolean>( EasyPageNoFetchTabs.indexOf( sourceName ) > -1 ? true : false );
  const [ performance, setPerformance ] = useState<ILoadPerformance>( () => createBasePerformanceInit( 1, false ));
  const [ pages, setPages ] = useState<IEasyLink[]>( EasyPageNoFetchTabs.indexOf( sourceName ) > -1 ? EasyDevPages : [] );

/***
 *     .o88b. db    db d8888b. d8888b. d88888b d8b   db d888888b      .d8888. d888888b d888888b d88888b 
 *    d8P  Y8 88    88 88  `8D 88  `8D 88'     888o  88 `~~88~~'      88'  YP   `88'   `~~88~~' 88'     
 *    8P      88    88 88oobY' 88oobY' 88ooooo 88V8o 88    88         `8bo.      88       88    88ooooo 
 *    8b      88    88 88`8b   88`8b   88~~~~~ 88 V8o88    88           `Y8b.    88       88    88~~~~~ 
 *    Y8b  d8 88b  d88 88 `88. 88 `88. 88.     88  V888    88         db   8D   .88.      88    88.     
 *     `Y88P' ~Y8888P' 88   YD 88   YD Y88888P VP   V8P    YP         `8888Y' Y888888P    YP    Y88888P 
 *                                                                                                      
 *                                                                                                      
 */

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expandedState === true && fetched === false ) {
      const getPages = async (): Promise<void> => {
        const pagesResults = await getPagesContent( source, props.EasyIconsObject, parentUrl, );
        const actualTabs = getUsedTabs( source, pagesResults.items );
        actualTabs.push( InfoTab );
        const links: IEasyLink[] = compoundArrayFilter( pagesResults.items, actualTabs[0], '' );
        setTab( actualTabs[0] );
        setFetched( true );
        setFiltered( links );
        setPages( pagesResults.items );
        setActiveTabs( actualTabs );
        setPerformance( pagesResults.performance );
      };

      // eslint-disable-next-line no-void
      void getPages(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ sourceName, expandedState ] );
  /***
 *     .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD .d8888. 
 *    .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 88'  YP 
 *    88    88 88V8o 88      8P      88         88    8P      88,8P   `8bo.   
 *    88    88 88 V8o88      8b      88         88    8b      88`8b     `Y8b. 
 *    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. db   8D 
 *     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD `8888Y' 
 *                                                                            
 *                                                                            
 */

  const onTextSearch = ( item: any, text: string = '' ): void => {
    const SearchValue : string = typeof item === 'string' ? item : item && item.target && item.target.value ? item.target.value : '';
    const links: IEasyLink[] = compoundArrayFilter( pages, SearchValue, text );
    setFiltered( links );
    setTab( SearchValue );

  }

  // item SHOULD BE IPivotItemProps but have to cast as any in order to get itemKey and headerText
  const pivotClick = ( item?: PivotItem, ev?: React.MouseEvent<HTMLElement> ): void => {
    //Because of Performance Tab, need to adjust what is returned.   have to use .indexOf because itemKey value is .$FetchInfo
    const itemKey = !item.props.headerText ? InfoTab : item.props.headerText ;
    onTextSearch( itemKey );

  }

  /***
 *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                 
 *                                                                 
 */

  //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/56
  const classNames: string[] = [ 'source-page' ];
  // const classNames: string[] = [ 'easy-pages' ];
  if ( expandedState !== true ) classNames.push ( 'hide-source-page' );
  // if ( props.easyPagesCommonProps.pageLayout === 'SharePointFullPage' || props.easyPagesCommonProps.pageLayout === 'SingleWebPartAppPageLayout' ) classNames.push ( 'easy-pages-spa' );
  // if ( ( props.easyPagesCommonProps.pinState === 'pinFull' || props.easyPagesCommonProps.pinState === 'pinMini' ) && classNames.indexOf('easy-pages-spa') < 0 ) classNames.push ( 'easy-pages-spa' );

  const EasyPagesPageElement: JSX.Element = <div className = { classNames.join( ' ' ) } style={ styles }>

    { EasyPageNoFetchTabs.indexOf( sourceName ) > -1 ? null : <Pivot 
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal}
      //   style={{ flexGrow: 1, paddingLeft: '10px' }}
        onLinkClick= { pivotClick.bind(this) }
        selectedKey={ tab }
      >
      { activeTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } itemKey={ tab } headerText={ tab !== InfoTab ? tab : '' } itemIcon={ tab === InfoTab ? InfoIcon : null } />
      })}

    </Pivot>}

    { tab === InfoTab ? createPerformanceTableVisitor( performance, ['fetch1', 'analyze1' ] ) : 
      <div className = { [ 'easy-container', EasyPageNoFetchTabs.indexOf( sourceName ) > -1 ? 'easy-container-2col' : null ].join( ' ' ) } style={ containerStyles }>
        { filtered.map( link => { return easyLinkElement( link, '_blank'  ) } ) }
      </div>
    }
  </div>;

  return ( EasyPagesPageElement );

}

export default EasyPagesPageHook;