import * as React from 'react';
import styles from './Drilldown7.module.scss';
import { IDrilldown7Props } from './IDrilldown7Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Drilldown7 extends React.Component<IDrilldown7Props, {}> {
  public render(): React.ReactElement<IDrilldown7Props> {
    return (
      <div className={ styles.drilldown7 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more now!</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
