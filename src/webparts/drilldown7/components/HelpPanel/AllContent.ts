
import { whyContent } from './Whyme';  //2022-01-31: Added Pivot Tiles
import { aboutTable } from './About';
import { gettingStartedContent } from './GettingStarted';
import { errorsContent } from './Errors';
import { advancedContent } from './Advanced';
import { futureContent } from './FuturePlans';
import { basicsContent } from './Basics';
import { tricksTable } from './Tricks';
import { getRandomTip, webParTips } from './Tips';
import { IWebpartBannerProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/bannerProps';

//this is on npm
export interface IBannerPages {

	whyContent: any;
	aboutTable: any;
	gettingStartedContent: any;
	errorsContent: any;
	advancedContent: any;
	futureContent: any;
	basicsContent: any;
	tricksTable: any;
	getRandomTip: any;
	webParTips: any[];

}

export function getBannerPages ( bannerProps: IWebpartBannerProps ) {

    let result : IBannerPages = {
        whyContent:  whyContent( bannerProps.gitHubRepo),
        aboutTable:  aboutTable( bannerProps.gitHubRepo, bannerProps.showRepoLinks ),
        gettingStartedContent:  gettingStartedContent( bannerProps.gitHubRepo),
        errorsContent:  errorsContent( bannerProps.gitHubRepo),
        advancedContent:  advancedContent( bannerProps.gitHubRepo),
        futureContent:  futureContent( bannerProps.gitHubRepo),
        basicsContent: basicsContent( bannerProps.gitHubRepo),
        tricksTable:  tricksTable( bannerProps.gitHubRepo),
        getRandomTip:  getRandomTip( bannerProps.gitHubRepo),
        webParTips:  webParTips,
    };

    return result;

}