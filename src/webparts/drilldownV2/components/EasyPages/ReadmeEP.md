## How to add to a new web part

1. import latest npmFunctions or replacement library

2. import interface to Main Web Part file
    IEasyPagesWPProps
    ./EasyPages/epTypes.ts

3. import interface ( IEasyPages ) into Main REACT Component Props,
    IEasyPages
    ./EasyPages/epTypes.ts

4. add line to React Component props if needed
    easyPagesProps: IEasyPagesProps;

5. import changeEasyPages into BuildExportProps
    ./EasyPages/epTypes.ts

6. add logic to update when PropPane value changes - resets to default

    import { DefaultEasyPagesTabs } from './EasyPages/epTypes.ts';
    import { DefaultOverflowTab } from './EasyPages/epTypes.ts';

    } else if ( propertyPath === 'easyPageTabs' && !newValue )  {
      //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
      this.properties.easyPageTabs = DefaultEasyPagesTabs.join(';');

    } else if ( propertyPath === 'EasyPageOverflowTab' && !newValue )  {
      this.properties.EasyPageOverflowTab = DefaultOverflowTab;

7. Add to PropPaneHelp