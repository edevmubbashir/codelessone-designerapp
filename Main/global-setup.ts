import { UserCredentials } from "../appsettings/variables";
import LoginService from "../Services/Login";
import Driver from "./Driver";

module.exports = async () => {

    const username = UserCredentials.userName;
    const password = UserCredentials.userPassword;
    const url = UserCredentials.baseUrl;

    const page = await Driver.openNewBrowser();
    const accoutnSignUp = new LoginService(page);
    await accoutnSignUp.LoginToCodelessOne(url,username,password);
    await page.context().storageState({path:'login.json'});
}