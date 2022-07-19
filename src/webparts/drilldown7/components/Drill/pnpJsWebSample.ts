import { spfi } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/webs";

//This is the way I used to get it.
export function getWebV2() {
    let thisListWeb = Web('https://tenant.sharepoint.com/sites/FPS/');
    let items = thisListWeb.lists.getByTitle("Test").items();

}

export async function getWebV3() {
    //Getting error on this line  "Expression expected" where the 3 dots are.
    const sp = spfi('https://tenant.sharepoint.com/sites/FPS/');
    const r = await sp.web();

}

