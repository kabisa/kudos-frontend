
export class Storage {
  public static getItem = (key: string): any => localStorage.getItem(key);

  public static setItem = (key: string, value: string): any => localStorage.setItem(key, value);

  public static clearAll = (): any => localStorage.clear();
}
