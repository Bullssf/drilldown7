
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { Web, IList, IItem, } from "@pnp/sp/presets/all";
import { Link, ILinkProps } from 'office-ui-fabric-react';

import { IMyProgress, IQuickButton, IQuickCommands} from '../IReUsableInterfaces';
import { IDrillItemInfo } from './drillComponent';

import { autoDetailsList } from '../../../../services/hoverCardService';

import { doesObjectExistInArray,  } from '../../../../services/arrayServices';

import { findParentElementPropLikeThis } from '../../../../services/basicElements';

import { getHelpfullError } from '../../../../services/ErrorHandler';

import stylesL from '../ListView/listView.module.scss';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping, } from "@pnp/spfx-controls-react/lib/ListView";
import { IGroup } from 'office-ui-fabric-react/lib/components/DetailsList';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';


import styles from '../Contents/listView.module.scss';
import stylesInfo from '../HelpInfo/InfoPane.module.scss';
import { IView } from '@pnp/sp/views';

export interface IReactListItemsProps {
    title?: string;
    descending?: boolean;
    maxChars?: number;
    items: IDrillItemInfo[];

    webURL: string; //Used for attachments
    listName: string; //Used for attachments
    parentListURL: string;

    blueBar?: any;

    showIDs?: boolean;
    showDesc?: boolean;

    parentListFieldTitles?: string;
    viewFields?: IViewField[];
    

    groupByFields?:  IGrouping[];
    includeDetails: boolean;
    includeAttach: boolean;
    includeListLink: boolean;

    highlightedFields?: string[];

    quickCommands?: IQuickCommands;

}

export interface IReactListItemsState {
  maxChars?: number;
  parentListFieldTitles: any;
  viewFields: IViewField[];
  groupByFields?:  IGrouping[];
  
  showPanel: boolean;
  showAttach: boolean;
  clickedAttach: boolean;  //if you clicked the attached icon (vs selected row), it only will show the attachments in the panel for cleaner implimentation

  panelId: number;
  lastPanelId: number;
  panelItem: IDrillItemInfo;
  panelAttachments: any[];
  lastAttachId: number;
  panelMessage?: any;

}

const stackFormRowTokens: IStackTokens = { childrenGap: 10 };

const iconClassAction = mergeStyles({
  fontSize: 18,
  fontWeight: "bolder",
  color: "black",
  //margin: '0px 2px',
  paddingRight: '10px',
  verticalAlign: 'bottom',
});

const iconClassInfo = mergeStyles({
  fontSize: 18,
  //margin: '0px 2px',
  paddingRight: '10px',
  verticalAlign: 'bottom',
});


export default class ReactListItems extends React.Component<IReactListItemsProps, IReactListItemsState> {

    private createAttachPanel () {
        return null;
    }

    private async createPanelAttachments( thisId: any, panelItem: IDrillItemInfo ): Promise<void>{

        let thisListWeb = Web(this.props.webURL);
        let thisListObject = thisListWeb.lists.getByTitle( this.props.listName );
        let allItems : any[] = [];
        let errMessage = null;
        let attachments: any[] = [];

        if ( panelItem.Attachments && panelItem.Attachments === true ) {

            try {
                allItems = await thisListObject.items.getById( thisId ).attachmentFiles();
    
                if ( allItems.length > 0 ) {
                    attachments.push( <h2>({ allItems.length}) Attachments</h2> );
                    attachments.push( <div style={{ paddingBottom: "10px"}}><b>CTRL-Click</b> to open in new window</div> );
                    allItems.map( a => {
                    let attachmentItem = <div><Link target= { "_blank" } href= { a.ServerRelativeUrl }> { a.FileName }</Link></div>;
                        attachments.push( attachmentItem );
        
                    });
                }
            } catch (e) {
                errMessage = getHelpfullError(e, true, true);
            }
        }

        this.setState({ 
            panelAttachments: attachments,
            lastAttachId: thisId,
        });


    }

    private createPanelButtons ( quickCommands: IQuickCommands ) {

        let buttons : any[] = [];
        let result : any = null;

        if ( quickCommands && quickCommands.buttons.length > 0 ) {

            quickCommands.buttons.map( (b,i) => {

                let icon = b.icon ? { iconName: b.icon } : null;
                let buttonID = 'ButtonID' + i;
                let buttonTitle = b.label;
                let thisButton = b.primary === true ?
                    <div id={ buttonID } title={ buttonTitle } ><PrimaryButton text={b.label} iconProps= { icon } onClick={this._panelButtonClicked.bind(this)} disabled={b.disabled} checked={b.checked} /></div>:
                    <div id={ buttonID } title={ buttonTitle } ><DefaultButton text={b.label} iconProps= { icon } onClick={this._panelButtonClicked.bind(this)} disabled={b.disabled} checked={b.checked} /></div>;
                buttons.push( thisButton );
            });

            const stackQuickCommands: IStackTokens = { childrenGap: 10 };
            result = <Stack horizontal={ true } tokens={stackQuickCommands}>
                {buttons}
            </Stack>;

        }


        return result;

    }

    private covertFieldInfoToIViewFields( parentListFieldTitles: [] , fieldsToShow: string[] ) {

        /**
         * This is the export format required:
            export const  initials : IViewField = {
            name: "userInitials",
            displayName: "User",
            isResizable: true,
            sorting: true,
            minWidth: 10,
            maxWidth: 30
        };
         */
        let viewFields : IViewField[] = [];
        
        if ( fieldsToShow.length === 0 ) { //Do all in order of fieldInfo
            if ( parentListFieldTitles.length > 0 ) { //Do all in order of fieldInfo
                parentListFieldTitles.map( f => {
                    viewFields.push({
                        name: f[0],
                        displayName: f[1],
                        isResizable: true,
                        sorting: true,
                        minWidth: 50,
                        maxWidth: 100
                    });
                });
            }
        }

        console.log('covertFieldInfoToIViewFields - viewFields', viewFields);
        return viewFields;

    }

    private handleExpandedFieldInfoToIViewFields( viewFields?: IViewField[] ) {
        
        viewFields.map( vf => {
            vf.name = vf.name.replace('/','');
        });

        return viewFields;

    }  
    /***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */ 

    constructor(props: IReactListItemsProps) {
        super(props);
        console.log( 'listView PROPS: ', this.props, );
        let parentListFieldTitles = this.props.parentListFieldTitles !== undefined && this.props.parentListFieldTitles !== null ? JSON.parse(this.props.parentListFieldTitles) : '';
 //       console.log( 'parentListFieldTitles', parentListFieldTitles );

        let viewFields : IViewField[] = [];
        if ( this.props.viewFields.length > 0 ) { 
            viewFields = this.handleExpandedFieldInfoToIViewFields( this.props.viewFields );
        } else { 
            viewFields = this.covertFieldInfoToIViewFields( parentListFieldTitles , [] );
        }

        let groupByFields : IGrouping[] = [];
        if ( this.props.groupByFields && this.props.groupByFields.length > 0 ) { 
            this.props.groupByFields.map( gF => {  groupByFields.push(gF) ;  });
            groupByFields.map( gF => {  gF.name = gF.name.replace('/','') ;  });
        }


        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
          parentListFieldTitles:parentListFieldTitles,
          viewFields: viewFields,
          groupByFields:  groupByFields,
          showPanel: false,
          showAttach: false,
          panelId: null,
          lastPanelId: null,
          panelItem: null,
          panelAttachments: [],
          lastAttachId: null,
          clickedAttach: false,
        };
    }
        
    public componentDidMount() {
        //this._getListItems();
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

    public componentDidUpdate(prevProps: IReactListItemsProps): void {
        let redraw = false;

        if ( prevProps.viewFields !== this.props.viewFields ) { redraw = true; }
        if ( prevProps.items.length !== this.props.items.length ) { redraw = true; }
        if ( prevProps.parentListURL !== this.props.parentListURL ) { redraw = true; }


        this._updateStateOnPropsChange();
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

    public render(): React.ReactElement<IReactListItemsProps> {

        //console.log( 'ReactListItems props & state: ', this.props, this.state );

        let thisLog = null;

        if ( this.props.items != null && this.props.items.length > 0 ) { 

            let attachments = this.state.panelAttachments.length > 0 ? this.state.panelAttachments : null ;

            let fullPanel = !this.state.showPanel ? null : 
                <Panel
                    isOpen={this.state.showPanel}
                    type={ PanelType.medium }
                    onDismiss={this._onClosePanel}
                    headerText={ this.state.panelId.toString() }
                    closeButtonAriaLabel="Close"
                    onRenderFooterContent={this._onRenderFooterContent}
                    isLightDismiss={ true }
                    isFooterAtBottom={ true }
                >
                    { attachments }
                    { this.createPanelButtons( this.props.quickCommands ) }
                    { autoDetailsList(this.state.panelItem, ["Title","refiners"],["search","meta","searchString"],true) }
                </Panel>;

            let attachPanel = !this.state.showAttach ? null : 
            <Panel
                isOpen={this.state.showAttach}
                type={ PanelType.medium }
                onDismiss={this._onClosePanel}
                headerText={ this.state.panelId.toString() }
                closeButtonAriaLabel="Close"
                onRenderFooterContent={this._onRenderFooterContent}
                isLightDismiss={ true }
                isFooterAtBottom={ true }
            >
                { attachments }
            </Panel>;

            let viewFieldsBase = this.state.viewFields;
            let attachField = [];
            if ( this.props.includeAttach ) {
                //Add attachments column:
                let callBack = this.props.includeDetails ? null : this._onShowPanel.bind(this);
                
                attachField.push({
                    name: 'Attachments',
                    displayName: 'Attach',
                    sorting: true,
                    minWidth: 25,
                    maxWidth: 35,
                    render: (item: IDrillItemInfo) => {
                        let cursor = item.Attachments ? "pointer" : '';
                        return <div id= { 'ButtonID' + item.Id } onClick={ callBack } style={{ fontSize: 'larger' , fontWeight: 'bolder', width: '25px', textAlign: 'center', cursor: cursor }}><Icon iconName= { item.Attachments ? "Attach" : ''}></Icon></div>;
                    },
                });
            }

            let viewFields = attachField.concat( viewFieldsBase );

            let listView = <div>
            <ListView
                items={ this.props.items }
                viewFields={ viewFields }
                compact={true}
                selectionMode={ this.props.includeDetails ? SelectionMode.single : SelectionMode.none }
                selection={this._onShowPanel.bind(this)}
                showFilter={false}
                //defaultFilter="John"
                filterPlaceHolder="Search..."
                groupByFields={ this.props.groupByFields } 
            /></div>;

            //        let logTable = itemRows === null ? <div>Nothing to show</div> : <table style={{ display: 'block'}} className={stylesInfo.infoTable}>

            let barText = this.props.blueBar && this.props.blueBar != null ? this.props.blueBar : <span>Items</span>;

            let webTitle = null;
            let listLink = !this.props.includeListLink ? null : <div className={ stylesInfo.infoHeading } onClick={ this._onGoToList.bind(this) } 
                style={{ paddingRight: 20, whiteSpace: 'nowrap', float: 'right', paddingTop: 0, cursor: 'pointer', fontSize: 'smaller',background: 'transparent' }}>
                    <span style={{ background: 'transparent' }} className={ stylesInfo.listLink }>Go to list</span></div>;

            if ( barText != null ) {
                webTitle =<div className={ [stylesInfo.infoHeading, stylesInfo.innerShadow].join(' ') }><span style={{ paddingLeft: 20, whiteSpace: 'nowrap' }}>( { this.props.items.length }  ) Items in: { barText }</span>{ listLink }</div>;

            
            /*stylesL.reactListView*/
            return (
                <div className={ '' } >
                    <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                    { webTitle }
                    { fullPanel }
                    { attachPanel }
                    { listView }
                </div>
                </div>
                );

            } else {

            // <div className={ styles.container }></div>
            return (
                <div className={ styles.logListView }>
                    { thisLog }
                </div>
                );
            } 

        } //if ( this.props.items != null && this.props.items.length > 0 ) {    
    } // Render



    /***
 *         db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
 *         88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *         88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo 
 *         88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
 *         88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.     
 *         ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                          
 *                                                                                                          
 */

    private _onGoToList = () : void => {

        if ( !this.props.parentListURL || this.props.parentListURL == null || this.props.parentListURL == undefined || this.props.parentListURL.length === 0 ) {
            return; // Do nothing
        }
        let e: any = event;
        let isAltClick = e.altKey;
        let isShfitClick = e.shiftKey;
        let isCtrlClick = e.ctrlKey;
        
        console.log('AltClick, ShfitClick, CtrlClick:', isAltClick, isShfitClick, isCtrlClick );

        window.open(this.props.parentListURL, "_blank");

    }


    private _updateStateOnPropsChange(): void {
//        this.setState({
//        });
    }


    private _panelButtonClicked = ( item ) : void => {

        let e: any = event;
        let thisID = findParentElementPropLikeThis(e.target, 'id', 'ButtonID', 5, 'begins');
//        console.log( '_panelButtonClicked: item =', item );
//        console.log( '_panelButtonClicked: e = ', e );
//        console.log('Click on this button ID: ', thisID);
        if ( !thisID ) { 

            alert('Whoops! Can not find ID of _panelButtonClicked!');
            return null;

        } else {

            let thisButtonObject : IQuickButton = this.props.quickCommands.buttons[thisID.replace('ButtonID','')];

            if ( !thisButtonObject ) {
                alert('_panelButtonClicked - can not find thisButtonObject - ' + thisID );
            } else {
                if ( thisButtonObject.alert ) { alert( thisButtonObject.alert ); }
                if ( thisButtonObject.console ) { console.log( thisButtonObject.alert ); }
                if ( thisButtonObject.confirm ) {  }

                if ( thisButtonObject.updateItem ) {
                    let readyToUpdate = true;
                    if ( !this.props.quickCommands.listWebUrl ) { alert('Missing listWebUrl for quickCommands') ; readyToUpdate = false ; }
                    if ( !this.props.quickCommands.listName ) { alert('Missing listName for quickCommands') ; readyToUpdate = false ; }

                    if ( readyToUpdate === true ) {
                        //Attempt to update item:

                    } else {
                        //Don't update item:
                    }

                }

                if ( thisButtonObject.panelMessage ) {
                    this.setState({
                        panelMessage: thisButtonObject.panelMessage,
                    });
                 }
            }


        }

    }

    private _onShowPanel = (item): void => {
  
        let e: any = event;
        console.log('_onShowPanel: e',e);
        console.log('_onShowPanel item clicked:',item);

        let clickedAttachIcon = e !== undefined && e != null && e.target.dataset && e.target.dataset.iconName === 'Attach' ? true : false;

        if (clickedAttachIcon === true || item.length > 0 ) {
            let thisID = clickedAttachIcon === true ? findParentElementPropLikeThis(e.target, 'id', 'ButtonID', 5, 'begins') : item[0].Id;
            thisID = typeof thisID === 'string' ? thisID.replace('ButtonID','') : thisID;

            let panelItem  : IDrillItemInfo = this._getItemFromId(this.props.items, 'Id', thisID );
            let lastPanelId = this.state.panelId;
            
            let clickedAttach = false;
            if ( e.srcElement.dataset && e.srcElement.dataset.iconName === 'Attach' ) {
                clickedAttach = true;
            }

            this.createPanelAttachments(thisID, panelItem );

            let canShowAPanel = thisID === null || thisID === undefined || panelItem === null ? false : true;
            let showFullPanel = canShowAPanel === true && clickedAttach !== true ? true : false;
            // 2020-10-13:  The last check in this row just didn't seem right... was && this.props.includeListLink === true ? true : false; 
            let showAttachPanel = canShowAPanel === true && clickedAttach === true && this.props.includeAttach === true ? true : false; 

            this.setState({ 
                showPanel: showFullPanel,
                showAttach: showAttachPanel , 
                clickedAttach: clickedAttach,
                panelId: thisID,
                panelItem: panelItem,
                lastPanelId: lastPanelId,
                panelAttachments: this.state.lastAttachId === thisID ? this.state.panelAttachments : [],

            });

        }
    }

    private _getItemFromId( items: IDrillItemInfo[], key: string, val: any ) {
        let panelItem : IDrillItemInfo =  null;
        let showIndex = doesObjectExistInArray(this.props.items, key, val, false);
        if (showIndex !== false ) {
            panelItem = this.props.items[showIndex];
            console.log('showPanelPropsItem', panelItem );
        }
        return panelItem;

    }

    private _onClosePanel = (): void => {
        this.setState({ 
            showPanel: false,
            showAttach: false , 
            clickedAttach: false,
         });
      }

      /**
       * This was copied from codepen example code to render a footer with buttons:
       * https://fabricweb.z5.web.core.windows.net/oufr/6.50.2/#/examples/panel
       * 
       */
    private _onRenderFooterContent = (): JSX.Element => {
        return null;

        return (
        <div>
            <PrimaryButton onClick={this._onClosePanel} style={{ marginRight: '8px' }}>
            Save
            </PrimaryButton>
            <DefaultButton onClick={this._onClosePanel}>Cancel</DefaultButton>
        </div>
        );
    }

}
