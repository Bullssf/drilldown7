import * as React from 'react';
import styles from './Thelist.module.scss';
import { IThelistProps } from './IThelistProps';
import { IThelistState } from './IThelistState';
import { escape } from '@microsoft/sp-lodash-subset';


/**
 *  TITLE:  For Webpart Title component
*/
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class Thelist extends React.Component<IThelistProps, {}> {

  
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

    if ( prevProps.listPropsDD !== this.props.listPropsDD) {  rebuildPart = true ; }

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
      console.log('Thelist received data: callBackID', this.props.callBackID );
  
      console.log('Thelist received data: listPropsDD', this.props.listPropsDD );   
  /*
              <WebPartTitle displayMode={this.props.displayMode}
                  title={this.props.title}
                  updateProperty={this.props.updateProperty} />
                  */
      return (
        <div className={ styles.thelist }>
          <div className={ styles.container }>

            <div> { /* */ this.props.callBackID  } xxx</div>
            <div> {  JSON.stringify(this.props.listPropsDD)  } yyy</div>
          </div>
        </div>
      );
    }
    
    private _updateStateOnPropsChange() {
  
    }
}
