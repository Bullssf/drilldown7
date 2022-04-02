

   /**
    * NOTE All this should be gotten from npmFunctions!!!!
    * Lists/getFunctions.ts
    *  
    */

  export type ITrimLink = 'GetLinkDesc' | 'GetLinkUrl';
  export const DoNotExpandLinkColumns : ITrimLink[] = [ 'GetLinkDesc', 'GetLinkUrl' ];

  export type ITrimB4 = 'TrimB4Hyphen' | 'TrimB4Dash' | 'TrimB4Space'| 'TrimB4Tilda' | 'TrimB4Colon' |  'TrimB4Dot' |  'TrimB4Par' | 'TrimB4LPar' | 'TrimB42ndDot' ;
  export const DoNotExpandTrimB4 : ITrimB4[] = [ 'TrimB4Hyphen', 'TrimB4Dash', 'TrimB4Space', 'TrimB4Tilda', 'TrimB4Colon', 'TrimB4Dot', 'TrimB4Par', 'TrimB4LPar', 'TrimB42ndDot' ];

  export type ITrimAfter = 'TrimAfterHyphen' | 'TrimAfterDash' | 'TrimAfterTilda'| 'TrimAfterColon' | 'TrimAfterPar' | 'TrimAfterDot';
  export const DoNotExpandTrimAfter : ITrimAfter[] = [ 'TrimAfterHyphen','TrimAfterDash', 'TrimAfterTilda', 'TrimAfterColon', 'TrimAfterPar', 'TrimAfterDot' ];

    // InitialsAsCaps, 1nitials, 1nitialsAsCaps

  export type ITrimSpecial = 'FirstWord' | 'FirstWordNoNum' | 'FirstWord2C' | 'FirstWord3C' |  'FirstWord4C' | 'FirstWordNoNum2C' | 'FirstWordNoNum3C' |  'FirstWordNoNum4C' | 'LastWord' | 'LastWordNoNum' | 'FirstLetter' | 'FirstLetterAsCap' | 'FirstNumber' | 'Initials' | 'InitialsAsCaps' | 'InitialsD' | 'InitialsAsCapsD' | 'FirstInFirst' | 'FirstInLast'  | 'FirstInFirstAsCap' | 'FirstInLastAsCap' | 'FirstAcronym' | 'SecondAcronym';
  
  export const DoNotExpandTrimSpecial : ITrimSpecial[] = [ 'FirstWord', 'FirstWordNoNum', 'FirstWord2C' , 'FirstWord3C' , 'FirstWord4C', 'FirstWordNoNum2C' , 'FirstWordNoNum3C' , 'FirstWordNoNum4C' ,'LastWord', 'LastWordNoNum' , 'FirstLetter', 'FirstLetterAsCap', 'FirstNumber', 'Initials', 'InitialsAsCaps', 'InitialsD', 'InitialsAsCapsD', 'FirstInFirst', 'FirstInLast', 'FirstInFirstAsCap', 'FirstInLastAsCap', 'FirstAcronym', 'SecondAcronym', ];

  export type ITrimFunctions = ITrimB4 | ITrimAfter | ITrimSpecial;

  export type IDoNotExpandColumns = ITrimLink | ITrimB4 | ITrimAfter | ITrimSpecial;

   export const DoNotExpandFuncColumns : ITrimFunctions[] = [ ...DoNotExpandTrimB4, ...DoNotExpandTrimAfter, ...DoNotExpandTrimSpecial ];

   export const DoNotExpandColumns : string[] = [ ...DoNotExpandLinkColumns, ...DoNotExpandFuncColumns ];

export function convertArrayToLC( arr: string[] ) {
  let result: string[] = arr.map( str => { return str.toLowerCase(); } );
  return result;
}