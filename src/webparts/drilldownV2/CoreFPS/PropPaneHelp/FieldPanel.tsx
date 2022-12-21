import * as React from 'react';

import FieldPanelMin from '@mikezimm/fps-library-v2/lib/components/molecules/FieldPanel/PropPaneColsMinimal'

// require('@mikezimm/fps-styles/dist/PropPanelHelp.css');

import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';

export function getFieldPanelElement ( bannerProps: IWebpartBannerProps ) {
  const { fieldPanelProps } = bannerProps;

  const WebPartHelpElement = <PivotItem headerText={ 'Fields' } > 
        <FieldPanelMin
          designMode={ fieldPanelProps.designMode }
          displayMode={ fieldPanelProps.displayMode }
          lists={ fieldPanelProps.lists }
          tryCommands={ fieldPanelProps.lists }
          tryViews={ fieldPanelProps.tryViews }
          saveCommands={ fieldPanelProps.saveCommands }
          saveViews={ fieldPanelProps.saveViews }
          />
      </PivotItem>
  ;
 
  return WebPartHelpElement;

}