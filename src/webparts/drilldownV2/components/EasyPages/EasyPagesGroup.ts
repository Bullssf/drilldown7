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
  const { easyPageEnable, easyPageTabs, easyPageOverflowTab, easyPageParent, easyIconEnable, easyIconIgnore, easyIconKeys, 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      easyPagesAudience, easyPageAltNav, easyPageAltUrl, easyPageContainer, easyPageSeparateExtras, easyPageStyles } = wpProps;

  // export interface IEasyPagesWPProps {
  //   easyPageEnable: boolean;
  //   easyPageTabs: string;
  //   easyPageOverflowTab?: string;
  // }
  


// let theListChoices : IPropertyPaneDropdownOption[] = [];
  const groupFields: IPropertyPaneField<any>[] = [];

  groupFields.push(
    PropertyPaneToggle('easyPageEnable', {
      label: 'Enable EasyPages',
      offText: 'No',
      onText: 'Yes',
  }));

  // groupFields.push( createAudienceGroup( 'easyPagesAudience', 'Min audience to see EasyPages', 'Everyone', !easyPageEnable ) );
  groupFields.push( createAudienceGroup( 'easyPagesAudience', 'Min audience to see EasyPages', 'Everyone', true ) );

  groupFields.push(
    PropertyPaneTextField('easyPageTabs', {
      label: 'Easy Pages Tabs (Keywords)',
      description: 'Semi-colon separated keywords to group pages by',
      disabled: easyPageEnable === false ? true : false,
      value: easyPageTabs,
  }));

  groupFields.push(
    PropertyPaneTextField('easyPageOverflowTab', {
      label: 'Easy Pages Overflow Tab',
      description: 'Category to put pages into that do not fit into other categories',
      disabled: easyPageEnable === false ? true : false,
      value: easyPageOverflowTab,
  }));

  //   easyPageParent?: boolean; //Include parent site pages
  //   easyPageAltUrl?: string; //Include alternate site's site pages
  //   easyPageAltNav?: string; //Include navigation elements from other site
  //   easyPageStyles?: React.CSSProperties;  //Optional styles on entire page
  //   easyPageContainer?: React.CSSProperties;  //Optional styles on container element

  if ( hasParent === true ) {
    groupFields.push(
      PropertyPaneToggle('easyPageParent', {
        label: 'Include Parent site',
        offText: 'No',
        onText: 'Yes',
        // disabled: easyPageEnable === false ? true : false,
        disabled: true,
    }));
  }

  groupFields.push(
    PropertyPaneTextField('easyPageAltUrl', {
      label: 'Include Pages from this other site',
      description: '/sites/... Url (disabled if you are using parent site)',
      // disabled: easyPageEnable === false || easyPageParent === true || easyPageAltNav ? true : false,
      disabled: true,
      value: easyPageAltUrl,
  }));

  groupFields.push(
    PropertyPaneTextField('easyPageAltNav', {
      label: 'Include Navigation from this other site',
      description: '/sites/... Url (disabled if you are using parent site)',
      // disabled: easyPageEnable === false || easyPageParent === true || easyPageAltUrl ? true : false,
      disabled: true,
      value: easyPageAltNav,
  }));

  groupFields.push(
    PropertyPaneToggle('easyPageSeparateExtras', {
      label: 'Parent/other Site links',
      offText: 'Mixed into custom tabs',
      onText: 'Separate Tabs',
      // disabled: easyPageEnable === false || ( !easyPageParent && !easyPageAltNav && !easyPageAltUrl ) ? true : false,
      disabled: true,
  }));

  groupFields.push(
    PropertyPaneTextField('easyPageStyles', {
      label: 'Optional Easy Page styles on Entire Component',
      description: 'React.CSSProperties format.',
      multiline: true,
      disabled: easyPageEnable === false ? true : false,
      value: easyPageStyles,
  }));

  groupFields.push(
    PropertyPaneTextField('easyPageContainer', {
      label: 'Optional Easy Page styles on Container',
      description: 'React.CSSProperties format.',
      multiline: true,
      disabled: easyPageEnable === false ? true : false,
      value: easyPageContainer,
  }));

  // //To be added to npmFunctions
  // export interface IEasyIconsWPProps {
  //   easyIconEnable: boolean; // Used 
  //   easyIconKeys: string;
  //   easyIconIgnore: string;
  // }

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
