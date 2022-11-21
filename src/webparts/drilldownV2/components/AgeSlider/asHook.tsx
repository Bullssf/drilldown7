
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';

import { Slider } from 'office-ui-fabric-react/lib/Slider';

import { IAgeSliderProps, AgeSliderOptions } from './asTypes';

export interface IAgeSliderHookProps {
  props: IAgeSliderProps;
}


  /**
   * 
   *  NOTES FOR 11/22/2022
   *  Test page:  /SharePointOnlineMigration/SitePages/ttpKarina.aspx?debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js
   * It's showing both Sliders, BUT 
   * columnTitleAS === 2 on WP per props.
   * BUT it shows as the first one in the default on the component
   * 
   * 
   * ADD THIS TO THE <AgeSlider props
   * defaultAgeAS ={ this.state.searchAge }
   * 
   * HOWEVER, in HOK defaultAgeAS is Positive which should be negative.
   * VERIFY the value is correct in the PropPaneGroup.
   * It seems to not be sending the Key Value but the Index?
   * 
   * 
   */

const AgeSliderHook: React.FC<IAgeSliderHookProps> = ( props ) => {

  const { disabled, isVisibleAS, columnTitleAS, defaultAgeAS, onChange } = props.props; //onClosePanel

  const min = ( AgeSliderOptions.length -1 ) * -1;
  // const IconStyles: React.CSSProperties = { cursor: 'pointer', fontSize: 'x-large', marginLeft: '20px' };
  const AgeSlider: JSX.Element = isVisibleAS === false ? null : <Slider 
    disabled={ disabled === true ? true : false }
    label={ `${columnTitleAS} age (days ago)` }
    min={ min }
    max= { 0 }
    step={ 1 }
    defaultValue={ defaultAgeAS }
    valueFormat= { (value: number) => AgeSliderOptions[ value * -1 ].text }
    // onChanged={ (event: any, value: number, ) => this.setState({ searchAge: value }) }
    // onChanged={ (event: any, value: number, ) => this._searchForItems( this.state.searchText, this.state.searchMeta, this.state.searchMeta.length, 'age', value ) }
    onChange={ (value: number, ) => onChange( value ) }
    styles= {{ container: { width: '300px' }, valueLabel: { width: '100px' } }}
    originFromZero={ true }
  />;

  return ( AgeSlider );

}

export default AgeSliderHook;