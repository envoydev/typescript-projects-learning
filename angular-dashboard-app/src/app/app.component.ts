import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showDetails = false;
  public clicksTime: string[] = [];
  public paragraphContent: string;

  constructor() {
    this.showDetails = false;
    this.paragraphContent = 'Secret Password = tuna';
  }

  public toggleDetails(): void {
    this.showDetails = !this.showDetails;
    this.clicksTime.push(new Date().toString());
  }
}