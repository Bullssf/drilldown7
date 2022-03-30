import * as React from 'react';

import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';

import { DoNotExpandLinkColumns, DoNotExpandTrimB4, DoNotExpandTrimAfter, DoNotExpandTrimSpecial } from '../../../../services/getInterface';

import stylesD from './drillComponent.module.scss';

export const WebPartHelpElement = <div>
<Pivot 
        linkFormat={PivotLinkFormat.links}
        linkSize={PivotLinkSize.normal}
    //   style={{ flexGrow: 1, paddingLeft: '10px' }}
    //   styles={ null }
    //   linkSize= { pivotOptionsGroup.getPivSize('normal') }
    //   linkFormat= { pivotOptionsGroup.getPivFormat('links') }
    //   onLinkClick= { null }  //{this.specialClick.bind(this)}
    //   selectedKey={ null }
    >
        <PivotItem headerText={ 'Refiner Rules' } > 
        <div className={ stylesD.helpContent}>
            <div className={ stylesD.topic}>Setting the Refiner 'Column Value'</div>
            <div><b>StaticColumnName</b> - NOTE:  StaticColumn names are not the Titles you see.</div>

            <div className={ stylesD.topic}>For User columns (Single/Multi) on the main list (can not be part of lookup column)</div>
            <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div>

            <div className={ stylesD.topic}>For Lookup columns (Single/Multi) - that are brought in under the LookupColumn</div>
            <div><b>LookupColumnName/Title</b> - /Title shows the Title field from the lookup item</div>

        </div>
    </PivotItem>
    <PivotItem headerText={ 'Refiner Columns' } > 
        <div className={ stylesD.helpContent}>
            <div className={ stylesD.topic}>Setting the Refiner 'Column Value'</div>
            <div className={ stylesD.topic}>For a simple column (Text, Date, Number, Single/Multi Select Choice)</div>
            <div><b>StaticColumnName</b> - NOTE:  StaticColumn names are not the Titles you see.</div>

            <div className={ stylesD.topic}>For User columns (Single/Multi) on the main list (can not be part of lookup column)</div>
            <div><b>UserColumnName/Title</b> - /Title shows the person's Name</div>

            <div className={ stylesD.topic}>For Lookup columns (Single/Multi) - that are brought in under the LookupColumn</div>
            <div><b>LookupColumnName/Title</b> - /Title shows the Title field from the lookup item</div>
            <div><b>LookupColumnName/OtherField</b> - /OtherField is the StaticColumnName of the lookup column from the other list</div>
            <div style={{ paddingTop: '8px'}}>So if you have a lookup column like 'CustomerPlant' which has a Title column (Plant name) and Country column (where it is located)</div>
            <div>To show Customer Plant Title, use <b>CustomerPlant/Title</b></div>
            <div>To show Customer Plant Country, use <b>CustomerPlant/Country</b></div>
        </div>
    </PivotItem>
    <PivotItem headerText={ 'Column Functions' } > 
        <div className={ stylesD.helpContent}>
            <div className={ stylesD.topic}>Special column string functions</div>
            <div>Can be applied to columns to modify the values for this webpart - like an ad-hoc calculated column but more.</div>
            <div>For example, lets say you want to show the initials of the Editor (Modified By)</div>
            <div>To get the full name of the editor, use <b>Editor/Title</b></div>
            <div>To get their initials instead, use <b>Editor/Title<span style={{color: 'green'}}>/Initials</span></b></div>

            <div className={ stylesD.topic}>Splitting text Before a character</div>
            <div> /{ DoNotExpandTrimB4.join(', /') } </div>
            <div className={ stylesD.topic}>Splitting text After a character</div>
            <div> /{ DoNotExpandTrimAfter.join(', /') } </div>
            <div className={ stylesD.topic}>Words and initials</div>
            <div> /{ DoNotExpandTrimSpecial.join(', /') } </div>

            <div className={ stylesD.topic}>Getting link columns</div>
            <div> /{ DoNotExpandLinkColumns.join(', /') } </div>
        </div>
    </PivotItem>
    <PivotItem  headerText={ 'View Fields' } >
        <div>
            <h3>More to come</h3>
        </div>

    </PivotItem>
</Pivot>
</div>;