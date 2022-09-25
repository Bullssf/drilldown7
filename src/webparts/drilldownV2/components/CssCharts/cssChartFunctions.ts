// import { toAbsoluteUrl } from '@pnp/sp';
import { ICSSChartSettings, ICSSChartData, } from '../Drill/IDrillProps';

import { IRefinerLayer, IRefinerStat, ICSSChartTypes } from '../../fpsReferences';

export function buildCountChartsObject( title: string, callBackID: string, refinerObj: IRefinerLayer , chartTypes: ICSSChartTypes[] ) {
    let resultSummaryObject = null;

    let labels = refinerObj.childrenKeys ;
    let counts = refinerObj.childrenMultiCounts;

    let total = 0;
    refinerObj.childrenCounts.map( ( v ) => { total += v; });
    
    let chartKey : string = labels.join('') + counts.join('');

//        console.log('buildCountChartsObject labels:', labels );
//        console.log('buildCountChartsObject counts:', counts );

    let chartSettings: ICSSChartSettings = {
        title: title,
        chartTypes: chartTypes,
        valueIsCount: true,

        //This needs to match the property in chartData that has the data so it's hard coded to match it below
        barValues: 'val1',

        stylesChart: { paddingBottom: 0, marginBottom: 0, marginTop: 0},
        isCollapsed: 1,

    };

    let chartData : ICSSChartData = {

        labels: labels,
        barValueAsPercent: false,
        key: chartKey,

        //The property key here must match the barValues key set above
        val1: counts ,
        total: total,

    };
//        console.log('2 Creating Chart data: ',labels );
//        console.log('2 Creating Chart data: ',counts );

    resultSummaryObject = {
        chartData :  [chartData],
        chartSettings :  [chartSettings],
        callBackID :  callBackID ,
    };

    return resultSummaryObject;

}

/**
 * 
 * @param stats 
 * @param callBackID 
 * @param refinerObj 
 * @param consumer 
 * @returns 
 */
export function buildStatChartsArray(  stats: IRefinerStat[], callBackID: string, refinerObj: IRefinerLayer , consumer: 0 | 1 | 2 | 3 = 0 ) {
    let resultStatObject = null;
    let theseCharts : any[] = [];
    let i = -1;
    console.log('buildStatChartsArray - stats:', stats);

    if ( refinerObj === null || stats === null || stats.length === 0 ) {
        //Do nothing

    } else {
        stats.map( s => {
            i ++;
            const statKey : string = `stat${i}`;
            const statKeyCount : string = `stat${i}Count`;
            let thisConsumer = s.consumer ? s.consumer : 0 ;

            if ( consumer === thisConsumer ) {

                let labels = refinerObj.childrenKeys ;
                let theseStats: number[] = refinerObj[statKey] as  number[] ;
                let finalStats = [];
                let theseCount: number[] = refinerObj[statKeyCount] as  number[] ;
                let total: number | null = null;
                let totalDiv: number | null = null;
                if ( s.stat === 'avg' ) {
                    theseStats.map( ( v: number, iV: number ) => {
                        finalStats.push( theseCount[ iV ] === 0 ? null : v / theseCount[ iV ] ) ;
                        total += v;
                        totalDiv += theseCount[ iV ];
                    });
                    total = total / totalDiv;
                } else { 
                    finalStats = JSON.parse( JSON.stringify( theseStats ) ) ;
                    if ( s.stat === 'count' ) {
                        theseCount.map( ( v: number ) => { total += v; });
                    } else if ( s.stat === 'min' ) {
                        theseStats.map( ( v: number ) => { if ( total === null || v < total ) { total = v; }  });
                    } else if ( s.stat === 'max' ) {
                        theseStats.map( ( v: number ) => { if ( total === null || v > total ) { total = v; }  });
                    } else if ( s.stat === 'sum' ) {
                        theseStats.map( ( v: number ) => { total += v; });
                    }

                }

                let chartKey : string = labels.join('') + theseCount.join('');
        
                let defStylesChart = [{ paddingBottom: 0, marginBottom: 0, marginTop: 0}];
                let defStylesRow = [{ paddingBottom: 0, marginBottom: 0, marginTop: 0}];

                let chartSettings: ICSSChartSettings = {
                    title: s.title,
                    chartTypes: s.chartTypes,

                    //This needs to match the property in chartData that has the data so it's hard coded to match it below
                    barValues: 'val1',  

                    stylesChart: s.stylesChart ? s.stylesChart : defStylesChart,
                    stylesTitle: s.stylesTitle === null ? null : s.stylesTitle,
                    stylesRow: s.stylesRow ? s.stylesRow : defStylesRow,
                    stylesBlock: s.stylesBlock === null ? null : s.stylesBlock,
                    stylesLabel: s.stylesLabel === null ? null : s.stylesLabel,
                    stylesValue: s.stylesValue === null ? null : s.stylesValue,

                    stylesFigure: s.stylesFigure === null ? null : s.stylesFigure,
                    stylesGraphic: s.stylesGraphic === null ? null : s.stylesGraphic,

                    isCollapsed: s.isCollapsed === null ? null : s.isCollapsed ,

                };

                let chartData : ICSSChartData = {

                    labels: labels,
                    barValueAsPercent: false,
                    key: chartKey,

                    //The property key here must match the barValues key set above
                    val1: finalStats ,
                    total: total,

                };
        
                resultStatObject = {
                    chartSettings :  [chartSettings],
                    chartData :  [chartData],
                    callBackID :  callBackID ,
                };
            
                theseCharts.push( resultStatObject );

            }
        });
    }

    return theseCharts;  //  { chartData : ICSSChartSeries[], callBackID: string }[]

}
