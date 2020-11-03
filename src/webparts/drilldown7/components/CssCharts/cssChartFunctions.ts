import { toAbsoluteUrl } from '@pnp/sp';
import { ICSSChartSeries, ICSSChartTypes, CSSChartTypes, ISeriesSort, IRefinerLayer, IRefinerStat } from '../IReUsableInterfaces';

export function buildCountChartsObject( title: string, callBackID: string, refinerObj: IRefinerLayer , chartTypes: ICSSChartTypes[] ) {
    let resultSummaryObject = null;

    let labels = refinerObj.childrenKeys ;
    let counts = refinerObj.childrenMultiCounts;

    let total = 0;
    refinerObj.childrenCounts.map( ( v ) => { total += v; });
    
    let chartKey : string = labels.join('') + counts.join('');

//        console.log('buildCountChartsObject labels:', labels );
//        console.log('buildCountChartsObject counts:', counts );

    let chartData : ICSSChartSeries = {
        title: title,
        labels: labels,
        chartTypes: chartTypes,
        barValueAsPercent: false,
        valueIsCount: true,

        //The string value here must match the object key below
        barValues: 'val1',
        val1: counts ,
        key: chartKey,
        total: total,

        stylesChart: { paddingBottom: 0, marginBottom: 0, marginTop: 0},

        collapsed: null,

    };
//        console.log('2 Creating Chart data: ',labels );
//        console.log('2 Creating Chart data: ',counts );

    resultSummaryObject = {
        chartData :  [chartData],
        callBackID :  callBackID ,
    };

    return resultSummaryObject;

}

export function buildStatChartsArray(  stats: IRefinerStat[], callBackID: string, refinerObj: IRefinerLayer , consumer: 0 | 1 | 2 | 3 = 0 ) {
    let resultStatObject = null;
    let theseCharts : any[] = [];
    let i = -1;
    if ( refinerObj == null || stats == null || stats.length === 0 ) {
        //Do nothing

    } else {
        stats.map( s => {
            i ++;
            let thisConsumer = s.consumer ? s.consumer : 0 ;

            if ( consumer === thisConsumer ) {

                let labels = refinerObj.childrenKeys ;
                let theseStats = refinerObj['stat' + i] ;
                let finalStats = [];
                let theseCount = refinerObj['stat' + i + 'Count'];
                let total = null;
                let totalDiv = null;
                if ( s.stat === 'avg' ) {
                    theseStats.map( ( v, iV ) => {
                        finalStats.push( theseCount[ iV ] == 0 ? null : v / theseCount[ iV ] ) ;
                        total += v;
                        totalDiv += theseCount[ iV ];
                    });
                    total = total / totalDiv;
                } else { 
                    finalStats = JSON.parse( JSON.stringify( theseStats ) ) ;
                    if ( s.stat === 'count' ) {
                        theseCount.map( ( v ) => { total += v; });
                    } else if ( s.stat === 'min' ) {
                        theseStats.map( ( v ) => { if ( total === null || v < total ) { total = v; }  });
                    } else if ( s.stat === 'max' ) {
                        theseStats.map( ( v ) => { if ( total === null || v > total ) { total = v; }  });
                    } else if ( s.stat === 'sum' ) {
                        theseStats.map( ( v ) => { total += v; });
                    }
                    
                }

                let chartKey : string = labels.join('') + theseCount.join('');
        
                let defStylesChart = [{ paddingBottom: 0, marginBottom: 0, marginTop: 0}];
                let defStylesRow = [{ paddingBottom: 0, marginBottom: 0, marginTop: 0}];

                let chartData : ICSSChartSeries = {
                    title: s.title,
                    labels: labels,
                    chartTypes: s.chartTypes,
                    barValueAsPercent: false,

                    //The string value here must match the object key below
                    barValues: 'val1',
                    val1: finalStats ,
                    key: chartKey,

                    total: total,
                    
                    stylesChart: s.stylesChart ? s.stylesChart : defStylesChart,
                    stylesTitle: s.stylesTitle ? s.stylesTitle : null,
                    stylesRow: s.stylesRow ? s.stylesRow : defStylesRow,
                    stylesBlock: s.stylesBlock ? s.stylesBlock : null,
                    stylesLabel: s.stylesLabel ? s.stylesLabel : null,
                    stylesValue: s.stylesValue ? s.stylesValue : null,

                    stylesFigure: s.stylesFigure ? s.stylesFigure : null,
                    stylesGraphic: s.stylesGraphic ? s.stylesGraphic : null,

                    collapsed: s.collapsed ? s.collapsed : null,

                };
        
                resultStatObject = {
                    chartData :  [chartData],
                    callBackID :  callBackID ,
                };
            
        
                theseCharts.push( resultStatObject );

                
            }
        });
    }

    return theseCharts;  //  { chartData : ICSSChartSeries[], callBackID: string }[]

}
