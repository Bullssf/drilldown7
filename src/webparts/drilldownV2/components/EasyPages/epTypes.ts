
import { IEveryoneAudience } from "@mikezimm/npmfunctions/dist/Services/PropPane/Audiences";
import { ISourceName } from "./componentPage";

/**
 * Minimum interface into Main Web Part Properties needed to use this feature
 */
//To be added to npmFunctions
export interface IEasyPagesWPProps {
  EasyPagesAudience: IEveryoneAudience;
  EasyPageOverflowTab?: string;

  EasyPagesEnable: boolean;
  EasyPageTabsC: string;

  EasyPageParent?: boolean; //Include parent site pages
  EasyPageTabsP: string;

  EasyPageUrlA?: string; //Include alternate site's site pages
  EasyPagesSiteTitleA?: string;  // Button Text for Alternate Site
  EasyPageTabsA: string;

  EasyPageUrlB?: string; //Include 2nd alternate site's site pages
  EasyPagesSiteTitleB?: string;  // Button Text for 2nd Alternate Site
  EasyPageTabsB: string;

  // easyPageAltNav?: string; //Include navigation elements from other site
  // easyPageSeparateExtras?: boolean; //Put Parent/Alt links in separate tab ( default )

  EasyPageStyles?: string;  //Optional styles on entire page
  EasyPageContainerStyles?: string;  //Optional styles on container element
}

export const changeEasyPages: string[] = ['EasyPagesEnable', 'EasyPagesAudience', 'EasyPageTabsC', 'EasyPageOverflowTab', 
  'EasyPageParent', 'EasyPageTabsP', 'EasyPageUrlA', 'EasyPageTabsA', 'EasyPagesSiteTitleA', 'EasyPageStyles', 'EasyPageContainerStyles'];

export const DefaultEasyPagesTabs: string[] = [ 'Home', 'Help', 'Training', 'Links', 'Drilldown', 'Contents', 'Admin' ];

// export const ModernSitePagesColumns: string[] = ['ID','Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl/Url','FileSystemObjectType','FirstPublishedDate','PromotedState','FileSizeDisplay','OData__UIVersion','OData__UIVersionString','DocIcon'];
export const ModernSitePagesColumns: string[] = ['ID','Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl', 
    'FileSystemObjectType','Modified','Created','FirstPublishedDate','PromotedState','FileSizeDisplay','OData__UIVersion','OData__UIVersionString','DocIcon',
    'OData__OriginalSourceUrl' ]; //Added this for news links

export const ModernSitePagesSearch: string[] = ['Title','Description','Author/Title','Editor/Title','FirstPublishedDate','PromotedState',];

export const ExtraFetchModernPage = ['WikiField','CanvasContent1','LayoutsWebpartsContent'];

export interface ISourceProps {
  // [key: string]: string | string[] | boolean | { prop: string; asc: boolean; } | any |undefined ;
    // defType: IDefSourceType;  //Used in Search Meta function
    defType: string;  //Used in Search Meta function
    webUrl: string;
    listTitle: string;
    webRelativeLink: string;
    viewItemLink?: string;
    columns: string[];
    searchProps: string[];
    selectThese?: string[];
    restFilter?: string;
    evalFilter?: string; //Format of eval
    searchSource: string;
    searchSourceDesc: string;
    itemFetchCol?: string[]; //higher cost columns to fetch on opening panel
    isModern: boolean;
    orderBy?: {
        prop: string;
        asc: boolean;
    };
    EasyPageOverflowTab?: string;
    meta0?: string[];    // Used for quick filtering - aka buttons or Pivots - meta0 is used for things like Type
    meta1?: string[];    // Used for quick filtering - aka buttons or Pivots - meta1 is normal button
    meta2?: string[];   // Used for quick filtering - aka buttons or Pivots - meta2 is normal button
    meta3?: string[];   // Used for quick filtering - aka buttons or Pivots - meta3 is normal button
    metaX?: string[];   // Used for quick filtering - For common filters like Modified and Created metadata

    defSearchButtons: string[];  //These are default buttons always on that source page.  Use case for Manual:  Policy, Instruction etc...

}

export const SitePagesSource : ISourceProps = {
  defType: 'pages',
  webUrl: ``,
  listTitle: "Site Pages",
  webRelativeLink: "SitePages",
  searchSource: '', //'Current Site',
  searchSourceDesc: '', // 'Site Pages library in Current Site',
  columns: ModernSitePagesColumns,
  searchProps: ModernSitePagesSearch,
  selectThese: [ ...ModernSitePagesColumns ],

  itemFetchCol: ExtraFetchModernPage,
  isModern: true,
  // restFilter: "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159' and Title ne 'Home'",
  restFilter: "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
  evalFilter: ``, // Sample:  item.Title ==='Home'
  defSearchButtons: [],  // [ 'Last30Days', 'Last90Days' ],
  orderBy: { //Including even though it does not seem to do anything
    prop: 'Title',
    asc: true,
  },
  meta0:[],
  meta1:[],
  meta2:[],
  meta3:[],
  metaX:[],
}

export const EasyPagesDevTab = 'zDev';
export const EasyPagesRepoTab = 'zGit';
export const DefaultOverflowTab = 'Others';

export function createNewSitePagesSource( source: ISourceName, webUrl: string, tabs: string[], EasyPageOverflowTab: string, showTricks: boolean ): ISourceProps {

  const NewSource: ISourceProps = JSON.parse(JSON.stringify(SitePagesSource)) ;
  NewSource.webUrl = webUrl;
  NewSource.meta1 = tabs;
  if ( showTricks === true && NewSource.meta1.indexOf( EasyPagesDevTab ) < 0 ) NewSource.meta1.push( EasyPagesDevTab )
  NewSource.EasyPageOverflowTab = EasyPageOverflowTab ? EasyPageOverflowTab : DefaultOverflowTab;

  console.log( `epTypes createNewSitePagesSource ${source}`, JSON.parse(JSON.stringify(NewSource)) );
  return NewSource;

}