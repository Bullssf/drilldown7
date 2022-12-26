import { IThisFPSWebPartClass } from "@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/IThisFPSWebPartClass";
import { saveLegacyAnalytics } from "./Analytics";

export const LegacyPropChanges = {
  webUrl: 'parentListWeb',        // Changed in v2.2.0.3
  listTitle: 'parentListTitle',   // Changed in v2.2.0.3
}

export function convertLegacyProps( WPClass: IThisFPSWebPartClass ) {

  const wpProps = WPClass.properties;
  const keys: string[] = Object.keys( LegacyPropChanges );
  const propsToUpdate: any[] = [];

  keys.map( prop => { 
    const oldProp: any = LegacyPropChanges[ prop ];
    if ( wpProps[ oldProp ] ) {
      if ( typeof wpProps[ oldProp ] === 'string' ) WPClass.properties[ prop ] = `${wpProps[ oldProp ]}`;
      propsToUpdate.push( {  [prop]: wpProps[ oldProp ] });
      // eventually delete legacy prop in future update way down the road
    }
  });
  if ( propsToUpdate.length > 0 ) {
    saveLegacyAnalytics( 'Drilldown < 2.2.0.3', 'Required', WPClass, propsToUpdate );
  }
  return wpProps;


}