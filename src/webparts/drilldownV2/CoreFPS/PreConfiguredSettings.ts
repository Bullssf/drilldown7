// import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
// import { IDrilldownV2WebPartProps } from "../IDrilldownV2WebPartProps";

// import { FPSAgeSliderPresetEverywhere } from '../components/FPSAgeSlider/FPSAgeTypes';
import { FPSAgeSliderPresetEverywhere } from '@mikezimm/fps-library-v2/lib/components/atoms/FPSAgeSlider/FPSAgeTypes';
import { PresetFPSBanner, IPreConfigSettings, IAllPreConfigSettings,  } from '../fpsReferences';
// import { encrptMeOriginalTest } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/logTest';
// import { ContALVFMContent, ContALVFMWebP } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/constants';

export const WPForceEverywhere : IPreConfigSettings = {
    source: 'WPForceEverywhere',
    location: '*',
    props: {
        // relatedStyle: '',

        // pageLinksheading: 'Images and Links',
        // pageLinksshowItems: true,
        // pageLinksisExpanded: false,
        // canvasLinks: true,
        // canvasImgs: true,
        // pageLinksweb: 'current',
        // pageLinkslistTitle: 'Site Pages',
        // pageLinksrestFilter: 'ID eq {{PageId}}',
        // pageLinkslinkProp: 'File/ServerRelativeUrl', // aka FileLeaf to open file name, if empty, will just show the value
        // pageLinksdisplayProp: 'FileLeafRef',

    }
};

export const WPPresetEverywhere : IPreConfigSettings = {
    source: 'WPPresetEverywhere',
    location: '*',
    props: { ...{

      isLibrary: false,
      newMap: [], //Added to address https://github.com/mikezimm/drilldown7/issues/184
      description: "Drilldown cascading filters",
      listTitle:"",
      webPartScenario: "TEAM",
      refiner0: "",
      refiner1: "",
      refiner2: "",
      rules0def: "",
      rules1def: "",
      rules2def: "",
      viewWidth1: 1200,
      viewWidth2: 800,
      viewWidth3: 500,
      listDefinition: "",

      includeDetails: true,
      detailsAudience: 'Everyone',

      includeListLink: true,
      listLinkAudience: 'Everyone',

      createItemLink: false,
      createItemAudience: 'Item Editors',

      showCatCounts: false,
      showSummary: false,

      groupByFields: "",
      togRefinerCounts: false,
      togCountChart: true,
      togStats: true,
      togOtherListview: false,

      fetchCount: 500,
      fetchCountMobile: 200,
      fetchNewer: true,

      getAllProps: true,
      restFilter: "",
      evalFilter: "",
      definitionToggle: true,

      hideFolders: true,

      syncViews: false,
      richHeight: '2.2;10;30',
      autoRichHeight: '5;30',
      viewJSON1: "[{ \"name\": \"Id\", \"displayName\": \"Id\", \"minWidth\": 50 },{ \"name\": \"Title\", \"displayName\": \"Title\", \"minWidth\": 200 },{ \"name\": \"Created\", \"displayName\": \"Created\", \"minWidth\": 200 },{ \"name\": \"Modified\", \"displayName\": \"Modified\", \"minWidth\": 200 }]",
      viewJSON2: "[{ \"name\": \"Id\", \"displayName\": \"Id\", \"minWidth\": 50 },{ \"name\": \"Title\", \"displayName\": \"Title\", \"minWidth\": 200 },{ \"name\": \"Modified\", \"displayName\": \"Modified\", \"minWidth\": 200 }]",
      viewJSON3: "[{ \"name\": \"Id\", \"displayName\": \"Id\", \"minWidth\": 50 },{ \"name\": \"Title\", \"displayName\": \"Title\", \"minWidth\": 200 }]",

      stats: "[{ \"primaryField\": \"Created\", \"secondField\": \"currentTime\", \"title\": \"Created Age\", \"stat\": \"avg\", \"chartTypes\": [\"pareto-dec\"],\"ignore\": [{\"field\": \"EntryType\",\"op\" : \"eq\",\"val\" : \"start\"}] },{ \"primaryField\": \"Modified\", \"secondField\": \"currentTime\", \"title\": \"Modified Age\", \"stat\": \"avg\", \"chartTypes\": [\"pareto-dec\"],\"ignore\": [{\"field\": \"EntryType\",\"op\" : \"eq\",\"val\" : \"start\"}] }]",
      quickCommand: `{"buttons":[],"fields":[],"onUpdateReload":true}`,  //Do not set here.   https://github.com/mikezimm/drilldown7/issues/211

      rules0: [],
      rules1: [],
      rules2: [],

      //Added for https://github.com/mikezimm/drilldown7/issues/95
      whenToShowItems:2,
      minItemsForHide:30,

      instructionIntro:`Please click filters (above) to see items :)`,
      refinerInstruction1: `Select a {{refiner0}}`,
      refinerInstruction2: `Select a {{refiner1}}`,
      refinerInstruction3: `Select a {{refiner2}}`,
      language: `en-us`,

      feedbackEmail: `ae57524a.${window.location.hostname}.onmicrosoft.com@amer.teams.ms`,

      itemsPerPage:20,

    }, ...{ ...FPSAgeSliderPresetEverywhere } }
};

export const PresetSomeRandomSite : IPreConfigSettings = {
    source: 'PresetSomeRandomSite',
    location: '/sites/SomeRandomSite/',
    props: {
        homeParentGearAudience: 'Some Test Value',
    }
};

export const PreConfiguredProps : IAllPreConfigSettings = {
    //Forced over-ride presets.
    //Forced and presets are applied in order of this array....
    //  This means the final preset in the array takes precedance.

    //For Forced, generally speaking put because this web part may have specific needs.
    forced: [ WPForceEverywhere ],

    //For Presets, Order should be:  PresetFPSBanner, WPPresetEverywhere, CUSTOM Sites,
    preset: [ PresetFPSBanner, WPPresetEverywhere ],
};
