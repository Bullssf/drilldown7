import * as React from 'react';

// import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

export function gettingStartedContent(  ): { html1: JSX.Element } {

  let html1 = <div>
    <h2>First:  Create a Parent List or Library in your site</h2>
      <ol>
          <li>Go to <b>WebPart Properties</b> - Edit Page, Edit Webpart.</li>
          <li>Press yellow PropPaneHelp button</li>
          <li>Go to Get pre-configured setup section</li>
          <li>Disable toggle and pick a list definition</li>
          <li>Fill in your Refiner Fields</li>
          <li>Fill in your Rules - optional settings telling us how to handle certain field types</li>
          <li>Choose your refiner style</li>

          <li>Exit <b>WebPart Properties</b></li>
          <li><b>Save</b> this page.</li>
          <li><b>Refresh</b> this page.</li>
      </ol>
    </div>;

    return { html1: html1 };

}
  

