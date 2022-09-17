import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Weather App';

  myScriptElement: HTMLScriptElement;

  constructor(){
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "assets/js/main.js";
    document.body.appendChild(this.myScriptElement);
  }

}
