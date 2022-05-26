export class BasePageOb{
    public readonly addItemClass:string = "//i[contains(@class,'fa-plus')]/..";
    public readonly modalCancelBtn:string = "//button[contains(text(),'Cancel')]";
    public readonly modalCreateAndNewBtn:string = "//button[contains(text(),'Create and New')]";
    public readonly modalCreateBtn:string = "//button[text()='Create']";

    public readonly gridTableCell:string = "tbody tr[role=row] td"

    //  HTML/ANGULAR TAGS
    public readonly anchorTag:string = "a";
    
    public readonly tdTag:string = "tr";
    public readonly trTag:string = "tr";
    public readonly tableTag:string = "table";
    public readonly theadTag:string = "thead";
}