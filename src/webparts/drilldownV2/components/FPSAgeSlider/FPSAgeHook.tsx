
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';

import { Slider } from 'office-ui-fabric-react/lib/Slider';

import { IFPSAgeSliderProps, FPSAgeSliderOptions, FPSAgeSliderOptionsOOTB } from './FPSAgeTypes';

export interface IFPSAgeSliderHookProps {
  props: IFPSAgeSliderProps;
}

const FPSAgeSliderHook: React.FC<IFPSAgeSliderHookProps> = ( props ) => {

  const { disabled, FPSAgeIsVisible, FPSAgeColumnTitle, FPSAgeDefault, onChange } = props.props; //onClosePanel

  const isOOTBMeta: boolean = FPSAgeColumnTitle === 'Modified' || FPSAgeColumnTitle === 'Created' ? true : false;

  // min needs to be negative sign so that slider looks correct... slide left to show more
  const min = ( FPSAgeSliderOptions.length -1 )  * -1;
  // const IconStyles: React.CSSProperties = { cursor: 'pointer', fontSize: 'x-large', marginLeft: '20px' };
  const AgeSlider: JSX.Element = FPSAgeIsVisible === false ? null : <Slider 
    disabled={ disabled === true ? true : false }
    label={ `${FPSAgeColumnTitle} ${ isOOTBMeta !== true ? 'age (days ago)' : '' }` }
    min={ min }
    max= { 0 }
    step={ 1 }
    // NOTE:  defaultValue Must be negative due to props index is positive
    defaultValue={ FPSAgeDefault * -1 }
    valueFormat= { (value: number) => isOOTBMeta === true ? FPSAgeSliderOptionsOOTB[ Math.abs ( value )  ].text : FPSAgeSliderOptions[ Math.abs ( value ) ].text }
    // onChanged={ (event: any, value: number, ) => this.setState({ searchAge: value }) }
    // onChanged={ (event: any, value: number, ) => this._searchForItems( this.state.searchText, this.state.searchMeta, this.state.searchMeta.length, 'age', value ) }
    onChange={ (value: number, ) => onChange( value * -1 ) }
    styles= {{ container: { width: '300px' }, valueLabel: { width: '100px' } }}
    originFromZero={ true }
  />;

  return ( AgeSlider );

}

export default FPSAgeSliderHook;