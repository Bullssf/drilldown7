import { Web } from "@pnp/sp/presets/all";

import { sp, Views, IViews } from "@pnp/sp/presets/all";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from './columnTypes';

import { MyFieldDef, changes, cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook, 
	cMText, cText, cNumb, cURL, cUser, cMUser, minInfinity, maxInfinity } from './columnTypes';

import { IMyView, IViewField, Eq, Ne, Lt, Gt, Leq, Geq, IsNull, IsNotNull, Contains, MyOperator, BeginsWith } from './viewTypes';

import { IMyProgress } from '../../webparts/drilldown/components/IReUsableInterfaces';

import { IListInfo, IMyListInfo, IServiceLog, notify, getXMLObjectFromString } from './listTypes';

import { doesObjectExistInArray } from '../arrayServices';

import { getHelpfullError } from '../ErrorHandler';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import "@pnp/sp/fields/list";

export interface IViewLog extends IServiceLog {
    view?: string;
}

/**
 * export const testProjectView : IMyView = {

    ServerRelativeUrl: 'TestQuery',
	iFields: 	stdViewFields,
	wheres: 	[ 	{f: StatusTMT, 	c:'OR', 	o: Eq, 		v: "1" },
					{f: Everyone, 	c:'OR', 	o: Eq, 		v: "1" },
					{f: ootbAuthor, c:'OR', 	o: IsNull, 	v: "1" },
					{f: Leader, 	c:'OR', 	o: Eq, 		v: "1" },
					{f: Team, 		c:'OR', 	o: Eq, 		v: queryValueCurrentUser },
				],
    orders: [ {f: ootbID, o: 'asc'}],
    groups: { collapse: false, limit: 25,
		fields: [
			{f: ootbAuthor, o: ''},
			{f: ootbCreated, o: 'asc'},
		],
	},
};
 */

/***
 *    .d8888. db    db d8888b. d8888b.  .d88b.  d8888b. d888888b 
 *    88'  YP 88    88 88  `8D 88  `8D .8P  Y8. 88  `8D `~~88~~' 
 *    `8bo.   88    88 88oodD' 88oodD' 88    88 88oobY'    88    
 *      `Y8b. 88    88 88~~~   88~~~   88    88 88`8b      88    
 *    db   8D 88b  d88 88      88      `8b  d8' 88 `88.    88    
 *    `8888Y' ~Y8888P' 88      88       `Y88P'  88   YD    YP    
 *                                                               
 *                                                               
 */

export function buildFieldOrderTag ( thisOrder ) {
    let tempOrder = JSON.parse(JSON.stringify(thisOrder));
    let fieldName = typeof tempOrder.field === 'object' ? tempOrder.field.name : tempOrder.field;
    let thisXML = '<FieldRef Name="' + fieldName + '"'; // + '" />'

    if ( thisOrder.asc === false ) { thisXML += ' Ascending="FALSE"'; }

    thisXML += ' />';

    return thisXML;
}

export function getValueTag ( thisValue, type : string | null = null ) {
    let result = '';
    if ( thisValue.indexOf('<Value') > -1 ) {  //Some of these are pre-made so do not add the value tag
        result = thisValue;
    } else  {  //Only add the Value tag when it's required.
        if (type !== null || type !== '' ) {
            result = '<Value Type="' + type + '">' + thisValue + '</Value>';
            //Sample of thisXML:       <Value Type="Text">BEG</Value>

        } else  {
            alert('Bad type in \'' + thisValue + '\': Can\'t use \'' +  type +'\'');
            result = null;

        }

    }
    return result;
}

export function buildFieldWhereTag ( thisWhere ) {
    let success = true;
    let tempWhere = JSON.parse(JSON.stringify(thisWhere));
    let fieldName = typeof tempWhere.field === 'object' ? tempWhere.field.name : tempWhere.field;
    let isFieldIndexed = typeof tempWhere.field === 'object' ? tempWhere.field.indexed : false;
    let thisXML = '<FieldRef Name="' + fieldName + '" />';
    //Sample of thisXML:         <FieldRef Name="Leader" />
    
    let thisOper : MyOperator = tempWhere.oper;
    let fieldVType = typeof tempWhere.field === 'object' ? tempWhere.field.fieldType.vType : 'Text';
    let fieldNType = typeof tempWhere.field === 'object' ? tempWhere.field.fieldType.type : 'Text';

    if ( fieldVType === 'Boolean') {

        if ( tempWhere.val === '1' || tempWhere.val === '0' ) { } //all is ok

        else if ( tempWhere.val === 'false' || tempWhere.val === 'FALSE'  || tempWhere.val === 'False'  ) { tempWhere.val = '0'; }
        else if ( tempWhere.val === 'true' || tempWhere.val === 'TRUE'  || tempWhere.val === 'True'  ) { tempWhere.val = '1'; }
        else { alert('Boolean value for \'' + fieldName + '\' can\'t be \'' + tempWhere.val +'\''); }

    }
    //console.log('buildFieldWhereTag', tempWhere, tempWhere.field, fieldVType, thisOper);

    if ( thisOper.o == IsNull.o || thisOper.o == IsNotNull.o ) {
        thisXML = '<' + thisOper.q + '>' + thisXML + '</' + thisOper.q + '>';
        //Sample of thisXML:      <IsNull><FieldRef Name="Leader" /></IsNull>

    } else if ( thisOper.o == Contains.o || thisOper.o == BeginsWith.o || fieldVType === 'Text' || fieldVType === 'Choice' || fieldNType === 'SP.FieldMultiLineText' ) {
        //This is essentially what should be the Text loop... but includes Contains and Begins with because those should be text anyway.

        if ( fieldVType !== 'Text' && fieldVType !== 'Choice' && fieldNType !== 'SP.FieldMultiLineText') {
            alert('Bad Where in \'' + fieldName + '\': Can\'t use \'' +  thisOper.o + '\' with this type of field:' + fieldVType );
            success = false;

        } else {
            //I don't think Contains can be mixed with Indexed fields... or at least there may be a conflict.
            if ( isFieldIndexed === true && ( thisOper.o == Contains.o /*|| thisOper.o == BeginsWith.o */ ) ) {
                alert('Can\'t do \'' + thisOper.o + '\' on the indexed field: \'' +  fieldName + '\'');
                success = false;

            } else {
                thisXML = '<' + thisOper.q + '>' + thisXML + getValueTag(tempWhere.val, "Text") + '</' + thisOper.q + '>';
                //Sample of thisXML:       <Neq><FieldRef Name="StatusTMT" /><Value Type="Text">BEG</Value></Neq>
            }

        }

    } else {

        thisXML = '<' + thisOper.q + '>' + thisXML + getValueTag(tempWhere.val, fieldVType ) + '</' + thisOper.q + '>';
        //Sample of thisXML:       <Neq><FieldRef Name="StatusTMT" /><Value Type="Text">BEG</Value></Neq>

    }

    //console.log('buildFieldWhereTag - thisXML:', thisXML);
    //NOTE:  Contains & Begins With can only be applied to Text, simple Multiline Text, Single Choice fields

    let result = success ? thisXML : '';

    return result;
}


/***
 *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db 
 *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 
 *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 
 *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88 
 *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 
 *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P 
 *                                                                          
 *                                                                          
 */

//private async ensureTrackTimeList(myListName: string, myListDesc: string, ProjectOrTime: string): Promise<boolean> {

export async function addTheseViews( listExistedB4 : boolean, readOnly: boolean, myList: IMyListInfo, ensuredList, currentViews, viewsToAdd: IMyView[], setProgress: any, alertMe: boolean, consoleLog: boolean, skipTry = false): Promise<IViewLog[]>{

    let statusLog : IViewLog[] = [];
    
    let listViews = null;

    if (readOnly === false ) {
        if ( ensuredList.list === undefined ) {
            listViews = ensuredList.views;
        } else {
            listViews = ensuredList.list.views;
        }
    } else { 
        listViews = ensuredList.views;
    }

      /**
    * @param progressHidden 
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
   */

    setProgress(false, "V", 0, 0 , '', 'TimePicker', myList.title, 'Adding VIEWS to list: ' + myList.title, 'Checking for VIEWS', 'Add view ~ 194'  );

    //let returnArray: [] = [];

    let iV = 0;
    let nV = viewsToAdd.length;

    for (let v of viewsToAdd) {
        iV++;

        setProgress(false, "V", iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Adding views to list: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 198' );

        /**
         * Build view settings schema
         */
        let foundView = false;
        //Assuming that if I'm creating a column, it's an object with .name value.
        let checkView = v.Title ;
        let currentViewIndex = doesObjectExistInArray(currentViews, 'Title', checkView );
        let actualViewSchema = '';
        if ( doesObjectExistInArray(currentViews, 'Title', checkView ) ) {
            foundView = true;
            let vIndex : any = currentViewIndex;
            actualViewSchema = currentViews[parseInt(vIndex,10)].ListViewXml;
            
        } else {
            foundView = false;
            let err = `The ${myList.title} list does not have this view yet:  ${checkView}`;
            statusLog = notify(statusLog, v,  'Checked View', 'create', err, null);
        }


    /***
     *    db    db d888888b d88888b db   d8b   db      d88888b d888888b d88888b db      d8888b. .d8888. 
     *    88    88   `88'   88'     88   I8I   88      88'       `88'   88'     88      88  `8D 88'  YP 
     *    Y8    8P    88    88ooooo 88   I8I   88      88ooo      88    88ooooo 88      88   88 `8bo.   
     *    `8b  d8'    88    88~~~~~ Y8   I8I   88      88~~~      88    88~~~~~ 88      88   88   `Y8b. 
     *     `8bd8'    .88.   88.     `8b d8'8b d8'      88        .88.   88.     88booo. 88  .8D db   8D 
     *       YP    Y888888P Y88888P  `8b8' `8d8'       YP      Y888888P Y88888P Y88888P Y8888D' `8888Y' 
     *                                                                                                  
     *                                                                                                  
     */
            //console.log('addTheseViews (v): ', v);
            /**
             * Build VewFields schema
             */

            let viewFieldsSchema = v.iFields.map( thisField => { 
                let tempField : IViewField = JSON.parse(JSON.stringify(thisField));
                let fieldName = typeof tempField  === 'object' ? tempField.name : tempField;
                return '<FieldRef Name="' + fieldName + '" />';
            });

            let viewFieldsSchemaString: string = '';
            if ( viewFieldsSchema.length > 0) {
                //viewFieldsSchemaString = '<ViewFields>' + viewFieldsSchema.join('') + '</ViewFields>';
                viewFieldsSchemaString = viewFieldsSchema.join('');            
            }

            //console.log('addTheseViews', viewFieldsSchema, viewFieldsSchemaString);


/***
 *     d888b  d8888b.  .d88b.  db    db d8888b.      d8888b. db    db 
 *    88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D      88  `8D `8b  d8' 
 *    88      88oobY' 88    88 88    88 88oodD'      88oooY'  `8bd8'  
 *    88  ooo 88`8b   88    88 88    88 88~~~        88~~~b.    88    
 *    88. ~8~ 88 `88. `8b  d8' 88b  d88 88           88   8D    88    
 *     Y888P  88   YD  `Y88P'  ~Y8888P' 88           Y8888P'    YP    
 *                                                                    
 *                                                                    
 */
        /**
         * Build view Query schema:  <GroupBy Stuff="Here"><OrderBy></OrderBy><Where></Where>
         */

        let viewGroupByXML = '';
        if (v.groups != null) {
            if ( v.groups.fields.length > 2) {
                alert('You are trying to GroupBy more than 2 fields!: ' + v.groups.fields.length);
                setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'GroupBy error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 264' );

            } else if (v.groups.fields != null && v.groups.fields.length > 0 ) {
                if (v.groups.collapse === true ) { viewGroupByXML += ' Collapse="TRUE"'; }
                if (v.groups.collapse === false ) { viewGroupByXML += ' Collapse="FALSE"'; }
                if (v.groups.limit != null ) { viewGroupByXML += ' GroupLimit="' + v.groups.limit + '"'; }

                viewGroupByXML = '<GroupBy' + viewGroupByXML + '>';

                viewGroupByXML += v.groups.fields.map( thisField => {
                    return buildFieldOrderTag(thisField);
                }).join('');

                viewGroupByXML += '</GroupBy>';
                //console.log('<OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy>');
                //console.log('viewGroupByXML', viewGroupByXML);
            }
        }


/***
 *     .d88b.  d8888b. d8888b. d88888b d8888b.      d8888b. db    db 
 *    .8P  Y8. 88  `8D 88  `8D 88'     88  `8D      88  `8D `8b  d8' 
 *    88    88 88oobY' 88   88 88ooooo 88oobY'      88oooY'  `8bd8'  
 *    88    88 88`8b   88   88 88~~~~~ 88`8b        88~~~b.    88    
 *    `8b  d8' 88 `88. 88  .8D 88.     88 `88.      88   8D    88    
 *     `Y88P'  88   YD Y8888D' Y88888P 88   YD      Y8888P'    YP    
 *                                                                   
 *                                                                   
 */

        let viewOrderByXML = '';
        if (v.orders != null) {
            if ( v.orders.length > 2 ) {
                alert('You are trying to OrderBy more than 2 fields!: ' + v.groups.fields.length);
                setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, '2 Order Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 299' );

            } else if ( v.orders.length === 0 ) {
                alert('You have view.orders object with no fields to order by!');
                setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'No Order Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 303' );

            } else {

                viewOrderByXML += v.orders.map( thisField => {
                    return buildFieldOrderTag(thisField);
                }).join('');
            }

        }


/***
 *    db   d8b   db db   db d88888b d8888b. d88888b 
 *    88   I8I   88 88   88 88'     88  `8D 88'     
 *    88   I8I   88 88ooo88 88ooooo 88oobY' 88ooooo 
 *    Y8   I8I   88 88~~~88 88~~~~~ 88`8b   88~~~~~ 
 *    `8b d8'8b d8' 88   88 88.     88 `88. 88.     
 *     `8b8' `8d8'  YP   YP Y88888P 88   YD Y88888P 
 *                                                  
 *                                                  
 */

        let viewWhereXML = '';
        if ( v.wheres != null && v.wheres.length > 0 ) {

            //Get array of where items
            let viewWhereArray = v.wheres.map( thisWhere => {
                return buildFieldWhereTag(thisWhere);

            });
            //console.log('viewWhereArray', viewWhereArray);

            //Go through each item and add the <Or> or <And> Tags around them
            let hasPreviousAnd = false;
            let previousAnd = '';

            for (let i in viewWhereArray ) {
                let thisClause = i === '0' ? '' : v.wheres[i].clause;
                let thisFieldWhere = viewWhereArray[i];

                if ( viewWhereArray.length === 0 ) {
                    //You need to have something in here for it to work.
                    alert('Field was skipped because there wasn\'t a valid \'Where\' : ' + v.wheres[i].field );
                    setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Invalid Where: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 347' );

                } else if ( viewWhereArray.length === 1 ) {
                    viewWhereXML = thisFieldWhere;

                } else if ( hasPreviousAnd === true && thisClause === 'Or' ) {
                    //In UI, you can't have an OR after an AND... , it works but will not work editing the view through UI then.
                    alert('Can\'t do \'Or\' clause because for ' + thisFieldWhere + ' because there was already an \'And\' clause here:  ' + previousAnd);
                    setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Can\'t do Or after And: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 355' );

                } else {
                    //console.log( 'thisClause, thisFieldWhere', thisClause, thisFieldWhere );
                    // '<' + thisOper.q + '>'

                    if ( thisClause != '' && thisFieldWhere != '' ){ //Valid clause found... wrap entire string in it
                        if ( viewWhereXML != ''){
                            viewWhereXML = viewWhereXML + thisFieldWhere;  //Add new field to previous string;
                            viewWhereXML = '<' + thisClause + '>' + viewWhereXML + '</' + thisClause + '>';
                            
                        } else {
                            alert('Can\'t wrap this in clause because there is not any existing field to compare to ' + thisFieldWhere );
                            setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Can\'t Compare field: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 368' );
                            viewWhereXML = viewWhereXML + thisFieldWhere;  //Add new field to previous string;
                        }

                    } else if ( i === '0' && thisFieldWhere != '' && viewWhereArray.length === 2 ) {
                        //Had to add this while testing TMTView:  VerifyNoStoryOrChapterView
                        viewWhereXML = thisFieldWhere;

                    }
                }

                if ( thisClause === 'And') { hasPreviousAnd = true ; previousAnd = thisFieldWhere; }

            }
        }


/***
 *          .o88b.  .d88b.  .88b  d88. d8888b.  .d8b.  d8888b. d88888b 
 *         d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D d8' `8b 88  `8D 88'     
 *         8P      88    88 88  88  88 88oodD' 88ooo88 88oobY' 88ooooo 
 *         8b      88    88 88  88  88 88~~~   88~~~88 88`8b   88~~~~~ 
 *         Y8b  d8 `8b  d8' 88  88  88 88      88   88 88 `88. 88.     
 *          `Y88P'  `Y88P'  YP  YP  YP 88      YP   YP 88   YD Y88888P 
 *                                                                     
 *                                                                     
 */
        let errMess = '';
        let actualWhere = getXMLObjectFromString( actualViewSchema, 'Where', false, true) ;
        let actualGroupBy = getXMLObjectFromString( actualViewSchema, 'GroupBy', false, false) ;
        let actualOrderBy = getXMLObjectFromString( actualViewSchema, 'OrderBy', false, true) ;
        let actualFields = getXMLObjectFromString( actualViewSchema, 'ViewFields',false, true) ;

        if ( readOnly === true || listExistedB4 === true || iV === 1 ) {  //Only compare if in read only because if not, it will just over-write, exception is first list which should be the default one.
            if ( viewWhereXML !== actualWhere) {
                errMess += '\n\nCurrent Where:\n' + actualWhere + '\n\nExpected Where:\n' + viewWhereXML;
             }  

            if ( viewGroupByXML !== actualGroupBy) {
                errMess += '\n\nCurrent GroupBy:\n' + actualGroupBy + '\n\nExpected GroupBy:\n' + viewGroupByXML;
            }
    
            if ( viewOrderByXML !== actualOrderBy) {
                errMess += '\n\nCurrent OrderBy:\n' + actualOrderBy + '\n\nExpected OrderBy:\n' + viewOrderByXML;
            } 

            if ( viewFieldsSchemaString !== actualFields) {
                errMess += '\n\nCurrent Fields:\n' + actualFields + '\n\nExpected Fields:\n' + viewFieldsSchemaString;
            }

            if ( errMess === '' ) {
                setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Checked Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Compare View ~ 429' );
            } else {
                setProgress(false, "E", iV, nV , 'darkorange', 'Warning12', v.Title, 'Unexpected Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Compare View ~ 431' + errMess);
            }

        }


/***
 *    .d8888.  .o88b. db   db d88888b .88b  d88.  .d8b.                                      
 *    88'  YP d8P  Y8 88   88 88'     88'YbdP`88 d8' `8b        db          db          db   
 *    `8bo.   8P      88ooo88 88ooooo 88  88  88 88ooo88        88          88          88   
 *      `Y8b. 8b      88~~~88 88~~~~~ 88  88  88 88~~~88      C8888D      C8888D      C8888D 
 *    db   8D Y8b  d8 88   88 88.     88  88  88 88   88        88          88          88   
 *    `8888Y'  `Y88P' YP   YP Y88888P YP  YP  YP YP   YP        VP          VP          VP   
 *                                                                                           
 *                                                                                           
 */

        /**
         * Combine all schema elements together
         */

        let viewQueryXML = '';
        if (viewWhereXML != '') { viewQueryXML += '<Where>' + viewWhereXML + '</Where>';}
        if (viewGroupByXML != '') { viewQueryXML += '' + viewGroupByXML + '';} //Tags included in initial build because of special props.
        if (viewOrderByXML != '') { viewQueryXML += '<OrderBy>' + viewOrderByXML + '</OrderBy>';}


    /***
     *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      db    db d888888b d88888b db   d8b   db 
     *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88    88   `88'   88'     88   I8I   88 
     *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      Y8    8P    88    88ooooo 88   I8I   88 
     *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      `8b  d8'    88    88~~~~~ Y8   I8I   88 
     *    Y8b  d8 88 `88. 88.     88   88    88    88.           `8bd8'    .88.   88.     `8b d8'8b d8' 
     *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P         YP    Y888888P Y88888P  `8b8' `8d8'  
     *                                                                                                  
     *                                                                                                  
     */

        if ( foundView === false ) {

            /**
             * Available options:  https://github.com/koltyakov/sp-metadata/blob/baf1162394caba1222947f223ed78c76b4a72255/docs/SP/EntityTypes/View.md
             */

            if ( readOnly === false ) {

                try {
                    //console.log('BEFORE CREATE VIEW:  viewQueryXML', viewQueryXML);
                    let createViewProps = { 
                        RowLimit: v.RowLimit == null ? 30 : v.RowLimit,
                        TabularView: v.TabularView !== false ? true : false,
                    };
    
                    if ( viewQueryXML != '' ) { createViewProps["ViewQuery"] = viewQueryXML; }
    
                    //createViewProps["ViewQuery"] = "<OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy>";
                    const result = await listViews.add(v.Title, false, createViewProps );
    
                    statusLog = notify(statusLog, v, 'Creating View', 'Create', null, null);
    
                    let viewXML = result.data.ListViewXml;
    
                    let ViewFieldsXML = getXMLObjectFromString(viewXML,'ViewFields',false, true);
                    //console.log('ViewFieldsXML', ViewFieldsXML);
                    viewXML = viewXML.replace(ViewFieldsXML,viewFieldsSchemaString);
    
                    await result.view.setViewXml(viewXML);
                    setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Updated Schema: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Updated View ~ 498' );

                } catch (e) {
                    // if any of the fields does not exist, raise an exception in the console log
                    let errMessage = getHelpfullError(e);
                    if (errMessage.indexOf('missing a column') > -1) {
                        let err = `The ${myList.title} list does not have this column yet:  ${v.Title}`;
                        statusLog = notify(statusLog,  v, 'Creating View', 'Create',err, null);
                        setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Field does not exist: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 453' );
                    } else {
                        let err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
                        statusLog = notify(statusLog, v, 'Creating View', 'Create', err, null);
                        setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Unknown error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 457' );
                    }
                }
    
                /**
                 * Add response, comments, alerts
                 */
            }
        } else {
            //List existed before.... do update?

            let updateList = false;
            if ( readOnly === false && listExistedB4 === true && errMess !== '' ) { updateList = true; }
            if ( listExistedB4 === false && errMess !== '' && iV === 1 ) { updateList = true; }  //This should be default view... update it if needed         

            if ( updateList ) {

                try {
                    // Get old schema = actualViewSchema
                    let newViewXML = actualViewSchema;
                    let actualViewFieldsXML = getXMLObjectFromString(actualViewSchema,'ViewFields',false, true);
                    let actualQueryXML = getXMLObjectFromString(actualViewSchema,'Query',false, true);

                    // replace portions that need replacing
                    newViewXML = newViewXML.replace(actualQueryXML, viewQueryXML);
                    newViewXML = newViewXML.replace(actualViewFieldsXML,viewFieldsSchemaString);

                    //Update view schema
                    await listViews.getByTitle(v.Title).setViewXml(newViewXML);
                    setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Updated View: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 533' + errMess );

                } catch (e) {
                    let errMessage = getHelpfullError(e);
                    if (errMessage.indexOf('missing a column') > -1) {
                        let err = `The ${myList.title} list does not have this column yet:  ${v.Title}`;
                        statusLog = notify(statusLog,  v, 'Updating View', 'Create',err, null);
                        setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Field does not exist: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 539' );
                    } else {
                        let err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
                        statusLog = notify(statusLog, v, 'Updating View', 'Create', err, null);
                        setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Unknown error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 543' );
                    }
                }

            }

        } //END:  Found === false

    }  //END: for (let f of fieldsToAdd) {
    //alert('Added views to list:' );
    //console.log('addTheseViews', statusLog);
    return(statusLog);

}

/** Sample default simple view schema
 * <View 
 * Name="{B02AD2F6-34B3-4AF9-BA56-4B29BF28C49E}" 
    * DefaultView="TRUE" 
    * MobileView="TRUE" 
    * MobileDefaultView="TRUE" 
    * Type="HTML" 
    * DisplayName="All Items" 
    * Url="/sites/Templates/Tmt/Lists/Projects/AllItems.aspx" 
 * Level="1" BaseViewID="1" 
 * ContentTypeID="0x" 
 * ImageUrl="/_layouts/15/images/generic.png?rev=47" >
    <Query>
        <OrderBy>
            <FieldRef Name="ID" Ascending="FALSE" />
        </OrderBy>
    </Query>
    <ViewFields>
        <FieldRef Name="ID" />
        <FieldRef Name="Active" />
        <FieldRef Name="StatusTMT" />
        <FieldRef Name="SortOrder" />
        <FieldRef Name="LinkTitle" />
        <FieldRef Name="Everyone" />
        <FieldRef Name="Category1" />
        <FieldRef Name="Category2" />
        <FieldRef Name="ProjectID1" />
        <FieldRef Name="ProjectID2" />
        <FieldRef Name="TimeTarget" />
        <FieldRef Name="Story" />
        <FieldRef Name="Chapter" />
        <FieldRef Name="Leader" />
    </ViewFields>
    <RowLimit Paged="TRUE">30</RowLimit>
    <Aggregations Value="Off" />
    <JSLink>clienttemplates.js</JSLink>
    <XslLink Default="TRUE">main.xsl</XslLink>
    <CustomFormatter />
    <ColumnWidth>
        <FieldRef Name="Title" width="265" />
        <FieldRef Name="Options" width="321" />
    </ColumnWidth>
    <ViewData />
    <Toolbar Type="Standard"/>
</View>
 */

/**  Sample schema
*/

/**  Sample schema
 * 
 * 
 * 
 <Where>
	<And>
		<Or>
			<Or>
				<Or>
					<Neq>
						<FieldRef Name="Leader" />
						<Value Type="Integer">
							<UserID Type="Integer" />
						</Value>
					</Neq>
					<Neq>
						<FieldRef Name="StatusNumber" />
						<Value Type="Number">9</Value>
                    </Neq>
				</Or>
				<Contains>
					<FieldRef Name="StatusTMT" />
					<Value Type="Text">CCC</Value>
				</Contains>
			</Or>
			<BeginsWith>
				<FieldRef Name="StatusText" />
				<Value Type="Text">BEG</Value>
			</BeginsWith>
		</Or>
		<Geq>
			<FieldRef Name="Modified" />
			<Value Type="DateTime">
				<Today OffsetDays="-1" />
			</Value>
		</Geq>
	</And>
</Where>


<Where>
	<And>
		<Or>
			<Or>
				<Or>
					<Neq>
						<FieldRef Name="Leader" />
						<Value Type="Integer">
							<UserID Type="Integer" />
						</Value>
					</Neq>
					<Neq>
						<FieldRef Name="StatusNumber" />
						<Value Type="Number">9</Value>
					</Neq>
				</Or>
				<IsNull>
					<FieldRef Name="CCEmail" />
				</IsNull>
			</Or>
			<Eq>
				<FieldRef Name="Created" />
				<Value Type="DateTime">
					<Today OffsetDays="-999" />
				</Value>
			</Eq>
		</Or>
		<Geq>
			<FieldRef Name="Modified" />
			<Value Type="DateTime">
				<Today OffsetDays="-1" />
			</Value>
		</Geq>
	</And>
</Where>

<Where>
	<Or>
		<Or>
			<Or>
				<Or>
					<Eq>
						<FieldRef Name="ID" />
						<Value Type="Counter">1</Value>
					</Eq>
					<Eq>
						<FieldRef Name="Everyone" />
						<Value Type="Boolean">1</Value>
					</Eq>
				</Or>
				<IsNull>
					<FieldRef Name="Author" />
				</IsNull>
			</Or>
			<Eq>
				<FieldRef Name="Leader" />
				<Value Type="User">Clicky McClickster</Value>
			</Eq>
		</Or>
		<Eq>
			<FieldRef Name="Team" />
			<Value Type="Integer">
				<UserID Type="Integer" />
			</Value>
		</Eq>
	</Or>
</Where>
<GroupBy Collapse="TRUE" GroupLimit="30">
	<FieldRef Name="Author" />
	<FieldRef Name="Created" Ascending="FALSE" />
</GroupBy>
 */