import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (projects: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[];

  constructor() {
    this.listeners = [];
  }

  public addListener(listenerFn: Listener<T>): void {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private static _instance: ProjectState;
  private _projects: Project[];

  private constructor() {
    super();
    this._projects = [];
  }

  static getInstance(): ProjectState {
    if (!this._instance) {
      this._instance = new ProjectState();
    }

    return this._instance;
  } 

  public addProject(title: string, description: string, people: number): void {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    )

    this._projects.push(newProject);
    this.updateListeners();
  }

  public moveProject(projectId: string, status: ProjectStatus): void {
    const project = this._projects.find(project => project.id === projectId);
    if (project && project.status !== status) {
      project.status = status;
      this.updateListeners();
    }
  }

  private updateListeners(): void {
    for (const listenerFunction of this.listeners) {
      listenerFunction([...this._projects]);
    }
  }
}

export const projectState = ProjectState.getInstance();