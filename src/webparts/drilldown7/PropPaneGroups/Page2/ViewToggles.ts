import {
    //  IPropertyPanePage,
     IPropertyPaneGroup,
    //  PropertyPaneLabel,
    //  IPropertyPaneLabelProps,
    //  PropertyPaneHorizontalRule,
      // PropertyPaneTextField, 
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

// import * as strings from 'Drilldown7WebPartStrings';
// import { IDrilldown7WebPartProps } from '../IDrilldown7WebPartProps';
// import { JSON_Edit_Link  } from '../../fpsReferences';  //ValidLocalLanguages, 


export function buildViewTogglesGroup ( ) {

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneToggle('includeDetails', {
      label: 'Include details panel',
      offText: 'No',
      onText: 'Yes',
    }));
  
    groupFields.push(
      PropertyPaneToggle('includeAttach', {
        label: 'Include Attachments panel',
        offText: 'Never',
        onText: 'Auto detect',
      }));
  
    groupFields.push(
      PropertyPaneToggle('includeListLink', {
        label: 'Show link to List',
        offText: 'No',
        onText: 'Yes',
      }));
  

      const ExportThisGroup: IPropertyPaneGroup = {
        groupName: `List view Toggles`,
        isCollapsed: true,
        groupFields: groupFields
      };
    
      return ExportThisGroup;

}