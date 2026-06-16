import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './public-page.component.html',
  styleUrl: './public-page.component.scss'
})
export class PublicPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  pageKey = '';

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pageKey = data['pageKey'];
    });
  }
}
