// import {
//     //  IPropertyPanePage,
//      IPropertyPaneGroup,
//     //  PropertyPaneLabel,
//     //  IPropertyPaneLabelProps,
//     //  PropertyPaneHorizontalRule,
//       PropertyPaneTextField, 
//       // IPropertyPaneTextFieldProps,
//     //   PropertyPaneLink, IPropertyPaneLinkProps,
//      PropertyPaneDropdown, IPropertyPaneDropdownProps,
//       // IPropertyPaneDropdownOption,
//       PropertyPaneToggle,
//     //  IPropertyPaneConfiguration,
//     //  PropertyPaneButton,
//     //  PropertyPaneButtonType,
//     //   PropertyPaneSlider, IPropertyPaneSliderProps,
//     // PropertyPaneHorizontalRule,
//     // PropertyPaneSlider
// } from '@microsoft/sp-property-pane';

// // import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// // import { JSON_Edit_Link } from './zReusablePropPane';

// import * as strings from 'FpsPageInfoWebPartStrings';
// import { IFpsPageInfoWebPartProps } from '../IFpsPageInfoWebPartProps';


// //export type IMinHeading = 'h3' | 'h2' | 'h1' ;
// export const MinHeadingOptions = [
//   { index: 0, key: 'h3', text: "h3" },
//   { index: 1, key: 'h2', text: "h2" },
//   { index: 2, key: 'h1', text: "h1" },
// ];

// export function buildTOCGroup( wpProps: IFpsPageInfoWebPartProps ) {

//   const group : IPropertyPaneGroup = {
//     groupName: strings.TOCGroupName,
//     isCollapsed: true,
//     groupFields: [
//       //showTOC
//       PropertyPaneToggle("showTOC", {
//         label: "Show Table of Contents",
//         onText: "On",
//         offText: "Off",
//         // disabled: true,
//       }),
//       PropertyPaneTextField('TOCTitleField', {
//         label: strings.DescriptionFieldLabel,
//         disabled: wpProps.showTOC === false ? true : false,
//       }),

//       PropertyPaneToggle("tocExpanded", {
//         label: "Default state",
//         onText: "Expanded",
//         offText: "Collapsed",
//         // disabled: true,
//       }),

//       PropertyPaneDropdown('minHeadingToShow', <IPropertyPaneDropdownProps>{
//         label: 'Min heading to show - refresh required',
//         options: MinHeadingOptions, //MinHeadingOptions
//         disabled: wpProps.showTOC === false ? true : false,

//       }),
//     ]
//   }; //End this group;

//   return group;

// }
