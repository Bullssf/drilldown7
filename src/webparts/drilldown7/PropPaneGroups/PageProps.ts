// import {
//   //  IPropertyPanePage,
//   IPropertyPaneGroup,
//   //  PropertyPaneLabel,
//   //  IPropertyPaneLabelProps,
//   IPropertyPaneField,
//   PropertyPaneHorizontalRule,
//   PropertyPaneTextField, 
//   // IPropertyPaneTextFieldProps,
//   //   PropertyPaneLink, IPropertyPaneLinkProps,
//   PropertyPaneDropdown, 
//   // IPropertyPaneDropdownProps,
//   IPropertyPaneDropdownOption,PropertyPaneToggle,
//   //  IPropertyPaneConfiguration,
//   PropertyPaneButton,
//   PropertyPaneButtonType,
//   //   PropertyPaneSlider, IPropertyPaneSliderProps,
//   // PropertyPaneHorizontalRule,
//   // PropertyPaneSlider
// } from '@microsoft/sp-property-pane';

// // import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// // import { JSON_Edit_Link } from './zReusablePropPane';

// import * as strings from 'FpsPageInfoWebPartStrings';
// import { IFpsPageInfoWebPartProps } from '../IFpsPageInfoWebPartProps';

// import { Log } from '../components/AdvPageProps/utilities/Log';

// export function buildPagePropertiesGroup( wpProps: IFpsPageInfoWebPartProps, availableProperties: IPropertyPaneDropdownOption[], ) {

//   const group : IPropertyPaneGroup = {
//     groupName: strings.PropertiesGroupName,
//     isCollapsed: true,
//     groupFields: getPagePropFields( wpProps, availableProperties ),
//   }; //End this group;

//   return group;

// }

// function getPagePropFields( wpProps: IFpsPageInfoWebPartProps, availableProperties: IPropertyPaneDropdownOption[], ) {

  
//   //Copied from AdvancedPagePropertiesWebPart.ts
//   function onAddButtonClick (value: any) {
//     wpProps.selectedProperties.push(availableProperties[0].key.toString());
//   }

//   //Copied from AdvancedPagePropertiesWebPart.ts
//   function onDeleteButtonClick (value: any) {
//     Log.Write(value.toString());
//     var removed = wpProps.selectedProperties.splice(value, 1);
//     Log.Write(`${removed[0]} removed.`);
//   }

//   // Initialize with the Title entry
//   var groupFields: IPropertyPaneField<any>[] = [];
//   const disableCustomProps = wpProps.showCustomProps === false ? true : false;

//   groupFields.push(PropertyPaneToggle("showOOTBProps", {
//     label: "Show Created/Modified Props",
//     onText: "On",
//     offText: "Off",
//     // disabled: true,
//   }));

//   groupFields.push( PropertyPaneToggle("showCustomProps", {
//     label: "Show Custom Props",
//     onText: "On",
//     offText: "Off",
//     // disabled: true,
//   }));

//   groupFields.push(PropertyPaneToggle("showApprovalProps", {
//     label: "Show Approval Status Props",
//     onText: "On",
//     offText: "Off",
//     disabled: true, //Not sure what props will be for this.
//   }));

//   groupFields.push(PropertyPaneTextField('propsTitleField', {
//     label: strings.PropsTitleFieldLabel,
//     disabled: wpProps.showSomeProps === false ? true : false,
//   }));

//   groupFields.push(PropertyPaneToggle("propsExpanded", {
//     label: "Default state",
//     onText: "Expanded",
//     offText: "Collapsed",
//     // disabled: true,
//   }));

//   groupFields.push(PropertyPaneHorizontalRule());
//   // Determine how many page property dropdowns we currently have
//   wpProps.selectedProperties.forEach((prop, index) => {
//     groupFields.push(PropertyPaneDropdown(`selectedProperty${index.toString()}`,
//       {
//         label: strings.SelectedPropertiesFieldLabel,
//         options: availableProperties,
//         selectedKey: prop,
//         disabled: disableCustomProps,
//       }));
//     // Every drop down gets its own delete button
//     groupFields.push(PropertyPaneButton(`deleteButton${index.toString()}`,
//     {
//       text: strings.PropPaneDeleteButtonText,
//       buttonType: PropertyPaneButtonType.Command,
//       icon: "RecycleBin",
//       onClick: onDeleteButtonClick.bind(this, index)
//     }));
//     groupFields.push(PropertyPaneHorizontalRule());
//   });
//   // Always have the Add button
//   groupFields.push(PropertyPaneButton('addButton',
//   {
//     text: strings.PropPaneAddButtonText,
//     buttonType: PropertyPaneButtonType.Command,
//     icon: "CirclePlus",
//     onClick: onAddButtonClick.bind(this)
//   }));

//   return groupFields;
// }

