
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

import { IAgeSliderWPProps, AgeSliderOptions } from './asTypes';

export function buildAgeSliderGroup( wpProps: IAgeSliderWPProps ) {

  // export interface IAgeSliderWPProps {
  //   isVisibleAS: boolean;
  //   columnNameAS: string;
  //   columnTitleAS: string;
  //   defaultAgeAS: number; //Should be index of AgeSliderOption
  // }

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(PropertyPaneToggle('isVisibleAS', {
    label: 'Enanble Age Slider filter',
    offText: 'Off',
    onText: 'On',
  }));

  groupFields.push(
    PropertyPaneDropdown('defaultAgeAS', <IPropertyPaneDropdownProps>{
      label: 'Default Age Filter',
      options: AgeSliderOptions,
      selectedKey: wpProps.defaultAgeAS,
    }));

  groupFields.push(
    PropertyPaneTextField('columnNameAS', {
        label: 'Date Column Internal Name',
        // description: 'Please click filters (above) to see items :)',
        disabled: wpProps.isVisibleAS === false ? true : false,
        // multiline: true,
    }));

  groupFields.push(
    PropertyPaneTextField('columnTitleAS', {
        label: 'Date Column Title - If different',
        // description: 'Please click filters (above) to see items :)',
        disabled: wpProps.isVisibleAS === false ? true : false,
        // multiline: true,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Age Slider Filter`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}