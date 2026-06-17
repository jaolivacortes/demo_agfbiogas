import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewsService } from './news.service';
import { NewsItem } from './news.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="news-detail" *ngIf="item">
      <div class="hero" [ngStyle]="{'background-image': 'url(' + item.image + ')'}">
        <div class="hero-overlay">
          <h1>{{ item.title }}</h1>
          <h4>{{ item.subtitle }}</h4>
        </div>
      </div>

      <div class="container">
        <div class="meta">{{ item.category }} — {{ item.date | date:'longDate' }}</div>
        <div class="content" [innerHTML]="item.content"></div>

        <div class="gallery" *ngIf="item.media?.length">
          <div *ngFor="let m of item.media" class="media-item">
            <img *ngIf="m.type === 'image'" [src]="m.src" alt=""/>
            <video *ngIf="m.type === 'video'" controls [src]="m.src"></video>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!item" class="not-found">Noticia no encontrada.</div>
  `,
  styles: [
    `
      .hero { height: 320px; background-size: cover; background-position: center; display:flex; align-items:flex-end; }
      .hero-overlay { width:100%; padding:24px; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%); color:#fff }
      .hero-overlay h1{ margin:0 }
      .container{ padding:16px }
      .meta{ color:#666; margin-bottom:12px }
      .content{ line-height:1.6 }
      .gallery{ display:flex; gap:12px; margin-top:16px; flex-wrap:wrap }
      .media-item img, .media-item video{ width:320px; max-width:100%; border-radius:6px }
      .not-found{ padding:24px; color:#a00 }
    `
  ]
})
export class NewsDetailComponent implements OnInit {
  item?: NewsItem;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.item = this.newsService.getById(id);
  }
}
