//https://autoliv.sharepoint.com/sites/crs/PublishingImages/Early%20Access%20Image.png

import * as React from 'react';

import * as links from './AllLinks';

import { Link, ILinkProps } from 'office-ui-fabric-react';
import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import WebPartLinks from './WebPartLinks';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { Image, ImageFit, ImageCoverStyle} from 'office-ui-fabric-react/lib/Image';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import styles from './InfoPane.module.scss';

export interface IEarlyAccessProps {
    image?: string;
    email?: string;

}

export interface IEarlyAccessState {
    imgHover: boolean;
    eleHover: boolean;
}

const EmailMessage = 'mailto:mike.zimmerman@autoliv.com?subject=Drilldown Webpart Feedback&body=Enter your message here :)  \nScreenshots help!';

export default class EarlyAccess extends React.Component<IEarlyAccessProps, IEarlyAccessState> {




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

    public constructor(props:IEarlyAccessProps){
        super(props);
        this.state = { 
            imgHover: false,
            eleHover: false,

        };

        
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

    public render(): React.ReactElement<IEarlyAccessProps> {


        const stackTokensBody: IStackTokens = { childrenGap: 30 };

        let thisPage = null;

        const iconClassInfo = mergeStyles({
            fontSize: 18,
            margin: '5px',
            verticalAlign: 'bottom',
            padding: '0px !important',
          });

        let iconStyles: any = { root: {
            //color: h.color ? h.color : "blue",
            cursor: 'pointer',
            paddingRight: '20px',
            float: 'right',
        }};

        let normalIcon = <Icon title={ "Feedback" } iconName={ "MailReply"} className={ iconClassInfo } styles = {iconStyles} onClick = { this._onIconClick.bind(this) } />;
        //styles.earlyAccess, styles.innerShadow
        
        thisPage = <div className= { styles.infoPane } ><div className= { [ styles.earlyAccess, styles.innerShadow ].join(' ') } style={{ background: 'lightgray', color: 'black', width: '100%', verticalAlign: 'center' }}>
            <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign={"center"} tokens={stackTokensBody}>
                <Image 
                    className={[
                    styles.imgHoverZoom, 
                    ( this.state.imgHover === true  ? styles.imgHoverZoomHover : null )
                    ].join(" ")} 
                    src={ "https://autoliv.sharepoint.com/sites/crs/PublishingImages/Early%20Access%20Image.png"} 
                    shouldFadeIn={true} 
                    imageFit={ ImageFit.centerContain }
                    coverStyle={ ImageCoverStyle.landscape }      
                    width={ 200 } height={ 50 }
                />

                <div style={{whiteSpace: 'nowrap'}}>Welcome to ALV Webpart Early Access!!!</div>
                <div style={{whiteSpace: 'nowrap'}}>Get more info here ---  </div>

                { links.gitRepoDrilldown7WebPart.wiki }
                { links.gitRepoDrilldown7WebPart.issues }

                { normalIcon }
            </Stack>

        </div></div>;

        return ( thisPage );


    }   //End Public Render


    public mouseOver(event): void {
        this.setState({ imgHover: true });
      }
    
      public mouseOut(event): void {
        this.setState({ imgHover: false });
      }

      private _onIconClick( event ) : void {
        window.open( EmailMessage );
      }

}