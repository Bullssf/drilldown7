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

import { createAudienceGroup  } from '../../fpsReferences';

import { IDrilldown7WebPartProps } from '../../IDrilldown7WebPartProps';

export function buildViewTogglesGroup ( wpProps: IDrilldown7WebPartProps ) {

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

    groupFields.push( createAudienceGroup( 'listLinkAudience', 'Min audience to see List Link', 'Editor', wpProps.includeListLink ) );

    groupFields.push( 
      PropertyPaneToggle('createItemLink', { 
        label: 'Show + New item link',
        offText: 'No',
        onText: 'Yes',
      }));

    groupFields.push( createAudienceGroup( 'createItemAudience', 'Min audience to see Create Item', 'Editor', wpProps.createItemLink ) );

    const ExportThisGroup: IPropertyPaneGroup = {
      groupName: `List view Toggles`,
      isCollapsed: true,
      groupFields: groupFields
    };

    return ExportThisGroup;

}