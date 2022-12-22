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

import * as strings from 'DrilldownV2WebPartStrings';
// import { IDrilldownV2WebPartProps } from '../IDrilldownV2WebPartProps';
import { ValidLocalLanguages } from '@mikezimm/fps-library-v2/lib/common/PropPaneHelp/atoms/ValidLanguages';  //JSON_Edit_Link, 

export function buildYourListGroup( ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(PropertyPaneTextField('parentListWeb', {
    label: strings.FieldLabel_ParentListWeb
  }));

  groupFields.push(PropertyPaneTextField('parentListTitle', {
    label: strings.FieldLabel_ParentListTitle
  }));

  groupFields.push(PropertyPaneToggle('isLibrary', {
    label: 'Is List or Library',
    offText: 'Is List',
    onText: 'Is Library',
    disabled: true, // Set to disabled because the prop pane on change now gets this value automatically
  }));

  groupFields.push(//https://docs.microsoft.com/en-us/previous-versions/windows/desktop/indexsrv/valid-locale-identifiers
    PropertyPaneTextField('language', {
      label: 'Langage list data and structure were created in',
      description: 'Will impact sorting.  example:  en-us or es-es',
    }));

  groupFields.push(
    ValidLocalLanguages  );

  groupFields.push(PropertyPaneToggle('hideFolders', {
    label: 'Hide Folders',
    offText: 'Show Folders',
    onText: 'Hide Folders',
  }));

  // groupFields.push(PropertyPaneToggle('hideFolders', {
  //   label: 'Hide Folders',
  //   offText: 'Show Folders',
  //   onText: 'Hide Folders',
  // }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Your list info`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
