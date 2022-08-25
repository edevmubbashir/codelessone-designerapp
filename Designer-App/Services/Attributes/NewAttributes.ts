import Driver from "../../../Main/Driver";
import { NewAttributePageOB } from "../../PageObjects/newattributepageob";
import GeneralMethodServices from "../SharedServices/GeneralMethodsServices";

var attributePO  = new NewAttributePageOB();
export default class NewAttributeService extends Driver{


    

    public async AddNewAttribute(attrName:string,attrType:string) {
        await this.ClickAddAttributeButton();
        await this.EnterAttributeName(attrName);
        await this.SelectAttributeType(attrType);

        await this.ClickCreateButton();
        await this.VerifyAttributeIsCreatedSuccessfully(attrName,attrType);

    }

    private async ClickAddAttributeButton(){
        await Driver.findElement(attributePO.addItemClass).click();

        /**
         * VERIFY FOLLOWING ASSERTION AFTER CLICK ON ADD NEW ATTRIBUTE BUTTON
         * 1.   Text box to be enable and editable.
         * 2.   Cancel button should be enable.
         * 3.   Create And New button should be disable.
         * 4.   Create Button should be disable.
         */
        await Driver.waitToExpectElement(attributePO.newAttributeNameTxtBx).toBeVisible();
        await Driver.waitToExpectElement(attributePO.modalCancelBtn).toBeEnabled();
        await Driver.waitToExpectElement(attributePO.modalCreateAndNewBtn).toBeDisabled();
        await Driver.waitToExpectElement(attributePO.modalCreateBtn).toBeDisabled();   
    }

    private async EnterAttributeName(attrName:string){
        await Driver.findElement(attributePO.newAttributeNameTxtBx).fill(attrName);


        // VERIFY AFTER ENTERING ENTITY NAME, CREATE AND NEW BUTTON , CREATE BUTTON SHOULD BE ENABLE.
        await Driver.waitToExpectElement(attributePO.modalCreateAndNewBtn).toBeEnabled();
        await Driver.waitToExpectElement(attributePO.modalCreateBtn).toBeEnabled();
    }


    private async SelectAttributeType(attrType:string){
        const generalMethods = new GeneralMethodServices(Driver.page);

        await generalMethods.ClearTextField(attributePO.attributeSearchBox);

        await Driver.findElement(attributePO.attributeSearchBox).fill(attrType).then(()=>{
            Driver.keyboardInteraction("press","Enter");
        });

        await this.AssertEachAttributeType(attrType);
    }

    private async AssertEachAttributeType(attrType:string){
        switch(attrType){
            case "Text":{
                //  ADD ASSERTION OF "TEXT" TYPE ATTRIBUTE
                break;
            }
            case "Number":{
                //  ADD ASSERTION OF "NUMBER" TYPE ATTRIBUTE
                break;
            }
            case "Dropdown":{
                //  ADD ASSERTION OF "DROPDOWN" TYPE ATTRIBUTE
                break;
            }
            case "Date Time":{
                //  ADD ASSERTION OF "DATE TIME" TYPE ATTRIBUTE
                break;
            }
            case "User Identity":{
                //  ADD ASSERTION OF "USER IDENTITY" TYPE ATTRIBUTE
                break;
            }
            case "Email":{
                //  ADD ASSERTION OF "EMAIL" TYPE ATTRIBUTE
                break;
            }
            case "Link":{
                //  ADD ASSERTION OF "LINK" TYPE ATTRIBUTE
                break;
            }
            case "Rich Content":{
                //  ADD ASSERTION OF "RICH CONTENT" TYPE ATTRIBUTE
                break;
            }
        }
    }

    private async ClickCreateButton(){
        await Driver.findElement(attributePO.modalCreateBtn).click();

    }

    private async VerifyAttributeIsCreatedSuccessfully(attrName:string, attrType:string){

        await Driver.findElementWithOptions(attributePO.gridTableCell,{hasText: attrName,}).first().isVisible();
        await Driver.findElementWithOptions(attributePO.gridTableCell,{hasText: attrType,}).isVisible();
    }




}