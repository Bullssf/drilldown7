
import { tricksTable } from '@mikezimm/fps-library-v2/lib/banner/features/Tricky/ReusaableTricks';
import { IBannerPages, } from '../../fpsReferences';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';

import { aboutTable } from './About';
import { advancedContent } from './Advanced';

import { basicsContent } from './Basics';
import { errorsContent } from './Errors';

import { futureContent } from './FuturePlans';
import { gettingStartedContent } from './GettingStarted';

import { getRandomTip, webParTips } from './Tips';
import { whyContent } from './Whyme';  //2022-01-31: Added Pivot Tiles

export function getBannerPages ( bannerProps: IWebpartBannerProps ): IBannerPages {

    let result : IBannerPages = {
        whyContent:  whyContent( bannerProps ),
        aboutTable:  aboutTable( bannerProps ),
        gettingStartedContent:  gettingStartedContent( ),
        errorsContent:  errorsContent( ),
        advancedContent:  advancedContent( ),
        futureContent:  futureContent( ),
        basicsContent: basicsContent( ),

        // tricksTable( showScenario, showTool, showGulp, showAllowOther, showCrazy, showCreate ); all booleans
        tricksTable:  tricksTable( true, true, true, false, false, false ),

        getRandomTip:  getRandomTip( ),
        webParTips:  webParTips,
    };

    return result;

}