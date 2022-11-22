
import { PageContext } from '@microsoft/sp-page-context';
import { IMyProgress } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IWhenToShowItems } from './components/Drill/IDrillProps';
import { ICssChartProps } from './components/CssCharts/ICssChartProps';

/***
 * NOTE:  All imports in here Must be imported directly from npmFunctions, not the fpsPreferences
 * Or else it will get into an endless loop because these values are imported into fpsPreferences
 * 
 */
 import { exportIgnorePropsFPS, } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';
 import { importBlockPropsFPS } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';
 import { IItemEditorAudience , IEveryoneAudience } from '@mikezimm/npmfunctions/dist/Services/PropPane/Audiences';

 import { IMinBannerUIProps, IMinPinMeProps, IMinPandoramicProps, IMinBannerThemeProps, IMinCustomHelpProps, 
   IMinPageStyleProps, IMinBannerUtilityProps, IMinFPSLegacyProps } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface";
// import { IWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';


import { IEasyIconsWPProps } from './components/EasyIcons/eiTypes';
import { IEasyPagesWPProps } from './components/EasyPages/epTypes';
import { IAgeSliderWPProps } from './components/AgeSlider/ageTypes';


//Specific for this web part
export const exportIgnorePropsThis : string[] = [ ];

export const exportIgnoreProps : string[] = [ ...exportIgnorePropsFPS, ...exportIgnorePropsThis  ];

//These props will not be imported even if they are in one of the change arrays above (fail-safe)
//This was done so user could not manually insert specific props to over-right fail-safes built in to the webpart

//Specific for this web part
export const importBlockPropsThis : string[] = [ 'showSomeProps' ];

export const importBlockProps : string[] = [ ...importBlockPropsFPS, ...importBlockPropsThis ];

// importChanges: [  changeListConfig, changeListInfo, changePerformance, changeRefiners, changeToggles, changeInstructions, changeGrouping,
//       changeViews, changeListToggles, changeStats, changeCommands ]
export const changeListConfig : string[] = [ 'definitionToggle', 'listDefinition' , ];
export const changeListInfo : string[] = [ 'parentListWeb', 'parentListTitle', 'parentListURL' , 'language' , 'hideFolders' , ];

export const changePerformance : string[] = [ 'fetchCount', 'fetchCountMobile' , 'restFilter' , 'evalFilter', 'updateRefinersOnTextSearch' , 'itemsPerPage' ];

export const changeRefiners : string[] = [ 'refiner0', 'rules0def' , 'rules0' , 'refiner1' , 'rules1def', 'rules1', 'refiner2', 'rules2def', 'rules2', ];
export const changeToggles : string[] = [ 'togOtherListview', 'togRefinerCounts', 'togCountChart' , 'togOtherChartpart', 'togStats' , ];
export const changeInstructions : string[] = [ 'whenToShowItems', 'minItemsForHide' , 'instructionIntro' , 'refinerInstruction1' , 'refinerInstruction2', 'refinerInstruction3', ];
export const changeGrouping : string[] = [ 'groupByFields',  ];
export const changeViews : string[] = [ 'syncViews', 'richHeight', 'autoRichHeight', 'viewWidth1', 'viewJSON1' , 'viewWidth2' , 'viewJSON2' , 'viewWidth3', 'viewJSON3',];

export const changeListToggles : string[] = [ 'includeDetails', 'detailsAudience', 'includeAttach', 'includeListLink', 'listLinkAudience', 'createItemLink', 'createItemAudience' ];

export const changeStats : string[] = [ 'stats', ];
export const changeCommands : string[] = [ 'quickCommands', ];

// export interface IFpsCore114BannerWebPartProps extends IMinWPBannerProps {
  /**
   * Extend with portions of FPS Props that are needed
   * 
   */

  export interface IDrilldownV2WebPartProps  extends IMinBannerUIProps, IMinPinMeProps, IMinPandoramicProps, IMinBannerThemeProps, 
    IMinCustomHelpProps, IMinPageStyleProps, IMinBannerUtilityProps, IMinFPSLegacyProps, 
    IEasyPagesWPProps, IEasyIconsWPProps, IAgeSliderWPProps {

    // [key: string]: string | number | number[] | any[] | boolean | string[] | IMyProgress | PageContext | ICssChartProps | IWebpartHistory | undefined;
    [key: string]: any;

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


    //Group 1 - PreConfigSetup
    definitionToggle: boolean;
    listDefinition: any; //Picked list defintion :  Title

    //Group 2 - List Info
    parentListTitle: string;
    isLibrary: boolean;  //determined in picker

    parentListWeb: string;
    parentListURL?: string;
    hideFolders: boolean;
    language: string; //local language list data is saved in (needed to properly sort refiners)
  
    //Group 3 - Performance options
    fetchCount: number;
    fetchCountMobile: number;
    itemsPerPage: number;
    getAllProps: boolean;
    restFilter: string;
    evalFilter: string;
    updateRefinersOnTextSearch?: boolean;


    //Group 4 - Refiners
    refiner0: string;
    refiner1: string;
    refiner2: string;
  
    rules0def: string;
    rules1def: string;
    rules2def: string;
  
    rules0: string[];
    rules1: string[];
    rules2: string[];
  
    //Group 5 - Toggles
    togOtherListview:  boolean;
    togRefinerCounts: boolean;
    togCountChart: boolean;
    togOtherChartpart:  boolean;
    togStats: boolean;


    // Page 2 Group 2 - Instructions 
    whenToShowItems: IWhenToShowItems;
    minItemsForHide: number;
    instructionIntro: string;
    refinerInstruction1: string;
    refinerInstruction2: string;
    refinerInstruction3: string;

  
    // Page 2 Group 3 - View item Grouping 
    groupByFields: string;


    // Page 2 Group 4,5,6 - View Definitions   

    richHeight: string;  //=>> maxHeight: 55em ; address:  https://github.com/mikezimm/drilldown7/issues/270
    autoRichHeight: string; // ==>> minQty;max-height (em)   https://github.com/mikezimm/drilldown7/issues/270
    syncViews: boolean;

    viewWidth1: number;
    viewWidth2: number;
    viewWidth3: number;
  
    viewJSON1: string;
    viewJSON2: string;
    viewJSON3: string;


    // Page 2 Group 7 - List view Toggles 
    includeDetails: boolean;
    detailsAudience: IEveryoneAudience;

    includeAttach: boolean;
    includeListLink: boolean;
    listLinkAudience:  IEveryoneAudience;

    createItemLink: boolean;
    createItemAudience: IItemEditorAudience;
    
    // Page 2 Group 8 - Summary Stats 
    stats: string;


    // Page 2 Group 9 - Commands 
    quickCommands?: string;

    showCatCounts: boolean;
    showSummary: boolean;


    newMap?: any[];

    showDisabled?: boolean;  //This will show disabled refiners for DaysOfWeek/Months when the day or month has no data


    parentListFieldTitles: string;

    onlyActiveParents: boolean;


    // 3 - General how accurate do you want this to be

    // 4 - Info Options

    // 5 - UI Defaults


    // 6 - User Feedback:
    progress: IMyProgress;

    // 7 - TBD

    // 9 - Other web part options
    webPartScenario: string; //DEV, TEAM, CORP


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