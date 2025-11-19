import { Component, Input, AfterViewInit } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements AfterViewInit {

  @Input() code = '';
  @Input() language = 'plaintext';

  ngAfterViewInit() {
    const blocks = document.querySelectorAll('pre code');
    blocks.forEach(block => hljs.highlightElement(block as HTMLElement));
  }

  copy() {
    navigator.clipboard.writeText(this.code);
  }
}
