import * as React from 'react';

export const myLilac = "#EBD0FF";
export const myGreen = "#BBFFB0";
export const myYellow = "#FFFAB0";
export const myBlue = "#B0DEFF";
export const myOrange = "#FFDCB0";
export const myRed = "#FFC1B0";
export const defBorder = '#2566CA';
export const transp = 'transparent';

type PaneType = 'piv' | 'proj' | 'list' | 'entry' | 'command' | 'charts' | 'time' | 'category' | 'projectID' | 'activity';

export interface IColorMap {
  [key: string]: string;
  piv: string;
  proj: string;
  list: string;
  entry: string;
  command: string;
  charts: string;
}

export const colorMap: IColorMap = {
    piv: myLilac,
    proj: myGreen,
    list: myYellow,
    entry: myBlue,
    command: myOrange,
    charts: myRed,
};

let piv = myLilac;
let proj = myOrange;


export function styleRootBGColor(debugMode: string, part: PaneType ) {
    return { root: {
                backgroundColor: debugMode ? colorMap[part] : transp,
                borderColor: debugMode ? defBorder : transp,
            }};
}

export function styleBGColor(debugMode: string, part: PaneType ) {
    return { 
        backgroundColor: debugMode ? colorMap[part] : transp,
        borderColor: debugMode ? defBorder : transp,
    };
}
