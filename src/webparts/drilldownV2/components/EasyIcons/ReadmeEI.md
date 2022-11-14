## How to add to a new web part

1. import latest npmFunctions or replacement library

2. import interface to Main Web Part file
    IEasyIconsWPProps
    ./EasyIcons/eiTypes.ts

3. import interface ( IEasyIcons ) into Main REACT Component Props,
    IEasyIcons
    ./EasyIcons/eiTypes.ts

4. add line to React Component props if needed
      EasyIconsObject: IEasyIcons;

5. import changeEasyIcons into BuildExportProps
    ./EasyIcons/eiTypes.ts

6. add logic to update when PropPane value changes - resets to default

    import { EasyIconDefaultKeys } from './EasyIcons/eiTypes';

    } else if ( propertyPath === 'easyIconKeys' && !newValue )  {
      //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/59
      this.properties.easyIconKeys = EasyIconDefaultKeys.join(';');

7. Add to PropPaneHelp