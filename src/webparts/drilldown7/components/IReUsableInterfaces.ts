import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { IDrillItemInfo } from '@mikezimm/npmfunctions/dist/WebPartInterfaces/DrillDown/IDrillItem';

import { IFieldDef } from '@mikezimm/npmfunctions/dist/Fields/Interfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { IQuickField, IQuickButton, IQuickCommands } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

import { IRefinerLayer, IRefiners, IItemRefiners, IRefinerStats, RefineRuleValues,
  IRefinerRules, IRefinerStatType, RefinerStatTypes, IRefinerStat } from '@mikezimm/npmfunctions/dist/Refiners/IRefiners';

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

  export type ICSSChartTypes = 'pareto-asc' | 'pareto-dec' | 'pareto-labels' | 'stacked-column-labels' | 'stacked-column-dec' | 'stacked-column-asc' | 'kpi-tiles';
  export const CSSChartTypes : ICSSChartTypes[] = ['pareto-asc' , 'pareto-dec' , 'pareto-labels' , 'stacked-column-labels' , 'stacked-column-dec' , 'stacked-column-asc'];

  export type ISeriesSort = 'asis' | 'labels' | 'asc' | 'dec' | string ;

  export interface ICSSChartDD {

    stats: IRefinerStat[];
    callBackID: string;
    refinerObj: IRefinerLayer;
    breadCrumb?: string[];

  }

  export interface ICSSChartData {
    
    axisTitle?: string;
    val1?: number[];
    percents?: any[];
    count?: number;
    avg?: number;
    sum?: number;
    min?: number;
    max?: number;
    total?: number; //Added for cssBarCharts to have total "value" on top of chart... like total sum, total avg, total count
    changes?: any[];
    changeNotes?: string[];
    warnNotes?: string[];
    errorNotes?: string[];

    barValueAsPercent? : boolean;
    
    key: string; //This needs to be in data because this is the join of the currently selected refiners which can change.

    labels: any[];

  }

  export interface ICSSChartSettings {
    title: string;

    chartTypes: ICSSChartTypes[];
    activeType?: number;

    valueIsCount?: boolean;

    //isCollapsed = false shows expanded with accordion, true means isCollapsed with accordion, undefined means no accordion
    isCollapsed: number; 

    height?: number | string ; //This would be horizonal bar height... one horizontal layer
    barValues?: 'val1' | 'sums' | 'avgs' | 'percents' | string ;
    titleLocation?: 'top' | 'side';

    barColors?: 'blue' | 'green' |'brown' | 'gray' | 'red' | 'brown' | 'themed' | 'custom' ;
    customColors?: ILabelColor[];

    stylesChart?: any;
    stylesTitle?: any;
    stylesRow?: any;
    stylesBlock?: any;
    stylesLabel?: any;
    stylesValue?: any;
    stylesFigure?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.
    stylesGraphic?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.

  }

  /*
  export interface ICSSChartSeries {
    title: string;
    labels: any[];
    chartTypes: ICSSChartTypes[];
    activeType?: number;
    key: string;
    valueIsCount?: boolean;

    //isCollapsed = false shows expanded with accordion, true means isCollapsed with accordion, undefined means no accordion
    isCollapsed: number; 

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
    total?: number; //Added for cssBarCharts to have total "value" on top of chart... like total sum, total avg, total count
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
    stylesFigure?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.
    stylesGraphic?: any;  //Figure is for the entire array of charts... uses first valid stylesFigure object from array of charts.

  }
  */
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