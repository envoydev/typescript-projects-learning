import { IDraggable } from "../models/drag-drop";
import { ProjectComponent } from "./project-component";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";

export class ProjectItem extends ProjectComponent<HTMLUListElement, HTMLLIElement> implements IDraggable {
  private _project: Project;

  get persons() {
    if (this._project.people === 1) {
      return '1 person';
    } else {
      return `${this._project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this._project = project;
    this.configure();
    this.renderContent();
  }

  @autobind
  public dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this._project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind
  public dragEndHandler(event: DragEvent): void {
    console.log(event);
  }

  public configure(): void { 
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  public renderContent(): void {
    this.element.querySelector('h2')!.textContent = this._project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this._project.description;
  }
}