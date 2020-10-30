import { Web, IList, IItem } from "@pnp/sp/presets/all";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/site-users/web";

import { IRefiners, IRefinerLayer, IItemRefiners, RefineRuleValues, RefinerStatTypes, IRefinerStats, IRefinerStatType, IUser } from '../webparts/drilldown7/components/IReUsableInterfaces';

export async function ensureUserInfo ( webURL: string, userEmail: string ) {

    let thisListWeb = Web(webURL);
    //const username = "mike.zimmerman@autoliv.com";
    let result = await thisListWeb.ensureUser(userEmail);
    console.log('userInfo', result );

    let thisUser: IUser = {
            title: result.data.Title,
            Title: result.data.Title,
            initials: '',  //Single person column
            email: result.data.Email,  //Single person column
            id: result.data.Id,
            Id: result.data.Id,
            ID: result.data.Id,
          
            isSiteAdmin:result.data.IsSiteAdmin,
            LoginName: result.data.LoginName,
            Name: result.data.LoginName,
          
            //These optional props are from the React PeoplePicker control
            imageInitials: '', //same as Initials,         From React People Picker control
            imageUrl: '',  //Thumbnail URL,                From React People Picker control
            loginName: result.data.LoginName,  //Same as LoginName and Name,  From React People Picker control
            text: result.data.Title,   //Same as Title and title,         From React People Picker control

            ensureWeb: webURL,
    };

    return thisUser;
}
