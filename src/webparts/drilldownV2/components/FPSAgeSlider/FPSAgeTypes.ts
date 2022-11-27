
export const changesAgeSlider: string[] = [ 'FPSAgeIsVisible', 'FPSAgeColumnName', 'FPSAgeColumnTitle', 'FPSAgeDefault', ];

export interface IFPSAgeSliderWPProps {
  FPSAgeIsVisible: boolean;
  FPSAgeColumnName: string;
  FPSAgeColumnTitle: string;
  FPSAgeDefault: number; //Should be index of AgeSliderOption
}

export interface IFPSAgeSliderProps extends IFPSAgeSliderWPProps {
  onChange: any; // returns the current value (value: number, ) => this._searchForItems( this.state.searchText, this.state.searchMeta, this.state.searchMeta.length, 'age', value )
  disabled?: boolean;
}

//NOTE:  THIS NEEDS TO MATCH IPropertyPaneDropdownOption
// import { IPropertyPaneDropdownOption, } from '@microsoft/sp-property-pane';

export interface IFPSAgeSliderItem {
  key: string | number; // Used for prop pane group
  maxAge: number; // number of days to show from today
  text: string; // text: matching prop for PropPane Group.  value label to show on slider
}

export const FPSAgeSliderOptions: IFPSAgeSliderItem[] = [
  {  key: 0, maxAge: 1,  text: 'The past day', },
  {  key: 1, maxAge: 7,  text: 'The past week', },
  {  key: 2, maxAge: 31,  text: 'The past month', },
  {  key: 3, maxAge: 92,  text: 'The past 3 months', },
  {  key: 4, maxAge: 365,  text: 'The past year', },
  {  key: 5, maxAge: 365*100,  text: 'All ages', },
];

// This is the array the hook uses for text IF the column is Modified or Created to better match SharePoint OOTB
export const FPSAgeSliderOptionsOOTB: IFPSAgeSliderItem[] = [
  {  key: 0, maxAge: 1,  text: 'in the last day', },
  {  key: 1, maxAge: 7,  text: 'in last 7 days', },
  {  key: 2, maxAge: 31,  text: 'in last 30 days', },
  {  key: 3, maxAge: 92,  text: 'in last 3 months', },
  {  key: 4, maxAge: 365,  text: 'in last year', },
  {  key: 5, maxAge: 365*100,  text: 'All ages', },
];

export const FPSAgeSliderPresetEverywhere: IFPSAgeSliderWPProps = {
  FPSAgeIsVisible: true,
  FPSAgeColumnName: 'Modified',
  FPSAgeColumnTitle: 'Modified',
  FPSAgeDefault: ( FPSAgeSliderOptions.length -1 ), //Should be index of AgeSliderOption
}