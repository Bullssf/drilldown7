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
    PropertyPaneSlider
} from '@microsoft/sp-property-pane';
// import * as strings from 'Drilldown7WebPartStrings';
// import { IDrilldown7WebPartProps } from '../IDrilldown7WebPartProps';
import { JSON_Edit_Link  } from '../../fpsReferences';  //ValidLocalLanguages, 



export function buildViewGroupFields ( title: string, view: 1 | 2 | 3, ) {
    var groupFields: IPropertyPaneField<any>[] = [];
    groupFields.push(
        PropertyPaneSlider(`viewWidth${view}`, {
            label: 'Min width for Wide view',
            min: 400,
            max: 1600,
            step: 100,
            value: 800,
            }));
    
      groupFields.push( JSON_Edit_Link );
    
      groupFields.push(
        PropertyPaneTextField(`viewJSON${view}`, {
            label: 'View settings',
            description: 'For changing webpart field titles',
            multiline: true,
            }));
    
        const ExportThisGroup: IPropertyPaneGroup = {
          groupName: `${title} size screens`,
          isCollapsed: true,
          groupFields: groupFields
        };
      
        return ExportThisGroup;
  }
