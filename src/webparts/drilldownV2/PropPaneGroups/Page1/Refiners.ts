import {
    //  IPropertyPanePage,
     IPropertyPaneGroup,
     PropertyPaneLabel,
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

import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';

// import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// import { JSON_Edit_Link } from './zReusablePropPane';

import * as strings from 'Drilldown7WebPartStrings';
import { IDrilldown7WebPartProps } from '../../IDrilldown7WebPartProps';

import { refinerRuleItems } from '../../fpsReferences';

export function buildRefinerGroup( wpProps: IDrilldown7WebPartProps ) {

// let theListChoices : IPropertyPaneDropdownOption[] = [];
  var groupFields: IPropertyPaneField<any>[] = [];

  let ruleChoices = refinerRuleItems();

  let showDisabled = false;
  
  if ( wpProps.rules2 && ( wpProps.rules2.indexOf('groupByDayOfWeek') > -1 ||  wpProps.rules2.indexOf('groupByMonthsMMM') > -1 ) ) { showDisabled = true;}


  groupFields.push(
    PropertyPaneLabel('Notice', {
      text: 'Enter STATIC Name of column, pick any advanced coversion rules.',
    })
  );

  groupFields.push(
    PropertyPaneLabel('Notice', {
      text: strings.FieldLabel_RulesFind,
    }));

  groupFields.push(
    PropertyPaneTextField('refiner0', {
      label: strings.FieldLabel_Refiner0,
    }));

  groupFields.push(
    PropertyFieldMultiSelect('rules0', {
      key: 'rules0',
      label: strings.FieldLabel_Rule0,
      options: ruleChoices,
      selectedKeys: wpProps.rules0,
    }));

  groupFields.push(
    PropertyPaneTextField('refiner1', {
      label: strings.FieldLabel_Refiner1
    }));

  groupFields.push(
    PropertyFieldMultiSelect('rules1', {
      key: 'rules1',
      label: strings.FieldLabel_Rule1,
      options: ruleChoices,
      selectedKeys: wpProps.rules1,

    }));

  groupFields.push(
    PropertyPaneTextField('refiner2', {
      label: strings.FieldLabel_Refiner2
    }));

  groupFields.push(
    PropertyFieldMultiSelect('rules2', {
      key: 'rules2',
      label: strings.FieldLabel_Rule2,
      options: ruleChoices,
      selectedKeys: wpProps.rules2,
    }));

  groupFields.push(
    PropertyPaneToggle('showDisabled', {
      label: 'Show disabled GroupBy',
      offText: '',
      onText: '',
      disabled: !showDisabled,
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Your Refiner info`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
