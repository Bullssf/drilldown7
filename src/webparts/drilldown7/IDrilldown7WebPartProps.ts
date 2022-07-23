
import { PageContext } from '@microsoft/sp-page-context';
import { IMyProgress,  ICSSChartDD } from './components/IReUsableInterfaces';
import { IDrillDownProps, IWhenToShowItems } from './components/Drill/drillComponent';
import { ICssChartProps } from '../cssChart/components/ICssChartProps';
import { IExpandAudiences } from "@mikezimm/npmfunctions/dist/Services/PropPane/FPSOptionsExpando";
import { ISupportedHost } from "@mikezimm/npmfunctions/dist/Services/PropPane/FPSInterfaces";

import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import { IWebpartHistory, IWebpartHistoryItem2, } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistoryInterface';


import { exportIgnorePropsFPS, importBlockPropsFPS } from '@mikezimm/npmfunctions/dist/WebPartInterfaces/ImportProps';
import { IMinWPBannerProps } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerSetup";

  //Specific for this web part
  export const exportIgnorePropsThis = [ ];

  export const exportIgnoreProps = [ ...exportIgnorePropsFPS, ...exportIgnorePropsThis  ];

  //These props will not be imported even if they are in one of the change arrays above (fail-safe)
  //This was done so user could not manually insert specific props to over-right fail-safes built in to the webpart

  //Specific for this web part
  export const importBlockPropsThis = [ 'showSomeProps' ];

  export const importBlockProps = [ ...importBlockPropsFPS, ...importBlockPropsThis ];

  //This will be in npmFunctions > Services/PropPane/FPSOptionsExpando in next release.
  //  export type IExpandAudiences = 'Site Admins' | 'Site Owners' | 'Page Editors' | 'WWWone';


  export const changeRelated1 = [ 'related1heading', 'related1showItems' , 'related1isExpanded' , 'related1web' , 'related1listTitle', 'related1restFilter', 'related1linkProp', 'related1displayProp', 'relatedStyle' ];

  export const changeWebPartStyles = [ 'h1Style', 'h2Style' ,'h3Style' , 'pageInfoStyle', 'tocStyle', 'propsStyle' ];

export interface IDrilldown7WebPartProps extends IMinWPBannerProps {

    description: string;
  
    // 0 - Context
    pageContext: PageContext;
  
    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb?: string;
    analyticsList?: string;
    stressMultiplier?: number;
  
    // 2 - Source and destination list information
    createVerifyLists: boolean;
    parentListTitle: string;
    parentListWeb: string;
    parentListURL?: string;
    hideFolders: boolean;
    language: string; //local language list data is saved in (needed to properly sort refiners)
  
    refiner0: string;
    refiner1: string;
    refiner2: string;
  
    rules0def: string;
    rules1def: string;
    rules2def: string;
  
    rules0: string[];
    rules1: string[];
    rules2: string[];
  
    togRefinerCounts: boolean;
    togCountChart: boolean;
    togStats: boolean;
    togOtherListview:  boolean;
    togOtherChartpart:  boolean;
    includeListLink: boolean;
    fetchCount: number;
    fetchCountMobile: number;
    restFilter: string;
  
    showCatCounts: boolean;
    showSummary: boolean;
  
    stats: string;
  
    newMap?: any[];
  
    showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data
    updateRefinersOnTextSearch?: boolean;
  
    parentListFieldTitles: string;
  
    onlyActiveParents: boolean;
  
    quickCommands?: string;
  
    // 3 - General how accurate do you want this to be
  
    // 4 - Info Options
  
    // 5 - UI Defaults
  
    viewWidth1: number;
    viewWidth2: number;
    viewWidth3: number;
  
    viewJSON1: string;
    viewJSON2: string;
    viewJSON3: string;
  
    includeDetails: boolean;
    includeAttach: boolean;
  
    groupByFields: string;
  
    // 6 - User Feedback:
    progress: IMyProgress;
  
    whenToShowItems: IWhenToShowItems;
    minItemsForHide: number;
    instructionIntro: string;
    refinerInstruction1: string;
    refinerInstruction2: string;
    refinerInstruction3: string;
  
  
    // 7 - TBD
  
    // 9 - Other web part options
    webPartScenario: string; //DEV, TEAM, CORP
    definitionToggle: boolean;
    listDefinition: any; //Picked list defintion :  Title
  
    advancedPivotStyles: boolean;
    pivotSize: string;
    pivotFormat: string;
    pivotOptions: string;
    pivotTab: string;
  
    /**
     * DD Provider: Step 0 - add this.properties.switches to WebPartProps
     */
    cssChartProps?: ICssChartProps;
    listProps?: any;

   
  }