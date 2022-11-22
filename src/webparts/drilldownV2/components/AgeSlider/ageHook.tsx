
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';

import { Slider } from 'office-ui-fabric-react/lib/Slider';

import { IAgeSliderProps, AgeSliderOptions, AgeSliderOptionsOOTB } from './ageTypes';

export interface IAgeSliderHookProps {
  props: IAgeSliderProps;
}

const AgeSliderHook: React.FC<IAgeSliderHookProps> = ( props ) => {

  const { disabled, AgeIsVisible, AgeColumnTitle, AgeDefault, onChange } = props.props; //onClosePanel

  const isOOTBMeta: boolean = AgeColumnTitle === 'Modified' || AgeColumnTitle === 'Created' ? true : false;

  // min needs to be negative sign so that slider looks correct... slide left to show more
  const min = ( AgeSliderOptions.length -1 )  * -1;
  // const IconStyles: React.CSSProperties = { cursor: 'pointer', fontSize: 'x-large', marginLeft: '20px' };
  const AgeSlider: JSX.Element = AgeIsVisible === false ? null : <Slider 
    disabled={ disabled === true ? true : false }
    label={ `${AgeColumnTitle} ${ isOOTBMeta !== true ? 'age (days ago)' : '' }` }
    min={ min }
    max= { 0 }
    step={ 1 }
    // NOTE:  defaultValue Must be negative due to props index is positive
    defaultValue={ AgeDefault * -1 }
    valueFormat= { (value: number) => isOOTBMeta === true ? AgeSliderOptionsOOTB[ Math.abs ( value )  ].text : AgeSliderOptions[ Math.abs ( value ) ].text }
    // onChanged={ (event: any, value: number, ) => this.setState({ searchAge: value }) }
    // onChanged={ (event: any, value: number, ) => this._searchForItems( this.state.searchText, this.state.searchMeta, this.state.searchMeta.length, 'age', value ) }
    onChange={ (value: number, ) => onChange( value * -1 ) }
    styles= {{ container: { width: '300px' }, valueLabel: { width: '100px' } }}
    originFromZero={ true }
  />;

  return ( AgeSlider );

}

export default AgeSliderHook;