// import {
//     //  IPropertyPanePage,
//      IPropertyPaneGroup,
//     //  PropertyPaneLabel,
//     //  IPropertyPaneLabelProps,
//     //  PropertyPaneHorizontalRule,
//       PropertyPaneTextField, 
//       // IPropertyPaneTextFieldProps,
//     //   PropertyPaneLink, IPropertyPaneLinkProps,
//     //  PropertyPaneDropdown, IPropertyPaneDropdownProps,
//     //   IPropertyPaneDropdownOption,PropertyPaneToggle,
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

// export function buildPageInfoStylesGroup( wpProps: IFpsPageInfoWebPartProps, modifyBannerStyle: boolean ) {

//   const group : IPropertyPaneGroup = {
//     groupName: strings.PIStyleGroupName,
//     isCollapsed: true,
//     groupFields: [

//       PropertyPaneTextField('h1Style', {
//         label: 'Heading 1 Styles',
//         description: '; separated classNames or straight css like:  color: red',
//         disabled: modifyBannerStyle !== true || wpProps.showBanner !== true || wpProps.lockStyles === true ? true : false,
//         multiline: true,
//         }),

//       PropertyPaneTextField('h2Style', {
//         label: 'Heading 2 Styles',
//         description: '; separated classNames or straight css like:  color: red',
//         disabled: modifyBannerStyle !== true || wpProps.showBanner !== true || wpProps.lockStyles === true ? true : false,
//         multiline: true,
//         }),

//       PropertyPaneTextField('h3Style', {
//         label: 'Heading 3 Styles',
//         description: '; separated classNames or straight css like:  color: red',
//         disabled: modifyBannerStyle !== true || wpProps.showBanner !== true || wpProps.lockStyles === true ? true : false,
//         multiline: true,
//         }),

//       PropertyPaneTextField('pageInfoStyle', {
//           label: 'Page Info Style options',
//           description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
//           disabled: modifyBannerStyle !== true || wpProps.showBanner !== true || wpProps.lockStyles === true ? true : false,
//           multiline: true,
//           }),

//       PropertyPaneTextField('tocStyle', {
//           label: 'Table of Contents Style options',
//           description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
//           disabled: modifyBannerStyle !== true || wpProps.showBanner !== true || wpProps.lockStyles === true ? true : false,
//           multiline: true,
//           }),

//       PropertyPaneTextField('propsStyle', {
//           label: 'Properties Style options',
//           description: 'React.CSSProperties format like:  "fontSize":"larger","color":"red"',
//           disabled: modifyBannerStyle !== true || wpProps.showBanner !== true || wpProps.lockStyles === true ? true : false,
//           multiline: true,
//           }),
//     ]
//   }; //End this group;

//   return group;

// }
