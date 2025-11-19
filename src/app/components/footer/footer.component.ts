import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  
  constructor(private router: Router) {}
  goToHome() {
    this.router.navigate(['']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
