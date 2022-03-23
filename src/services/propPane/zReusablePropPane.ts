

import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption,PropertyPaneToggle,
    IPropertyPaneConfiguration,
    PropertyPaneButton,
    PropertyPaneButtonType,
    PropertyPaneSlider,
  } from '@microsoft/sp-property-pane';

  export const JSON_Edit_Link = PropertyPaneLink('JSON Link' , {
        text: 'Use this site to more easily work on JSON',
        href: 'https://codebeautify.org/jsonviewer',
        target: '_blank',
    });

    
  export const ValidLocalLanguages = PropertyPaneLink('languagesLink' , {
      text: 'See list of valid languages',
      href: 'https://docs.microsoft.com/en-us/previous-versions/windows/desktop/indexsrv/valid-locale-identifiers',
      target: '_blank',
  });