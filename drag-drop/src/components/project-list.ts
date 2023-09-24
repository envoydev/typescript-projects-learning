import { IDragTarget } from "../models/drag-drop";
import { ProjectComponent } from "./project-component";
import { Project, ProjectStatus } from "../models/project";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project";
import { ProjectItem } from "./project-item";

export class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> implements IDragTarget {
  private _assignedProjects: Project[];

  constructor(private _type: 'active' | 'finished') {
    super('project-list', 'app', false, `${_type}-projects`);
    this._assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @autobind
  public dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.add('droppable')
    }
  }

  @autobind
  public dragLeaveHandler(_event: DragEvent): void {
    const listElement = this.element.querySelector('ul')!;
    listElement.classList.remove('droppable')
  }

  @autobind
  public dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData('text/plain');
    console.log(projectId);
    const state = this._type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished;
    projectState.moveProject(projectId, state);
  }

  public configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this._type === 'active') {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });
      this._assignedProjects = relevantProjects;
      this.renderProjects();
    })
  }

  public renderContent(): void {
    const listId = `${this._type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this._type.toUpperCase() + ' Projects';
  }

  private renderProjects(): void {
    const listElements = document.getElementById(`${this._type}-project-list`) as HTMLUListElement;
    listElements.innerHTML = '';
    for(const project of this._assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }
}
