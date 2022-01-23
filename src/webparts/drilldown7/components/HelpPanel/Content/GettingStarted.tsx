import * as React from 'react';

import styles from '../banner/SinglePage/InfoPane.module.scss';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../banner/SinglePage/ISinglePageProps';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

export function gettingStartedContent( repoLinks: IRepoLinks ) {

  let html1 = <div>
    <h2>First:  Create a Parent List or Library in your site</h2>
      <ol>
          <li>Go to <b>WebPart Properties</b> - Edit Page, Edit Webpart.</li>
          <li>Expand <b>Create-Verify Lists</b> section.</li>
          <li>Press <b>Create-Verify List</b> button.</li>
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
  

