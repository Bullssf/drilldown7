import * as React from "react";
import styles from "./banner.module.scss";

import { escape } from "@microsoft/sp-lodash-subset";

import { Panel, IPanelProps, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';

import { QuichHelpVCard, AssetCard } from './Cards/AssetCard';
import * as assets from "./Cards/assets";

import WebPartLinks from './WebPartLinks';

import SinglePage from './SinglePage/SinglePage';
import { aboutTable } from '../Content/About';
import { devTable } from '@mikezimm/npmfunctions/dist/Links/Developer';
import { gettingStartedContent } from '../Content/GettingStarted';

import { errorsContent } from '../Content/Errors';
import { advancedContent } from '../Content/Advanced';
import { futureContent } from '../Content/FuturePlans';

import { basicsContent } from '../Content/Basics';

import { tricksTable } from '../Content/Tricks';
import { getRandomTip, webParTips } from '../Content/Tips';

import { IWebpartBannerProps, IWebpartBannerState, } from './onNpm/bannerProps';
import { IKeySiteProps } from './onNpm/interfaces';

import { getHelpfullErrorV2 } from "@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler";
import { createStyleFromString, getReactCSSFromString } from "@mikezimm/npmfunctions/dist/Services/PropPane/StringToReactCSS";
import { noWrap, divProperties } from "office-ui-fabric-react";

import { bannerSettingsContent } from './onNpm/bannerFunctions';

import { IReturnErrorType, checkDeepProperty } from "@mikezimm/npmfunctions/dist/Services/Objects/properties"; 
import { goToParentSite, goToHomePage } from "@mikezimm/npmfunctions/dist/Services/Navigation/site"; 

const pivotStyles = {
	root: {
		whiteSpace: "normal",
	//   textAlign: "center"
	}};

const pivotHeading1 = 'Getting started';  //Templates
const pivotHeading2 = 'Basics';  //Templates
const pivotHeading3 = 'Advanced';  //Templates
const pivotHeading4 = 'Future';  //Templates
const pivotHeading5 = 'Dev';  //Templates
const pivotHeading6 = 'Errors';  //Templates
const pivotHeading7 = 'Tricks';  //Templates
const pivotHeading8 = 'About';  //Templates

export default class WebpartBanner extends React.Component<IWebpartBannerProps, IWebpartBannerState > {
		private hoverEffect = this.props.hoverEffect === false ? false : true;
    private gettingStarted= gettingStartedContent();
    private basics= basicsContent();
    private advanced= advancedContent();
    private futurePlans= futureContent();
    private dev= devTable();
		private errors= errorsContent();
		private tricks= tricksTable();
		private about= aboutTable();

		private wideToggle = this.props.wideToggle === null || this.props.wideToggle === undefined ? true : this.props.wideToggle ;

		private hasNear = this.props.nearElements.length > 0 ? true : false;
		private hasFar = this.props.farElements.length > 0 ? true : false;
		private hasNearOrFar = this.hasNear === true || this.hasFar === true ? true : false;

		private nearElements: any[] = [];
		private showSettings() {  this.setState({ showSettings: !this.state.showSettings }); }
		private showSettingsAsPivot = false;

		private settingsContent: any = null;
		private isShowTricks = this.props.showTricks;
		private isSiteAdmin = this.props.pageContext.legacyPageContext.isSiteAdmin;
		private isSiteOwner = this.isSiteAdmin === true ? true : this.props.pageContext.legacyPageContext.isSiteOwner;

		private jumpToParentSite(  ) {
			let e: any = event;
			goToParentSite( e, this.props.pageContext );		
		}
		
		private  jumpToHomePage( ) {
			let e: any = event;
			goToHomePage( e, this.props.pageContext );		
		}

    constructor(props: IWebpartBannerProps) {
			super(props);
			
			let pageContext: any = this.props.pageContext;

			let LimtedDowload = null;
			
			let spFeatures = pageContext.spFeatureInfo && pageContext.spFeatureInfo.features && pageContext.spFeatureInfo.features.length > 0 ? pageContext.spFeatureInfo.features : null;

			if ( spFeatures ) {
				spFeatures.map( feature => {
					if ( feature.key === 'FollowingContent' ) {

						if ( feature.value && feature.value.enabled === true ) {

						}
						if ( feature.value && feature.value.version === 2 ) {
							
						}
					}
				});
			}

			let keySiteProps: IKeySiteProps = {
				SiteLogoUrl: pageContext.web.logoUrl,  // pageContext.web.logoUrl;
				LimitedDownload: null, // TBD
			
				WebTimezone: checkDeepProperty( pageContext, ['web','timeZoneInfo','description'], 'ShortError' ) ,
				WebLanguage: `${ checkDeepProperty( pageContext, ['cultureInfo','currentCultureName'], 'ShortError' ) } - ${checkDeepProperty( pageContext, ['web','language'], 'ShortError' )}`,
			
				UserTimezone:  checkDeepProperty( pageContext, ['user','timeZoneInfo','description'], 'ShortError' ),  // pageContext.user.timeZoneInfo.description;
				UserTimePref:   checkDeepProperty( pageContext, ['user','preferUserTimeZone'], 'ShortError' ) ,  // pageContext.user.preferUserTimeZone ;
			
				BrokenPermissions: null, // TBD
			};

			if ( this.props.showBannerGear === true ) {
				this.nearElements.push( <Icon iconName='PlayerSettings' onClick={ this.showSettings.bind(this) } style={ this.props.bannerCommandStyles } title="Show Settings quick links and info"></Icon> );
				this.hasNear = true;
				this.hasNearOrFar = true;
				let bannerContent = bannerSettingsContent( this.props.showTricks, this.props.pageContext, keySiteProps, this.props.bannerCommandStyles, this.props.bannerWidth );
				this.settingsContent = bannerContent.content;
				this.showSettingsAsPivot = bannerContent.showSettingsAsPivot;

			}

			if ( this.props.onHomePage !== true && this.props.showGoToHome === true ) {
				let titleHome = 'Go to Home Page of current site';
				this.hasNear = true;
				this.hasNearOrFar = true;

				//This is the easy fix that assumes the page is not in a folder in site pages.
				this.nearElements.push(<div style={{ paddingRight: null }} className={ '' } title={ titleHome } >
					<Icon iconName='Home' onClick={ this.jumpToHomePage.bind(this) } style={ this.props.bannerCommandStyles }></Icon>
				</div>);
			}
	
			if ( this.props.showGoToParent === true && this.props.pageContext.site.absoluteUrl !== this.props.pageContext.web.absoluteUrl ) {
				let title = 'Go to parent site';
				this.hasNear = true;
				this.hasNearOrFar = true;
	
				this.nearElements.push(<div style={{ paddingRight: null }} className={ '' } title={ title}>
					<Icon iconName='Up' onClick={ this.jumpToParentSite.bind(this) } style={ this.props.bannerCommandStyles }></Icon>
				</div>);
	
			}
			
			this.nearElements.push(...this.props.nearElements );

			this.state = {
				keySiteProps: keySiteProps,
				showPanel: false,
				selectedKey: pivotHeading1,
				panelType: PanelType.medium,
				showSettings: false,
			};
		}

		public render(): React.ReactElement<IWebpartBannerProps> {
		const { showBanner, showTricks } = this.props;
		const { showPanel } = this.state;

		if ( showBanner !== true ) {
			return (null);
		} else {

				
			//  Estimated width pixels used by banner.  Used to determine max size of the title component.
			let usedWidth = 40; //20px padding on outside of all elements
			usedWidth += this.nearElements.length * 43 + this.props.farElements.length * 43;  //Add 45px per icon button
			// usedWidth += 40; //Padding between near/far elements and the text part of heading
			let remainingWidth = this.props.bannerWidth - usedWidth - 40;

			let moreInfoText = this.props.bannerWidth > 700 ? 'More Information' : 'Info';
			let bannerTitleText = this.props.title && this.props.title.length > 0 ? this.props.title : 'FPS Webpart';
			let textWidth = ( moreInfoText.length + bannerTitleText.length ) * 19 + 40; //characters * 19px + 40 padding

			//  If space between < estimated space needed, apply ratio, else just leave large on both sides so the math works.
			let moreInfoRatio = textWidth > remainingWidth ? moreInfoText.length / ( moreInfoText.length + bannerTitleText.length ) : .7;
			let titleRatio = textWidth > remainingWidth ? 1 - moreInfoRatio : .7;

			// usedWidth += 18 * bannerTitleText.length; //Est 18px per character of title

			let bannerStyle: React.CSSProperties = {};
			if ( this.props.bannerReactCSS ) { bannerStyle = this.props.bannerReactCSS ; } 
			else if ( this.props.styleString ) { bannerStyle = createStyleFromString( this.props.styleString, { background: 'green' }, 'bannerStyle in banner/component.tsx ~ 81' ); }
			
			if ( !bannerStyle.height ) { bannerStyle.height = '35px' ; }
			if ( !bannerStyle.paddingLeft ) { bannerStyle.paddingLeft = '20px' ; }
			if ( !bannerStyle.paddingRight ) { bannerStyle.paddingRight = '20px' ; }
			if ( this.hasNearOrFar === false ) { bannerStyle.cursor = 'pointer' ; }

			let classNames = [ styles.container, this.hoverEffect === true ? styles.opacity : null, styles.flexContainer ].join( ' ' ); //, styles.innerShadow

			//  On clicks need to be defined like this and only put on specific elements in certain cases.
			//  OR ELSE they will all get fired messing up panel open
			

			let bannerOnClick = this.hasNearOrFar !== true ? this._openPanel.bind( this ) : null;
			let titleInfoOnClick = this.hasNearOrFar === true ? this._openPanel.bind( this ) : null;
			let titleInfoCursor = this.hasNearOrFar === true ? 'pointer' : null;
			let styleFlexElements : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor };
			let styleLeftTitle : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor, maxWidth: titleRatio * remainingWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }; 
			let styleRightTitle : React.CSSProperties = { padding: '10px', cursor: titleInfoCursor, maxWidth: moreInfoRatio * remainingWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }; 

			let bannerLeft = this.nearElements.length === 0 ? <div style={ styleFlexElements } onClick = { titleInfoOnClick } > { bannerTitleText } </div> :
				<div className={ styles.flexLeftNoWrapStart }>
					{ this.nearElements }
					<div style={ styleLeftTitle } onClick = { titleInfoOnClick } title={ bannerTitleText }> { bannerTitleText } </div>
				</div>;

		let bannerRight = this.props.farElements.length === 0 ? <div style={ styleFlexElements } onClick = { titleInfoOnClick } >{moreInfoText}</div> :
			<div className={ styles.flexLeftNoWrapStart }>
				<div style={ styleRightTitle } onClick = { titleInfoOnClick }  title={ 'More Information on webpart' }>{moreInfoText}</div>
				{ this.props.farElements }
			</div>;

			let showSettingStyle = this.showSettingsAsPivot === true ? styles.showSettingsPivot : styles.showSettingsFlex;

			let bannerContent = 
			<div>
				<div className={ classNames } style={ bannerStyle } onClick = { bannerOnClick }>
					{ bannerLeft }
					{/* { <div style={{width: '100%', overflow: 'hidden', color: 'green'}}></div>} */}
					{ bannerRight }
				</div>
				<div className={ this.state.showSettings ? showSettingStyle: styles.hideSettings } style={ {} }>
					{ this.settingsContent }
				</div>
			</div>
;

			let thisPage = null;

			let panelContent = null;

			if ( showPanel === true ) {
				const webPartLinks =  <WebPartLinks 
					parentListURL = { null } //Get from list item
					childListURL = { null } //Get from list item

					parentListName = { null } // Static Name of list (for URL) - used for links and determined by first returned item
					childListName = { null } // Static Name of list (for URL) - used for links and determined by first returned item

					repoObject = { this.props.gitHubRepo }
				></WebPartLinks>;

				let content = null;
				if ( this.state.selectedKey === pivotHeading1 ) {
						content = this.gettingStarted;
				} else if ( this.state.selectedKey === pivotHeading2 ) {
						content= this.basics;
				} else if ( this.state.selectedKey === pivotHeading3 ) {
						content=  this.advanced;
				} else if ( this.state.selectedKey === pivotHeading4 ) {
						content=  this.futurePlans;
				} else if ( this.state.selectedKey === pivotHeading5 ) {
						content=  this.dev;
				} else if ( this.state.selectedKey === pivotHeading6 ) {
						content=  this.errors;
				} else if ( this.state.selectedKey === pivotHeading7 ) {
						content= this.tricks;
				} else if ( this.state.selectedKey === pivotHeading8 ) {
						content= this.about;
				}

				thisPage = content === null ? null : <SinglePage 
						allLoaded={ true }
						showInfo={ true }
						content= { content }
				></SinglePage>;

				let earlyAccess = this.props.earyAccess === false ? null :
					<MessageBar messageBarType={MessageBarType.severeWarning} style={{ fontSize: 'large' }}>
						{ `Webpart is still under development` }
					</MessageBar>;

				let tips = webParTips.length === 0 ? null :
					<MessageBar messageBarType={MessageBarType.warning } >
						<div style={{fontWeight: 600, fontSize: 'large', marginBottom: '12px'}} >Pro TIP:</div> 
						<div style={{minHeight: '30px'}} >{ getRandomTip() }</div>
					</MessageBar>;

				let wideIcon = this.wideToggle !== true ? null : <Icon iconName= { this.state.panelType === PanelType.medium ? 'MaximumValue' : 'MinimumValue' } style={{ fontSize: 'xx-large', cursor: 'pointer' }} 
					onClick={ this._panelWidth.bind(this) }></Icon>;

				panelContent = <div style={{ paddingBottom: '50px' } }>
					{ earlyAccess }
					{ tips }
					{ webPartLinks }
					<div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
							<h3> { this.props.panelTitle }</h3>
							<div title={ this.state.panelType === PanelType.medium ? 'Make panel wider' : 'Make panel narrower' }>
							{ wideIcon }
						</div>
					</div>

					<Pivot
							// styles={ pivotStyles }
							linkFormat={PivotLinkFormat.links}
							linkSize={PivotLinkSize.normal }
							onLinkClick={this._selectedIndex.bind(this)}
					> 
						{/* { pivotItems.map( item => { return  ( item ) ; }) }
						*/}
						{ this.gettingStarted === null ? null : <PivotItem headerText={pivotHeading1} ariaLabel={pivotHeading1} title={pivotHeading1} itemKey={pivotHeading1} itemIcon={ null }/> }
						{ this.basics				 === null ? null : <PivotItem headerText={pivotHeading2} ariaLabel={pivotHeading2} title={pivotHeading2} itemKey={pivotHeading2} itemIcon={ null }/> }
						{ this.advanced			 === null ? null : <PivotItem headerText={pivotHeading3} ariaLabel={pivotHeading3} title={pivotHeading3} itemKey={pivotHeading3} itemIcon={ null }/> }
						{ this.futurePlans		 === null ? null : <PivotItem headerText={pivotHeading4} ariaLabel={pivotHeading4} title={pivotHeading4} itemKey={pivotHeading4} itemIcon={ 'RenewalFuture' }/> }
						{ this.errors 				 === null ? null : <PivotItem headerText={pivotHeading6} ariaLabel={pivotHeading6} title={pivotHeading6} itemKey={pivotHeading6} itemIcon={ 'Warning12' }/> }
						{ this.dev						 === null ? null : <PivotItem headerText={ null } ariaLabel={pivotHeading5} title={pivotHeading5} itemKey={pivotHeading5} itemIcon={ 'TestAutoSolid' }/> }
						{ showTricks !== true || this.tricks === null ? null : <PivotItem headerText={ null } ariaLabel={pivotHeading7} title={pivotHeading7} itemKey={pivotHeading7} itemIcon={ 'AutoEnhanceOn' }/> }
						{ this.about 				 === null ? null : <PivotItem headerText={ null } ariaLabel={pivotHeading8} title={pivotHeading8} itemKey={pivotHeading8} itemIcon={ 'Info' }/> }
					</Pivot>
					{ thisPage }
				</div>;
			}

	
			let bannerPanel = <div><Panel
					isOpen={ showPanel }
					// this prop makes the panel non-modal
					isBlocking={true}
					onDismiss={ this._closePanel.bind(this) }
					closeButtonAriaLabel="Close"
					type = { this.state.panelType }
					isLightDismiss = { true }
				>
				{ panelContent }
			</Panel></div>;

			return (
				<div className={styles.bannerComponent} >
					{ bannerContent }
					{ bannerPanel }
				</div>
	
			);
	
		}


	}

	public _selectedIndex = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;

		let itemKey = item.props.itemKey;

		this.setState({ selectedKey: itemKey });
		
	}

	private _closePanel ( )  {
    this.setState({ showPanel: false,});
	}
	
	private _openPanel ( event: any )  {
		let textCallback = event.currentTarget.dataset.callback;
		if ( textCallback && textCallback.length > 0) {
			//Do nothing
		} else {
			this.setState({ showPanel: true,});
		}
	}

	
	private _panelWidth ( )  {
		let newPanelType: PanelType = this.state.panelType !== PanelType.medium ? PanelType.medium : PanelType.large;
    this.setState({ panelType: newPanelType,});
	}
	

}
