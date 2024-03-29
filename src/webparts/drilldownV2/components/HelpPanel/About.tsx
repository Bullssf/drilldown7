import * as React from 'react';

import { IHelpTable, } from '@mikezimm/fps-library-v2/lib/banner/components/SingleHelpPage/ISinglePageProps';
// import { convertIssuesMarkdownStringToSpan } from '../../fpsReferences';

import { createAboutRow } from '@mikezimm/fps-library-v2/lib/banner/components/Panel/createAboutRow';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';

export const panelVersionNumber = '2023-01-09 -  2.2.0.6'; //Added to show in panel

export function aboutTable( bannerProps: IWebpartBannerProps ): { table: IHelpTable; } {

  const showRepoLinks = bannerProps.showRepoLinks;
  const repoLink = bannerProps.gitHubRepo;

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    // table.rows.push( createAboutRow('',''  ,'#205 - General', showRepoLinks === true ? repoLink : null ) );
    // table.rows.push( createAboutRow('',''  ,'#205 - Bugs', showRepoLinks === true ? repoLink : null ) );
    // table.rows.push( createAboutRow('',''  ,'#205 - Featres', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2023-01-09','2.2.0.6'  ,'#292, #306, #310, #311, #312, #313, ', showRepoLinks === true ? repoLink : null ) );


    table.rows.push( createAboutRow('2023-01-06','2.2.0.5'  ,'#289, #304', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-12-25','2.2.0.4'  ,'#302 - attchments, Merry Fixmas', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-12-25','2.2.0.3'  ,'#284, #286, #293, #294, #295, #297, #298, #299, #300', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#140, #261, #273, #204, #288, #193, #291, #163', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-12-22','2.2.0.1'  ,'fps-library-v2 - FieldPanel b4 clean up', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-12-22','2.2.0.0'  ,'fps-library-v2 - no FieldPanel b4 clean up', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-20','2.0.0.9'  ,'#263, #264, #266, #267, #277, #279, #280 - Banner', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#70, #114, #199, #200, #224, #270, #271 - multi-line-text and views', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#227, #255, #268, #269, #272, #274, #276, #281 - various', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-15','2.0.0.8'  ,'EasyPages, EasyIcons', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-15','2.0.0.7'  ,'#253, #254, #245 - Captcha ', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#260 - EasyIcons, EasyPages', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-02','2.0.0.6'  ,'#230 - evalFilter, #233, #235, #236, #239, #242, #243, #246, #247 - Commands', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#240, #248, #249, #250 - Blue Bar', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-10-07','2.0.0.5'  ,'#225 - Fix', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-10-06','2.0.0.4'  ,'#72, #73, #84, #106, #156, #172, #158, #217, #218, #220 - Improvements', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#113, #208, #214, #215, #158, - Fixes', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-10-03','2.0.0.3'  ,'#144, #174 - Update QuickCommands capability, #142 - Link functions', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-09-24','2.0.0.2'  ,'SPFx v1.15.2', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#198, #207 - Bugs, #203 - General, #205 - Features', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-09-16','1.3.2.3'  ,'#169 - Quality of life', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#177, #181, #191, #192, #195 - Features', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',''  ,'#171, #185 - File links, #189 - banner fixes, #187, #190', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-09-12','1.3.1.3'  ,'#184, #186, Removed feature property from package-solution.json', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-09-11','1.3.0.4'  ,'#170, #176, #178, #179, #182', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-09-05','1.3.0.3'  ,'#134, #147, #161, #40, #166, #167, #168, ', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-08-20','1.3.0.2'  ,'#71 - Import settings, #101, #150, #152, #154, #155 - Add Performance to Help Panel', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-08-13','1.3.0.0'  ,'Refactoring:  #150, fpsPreferences, clean up', showRepoLinks === true ? repoLink : null ) );


    table.rows.push( createAboutRow('2022-04-04','1.2.0.11'  ,'#135, #137 - Assist in refiner typos, #136 - Show Unknown items tab for when multiselect column is empty.  #139 - trim functions', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-28','1.2.0.10'  ,'#128, #129 - number & Multi User Id refiners fix, #130, #131 - UI', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-28','1.2.0.9'  ,'#115 - links, #119 - refiner bug, #122 - more parsing on more things, npmFunctions v1.0.199', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#123 - improve error message, #124 - prop pane help, #125 - prop pane refresh', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-28','1.2.0.8'  ,'#80, #115, add text parsing to refiners, refactor gets', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-24','1.2.0.7'  ,'#111 - Special function column features', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-23','1.2.0.6'  ,'#107 - Special link column features', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-03-23','1.2.0.5'  ,'#103 - File Links, #104 - List Language for sorting', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-03-23','1.2.0.4'  ,'#96, #95, #42, #47, #94 - Fix Sorting with CAPS, trimming all refiner strings', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-22','1.2.0.3'  ,'#88, #90, Performance improvements', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#77, #78, #82, #83, #85 - Bug fixes', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#76, #86, #88, #92, #93, #97, #98, #99 - Improvements', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('"','"'                 ,'#85, #86 - Add Banner with Error Messages', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-03-18','1.2.0.2','Espanol language update, remove settings alerts!', showRepoLinks === true ? repoLink : null ) );


    table.rows.push( createAboutRow('2022-01-23','1.2.0.1','HelpPanel, npmFunctions v1.0.133', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('"'         ,'"'      ,'Fix #64, #65, #66', showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Prod Testing bugs, collapsable charts, displays in narrow section', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-11-03','1.1.0.3','Change solution guid back to 892e5eab42f8', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-11-02','1.1.0.1','Change solution guid from 892e5eab42f8 to bf19e6f8-99d0-47c2-9578-a8379831da9a', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0',<span>Add separate webparts for additional page layouts - 3 webparts available:  <b>Filters, Charts, List</b></span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-11-01','1.1.0.0',<span>Add <b>Quick Commands</b> including Filtering buttons, updating <b>Text, People, Dates, Numbers</b></span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-10-14','1.0.4.6',<span>Add <b>Early Access bar</b></span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-10-08','1.0.4.5',<span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-10-06','1.0.4.4',<span>Fix Refiners based on numbers, add <b>Math Groupings</b> + Bug fixes</span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.3','Add Buttons to Property Pane', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.2','Update Prop pane for Toggles and other settings', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-10-01','1.0.4.1',<span>Add Summary <b>Stats charts</b>, add <b>kpi-tiles</b> chart type</span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-09-29','1.0.3.1','Property Pane <b>listDefinition Selector</b> works now', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.2','Bump to test hosting issue', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-09-25','1.0.2.1',<span>Summary <b>Refiner charts</b> workingIncluding On-Click Reformat</span>, showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.2.0','Add Data and Charts Testing note', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-09-15','1.0.1.0','Add React based list With sorting, columnwidths, grouping and details button', showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2020-09-14','1.0.0.1','Baseline Drilldown from Generic Project With basic Pivot and Command bar options', showRepoLinks === true ? repoLink : null ) );
  
    return { table: table };

}

