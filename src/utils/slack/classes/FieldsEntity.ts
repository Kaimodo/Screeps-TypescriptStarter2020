// For Storing Fields in the Slack Message
export class FieldsEntity {
  private title: string = "Title";
  private value: string = "Value";
  private short?: boolean = true;

  constructor(Title: string, Value: string, Short?: boolean) {
    this.title = Title;
    this.value = Value;
    this.short = Short;
  }
  public setTitle(Title: string) {
    if (Title != null || Title !== undefined) {
      this.title = Title;
    } else {
      this.title = "errorTitle";
    }
  }
  public setValue(Value: string) {
    if (Value != null || Value !== undefined) {
      this.value = Value;
    } else {
      this.value = "errorValue";
    }
  }
  public setShort(Short: boolean) {
    if (Short != null || Short !== undefined) {
      this.short = Short;
    } else {
      this.short = true;
    }
  }
  public getTitle(Title: string) {
    return this.title;
  }
  public getValue(Value: string) {
    return this.value;
  }
  public getShort(Short: boolean) {
    return this.short;
  }
}
