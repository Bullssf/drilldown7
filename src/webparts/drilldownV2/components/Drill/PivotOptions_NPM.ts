import { IPropertyPaneDropdownOption, } from "@microsoft/sp-property-pane";

import { PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IPivotFormatChoices, IPivotSizeChoices } from "./Types";

export class PivotOptionsGroup {

  public pivFormatChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
      {   index: 0,   key: 'links', text: 'Links'  },
      {   index: 1,   key: 'tabs', text: 'Tabs'  },
  ];
  public pivSizeChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
      {   index: 0,   key: 'normal', text: "Normal"  },
      {   index: 1,   key: 'large', text: "Large"  },
  ];
  public pivOptionsChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
      {   index: 0,   key: 'count', text: "Count"  },
      {   index: 1,   key: 'icon', text: "icon"  },
  ];

  public getPivFormat (findMe: IPivotFormatChoices) {
      if (findMe === 'tabs') {
          return PivotLinkFormat.tabs;
      } else {
          return PivotLinkFormat.links;
      }
  }

  public getPivSize (findMe: IPivotSizeChoices) {
      if (findMe === 'large') {
          return PivotLinkSize.large;
      } else {
          return PivotLinkSize.normal;
      }
  }

}

export let pivotOptionsGroup = new PivotOptionsGroup();