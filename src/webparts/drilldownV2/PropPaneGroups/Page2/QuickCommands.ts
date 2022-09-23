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
    // PropertyPaneToggle,
    IPropertyPaneField,
    //  IPropertyPaneConfiguration,
    //  PropertyPaneButton,
    //  PropertyPaneButtonType,
    //   PropertyPaneSlider, IPropertyPaneSliderProps,
    // PropertyPaneHorizontalRule,
    // PropertyPaneSlider
} from '@microsoft/sp-property-pane';

// import * as strings from 'DrilldownV2WebPartStrings';
// import { IDrilldown7WebPartProps } from '../IDrilldown7WebPartProps';
import { JSON_Edit_Link } from '../../fpsReferences';  //JSON_Edit_Link, ValidLocalLanguages

export function buildQuickCommandsGroup( ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    JSON_Edit_Link
  );

  groupFields.push(
    PropertyPaneTextField('quickCommands', {
      label: 'Quick Command buttons',
      description: 'Simple Button commands in Item pane',
      multiline: true,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Quick Commands`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
