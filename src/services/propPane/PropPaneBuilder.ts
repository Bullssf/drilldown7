// import {
//   IPropertyPaneConfiguration,
// } from '@microsoft/sp-webpart-base';

// import {
//   introPage, viewsPage,
// //  webPartSettingsPage,

// } from './index';

// /*
//         IntroPage.getPropertyPanePage(),
//         WebPartSettingsPage.getPropertyPanePage(),
//         ListMappingPage.getPropertyPanePage(),
// */

// export class PropertyPaneBuilder {
//   public getPropertyPaneConfiguration(webPartProps,  _onClickUpdateTitles, _getListDefintions,  forceBanner: boolean, modifyBannerTitle: boolean, modifyBannerStyle: boolean ): IPropertyPaneConfiguration {
//     return <IPropertyPaneConfiguration>{
//       pages: [
//         introPage.getPropertyPanePage(webPartProps,  _onClickUpdateTitles, _getListDefintions, forceBanner, modifyBannerTitle, modifyBannerStyle),
//         viewsPage.getPropertyPanePage(webPartProps, ),
// //        webPartSettingsPage.getPropertyPanePage(webPartProps),

//       ]
//     };
//   } // getPropertyPaneConfiguration()

// }

// export let propertyPaneBuilder = new PropertyPaneBuilder();