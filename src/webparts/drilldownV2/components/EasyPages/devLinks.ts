
import { IRepoLinks } from "../../fpsReferences";
import { IEasyLink } from "./componentPage";
import { EasyPagesDevTab,EasyPagesRepoTab } from "./epTypes";

const SPFXParkLogo: string = `https://ih0.redbubble.net/image.815755990.6275/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg`;
const MSFTLogo: string = `https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31`;
const TheCKLogo: string = `https://0.gravatar.com/avatar/942805b409854696f15a519a39a2cedb?s=256&d=retro&r=PG`;
// import * as devLinks from '@mikezimm/npmFunctions/dist/Links/LinksDevDocs';

export const EasyDevTypescript: IEasyLink = { title: 'Typescript Playground', description: `Experiment with interfaces here - ${EasyPagesDevTab}`, 
  url: 'https://www.typescriptlang.org/play' , imageUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@02e637e09b55966e802dfe0bc93595594e0214bb/logos/typescript-icon.svg' , type: 'current', tabs: [ EasyPagesDevTab ] } as any;

export const EasyDevGridDocs: IEasyLink = { title: 'CSS Grid Docs', description: `Official Docs - ${EasyPagesDevTab}`, 
  url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout#guides' , imageUrl: 'https://miro.medium.com/max/770/1*RtAMWbxdwW2ujyrurU9plw.png' , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevGridGen: IEasyLink = { title: 'CSS Grid Sandbox', description: `grid.layoutit.com - ${EasyPagesDevTab}`, 
  url: 'https://grid.layoutit.com/' , imageUrl: 'https://miro.medium.com/max/770/1*RtAMWbxdwW2ujyrurU9plw.png' , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevJSON: IEasyLink = { title: 'JSON Editor', description: ` - ${EasyPagesDevTab}`, 
  url: 'https://codebeautify.org/jsonviewer' , imageUrl: 'https://codebeautify.org/img/slogo.webp' , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevPnpJS: IEasyLink = { title: 'Pnpjs.io', description: ` - ${EasyPagesDevTab}`, 
  url: 'https://pnp.github.io/pnpjs/packages/#sp' , imageUrl: 'https://pbs.twimg.com/profile_images/1260661706231087112/CvjfDhAm_400x400.jpg' , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevRegex: IEasyLink = { title: 'Regex 101', description: `Test regex - ${EasyPagesDevTab}`, 
  url: 'https://regex101.com/' , imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Toolbaricon_RegEx.svg/240px-Toolbaricon_RegEx.svg.png' , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevSPFxReact: IEasyLink = { title: `SPFx React Controls - Github - ${EasyPagesDevTab}`, description: '', 
  url: 'https://github.com/SharePoint/sp-dev-fx-controls-react/tree/master/src/controls/' , imageUrl: SPFXParkLogo , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevSPFxReactIO: IEasyLink = { title: `SPFx React Controls - IO - ${EasyPagesDevTab}`, description: '', 
  url: 'https://github.com/SharePoint/sp-dev-fx-controls-react/' , imageUrl: SPFXParkLogo , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevFluent: IEasyLink = { title: `Fluent UI`, description: `${EasyPagesDevTab}`, 
  url: 'https://developer.microsoft.com/en-us/fluentui#/controls/web' , imageUrl: MSFTLogo , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevFliconIO: IEasyLink = { title: `Flicon.io`, description: `Fluent Icons - ${EasyPagesDevTab}`, 
  url: 'https://flicon.io/' , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesDevTab ]  } as any;

export const EasyDevPages: IEasyLink[] = [ EasyDevTypescript, EasyDevJSON, EasyDevGridDocs, EasyDevGridGen,
  EasyDevPnpJS, EasyDevRegex, EasyDevSPFxReact, EasyDevSPFxReactIO, EasyDevFluent, EasyDevFliconIO
];


export const EasyDevFPSReact: IEasyLink = { title: 'FPS-React', description: `fps-react contains react based components for reuse - ${EasyPagesDevTab}`, 
  url: 'https://github.com/mikezimm/fps-React/issues' , imageUrl: 'https://www.pinpng.com/pngs/m/675-6758716_react-native-logo-svg-hd-png-download.png' , type: 'current', tabs: [ EasyPagesDevTab ] } as any;

export const EasyDevFPSJS: IEasyLink = { title: 'FPS-JS', description: `fps-js contains JS based functions, interfaces and constants for reuse - ${EasyPagesDevTab}`, 
  url: 'https://github.com/mikezimm/fps-JS/issues' , imageUrl: 'https://www.freepnglogos.com/uploads/javascript-png/black-js-logo-symbol-icon-29.png' , type: 'current', tabs: [ EasyPagesDevTab ] } as any;

export const EasyDevFPSBanner: IEasyLink = { title: 'FPS-Banner', description: `fps-banner contains react based banner for reuse - ${EasyPagesDevTab}`, 
  url: 'https://github.com/mikezimm/fps-Banner/issues' , imageUrl: 'https://th.bing.com/th/id/R.4512e93706f461f09f26aed42607023a?rik=GcuIKkzKDw%2bloA&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2010%2f06%2fblue-header-graphic_64584.jpg&ehk=JzYQX4j4PVDUgA71x07NSS82%2fQB%2bvegBe56z%2fPPvVjA%3d&risl=&pid=ImgRaw&r=0' , type: 'current', tabs: [ EasyPagesDevTab ] } as any;

export const EasyDevFPSPnp2: IEasyLink = { title: 'FPS-Pnp2', description: `fps-pnp2 contains services and functions related to pnpv2 library - ${EasyPagesDevTab}`, 
  url: 'https://github.com/mikezimm/fps-Pnp2/issues' , imageUrl: 'https://th.bing.com/th/id/OIP.cVFWUghT4GBYXb6XogqVegAAAA?pid=ImgDet&rs=1' , type: 'current', tabs: [ EasyPagesDevTab ] } as any;

export function getZGitLinks( repo : IRepoLinks ) : IEasyLink[] {

  const links: IEasyLink[] = [];

  /**
   * 2022-11-14
   * Comment on github filtering, if more than one filter, need to always add + label filter
   * If the filter is to NOT include a label, then you must use +-label:labelName
   * +- is required in that case.
   */
  
  links.push(  { title: `Issues`, description: `${repo.desc}/issues`,
                 url: `${repo.href}/issues` , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesRepoTab ]  } as any );

  links.push(  { title: `Open Priority Issues`, description: `${repo.desc}/issues`,
                 url: `${repo.href}/issues?q=is:issue++is:open++label:priority` , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesRepoTab ]  } as any );

  links.push(  { title: `Open Priority Issues - NOT Complete`, description: `${repo.desc}/issues`,
                 url: `${repo.href}/issues?q=is:issue++is:open++label:priority+-label:complete` , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesRepoTab ]  } as any );

  links.push(  { title: `Open Priority Issues - Completed`, description: `${repo.desc}/issues`,
                 url: `${repo.href}/issues?q=is:issue+is:open++label:priority++label:complete` , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesRepoTab ]  } as any );

  links.push(  { title: `Closed Issues`, description: `${repo.desc}/issues`,
                url: `${repo.href}/issues?q=is:issue++is:closed` , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesRepoTab ]  } as any );

  links.push(  { title: `Open Issues - Completed`, description: `${repo.desc}/issues`,
                url: `${repo.href}/issues?q=is:issue+is:open++label:complete` , imageUrl: TheCKLogo , type: 'current', tabs: [ EasyPagesRepoTab ]  } as any );

  links.push( EasyDevFPSReact );
  links.push( EasyDevFPSJS );
  links.push( EasyDevFPSBanner );
  links.push( EasyDevFPSPnp2 );

  return links;

}