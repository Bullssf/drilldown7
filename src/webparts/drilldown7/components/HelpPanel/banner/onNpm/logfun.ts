/**
 * See full file in C:\Users\me\OneDrive...\SharePoint
 */

// Need to add:  ?{}[],

import { allSP, TrickyTenantA, TrickyTenantC, TrickyTenants } from './constants';

import { decrpt, encrpt } from './verify';
/**
 * usage:  testTricky(['test string1','test string2','test string3'])
 * return:  [ true, false, true ]
 * @param tests 
 */

export function testTenantA() {
  let testLarge = encrptMe( window.location.hostname);
  let test = testLarge.indexOf( TrickyTenantA );
  return test > -1 ? true : false;
}


export function testTenantC() {
  let testLarge = encrptMe( window.location.hostname);
  let test = testLarge.indexOf( TrickyTenantC );
  return test > -1 ? true : false;
}


export function testTenants() {
  return testTricky( [window.location.hostname], TrickyTenants );
}

/**
 * 
 * @param tests This should be array of longer strings
 * @param testArray This should be array of shorter strings to be found in longer strings
 */
export function testTricky ( tests: string[], testArray: string[] = allSP ){
  let encryptarr: string [] = [];
  let found: boolean [] = [];

  tests.map( original => {
    let testing: string = encrptMe( original) ;
    let idx: number = testArray.indexOf( testing );
    if ( idx > -1 ) {
      console.log( 'Found: ', idx, original );
      found.push( true );
    } else {
      console.log( 'NOT Found: ', idx, original );
      found.push( false );
    }
    encryptarr.push( testing );
  });
  
  console.log('Finished!',tests,encryptarr);
  console.log('results:',found);
  return found;

}

function isOdd(num: number) { return (num % 2) == 1;}

function encrptMe( str: string ) {
  let result: string = '';

  for (var i = 0; i < str.length; i++) {
    let testChar = str.charAt(i);
    
    let idx = decrpt.indexOf( testChar ) ;
    //console.log( testChar, i, idx);

    if ( idx === -1 ) {
      result += testChar;
    } else if ( isOdd(i) === true ){
      result += encrpt.charAt(encrpt.length -1 - idx);
    } else {
      result += encrpt.charAt(idx);
    }
  }
  return result;
}
