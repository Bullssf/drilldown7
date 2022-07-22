import * as React from 'react';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';

import { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';

export function futureContent( repoLinks: IRepoLinks ) {

    return null;

    let html1 = <div>
        <h2>Were thinking of making this an extension so it doesn't need to be added to a page!</h2>
    </div>;

    return { html1: html1 };

}
  

