import ListItem from './ListItem';

export interface List { 
  list: ListItem[],
  load(): void,
  save(): void,
  clearList(): void,
  addItem(item: ListItem): void,
  removeItem(id: string): void,
}

export default class FullList implements List {

  static instance: FullList = new FullList();

  private  constructor(
    private _list: ListItem[] = []
  ) {}

  get list(): ListItem[] {
    return this._list; 
  }

  load(): void {
    const json: string | null = localStorage.getItem('FullList');
    if (typeof json !== 'string') {
      return;
    }

    const parsedList: { _id:string, _item:string, _checked:boolean }[] = JSON.parse(json);

    parsedList.forEach(item => {  
      const listItem: ListItem = new ListItem(item._id, item._item, item._checked);
      FullList.instance.addItem(listItem);
    });
  }

  save(): void {
    localStorage.setItem('FullList', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    const items: ListItem[] = this._list.filter(item => item.id !== id);
    this._list = items;
    this.save();
  }
}