import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
  
export interface IRefinerRules {
  rules: RefineRuleValues[];
}

export type IRefinerStatType = 'sum' | 'avg' | 'max' | 'min' | 'daysAgo' | 'monthsAgo' | 'demo' | 'eval';
export const RefinerStatTypes = ['sum' , 'avg' , 'max' , 'min' , 'daysAgo' , 'monthsAgo' , 'eval' ]; // , ''];

export type IRefinerChartType = 'pareto' | 'stackedColumn' | '' | '' | '' | '' | '' ;
export const RefinerChartTypes = ['pareto' , 'stackedColumn' ]; // , '' , '' , '' , '' , '' , ''];

export interface IRefinerStat {

  primaryField: string;
  secondField?: string;
  title: string;
  stat: IRefinerStatType;
  chartType: IRefinerChartType;
  eval?: string;

}

export interface IRefinerStats {
  stats: IRefinerStat[];
}

export type RefineRuleValues =
  'parseBySemiColons' | 'parseByCommas' | 'groupBy10s' |  'groupBy100s' |  'groupBy1000s' |  'groupByMillions' | 
  'isDate' | 'groupByDays' | 'groupByDaysDDD' | 'groupByWeeks' |  'groupByMonthsMMM' |    'groupByMonthsYYMM' |'groupByYears' | 'groupByDayOfWeek' |  'groupByDateBuckets' |
  'groupByUsers' | 'invalidRules' | ''
;

export interface ICustViewDef {
  minWidth: number;
  viewFields: IViewField[];
  groupByFields?: IGrouping[];
  includeDetails: boolean;
}

export function buildKeyText( str: RefineRuleValues) {
  return { key: str, text: str };
}

export function refinerRuleItems() {

    let options = [];
    options.push( buildKeyText( 'parseBySemiColons' ) );
    options.push( buildKeyText( 'parseByCommas' ) );
    options.push( buildKeyText( 'groupBy10s' ) );
    options.push( buildKeyText( 'groupBy100s' ) );
    options.push( buildKeyText( 'groupBy1000s' ) );
    options.push( buildKeyText( 'groupByMillions' ) );
    options.push( buildKeyText( 'isDate' ) );
    options.push( buildKeyText( 'groupByDays' ) );
    ///options.push( buildKeyText( 'groupByDaysDDD' ) );
    options.push( buildKeyText( 'groupByWeeks' ) );
    options.push( buildKeyText( 'groupByMonthsMMM' ) );
    options.push( buildKeyText( 'groupByMonthsYYMM' ) );
    options.push( buildKeyText( 'groupByYears' ) );
    options.push( buildKeyText( 'groupByDayOfWeek' ) );
    options.push( buildKeyText( 'groupByDateBuckets' ) );
    options.push( buildKeyText( 'groupByUsers' ) );

    return options;

}

export interface IItemRefiners {
  lev0: any[]; lev1: any[]; lev2: any[];
  stat0?: number;
  stat1?: number;
  stat2?: number;
  stat3?: number;
  stat4?: number;
  stat5?: number;
  stat6?: number;
  stat7?: number;
  stat8?: number;
  stat9?: number;
  stat0Count?: number;
  stat1Count?: number;
  stat2Count?: number;
  stat3Count?: number;
  stat4Count?: number;
  stat5Count?: number;
  stat6Count?: number;
  stat7Count?: number;
  stat8Count?: number;
  stat9Count?: number;
}

export interface IRefiners {

  thisKey: string;
  multiCount: number; // Count when counting multi-value fields each time
  itemCount: number; // Count when only counting multi-value fields once
  childrenKeys: string[];
  childrenObjs: IRefinerLayer[];
  childrenMultiCounts: number[];
  childrenCounts: number[];
  stat0?: number;
  stat1?: number;
  stat2?: number;
  stat3?: number;
  stat4?: number;
  stat5?: number;
  stat6?: number;
  stat7?: number;
  stat8?: number;
  stat9?: number;
  stat0Count?: number;
  stat1Count?: number;
  stat2Count?: number;
  stat3Count?: number;
  stat4Count?: number;
  stat5Count?: number;
  stat6Count?: number;
  stat7Count?: number;
  stat8Count?: number;
  stat9Count?: number;
}

export interface IRefinerLayer {
  thisKey: string;
  multiCount: number; // Count when counting multi-value fields each time
  itemCount: number; // Count when only counting multi-value fields once
  childrenKeys: string[];
  childrenObjs?: IRefinerLayer[];
  childrenMultiCounts?: number[];
  childrenCounts?: number[];
  stat0?: number;
  stat1?: number;
  stat2?: number;
  stat3?: number;
  stat4?: number;
  stat5?: number;
  stat6?: number;
  stat7?: number;
  stat8?: number;
  stat9?: number;
  stat0Count?: number;
  stat1Count?: number;
  stat2Count?: number;
  stat3Count?: number;
  stat4Count?: number;
  stat5Count?: number;
  stat6Count?: number;
  stat7Count?: number;
  stat8Count?: number;
  stat9Count?: number;
}

export interface IPickedWebBasic {
  title: string;
  ServerRelativeUrl: string;
  guid: string;
  url: string;
  siteIcon: string;
}

export interface IPickedList {
  title: string;
  name: string;
  guid: string;
  isLibrary: boolean;
}

export interface IMyProgress {

  time: string;
  logLabel: string;
  label: string;
  description: string;
  percentComplete?: number;
  progressHidden?: boolean;
  icon?: string;
  color?: string;
  ref?: string;
  refElement?: any;
}

export interface IPivot {
    headerText: string;
    itemKey: string;
    filter?: string;
    data?: string;
    lastIndex: number;
  }
  
  export interface IMyPivots {
    heading1: IPivot[];
    heading2?: IPivot[];
    heading3?: IPivot[];
  }

  
export interface ILink {
    Description: string;
    Url: string;
  }
  
  export interface IUser {
    title?: string;
    Title?: string;
    initials?: string;  //Single person column
    email?: string;  //Single person column
    id?: any;
    Id?: any;
    ID?: any;
  
    isSiteAdmin?:boolean;
    LoginName?: string;
    Name?: string;
  
    //These optional props are from the React PeoplePicker control
    imageInitials?: string; //same as Initials;         From React People Picker control
    imageUrl?: string;  //Thumbnail URL;                From React People Picker control
    loginName?: string;  //Same as LoginName and Name;  From React People Picker control
    text?: string;   //Same as Title and title;         From React People Picker control
    tertiaryText?: string; //                           From React People Picker control
    secondaryText?: string; // same as email;           From React People Picker control
  
  }

export interface IMyFonts{

    size?: string;
    weight?: string;
    style?: string;
    color?: string;
  
  }
  
  export interface IMyIcons{
    hasIcon: boolean;
    name: string;
    size?: string;
    height?: string;
    width?: string;
    margin?: string;
  
  }

  
  export interface ILabelColor {
    label: string;
    barColor?: string;
    fontColor?: string;
    fontStyle?: string;
  }

  export type ICSSChartTypes = 'pareto-asc' | 'pareto-dec' | 'pareto-labels' | 'stacked-column-labels' | 'stacked-column-dec' | 'stacked-column-asc';
  export const CSSChartTypes : ICSSChartTypes[] = ['pareto-asc' , 'pareto-dec' , 'pareto-labels' , 'stacked-column-labels' , 'stacked-column-dec' , 'stacked-column-asc'];

  export type ISeriesSort = 'asis' | 'labels' | 'asc' | 'dec' | string ;

  export interface ICSSChartSeries {
    title: string;
    labels: any[];
    chartTypes: ICSSChartTypes[];
    activeType?: number;
    key: string;

    barValueAsPercent? : boolean;
    height?: number | string ; //This would be horizonal bar height... one horizontal layer
    barValues?: 'val1' | 'sums' | 'avgs' | 'percents' | string ;
    titleLocation?: 'top' | 'side';

    barColors?: 'blue' | 'green' |'brown' | 'gray' | 'red' | 'brown' | 'themed' | 'custom' ;
    customColors?: ILabelColor[];
    axisTitle?: string;
    val1?: number[];
    percents?: any[];
    count?: number;
    avg?: number;
    sum?: number;
    min?: number;
    max?: number;
    changes?: any[];
    changeNotes?: string[];
    warnNotes?: string[];
    errorNotes?: string[];
    stylesChart?: any;
    stylesTitle?: any;
    stylesRow?: any;
    stylesBlock?: any;
    stylesLabel?: any;
    stylesValue?: any;
  }
  // , IChartSeries, ICharNote

export interface IChartSeries {
    title: string;
    axisTitle: string;
    labels: any[];
    sums: any[];
    counts: any[];
    totalS: number;
    totalC: number;
    changes: any[];
    changeNotes: string[];
    warnNotes: string[];
    errorNotes: string[];
    origLabels?: any[];
    origSums?: any[];
    origCounts?: any[];
  }
  
  export interface ICharNote {
    parent: string;
    source: string;
    note: string;
  }