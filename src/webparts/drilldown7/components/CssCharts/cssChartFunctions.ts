import { ICSSChartSeries, ICSSChartTypes, CSSChartTypes, ISeriesSort, IRefinerLayer, IRefinerStat } from '../IReUsableInterfaces';

export function buildSummaryCountChartsObject( title: string, callBackID: string, refinerObj: IRefinerLayer , chartTypes: ICSSChartTypes[] ) {
    let resultSummaryObject = null;

    let labels = refinerObj.childrenKeys ;
    let counts = refinerObj.childrenMultiCounts;

    let chartKey : string = labels.join('') + counts.join('');

//        console.log('buildSummaryCountCharts labels:', labels );
//        console.log('buildSummaryCountCharts counts:', counts );

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

        stylesChart: { paddingBottom: 0, marginBottom: 0, marginTop: 0},

    };
//        console.log('2 Creating Chart data: ',labels );
//        console.log('2 Creating Chart data: ',counts );

    resultSummaryObject = {
        chartData :  [chartData],
        callBackID :  callBackID ,
    };

    return resultSummaryObject;

}

export function buildStatChartsArray(  stats: IRefinerStat[], callBackID: string, refinerObj: IRefinerLayer , ) {
    let resultSummaryObject = null;
    let theseCharts : any[] = [];
    let i = -1;
    if ( refinerObj == null || stats == null || stats.length === 0 ) {
        //Do nothing

    } else {
        stats.map( s => {
            i ++;
            let labels = refinerObj.childrenKeys ;
            let theseStats = refinerObj['stat' + i] ;
            let finalStats = [];
            let theseCount = refinerObj['stat' + i + 'Count'];

            if ( s.stat === 'avg' ) {
                theseStats.map( ( v, iV ) => {
                    finalStats.push( theseCount[ iV ] == 0 ? null : v / theseCount[ iV ] ) ;
                });
            } else { finalStats = JSON.parse( JSON.stringify( theseStats ) ) ; }

            let chartKey : string = labels.join('') + theseCount.join('');
    
            let chartData : ICSSChartSeries = {
                title: s.title,
                labels: labels,
                chartTypes: s.chartTypes,
                barValueAsPercent: false,

                //The string value here must match the object key below
                barValues: 'val1',
                val1: finalStats ,
                key: chartKey,
    
                stylesChart: { paddingBottom: 0, marginBottom: 0, marginTop: 0},
                stylesRow: { paddingBottom: 0, marginBottom: 0, marginTop: 0},
                stylesBlock: s.stylesBlock ? s.stylesBlock : null,
            };
    
            resultSummaryObject = {
                chartData :  [chartData],
                callBackID :  callBackID ,
            };
        
    
            theseCharts.push( resultSummaryObject );

        });
    }

    return theseCharts;  //  { chartData : ICSSChartSeries[], callBackID: string }[]

}
