import * as React from 'react';
import { IconButton, } from 'office-ui-fabric-react/lib/Button';

// const emojiIcon: IIconProps = { iconName: 'BarChartVerticalFill' };

import styles from './CreateButtons.module.scss';

export const defCommandIconStyles = {
  root: {padding:'10px !important', height: 32},//color: 'green' works here
  icon: { 
    fontSize: 18,
    fontWeight: "normal",
    margin: '0px 2px',
    color: '#00457e', //This will set icon color
 },
};

export function createIconButton(iconName: string, titleText: string, _onClick: any, thisID: string,  iconStyles: any){

    if ( !iconStyles ) { iconStyles = defCommandIconStyles ; }

    if ( iconName === 'Help' ) { iconStyles.icon.fontWeight = '900' ; }

    if ( !thisID ) { thisID = Math.random().toString(36).substring(7);} else {

      //2020-05-11:  Issue 44 Added so activity can have / or \ from partial URLs
      //First replace slashes with words so that they will go through and can be returned back to those values in the onclick url
      thisID = thisID.replace(/\//gi, 'forwardSSlash');
      thisID = thisID.replace(/\\/gi, 'backwardSSlash');
      
      //Remove all special characters in Title or this so that it can be made an element ID
      thisID = thisID.replace(/[^\w\s|-]/gi, '');
    }

    //console.log('createIconButton:', iconStyles);

    return (
      <div className= {styles.buttons} id={ thisID }>
      <IconButton iconProps={{ iconName: iconName }} 
      title= { titleText} 
      //uniqueId= { titleText } 
      //data= { titleText } 
      //key= { titleText } 
      //ariaLabel= { titleText } 
      disabled={false} 
      checked={false}
      onClick={ _onClick }
      styles={ iconStyles }
      />
      </div>
    );
  }

