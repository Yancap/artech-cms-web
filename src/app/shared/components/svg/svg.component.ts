import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: `<i class="svg-icon" [innerHTML]="svgContent | safeHtml"></i>`,
  styleUrl: './svg.component.scss',
})
export class SvgComponent {
  @Input() name!: string;
  svgContent: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getIcon(this.name).subscribe((svg) => (this.svgContent = svg));
  }

  private getIcon(name: string) {
    return this.http.get(`/svg/${name}.svg`, { responseType: 'text' });
  }
}
