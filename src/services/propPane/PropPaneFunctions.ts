import { Web, } from "@pnp/sp/presets/all";
// import { sp } from "@pnp/sp";
import "@pnp/sp/sites";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";

import { getHelpfullError } from '@mikezimm/fps-library-v2/lib/logic/Errors/friendly';

export async function getAllItems( configWebURL: string, propsListName: string, thisProps: string[], restFilter: string, runAsync: boolean ): Promise<any[]>{

    let thisListObject = null;

    let theseProps : any[] = [];
    let returnProps: any[] = [];
    let errMessage = '';

    let selectProps : string[] = ['Id','Title','Template'].concat(thisProps);
    //console.log('selecting these props: ' ,selectProps );

    try {
        thisListObject = Web(configWebURL);
        if ( restFilter.length > 1 ) {
            theseProps = await thisListObject.lists.getByTitle(propsListName).items.filter(restFilter).orderBy('Title',false).top(300).get();
        } else {
            theseProps = await thisListObject.lists.getByTitle(propsListName).items.orderBy('Title',false).top(300).get();
        }
        //console.log('Found theseProps: ' ,theseProps );

        theseProps.map( i => {  //Loop through all items
            // i = preConfigProps list item.
            let iProps: any = {};
            let currentItemProps = Object.keys(i); //All the props in the pre-configured list

            selectProps.map( p => { //Loop through all select props
                if ( currentItemProps.indexOf(p) < 0 ) {
                    //console.log('Skipping this prop... not in the PreConfigProps list: ', p );
                } else { 
                    if ( i[p] ) { 
                        iProps[p] = i[p] ; 
                    } else { 
                        iProps[p] = i[p]; 
                    }
                }

            });
            returnProps.push( iProps ) ;
        });

    } catch (e) {
        errMessage = getHelpfullError(e, true, true).returnMess;

    }


    if ( errMessage === '' && returnProps.length === 0 ) { 
        errMessage = 'This list or library does not have any items that you can see.';
     }

    return returnProps;

}