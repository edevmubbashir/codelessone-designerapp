export class BasePageOb {
  public readonly addItemClass: string = "//i[contains(@class,'fa-plus')]/..";
  public readonly modalCancelBtn: string =
    "//button[contains(text(),'Cancel')]";
  public readonly modalCreateAndNewBtn: string =
    "//button[contains(text(),'Create and New')]";
  public readonly modalCreateBtn: string = "//button[text()='Create']";

  public readonly gridTableCell: string = "tbody tr[role=row] td";

  public readonly elemModalCrossIcon =
    'xpath=//*[@class="k-button-icon k-icon k-i-x"]';

  public readonly elemIconDropDown = ".icon-dropdown-anchor";
  public readonly elemDropDownIcon = ".dropdown-icon";
  public readonly elemImageIcon = ".fa-image";

  public readonly elemSelectedImageIcon =
    'xpath=//*[@class="selected-icon"]//i';

  public readonly elemPageHeader: string = ".page-header";

  //  HTML/ANGULAR TAGS
  public readonly anchorTag: string = "a";

  public readonly tdTag: string = "td";
  public readonly trTag: string = "tr";
  public readonly tableTag: string = "table";
  public readonly theadTag: string = "thead";
}
