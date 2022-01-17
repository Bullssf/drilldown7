import * as React from 'react';
import styles from '../../drilldown7/components/Contents/contents.module.scss';
import stylesD from '../../drilldown7/components/Drill/drillComponent.module.scss';
import { IThelistProps } from './IThelistProps';
import { IThelistState } from './IThelistState';
import { escape } from '@microsoft/sp-lodash-subset';

/**
 *  TITLE:  For Webpart Title component
*/
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";

import { getAppropriateViewFields, getAppropriateViewGroups, getAppropriateViewProp 
  } from '../../drilldown7/components/Drill/listFunctions';

import ReactListItems from '../../drilldown7/components/Drill/reactListView';

import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class Thelist extends React.Component<IThelistProps, IThelistState> {

  
    /***
     *     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
     *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
     *    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
     *    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
     *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
     *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
     *                                                                                                  
     *                                                                                                  
     */

    public constructor(props:IThelistProps){
      super(props);

      this.state = { 
          //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
          WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
          WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width - 50 ,
      };
    }
  
  public componentDidMount() {
    this._updateStateOnPropsChange();
    console.log('Mounted!');
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.wpContext.propertyPane.open();
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

    if ( prevProps.listPropsDD !== this.props.listPropsDD) {  rebuildPart = true ; }
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

    public render(): React.ReactElement<IThelistProps> {

      let { listPropsDD } = this.props;
      let viewDefs, searchedItems, parentListFieldTitles, quickCommands, breadCrumb = null;
      
      let togOtherListview = listPropsDD.togOtherListview;

      viewDefs = listPropsDD.viewDefs;
      if ( viewDefs ) {
        
        searchedItems = listPropsDD.items;
        parentListFieldTitles = listPropsDD.parentListFieldTitles;
        quickCommands = listPropsDD.quickCommands;
        breadCrumb = listPropsDD.breadCrumb;
      }

      console.log('Thelist received data: callBackID', this.props.callBackID );
  
      console.log('Thelist received data: listPropsDD', this.props.listPropsDD );  

      let configureMe: any  = null;
      let breadCrumbElements: any  = null;
      let reactListItems: any = null;

      if ( togOtherListview !== true || !viewDefs || !breadCrumb ) {

        let descText = 'This webpart needs to be connected to the:  Drilldown Webpart > List Items properties to work...';
        if ( togOtherListview !== true ) { descText = 'Go to Drilldown Webpart > Toggles > Where to show items and turn on! '; }
        configureMe =
        <div>
          <Placeholder iconName='Warning'
              iconText='Configure your web part'
              description= { descText }
              buttonLabel=  { togOtherListview !== true  ? 'Configure' : null }
              onConfigure= { togOtherListview !== true  ? this._onConfigure.bind(this) : null }
              />
        </div>;

      } else { 

        let includeDetails = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'includeDetails' );
        let includeAttach = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'includeAttach' );
        let includeListLink = getAppropriateViewProp( viewDefs, this.state.WebpartWidth, 'includeListLink' );
        
        let currentViewFields: any[] = [];
        let currentViewGroups : IGrouping[] = [];
  
        if ( viewDefs && viewDefs.length > 0 )  { 
          currentViewFields = getAppropriateViewFields( viewDefs, this.state.WebpartWidth );
          currentViewGroups =  getAppropriateViewGroups( viewDefs , this.state.WebpartWidth );
        }
  
        let noItemsMessage = !searchedItems || searchedItems.length === 0 ? 'NO ITEMS FOUND' : '';

        if ( viewDefs ) {
          reactListItems = searchedItems.length === 0 ? <div>NO ITEMS FOUND</div> : <ReactListItems 
              parentListFieldTitles={ viewDefs.length > 0 ? null : parentListFieldTitles }
  
              webURL = { listPropsDD.webURL }
              parentListURL = { listPropsDD.parentListURL }
              listName = { listPropsDD.listName }
  
              contextUserInfo = { listPropsDD.contextUserInfo }
              sourceUserInfo = { listPropsDD.sourceUserInfo }

              viewFields={ currentViewFields }
              groupByFields={ currentViewGroups }
              items={ searchedItems}
              includeDetails= { includeDetails }
              includeAttach= { includeAttach }
              includeListLink = { includeListLink }
              quickCommands={ quickCommands }
              refreshCallback= { null }
              
          ></ReactListItems>;
        }
  
        breadCrumbElements = breadCrumb ? breadCrumb.map( bc => {
          return <span style={{whiteSpace: 'nowrap', fontWeight: 600 }}> { bc } &gt;</span>;
        }) : [];

      }
 


      /*
              <WebPartTitle displayMode={this.props.displayMode}
                  title={this.props.title}
                  updateProperty={this.props.updateProperty} />
                  */
      return (
        <div className={ styles.contents }>
          <div className={ stylesD.drillDown }>
            <WebPartTitle displayMode={this.props.displayMode}
                  title={this.props.title}
                  updateProperty={this.props.updateProperty}
              />
            <div> { breadCrumbElements } </div>
            <div> { configureMe } </div>
            <div> {  reactListItems  }</div>
          </div>
        </div>
      );
    }
    
    private _updateStateOnPropsChange() {
  
    }
}
