
import { IWebpartBannerProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/bannerProps';
import { IBannerPages } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/bannerProps';

import { tricksTable } from '@mikezimm/npmfunctions/dist/CoreFPS/ReusaableTricks';

import { aboutTable } from './About';
import { advancedContent } from './Advanced';

import { basicsContent } from './Basics';
import { errorsContent } from './Errors';

import { futureContent } from './FuturePlans';
import { gettingStartedContent } from './GettingStarted';

import { getRandomTip, webParTips } from './Tips';
import { whyContent } from './Whyme';  //2022-01-31: Added Pivot Tiles

export function getBannerPages ( bannerProps: IWebpartBannerProps ) {

    let result : IBannerPages = {
        whyContent:  whyContent( bannerProps.gitHubRepo),
        aboutTable:  aboutTable( bannerProps.gitHubRepo, bannerProps.showRepoLinks ),
        gettingStartedContent:  gettingStartedContent( bannerProps.gitHubRepo),
        errorsContent:  errorsContent( bannerProps.gitHubRepo),
        advancedContent:  advancedContent( bannerProps.gitHubRepo),
        futureContent:  futureContent( bannerProps.gitHubRepo),
        basicsContent: basicsContent( bannerProps.gitHubRepo),

        // tricksTable( showScenario, showTool, showGulp, showAllowOther, showCrazy, showCreate ); all booleans
        tricksTable:  tricksTable( true, true, true, false, false, false ),

        getRandomTip:  getRandomTip( bannerProps.gitHubRepo),
        webParTips:  webParTips,
    };

    return result;

}