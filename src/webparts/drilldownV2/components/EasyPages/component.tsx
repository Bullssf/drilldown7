import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

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
import { createPerformanceTableVisitor, createPerformanceRows } from '@mikezimm/npmfunctions/dist/Performance/tables';

import { compoundArrayFilter, getPagesContent, getUsedTabs } from './functions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createNewSitePagesSource, DefaultOverflowTab, ISourceProps, SitePagesSource, EasyPagesDevTab } from './epTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEasyIconProps, IEasyIcons } from '../EasyIcons/eiTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setEasyIconsObjectProps } from '../EasyIcons/eiFunctions';

export interface IEasyPagesProps {
  context: WebPartContext;
  pageLayout: ISupportedHost;  //  SharePointFullPage
  showTricks: boolean;  // For special dev links in EasyPages
  pinState: IPinMeState;      // To be used when rebuilding the Banner and FetchBanner components
  expanded: boolean;
  toggleExpanded?: any;
  tabs: string[];
  overflowTab?: string;
  fetchParent?: boolean; //Include parent site pages
  altSitePagesUrl?: string; //Include alternate site's site pages
  altSiteNavigation?: string; //Include navigation elements from other site
  styles?: React.CSSProperties;  //Optional styles on entire page
  containerStyles?: React.CSSProperties;  //Optional styles on container element
}

export interface IEasyPagesHookProps {
  easyPagesProps: IEasyPagesProps;
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


const InfoTab = 'FetchInfoZz79';
const InfoIcon = 'History';
// export function createViewBuilder( selected: IMinField[], onExpandRight: any = null ) : JSX.Element {

const EasyPagesHook: React.FC<IEasyPagesHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, expanded, tabs, overflowTab, fetchParent, altSitePagesUrl, altSiteNavigation, styles, containerStyles, showTricks } = props.easyPagesProps;


  const [ tab, setTab ] = useState<string>( tabs.length > 0 ? tabs[0] : 'Pages' );
  const [ showTabs, setShowTabs ] = useState<string[]>( tabs.length > 0 ? [ ...tabs, ...[ InfoTab ] ]: ['Pages'] );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ currentSource, setCurrentSource ] = useState<ISourceProps>( createNewSitePagesSource( context.pageContext.web.absoluteUrl, tabs, overflowTab, showTricks ));
  const [ expandedState, setExpandedState ] = useState<boolean>(expanded);
  // const [ expandedState, setExpandedState ] = useState<boolean>( false );
  const [ fetched, setFetched ] = useState<boolean>(false);
  const [ performance, setPerformance ] = useState<ILoadPerformance>( createBasePerformanceInit( 1, false ));
  const [ filtered, setFiltered ] = useState<IEasyLink[]>([]);
  const [ current, setCurrent ] = useState<IEasyLink[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ parent, setParent ] = useState<IEasyLink[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ altPages, setAltPages ] = useState<IEasyLink[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ altNav, setAltNav ] = useState<IEasyLink[]>([]);

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expandedState === true && fetched === false ) {
      const getPages = async (): Promise<void> => {
        const parentLink: string = context.pageContext.web.absoluteUrl !== context.pageContext.site.absoluteUrl ? context.pageContext.site.absoluteUrl : '';
        const pagesResults = await getPagesContent( currentSource, props.EasyIconsObject, parentLink, showTricks );
        const actualTabs = getUsedTabs( currentSource, pagesResults.items );
        const links: IEasyLink[] = compoundArrayFilter( pagesResults.items, actualTabs[0], '' );
        setTab( actualTabs[0] );
        setFetched( true );
        setFiltered( links );
        setCurrent( pagesResults.items );
        setShowTabs( [ ...actualTabs, ...[ InfoTab ] ] );
        setPerformance( pagesResults.performance )
      };

      // eslint-disable-next-line no-void
      void getPages(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, );

  useEffect(() => {
    setExpandedState( expanded )
  }, [ expanded ] );

  const onTextSearch = ( item: any, text: string = '' ): void => {
    const SearchValue : string = typeof item === 'string' ? item : item && item.target && item.target.value ? item.target.value : '';
    const  allLinks: IEasyLink[] = [ ...current, ...parent, ...altPages, ...altNav ];
    const links: IEasyLink[] = compoundArrayFilter( allLinks, SearchValue, text );
    setFiltered( links );
    setTab( SearchValue );
  }

  // item SHOULD BE IPivotItemProps but have to cast as any in order to get itemKey and headerText
  const pivotClick = ( item?: PivotItem, ev?: React.MouseEvent<HTMLElement> ): void => {
    //Because of Performance Tab, need to adjust what is returned.   have to use .indexOf because itemKey value is .$FetchInfo
    const itemKey = !item.props.headerText ? InfoTab : item.props.headerText ;
    onTextSearch( itemKey );

  }

  //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/56
  const classNames: string[] = [ 'easy-pages' ];
  if ( expandedState === true ) classNames.push ( 'expand' );
  if ( props.easyPagesProps.pageLayout === 'SharePointFullPage' || props.easyPagesProps.pageLayout === 'SingleWebPartAppPageLayout' ) classNames.push ( 'easy-pages-spa' );
  if ( ( props.easyPagesProps.pinState === 'pinFull' || props.easyPagesProps.pinState === 'pinMini' ) && classNames.indexOf('easy-pages-spa') < 0 ) classNames.push ( 'easy-pages-spa' );

  const EasyPagesElement: JSX.Element = <div className = { classNames.join( ' ' ) } style={ styles }>
    <Pivot 
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal}
      //   style={{ flexGrow: 1, paddingLeft: '10px' }}
      //   styles={ null }
      //   linkSize= { pivotOptionsGroup.getPivSize('normal') }
      //   linkFormat= { pivotOptionsGroup.getPivFormat('links') }
        onLinkClick= { pivotClick.bind(this) }  //{this.specialClick.bind(this)}
        selectedKey={ tab }
      >
      { showTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } headerText={ tab !== InfoTab ? tab : '' } itemIcon={ tab === InfoTab ? InfoIcon : null } />
      })}

    </Pivot>
    
    <Icon iconName={ 'ChromeClose' } title={ 'Close Easy Pages panel'} 
        onClick= { () => props.easyPagesProps.toggleExpanded() } className={ 'easy-pages-close' } />

    { tab === InfoTab ? createPerformanceTableVisitor( performance, ['fetch1', 'analyze1' ] ) : 
      <div className = { [ 'easy-container', tab === EasyPagesDevTab ? 'easy-container-2col' : null ].join( ' ' ) } style={ containerStyles }>
        { filtered.map( link => { return easyLinkElement( link, '_blank'  ) } ) }
      </div>
    }
  </div>;

  return ( EasyPagesElement );

}

export default EasyPagesHook;