
import { PageContext } from '@microsoft/sp-page-context';
import { IMyProgress,  ICSSChartDD } from './components/IReUsableInterfaces';
import { IDrillDownProps, IWhenToShowItems } from './components/Drill/drillComponent';
import { ICssChartProps } from '../cssChart/components/ICssChartProps';
import { IExpandAudiences } from "@mikezimm/npmfunctions/dist/Services/PropPane/FPSOptionsExpando";
import { ISupportedHost } from "@mikezimm/npmfunctions/dist/Services/PropPane/FPSInterfaces";

import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import { IWebpartHistory, IWebpartHistoryItem2, } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistoryInterface';


import { exportIgnorePropsFPS, importBlockPropsFPS } from '@mikezimm/npmfunctions/dist/WebPartInterfaces/ImportProps';

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



export interface IDrilldown7WebPartProps {

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


    




/**
 * Copied these from FPS PageInfo
 */

    feedbackEmail: string;

    //Needed for Expandoramic and PinMenu
    pageLayout: ISupportedHost ;// like SinglePageApp etc... this.context[_pageLayout];

    showBannerGear: boolean;
    uniqueId: string;

    //2022-02-17:  Added these for expandoramic mode
    enableExpandoramic: boolean;
    expandoDefault: boolean;
    expandoStyle: any;
    expandoPadding: number;
    expandoAudience: IExpandAudiences;

    // expandAlert: boolean;
    // expandConsole: boolean;
    //2022-02-17:  END additions for expandoramic mode

    // Section 15
    //General settings for Banner Options group
    // export interface IWebpartBannerProps {

    //[ 'showBanner', 'bannerTitle', 'showGoToHome', 'showGoToParent', 'homeParentGearAudience', 'bannerStyleChoice', 'bannerStyle', 'bannerCmdStyle', 'bannerHoverEffect', 'showRepoLinks', 'showExport' ];
    showBanner: boolean;
    bannerTitle: string;

    infoElementChoice: string;
    infoElementText: string;

    showGoToHome: boolean;  //defaults to true
    showGoToParent: boolean;  //defaults to true
    homeParentGearAudience: IExpandAudiences;

    bannerStyleChoice: string;
    bannerStyle: string;
    bannerCmdStyle: string;
    lockStyles: boolean;

    bannerHoverEffect: boolean;
    showRepoLinks: boolean;
    showExport: boolean;

    fpsImportProps: string;

    fullPanelAudience : IExpandAudiences;
    replacePanelHTML : any;  //This is the jsx sent to panel for User controled information (aka what reader will see when clicking 'info' button)

    //These are added for the minimum User Panel component ( which turns into the replacePanelHTML component )
    panelMessageDescription1: string; //
    panelMessageSupport: string;
    panelMessageDocumentation: string;
    panelMessageIfYouStill: string;
    documentationLinkDesc: string;
    documentationLinkUrl: string;
    documentationIsValid: boolean;
    supportContacts: IPropertyFieldGroupOrPerson[];

    //ADDED FOR WEBPART HISTORY:  
    webpartHistory: IWebpartHistory;


    showTricks: boolean;

    // }

    //Section 16 - FPS Options group
    searchShow: boolean;
    fpsPageStyle: string;
    fpsContainerMaxWidth: string;
    quickLaunchHide: boolean;

    //FPS Options part II
    pageHeaderHide: boolean;
    allSectionMaxWidthEnable: boolean;
    allSectionMaxWidth: number;
    allSectionMarginEnable: boolean;
    allSectionMargin: number;
    toolBarHide: boolean;

    
  }