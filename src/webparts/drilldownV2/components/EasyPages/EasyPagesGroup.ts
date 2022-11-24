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
import { createAudienceGroup } from '../../fpsReferences';

// import { getHelpfullErrorV2 } from '../Logging/ErrorHandler';
// import { JSON_Edit_Link } from './zReusablePropPane';

// import * as strings from 'DrilldownV2WebPartStrings';
import { IDrilldownV2WebPartProps } from '../../IDrilldownV2WebPartProps';
// import { JSON_Edit_Link, ValidLocalLanguages } from '../fpsReferences';

export function buildEasyPagesGroup( wpProps: IDrilldownV2WebPartProps, hasParent: boolean ) : IPropertyPaneGroup {

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { EasyPagesEnable, EasyPageTabsC, EasyPageTabsP, EasyPageTabsA, EasyPageTabsB, EasyPageOverflowTab, EasyPageParent, easyIconEnable, easyIconIgnore, easyIconKeys, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    EasyPagesAudience, EasyPagesSiteTitleA, EasyPageUrlA, EasyPagesSiteTitleB, EasyPageUrlB, EasyPageContainerStyles, EasyPageStyles } = wpProps;

// export interface IEasyPagesWPProps {
//   EasyPagesEnable: boolean;
//   easyPageTabs: string;
//   EasyPageOverflowTab?: string;
// }



// let theListChoices : IPropertyPaneDropdownOption[] = [];
const groupFields: IPropertyPaneField<any>[] = [];

groupFields.push(
  PropertyPaneToggle('EasyPagesEnable', {
    label: 'Enable EasyPages',
    offText: 'No',
    onText: 'Yes',
}));

// groupFields.push( createAudienceGroup( 'EasyPagesAudience', 'Min audience to see EasyPages', 'Everyone', !EasyPagesEnable ) );
groupFields.push( createAudienceGroup( 'EasyPagesAudience', 'Min audience to see EasyPages', 'Everyone', true ) );

groupFields.push(
  PropertyPaneTextField('EasyPageOverflowTab', {
    label: 'Easy Pages Overflow Tab',
    description: 'Category to put pages into that do not fit into other categories',
    disabled: EasyPagesEnable === false ? true : false,
    value: EasyPageOverflowTab,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageTabsC', {
    label: 'Current Site: Tabs (Keywords)',
    description: 'Semi-colon separated keywords to group pages by',
    disabled: EasyPagesEnable === false ? true : false,
    value: EasyPageTabsC,
}));


//   EasyPageParent?: boolean; //Include parent site pages
//   EasyPageUrlA?: string; //Include alternate site's site pages
//   easyPageAltNav?: string; //Include navigation elements from other site
//   EasyPageStyles?: React.CSSProperties;  //Optional styles on entire page
//   EasyPageContainerStyles?: React.CSSProperties;  //Optional styles on container element

if ( hasParent === true ) {
  groupFields.push(
    PropertyPaneToggle('EasyPageParent', {
      label: 'Include Parent site',
      offText: 'No',
      onText: 'Yes',
      disabled: EasyPagesEnable === false ? true : false,
      // disabled: true,
  }));
}

groupFields.push(
  PropertyPaneTextField('EasyPageTabsP', {
    label: 'Parent Site: Tabs (Keywords)',
    description: 'Semi-colon separated keywords to group pages by',
    disabled: EasyPagesEnable === false || hasParent === false || EasyPageParent === false ? true : false,
    value: EasyPageTabsP,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageUrlA', {
    label: 'Include Pages from this other site A',
    description: '/sites/... Url (disabled if you are using parent site)',
    disabled: EasyPagesEnable === false ? true : false,
    // disabled: true,
    value: EasyPageUrlA,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageTabsA', {
    label: 'Alt Site: Tabs (Keywords)',
    description: 'Semi-colon separated keywords to group pages by',
    disabled: EasyPagesEnable === false || !EasyPageUrlA ? true : false,
    value: EasyPageTabsA,
}));

groupFields.push(
  PropertyPaneTextField('EasyPagesSiteTitleA', {
    label: 'Alt Site: Title',
    description: 'Button text for this site',
    disabled: EasyPagesEnable === false || !EasyPageUrlA ? true : false,
    value: EasyPagesSiteTitleA,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageUrlB', {
    label: 'Include Pages from this other site B',
    description: '/sites/... Url (disabled if you are using parent site)',
    disabled: EasyPagesEnable === false ? true : false,
    // disabled: true,
    value: EasyPageUrlB,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageTabsB', {
    label: 'B Site: Tabs (Keywords)',
    description: 'Semi-colon separated keywords to group pages by',
    disabled: EasyPagesEnable === false || !EasyPageUrlB ? true : false,
    value: EasyPageTabsB,
}));

groupFields.push(
  PropertyPaneTextField('EasyPagesSiteTitleB', {
    label: 'B Site: Title',
    description: 'Button text for this site',
    disabled: EasyPagesEnable === false || !EasyPageUrlB ? true : false,
    value: EasyPagesSiteTitleB,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageStyles', {
    label: 'Optional Easy Page styles on Entire Component',
    description: 'React.CSSProperties format.',
    multiline: true,
    disabled: EasyPagesEnable === false ? true : false,
    value: EasyPageStyles,
}));

groupFields.push(
  PropertyPaneTextField('EasyPageContainerStyles', {
    label: 'Optional Easy Page styles on Container',
    description: 'React.CSSProperties format.',
    multiline: true,
    disabled: EasyPagesEnable === false ? true : false,
    value: EasyPageContainerStyles,
}));

groupFields.push(
  PropertyPaneToggle('easyIconEnable', {
    label: 'Enable EasyIcons',
    offText: 'No',
    onText: 'Yes',
}));

groupFields.push(
  PropertyPaneTextField('easyIconKeys', {
    label: 'Easy Icon keys',
    description: 'See Github Wiki for examples',
    multiline: true,
    disabled: easyIconEnable === false ? true : false,
    value: easyIconKeys,
}));

groupFields.push(
  PropertyPaneTextField('easyIconIgnore', {
    label: 'Easy Icons to Ignore',
    description: 'See Github Wiki for examples',
    multiline: true,
    disabled: easyIconEnable === false ? true : false,
    value: easyIconIgnore,
}));


const ExportThisGroup: IPropertyPaneGroup = {
  groupName: `EasyPages and EasyIcons`,
  isCollapsed: true,
  groupFields: groupFields
};

return ExportThisGroup;

}
