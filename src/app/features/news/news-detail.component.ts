import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from './news.service';
import { NewsItem } from './news.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="news-detail" *ngIf="item">
      <div class="news-detail__hero" [ngStyle]="{'background-image': 'url(' + item.image + ')'}">
        <div class="news-detail__hero-overlay">
          <h1 class="news-detail__hero-title">{{ item.title }}</h1>
          <h4 class="news-detail__hero-subtitle">{{ item.subtitle }}</h4>
        </div>
      </div>

      <div class="news-detail__body container">
        <div class="news-detail__layout">
          <article class="news-detail__main">
            <div class="news-detail__meta">{{ item.category }} — {{ item.date | date:'longDate' }}</div>
            <div class="news-detail__content" [innerHTML]="item.content"></div>

            <div class="news-detail__share-row">
              <div class="news-detail__share">
                <span class="news-detail__share-label">Comparte en redes:</span>
                <div class="news-detail__share-list">
                  <button class="news-detail__share-button news-detail__share-button--facebook" type="button" aria-label="Compartir en Facebook">
                    <svg class="news-detail__share-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.8c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58v1.9h2.78l-.44 2.9h-2.34V22C18.34 21.12 22 16.99 22 12z" fill="currentColor"/></svg>
                  </button>
                  <button class="news-detail__share-button news-detail__share-button--twitter" type="button" aria-label="Compartir en Twitter">
                    <svg class="news-detail__share-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.954 4.569c-.885.388-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.958-2.178-1.555-3.594-1.555-2.723 0-4.932 2.21-4.932 4.93 0 .39.045.765.127 1.124-4.097-.205-7.735-2.167-10.165-5.144-.425.724-.666 1.562-.666 2.457 0 1.69.86 3.175 2.168 4.048-.798-.026-1.55-.245-2.205-.612v.062c0 2.367 1.685 4.339 3.918 4.783-.41.111-.84.171-1.285.171-.314 0-.615-.031-.916-.089.631 1.953 2.445 3.377 4.6 3.415-1.68 1.318-3.808 2.103-6.115 2.103-.397 0-.79-.023-1.17-.069 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14-7.496 14-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549z" fill="currentColor"/></svg>
                  </button>
                  <button class="news-detail__share-button news-detail__share-button--linkedin" type="button" aria-label="Compartir en LinkedIn">
                    <svg class="news-detail__share-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.45 20.45h-3.55v-5.35c0-1.28-.03-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83v5.44H9.55V9h3.41v1.56h.05c.48-.91 1.65-1.87 3.4-1.87 3.63 0 4.3 2.39 4.3 5.5v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11zm1.78 13.02H3.55V9h3.57v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" fill="currentColor"/></svg>
                  </button>
                  <button class="news-detail__share-button news-detail__share-button--gmail" type="button" aria-label="Compartir por correo">
                    <svg class="news-detail__share-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.5l-8 5.33L4 8.5V6l8 5.33L20 6v2.5z" fill="currentColor"/></svg>
                  </button>
                </div>
              </div>

              <div class="news-detail__latest-block">
                <h3 class="news-detail__latest-block-title">Últimas noticias:</h3>
                <div class="news-detail__mini-carousel" (mouseenter)="stopMiniTimer()" (mouseleave)="startMiniTimer()">
                  <div class="news-detail__mini-slides" [style.transform]="miniSlidesTransform">
                    <button *ngFor="let slide of latestNews" class="news-detail__mini-slide" type="button" (click)="goTo(slide)" [style.background-image]="'linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.18)), url(' + slide.image + ')'">
                      <div class="news-detail__mini-copy">
                        <h4>{{ slide.title }}</h4>
                        <span>{{ formatLatestDate(slide.date) }}</span>
                      </div>
                    </button>
                  </div>

                  <div class="news-detail__mini-progress-wrap">
                    <div class="news-detail__mini-progress" [style.width.%]="miniProgress"></div>
                  </div>

                  <button class="news-detail__mini-nav news-detail__mini-nav--prev" type="button" (click)="miniPrev(); miniProgress=0">‹</button>
                  <button class="news-detail__mini-nav news-detail__mini-nav--next" type="button" (click)="miniNext(); miniProgress=0">›</button>

                  <div class="news-detail__mini-indicators">
                    <button *ngFor="let slide of latestNews; let i = index"
                            class="news-detail__mini-indicator"
                            [class.news-detail__mini-indicator--active]="i===miniCurrent"
                            type="button"
                            (click)="miniCurrent=i; miniProgress=0">
                      ●
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div *ngIf="!item" class="news-detail__not-found">Noticia no encontrada.</div>
  `,
  styles: [
    `
      .news-detail__hero {
        height: 320px;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: flex-end;
      }

      .news-detail__hero-overlay {
        width: 100%;
        padding: 24px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0.65) 100%);
        color: var(--color-white);
      }

      .news-detail__hero-title {
        margin: 0;
        font-size: 2.6rem;
      }

      .news-detail__hero-subtitle {
        margin-top: 6px;
        color: var(--color-white);
        font-weight: 400;
      }

      .news-detail__body {
        padding: 0px 16px 48px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .news-detail__layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .news-detail__main {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 28px;
        min-width: 0;
        width: 100%;
      }

      .news-detail__meta {
        color: var(--color-text-muted);
        margin-bottom: 24px;
        font-size: 0.95rem;
      }

      .news-detail__content {
        line-height: 1.8;
        color: var(--color-text);
        overflow-wrap: break-word;
        word-break: break-word;
        min-width: 0;
      }

      .news-detail__content p {
        margin: 1.4rem 0;
      }

      .news-detail__content strong {
        font-weight: 700;
      }

      .news-detail__content figure {
        margin: 2rem auto;
        max-width: min(860px, 100%);
        text-align: center;
      }

      .news-detail__content figure img {
        width: 100%;
        height: auto;
        max-height: 520px;
        object-fit: cover;
        border-radius: 12px;
        display: block;
      }

      .news-detail__content figcaption {
        margin-top: 0.75rem;
        color: var(--color-text-muted);
        font-size: 0.92rem;
        font-style: italic;
        line-height: 1.5;
        text-align: center;
      }

      .news-detail__content .news-detail__video-wrapper {
        margin: 2rem 0;
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 16px;
      }

      .news-detail__content .news-detail__video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }

      .news-detail__share {
        margin-top: 0px;
      }

      .news-detail__share-label {
        display: inline-block;
        margin-bottom: 14px;
        font-weight: 700;
      }

      .news-detail__share-list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .news-detail__share-button {
        width: 56px;
        height: 56px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid currentColor;
        text-decoration: none;
        color: currentColor;
        background: rgba(255,255,255,0.08);
        transition: transform 0.18s ease, background 0.18s ease;
      }

      .news-detail__share-button:hover,
      .news-detail__share-button:focus {
        transform: translateY(-1px);
        background: rgba(255,255,255,0.14);
      }

      .news-detail__share-icon {
        width: 24px;
        height: 24px;
      }

      .news-detail__share-button--facebook {
        color: #1877f2;
      }

      .news-detail__share-button--twitter {
        color: #1da1f2;
      }

      .news-detail__share-button--linkedin {
        color: #0a66c2;
      }

      .news-detail__share-button--gmail {
        color: #db4437;
      }

      .news-detail__share-row {
        display: grid;
        grid-template-columns: minmax(280px, 1fr) minmax(260px, 360px);
        gap: 28px;
        align-items: start;
        margin-top: 36px;
      }

      .news-detail__latest-block {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .news-detail__latest-block-title {
        margin: 0;
        font-size: 1.05rem;
      }

      .news-detail__mini-carousel {
        position: relative;
        overflow: hidden;
        border-radius: 0;
        min-height: 220px;
        background: transparent;
      }

      .news-detail__mini-slides {
        display: flex;
        transition: transform 0.35s ease;
      }

      .news-detail__mini-slide {
        min-width: 100%;
        border: none;
        padding: 0;
        background-size: cover;
        background-position: center;
        cursor: pointer;
        color: var(--color-white);
        display: flex;
        align-items: flex-end;
        position: relative;
        min-height: 220px;
      }

      .news-detail__mini-slide::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.68) 100%);
      }

      .news-detail__mini-copy {
        position: relative;
        z-index: 1;
        padding: 18px;
        text-align: left;
      }

      .news-detail__mini-copy h4 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.3;
        text-align: left;
      }

      .news-detail__mini-copy span {
        display: block;
        margin-top: 0.4rem;
        color: rgba(255, 255, 255, 0.85);
        font-size: 0.88rem;
        text-align: left;
      }

      .news-detail__mini-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 42px;
        border: none;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.35);
        color: var(--color-white);
        display: grid;
        place-items: center;
        cursor: pointer;
      }

      .news-detail__mini-nav--prev {
        left: 14px;
      }

      .news-detail__mini-nav--next {
        right: 14px;
      }

      .news-detail__mini-indicators {
        position: absolute;
        left: 0;
        right: 0;
        top: 14px;
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 0 12px;
        z-index: 2;
      }

      .news-detail__mini-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.55);
        color: transparent;
        cursor: pointer;
      }

      .news-detail__mini-indicator--active {
        background: var(--color-white);
      }

      .news-detail__not-found {
        padding: 24px;
        color: var(--color-red);
      }

      .news-detail__latest-title {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.35;
      }

      .news-detail__latest-date {
        margin: 8px 0 0;
        color: var(--color-text-muted);
        font-size: 0.85rem;
      }

      .news-detail__not-found {
        padding: 24px;
        color: var(--color-red);
      }

      @media (max-width: 900px) {
        .news-detail__layout {
          grid-template-columns: 1fr;
        }

        .news-detail__share-row {
          grid-template-columns: 1fr;
        }

        .news-detail__mini-carousel {
          min-height: 200px;
        }
      }

      @media (max-width: 600px) {
        .news-detail__hero {
          height: 240px;
        }

        .news-detail__body {
          padding: 24px 12px 36px;
        }

        .news-detail__share-list {
          justify-content: flex-start;
        }
      }
      .news-detail__mini-progress-wrap {
      height: 4px;
      background: rgba(0, 0, 0, 0.06);
      width: 100%;
    }

    .news-detail__mini-progress {
      height: 100%;
      background: var(--color-blue);
      width: 0%;
      transition: width 0.05s linear;
    }
    `
  ]
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  item?: NewsItem;
  latestNews: NewsItem[] = [];
  miniCurrent = 0;
  miniProgress = 0;
  private miniTimer: any;

  constructor(private route: ActivatedRoute, private router: Router, private newsService: NewsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.item = this.newsService.getById(id);
      this.latestNews = this.newsService.getAll().filter(news => news.id !== id).slice(0, 3);
      this.miniCurrent = 0;
      this.miniProgress = 0;
      this.startMiniTimer();
    });
  }

  ngOnDestroy(): void {
    this.stopMiniTimer();
  }

  get miniSlidesTransform(): string {
    return `translateX(-${this.miniCurrent * 100}%)`;
  }

  startMiniTimer() {
    this.stopMiniTimer();
    this.miniProgress = 0;
    if (!this.latestNews.length) {
      return;
    }

    const step = (50 / 8000) * 100;
    this.miniTimer = setInterval(() => {
      this.miniProgress += step;
      if (this.miniProgress >= 100) {
        this.miniNext();
      }
    }, 50);
  }

  stopMiniTimer() {
    if (this.miniTimer) {
      clearInterval(this.miniTimer);
      this.miniTimer = null;
    }
  }

  miniNext() {
    this.miniCurrent = (this.miniCurrent + 1) % this.latestNews.length;
    this.miniProgress = 0;
  }

  miniPrev() {
    this.miniCurrent = (this.miniCurrent - 1 + this.latestNews.length) % this.latestNews.length;
    this.miniProgress = 0;
  }

  goTo(item: NewsItem) {
    window.scrollTo(0, 0);
    this.router.navigate(['/noticias', item.id]);
  }

  formatLatestDate(value: string): string {
    const date = new Date(value);
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }
}
