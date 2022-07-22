import * as React from 'react';

require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

import { ISitePreConfigProps, } from '@mikezimm/npmfunctions/dist/PropPaneHelp/PreConfigFunctions';
import { WebPartHelpElement } from './drillPropPaneHelp';

export function getWebPartHelpElement ( sitePresets : ISitePreConfigProps ) {

  const usePreSets = sitePresets && ( sitePresets.forces.length > 0 || sitePresets.presets.length > 0 ) ? true : false;

  let preSetsContent = null;
  if ( usePreSets === true ) {
    const forces = sitePresets.forces.length === 0 ? null : <div>
      <div className={ 'fps-pph-topic' }>Forced Properties - may seem editable but are auto-set</div>
      <table className='configured-props'>
        { sitePresets.forces.map ( preset => {
          return <tr className={preset.className}><td>{preset.prop}</td><td title={ `for sites: ${preset.location}`}>{preset.type}</td><td>{preset.status}</td><td>{JSON.stringify(preset.value) } </td></tr>;
        }) }
      </table>
    </div>;
    const presets = sitePresets.presets.length === 0 ? null : <div>
      <div className={ 'fps-pph-topic' }>Preset Properties</div>
      <table className='configured-props'>
        { sitePresets.presets.map ( preset => {
          return <tr className={preset.className}><td>{preset.prop}</td><td title={ `for sites: ${preset.location}`}>{preset.type}</td><td>{preset.status}</td><td>{JSON.stringify(preset.value) } </td></tr>;
        }) }
      </table>

    </div>;

    preSetsContent = <div  className={ 'fps-pph-content' } style={{ display: 'flex' }}>
      <div>
        { forces }
        { presets }
      </div>
    </div>;

  }

  const element = WebPartHelpElement( preSetsContent );

  return element;

}