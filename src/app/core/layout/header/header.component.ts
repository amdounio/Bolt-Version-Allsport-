import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showMobileMenu: boolean = false
  scrolled: boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // Change this value based on when you want the effect to activate
        this.scrolled = true
      } else {
        this.scrolled = false
      }
      console.log(this.scrolled);
      
    })
  }
}
