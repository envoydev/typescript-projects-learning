import { ProjectComponent } from "./project-component";
import { validate } from "../utils/validations";
import { projectState } from "../state/project";
import { autobind } from "../decorators/autobind";

export class ProjectInput extends ProjectComponent<HTMLDivElement, HTMLFormElement> {
  private _titleInputElement: HTMLInputElement;
  private _descriptionInputElement: HTMLInputElement;
  private _peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this._titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this._descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this._peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    this.configure();
  }

  private gatherUserInputs(): [string, string, number] | void {
    const enteredTitle = this._titleInputElement.value;
    const enteredDescription = this._descriptionInputElement.value;
    const enteredPeople = +this._peopleInputElement.value;

    if (
      !validate({ value: enteredTitle, required: true }) ||
      !validate({ value: enteredDescription, required: true, minLength: 5 }) ||
      !validate({ value: enteredPeople, required: true, min: 1, max: 5 })
    ) {
      alert('invalid data');
    } else {
      return [enteredTitle, enteredDescription, enteredPeople];
    }
  }

  public renderContent(): void {}

  public configure(): void {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private clearInputs(): void {
    this._titleInputElement.value = '';
    this._descriptionInputElement.value = '';
    this._peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) : void {
    event.preventDefault();
    const userInput = this.gatherUserInputs();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
