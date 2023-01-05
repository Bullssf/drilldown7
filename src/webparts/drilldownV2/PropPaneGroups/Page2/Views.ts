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
// import * as strings from 'DrilldownV2WebPartStrings';
// import { IDrilldownV2WebPartProps } from '../IDrilldownV2WebPartProps';
import { JSON_Edit_Link  } from '../../fpsReferences';  //ValidLocalLanguages, 



export function buildViewGroupFields ( title: string, view: 1 | 2 | 3, showSyncViews: boolean, disabled: boolean = false ) :IPropertyPaneGroup {
    var groupFields: IPropertyPaneField<any>[] = [];
    groupFields.push(
        PropertyPaneSlider(`viewWidth${view}`, {
            label: 'Min width for Wide view',
            min: 400,
            max: 1600,
            step: 100,
            value: 800,
            disabled: disabled,
            }));
    
      groupFields.push( JSON_Edit_Link );

      if ( showSyncViews === true ) {
        groupFields.push(
          PropertyPaneToggle('syncViews', {
            label: 'Sync other views to this one?',
            offText: 'No',
            onText: 'Yes',
          }));
      }

      groupFields.push(
        PropertyPaneTextField(`viewJSON${view}`, {
            label: 'View settings',
            description: 'For changing webpart field titles',
            multiline: true,
            disabled: disabled,
            }));
    
      groupFields.push(
        PropertyPaneTextField('richHeight', {
          label: 'RichText max-hights',
          description: 'Semi-colon separated row Heights in em',
        }));

      groupFields.push(
        PropertyPaneTextField('autoRichHeight', {
          label: 'Auto-Expand Rich text Height',
          description: 'maxQty;maxHeight (in em)',
        }));

        const ExportThisGroup: IPropertyPaneGroup = {
          groupName: `${title} size screens`,
          isCollapsed: true,
          groupFields: groupFields
        };
      
        return ExportThisGroup;
  }
