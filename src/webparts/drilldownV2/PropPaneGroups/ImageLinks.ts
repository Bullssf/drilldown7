// import {
//     //  IPropertyPanePage,
//      IPropertyPaneGroup,
//     //  PropertyPaneLabel,
//     //  IPropertyPaneLabelProps,
//     //  PropertyPaneHorizontalRule,
//       PropertyPaneTextField, 
//       // IPropertyPaneTextFieldProps,
//     //   PropertyPaneLink, IPropertyPaneLinkProps,
//     // PropertyPaneDropdown, IPropertyPaneDropdownProps,
//     // IPropertyPaneDropdownOption,
//     PropertyPaneToggle,
//     IPropertyPaneField,
//     //  IPropertyPaneConfiguration,
//     //  PropertyPaneButton,
//     //  PropertyPaneButtonType,
//     //   PropertyPaneSlider, IPropertyPaneSliderProps,
//     // PropertyPaneHorizontalRule,
//     // PropertyPaneSlider
// } from '@microsoft/sp-property-pane';

// // import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// // import { JSON_Edit_Link } from './zReusablePropPane';

// // import * as strings from 'FpsPageInfoWebPartStrings';
// import { IFpsPageInfoWebPartProps } from '../IFpsPageInfoWebPartProps';

// export function buildImageLinksGroup( wpProps: IFpsPageInfoWebPartProps ) {

//   var groupFields: IPropertyPaneField<any>[] = [];
//   const name = 'pageLinks';
//   groupFields.push(PropertyPaneToggle(`${name}showItems`, {
//     label: "Enable feature",
//     onText: "On",
//     offText: "Off",
//     // disabled: true,
//   }));

//   groupFields.push(PropertyPaneTextField(`${name}heading`, {
//     label: 'Heading - accordion',
//     disabled: wpProps[`${name}showItems`] === false ? true : false,
//   }));

//   groupFields.push(PropertyPaneToggle(`canvasImgs`, {
//     label: "Show Image Urls",
//     onText: "On",
//     offText: "Off",
//     disabled: wpProps[`${name}showItems`] === false ? true : false,
//   }));

//   groupFields.push(PropertyPaneToggle(`canvasLinks`, {
//     label: "Show Link urls",
//     onText: "On",
//     offText: "Off",
//     disabled: wpProps[`${name}showItems`] === false ? true : false,
//   }));

//   groupFields.push(PropertyPaneToggle(`${name}isExpanded`, {
//     label: "Expand by default",
//     onText: "On",
//     offText: "Off",
//     disabled: wpProps[`${name}showItems`] === false ? true : false,
//   }));

//   groupFields.push(PropertyPaneToggle(`linkSearchBox`, {
//     label: "Show Link and Image Search",
//     onText: "On",
//     offText: "Off",
//     disabled: wpProps[`${name}showItems`] === false ? true : false,
//   }));

//   groupFields.push(PropertyPaneTextField(`relatedStyle`, {
//     label: 'React.CSS Item Styles',
//     disabled: wpProps[`${name}showItems`] === false ? true : false,
//   }));

//   const ImageLinksGroup: IPropertyPaneGroup = {
//     groupName: `Images and Links`,
//     isCollapsed: true,
//     groupFields: groupFields
//   };

//   return ImageLinksGroup;

// }
