import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardBlog } from '../../modules/CardBlog';

@Component({
  selector: 'app-post-card',
  standalone: true,
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post!: CardBlog;

  constructor(private router: Router) {}


  goToPost() {
    this.router.navigate(['/post', this.post.id]);
  }
}
