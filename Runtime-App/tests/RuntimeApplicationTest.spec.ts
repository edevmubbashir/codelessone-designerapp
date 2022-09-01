import { test, Page, expect } from "@playwright/test";
import { UserCredentials } from "../../appsettings/variables";
import RuntimeLoginService from "../services/runtimeLogin/runtimeLogin";
import * as testdata from "../../appsettings/testdata.json";

import Driver from "../../main/driver";
import ApplicationDashboard from "../services/runtimeLogin/projectDashboard";
import PortalNavigationService from "../services/portal/masterNavigation";
import { dir } from "console";

// test.beforeAll(async () => {
//     const url = UserCredentials.designerUrl;
//     const username = UserCredentials.userName;
//     const password = UserCredentials.userPassword;
//     const orgName = UserCredentials.organizatioName;
//     const AppName = UserCredentials.applicationName;

//     Driver.page = await Driver.openNewBrowser();
//     const accoutnSignUp = new RuntimeLoginService(Driver.page);

//     // USE BELOW METHOD IF WE WANT TO EXECUTE COMPLETE TRANSACTION LIKE CREATE NEW APP
//     await accoutnSignUp.LoginToCodelessOne(url, username, password);

//     // USE BELOW METHOD IF WE WANT TO CREAT ENTITIES ON ALREADY CREATED APPLICATION
//     //await accoutnSignUp.LoginAndOpenSpecificOrgAndProject(url,orgName,AppName,username,password);
//   });

test.describe("Verify That Designer Application Rules Working fine on Runtime", async () => {
  const url = UserCredentials.runtimeUrl;
  const username = UserCredentials.userName;
  const password = UserCredentials.userPassword;
  const orgName = UserCredentials.organizatioName;
  const appName = UserCredentials.applicationName;

  const urlWithOrgName = url + orgName;

  Driver.page = await Driver.openNewBrowser();
  const accoutnSignUp = new RuntimeLoginService(Driver.page);
  const appDashboard = new ApplicationDashboard(Driver.page);
  const navigation = new PortalNavigationService(Driver.page);

  test("Runtime Test 01", async () => {
    //  LOGIN TO CODELESS ONE RUNTIME APP
    // USE BELOW METHOD IF WE WANT TO EXECUTE COMPLETE TRANSACTION LIKE CREATE NEW APP
    await accoutnSignUp.loginToCodelessOne(
      urlWithOrgName,
      username,
      password,
      appName
    );

    await appDashboard.verifyThatAppNameIsVisibleOnDashboard(appName);
    await appDashboard.selectApplicationFromDashboard(appName);
    await appDashboard.seletPortal();

    //await Driver.waitForNavigation();

    let entityList: Array<string> = [
      testdata.entityNames[0],
      testdata.entityNames[1],
    ];

    let actualEntities = await navigation.getEntitiesShowingOnRuntime();
    expect(actualEntities).toEqual(entityList);

    await navigation.selectEntity(testdata.entityNames[1]);
    //Line Added by Hassan Imam
  });

  test.skip("To verify Nre Record Creation", async () => {
    await navigation.selectNewButton();
    //await navigation.VerifyAttributesName();
    //await navigation.ExpectCancelSaveAndNewSaveButton();
  });
});
