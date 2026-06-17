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
      content: `
        <p>La nueva planta de biometano en proyecto representa un avance muy importante para el sector energético. Mientras el equipo técnico ultima las fases de instalación, la comunicación oficial insiste en que <strong>la transición energética</strong> debe estar acompañada de una gestión rigurosa del capital humano y la logística. Se trata de una infraestructura donde la materia prima proveniente de residuos orgánicos se transforma en un combustible sostenible.</p>
        <p>La fase de diseño también contempla espacios para la formación profesional y áreas de interpretación medioambiental. Se prevé que la planta no solo genere biometano, sino que funcione como un centro de innovación abierto a universidades, proveedores y comunidades locales.</p>
        <p>En el análisis de la primera etapa se destacan los condicionantes del terreno, los permisos ambientales y las aportaciones de investigación. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae tortor magna. Fusce sit amet consectetur mi, scelerisque maximus orci. Duis sollicitudin, nisi vitae vestibulum fermentum, mi ex commodo arcu, sit amet sollicitudin lacus mi quis leo.</p>
        <figure>
          <img src="https://picsum.photos/id/1011/1000/600" alt="Vista de la planta en construcción" />
          <figcaption>Vista preliminar de la planta en obra con los primeros tanques de biogás.</figcaption>
        </figure>
        <p>A mitad de la noticia se hace hincapié en las alianzas industriales, con un apartado específico dedicado a los proveedores y la cadena de valor. El documento interno indica que el proyecto tendrá efectos directos en la economía local, reforzando <strong>la industria verde</strong> y generando empleo especializado.</p>
        <p>Se prevé un seguimiento continuo de resultados para validar los indicadores de eficiencia y seguridad. Los responsables han mencionado auditorías externas y procesos de certificación que garanticen la fiabilidad del sistema.</p>
        <div class="news-detail__video-wrapper"><iframe src="https://www.youtube.com/embed/fvOa9CeeFH4" title="Vídeo de ejemplo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        <p>Tras la presentación, los responsables han señalado que los próximos meses serán decisivos para consolidar la financiación y la dinámica técnica. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in mauris ut elit convallis maximus. Quisque vulputate, orci non fermentum rhoncus, mi justo facilisis nisi, non dignissim purus purus ac mauris.</p>
        <p>El equipo también recuerda que la viabilidad a largo plazo depende de la aceptación social, por lo que se apuesta por la transparencia y la participación ciudadana en cada fase.</p>
        <p>Finalmente, el plan de obra incluye un plan de comunicación en el que <strong>cada fase será monitorizada</strong> y comunicada en tiempo real. El objetivo final es una planta operativa que sirva de referente nacional e internacional en el uso del biometano.</p>
      `,
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
      content: `
        <p>La jornada técnica sobre digestión anaerobia se celebró con éxito y congregó a expertos internacionales. Los asistentes pudieron escuchar mesas redondas centradas en las últimas tendencias del sector, donde <strong>la innovación y la sostenibilidad</strong> fueron ejes centrales del debate.</p>
        <p>El programa incluyó estudios de caso sobre plantas en funcionamiento y análisis de mejoras constantes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, leo nec vestibulum commodo, orci purus fermentum nisi, vitae lobortis magna orci et augue.</p>
        <figure>
          <img src="https://picsum.photos/id/1020/1000/600" alt="Ponencia técnica en la jornada" />
          <figcaption>Ponentes internacionales durante una sesión de debate técnico.</figcaption>
        </figure>
        <p>Entre las conclusiones se subrayó la importancia de la formación continua y de los protocolos de seguridad. El documento final recoge recomendaciones para mejorar los rendimientos y reducir los costes operativos sin sacrificar la calidad del digestato.</p>
        <div class="news-detail__video-wrapper"><iframe src="https://www.youtube.com/embed/fvOa9CeeFH4" title="Vídeo de ejemplo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        <p>Al término del encuentro, los organizadores anunciaron la creación de un foro permanente de colaboración. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aliquam sit amet sapien vitae nibh elementum tristique.</p>
        <p>El futuro cercano contempla nuevas ediciones del evento y un catálogo de publicaciones técnico-científicas que consoliden a esta jornada como un punto de referencia permanente.</p>
      `,
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
      content: `
        <p>La innovación en tratamiento de residuos se ha convertido en un asunto clave para la sostenibilidad urbana. Los últimos ensayos demuestran que la eficiencia puede aumentar hasta un 20% gracias a nuevas metodologías de separación y digestión. <strong>La investigación aplicada</strong> empieza a dar resultados medibles en plantas piloto y en centros de I+D.</p>
        <p>Los científicos describen un modelo de operación modular que permite adaptarse a distintas calidades de residuo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Sed volutpat ex sit amet nisi volutpat, at dictum nunc sagittis. La propuesta también incluye mejoras en la gestión del agua y la reducción de olores dentro de los procesos.</p>
        <p>En esta etapa de implementación se presta especial atención al manejo de los subproductos sólidos y líquidos. Se plantea un circuito cerrado que aprovecha al máximo cada fracción, evitando vertidos y maximizando la recuperación energética.</p>
        <figure>
          <img src="https://picsum.photos/id/1035/1000/600" alt="Esquema de tratamiento de residuos" />
          <figcaption>Esquema conceptual de la nueva técnica de tratamiento en escala piloto.</figcaption>
        </figure>
        <p>En la fase intermedia del informe se pone de relieve la importancia de la limpieza del biogás y la gestión de subproductos. El documento hace hincapié en cómo el uso de bacterias especializadas puede <strong>mejorar la conversión</strong> y reducir pérdidas energéticas.</p>
        <p>Los expertos también señalan que es esencial mantener una trazabilidad estricta de las corrientes de entrada, para garantizar calidad constante en el biogás producido.</p>
        <div class="news-detail__video-wrapper"><iframe src="https://www.youtube.com/embed/fvOa9CeeFH4" title="Vídeo de ejemplo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        <p>Los equipos técnicos trabajan ahora en la validación de una segunda generación de reactores con mayor capacidad de carga. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit lectus nec ipsum consequat, ut sodales magna molestie.</p>
        <p>Este avance no solo promete mayor eficiencia, sino también mejores índices de seguridad y menores costes de mantenimiento a medio plazo.</p>
        <p>El objetivo final es que estas técnicas se traduzcan en instalaciones replicables y económicamente viables en otras regiones del país.</p>
      `,
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
      content: `
        <p>El acuerdo de colaboración internacional marca un hito en la exportación de tecnología y formación. Socios europeos compartirán conocimientos, y <strong>la capacitación técnica</strong> será uno de los pilares del convenio. El documento firmado contempla intercambios de personal y formación especializada.</p>
        <p>En la descripción del acuerdo se mencionan varios países, cada uno con necesidades y condiciones diferentes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium arcu vel ipsum egestas, nec maximus nulla tempus. El carácter estratégico del acuerdo refuerza la idea de alianzas duraderas entre entidades públicas y privadas.</p>
        <p>Además de los aspectos técnicos, se ha hecho hincapié en el valor añadido de formar a profesionales en nuevos modelos de economía circular. El convenio prevé cursos, talleres y programas de mentoría para nuevos perfiles especializados.</p>
        <figure>
          <img src="https://picsum.photos/id/1044/1000/600" alt="Firma del acuerdo internacional" />
          <figcaption>Momento de la firma del acuerdo entre las partes involucradas.</figcaption>
        </figure>
        <p>A mitad de la noticia se expone la hoja de ruta de implementación, con etapas de evaluación, capacitación y seguimiento. Se insiste en que el proyecto no es solo tecnológico, sino también social y educativo.</p>
        <p>El convenio también incluye mecanismos de gobernanza conjunta y grupos de seguimiento que se reunirán periódicamente para evaluar resultados y medir el impacto real.</p>
        <div class="news-detail__video-wrapper"><iframe src="https://www.youtube.com/embed/fvOa9CeeFH4" title="Vídeo de ejemplo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        <p>El acuerdo prevé además un plan de comunicación conjunta para dar visibilidad a los resultados y establecer una marca compartida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at dui non massa finibus blandit.</p>
        <p>Con este impulso, la organización espera consolidar proyectos de mayor alcance en los próximos años y posicionarse como referente europeo en el sector. La colaboración se plantea como un primer paso hacia alianzas más ambiciosas que puedan trasladarse a otros mercados.</p>
      `,
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
