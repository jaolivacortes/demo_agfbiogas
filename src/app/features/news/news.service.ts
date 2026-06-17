import { Injectable } from '@angular/core';
import { NewsItem } from './news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private items: NewsItem[] = [
    {
      id: '4',
      title: 'Nueva planta de biometano en proyecto',
      subtitle: 'Avances en la construcción y financiación asegurada',
      date: '2026-06-10',
      image: 'https://picsum.photos/id/1018/1200/600',
      category: 'Industria',
      excerpt: 'La construcción de la nueva planta ha comenzado y se esperan importantes beneficios medioambientales.',
      content: '<p>Detalles extensos sobre el proyecto, fases, financiación y plazos. Se incluye galería de imágenes y vídeos.</p>',
      media: [
        { type: 'image', src: 'https://picsum.photos/id/1018/1000/600' },
        { type: 'image', src: 'https://picsum.photos/id/1015/1000/600' }
      ]
    },
    {
      id: '3',
      title: 'Jornada técnica sobre digestión anaerobia',
      subtitle: 'Expertos internacionales comparten buenas prácticas',
      date: '2026-06-12',
      image: 'https://picsum.photos/id/1025/1200/600',
      category: 'Eventos',
      excerpt: 'Una jornada para profesionales del sector con ponencias y mesas redondas.',
      content: '<p>Resumen de ponencias, conclusiones y material descargable.</p>',
      media: [{ type: 'image', src: 'https://picsum.photos/id/1025/1000/600' }]
    },
    {
      id: '2',
      title: 'Innovación en tratamiento de residuos',
      subtitle: 'Nuevas técnicas aumentan la eficiencia en un 20%',
      date: '2026-06-14',
      image: 'https://picsum.photos/id/103/1200/600',
      category: 'Tecnología',
      excerpt: 'Investigadores desarrollan procesos que optimizan la extracción de biogás.',
      content: '<p>Artículo técnico con gráficos y ejemplos de aplicación.</p>',
      media: [{ type: 'image', src: 'https://picsum.photos/id/103/1000/600' }]
    },
    {
      id: '1',
      title: 'Acuerdo de colaboración internacional',
      subtitle: 'Exportación de tecnología y formación',
      date: '2026-06-16',
      image: 'https://picsum.photos/id/1042/1200/600',
      category: 'Acuerdos',
      excerpt: 'Se firma acuerdo con socios europeos para transferencia tecnológica.',
      content: '<p>Detalles del acuerdo, países implicados y próximos pasos.</p>',
      media: [
        { type: 'image', src: 'https://picsum.photos/id/1042/1000/600' },
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' }
      ]
    }
  ];

  getAll(): NewsItem[] {
    return [...this.items].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  getLatest(n = 3): NewsItem[] {
    return this.getAll().slice(0, n);
  }

  getById(id: string): NewsItem | undefined {
    return this.items.find(i => i.id === id);
  }
}
