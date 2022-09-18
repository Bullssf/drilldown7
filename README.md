# drilldown-7

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

Solution|Author(s)
--------|---------
folder name | Author details (name, company, twitter alias with link)

## Version history

Version|Date|Comments
-------|----|--------
1.1|March 10, 2021|Update comment
1.0|January 29, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
## Todo:
Add css bar chart like this one?
https://codepen.io/richardramsay/pen/ZKmQJv?editors=1100


## Installation steps
```
yo @microsoft/sharepoint --skip-install
npm install
npm install @pnp/sp @pnp/graph --save
npm install @pnp/spfx-controls-react --save --save-exact
npm install @pnp/spfx-property-controls
npm install --save office-ui-fabric-react
npm install webpack-bundle-analyzer --save-dev
npm install react-json-view
```


## Reran 2022-01-09
```
npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
npm install @pnp/sp
npm install @pnp/spfx-controls-react --save --save-exact
npm install webpack-bundle-analyzer --save-dev

After installing webpack analyzer, be sure to update the gulpfile.js so it actually builds the map.

---


## v1.11-14 upgrade
```
Clone project in github desktop - as folder drilldown714
Delete package-lock.json
Update dependancies from ALVFinMan - v14 project that works

npm install
npm install @pnp/sp @pnp/graph --save
npm install @pnp/spfx-controls-react --save --save-exact
npm install @pnp/spfx-property-controls --save --save-exact
npm install webpack-bundle-analyzer --save-dev





npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
npm install @pnp/sp
npm install @pnp/spfx-controls-react --save --save-exact
npm install webpack-bundle-analyzer --save-dev

After installing webpack analyzer, be sure to update the gulpfile.js so it actually builds the map.

---

## For NEW PACKAGE:
Update solution name in package-solution.json
Remove 'Deprecated' from all descriptions
Remove Special component from drillComponent.tsx
Change icon in webpart.mainfiest.json
Bump MAJOR Version
Update CodeVersion in analytics



## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
