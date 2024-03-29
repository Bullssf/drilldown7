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

// import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// import { JSON_Edit_Link } from './zReusablePropPane';

// import * as strings from 'DrilldownV2WebPartStrings';
import { IDrilldownV2WebPartProps } from '../../IDrilldownV2WebPartProps';

export function buildTogglesGroup( wpProps: IDrilldownV2WebPartProps ) :IPropertyPaneGroup {

// let theListChoices : IPropertyPaneDropdownOption[] = [];
  var groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneToggle('togOtherListview', {
      label: 'Where to show items',
      offText: 'This webpart',
      onText: 'Other webpart',
    }));

  groupFields.push(
    PropertyPaneToggle('togRefinerCounts', { //togRefinerCounts, togCountChart, togStats, fetchCount, fetchCountMobile, restFilter
      label: 'Show Counts on Refiners',
      offText: 'No',
      onText: 'Yes',
    }));

  groupFields.push(
    PropertyPaneToggle('togCountChart', {
      label: 'Show Refiner count Charts',
      offText: 'No',
      onText: 'Yes',
    }));

  groupFields.push(
    PropertyPaneToggle('togOtherChartpart', {
      label: 'Where to show Summary Charts',
      offText: 'Default this webpart',
      onText: 'Always other webpart',
    }));

  groupFields.push(
    PropertyPaneToggle('togStats', {
      label: 'Show Statistics',
      offText: 'No',
      onText: 'Yes',
    }));

  const ExportThisGroup: IPropertyPaneGroup = {
    groupName: `Toggles`,
    isCollapsed: true,
    groupFields: groupFields
  };

  return ExportThisGroup;

}
