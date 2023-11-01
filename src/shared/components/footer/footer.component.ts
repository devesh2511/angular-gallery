import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isHomePage: boolean = true;
  constructor(){
    if(window.location.pathname === '/'){
      this.isHomePage = true;
    } else {
      this.isHomePage = false;
    }
  }
}
