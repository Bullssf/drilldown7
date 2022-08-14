import {
    IPropertyPanePage,
    PropertyPaneLabel,
    IPropertyPaneLabelProps,
    PropertyPaneHorizontalRule,
    PropertyPaneTextField, IPropertyPaneTextFieldProps,
    PropertyPaneLink, IPropertyPaneLinkProps,PropertyPaneSlider,IPropertyPaneSliderProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption,PropertyPaneToggle,
    IPropertyPaneConfiguration,
    PropertyPaneButton,
    PropertyPaneButtonType,
  } from '@microsoft/sp-property-pane';
  
  
  import { JSON_Edit_Link } from './zReusablePropPane';

  import { IDrilldown7WebPartProps } from '../../webparts/drilldown7/IDrilldown7WebPartProps';

  import { buildKeyText, refinerRuleItems } from '../../webparts/drilldown7/fpsReferences';
  
  export class ViewsPage {
    public getPropertyPanePage(webPartProps: IDrilldown7WebPartProps ): IPropertyPanePage {
  
      let ruleChoices = refinerRuleItems();
      let showDisabled = false;
  
      if ( webPartProps.rules2 && ( webPartProps.rules2.indexOf('groupByDayOfWeek') > -1 ||  webPartProps.rules2.indexOf('groupByMonthsMMM') > -1 ) ) { showDisabled = true;}
  
      
    // whenToShowItems: 0 | 1 | 2 | 3;
    // refinerInstruction1: string;
    // refinerInstruction2: string;
    // refinerInstruction3: string;
    // const whenToShowChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
    //     {   index: 0,   key: 0, text: 'Always'  },
    //     {   index: 1,   key: 1, text: 'After 1 refiner selected'  },
    //     {   index: 2,   key: 2, text: 'After 2 refiners selected'  },
    //     {   index: 3,   key: 3, text: 'After 3 refiners selected'  },
    // ];

      return <IPropertyPanePage>
      { // <page1>
        header: {
          description: 'Set up list views'
        },
        displayGroupsAsAccordion: true,
        groups: [
          // { groupName: 'How to customize your views',
          //   isCollapsed: true ,
          //   groupFields: [
          //     PropertyPaneLabel('About Text', {
          //       text: 'Customize your list view here'
          //     }),
  
          //     PropertyPaneLabel('About Text', {
          //       text: 'Copy your view settings and use this site to modify them.  Then copy them back and paste into settings box.'
          //     }),
  
          //     JSON_Edit_Link,

          //     PropertyPaneLabel('About Text', {
          //       text: 'View settings need to be structured in IViewField[] array format documented here:'
          //     }),

          //     PropertyPaneLink('JSON Link' , {
          //       text: 'See IViewField definition',
          //       href: 'https://pnp.github.io/sp-dev-fx-controls-react/controls/ListView/#implementation',
          //       target: '_blank',
          //       }),


          //   PropertyPaneLabel('Minimum properties', {text: '{' }),
          //   PropertyPaneLabel('Minimum properties', {text: '  name: <Static Name of Column>' }),
          //   PropertyPaneLabel('Minimum properties', {text: '  displayName: <Title of Column>' }),
          //   PropertyPaneLabel('Minimum properties', {text: '  minWidth: <min default width of column>' }),
          //   PropertyPaneLabel('Minimum properties', {text: '}' }),

          //   ]
          // },
         
          // { groupName: 'Refiner Instructions',
          // isCollapsed: true ,
          // groupFields: [

          //   PropertyPaneDropdown('whenToShowItems', <IPropertyPaneDropdownProps>{
          //     label: 'When to show items',
          //     options: whenToShowChoices,
          //     selectedKey: webPartProps.whenToShowItems,
          //   }),

          //   PropertyPaneSlider('minItemsForHide', {
          //     label: 'Require drill down if number of items exceeds',
          //       min: 0,
          //       max: 100,
          //       step: 10,
          //       // value: 100,
          //   }),

          //   PropertyPaneTextField('instructionIntro', {
          //     label: 'Instructions heading',
          //     description: 'Please click filters (above) to see items :)',
          //     disabled: webPartProps.whenToShowItems < 1 ? true : false,
          //     // multiline: true,
          //   }),

          //   PropertyPaneTextField('refinerInstruction1', {
          //     label: 'Instructions to pick first refiner',
          //     description: 'Example:  select a {{refiner0}}',
          //     disabled: webPartProps.whenToShowItems < 1 ? true : false,
          //     // multiline: true,
          //   }),
            
          //   PropertyPaneTextField('refinerInstruction2', {
          //     label: 'Instructions to pick second refiner',
          //     description: 'Example:  select a {{refiner1}}',
          //     disabled: webPartProps.whenToShowItems < 2 ? true : false,
          //     // multiline: true,
          //   }),
            
          //   PropertyPaneTextField('refinerInstruction3', {
          //     label: 'Instructions to pick third refiner',
          //     description: 'Example:  select a {{refiner2}}',
          //     disabled: webPartProps.whenToShowItems < 3 ? true : false,
          //     // multiline: true,
          //   }),

        //   ]
        // },

//groupByFields
          // // 2 - Source and destination list information
          // {  groupName: 'List Grouping',
          //     isCollapsed: true ,
          //     groupFields: [
          //       PropertyPaneTextField('groupByFields', {
          //           label: 'Group by Fields',
          //           description: 'Semi-colon separated Static Column names',
          //           }),
  
          //   ]}, // this group

          // 2 - Source and destination list information
          // {  groupName: 'Full Size list',
          //     isCollapsed: true ,
          //     groupFields: [
  
          //       PropertyPaneSlider('viewWidth1', {
          //           label: 'Min width for Wide view',
          //           min: 400,
          //           max: 1600,
          //           step: 100,
          //           value: 1200,
          //           }),

          //       JSON_Edit_Link,

          //       PropertyPaneTextField('viewJSON1', {
          //           label: 'View settings',
          //           description: 'For changing webpart field titles',
          //           multiline: true,
          //           }),
  
          //   ]}, // this group
 
          // // 2 - Source and destination list information
          // {  groupName: 'Medium Size list',
          //     isCollapsed: true ,
          //     groupFields: [
  
          //       PropertyPaneSlider('viewWidth2', {
          //           label: 'Min width for Wide view',
          //           min: 400,
          //           max: 1600,
          //           step: 100,
          //           value: 800,
          //           }),

          //       JSON_Edit_Link,

          //       PropertyPaneTextField('viewJSON2', {
          //           label: 'View settings',
          //           description: 'For changing webpart field titles',
          //           multiline: true,
          //           }),
  
          //   ]}, // this group
            
          // // 2 - Source and destination list information
          // {  groupName: 'Small Size list',
          //     isCollapsed: true ,
          //     groupFields: [
  
          //       PropertyPaneSlider('viewWidth3', {
          //           label: 'Min width for Wide view',
          //           min: 400,
          //           max: 1600,
          //           step: 100,
          //           value: 400,
          //           }),

          //       JSON_Edit_Link,


          //       PropertyPaneTextField('viewJSON3', {
          //           label: 'View settings',
          //           description: 'For changing webpart field titles',
          //           multiline: true,
          //         }),
  
          //   ]}, // this group

          // 2 - Source and destination list information
          // {  groupName: 'List view Toggles',
          //     isCollapsed: true ,
          //     groupFields: [
          //       PropertyPaneToggle('includeDetails', {
          //           label: 'Include details panel',
          //           offText: 'No',
          //           onText: 'Yes',
          //         }),
          //       PropertyPaneToggle('includeAttach', {
          //         label: 'Include Attachments panel',
          //         offText: 'Never',
          //         onText: 'Auto detect',
          //       }),
          //       PropertyPaneToggle('includeListLink', {
          //         label: 'Show link to List',
          //         offText: 'No',
          //         onText: 'Yes',
          //       }),
                
  
          //   ]}, // this group

          // 2 - Source and destination list information
          {  groupName: 'Summary Stats',
              isCollapsed: true ,
              groupFields: [

                JSON_Edit_Link,

                PropertyPaneTextField('stats', {
                    label: 'Summary Stats',
                    description: 'Simple chart data',
                    multiline: true,
                    }),
  
            ]}, // this group

          // 2 - Source and destination list information
          {  groupName: 'Quick Commands',
              isCollapsed: true ,
              groupFields: [

                JSON_Edit_Link,

                PropertyPaneTextField('quickCommands', {
                    label: 'Quick Command buttons',
                    description: 'Simple Button commands in Item pane',
                    multiline: true,
                  }),
  
            ]}, // this group
            

          ]}; // Groups

    } // getPropertyPanePage()
  }
  
  export let viewsPage = new ViewsPage();