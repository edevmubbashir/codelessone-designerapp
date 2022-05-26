import LoginService from "../Services/DesignerLogin/Login";
import Driver from "../Main/Driver";
import MainCall from "../Main/MainCall"
import {test,Page, expect} from "@playwright/test"
import { UserCredentials } from "../appsettings/variables";
import NewApplicationService from "../Services/Application/NewApplication";
import config from "../playwright.config";
import NewEntityService from "../Services/Entity/NewEntities";
import GeneralMethodServices from "../Services/SharedServices/GeneralMethodsServices";
import NewAttributeService from "../Services/Attributes/NewAttributes";


test.beforeAll(async () => {

    const url = UserCredentials.baseUrl;
    const username = UserCredentials.userName;
    const password = UserCredentials.userPassword;
    const orgName = UserCredentials.organizatioName;
    const AppName = UserCredentials.applicationName;
    

    Driver.page = await Driver.openNewBrowser();
    const accoutnSignUp = new LoginService(Driver.page);

    //  USE BELOW METHOD IF WE WANT TO EXECUTE COMPLETE TRANSACTION LIKE CREATE NEW APP
    await accoutnSignUp.LoginToCodelessOne(url,username,password);

    //  USE BELOW METHOD IF WE WANT TO CREAT ENTITIES ON ALREADY CREATED APPLICATION
    //await accoutnSignUp.LoginAndOpenSpecificOrgAndProject(url,orgName,AppName,username,password);
})

const ENTITY_NAMES = ["Entity01",
"Entity02",
"Entity03",
];

const ATTRIBUTES_NAMES = ["Attribute01",
"Attribute02",
"Attribute03"
];

const ATTRIBUTE_TYPE = [
  "Text",
  "Number",
  "Dropdown",
  "Date Time",
  "User Identity",
  "Email",
  "Link",
  "Rich Content"
];


test.describe('Designer Events', async () =>{
  const entityPage = new NewEntityService(Driver.page);
  const genralMethods = new GeneralMethodServices(Driver.page);
  const attributePage = new NewAttributeService(Driver.page);

  test('To Verify Application Creation', async () => {
    
    
    var appName =  MainCall.GetAppName();
    const newApp = new NewApplicationService(Driver.page);

    await newApp.CreateNewApplication(appName);
    
  });
  
  
  test('Shared Steps: To Verify Entity Creation', async () => {
    const newEntity = new NewEntityService(Driver.page);
    console.log(ENTITY_NAMES[0]);

    await newEntity.CreateNewEntityViaCreateButton(ENTITY_NAMES[0]);
    await newEntity.CreateNewEntityViaCreateButton(ENTITY_NAMES[1]);
    
  });

  test('To Verify First Attribute Creation Of An Entity', async() =>{
  
    await entityPage.SelectEntityFromGrid(ENTITY_NAMES[0], false);

    await attributePage.AddNewAttribute(ATTRIBUTES_NAMES[0],ATTRIBUTE_TYPE[0]);
    await attributePage.AddNewAttribute(ATTRIBUTES_NAMES[1],ATTRIBUTE_TYPE[1]);

    
  })

  test('To Verify Entity Relation One to Many', async() =>{
  
    //  ABDUL REHMAN WILL WORK ON IT.
    
  })

})



