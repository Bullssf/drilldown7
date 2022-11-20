import * as React from 'react';
import { IEasyLink } from './componentPage';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { EasyPagesDevTab } from './epTypes';

const gulpServe: string = `?debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js`;

export function easyLinkElement( link: IEasyLink, target: string = '_blank' ) : JSX.Element {

  const { File, imageUrl, url, imageDesc, title, description, tabs } = link;

  const linkUrl: string = File?.ServerRelativeUrl ? File.ServerRelativeUrl : url ? url : '';

  let linkIsSPO: boolean = linkUrl.indexOf( '.sharepoint.com' ) > 6 ? true : false; // If it's not SitePages, no gulp
  if ( linkUrl.indexOf( '/sites/' ) === 0 ) linkIsSPO = true;
  if ( linkUrl.toLowerCase().indexOf( '/sitepages/' ) < 0 ) linkIsSPO = false; // If it's not SitePages, no gulp

  const gulpParam: string = linkIsSPO === true ? gulpServe : '';

  const imageIsDefault = imageUrl && imageUrl.indexOf('_layouts/15/images/sitepagethumbnail.png') > -1 ? true : false;
  const newTarget = tabs.indexOf(EasyPagesDevTab) < 0 ? target : '_blank';

  const newClass = [ 'easy-link' ];
  if ( tabs.indexOf(EasyPagesDevTab) > -1 ) newClass.push( 'easy-link-2col' );

  const isCurrentPage = linkUrl?.toLocaleLowerCase().indexOf( window.location.pathname.toLocaleLowerCase() ) > -1 ? true : false;
  const titleStyle: React.CSSProperties = { fontSize: title ? '' : 'smaller', fontWeight: title ? null : 400 };
  const titleClass: string[] = [ 'easy-link-title' ];

  // https://github.com/mikezimm/drilldown7/issues/264
  if ( isCurrentPage === true ) titleClass.push( 'easy-link-current-title' );

  const currentPageIcon = isCurrentPage !== true ? null : <span title='You are currently on this page' style={{ }}><Icon iconName='SingleBookmarkSolid' /></span>;
  return <div className = { newClass.join( ' ' ) } onClick={ ( ev ) => { window.open( `${linkUrl}${ ev.altKey === true ? gulpParam : '' }` , newTarget ) } } >
    <img className={ 'easy-link-image' } src={ imageUrl } style={{ height: imageIsDefault === true ? '20px' : '50px' }} title={ imageDesc }/>
    <div className={ titleClass.join(' ') } style={ titleStyle } title={  linkUrl }>
        { currentPageIcon } { title ? title : `Page does NOT have a title :(` }</div>

    <div className='easy-link-desc'>{description }</div>
  </div>;

}

