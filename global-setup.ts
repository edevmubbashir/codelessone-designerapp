import Driver from "./main/driver";
import { UserCredentials } from "./appsettings/variables";
import LoginService from "./designer-app/services/designerLogin/login";
import { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const url = UserCredentials.designerUrl;
  const username = UserCredentials.userName;
  const password = UserCredentials.userPassword;
  const organizationName = UserCredentials.organizatioName;
  const appName = UserCredentials.applicationName;
  const page = await Driver.openNewBrowser();
  const accoutnSignUp = new LoginService(page);
  await accoutnSignUp.loginToCodelessOne(url, username, password);
  await page.context().storageState({ path: "firstUser.json" });
}

export default globalSetup;
