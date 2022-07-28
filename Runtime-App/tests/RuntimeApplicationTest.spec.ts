import { test, Page, expect } from "@playwright/test";
import { UserCredentials } from "../../appsettings/variables";
import RuntimeLoginService from "../Services/RuntimeLogin/RuntimeLogin";
import * as testdata from "../../appsettings/testdata.json";

import Driver from "../../Main/Driver";
import ApplicationDashboard from "../Services/RuntimeLogin/ProjectDashboard";
import PortalNavigationService from "../Services/Portal/MasterNavigation";
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

test.describe(
  "Verify That Designer Application Rules Working fine on Runtime",
  async () => {
    test("Runtime Test 01", async () => {
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

      //  LOGIN TO CODELESS ONE RUNTIME APP
      // USE BELOW METHOD IF WE WANT TO EXECUTE COMPLETE TRANSACTION LIKE CREATE NEW APP
      await accoutnSignUp.LoginToCodelessOne(
        urlWithOrgName,
        username,
        password,
        appName
      );

      await appDashboard.VerifyThatAppNameIsVisibleOnDashboard(appName);
      await appDashboard.SelectApplicationFromDashboard(appName);
      await appDashboard.SeletPortal();

      await Driver.waitForNavigation();

      var entityList: Array<string> = [
        testdata.ENTITY_NAMES[0],
        testdata.ENTITY_NAMES[1],
      ];

      var actualEntities = await navigation.GetEntitiesShowingOnRuntime();
      expect(actualEntities).toEqual(entityList);

      await navigation.SelectEntity(testdata.ENTITY_NAMES[1]);
    });
  }
);
