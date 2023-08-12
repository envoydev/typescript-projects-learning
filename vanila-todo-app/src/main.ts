import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList: FullList = FullList.instance;
  const listTemplate: ListTemplate = ListTemplate.instance;

  const itemEntryForm: HTMLFormElement = document.getElementById('itemEntryForm') as HTMLFormElement;
  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();
    const input: HTMLInputElement = document.getElementById('newItem') as HTMLInputElement;
    const newEntryString: string = input.value.trim();

    if (!newEntryString.length) {
      return;
    }

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
    const newItem = new ListItem(itemId.toString(), newEntryString);

    fullList.addItem(newItem);
    listTemplate.render(fullList);
  });

  const clearItemsButton: HTMLButtonElement = document.getElementById('clearItemsButton') as HTMLButtonElement;
  clearItemsButton.addEventListener('click', (): void => {
    fullList.clearList();
    listTemplate.clear();
  });

  fullList.load();
  listTemplate.render(fullList);
}

document.addEventListener('DOMContentLoaded', initApp);