import { BasePageOb } from "./basepageob";

export class NewAttributePageOB extends BasePageOb{

    //public readonly newAttributeNameTxtBx:string = "//input[contains(@class,'name-text')]";
    //form//input[contains(@class,'name-text')]
    public readonly newAttributeNameTxtBx:string = "//form//input[contains(@class,'name-text')]";
    public readonly attributeSearchBox:string = "//form//span[@class='k-searchbar']/input";
    //public readonly attributeSearchBox:string = "//span[@class='k-searchbar']/input";
    //form//span[@class='k-searchbar']/input

}