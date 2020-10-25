import * as React from 'react';
import styles from './CssChart.module.scss';
import { ICssChartProps } from './ICssChartProps';
import { ICssChartState } from './ICssChartState';

import { escape } from '@microsoft/sp-lodash-subset';

import Cssreactbarchart from '../../drilldown7/components/CssCharts/Cssreactbarchart';

import {buildSummaryCountChartsObject ,  buildStatChartsArray} from '../../drilldown7/components/CssCharts/cssChartFunctions';


export default class CssChart extends React.Component<ICssChartProps, {}> {


  /***
   *    d8888b. db    db d888888b db      d8888b.      .d8888. d888888b  .d8b.  d888888b       .o88b. db   db  .d8b.  d8888b. d888888b .d8888. 
   *    88  `8D 88    88   `88'   88      88  `8D      88'  YP `~~88~~' d8' `8b `~~88~~'      d8P  Y8 88   88 d8' `8b 88  `8D `~~88~~' 88'  YP 
   *    88oooY' 88    88    88    88      88   88      `8bo.      88    88ooo88    88         8P      88ooo88 88ooo88 88oobY'    88    `8bo.   
   *    88~~~b. 88    88    88    88      88   88        `Y8b.    88    88~~~88    88         8b      88~~~88 88~~~88 88`8b      88      `Y8b. 
   *    88   8D 88b  d88   .88.   88booo. 88  .8D      db   8D    88    88   88    88         Y8b  d8 88   88 88   88 88 `88.    88    db   8D 
   *    Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      `8888Y'    YP    YP   YP    YP          `Y88P' YP   YP YP   YP 88   YD    YP    `8888Y' 
   *                                                                                                                                           
   *                                                                                                                                           
   */

  private buildStatCharts( resultSummaryArray ) {

    let resultSummary = null;
    let theseCharts : any[] = [];
    if ( resultSummaryArray == null || resultSummaryArray.length === 0 ) {
        //Do nothing

    } else {
        resultSummaryArray.map( chartDataObject => {

            resultSummary = 
            <Cssreactbarchart 
                chartData = { chartDataObject.chartData }
                callBackID = { chartDataObject.callBackID }
                //onAltClick = { this.changeRefinerOrder.bind(this) }
            ></Cssreactbarchart>;

            theseCharts.push( resultSummary );

        });
    }

    return theseCharts;

  }

  public render(): React.ReactElement<ICssChartProps> {

    let statCharts : any = null;
    let hasStats = this.props.stats && this.props.stats.length > 0 ? true : false;
    let hasRefiner = this.props.refinerObj && this.props.refinerObj.childrenKeys.length ? true : false;
    if ( hasStats === true && hasRefiner === true ) { 
        let resultSummaryArray = buildStatChartsArray( this.props.stats, this.props.callBackID, this.props.refinerObj );
        statCharts = this.buildStatCharts( resultSummaryArray ); 
    }

    return (
      <div className={ styles.cssChart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div> { statCharts } </div>
          </div>
        </div>
      </div>
    );
  }
}
