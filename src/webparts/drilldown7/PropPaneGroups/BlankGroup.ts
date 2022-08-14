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
    // PropertyPaneSlider
} from '@microsoft/sp-property-pane';

import * as strings from 'Drilldown7WebPartStrings';
// import { IDrilldown7WebPartProps } from '../IDrilldown7WebPartProps';
import { ValidLocalLanguages } from '../fpsReferences';  //JSON_Edit_Link, 

export function buildBlankGroup( ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    
  );

  groupFields.push(
    
  );

  groupFields.push(
    
  );

  groupFields.push(
    
  );

  groupFields.push(
    
  );

  groupFields.push(
    
  );

  groupFields.push(
    
  );

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Your list info`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
