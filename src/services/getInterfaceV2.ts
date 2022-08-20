

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

  export type ITrimWords = 'FirstWord' | 'FirstWordNoNum' | 'FirstWord2C' | 'FirstWord3C' |  'FirstWord4C' | 'FirstWordNoNum2C' | 'FirstWordNoNum3C' |  'FirstWordNoNum4C' | 'LastWord' | 'LastWordNoNum' ;
  export const DoNotExpandTrimWords : ITrimWords[] = [ 'FirstWord', 'FirstWordNoNum', 'FirstWord2C' , 'FirstWord3C' , 'FirstWord4C', 'FirstWordNoNum2C' , 'FirstWordNoNum3C' , 'FirstWordNoNum4C' ,'LastWord', 'LastWordNoNum' , ];
  
  export type ITrimTimes = 'YYYY-MM-DD' | 'YYYY-MM' | 'HH:mm' | 'HH:mm:ss' | 'HH:mm_AM' | 'HH:mm:ss_AM' |  'Q1-YY' | 'YY-Q1' | 'YYYY-Q1' ;
  export const DoNotExpandTrimTimes : ITrimTimes[] = [ 'YYYY-MM-DD', 'YYYY-MM', 'HH:mm' , 'HH:mm:ss' , 'HH:mm_AM' , 'HH:mm:ss_AM' , 'Q1-YY', 'YY-Q1' , 'YYYY-Q1' , ];
  
  // export type ITrimSpecial = 'FirstLetter' | 'FirstLetterAsCap' | 'FirstNumber' | 'First象征' | 'Initials' | 'InitialsAsCaps' | 'InitialsD' | 'InitialsAsCapsD' | 'FirstInFirst' | 'FirstInLast'  | 'FirstInFirstAsCap' | 'FirstInLastAsCap' | 'FirstAcronym' | 'SecondAcronym';
  
  // export const DoNotExpandTrimSpecial : ITrimSpecial[] = [  'FirstLetter', 'FirstLetterAsCap', 'FirstNumber', `First象征`, 'Initials', 'InitialsAsCaps', 'InitialsD', 'InitialsAsCapsD', 'FirstInFirst', 'FirstInLast', 'FirstInFirstAsCap', 'FirstInLastAsCap', 'FirstAcronym', 'SecondAcronym', ];

  export type ITrimSpecial = 'FirstLetter' | 'FirstLetterAsCap' | 'FirstNumber' | 'Initials' | 'InitialsAsCaps' | 'InitialsD' | 'InitialsAsCapsD' | 'FirstInFirst' | 'FirstInLast'  | 'FirstInFirstAsCap' | 'FirstInLastAsCap' | 'FirstAcronym' | 'SecondAcronym' | 'Object.';
  
  export const DoNotExpandTrimSpecial : ITrimSpecial[] = [  'FirstLetter', 'FirstLetterAsCap', 'FirstNumber', 'Initials', 'InitialsAsCaps', 'InitialsD', 'InitialsAsCapsD', 'FirstInFirst', 'FirstInLast', 'FirstInFirstAsCap', 'FirstInLastAsCap', 'FirstAcronym', 'SecondAcronym', 'Object.', ];

  export type ITrimFunctions = ITrimB4 | ITrimAfter | ITrimWords | ITrimTimes | ITrimSpecial ;

  export type IDoNotExpandColumns = ITrimLink | ITrimB4 | ITrimAfter | ITrimWords | ITrimTimes | ITrimSpecial;

  export const DoNotExpandFuncColumns : ITrimFunctions[] = [ ...DoNotExpandTrimB4, ...DoNotExpandTrimAfter, ...DoNotExpandTrimWords, ...DoNotExpandTrimTimes, ...DoNotExpandTrimSpecial ];

  export const DoNotExpandColumns : string[] = [ ...DoNotExpandLinkColumns, ...DoNotExpandFuncColumns ];

export function convertArrayToLC( arr: string[] ) {
  let result: string[] = arr.map( str => { return str.toLowerCase(); } );
  return result;
}