// import * as React from 'react';
// import { escape } from '@microsoft/sp-lodash-subset';

// require('@mikezimm/npmfunctions/dist/PropPaneHelp/PropPanelHelp.css');

// import { PivotItem, } from 'office-ui-fabric-react/lib/Pivot';

// const LinkFindInternalName = <a href="https://tomriha.com/what-is-sharepoint-column-internal-name-and-where-to-find-it/" target="_blank">Finding Internal Name of a column</a>;

// export function getWebPartHelpElement ( ) {

//   const WebPartHelpElement = <PivotItem  headerText={ 'Commands' } >
//         <div className={ 'fps-pph-content' }>
//           <div className={ 'fps-pph-topic' }>Commands are buttons that can do updates to your list.</div>
//           <div>Commands can be simple or advanced.  Please join ShareLab if you want some help or have questions.</div>

//           <div style={{ display: 'flex' }}>
//             <div>
//               <div className={ 'fps-pph-topic' }>Sample Command</div>
//               { putObjectIntoJSON( SampleCommands ) }
//             </div>
//             <div>
//               <div className={ 'fps-pph-topic' }>About Commands structure</div>
//               <ul>
//                 <li>Must follow this minimum structure.</li>
//                 <li><mark>NOTE: </mark> <b>Quotes</b> are required per the example. <br/>All column names and view properties are <b>Case Sensitive</b>!</li>
//                 <li>Quick Commands structure is made up of an array of buttons, view fields may not yet be supported.</li>
//                 <li>{`the "buttons" is an array of rows.  Each row can have specific command buttons in it`}</li>
//                 <li>A typical button is made up of these common properites</li>
//                 <ul>
//                   <li><b>str1:</b> Use this like a variable to add a string to multiple places</li>
//                   <li><b>str2:</b> ^^^^^^^^, use like this:  label:{escape(`{str1}`)}</li>
//                   <li><b>label:</b> Button text</li>
//                   <li><b>primary:</b> true for highlighted button, false for typical button</li>
//                   <li><b>secondary:</b> Additional button text for primary buttons</li>
//                   <li><b>confirm:</b> Popup text asking to confirm update</li>
//                   <li><b>alert:</b> Popup text alert after save</li>
//                   <li><b>icon:</b> Icon name.  Go to <a href="https://www.flicon.io/" target="_blank">www.flicon.io</a> for complete list.</li>
//                   <li><b>updateItem:</b> JSON structure of the item to save.  See the full web part wiki for how to update dates, users and other list values.
//                     {/* <div><b>How to prompt for comments or text?</b></div>
//                     <ul>
//                       <li>{escape(`ColumnName: {{append rich stamp}}`)} will append a comment with settings in the curley braces listed below</li>
//                       <li><b>append</b> keyword:  will add comments to top of existing multi-line text field</li>
//                       <li><b>stamp</b> keyword:  will add User Initials and Date Stamp above your comment</li>
//                       <li><b>rich</b> keyword:  will <b>bold the Date Stamp</b> above your comment</li>
//                       <li>{escape(`ColumnName: {{}}`)} Use this syntax to replace current text with unformatted comment</li>
//                     </ul>
//                     <div><mark>NOTE:</mark>If you press Cancel to inputing a text comment, the item will still Update but set the value to null</div> */}
//                   </li>
                  
//                   <li><b>showWhenEvalTrue:</b> Shows button for specific user.  In this example, when the current user is NOT the person in the AssignedTo column.</li>
//                 </ul>
//               </ul>
//             </div>
//           </div>

//           <div style={{ display: 'flex' }}>
//             <div>
//               <div className={ 'fps-pph-topic' }>Advanced Column Updates</div>
//               { putObjectIntoJSON( AdvancedCommands ) }
//             </div>
//             <div>
//               <div className={ 'fps-pph-topic' }>Advanced Updates styntax and structure</div>
//               <ul>
//                 <li>Must follow this minimum structure listed above</li>
//                 <li>For simplicity, this portion just shows the updateItem object: fields that are updated.</li>
//                 <div style={{height: '15px' }}/>
//                 <li><mark>NOTE: </mark> <b>Quotes</b> are required per the example. <br/>All column names are <b>Case Sensitive</b>!</li>
//                   <li>Use the <b>{escape(`"{{append rich stamp required}}"`)}</b> syntax to prompt user for Comments or Text
//                     <ul>
//                       <li>Can include any or all of the above keywords inside the curley braces</li>
//                       <li>use <b>append</b> to add new text to the top of an existing multi-line text field</li>
//                       <li>use <b>stamp</b> to add a line above the comment with user initials and current timestamp</li>
//                       <li>use <b>rich</b> to make the stamp <b>bold rich text</b></li>
//                       <li>use <b>required</b> to require an actual comment - at least a single letter or number.  Empty or cancel will fail</li>
//                     </ul>
//                   </li>
//                   <div style={{height: '15px' }}/>
//                   <li>Use the <b>{`"{{captcha=Author/Title?Verify Created By Name}}"`}</b> syntax to prompt user for a specific response
//                     <ul>
//                       <li>You could use this to ask a person to verify their name is in a particular field for successful save.</li>
//                       <li>This <b>DOES NOT</b> actually verify who they are!</li>
//                       <li>It will just force them to type something in and possibly prevent them from updating an item that you do not want them to update.</li>
//                       <li>For instance, if you have a generic account pc and want someone to confirm they picked something up, you could target the column their name would be in.</li>
//                       <li>It would not prevent someone from typing in someone elses name, just give them a test to make sure they are not accepting someone elses item by accident.</li>
//                       <li>Another potential use case, prompt to scan a unique bar code or tracability number that is already stored on the list item in another field.</li>
//                       <li>Must have following components:</li>
//                       <li><b>{`"{{  captcha    =    InternalFieldNameHere  ?   Prompt Text-Hint Here }}"`}</b></li>
//                       <li>More specifically, these strings are required:  <b>{`"{{  captcha    =     ?   }}"`}</b></li>
//                       <li>Require Captcha text meets same casing as test:  <b>{`"{{  captcha^    =     ?   }}"`}</b></li>
//                       <li>Require Item has a value to compare to to pass:  <b>{`"{{  captcha*    =     ?   }}"`}</b> - if no * and item does not have comparision to make, auto-passes</li>
//                       <li>Require Item has a value to compare AND proper CaSE is entered:  <b>{`"{{  captcha^*    =     ?   }}"`}</b> - MUST spell exactly like <b>captcha^*</b> </li>
//                       <li>You fill in the parts in between like <b>InternalFieldNameHere</b> and <b>Prompt Text-Hint Here</b></li>
//                       <li><b>Prompt Text-Hint Here</b> MUST NOT contain any of these special characters or words <b>{`"{{  captcha    =     ?   }}"`}</b></li>
//                       <li>Examples of <b>InternalFieldNameHere</b>
//                         <ul>
//                           <li>{`"{{ captcha = Author/Title ? }}"`} - Require CreatedBy Users name/title</li>
//                           <li>{`"{{ captcha = Receiver/Title ? }}"`} - Require Users name/title in a column called Receiver</li>
//                           <li>{`"{{ captcha* = Modified/YYYY-MM-DD ? }}"`} - Require Modified Date in format:  2022-12-25</li>
//                         </ul>
//                       </li>
//                     </ul>
//                   </li>
//                   <div style={{height: '15px' }}/>
//                   <li>Use the <b>{`"eval(  javascript function  )"`}</b> to assign a value using a condition
//                     <ul>
//                       <li><mark>NOTE: </mark> <b>This option requires knowledge of Javascript AND interal logic of the web part.</b></li>
//                       <li><b>If you are not using this with help from the SharePoint team, it is not supported.</b></li>
//                       <li>Must have following components: {`with all the correct "  \` and ' `} quote marks</li>
//                       <li>Double quotes around the entire eval object.</li>
//                       <li>Single quotes around the entire eval string within the braces.</li>
//                       <li>Back-tick quotes around string values in the eval function.</li>
//                       <div style={{height: '10px' }}/>
//                       <li><b>{`"eval( 'javascript function which returns the value you want' )"`}</b></li>
//                       <div style={{height: '10px' }}/>
//                       <li><b>{`"eval( 'item.TESTCOLUMN===\`RequiredValue\` ? \`[Today]\` : item.TESTCOLUMN===\`OtherValue\` ? null : item.TESTCOLUMN' )"`}</b></li>
//                       <div style={{height: '10px' }}/>
//                       <li>In the above example, if the column called TESTCOLUMN is equal to RequiredValue, then the column will be set with todays date.</li>
//                       <li>If the column called TESTCOLUMN is equal to OtherValue, then the column will be set to null.</li>
//                       <li>If neither of the conditions are met, the column will be set to the current value.... basically not change.</li>
//                     </ul>
//                   </li>

//               </ul>
//             </div>
//           </div>


//           { PleaseSeeWiki }
//         </div>
//       </PivotItem>
//   ;
 
//   return WebPartHelpElement;

// }