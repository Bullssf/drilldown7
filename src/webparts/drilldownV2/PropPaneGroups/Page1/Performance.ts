import {
    //  IPropertyPanePage,
     IPropertyPaneGroup,
    //  PropertyPaneLabel,
    //  IPropertyPaneLabelProps,
    //  PropertyPaneHorizontalRule,
      PropertyPaneTextField, 
      // IPropertyPaneTextFieldProps,
    //   PropertyPaneLink, IPropertyPaneLinkProps,
    // PropertyPaneDropdown, IPropertyPaneDropdownProps,
    // IPropertyPaneDropdownOption,
    PropertyPaneToggle,
    IPropertyPaneField,
    //  IPropertyPaneConfiguration,
    //  PropertyPaneButton,
    //  PropertyPaneButtonType,
    //   PropertyPaneSlider, IPropertyPaneSliderProps,
    // PropertyPaneHorizontalRule,
    PropertyPaneSlider
} from '@microsoft/sp-property-pane';

// import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// import { JSON_Edit_Link } from './zReusablePropPane';

// import * as strings from 'DrilldownV2WebPartStrings';
import { IDrilldown7WebPartProps } from '../../IDrilldown7WebPartProps';
// import { JSON_Edit_Link, ValidLocalLanguages } from '../fpsReferences';

export function buildPerformanceGroup( wpProps: IDrilldown7WebPartProps ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];
  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneSlider('fetchCount', {
      label: 'Load this many items from PC',
      min: 100,
      max: 2000,
      step: 100,
      value: wpProps.fetchCount,
  }));

  groupFields.push(
    PropertyPaneSlider('fetchCountMobile', {
      label: 'Load this many items',
      min: 100,
      max: 3000,
      step: 100,
      value: wpProps.fetchCountMobile,
      disabled: true,
  }));

  groupFields.push(
    PropertyPaneTextField('restFilter', {
      label: 'Rest filter to load only specific items.',
      description: 'See Github Wiki for examples',
      multiline: true,
      value: wpProps.restFilter,
  }));

  groupFields.push(
    PropertyPaneToggle('updateRefinersOnTextSearch', {
      label: 'Update Refiners on text search',
      offText: 'No = Faster',
      onText: 'Yes = Slower',
  }));

  groupFields.push(
    PropertyPaneSlider('itemsPerPage', {
      label: 'Items per page',
      min: 5,
      max: 100,
      step: 5,
      value: wpProps.itemsPerPage,
      // disabled: true,
  }));

  groupFields.push(
    PropertyPaneToggle('getAllProps', {
      label: 'Get all item props',
      offText: 'No = Faster',
      onText: 'Yes = Slower',
  }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Performance Properties`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
