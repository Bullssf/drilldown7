
export const changesAgeSlider: string[] = [ 'isVisibleAS', 'columnNameAS', 'columnTitleAS', 'defaultAgeAS', ];

export const FPSAgeSliderPresetEverywhere: IAgeSliderWPProps = {
  isVisibleAS: true,
  columnNameAS: 'Modified',
  columnTitleAS: 'Modified',
  defaultAgeAS: 4, //Should be index of AgeSliderOption
}

export interface IAgeSliderWPProps {
  isVisibleAS: boolean;
  columnNameAS: string;
  columnTitleAS: string;
  defaultAgeAS: number; //Should be index of AgeSliderOption
}

export interface IAgeSliderProps extends IAgeSliderWPProps {
  onChange: any; // returns the current value (value: number, ) => this._searchForItems( this.state.searchText, this.state.searchMeta, this.state.searchMeta.length, 'age', value )
  disabled?: boolean;
}

//NOTE:  THIS NEEDS TO MATCH IPropertyPaneDropdownOption
// import { IPropertyPaneDropdownOption, } from '@microsoft/sp-property-pane';

export interface IAgeSliderItem {
  key: string | number; // Used for prop pane group
  maxAge: number; // number of days to show from today
  text: string; // text: matching prop for PropPane Group.  value label to show on slider
}

export const AgeSliderOptions: IAgeSliderItem[] = [
  {  key: 0, maxAge: 1,  text: 'The past day', },
  {  key: 1, maxAge: 7,  text: 'The past week', },
  {  key: 2, maxAge: 31,  text: 'The past month', },
  {  key: 3, maxAge: 365,  text: 'The past year', },
  {  key: 4, maxAge: 365*100,  text: 'All ages', },
];
