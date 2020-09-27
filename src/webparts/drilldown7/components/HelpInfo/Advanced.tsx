import * as React from 'react';

import { Link, ILinkProps } from 'office-ui-fabric-react';

import * as links from './AllLinks';   //              { links.gitRepoTrackMyTime.issues }

import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import { IDrillDownProps } from '../Drill/drillComponent';
import { IDrillDownState } from '../Drill/drillComponent';
import styles from './InfoPane.module.scss';

export interface IAdvancedProps {
    showInfo: boolean;
    allLoaded: boolean;
    parentProps: IDrillDownProps;
    parentState: IDrillDownState;

}

export interface IAdvancedState {
    selectedChoice: string;
    lastChoice: string;
}

export default class Advanced extends React.Component<IAdvancedProps, IAdvancedState> {


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

public constructor(props:IAdvancedProps){
    super(props);
    this.state = { 
        selectedChoice: 'snapShot',
        lastChoice: '',

    };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    
  }


  public componentDidMount() {
    
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

    let rebuildTiles = false;
    /*
    if (rebuildTiles === true) {
      this._updateStateOnPropsChange({});
    }
    */

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

    public render(): React.ReactElement<IAdvancedProps> {

        if ( this.props.allLoaded && this.props.showInfo ) {
            console.log('infoPages.tsx', this.props, this.state);

/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */

            let thisPage = null;
            let rows: Element[] = [];

/**
 * 
        'parseBySemiColons' | 'parseByCommas' | 'groupBy10s' |  'groupBy100s' |  'groupBy1000s' |  'groupByMillions' | 
        'isDate' | 'groupByDays' | 'groupByWeeks' |  'groupByMonths' |  'groupByYears' | 'groupByDayOfWeek' |  'groupByDateBuckets' |
        'groupByUsers' | 'invalidRules' | '
 */

            let row00 = <tr><td>Refiner Rules</td><td></td><td></td></tr>;
            let row01 = <tr><td>Parse text</td><td>parseBySemiColons</td><td></td></tr>;
            let row02 = <tr><td>             </td><td>parseByCommas</td><td></td></tr>;
            let row03 = <tr><td>Group Numbers</td><td>groupBy10s</td><td></td></tr>;
            let row04 = <tr><td>             </td><td>groupBy100s</td><td></td></tr>;
            let row05 = <tr><td>             </td><td>groupBy1000s</td><td></td></tr>;
            let row06 = <tr><td>             </td><td>groupByMillions</td><td></td></tr>;

            let row07 = <tr><td>Dates</td><td></td><td></td></tr>;
            let row08 = <tr><td>             </td><td>isDate</td><td></td></tr>;
            let row09 = <tr><td>             </td><td>groupByDays</td><td></td></tr>;
            let row10 = <tr><td>             </td><td>groupByWeeks</td><td></td></tr>;
            let row11 = <tr><td>             </td><td>groupByMonths</td><td></td></tr>;
            let row12 = <tr><td>             </td><td>groupByYears</td><td></td></tr>;
            let row13 = <tr><td>             </td><td>groupByDayOfWeek</td><td></td></tr>;

            thisPage = <div>
                <h2></h2>
                <table className={styles.infoTable}>
                    <tr><th>Info</th><th>Example</th><th>Details</th></tr>
                    { row00 }
                    { row01 }
                    { row02 }
                    { row03 }
                    { row04 }
                    { row05 }
                    { row06 }

                    { row07 }
                    { row08 }
                    { row09 }
                    { row10 }
                    { row11 }
                    { row12 }
                    { row13 }
                </table>
            </div>;

/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                 
 *                                                                 
 */

            return (
                <div className={ styles.infoPane }>
                    { thisPage }
                </div>
            );
            
        } else {
            console.log('infoPages.tsx return null');
            return ( null );
        }

    }   //End Public Render



}