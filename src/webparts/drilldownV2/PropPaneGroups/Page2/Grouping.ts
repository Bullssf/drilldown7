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
// import { IDrilldownV2WebPartProps } from '../IDrilldownV2WebPartProps';
// import { ValidLocalLanguages } from '../../fpsReferences';  //JSON_Edit_Link, 

export function buildListGroupingGroup( ) :IPropertyPaneGroup {

// let theListChoices : IPropertyPaneDropdownOption[] = [];

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneTextField('groupByFields', {
      label: 'Group by Fields',
      description: 'Semi-colon separated Static Column names',
      }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `List Grouping`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
