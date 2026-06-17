import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from './news.service';
import { NewsItem } from './news.model';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit, OnDestroy {
  news: NewsItem[] = [];
  headerSlides: NewsItem[] = [];
  current = 0;
  progress = 0; // 0..100
  private timer: any;
  slideDurationMs = 8000; // time per slide
  tickInterval = 50; // ms

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.news = this.newsService.getAll();
    this.headerSlides = this.newsService.getLatest(3);
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    this.progress = 0;
    const step = (this.tickInterval / this.slideDurationMs) * 100;
    this.timer = setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) {
        this.next();
      }
    }, this.tickInterval);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  next() {
    this.current = (this.current + 1) % this.headerSlides.length;
    this.progress = 0;
  }

  prev() {
    this.current = (this.current - 1 + this.headerSlides.length) % this.headerSlides.length;
    this.progress = 0;
  }

  get slidesTransform() {
    return `translateX(-${this.current * 100}%)`;
  }

  onSlideClick(item: NewsItem) {
    this.goTo(item);
  }

  formatCategory(category: string | string[]): string {
    return Array.isArray(category) ? category.join(', ') : category;
  }

  getCategories(category: string | string[]): string[] {
    return Array.isArray(category) ? category : [category];
  }

  goTo(item: NewsItem) {
    this.router.navigate(['/noticias', item.id]);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
