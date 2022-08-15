import LoginService from "../Services/DesignerLogin/Login";
import Driver from "../../Main/Driver";
import MainCall from "../../Main/MainCall";
import { test, Page, expect } from "@playwright/test";
import { UserCredentials } from "../../appsettings/variables";
import NewApplicationService from "../Services/Application/NewApplication";
import config from "../../playwright.config";
import NewEntityService from "../Services/Entity/NewEntities";
import GeneralMethodServices from "../Services/SharedServices/GeneralMethodsServices";
import NewAttributeService from "../Services/Attributes/NewAttributes";
import NewEntityRelationsService from "../Services/Relations/EntityRelations";
import * as testdata from "../../appsettings/testdata.json";

test.beforeAll(async () => {
  const url = UserCredentials.designerUrl;
  const username = UserCredentials.userName;
  const password = UserCredentials.userPassword;
  const orgName = UserCredentials.organizatioName;
  const AppName = UserCredentials.applicationName;

  Driver.page = await Driver.openNewBrowser();
  const accoutnSignUp = new LoginService(Driver.page);

  //  USE BELOW METHOD IF WE WANT TO EXECUTE COMPLETE TRANSACTION LIKE CREATE NEW APP
  await accoutnSignUp.LoginToCodelessOne(url, username, password);

  // USE BELOW METHOD IF WE WANT TO CREAT ENTITIES ON ALREADY CREATED APPLICATION
  //await accoutnSignUp.LoginAndOpenSpecificOrgAndProject(url,orgName,AppName,username,password);
});

// const ENTITY_NAMES = ["Accounts", "Finance", "Entity03"];

// const ATTRIBUTES_NAMES = ["Attribute01", "Attribute02", "Attribute03"];

// const ATTRIBUTE_TYPE = [
//   "Text",
//   "Number",
//   "Dropdown",
//   "Date Time",
//   "User Identity",
//   "Email",
//   "Link",
//   "Rich Content",
// ];

test.describe("Designer Events", async () => {
  
  const entityPage = new NewEntityService(Driver.page);
  const genralMethods = new GeneralMethodServices(Driver.page);
  const attributePage = new NewAttributeService(Driver.page);

  test("To Verify Application Creation", async () => {
    
    var appName = MainCall.GetAppName();
    const newApp = new NewApplicationService(Driver.page);

    await newApp.CreateNewApplication(appName);
  });

  test("Shared Steps: To Verify Entity Creation And It's Attribute", async () => {
    const newEntity = new NewEntityService(Driver.page);
    console.log(testdata.ENTITY_NAMES[0]);

    await newEntity.CreateNewEntityViaCreateButton(testdata.ENTITY_NAMES[0]);

    await entityPage.SelectEntityFromGrid(testdata.ENTITY_NAMES[0], false);
    await attributePage.AddNewAttribute(testdata.ATTRIBUTES_NAMES[0], testdata.ATTRIBUTE_TYPE.Txt);
    await attributePage.AddNewAttribute(testdata.ATTRIBUTES_NAMES[1], testdata.ATTRIBUTE_TYPE.Num);
  });

  test("Share Step: To Verify Creation of Second Entity And It's Attribut", async () => {
    const newEntity = new NewEntityService(Driver.page);
    await newEntity.ClickBackToEntity();

    await newEntity.CreateNewEntityViaCreateButton(testdata.ENTITY_NAMES[1]);

    await entityPage.SelectEntityFromGrid(testdata.ENTITY_NAMES[1], false);
    await attributePage.AddNewAttribute(testdata.ATTRIBUTES_NAMES[2], testdata.ATTRIBUTE_TYPE.Txt);
    await attributePage.AddNewAttribute(testdata.ATTRIBUTES_NAMES[3], testdata.ATTRIBUTE_TYPE.Num);
  });

  test("To Verify Entity Relation One to Many", async () => {
    const entityRelationPage = new NewEntityRelationsService(Driver.page);
    await entityRelationPage.CreateOneToManyEntityRelationship();
  });

  test("To Verify Publish Application is successfull", async () => {
     const entityRelationPage = new NewEntityRelationsService(Driver.page);
     await entityRelationPage.Pun
    // await entityRelationPage.CreateOneToManyEntityRelationship();
  });
});
