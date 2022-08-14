// import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
// import { IDrilldown7WebPartProps } from "../IDrilldown7WebPartProps";

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
    props: {

        // Visitor Panel props that are not preset in manifest.json
        // fullPanelAudience: 'Page Editors',
        // panelMessageDescription1: 'Finance Manual Help and Contact',
        // panelMessageSupport: `Contact ${encrptMeOriginalTest( ContALVFMContent )} for Finance Manual content`,
        // panelMessageDocumentation: `Contact ${encrptMeOriginalTest( ContALVFMWebP )}  for Web part questions`,
        // panelMessageIfYouStill: '',
        // documentationLinkDesc: 'Finance Manual Help site',
        // documentationLinkUrl: '/sites/FinanceManual/Help',
        // documentationIsValid: true,
        // supportContacts: [ FinancialManualContacts ],

        // FPS Banner Basics
        // bannerTitle: 'Drilldown',
        // infoElementChoice: "IconName=Unknown",
        // infoElementText: "Question mark circle",
        feedbackEmail: `ae57524a.${window.location.hostname}.onmicrosoft.com@amer.teams.ms`,

        // FPS Banner Navigation
        // showGoToHome: true,
        // showGoToParent: true,

         // Banner Theme props that are not preset in manifest.json
        //  bannerStyleChoice: 'corpDark1',
        //  bannerStyle: '{\"color\":\"white\",\"backgroundColor\":\"#005495\",\"fontSize\":\"larger\",\"fontWeight\":600,\"fontStyle\":\"normal\",\"padding\":\"0px 10px\",\"height\":\"48px\",\"cursor\":\"pointer\"}',
        //  bannerCmdStyle: '{\"color\":\"white\",\"backgroundColor\":\"#005495\",\"fontSize\":16,\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"padding\":\"7px 4px\",\"marginRight\":\"0px\",\"borderRadius\":\"5px\",\"cursor\":\"pointer\"}',
        //  lockStyles: true,
        
    }
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
