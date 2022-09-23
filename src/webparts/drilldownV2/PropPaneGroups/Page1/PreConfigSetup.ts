import {
    //  IPropertyPanePage,
     IPropertyPaneGroup,
    //  PropertyPaneLabel,
    //  IPropertyPaneLabelProps,
    //  PropertyPaneHorizontalRule,
    //   PropertyPaneTextField, 
      // IPropertyPaneTextFieldProps,
    //   PropertyPaneLink, IPropertyPaneLinkProps,
    PropertyPaneDropdown, IPropertyPaneDropdownProps,
    IPropertyPaneDropdownOption,
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

// import * as strings from 'FpsPageInfoWebPartStrings';
import { IDrilldownV2WebPartProps } from '../../IDrilldownV2WebPartProps';

export function buildPreConfigGroup( wpProps: IDrilldownV2WebPartProps ) {

    let theListChoices : IPropertyPaneDropdownOption[] = [];

    theListChoices.push ( { key: 'na', text: 'na' } );

    theListChoices = theListChoices.concat(  wpProps.newMap.map( d => {
        return { key: d.Title, text: d.Title };
    }));

    var groupFields: IPropertyPaneField<any>[] = [];

    groupFields.push(PropertyPaneToggle('definitionToggle', {
        label: 'Lock list defintion - prevents accidently reseting props!',
        offText: 'Off',
        onText: 'On',
    }));

    groupFields.push(PropertyPaneDropdown('listDefinition', <IPropertyPaneDropdownProps>{
        label: 'Pre-defined setup choices',
        options: theListChoices,
        selectedKey: wpProps.listDefinition !== '' ? wpProps.listDefinition : 'na',
        disabled: wpProps.definitionToggle,
    }));

    const ExportThisGroup: IPropertyPaneGroup = {
        groupName: `Get pre-configured setup`,
        isCollapsed: true,
        groupFields: groupFields
    };

    return ExportThisGroup;

}
