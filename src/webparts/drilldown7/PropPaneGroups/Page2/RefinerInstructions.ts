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
    IPropertyPaneDropdownOption,
    // PropertyPaneToggle,
    IPropertyPaneField,
    //  IPropertyPaneConfiguration,
    //  PropertyPaneButton,
    //  PropertyPaneButtonType,
    //   PropertyPaneSlider, IPropertyPaneSliderProps,
    // PropertyPaneHorizontalRule,
    PropertyPaneSlider
} from '@microsoft/sp-property-pane';

// import * as strings from 'Drilldown7WebPartStrings';
import { IDrilldown7WebPartProps } from '../../IDrilldown7WebPartProps';
// import { ValidLocalLanguages } from '../../fpsReferences';  //JSON_Edit_Link, 

export function buildRefinerInstructionsGroup( wpProps: IDrilldown7WebPartProps ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];

const whenToShowChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
  {   index: 0,   key: 0, text: 'Always'  },
  {   index: 1,   key: 1, text: 'After 1 refiner selected'  },
  {   index: 2,   key: 2, text: 'After 2 refiners selected'  },
  {   index: 3,   key: 3, text: 'After 3 refiners selected'  },
];

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneDropdown('whenToShowItems', <IPropertyPaneDropdownProps>{
      label: 'When to show items',
      options: whenToShowChoices,
      selectedKey: wpProps.whenToShowItems,
    }));

  groupFields.push(
    PropertyPaneSlider('minItemsForHide', {
      label: 'Require drill down if number of items exceeds',
        min: 0,
        max: 100,
        step: 10,
        // value: 100,
    }));

  groupFields.push(
    PropertyPaneTextField('instructionIntro', {
      label: 'Instructions heading',
      description: 'Please click filters (above) to see items :)',
      disabled: wpProps.whenToShowItems < 1 ? true : false,
      // multiline: true,
    }));

  groupFields.push(
    PropertyPaneTextField('refinerInstruction1', {
      label: 'Instructions to pick first refiner',
      description: 'Example:  select a {{refiner0}}',
      disabled: wpProps.whenToShowItems < 1 ? true : false,
      // multiline: true,
    }));

  groupFields.push(
    PropertyPaneTextField('refinerInstruction2', {
      label: 'Instructions to pick second refiner',
      description: 'Example:  select a {{refiner1}}',
      disabled: wpProps.whenToShowItems < 2 ? true : false,
      // multiline: true,
    }));

  groupFields.push(
    PropertyPaneTextField('refinerInstruction3', {
      label: 'Instructions to pick third refiner',
      description: 'Example:  select a {{refiner2}}',
      disabled: wpProps.whenToShowItems < 3 ? true : false,
      // multiline: true,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Refiner Instructions`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
