import * as React from 'react';
import styles from './CssChart.module.scss';
import { ICssChartProps } from './ICssChartProps';
import { ICssChartState } from './ICssChartState';

import { escape } from '@microsoft/sp-lodash-subset';

import Cssreactbarchart from '../../drilldown7/components/CssCharts/Cssreactbarchart';

import {buildCountChartsObject ,  buildStatChartsArray} from '../../drilldown7/components/CssCharts/cssChartFunctions';

//For Webpart Title component
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";


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
                WebpartWidth = { this.props.WebpartWidth }
                //onAltClick = { this.changeRefinerOrder.bind(this) }
            ></Cssreactbarchart>;

            theseCharts.push( resultSummary );

        });
    }

    return theseCharts;

  }

  
  public componentDidMount() {
    this._updateStateOnPropsChange();
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

public componentDidUpdate(prevProps){

    let rebuildPart = false;
   console.log('DIDUPDATE setting:', this.props);

    if ( prevProps.cssChartDD !== this.props.cssChartDD) {  rebuildPart = true ; }
    if ( prevProps.stylesChartTitle !== this.props.stylesChartTitle) {  rebuildPart = true ; }
    if ( prevProps.WebpartWidth !== this.props.WebpartWidth) {  rebuildPart = true ; }    
    
    if (rebuildPart === true) {
      this._updateStateOnPropsChange();
    }
  }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

  public render(): React.ReactElement<ICssChartProps> {

    let cssChartDD = this.props.cssChartDD;
    let callBackID = cssChartDD.callBackID;
    let stats = cssChartDD.stats;
    let refinerObj = cssChartDD.refinerObj;
    let breadCrumb = cssChartDD.breadCrumb;

    //console.log('CssChart received data: callBackID', callBackID );
    //console.log('CssChart received data: stats', stats );
    //console.log('CssChart received data: refinerObj', refinerObj );

    let statCharts : any = null;
    if ( cssChartDD ) {
      let hasStats = stats && stats.length > 0 ? true : false;
      let hasRefiner = refinerObj && refinerObj.childrenKeys.length ? true : false;
      if ( hasStats === true && hasRefiner === true ) { 

          if ( this.props.stylesChartTitle ) {
            let stylesChartTitle : any = null;
            try { 
              stylesChartTitle = JSON.parse( this.props.stylesChartTitle ) ;
              stats.map( s => {
                s.chartTypes.map( t => {
                  if ( !s['stylesTitle'] ) { s['stylesTitle'] = []; }
                  s['stylesTitle'].push( stylesChartTitle );
                });
              });
            } catch (e) {
              alert('There was an error with your Chart Styles... not valid JSON format!');
              stylesChartTitle = undefined;
            }
          }

          let resultSummaryArray = buildStatChartsArray( stats, callBackID, refinerObj, 1 );
          statCharts = this.buildStatCharts( resultSummaryArray ); 
      }
    }

    //statCharts = this.props.chartElements;

    let breadCrumbElements = breadCrumb ? breadCrumb.map( bc => {
      return <span style={{whiteSpace: 'nowrap', fontWeight: 600 }}> { bc } &gt;</span>;
    }) : [];

    return (
      <div className={ styles.cssChart }>
        <div className={ styles.container }>
            <WebPartTitle displayMode={this.props.displayMode}
              title={this.props.title}
              updateProperty={this.props.updateProperty} />
            <div> { breadCrumbElements } </div>
            <div> { statCharts } </div>
        </div>
      </div>
    );
  }

  private _updateStateOnPropsChange() {

  }

}
