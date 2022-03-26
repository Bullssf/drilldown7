

   /**
    * NOTE All this should be gotten from npmFunctions!!!!
    * Lists/getFunctions.ts
    *  
    */

  export type ITrimLink = 'GetLinkDesc' | 'GetLinkUrl';
  export const DoNotExpandLinkColumns : ITrimLink[] = [ 'GetLinkDesc', 'GetLinkUrl' ];

  export type ITrimB4 = 'TrimB4Hyphen' | 'TrimB4Space'| 'TrimB4Tilda' | 'TrimB4Colon' |  'TrimB4Dot' |  'TrimB4Par' | 'TrimB42ndDot' ;
  export const DoNotExpandTrimB4 : ITrimB4[] = [ 'TrimB4Hyphen', 'TrimB4Space', 'TrimB4Tilda', 'TrimB4Colon', 'TrimB4Dot', 'TrimB4Par', 'TrimB42ndDot' ];

  export type ITrimAfter = 'TrimAfterHyphen' | 'TrimAfterTilda'| 'TrimAfterColon' | 'TrimAfterPar' | 'TrimAfterDot';
  export const DoNotExpandTrimAfter : ITrimAfter[] = [ 'TrimAfterHyphen', 'TrimAfterTilda', 'TrimAfterColon', 'TrimAfterPar', 'TrimAfterDot' ];

  export type ITrimSpecial = 'FirstWord' | 'LastWord' | 'FirstLetter' | 'FirstNumber' | 'Initials' | 'FirstInLast' | 'FirstAcronym' | 'SecondAcronym';
  export const DoNotExpandTrimSpecial : ITrimSpecial[] = [ 'FirstWord', 'LastWord', 'FirstLetter', 'FirstNumber', 'Initials', 'FirstInLast', 'FirstAcronym', 'SecondAcronym', ];

  export type ITrimFunctions = ITrimB4 | ITrimAfter | ITrimSpecial;

  export type IDoNotExpandColumns = ITrimLink | ITrimB4 | ITrimAfter | ITrimSpecial;

   export const DoNotExpandFuncColumns : ITrimFunctions[] = [ ...DoNotExpandTrimB4, ...DoNotExpandTrimAfter, ...DoNotExpandTrimSpecial ];

   export const DoNotExpandColumns : string[] = [ ...DoNotExpandLinkColumns, ...DoNotExpandFuncColumns ];

export function convertArrayToLC( arr: string[] ) {
  let result: string[] = arr.map( str => { return str.toLowerCase(); } );
  return result;
}