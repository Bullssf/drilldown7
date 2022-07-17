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


## Reran 2022-07-16
```
npm uninstall @pnp/common @pnp/graph @pnp/logging @pnp/odata @pnp/sp @pnp/spfx-controls-react @pnp/spfx-property-controls
npm install @pnp/sp @pnp/graph --save
npm install @pnp/spfx-controls-react --save --save-exact
npm install @pnp/logging @pnp/common @pnp/odata --save
npm install @pnp/spfx-property-controls --save --save-exact

---


## Reran 2022-00-14
```
Created new local copy of project in githubDesktop:  Drilldown7v15 (separate project folder)
npm i -g gulp-cli

## This is the result of the install gulp cli
PS C:\Users\dev\Documents\GitHub\drilldown7v15> npm i -g gulp-cli             
npm WARN deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
C:\Program Files\nodejs\gulp -> C:\Program Files\nodejs\node_modules\gulp-cli\bin\gulp.js
+ gulp-cli@2.3.0
updated 1 package in 13.133s
PS C:\Users\dev\Documents\GitHub\drilldown7v15> 

npm ls --location=global

tried to install:  npm i -g @pnp/cli-microsoft365

ERROR message:
npm ERR! missing: regenerator-runtime@0.13.9, required by @babel/runtime@7.16.7
npm ERR! missing: use-isomorphic-layout-effect@1.1.1, required by use-latest@1.2.0
PS C:\Users\dev\Documents\GitHub\drilldown7v15> npm i -g @pnp/cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\m365.ps1 as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\microsoft365.ps1 as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\m365_comp.ps1 as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\m365.cmd as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\microsoft365.cmd as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\m365_comp.cmd as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\m365 as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\microsoft365 as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN rm not removing C:\Program Files\nodejs\m365_comp as it wasn't installed by C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\@pnp\cli-microsoft365\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

npm ERR! code EEXIST
npm ERR! path C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365\dist\index.js
npm ERR! dest C:\Program Files\nodejs\m365
npm ERR! EEXIST: file already exists, cmd shim 'C:\Program Files\nodejs\node_modules\@pnp\cli-microsoft365\dist\index.js' -> 'C:\Program Files\nodejs\m365'
npm ERR! File exists: C:\Program Files\nodejs\m365
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dev\AppData\Roaming\npm-cache\_logs\2022-07-14T21_49_39_409Z-debug.log
PS C:\Users\dev\Documents\GitHub\drilldown7v15>


After installing webpack analyzer, be sure to update the gulpfile.js so it actually builds the map.

---


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
