import * as React from 'react';
import styles from './Cssreactbarchart.module.scss';
import { ICssreactbarchartProps, ICssreactbarchartState } from './ICssreactbarchartProps';

import { getRandomInt, getRandomFromArray, generateVals, generateTitles } from '../../fpsReferences';

import { sortKeysByOtherKey  } from '../../fpsReferences';

//Manipulation
import { convertNumberArrayToRelativePercents, } from '../../fpsReferences';

import { ICSSChartSettings, ICSSChartData } from '../Drill/IDrillProps';
import { ICSSChartTypes, ISeriesSort, CSSChartTypes } from '../../fpsReferences';

import stylesC from './cssChart.module.scss';

import { ColorsBlue, ColorsBrown, ColorsGray, ColorsGreen, ColorsRed } from '../../fpsReferences';

/***
 *    d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *      `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *       88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *       88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *      .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                       
 *                                                                                       
 */

export interface ISimpleData {
  title: string;
  value: number;
  perc: number;
}


/***
 *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                  
 *                                                                                  
 */
// makeChartData ,


export function makeChartSettings( qty: number, label: string, chartTypes : ICSSChartTypes[] = [] ) {

  // let randomNums = generateVals( qty, 35, 90 );
  // let randomTitles = generateTitles( label, qty );

  if ( chartTypes.length === 0 ) { chartTypes = CSSChartTypes; }

  let chartData: ICSSChartSettings = {
    title: label,
    activeType: getRandomInt( 0,CSSChartTypes.length -1 ),
    chartTypes: chartTypes,
    isCollapsed: 1,
  };

  return chartData;

}
export function makeChartData( qty: number, label: string, chartTypes : ICSSChartTypes[] = [] ) {

  let randomNums = generateVals( qty, 35, 90 );
  let randomTitles = generateTitles( label, qty );
  const arrSum = randomNums.reduce((a,b) => a + b, 0);
  let percents = randomNums.map( v => { return (v / arrSum * 100 ) ; });

  let chartKey : string = randomTitles.join('') + randomNums.join('');

  let chartData: ICSSChartData = {
    labels: randomTitles,
    val1: randomNums,
    percents: percents,
    sum: arrSum,
    key: chartKey,
  };

  return chartData;

}

/***
 *     .o88b. db       .d8b.  .d8888. .d8888. 
 *    d8P  Y8 88      d8' `8b 88'  YP 88'  YP 
 *    8P      88      88ooo88 `8bo.   `8bo.   
 *    8b      88      88~~~88   `Y8b.   `Y8b. 
 *    Y8b  d8 88booo. 88   88 db   8D db   8D 
 *     `Y88P' Y88888P YP   YP `8888Y' `8888Y' 
 *                                            
 *                                            
 */


const barValueAsPercentDef : boolean = false;
const heightDef: number | string = "50px"; //This would be horizonal bar height... one horizontal layer
const barValuesDef: 'val1' | 'sums' | 'avgs' | 'percents' = 'val1';
const titleLocationDef: 'top' | 'side' = 'top';
const randomPallets = [ColorsBlue, ColorsBrown, ColorsGray, ColorsGreen, ColorsRed];

export default class Cssreactbarchart extends React.Component<ICssreactbarchartProps, ICssreactbarchartState> {

  private getCurrentChartData( chartDataB4 : ICSSChartData[] ) {

    let chartDataAfter : ICSSChartData[] = [] ;

    if ( chartDataB4 && chartDataB4.length > 0 ) {
      chartDataB4.map( cd => {
        chartDataAfter.push( JSON.parse( JSON.stringify( cd ) ) ) ;
      });

    } else { 
      chartDataAfter.push( makeChartData(getRandomInt(5 , 30), 'Category') ) ;
      chartDataAfter.push( makeChartData(getRandomInt(5 , 30), 'Item') ) ;
      chartDataAfter.push( makeChartData(getRandomInt(5 , 20), 'Product') ) ;
    }

    return chartDataAfter;

  }

  private getCurrentChartSettings( chartSettingsB4 : ICSSChartSettings[] ) {

    let chartSettingsAfter : ICSSChartSettings[] = [] ;

    if ( chartSettingsB4 && chartSettingsB4.length > 0 ) {
      chartSettingsB4.map( cd => {
        chartSettingsAfter.push( JSON.parse( JSON.stringify( cd ) ) ) ;
      });
      //set activeType
      chartSettingsAfter.map( cd => { cd.activeType = 0; });

    } else { 
      chartSettingsAfter.push( makeChartSettings(getRandomInt(5 , 30), 'Category') ) ;
      chartSettingsAfter.push( makeChartSettings(getRandomInt(5 , 30), 'Item') ) ;
      chartSettingsAfter.push( makeChartSettings(getRandomInt(5 , 20), 'Product') ) ;
    }

    return chartSettingsAfter;

  }

  public constructor(props:ICssreactbarchartProps){
    super(props);

    let chartData : ICSSChartData[] = this.getCurrentChartData(this.props.chartData);
    let chartSettings : ICSSChartSettings[] = this.getCurrentChartSettings(this.props.chartSettings);

    let chartKeys = chartData.map( cd => {
      return cd.key;
    }).join('');

    let useProps = this.props.chartData !== null && this.props.chartData !== undefined && this.props.chartData.length > 0 ? true : false;

    this.state = { 
      chartData: chartData,
      chartSettings: chartSettings,
      useProps: useProps,
      chartKeys: chartKeys,
    };

  }
  
  public componentDidMount() {
//    this._updateStateOnPropsChange();
    console.log('Mounted!');
  }


  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

public componentDidUpdate(prevProps: ICssreactbarchartProps){

    let rebuildPart = false;
    let settingsChanged = false;
    let dataChanged = false;
    let otherChanged = false;
    console.log('DIDUPDATE setting chartData:', this.props.chartData);

    let prevChartKeys = prevProps.chartData.map( cd => {
      return cd.key;
    }).join('');

    let newChartKeys = this.props.chartData.map( cd => {
      return cd.key;
    }).join('');

    if ( prevChartKeys !== newChartKeys ) {
        rebuildPart = true;
    }

    if ( prevProps.chartSettings !== this.props.chartSettings ) {
      settingsChanged = true;
      rebuildPart = true;
    }
    if ( prevProps.chartData !== this.props.chartData ) {
      dataChanged = true;
      rebuildPart = true;
    }
    console.log('DIDUPDATE setting chartData:', rebuildPart );

    if (rebuildPart === true) {
      this._updateStateOnPropsChange( settingsChanged, dataChanged, rebuildPart );
    }
  }

  /***
   *    d8888b. db    db d8888b. db      d888888b  .o88b.      d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
   *    88  `8D 88    88 88  `8D 88        `88'   d8P  Y8      88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
   *    88oodD' 88    88 88oooY' 88         88    8P           88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
   *    88~~~   88    88 88~~~b. 88         88    8b           88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
   *    88      88b  d88 88   8D 88booo.   .88.   Y8b  d8      88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
   *    88      ~Y8888P' Y8888P' Y88888P Y888888P  `Y88P'      88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
   *                                                                                                            
   *                                                                                                            
   */

  public render(): React.ReactElement<ICssreactbarchartProps> {

    /***
 *    .d8888.  .d8b.  .88b  d88. d8888b. db      d88888b      d8888b.  .d8b.  d888888b  .d8b.  
 *    88'  YP d8' `8b 88'YbdP`88 88  `8D 88      88'          88  `8D d8' `8b `~~88~~' d8' `8b 
 *    `8bo.   88ooo88 88  88  88 88oodD' 88      88ooooo      88   88 88ooo88    88    88ooo88 
 *      `Y8b. 88~~~88 88  88  88 88~~~   88      88~~~~~      88   88 88~~~88    88    88~~~88 
 *    db   8D 88   88 88  88  88 88      88booo. 88.          88  .8D 88   88    88    88   88 
 *    `8888Y' YP   YP YP  YP  YP 88      Y88888P Y88888P      Y8888D' YP   YP    YP    YP   YP 
 *                                                                                             
 *                                                                                             
 */

    // Styles & Chart code for chart compliments of:  https://codepen.io/richardramsay/pen/ZKmQJv?editors=1010

    let chartData: ICSSChartData[] = this.state.chartData;
    let chartSettings : ICSSChartSettings[] = this.state.chartSettings;

    /***
     *    db       .d88b.   .d88b.  d8888b.       .o88b. db   db  .d8b.  d8888b. d888888b .d8888. 
     *    88      .8P  Y8. .8P  Y8. 88  `8D      d8P  Y8 88   88 d8' `8b 88  `8D `~~88~~' 88'  YP 
     *    88      88    88 88    88 88oodD'      8P      88ooo88 88ooo88 88oobY'    88    `8bo.   
     *    88      88    88 88    88 88~~~        8b      88~~~88 88~~~88 88`8b      88      `Y8b. 
     *    88booo. `8b  d8' `8b  d8' 88           Y8b  d8 88   88 88   88 88 `88.    88    db   8D 
     *    Y88888P  `Y88P'   `Y88P'  88            `Y88P' YP   YP YP   YP 88   YD    YP    `8888Y' 
     *                                                                                            
     *                                                                                            
     */


    let chartIdx = -1;

    let hasStylesFigure = false;
    let defaultStylesFigure: any = null;

    let hasStylesGraphic = false;
    let defaultStylesGraphic: any = null;

    let charts = chartData.map( ( cdO, j ) => {
      chartIdx ++ ;
//      console.log('buildingLabels:', cdO.labels.join(', '));
      let selectedChartID = [this.props.callBackID , chartIdx.toString()].join('|||');


     // barColors?: 'blue' | 'green' |'brown' | 'gray' | 'red' | 'brown' | 'themed' | 'custom' ;

      let sortOrder : ISeriesSort = 'asis';
      let stacked : boolean = null;
      let sortKey : ISeriesSort = null;
      let thisChartsSettings = chartSettings[j];
      let barValues : any = thisChartsSettings.barValues;  // barValues?: 'val1' | 'sums' | 'avgs' | 'percents' | string ;
      let isCollapsed : number = thisChartsSettings.isCollapsed;
      let activeType = thisChartsSettings.activeType;

      //2020-09-24:  Added this because the value array was getting mysteriously overwritten to nulls all the time.
      const cdOBarValues: number[] = JSON.parse(JSON.stringify(cdO.val1));
      cdO.percents = convertNumberArrayToRelativePercents( cdOBarValues );

      console.log('cssChart cdO - stats:', cdO);

      if ( this.state.useProps !== true ) {

      }
      
      let activeChartType = thisChartsSettings.chartTypes[activeType] ;
      if ( activeChartType === 'pareto-asc' ) {
        sortOrder = 'asc' ;
        sortKey = barValues;
        stacked = false;

      } else if ( activeChartType === 'pareto-dec' ) {
        sortOrder = 'dec' ;
        sortKey = barValues;
        stacked = false;

      } else if ( activeChartType === 'pareto-labels' ) {
        sortOrder = 'asc' ;
        sortKey = 'labels';
        stacked = false;

      } else if ( activeChartType === 'stacked-column-asc' ) {
        sortOrder = 'asc' ;
        sortKey = barValues;
        stacked = true;

      } else if ( activeChartType === 'stacked-column-dec' ) {
        sortOrder = 'dec' ;
        sortKey = barValues;
        stacked = true;

      } else if ( activeChartType === 'stacked-column-labels' ) {
        sortOrder = 'asc' ;
        sortKey = 'labels';
        stacked = true;

      } else if ( activeChartType === 'kpi-tiles' ) {
        sortOrder = 'asis' ;
        sortKey = 'labels';
        stacked = true;

      }


      /***
       *    .d8888. d888888b db    db db      d88888b      d888888b d8b   db d888888b d888888b d888888b  .d8b.  db      d888888b d88888D  .d8b.  d888888b d888888b  .d88b.  d8b   db 
       *    88'  YP `~~88~~' `8b  d8' 88      88'            `88'   888o  88   `88'   `~~88~~'   `88'   d8' `8b 88        `88'   YP  d8' d8' `8b `~~88~~'   `88'   .8P  Y8. 888o  88 
       *    `8bo.      88     `8bd8'  88      88ooooo         88    88V8o 88    88       88       88    88ooo88 88         88       d8'  88ooo88    88       88    88    88 88V8o 88 
       *      `Y8b.    88       88    88      88~~~~~         88    88 V8o88    88       88       88    88~~~88 88         88      d8'   88~~~88    88       88    88    88 88 V8o88 
       *    db   8D    88       88    88booo. 88.            .88.   88  V888   .88.      88      .88.   88   88 88booo.   .88.    d8' db 88   88    88      .88.   `8b  d8' 88  V888 
       *    `8888Y'    YP       YP    Y88888P Y88888P      Y888888P VP   V8P Y888888P    YP    Y888888P YP   YP Y88888P Y888888P d88888P YP   YP    YP    Y888888P  `Y88P'  VP   V8P 
       *                                                                                                                                                                             
       *                                                                                                                                                                             
       */

      let chartShowStyle = isCollapsed === 1 ? stylesC.chartHide : stylesC.chartShow ;
      
      let stylesAccor = thisChartsSettings.stylesChart && thisChartsSettings.stylesChart[activeType] ? thisChartsSettings.stylesChart[activeType] : null;

      let stylesChart = thisChartsSettings.stylesChart && thisChartsSettings.stylesChart[activeType] ? thisChartsSettings.stylesChart[activeType] : null;
      let stylesRow = thisChartsSettings.stylesRow && thisChartsSettings.stylesRow[activeType] ? thisChartsSettings.stylesRow[activeType] : null;
      let stylesTitle = thisChartsSettings.stylesTitle && thisChartsSettings.stylesTitle[activeType] ? thisChartsSettings.stylesTitle[activeType] : null;
      let stylesBlock = thisChartsSettings.stylesBlock && thisChartsSettings.stylesBlock[activeType] ? thisChartsSettings.stylesBlock[activeType] : null;
      let stylesLabel = thisChartsSettings.stylesLabel && thisChartsSettings.stylesLabel[activeType] ? thisChartsSettings.stylesLabel[activeType] : null;
      let stylesValue = thisChartsSettings.stylesValue && thisChartsSettings.stylesValue[activeType] ? thisChartsSettings.stylesValue[activeType] : null;

      let stylesFigure = thisChartsSettings.stylesFigure && thisChartsSettings.stylesFigure[activeType] ? thisChartsSettings.stylesFigure[activeType] : null;
      let stylesGraphic = thisChartsSettings.stylesGraphic && thisChartsSettings.stylesGraphic[activeType] ? thisChartsSettings.stylesGraphic[activeType] : null;

      // defaultStylesFigure was set as null and not changed so it will always null so why have it here?
      if ( stylesFigure !== null && hasStylesFigure === false && defaultStylesFigure === null ) {
        hasStylesFigure = true;
        defaultStylesFigure = stylesFigure;
      }

      // defaultStylesGraphic was set as null and not changed so it will always null so why have it here?
      if ( stylesGraphic !== null && hasStylesGraphic === false && defaultStylesGraphic === null ) {
        hasStylesGraphic = true;
        defaultStylesGraphic = stylesFigure;
      }

      /**
       * Set chart defaults
       */

//      let sortOrder = this.state.useProps === true && cdO.sortOrder !== undefined ? cdO.sortOrder : getRandomFromArray([false,'asc','dec']);
      let barValueAsPercent = this.state.useProps === true && cdO.barValueAsPercent !== undefined ? cdO.barValueAsPercent : getRandomFromArray([true,false]);
      let height = this.state.useProps === true && thisChartsSettings.height ? thisChartsSettings.height : heightDef;
      let titleLocation = this.state.useProps === true && thisChartsSettings.titleLocation ? thisChartsSettings.titleLocation : titleLocationDef;
      let stateHeight = stacked === false ? "40px" : height;
      let randomPallet = getRandomFromArray(randomPallets);
      let randomizeColors = this.state.useProps === true && thisChartsSettings.barColors ? false : true ;

      if ( stacked === false && cdOBarValues.length > 15 ) { stateHeight = '20px'; }
      else if ( stacked === false && cdOBarValues.length > 8 ) { stateHeight = '30px'; }
      else { stateHeight = '40px'; }

      let cd : ICSSChartData = null;

      if ( sortOrder !== 'asis' ) {
        let otherKeysToSort = ['labels', barValues];
        if ( cdO.percents !== undefined ) { otherKeysToSort.push('percents') ; }
        cd = sortKeysByOtherKey( cdO, sortKey, sortOrder, 'number', otherKeysToSort );
      } else {
        cd = cdO;
      }

      let chartValueArray: number[] = cd.val1;

      let thisChart : any[] = [];
      let maxNumber: number = Math.max( ...chartValueArray );  //Need to use ... spread in math operators:  https://stackoverflow.com/a/1669222
      let minNumber: number = Math.min( ...chartValueArray );  //Need to use ... spread in math operators:  https://stackoverflow.com/a/1669222

      let maxDecimal: number = 0;
      chartValueArray.map( v => {
        let decimal = v % 1;
        if ( decimal > maxDecimal ) { maxDecimal = decimal; }
       });


      let minDivisor = null;
      let maxDivisor = null;
      if ( minNumber >= 1000000 ) { minDivisor = 1000000 ; }
//      else if ( minNumber >= 100000 ) { minDivisor = 100000 ; }
//      else if ( minNumber >= 10000 ) { minDivisor = 10000 ; }
      else if ( minNumber >= 1000 ) { minDivisor = 1000 ; }
//      else if ( minNumber >= 100 ) { minDivisor = 100 ; }
//      else if ( minNumber >= 10 ) { minDivisor = 10 ; }
      else if ( minNumber >= 1 ) { minDivisor = 1 ; }
      else if ( minNumber >= .1 ) { minDivisor = .1 ; }
      else if ( minNumber >= .01 ) { minDivisor = .01 ; }
      else if ( minNumber >= .001 ) { minDivisor = .001 ; }

      let chartRange = maxNumber - minNumber;
      let leftEdgeValue = Math.floor( minNumber - chartRange * .1 );
      if ( leftEdgeValue < 0 && minNumber >= 1 ) { leftEdgeValue = 0 ; } //Set to zero if it's close to 
      let rightEdgeValue = maxNumber;

      let leftEdgeLabel = maxDecimal === 0 ? parseInt(leftEdgeValue.toFixed()) : leftEdgeValue.toPrecision(3) ;
      let rightEdgeLabel = maxDecimal === 0 ? parseInt(rightEdgeValue.toFixed()) : rightEdgeValue.toPrecision(3) ;

      let scaleNote = 'Scale: '  + leftEdgeLabel + ' to ' + rightEdgeLabel;

      //https://stackoverflow.com/a/2901298/4210807 - get string value with commas
      if ( minDivisor > 1 ) { scaleNote += ' in ' + minDivisor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

      let scaleNoteEle = <div style= {{ paddingBottom: 10, paddingTop: 10, fontWeight: 600 , fontSize: 'smaller', lineHeight: '.75em' }} title={ scaleNote } > { scaleNote }</div>;

//      console.log('chartData after: cd', cd );
//      console.log('chartData minNumber, maxNumber:', minNumber, maxNumber );
//     console.log('chartData range:', leftEdgeValue, rightEdgeValue, chartRange );
      /***
       *    .88b  d88.  .d8b.  db   dD d88888b      d8888b.  .d8b.  d8888b. .d8888. 
       *    88'YbdP`88 d8' `8b 88 ,8P' 88'          88  `8D d8' `8b 88  `8D 88'  YP 
       *    88  88  88 88ooo88 88,8P   88ooooo      88oooY' 88ooo88 88oobY' `8bo.   
       *    88  88  88 88~~~88 88`8b   88~~~~~      88~~~b. 88~~~88 88`8b     `Y8b. 
       *    88  88  88 88   88 88 `88. 88.          88   8D 88   88 88 `88. db   8D 
       *    YP  YP  YP YP   YP YP   YD Y88888P      Y8888P' YP   YP 88   YD `8888Y' 
       *                                                                            
       *                                                                            
       */

      let barCount = 0;
      for ( let i in chartValueArray ){
        barCount ++;
        let blockStyle : any = stylesBlock != null ? stylesBlock : {} ;
        blockStyle.height = activeChartType === 'kpi-tiles' ? blockStyle.height : stateHeight;
        blockStyle.width = ( cd.percents[i] ) + '%';
        
        if ( randomizeColors && stacked === true ) {
          blockStyle.backgroundColor = getRandomFromArray( randomPallet );
          blockStyle.color = 'black';

        } else {
          let cZ : any = ( parseInt(i, 10) ) % randomPallet.length;
          blockStyle.backgroundColor = randomPallet [ cZ ] ;
          blockStyle.color = 'black';

        }

        let valueStyle : any = stylesValue != null ? stylesValue : {} ;
        let labelStyle : any = stylesLabel != null ? stylesLabel : {} ; 

        

        let barNumber = null;
        if ( minDivisor > 1 ) {
          barNumber = ( chartValueArray[i] / minDivisor ).toFixed(1) ;
          
        } else {
          if ( thisChartsSettings.valueIsCount ) {
            barNumber = chartValueArray[i];
          } else if ( chartValueArray[i] == null || chartValueArray[i] == undefined ) {
            barNumber = null;
          } else {
            barNumber = chartValueArray[i].toPrecision(3) ;
          }
        }

        let barLabel: any = barValueAsPercent === true ?
          ( cd.percents[i].toFixed(1) ) + '%' : maxDecimal === 0 && typeof barNumber === 'string' ? parseInt(barNumber) : barNumber ;

        if ( stacked === false ) { 

          if ( stateHeight === '30px' ) {
            valueStyle.top = '7px' ;
            valueStyle.fontSize = 'small';
          }

          if ( stateHeight === '20px' ) {
            valueStyle.top = '1px' ;
            valueStyle.fontSize = 'smaller';
          }

          //This is on scale of 0 to 100
          let barPercent = ( chartValueArray[i] / maxNumber ) * 100;
          //This is adjusting the left side of chart for better perato look
          let scaledBarPercent = 100 * ( chartValueArray[i] - leftEdgeValue ) / ( rightEdgeValue - leftEdgeValue ) ;
          barPercent = scaledBarPercent;

          //This accounts for when all bars are equal.
          if ( minNumber === maxNumber ) { barPercent = 100; } 

          blockStyle.float = 'none' ;
          blockStyle.width = barPercent + '%';
          barLabel += ' - ' + cd.labels[i];
          blockStyle.whiteSpace = 'nowrap';

          if ( barPercent < 50 ) {
            console.log('chartData barPercent < 50' );
            blockStyle.overflow = 'visible';

            let leftValue = barPercent < 1 ? '7%' : ( 1 + ( 1.2 * barPercent / 100 ) * 100 ) + '%'; 
            valueStyle.left = '20px';
            valueStyle.transform = 'translateX(100%)';
            valueStyle.position = 'relative';
            blockStyle.color = 'black';

          }

        } else { //This is stacked bar loop

            valueStyle.top = '.75em' ;
            valueStyle.fontSize = 'smaller';

        }

        if ( activeChartType === 'kpi-tiles' ) {
          blockStyle.height = blockStyle.height ? blockStyle.height : '75px' ;
          blockStyle.textAlign = blockStyle.textAlign ? blockStyle.textAlign : 'center' ;
          blockStyle.margin = blockStyle.margin ? blockStyle.margin : '10px' ;
          blockStyle.minWidth = blockStyle.minWidth ? blockStyle.minWidth : '100px' ;
          blockStyle.left = '-10px'; //Added to accomodate 10px shift to right with margin around boxes

          barLabel = <div><div style={{fontSize: 'smaller', marginTop : '5px', marginBottom : '5px'}}> { cd.labels[i] }</div><div style={{fontSize: 'larger', }}> { barLabel }</div></div>;
        }
//        console.log('chartData valueStyle:', valueStyle );

        thisChart.push(
          <span id= { selectedChartID } onClick={ this.onClick.bind(this) } className={ [stylesC.block, stylesC.innerShadow].join(' ') } style={ blockStyle } title={ cd.labels[i] } >
              <span className={ stylesC.value } style={ valueStyle } >{ barLabel }</span>
          </span>
        ) ;
      }// END MAKE BARS

      if ( stacked === false ) {  thisChart.push( scaleNoteEle ) ; }

      let thisTitleStyle : any = stylesTitle != null ? stylesTitle : {} ;
      thisTitleStyle.lineHeight = '40px';
      thisTitleStyle.fontSize = 18;
      thisTitleStyle.fontWeight = '600';

      let thisRowStyle : any = stylesRow != null ? stylesRow : {} ;
      thisRowStyle.lineHeight = stateHeight;
      thisRowStyle.fontSize = 18;
      thisRowStyle.fontWeight = '600';

      if ( stacked === false ) { 
        thisRowStyle.maxWidth = '100%';
        thisRowStyle.marginBottom = thisRowStyle.marginBottom ? thisRowStyle.marginBottom : null;
      }



      
      let thisScale = '';
      if ( minDivisor === 1000000 ) {  thisScale = ' in Millions' ; }
      else if ( minDivisor === 1000 ) {  thisScale = ' in Thousands' ; }

      let theTitle = thisChartsSettings.title + thisScale;

      let totalE3 = 1;
      let totalScale = '';
      if ( cdO.total > 1000000000 ) { totalE3 = 1000000000; totalScale = " B"; }
      else if ( cdO.total > 1000000 ) { totalE3 = 1000000; totalScale = " M"; }
      else if ( cdO.total > 1000 ) { totalE3 = 1000; totalScale = " k"; }

      let chartTotal = cdO.total ? ( cdO.total / totalE3 ).toFixed(1) + totalScale + ' in ': null;
      let subTitle = <span style={{paddingLeft: '15px', fontSize: 'small'}}>( { chartTotal } { barCount} categories ) </span>;

      let titleEle1 = null;
      let titleEle2 = null;

      let titleEle2Style = { lineHeight: 0, paddingBottom: '15px', paddingTop: '5px' };

      if ( titleLocation === 'side' ) {
        titleEle1 = <h6 style={ thisTitleStyle }>{ theTitle }</h6>;
        titleEle2 = thisScale === '' ? null : <div style={ titleEle2Style }> { subTitle } </div>;

      } else if ( this.props.WebpartWidth > 400 ) {
        titleEle1 = <div style={ thisTitleStyle }>{ theTitle } { thisScale === '' ? subTitle : null } </div>;
        titleEle2 = thisScale === '' ? null : <div style={ titleEle2Style }> { subTitle } </div>;

      } else {
        titleEle1 = <div style={ thisTitleStyle }>{ theTitle } </div>;
        titleEle2 = <div style={ titleEle2Style }> { subTitle } </div>;

      }

      if ( isCollapsed === 1 || isCollapsed === 0 ) {
        //show titleEle1 in accordion
        titleEle1 = <div 
          id= { selectedChartID } 
          onClick={ this.onAccordionClick.bind(this) } 
          className={ [stylesC.titleBlock, stylesC.innerShadow].join(' ') } 
          style={ {marginBottom: isCollapsed === 0 ? '10px' : '0px' } } 
          title={ theTitle } >
            { titleEle1 }
        </div>;
      }


      return <div key={j} className={ stylesC.row } style={ thisRowStyle }>

        <div className={ stylesC.chart } style= { stylesChart } >
          { titleEle1 }
          <div className={ chartShowStyle } style={{  }}>
            { titleEle2 }
              { thisChart }
            </div>
          </div>


        </div>;
    });

    /***
     *    d8888b. d88888b d888888b db    db d8888b. d8b   db 
     *    88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
     *    88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
     *    88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
     *    88 `88. 88.        88    88b  d88 88 `88. 88  V888 
     *    88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
     *                                                       
     *                                                       
     */
/**
 *          Adding this would add left y-axis title
 *          <div className={ stylesC.yAxis } >
              <h3>Chart Title</h3>
            </div>
 */


    //console.log( 'defaultStylesFigure:', defaultStylesFigure );
    //console.log( 'defaultStylesGraphic:', defaultStylesGraphic );

    return (
      <div className={ styles.cssreactbarchart } style = {{  }}>
          <figure id={ defaultStylesFigure } className={ stylesC.cssChart } style={ defaultStylesFigure }>
            <div className={ stylesC.graphic } style={ defaultStylesGraphic } >
              { charts }
            </div>
          </figure>
      </div>
    );
  }

  private onAccordionClick( item: any ) {

    
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    let value = 'TBD';
    let chartIdx = null;
    if ( e.target.innerText != '' ) {
      value = e.target.innerText;   
      chartIdx = e.target.id;
      if ( chartIdx === '' && item.currentTarget ) { chartIdx = item.currentTarget.id; }

    } else if ( item.currentTarget.innerText != '' ){
      value = item.currentTarget.innerText;
      chartIdx = item.currentTarget.id;
      if ( chartIdx === '' && item.target ) { chartIdx = item.target.id; }

    }

    let isAltClick = e.altKey;
    let isShfitClick = e.shiftKey;
    let isCtrlClick = e.ctrlKey;

    console.log('clicked:  ' , chartIdx, value );
    console.log('AltClick, ShfitClick, CtrlClick:', isAltClick, isShfitClick, isCtrlClick );

    if ( this.state.useProps === true && chartIdx !== null ) {

      //[this.props.callBackID , chartIdx.toString()].join('|||');
      let thisID = chartIdx.split('|||');
      let thisChartIndex = thisID[1];
      let callBackID = thisID[0];

      console.log('thisID, thisChartIndex,callBackID' ,thisID , thisChartIndex, callBackID );

      if ( isAltClick === true && this.props.onAltClick ) {
        this.props.onAltClick( callBackID, value );

      } else {

        let chartSettings = this.state.chartSettings;

        console.log('Prev chart type:', chartSettings[thisChartIndex].isCollapsed );
        let isCollapsed = chartSettings[thisChartIndex].isCollapsed;

        //If current chart's accordion ==== true then set to false,   if  it's false then set to true, else leave as null ( no accordion )

        if ( isCollapsed === 1 ) {
          isCollapsed = 0;
        } else if ( isCollapsed === 0 ) {
          isCollapsed = 1;
        }

        console.log('Collapsed prev vs new:', chartSettings[thisChartIndex].isCollapsed, isCollapsed );
        chartSettings[thisChartIndex].isCollapsed = isCollapsed;

        this.setState({
          chartSettings: chartSettings,
        });

      }
    }

  }

  private onClick(item: any ) {

    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    let value = 'TBD';
    let chartIdx = null;
    if ( e.target.innerText != '' ) {
      value = e.target.innerText;   
      chartIdx = e.target.id;
      if ( chartIdx === '' && item.currentTarget ) { chartIdx = item.currentTarget.id; }

    } else if ( item.currentTarget.innerText != '' ){
      value = item.currentTarget.innerText;
      chartIdx = item.currentTarget.id;
      if ( chartIdx === '' && item.target ) { chartIdx = item.target.id; }

    }

    let isAltClick = e.altKey;
    let isShfitClick = e.shiftKey;
    let isCtrlClick = e.ctrlKey;

    console.log('clicked:  ' , chartIdx, value );
    console.log('AltClick, ShfitClick, CtrlClick:', isAltClick, isShfitClick, isCtrlClick );

    if ( this.state.useProps === true && chartIdx !== null ) {

      //[this.props.callBackID , chartIdx.toString()].join('|||');
      let thisID = chartIdx.split('|||');
      let thisChartIndex = thisID[1];
      let callBackID = thisID[0];

      console.log('thisID, thisChartIndex,callBackID' ,thisID , thisChartIndex, callBackID );

      if ( isAltClick === true && this.props.onAltClick ) {
        this.props.onAltClick( callBackID, value );

      } else {

        let chartSettings = this.state.chartSettings;

        console.log('Prev chart type:', chartSettings[thisChartIndex].chartTypes[ chartSettings[thisChartIndex].activeType ] );

        let chartTypesCount = chartSettings[thisChartIndex].chartTypes.length;
        let activeType = chartSettings[thisChartIndex].activeType;
        let nextType =  chartTypesCount - 1 === activeType ? 0 : activeType + 1;
        chartSettings[thisChartIndex].activeType = nextType;

        console.log('Prev chart type:', chartSettings[thisChartIndex].chartTypes[ chartSettings[thisChartIndex].activeType ] );

        this.setState({
          chartSettings: chartSettings,
        });

      }
    }
  }

  /**   This is the legend code:
   *        <div className={ stylesC.xAxis } >
              <h3>X-Axis Title</h3>
              <ul className={ stylesC.legend } >
                <li>Category A</li>
                <li>Category B</li>
                <li>Category C</li>
                <li>Category D</li>
                <li>Category E</li>
                <li>Category F</li>
              </ul>
            </div>
   */

    private _updateStateOnPropsChange( settingsChanged: boolean, dataChanged: boolean, other : boolean ): void {

      let chartData : ICSSChartData[] = dataChanged !== true ? this.state.chartData : this.getCurrentChartData(this.props.chartData);
      let chartSettings : ICSSChartSettings[] = settingsChanged !== true ? this.state.chartSettings : this.getCurrentChartSettings(this.props.chartSettings);

      let chartKeys = dataChanged !== true ? this.state.chartKeys :
        chartData.map( cd => {
            return cd.key;
        }).join('');
  
      let useProps = this.props.chartData !== null && this.props.chartData !== undefined && this.props.chartData.length > 0 ? true : false;
  
      this.setState({
        chartSettings: chartSettings,
        chartData: chartData,
        useProps: useProps,
        chartKeys: chartKeys,
      });  
      
    }

}


/**
 * 
 *              <div className={ stylesC.row } >
                <h6>Bar Two</h6>
                <div className={ stylesC.chart } >
                  <span className={ stylesC.block} title={ "Category A" } >
                      <span className={ stylesC.value } >29%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category B" } >
                      <span className={ stylesC.value } >21%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category C" } >
                      <span className={ stylesC.value } >19%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category D" } >
                      <span className={ stylesC.value } >6%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category E" } >
                      <span className={ stylesC.value } >19%</span>
                  </span>
                  <span className={ stylesC.block} title={ "Category F" } >
                      <span className={ stylesC.value } >6%</span>
                  </span>
                </div>
              </div>


 */