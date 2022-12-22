import {
    //  IPropertyPanePage,
     IPropertyPaneGroup,
     PropertyPaneLabel,
    //  IPropertyPaneLabelProps,
    //  PropertyPaneHorizontalRule,
      // PropertyPaneTextField, 
      // IPropertyPaneTextFieldProps,
      PropertyPaneLink, 
    // IPropertyPaneLinkProps,
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

import { JSON_Edit_Link } from '../../fpsReferences';

export function buildCustomizeGroup( ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];

  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneLabel('About Text', {
      text: 'Customize your list view here'
    }));

  groupFields.push(
    PropertyPaneLabel('About Text', {
      text: 'Copy your view settings and use this site to modify them.  Then copy them back and paste into settings box.'
    }));

  groupFields.push(
    JSON_Edit_Link
  );

  groupFields.push(
    PropertyPaneLabel('About Text', {
      text: 'View settings need to be structured in IViewField[] array format documented here:'
    }));

  groupFields.push(
    PropertyPaneLink('JSON Link' , {
      text: 'See IViewField definition',
      href: 'https://pnp.github.io/sp-dev-fx-controls-react/controls/ListView/#implementation',
      target: '_blank',
      }));

  groupFields.push(
    ...[
      PropertyPaneLabel('Minimum properties', {text: '{' }),
      PropertyPaneLabel('Minimum properties', {text: '  name: <Static Name of Column>' }),
      PropertyPaneLabel('Minimum properties', {text: '  displayName: <Title of Column>' }),
      PropertyPaneLabel('Minimum properties', {text: '  minWidth: <min default width of column>' }),
      PropertyPaneLabel('Minimum properties', {text: '}' }),
    ]
  );

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `How to customize your views`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
