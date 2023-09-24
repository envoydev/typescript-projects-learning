export abstract class ProjectComponent<THost extends HTMLElement, TElement extends HTMLElement> {
  protected templateElement: HTMLTemplateElement;
  protected hostElement: THost;
  protected element: TElement;

  constructor(
    templateId: string, 
    hostElementId: string, 
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as THost;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as TElement;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart)
  }

  abstract configure(): void;
  abstract renderContent(): void;

  private attach(insertAtStart: boolean): void {
    const insertType = insertAtStart ? 'afterbegin' : 'beforeend';
    this.hostElement.insertAdjacentElement(insertType, this.element);
  }
}
