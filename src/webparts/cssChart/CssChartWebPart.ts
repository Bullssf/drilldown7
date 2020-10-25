import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import {
  BaseClientSideWebPart,

  /**
   * DD Subscriber: Step 0 - import from sp-dynamic-data
   */
  IWebPartPropertiesMetadata,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  DynamicDataSharedDepth
} from '@microsoft/sp-webpart-base';

/**
 * DD Subscriber: Step 0 - import from sp-dynamic-data
 */
import { DynamicProperty } from '@microsoft/sp-component-base';

import * as strings from 'CssChartWebPartStrings';
import CssChart from './components/CssChart';
import { ICssChartProps } from './components/ICssChartProps';
import { description } from '../drilldown7/components/ListView/ViewFields';


import { IRefiners, IRefinerLayer, IRefinerStat,IItemRefiners, RefineRuleValues, 
  RefinerStatTypes, IRefinerStats, IRefinerStatType } from '../drilldown7/components/IReUsableInterfaces';

export interface ICssChartWebPartProps {
  description: string;

    /**
   * DD Subscriber: Step 1 - add this.properties.cssChartProps to WebPartProps
   */
  cssChartProps: DynamicProperty<object>;
}

export default class CssChartWebPart extends BaseClientSideWebPart<ICssChartWebPartProps> {

  protected onInit(): Promise<void> {

    /**
     * DD Subscriber: Step 5 - (7:33) Check to see if this was wired up 
     */
    if ( !this.properties.cssChartProps.reference ) {
        this.properties.cssChartProps.setValue({ title: 'propsNotDefined', id: 'NA' });
    }

     return Promise.resolve();

    }

  public render(): void {

  /**
   * DD Subscriber: Step 6 - (8:33) Check to see if this was wired up 
   */
  const pickedProps : any | undefined = this.properties.cssChartProps.tryGetValue();

  let dynamicData: ICssChartProps = {
    description: null, // pickedProps ? pickedProps.description : null,
    stats: null, // pickedProps ? pickedProps.stats : null,
    callBackID: null, // pickedProps ? pickedProps.callBackID : null,
    refinerObj: null, // pickedProps ? pickedProps.refinerObj : null,
    chartElements: pickedProps,
  };
  
  /**
   * DD Subscriber: Step 7 - (8:33) Only if props were set, render component 
   */
    if ( pickedProps ) {

      const element: React.ReactElement<ICssChartProps> = React.createElement(
        CssChart,
        {
          description: dynamicData.description,
          stats: dynamicData.stats,
          callBackID: dynamicData.callBackID,
          refinerObj: dynamicData.refinerObj,
          chartElements: dynamicData.chartElements,
        }
      );

      ReactDom.render(element, this.domElement);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

    
  /**
   * DD Subscriber: Step 3 - add this.properties.cssChartProps to WebPartProps
   */
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'cssChartProps': { dynamicPropertyType: 'object' }
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

  /**
   * DD Subscriber: Step 4 - add options to PropertyPane
   */
                PropertyPaneDynamicFieldSet({
                  label: 'Pick cssChartProps Source',
                  fields: [
                    PropertyPaneDynamicField('cssChartProps', {
                      label: 'Test Source',

                     })
                  ],
   /**
   * DD Subscriber: Step 5 - ( 10: 45 ) :  sharedConfiguration in case you don't want
   * settings on consumer:
   *    Depth:  If you have multiple dynamic properities, you can specify how the connection is shared
   *    depth: DynamicDataSharedDepth.Property, === all consumers can share the property 
   *    depth: DynamicDataSharedDepth.None, == entire object
   */
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.None,

                    source: {
                      sourcesLabel: 'Select webpart containing your source'
                    }
                    /*                    */
                  }
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
