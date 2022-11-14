import * as React from 'react';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';
// import { escape } from '@microsoft/sp-lodash-subset';
import ReactJson from "react-json-view";

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

import { IRepoLinks } from '../../fpsReferences';
import { IEasyIcons } from './eiTypes'; //, IEasyIconGroup, IEasyIconGroups, EasyIconLocation
// import { urlCombine } from '@pnp/spfx-controls-react';
import { getEasyIconElement } from './eiHelpIcons';

require('./easyicons.css');

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

export function putObjectIntoJSON ( obj: any, name: string = null ): JSX.Element {
  // return <ReactJson src={ obj } name={ 'panelItem' } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '20px 0px' }}/>;
  return <ReactJson src={ obj } name={ name } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;
}

export function getEasyIconsHelp ( EasyIcons: IEasyIcons, repoLink: IRepoLinks ): JSX.Element {

  // const PleaseSeeWiki = <p>Please see the { repoLink.wiki }  for more information</p>;

  const EasyIconsHelp = <div className={ 'fps-pph-content' } style={{ paddingBottom: '100px' }}>
      <div className={ 'fps-pph-topic' }>Easy Icons</div>
      <div >Easy Icons feature will magically find Thumbnails and Images for content that does not have any!</div>
      <div >What do you have to do to get started?   NOTHING!</div>
      <div className={ 'fps-pph-topic' }>What if I do not like the Icons that I see?</div>
      <ul>
        <li>Manually add the Thumbnail Icon to the item - where applicable
          <ul>
            <li>Normal Site Pages:  Edit Page, click Page Details Gear, set Thumbnail</li>
            <li>News Links:  Go to Site Pages, Edit the News Link, set Thumbnail</li>
            <li>Sites and Subsites:  Site Gear, Change the Look, Header, Set Logo and Thumbnail</li>
            <li>Files:  SharePoint auto-generates Thumbnails based on the content in the file</li>
            <li>Lists, Libraries:  Not possible to set a Thumbnail at all</li>
          </ul>
        </li>

        <li>Tell the web part what Icons to focus on
          <ol>
            <li>Edit Page</li>
            <li>Edit Web Part</li>
            <li>Expand EasyPages and EasyIcons section</li>
            <li>Remove or Change order of Easy Icon keys</li>
            <li>Type in EasyIcons to Ignore:  Folder/IconName</li>
          </ol>
        </li>
      </ul>
      <div className={ 'fps-pph-topic' }>What Icons are available?</div>

      {/* { getEasyIconElement( EasyIcons, 'geek' ) }
      { getEasyIconElement( EasyIcons, 'hero' ) }
      { getEasyIconElement( EasyIcons, 'fly' ) } */}
      { getEasyIconElement( EasyIcons, 'Base' ) }
      {/* { getEasyIconElement( EasyIcons, '2' ) }
      { getEasyIconElement( EasyIcons, '3' ) }
      { getEasyIconElement( EasyIcons, '4' ) }
      { getEasyIconElement( EasyIcons, '5' ) } */}

    </div>;

  const EasyIconsHelpPivot: JSX.Element = 
  <PivotItem headerText={ null } itemIcon='ImageSearch'>
    { EasyIconsHelp }
  </PivotItem>;

  return EasyIconsHelpPivot;

}