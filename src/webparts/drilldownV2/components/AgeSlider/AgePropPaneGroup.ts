
import {
  //  IPropertyPanePage,
   IPropertyPaneGroup,
  //  PropertyPaneLabel,
  //  IPropertyPaneLabelProps,
  //  PropertyPaneHorizontalRule,
    PropertyPaneTextField, 
    // IPropertyPaneTextFieldProps,
  //   PropertyPaneLink, IPropertyPaneLinkProps,
  PropertyPaneDropdown, IPropertyPaneDropdownProps,
  // IPropertyPaneDropdownOption,
  PropertyPaneToggle,
  IPropertyPaneField,
  //  IPropertyPaneConfiguration,
  //  PropertyPaneButton,
  //  PropertyPaneButtonType,
  //   PropertyPaneSlider, IPropertyPaneSliderProps,
  // PropertyPaneHorizontalRule,

} from '@microsoft/sp-property-pane';

import { IAgeSliderWPProps, AgeSliderOptions } from './ageTypes';

export function buildAgeSliderGroup( wpProps: IAgeSliderWPProps ) {

  // export interface IAgeSliderWPProps {
  //   AgeIsVisible: boolean;
  //   AgeColumnName: string;
  //   AgeColumnTitle: string;
  //   AgeDefault: number; //Should be index of AgeSliderOption
  // }

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(PropertyPaneToggle('AgeIsVisible', {
    label: 'Enanble Age Slider filter',
    offText: 'Off',
    onText: 'On',
  }));

  groupFields.push(
    PropertyPaneDropdown('AgeDefault', <IPropertyPaneDropdownProps>{
      label: 'Default Age Filter',
      options: AgeSliderOptions,
      selectedKey: wpProps.AgeDefault,
    }));

  groupFields.push(
    PropertyPaneTextField('AgeColumnName', {
        label: 'Date Column Internal Name',
        // description: 'Please click filters (above) to see items :)',
        disabled: wpProps.AgeIsVisible === false ? true : false,
        // multiline: true,
    }));

  groupFields.push(
    PropertyPaneTextField('AgeColumnTitle', {
        label: 'Date Column Title - If different',
        // description: 'Please click filters (above) to see items :)',
        disabled: wpProps.AgeIsVisible === false ? true : false,
        // multiline: true,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Age Slider Filter`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}