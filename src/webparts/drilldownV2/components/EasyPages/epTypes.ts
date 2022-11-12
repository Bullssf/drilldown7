
import { IEveryoneAudience } from "@mikezimm/npmfunctions/dist/Services/PropPane/Audiences";
/**
 * Minimum interface into Main Web Part Properties needed to use this feature
 */
//To be added to npmFunctions
export interface IEasyPagesWPProps {
  easyPageEnable: boolean;
  easyPagesAudience: IEveryoneAudience;
  easyPageTabs: string;
  easyPageOverflowTab?: string;
  easyPageParent?: boolean; //Include parent site pages
  easyPageAltUrl?: string; //Include alternate site's site pages
  easyPageAltNav?: string; //Include navigation elements from other site
  easyPageSeparateExtras?: boolean; //Put Parent/Alt links in separate tab ( default )
  easyPageStyles?: string;  //Optional styles on entire page
  easyPageContainer?: string;  //Optional styles on container element
}

export const changeEasyPages: string[] = ['easyPageEnable', 'easyPagesAudience', 'easyPageTabs', 'easyPageOverflowTab', 
  'easyPageParent', 'easyPageAltUrl', 'easyPageAltNav', 'easyPageSeparateExtras', 'easyPageStyles', 'easyPageContainer'];

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
    searchSource: string;
    searchSourceDesc: string;
    itemFetchCol?: string[]; //higher cost columns to fetch on opening panel
    isModern: boolean;
    orderBy?: {
        prop: string;
        asc: boolean;
    };
    overflowTab?: string;
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
export const DefaultOverflowTab = 'Others';

export function createNewSitePagesSource( webUrl: string, tabs: string[], overflowTab: string, showTricks: boolean ): ISourceProps {

  const NewSource: ISourceProps = SitePagesSource;
  NewSource.webUrl = webUrl;
  NewSource.meta1 = tabs;
  if ( showTricks === true && NewSource.meta1.indexOf( EasyPagesDevTab ) < 0 ) NewSource.meta1.push( EasyPagesDevTab )
  NewSource.overflowTab = overflowTab ? overflowTab : DefaultOverflowTab;

  return NewSource;

}