import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

require('./easypages.css');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createNewSitePagesSource, ISourceProps, EasyPagesDevTab, EasyPagesRepoTab } from './epTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEasyIcons } from '../EasyIcons/eiTypes';

import EasyPagesPageHook, { IEasyPagesSourceProps, ISourceName, InfoTab, InfoIcon } from './componentPage';

export interface IEasyPagesExtraProps {

  showTricks: boolean;  // For special dev links in EasyPages
  EasyPagesEnable: boolean;

  easyPagesToggleExpanded?: any;
  easyPagesExpanded: boolean;

  EasyPageOverflowTab?: string;

  tabsC: string[];  // Tabs for Current site
  tabsP: string[];  // Tabs for Parent site
  tabsA: string[];  // Tabs for Alt site
  tabsB: string[];  // Tabs for Alt site

  EasyPageParentFetch?: boolean; //Include parent site pages
  EasyPageUrlA?: string; //Include alternate site's site pages
  EasyPagesSiteTitleA?: string;  // Button Text for Alternate Site

  EasyPageUrlB?: string; //Include alternate site's site pages
  EasyPagesSiteTitleB?: string;  // Button Text for Alternate Site

}

export interface IEasyPagesHookProps {
  easyPagesCommonProps: IEasyPagesSourceProps;  // General props which apply to all Sources/Pages
  easyPagesExtraProps: IEasyPagesExtraProps;  // General props which are used on the SourcesPage but not component page
  EasyIconsObject: IEasyIcons; 
}

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

const EasyPagesHook: React.FC<IEasyPagesHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, styles, containerStyles, repo } = props.easyPagesCommonProps;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { easyPagesExpanded, EasyPageOverflowTab, tabsC, tabsP, tabsA, tabsB, EasyPageParentFetch, EasyPageUrlA, EasyPagesSiteTitleA, EasyPageUrlB, EasyPagesSiteTitleB, showTricks } = props.easyPagesExtraProps;

  const realSiteA : ISourceName = EasyPagesSiteTitleA ? EasyPagesSiteTitleA as ISourceName : EasyPageUrlA as ISourceName;
  const realSiteB : ISourceName = EasyPagesSiteTitleB ? EasyPagesSiteTitleB as ISourceName : EasyPageUrlB as ISourceName;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ parentUrl , setParentUrl ] =  useState<string>( context.pageContext.web.absoluteUrl !== context.pageContext.site.absoluteUrl ? context.pageContext.site.absoluteUrl : '' );  // Needed here because it's also used in current site

  const [ source, setSource ] = useState<ISourceName>( 'Current' );
  const [ expandedState, setExpandedState ] = useState<boolean>(easyPagesExpanded);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ sourceC, setSourceC ] = useState<ISourceProps>( () => createNewSitePagesSource( 'Current', context.pageContext.web.absoluteUrl, tabsC, EasyPageOverflowTab, showTricks ));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ sourceP, setSourceP ] = useState<ISourceProps>( () => createNewSitePagesSource( 'Parent',  parentUrl, tabsP, EasyPageOverflowTab, showTricks ));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ sourceA, setSourceA ] = useState<ISourceProps>( () => createNewSitePagesSource( realSiteA, EasyPageUrlA, tabsA, EasyPageOverflowTab, showTricks ));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ sourceB, setSourceB ] = useState<ISourceProps>( () => createNewSitePagesSource( realSiteB, EasyPageUrlB, tabsB, EasyPageOverflowTab, showTricks ));

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

  useEffect(() => {
    setExpandedState( easyPagesExpanded )
  }, [ easyPagesExpanded ] );

  const setSourceCurrent = ( ): void => {
    setSource( 'Current' );
  }

  const setSourceParent = ( ): void => {
    setSource( 'Parent' );
  }

  const setSourceAlternateA = ( ): void => {
    setSource( realSiteA );
  }

  const setSourceAlternateB = ( ): void => {
    setSource( realSiteB );
  }

  const setSourceDev = ( ): void => {
    // const links: IEasyLink[] = compoundArrayFilter( altPages, showTabsA[0], '' );
    setSource( EasyPagesDevTab );
  }

  const setSourceGit = ( ): void => {
    // const links: IEasyLink[] = compoundArrayFilter( altPages, showTabsA[0], '' );
    setSource( EasyPagesRepoTab );
  }

  // item SHOULD BE IPivotItemProps but have to cast as any in order to get itemKey and headerText
  const sourceClick = ( item?: PivotItem, ev?: React.MouseEvent<HTMLElement> ): void => {
    //Because of Performance Tab, need to adjust what is returned.   have to use .indexOf because itemKey value is .$FetchInfo
    const itemKey: ISourceName = !item.props.headerText ? InfoTab as ISourceName : item.props.headerText as ISourceName;
    if ( itemKey === 'Current' ) setSourceCurrent( );
    if ( itemKey === 'Parent' ) setSourceParent( );
    if ( itemKey === realSiteA ) setSourceAlternateA( );
    if ( itemKey === realSiteB ) setSourceAlternateB( );
    if ( itemKey === EasyPagesDevTab ) setSourceDev( );
    if ( itemKey === EasyPagesRepoTab ) setSourceGit( );

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
  const classNames: string[] = [ 'easy-pages' ];
  if ( expandedState === true ) classNames.push ( 'expand' );

  // Rebuilt logic for:  https://github.com/mikezimm/drilldown7/issues/263 , https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/72
  if ( props.easyPagesCommonProps.pageLayout === 'SharePointFullPage' || props.easyPagesCommonProps.pageLayout === 'SingleWebPartAppPageLayout' ) {

    if ( repo.href.toLowerCase().indexOf('drilldown') > -1 ) {
      classNames.push( 'ep-drilldown-spa' ) ;

    } else { classNames.push ( 'easy-pages-spa' ); }

  } else {
    if ( repo.href.toLowerCase().indexOf('drilldown') > -1 ) classNames.push( 'ep-drilldown' );
    if ( ( props.easyPagesCommonProps.pinState === 'pinFull' || props.easyPagesCommonProps.pinState === 'pinMini' ) && classNames.indexOf('easy-pages-spa') < 0 ) classNames.push ( 'easy-pages-spa' );

  }


  // EasyPageParentFetch?: boolean; //Include parent site pages
  // EasyPageUrlA?: string; //Include alternate site's site pages

  const sourceTabs: ISourceName[] = [ 'Current' ];
  if ( EasyPageParentFetch === true && parentUrl ) sourceTabs.push( 'Parent' );
  if ( EasyPageUrlA ) sourceTabs.push( realSiteA );
  if ( EasyPageUrlB ) sourceTabs.push( realSiteB );
  if ( showTricks === true )  sourceTabs.push( EasyPagesDevTab );
  if ( showTricks === true )  sourceTabs.push( EasyPagesRepoTab );

  const EasyPagesSourceElement: JSX.Element = <div className = { classNames.join( ' ' ) } style={ styles }>

    <Pivot 
          linkFormat={PivotLinkFormat.tabs}
          linkSize={PivotLinkSize.normal}
        onLinkClick= { sourceClick.bind(this) }  //{this.specialClick.bind(this)}
        selectedKey={ source }
      >
      { sourceTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } itemKey={ tab } headerText={ tab !== InfoTab ? tab : '' } itemIcon={ tab === InfoTab ? InfoIcon : null } />
      })}

    </Pivot>
    <Icon iconName={ 'ChromeClose' } title={ 'Close Easy Pages panel'} 
        onClick= { () => props.easyPagesExtraProps.easyPagesToggleExpanded() } className={ 'easy-pages-close' } />

    <EasyPagesPageHook
      easyPagesPageProps = {{
        expandedState: expandedState === true && source === 'Current' ? true : false,
        tabs: tabsC,
        source: sourceC,
        sourceName: 'Current',
        parentUrl: parentUrl,
      }}
      easyPagesCommonProps={ props.easyPagesCommonProps }  // General props which apply to all Sources/Pages
      EasyIconsObject = { props.EasyIconsObject }
    />

    <EasyPagesPageHook
      easyPagesPageProps = {{
        expandedState: expandedState === true && source === 'Parent' ? true : false,
        tabs: tabsP,
        source: sourceP,
        sourceName: 'Parent',
        parentUrl: '',
      }}
      easyPagesCommonProps={ props.easyPagesCommonProps }  // General props which apply to all Sources/Pages
      EasyIconsObject = { props.EasyIconsObject }
    />

    <EasyPagesPageHook
      easyPagesPageProps = {{
        expandedState: expandedState === true && source === realSiteA ? true : false,
        tabs: tabsA,
        source: sourceA,
        sourceName: realSiteA,
        parentUrl: '',
      }}
      easyPagesCommonProps={ props.easyPagesCommonProps }  // General props which apply to all Sources/Pages
      EasyIconsObject = { props.EasyIconsObject }
    />

    <EasyPagesPageHook
      easyPagesPageProps = {{
        expandedState: expandedState === true && source === realSiteB ? true : false,
        tabs: tabsB,
        source: sourceB,
        sourceName: realSiteB,
        parentUrl: '',
      }}
      easyPagesCommonProps={ props.easyPagesCommonProps }  // General props which apply to all Sources/Pages
      EasyIconsObject = { props.EasyIconsObject }
    />

    <EasyPagesPageHook
      easyPagesPageProps = {{
        expandedState: expandedState === true && source === EasyPagesDevTab ? true : false,
        tabs: [],
        source: sourceA,
        sourceName: EasyPagesDevTab,
        parentUrl: '',
      }}
      easyPagesCommonProps={ props.easyPagesCommonProps }  // General props which apply to all Sources/Pages
      EasyIconsObject = { props.EasyIconsObject }
    />

    <EasyPagesPageHook
      easyPagesPageProps = {{
        expandedState: expandedState === true && source === EasyPagesRepoTab ? true : false,
        tabs: [],
        source: sourceA,
        sourceName: EasyPagesRepoTab,
        parentUrl: '',
      }}
      easyPagesCommonProps={ props.easyPagesCommonProps }  // General props which apply to all Sources/Pages
      EasyIconsObject = { props.EasyIconsObject }
    />

  </div>;

  return ( EasyPagesSourceElement );

}

export default EasyPagesHook;