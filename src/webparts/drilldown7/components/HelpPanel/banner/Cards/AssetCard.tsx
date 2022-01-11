import * as React from "react";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "../banner.module.scss";
import stylesComp from "./component.module.scss";

import { Icon, IIconProps, } from 'office-ui-fabric-react/lib/Icon';

// import { initializeIcons } from '@uifabric/icons';
// initializeIcons();

const unPublishIconStyle: React.CSSProperties = { color: 'red', padding: '5px', margin: '1px', fontWeight: 600 } ;
// const UnPublishIcon = <Icon iconName="Blocked" title="Not Published" style={ unPublishIconStyle }></Icon>;
// const UnPublishIcon = <i class="ms-Icon ms-Icon--UnpublishContent" aria-hidden="true"></i>;
const UnPublishIcon = <span title="Not Published" style={ unPublishIconStyle }>Unpublished</span>;

export const AssetCard = (props: IQHCardProps) => {
	return (
		QuichHelpCard( props, 'horizontal' )
	);
};



/**
 * 2021-08-23 MZ:  Moved above default class to eliminate Compile warning
 * Returns JSX representation of Skill Path card
 * @param props
 */
export const QuichHelpVCard = (props: IQHCardProps) => {
	return (
		QuichHelpCard( props, 'vertical' )
	);
};

export interface IQHCardProps {
	id: number;
	url: string;
	thumbnail: string;

	title: string;
  description: string;
  type: string;
  typeId: number;

  coursesCount?: number;
	assetsCount?: number;
	duration?: string;
	layout?: 'vertical' | 'horizontal';
	isPublished: boolean;
}

export function QuichHelpCard ( props: IQHCardProps, layout: 'vertical' | 'horizontal' ) {


	let url = new URL(escape(props.url));
	// Adds search parameters to help us know where API requests are coming from
	url.searchParams.append("utm_source", "API");
	url.searchParams.append("utm_medium", "SharePoint");
	url.searchParams.append("utm_campaign", "SkillPathWidget");

	// Trim the description if its too long. This number is somewhat arbitrary, so shrink or enlarge it as needed.
	if (props.description.length > 192) {
		let tempString = props.description;
		tempString = props.description.substring(0, 193).trim();
		tempString += "...";
		props.description = tempString;
	}

	return (
		<a className={stylesComp.link} href={url.href} target="_blank" key={props.id}>
			<div className={ layout === 'horizontal' ? stylesComp.singleCardH : stylesComp.singleCard }>
				<div className={ stylesComp.previewH }>
					<img className={layout === 'horizontal' ? stylesComp.thumbnailH : stylesComp.thumbnail } src={props.thumbnail} />
					<span className={stylesComp.duration}> { props.duration } </span>
				</div>
				<div className={ stylesComp.flexContainer } style={{ paddingLeft: '12px'}}>
					<div className={ [stylesComp.rdurContainer , stylesComp.flexContainerSB ].join( ' ') } style={{ padding: '0px 10px'}}>
						<div>
							{ props.isPublished !== false ? null : UnPublishIcon }
						</div>
						<div>
							{ !props.coursesCount ? null : <span className={stylesComp.courseCount}>
									{`Courses: ${props.coursesCount}`}
								</span>
							}
							{ !props.assetsCount ? null : <span className={stylesComp.assetCount}>
									{`Videos: ${props.assetsCount}`}
								</span>
							}
						</div>
            {/* { !props.duration || props.duration === '00:00:00' ? null : <span className={stylesComp.assetCount}>
                {`${'Video duration'}: ${props.duration}`}
              </span>
            } */}
					</div>
					<h3 className={stylesComp.pathTitle}>{props.title}</h3>
					<p className={stylesComp.description}>{props.description}</p>
				</div>
			</div>
		</a>
	);
}