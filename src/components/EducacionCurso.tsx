import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import roseGoldPattern from '../assets/images/rose_gold_organic_pattern_1779358688635.png';
import { useLanguage } from '../context/LanguageContext';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Award, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight,
  BookOpenCheck,
  RotateCcw,
  Sparkles,
  BarChart,
  Lightbulb,
  Check,
  X,
  TrendingUp,
  Bookmark,
  Gem,
  Download
} from 'lucide-react';
import RoosLogo from './RoosLogo';
import { toPng } from 'html-to-image';

interface Lesson {
  id: number;
  title: string;
  category: string;
  duration: string;
  content: string;
  tips: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const lessonsDataEs: Lesson[] = [
  {
    id: 1,
    category: "Mentalidad Fundadora",
    title: "1. Introducción al Emprendimiento Femenino",
    duration: "10 mins",
    content: "El emprendimiento liderado por mujeres ha experimentado un crecimiento sin precedentes globales, consolidándose como un motor crucial para el desarrollo económico sostenible. No obstante, las fundadoras enfrentan desafíos estructurales únicos, que van desde el sesgo de género implícito en la asignación de capital de riesgo hasta la falta de redes de mentoría de alto nivel.\n\nPara superar estas barreras, es fundamental transitar de un enfoque puramente reactivo hacia el desarrollo proactivo de una mentalidad de abundancia e independencia financiera, respaldada por un ecosistema de colaboración mutua. Estudios demuestran que las redes colectivas asimétricas y cooperativas actúan como un amortiguador ante la volatilidad económica y multiplican notablemente la probabilidad de supervivencia del negocio frente al individualismo tradicional.\n\nReferencias:\n- Brush, C. G., de Bruin, A., & Welter, F. (2009). A gender-aware framework for women's entrepreneurship. International Journal of Gender and Entrepreneurship, 1(1), 8-24.\n- Terjesen, S., & Amorós, J. E. (2010). Female entrepreneurship in Latin America. World Development, 38(11), 1653-1662.",
    tips: [
      "Cambia la perspectiva de rivalidad por el de 'co-creación' y red activa.",
      "Considera tu emprendimiento no un pasatiempo, sino un motor de independencia.",
      "Identifica tus sesgos internos y busca mentoría de forma frecuente."
    ],
    quiz: {
      question: "¿Cuál es el canal fundamental de empoderamiento que nos blinda ante la vulnerabilidad en el emprendimiento femenino?",
      options: [
        "Establecer campañas hiper-agresivas de anuncios pagados de forma individual.",
        "Unirse a un ecosistema cooperativo y red activa donde el crecimiento sea cooperativo.",
        "Apalancarse exclusivamente de créditos tradicionales de la banca comercial."
      ],
      correctIndex: 1,
      explanation: "Los ecosistemas de aprendizaje colaborativo y las redes activas transforman el soporte comunitario en ventajas estratégicas reales para los proyectos."
    }
  },
  {
    id: 2,
    category: "Validación de Mercado",
    title: "2. Ideación y Descubrimiento de Nicho",
    duration: "12 mins",
    content: "El descubrimiento exitoso de un nicho de mercado de alta rentabilidad parte de la intersección entre las capacidades estratégicas de la fundadora (su Ikigai) y la resolución de problemas reales (dolor de mercado) no atendidos de manera óptima por la oferta existente. Intentar abarcar todo el mercado diluye el presupuesto de marketing y confunde el posicionamiento estratégico.\n\nLa técnica del Descubrimiento de Clientes de Steve Blank sugiere cuestionar de forma sistemática y empírica nuestras hipótesis de negocio mediante entrevistas cualitativas y observaciones directas antes de realizar cualquier inversión técnica pesada. Identificar dolores psicográficos específicos permite formular propuestas de valor irresistibles con la capacidad de fijar precios óptimos.\n\nReferencias:\n- Blank, S. (2020). The Four Steps to the Epiphany: Successful Strategies for Products that Win. John Wiley & Sons.\n- Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design: How to Create Products and Services Customers Want. John Wiley & Sons.",
    tips: [
      "Toma 5 entrevistas cortas con tus clientes ideales para detectar frustraciones reales.",
      "Define tu cliente ideal con demografía y dolores psicográficos precisos.",
      "Estudia la competencia actual no para copiar, sino para diferenciar tu oferta."
    ],
    quiz: {
      question: "¿Qué es primordial al definir un nicho de mercado de alta rentabilidad?",
      options: [
        "Ofrecer todo tipo de productos genéricos para que le sirvan a cualquier persona.",
        "Identificar un problema recurrente e insatisfactorio en un grupo específico.",
        "Centrarse únicamente en el precio más bajo sin importar la calidad."
      ],
      correctIndex: 1,
      explanation: "Resolver un dolor o molestia intensa en un grupo específico (un nicho) te da la ventaja competitiva para fijar precios óptimos y fidelizar clientes rápidamente."
    }
  },
  {
    id: 3,
    category: "Metodologías Ágiles",
    title: "3. Planificación de Negocios Ágil (Lean)",
    duration: "15 mins",
    content: "Las metodologías de planificación ágiles han revolucionado la forma en que estructuramos empresas emergentes. El plan de negocios tradicional de 60 páginas a menudo se reduce a un ejercicio de suposiciones de escritorio que quedan obsoletas ante el primer contacto real con el cliente en el mercado.\n\nEl Lean Canvas es un modelo de negocios visual, dinámico y sintético estructurado en 9 bloques críticos que prioriza la velocidad de aprendizaje y el desarrollo del Producto Mínimo Viable (MVP). Al centrarse en ciclos estructurados de retroalimentación constructiva del cliente (Crear - Medir - Aprender), la fundadora asegura una optimización asertiva y evita la inversión innecesaria de recursos temporales y económicos.\n\nReferencias:\n- Ries, E. (2011). The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses. Crown Business.\n- Maurya, A. (2012). Running Lean: Iterate from Plan A to a Plan That Works. O'Reilly Media.",
    tips: [
      "Diseña esquemas visuales sintéticos que puedas ajustar semanalmente.",
      "Prioriza el Producto Mínimo Viable (MVP) antes de hacer producciones masivas.",
      "Fija tus 2 métricas críticas semanales y no te dejes distraer por métricas de vanidad."
    ],
    quiz: {
      question: "¿Qué ventaja clave aporta utilizar un plan ágil estilo Lean Canvas en lugar de un plan tradicional?",
      options: [
        "Asegura que no necesites llevar control de ventas ni gastos fijos.",
        "Te permite probar hipótesis de negocio y ajustar la estrategia con rapidez y flexibilidad.",
        "Consigue aprobación bancaria instantánea de manera automatizada."
      ],
      correctIndex: 1,
      explanation: "El Lean Canvas se basa en aprendizaje validado y prototipos ágiles, impidiendo que inviertas grandes cantidades de tiempo y recursos en suposiciones erróneas."
    }
  },
  {
    id: 4,
    category: "Finanzas Personales",
    title: "4. Finanzas Personales de la Fundadora",
    duration: "11 mins",
    content: "La estabilidad financiera de una empresa emergente está directamente condicionada por la salud financiera personal de sus fundadoras. Mezclar la caja operativa de la empresa con los flujos de gastos personales (conocido técnicamente como confusión patrimonial) imposibilita determinar el costo marginal real de las ventas y la rentabilidad neta del negocio.\n\nLa gobernanza financiera moderna prescribe que la fundadora debe establecer un salario base fijo, incluso simbólico al inicio de las operaciones, y operar cuentas de bancos estrictamente separadas para los dos rubros. Esto permite medir las utilidades contables reales y proteger la salud patrimonial de la fundadora ante eventualidades operativas o pasivos comerciales.\n\nReferencias:\n- CFP Board of Standards. (2021). Financial Planning Competency Handbook. John Wiley & Sons.\n- Kiyosaki, R. (2017). Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!. Plata Publishing.",
    tips: [
      "Fíjate un salario mensual fijo, aunque sea simbólico al principio.",
      "Abre cuentas bancarias separadas para las finanzas de tu negocio.",
      "Forma un fondo de emergencia personal que cubra de 3 a 6 meses de tus gastos personales fijos."
    ],
    quiz: {
      question: "¿Cuál es la consecuencia más común de mezclar la caja de tu negocio con tus gastos personales?",
      options: [
        "Incrementar las utilidades netas reportadas de forma espectacular.",
        "Dificultad de costeo real y descapitalización progresiva de la empresa.",
        "Reducción automática de los impuestos devengados por el fisco."
      ],
      correctIndex: 1,
      explanation: "Al mezclar los flujos de dinero es muy difícil medir los costos reales del negocio, lo que impide saber si tu negocio es verdaderamente rentable o si está consumiendo tu capital."
    }
  },
  {
    id: 5,
    category: "Finanzas del Negocio",
    title: "5. Tu Presupuesto y Flujo de Caja",
    duration: "14 mins",
    content: "El flujo de caja (Cash Flow) constituye la variable más crítica para la viabilidad de cualquier empresa en etapa de inicio. Un error recurrente es confundir la rentabilidad teórica (registrada en un estado de resultados tradicional) con la liquidez real en caja. Las empresas raramente quiebran por falta de utilidades en papel; quiebran cuando no tienen liquidez física inmediata para cubrir obligaciones operativas urgentes.\n\nEl análisis financiero recomienda proyectar y auditar un flujo de caja semanal para un horizonte mínimo de 12 semanas, diferenciando rigurosamente los egresos fijos operacionales de los egresos variables de producción. Esto le permite a la fundadora prever déficits estacionales de efectivo y renegociar plazos comerciales antes de caer en insolvencia comercial.\n\nReferencias:\n- Brigham, E. F., & Ehrhardt, M. C. (2019). Financial Management: Theory & Practice. Cengage Learning.\n- Gibson, C. H. (2013). Financial Statement Analysis. Cengage Learning.",
    tips: [
      "Proyecta tus flujos a 12 semanas para anticipar huecos de liquidez.",
      "Clasifica con precisión tus egresos en fijos (renta, internet) y variables (materia prima).",
      "Negocia plazos de pago mayores con proveedores y plazos de cobro menores con clientes."
    ],
    quiz: {
      question: "¿Qué es el Flujo de Caja y por qué es crítico para la supervivencia del negocio?",
      options: [
        "Es un presupuesto teórico de ventas futuras sin relación con el saldo real del banco.",
        "Es el registro del dinero real que entra y sale, determinando la liquidez inmediata.",
        "Es el inventario valorado de mercancía guardada en cajas y almacenes."
      ],
      correctIndex: 1,
      explanation: "El Flujo de Caja refleja la liquidez tangible del negocio, garantizando que tengas recursos a la mano para cumplir con tus obligaciones operativas inmediatas."
    }
  },
  {
    id: 6,
    category: "Precios y Costeo",
    title: "6. Costeo y Estrategia de Precios",
    duration: "16 mins",
    content: "Fijar precios de manera reactiva basándose únicamente en los precios observados en la competencia es un riesgo financiero grave que puede destruir silenciosamente el margen neto del negocio. El costeo riguroso requiere identificar primero los costos directos de producción (materia prima, comisiones, empaque), los costos indirectos asignables (tiempo de mano de obra corporativo, mermas habituales) y calcular de forma técnica el Punto de Equilibrio (Break-Even Point).\n\nUna vez comprendidos los costos mínimos absolutos, la estrategia de precios óptima debe transitar hacia modelos de 'precio basado en el valor', donde la tarifa se fundamenta en la percepción de los beneficios emocionales y prácticos del consumidor más que en la simple suma de costes de manufactura.\n\nReferencias:\n- Nagle, T. T., & Müller, G. (2017). The Strategy and Tactics of Pricing: A Guide to Growing More Profitably. Routledge.\n- Kotler, P., & Keller, K. L. (2016). Marketing Management (15th ed.). Pearson.",
    tips: [
      "No asumas que tu mano de obra es gratuita; valora tus horas de trabajo en los costos.",
      "Añade un porcentaje de pérdida (mermas o desperdicio habitual).",
      "Utiliza precios premium si tu propuesta de valor y servicio postventa lo ameritan."
    ],
    quiz: {
      question: "¿Qué error se comete al fijar precios igualándose a la competencia sin un análisis interno?",
      options: [
        "Ganar siempre una cuota de mercado del 100% de manera inmediata.",
        "Arriesgarte a vender por debajo de tu punto de equilibrio y perder dinero sin saberlo.",
        "Mejorar instantáneamente los tiempos de entrega de la mercancía."
      ],
      correctIndex: 1,
      explanation: "Cada negocio posee su propia estructura de costos. Si fijas precios a ciegas basándote en la competencia, podrías estar perdiendo dinero a pesar de registrar un alto volumen de ventas."
    }
  },
  {
    id: 7,
    category: "Dinero Colectivo",
    title: "7. Modelos de Financiamiento Colectivo",
    duration: "13 mins",
    content: "La democratización del financiamiento a través de esquemas colectivos (Crowdfunding) ha surgido como una respuesta asertiva y ágil ante la brecha histórica de financiamiento bancario tradicional, especialmente para proyectos liderados por mujeres. Estos modelos permiten obtener capital inicial o de expansión sumando pequeñas aportaciones de una red de confianza o de una comunidad interesada, validando comercialmente la propuesta de valor en el proceso.\n\nLos modelos se estructuran habitualmente bajo donaciones, recompensas preventa, préstamos (peer-to-peer lending) y financiamiento colectivo de capital regulado (equity crowdfunding). Este último otorga un esquema de transparencia y democratización al capital de crecimiento sin ahogar el flujo de liquidez mediante deudas insostenibles.\n\nReferencias:\n- Belleflamme, P., Lambert, T., & Schwienbacher, A. (2014). Crowdfunding: Tapping the right crowd. Journal of Business Venturing, 29(5), 585-609.\n- Mollick, E. (2014). The dynamics of crowdfunding: An exploratory study. Journal of Business Venturing, 29(1), 1-16.",
    tips: [
      "Construye una red de aliadas leales y haz de cada apoyo un respaldo sincero.",
      "Informa periódicamente a tu red sobre los objetivos que cumplirás con los fondos.",
      "Aprovecha las herramientas de visibilidad colectiva para atraer nuevos patrocinadores."
    ],
    quiz: {
      question: "¿Cuál es la ventaja primordial del financiamiento colectivo frente al crédito de un banco?",
      options: [
        "No requiere ningún esfuerzo de comunicación con tu red de clientes.",
        "Permite capitalizarte de manera transparente a través de tu red sin pagar intereses excesivos.",
        "Que te otorgan fondos sin importar si tu proyecto aporta valor real o no."
      ],
      correctIndex: 1,
      explanation: "El financiamiento colectivo democratiza el dinero y te permite recibir recursos de forma libre e inteligente, incentivando al mismo tiempo la lealtad de tu comunidad."
    }
  },
  {
    id: 8,
    category: "Legal y Formalización",
    title: "8. Constitución Legal y Formalización",
    duration: "12 mins",
    content: "La formalización estructurada de una organización mercantil permite mitigar riesgos legales sustanciales, proteger de forma íntegra la propiedad intelectual mediante el registro de marcas y patentes, e insertarse en cadenas de suministro del sector corporativo formal. En legislaciones latinoamericanas modernas existieron innovaciones legales notables como la Sociedad por Acciones Simplificada (S.A.S.), la cual permite constituir una corporación mercantil de manera digital e individual sin costo notarial.\n\nAsimismo, regímenes como el Régimen Simplificado de Confianza (RESICO) ofrecen en el mediano plazo esquemas de tributación fiscal con tasas efectivas mínimas, reduciendo el costo operacional de administración contable en los años de desarrollo formativo.\n\nReferencias:\n- Ley General de Sociedades Mercantiles (LGSM). Diario Oficial de la Federación, México.\n- Servicio de Administración Tributaria (SAT). (2022). Régimen Simplificado de Confianza: Guía del Contribuyente.",
    tips: [
      "Investiga qué régimen te conviene para pagar el menor porcentaje de impuestos legalmente.",
      "Protege tu marca registrándola ante la oficina de propiedad industrial (ej. IMPI).",
      "Separa con un contrato claro los acuerdos si tienes socias o co-fundadoras."
    ],
    quiz: {
      question: "¿Qué beneficio te da formalizar la estructura legal de tu negocio y registrar tu marca?",
      options: [
        "Evitar por completo cualquier tipo de atención al cliente obligatoria.",
        "Dar certidumbre contractual, proteger tu patrimonio y habilitar cobros transparentes.",
        "Acceder a publicidad totalmente gratuita en televisión nacional."
      ],
      correctIndex: 1,
      explanation: "La formalización y protección de propiedad intelectual sientan las bases sólidas para el escalamiento y te protegen ante deudas colectivas ajenas a tu patrimonio."
    }
  },
  {
    id: 9,
    category: "Marketing y Marca",
    title: "9. Marketing con Propósito y Storytelling",
    duration: "15 mins",
    content: "El comportamiento de compra moderno indica una fuerte reticencia hacia las estrategias de comercialización impersonales o meramente transaccionales. El marketing contemporáneo de alto impacto exige la formulación estructurada de un relato de marca auténtico (Storytelling), alineado estrechamente con una propuesta de valor basada en un propósito claro.\n\nComunicar de manera transparente la razón fundacional de la empresa (su 'Por qué'), los retos superados en el trayecto y el valor social del producto genera una empatía genuina en el consumidor que trasciende de inmediato las meras comparaciones de coste monetario.\n\nReferencias:\n- Sinek, S. (2009). Start with Why: How Great Leaders Inspire Everyone to Take Action. Portfolio Penguin.\n- Aaker, D. A. (2014). Aaker on Branding: 20 Principles That Drive Success. Morgan James Publishing.",
    tips: [
      "Define la historia y los valores fundacionales detrás de tu negocio.",
      "Sé auténtica: muestra el detrás de cámaras de tu taller o tu día a día.",
      "Usa llamados a la acción claros y conéctalos con una causa sincera."
    ],
    quiz: {
      question: "¿Qué se logra principalmente al aplicar Storytelling con propósito en tu marca?",
      options: [
        "Aumentar inmediatamente el costo técnico de fabricación de tus productos.",
        "Generar empatía, conexión emocional profunda y lealtad más allá del precio.",
        "Eliminar la necesidad de dar un buen servicio o calidad."
      ],
      correctIndex: 1,
      explanation: "La conexión emocional fomenta que tus compradoras se conviertan de forma orgánica en embajadoras fervientes de tu negocio, defendiendo tu marca comunitariamente."
    }
  },
  {
    id: 10,
    category: "Redes Sociales",
    title: "10. Redes Sociales Estratégicas",
    duration: "12 mins",
    content: "Gestionar canales de comunicación corporativa en el ecosistema digital moderno exige apartarse de la publicación compulsiva e impersonal de catálogos planos de mercancía. El diseño de los algoritmos de las principales redes sociales penaliza las cuentas que no aportan interacción directa y premia el contenido educativo, estético o de entretenimiento de alto valor.\n\nLa estrategia óptima requiere definir dos o tres canales digitales prioritarios de acuerdo al perfil específico de tu consumidor ideal (Buyer Persona) y estructurar un calendario de medios ordenado que mantenga la consistencia operacional sin fatiga de recursos.\n\nReferencias:\n- Kaplan, A. M., & Haenlein, M. (2010). Users of the world, unite! The challenges and opportunities of Social Media. Business Horizons, 53(1), 59-68.\n- Mangold, W. G., & Faulds, D. J. (2009). Social media: The new hybrid element of the promotion mix. Business Horizons, 52(4), 357-365.",
    tips: [
      "Publica contenido interactivo que propicie comentarios y compartidos.",
      "No trates de estar en todas las redes sociales: domina primero una donde esté tu cliente.",
      "Implementa un calendario editorial sencillo para mantener la constancia de publicación."
    ],
    quiz: {
      question: "¿Cuál es la recomendación clave para gestionar redes sociales de manera comercial?",
      options: [
        "Crear únicamente publicaciones con promociones duras de venta todo el tiempo.",
        "Apostar por contenido variado de valor, educación e inspiración, balanceado con venta.",
        "Comprar seguidores de cuentas falsas para crear una apariencia de marca gigante."
      ],
      correctIndex: 1,
      explanation: "Las seguidoras compran cuando se sienten identificadas y nutridas con valor, tips o historias inspiradoras. El contenido rico fomenta retenciones a largo plazo."
    }
  },
  {
    id: 11,
    category: "Canales de Venta",
    title: "11. E-Commerce y Canales de Venta",
    duration: "14 mins",
    content: "El comercio electrónico (E-Commerce) ha eliminado de manera radical las barreras operacionales y geográficas del sector mercantil. Implementar canales de e-commerce robustos permite que un portal de venta funcione ininterrumpidamente, capturando transacciones comerciales directas en cualquier momento del día.\n\nLa optimización de la conversión requiere centrarse en el diseño centrado en el usuario móvil (Mobile-First Design), pasarelas estables de pago robustamente protegidas contra fraudes (tales como Stripe, PayPal o redirecciones locales bancarias) que impidan carritos de compra abandonados por fricción técnica excesiva.\n\nReferencias:\n- Laudon, K. C., & Traver, C. G. (2021). E-commerce 2021: Business, Technology, Society. Pearson.\n- Chaffey, D. (2019). Digital Marketing: Strategy, Implementation and Practice. Pearson.",
    tips: [
      "Optimiza tu sitio o portal para uso en dispositivos móviles.",
      "Haz el proceso de pago lo más ágil posible (menos de 3 clics).",
      "Sincroniza tus enlaces directamente con el perfil destacado de tu portal de ventas."
    ],
    quiz: {
      question: "¿Por qué es crucial integrar pasarelas de pago electrónicas optimizadas en tu negocio?",
      options: [
        "Para limitar tus ventas únicamente a transacciones en efectivo con cita previa.",
        "Para acelerar y facilitar la intención de compra del cliente sin fricciones.",
        "Porque sustituye por completo la necesidad de hacer logística de envíos."
      ],
      correctIndex: 1,
      explanation: "Entre menor fricción tenga el cliente al pagar en tu sitio o perfil, mayor será la conversión. La facilidad de pago es el catalizador de las transacciones digitales."
    }
  },
  {
    id: 12,
    category: "Operaciones",
    title: "12. Administración de Inventarios y Logística",
    duration: "13 mins",
    content: "La gestión ineficiente de almacenes representa una pérdida silenciosa en el balance general de muchas empresas emergentes. El sobrestock inmoviliza capital de trabajo vital que podría usarse en campañas de conversión, mientras que el desabasto daña la retención del cliente. Consiste en definir un balance operativo óptimo.\n\nLa técnica del Stock de Seguridad y la optimización logística de envíos mediante acuerdos de paqueterías sistematizadas garantizan un fulfillment preciso y predecible, indispensable para sostener la credibilidad del negocio.\n\nReferencias:\n- Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation. Pearson.\n- Ballou, R. H. (2004). Business Logistics/Supply Chain Management. Pearson Education.",
    tips: [
      "Asocia alianzas de paqueterías seguras con guías prepagadas optimizadas.",
      "Establece un stock de seguridad para evitar desabasto en temporadas altas.",
      "Audita periódicamente tu stock real contra el inventario contable."
    ],
    quiz: {
      question: "¿Cuál es el peligro de tener un sobre-inventario de mercancía sin alta rotación?",
      options: [
        "Mejorar de forma desmesurada el margen de tus utilidades líquidas.",
        "Mantener capital de trabajo valioso congelado, restándole liquidez al flujo operativo.",
        "Reducir los costos de almacenamiento a cero de forma directa."
      ],
      correctIndex: 1,
      explanation: "La mercancía acumulada representa dinero inmovilizado; necesitas balancear tu producción con la demanda real para garantizar fluidez bancaria constante."
    }
  },
  {
    id: 13,
    category: "Conversión",
    title: "13. Ventas de Alto Impacto",
    duration: "15 mins",
    content: "La conversión comercial de alta efectividad parte del paradigma de identificar asertivamente las necesidades insatisfechas de un prospecto cualificado, en lugar de realizar discursos de venta agresivos de manera unidireccional.\n\nLa consagrada metodología de ventas complejas SPIN (Situación, Problema, Implicación y Necesidad de recompensa) instruye en formular preguntas estratégicas de valor para elevar el nivel de conciencia y el valor percibido del servicio por el propio cliente, diluyendo de manera automática la objeción tradicional del costo final.\n\nReferencias:\n- Rackham, N. (1988). SPIN Selling. McGraw-Hill Book Company.\n- Pink, D. H. (2012). To Sell Is Human: The Surprising Truth About Moving Others. Riverhead Books.",
    tips: [
      "Crea argumentos sencillos pero contundentes ante objeciones frecuentes de costo.",
      "Implementa un sistema básico de seguimiento (CRM) a prospectos indecisos.",
      "Ofrece ofertas de introducción atractivas para los integrantes de tu red."
    ],
    quiz: {
      question: "¿Cuál es el mejor punto de partida para manejar la objeción de 'está muy caro'?",
      options: [
        "Ofrecer un descuento inmediato sacrificando todo tu margen operativo.",
        "Reencuadrar la conversación hacia los beneficios únicos y el valor de retorno que ofreces.",
        "Ofenderse con la clienta e interrumpir toda comunicación de manera asertiva."
      ],
      correctIndex: 1,
      explanation: "La objeción del costo suele traducirse como una falta de claridad del valor entregado. Fortalecer y justificar las ventajas de la solución mitiga esa barrera."
    }
  },
  {
    id: 14,
    category: "Fidelización",
    title: "14. Atención al Cliente y Lealtad",
    duration: "12 mins",
    content: "Diversos estudios de comportamiento del consumidor confirman que el costo asociado a la adquisición de un nuevo cliente supera notablemente el costo correspondiente a fidelizar y generar compras recurrentes en un consumidor que ya conoce tu marca.\n\nEstablecer canales claros y permanentes de retroalimentación en conjunto con un monitoreo de satisfacción del cliente mediante herramientas directas como el Net Promoter Score (NPS) permite corregir de inmediato errores operacionales y extender el valor de vida del cliente (LTV) dentro de tu empresa de forma sostenida.\n\nReferencias:\n- Reichheld, F. F. (2003). The one number you need to grow. Harvard Business Review, 81(12), 46-55.\n- Blattberg, R. C., Getz, G., & Thomas, J. S. (2001). Customer Equity: Building and Managing Relationships as Valuable Assets. Harvard Business Press.",
    tips: [
      "Establece canales directos de retroalimentación vía WhatsApp Business rápido.",
      "Resuelve disputas de inmediato con un enfoque de retención a largo plazo.",
      "Incentiva compras cruzadas o segundas visitas con programas de puntos accesibles."
    ],
    quiz: {
      question: "¿Por qué se insiste en que conservar o fidelizar a tus clientes actuales es altamente rentable?",
      options: [
        "Porque exigen menos calidad que los clientes que acaban de conocerte.",
        "Porque reduce los costos de adquisición y fomenta ventas recurrentes con menor esfuerzo.",
        "Porque los clientes antiguos nunca vuelven a exigir garantías de ningún tipo."
      ],
      correctIndex: 1,
      explanation: "La clientela ya conforme confía en tus soluciones, lo que aumenta el promedio de compra recurrente de forma sostenida y estabiliza tus ingresos mensuales."
    }
  },
  {
    id: 15,
    category: "Liderazgo",
    title: "15. Liderazgo y Negociación Femenina",
    duration: "14 mins",
    content: "A medida que una organización progresa en su curva de maduración de mercado, el rol de la fundadora debe transitar desde el desempeño operativo táctico hacia responsabilidades estratégicas integrales de alta gerencia, gobernanza y negociación multilateral.\n\nEstudios sistemáticos de procesos de negociación sugieren enfáticamente que las aptitudes blandas de comunicación asertiva, escucha activa no-confrontativa y soluciones bilaterales cooperativas generan acuerdos comerciales de mucho mayor margen a largo plazo en comparación con esquemas jerárquicos o piramidales tradicionales.\n\nReferencias:\n- Fisher, R., Ury, W. L., & Patton, B. (2011). Getting to Yes: Negotiating Agreement Without Giving In. Penguin Books.\n- Babcock, L., & Laschever, S. (2003). Women Don't Ask: Negotiation and the Gender Divide. Princeton University Press.",
    tips: [
      "Aprende a negociar ganar-ganar en todas las esferas de tu operación.",
      "Establece metas de desempeño transparentes y comprensibles para tu equipo.",
      "Evita el micromanagement obsesivo; otorga confianza fundada a tus colaboradoras."
    ],
    quiz: {
      question: "¿Cuál es un beneficio directo de delegar tareas operativas en tu emprendimiento?",
      options: [
        "Dejar de ir a trabajar por completo y desentenderte del rumbo corporativo.",
        "Liberar tu tiempo para enfocarte en planeación estratégica, ventas claves y escalamiento.",
        "Aumentar los gastos de operación al doble sin recibir ningún valor técnico a cambio."
      ],
      correctIndex: 1,
      explanation: "Delegar de forma ordenada te desliga del trabajo de carpintería operativa diario, centrándote en lo que verdaderamente multiplica el valor de tu compañía."
    }
  },
  {
    id: 16,
    category: "Sinergia",
    title: "16. Colaboración y Crecimiento Colectivo",
    duration: "11 mins",
    content: "La ventaja competitiva moderna no reside exclusivamente en la pugna o rivalidad del mercado directo individual, sino en la integración y posicionamiento de las microempresas dentro de redes de colaboración coordinadas de alta confianza o agrupaciones de valor comercial (clusters industriales).\n\nCompartir economías de escala a través de la adquisición consolidada grupal de materia prima, cooperar en campañas de visibilidad de mercado combinada, e interactuar estrechamente con redes empresariales asertivas diluye sustancialmente el coste de operación fijo de cada fundadora y potencia su crecimiento sostenido.\n\nReferencias:\n- Porter, M. E. (1998). Clusters and the new economics of competition. Harvard Business Review, 76(6), 77-90.\n- Dyer, J. H., & Singh, H. (1998). The relational view: Cooperative strategy and sources of interorganizational competitive advantage. Academy of Management Review, 23(4), 660-679.",
    tips: [
      "Explora sinergias con negocios complementarios de la red de aliadas.",
      "Organiza ofertas flash combinadas con otra marca de nuestra plataforma.",
      "Aporta valor de manera natural y colaboradora a proyectos iniciales que lo necesiten."
    ],
    quiz: {
      question: "¿Qué papel juega la colaboración cruzada dentro de nuestra comunidad corporativa?",
      options: [
        "Ninguno; en los negocios la única filosofía válida es el aislamiento total.",
        "Une fortalezas y amplifica la exposición de ambas marcas reduciendo costos de mercadotecnia.",
        "Limita las oportunidades individuales, obligando a compartir todas las ganancias."
      ],
      correctIndex: 1,
      explanation: "La colaboración une bases de datos de clientas compatibles y diluye costos masivos en campañas creativas conjuntas, ganando visibilidad doble."
    }
  },
  {
    id: 17,
    category: "Estratégico",
    title: "17. Escalamiento y Tu Plan a Futuro",
    duration: "16 mins",
    content: "Escalar exitosamente una organización implica conseguir que los ingresos comerciales crezcan de manera exponencial mientras que sus costos fijos y operacionales se desenvuelvan de forma estrictamente lineal o controlada.\n\nEsto exige de las fundadoras la descentralización asertiva mediante automatización de software de administración, estandarización documentada rigurosa en manuales de procesos simplificados y la adopción de canales de distribución repetibles, habilitando un crecimiento predecible y saludable en los años venideros.\n\nReferencias:\n- Hoffman, R., & Yeh, J. (2018). Blitzscaling: The Lightning-Fast Path to Building Massively Valuable Companies. Currency.\n- Harnish, V. (2014). Scaling Up: How a Few Companies Make It... and Why the Rest Don't. Gazelles Publishing.",
    tips: [
      "Estandariza los flujos de servicio al cliente en bases documentadas sencillas.",
      "Estudia la viabilidad de un modelo de franquicia o licenciamiento formal.",
      "Mantén siempre tu visión clara a 3 años y no temas liderar un movimiento."
    ],
    quiz: {
      question: "¿Qué describe de manera correcta el concepto técnico de 'escalar tu negocio'?",
      options: [
        "Incrementar tus gastos fijos al doble de tus flujos de utilidades.",
        "Aumentar tu volumen de ventas exponencialmente manteniendo costos casi fijos o estables.",
        "Contratar el triple de empleados de soporte para hacer la misma tarea sin tecnología."
      ],
      correctIndex: 1,
      explanation: "El escalamiento exitoso se apoya en procesos estandarizados, automatizaciones y modelos replicables, logrando captar ingresos masivos con costes optimizados."
    }
  }
];

const lessonsDataEn: Lesson[] = [
  {
    id: 1,
    category: "Founder Mindset",
    title: "1. Introduction to Female Entrepreneurship",
    duration: "10 mins",
    content: "Female-led entrepreneurship has experienced unprecedented global momentum, establishing itself as a vital engine for sustainable economic growth. Nonetheless, women founders face distinct structural barriers, from implicit bias in venture capital allocation to a historical lack of executive-level mentorship networks.\n\nOvercoming these barriers requires moving from a purely reactive posture to cultivating an abundance mindset and financial independence, anchored in a cooperative support ecosystem. Research proves that collaborative networks act as a critical buffer against economic turbulence, dramatically multiplying business survival rates compared to isolated approaches.\n\nReferences:\n- Brush, C. G., de Bruin, A., & Welter, F. (2009). A gender-aware framework for women's entrepreneurship. International Journal of Gender and Entrepreneurship, 1(1), 8-24.\n- Terjesen, S., & Amorós, J. E. (2010). Female entrepreneurship in Latin America. World Development, 38(11), 1653-1662.",
    tips: [
      "Shift from a mindset of rivalry to co-creation and active networking.",
      "Treat your business not as a hobby, but as an engine of financial sovereignty.",
      "Identify internal blindspots and actively seek mentorship."
    ],
    quiz: {
      question: "What is the primary channel that shields women-led businesses against market vulnerability?",
      options: [
        "Running aggressive paid ad campaigns in isolation.",
        "Joining a collaborative ecosystem where growth is supported collectively.",
        "Relying exclusively on high-interest commercial bank loans."
      ],
      correctIndex: 1,
      explanation: "Collaborative learning environments and active communities transform mutual support into tangible strategic advantages for business survival."
    }
  },
  {
    id: 2,
    category: "Market Validation",
    title: "2. Ideation and Niche Discovery",
    duration: "12 mins",
    content: "Discovering a profitable market niche starts at the intersection of a founder’s core strengths (her Ikigai) and an acute, underserved customer pain point. Attempting to sell to everyone dilutes your marketing budget and creates brand ambiguity.\n\nSteve Blank’s Customer Discovery methodology advocates testing business assumptions through structured qualitative interviews and direct observation before making significant financial commitments. Pinpointing specific psychographic pains allows founders to craft compelling value propositions with pricing power.\n\nReferences:\n- Blank, S. (2020). The Four Steps to the Epiphany. John Wiley & Sons.\n- Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design. John Wiley & Sons.",
    tips: [
      "Conduct 5 short interviews with ideal customers to detect genuine frustrations.",
      "Define your ideal customer with precise demographic and psychographic pain points.",
      "Analyze competitors not to copy, but to find white space to differentiate."
    ],
    quiz: {
      question: "What is paramount when identifying a high-profitability market niche?",
      options: [
        "Offering generic products that fit every demographic.",
        "Identifying a recurring, painful problem within a defined target group.",
        "Focusing strictly on being the cheapest option regardless of quality."
      ],
      correctIndex: 1,
      explanation: "Solving an intense, recurring problem for a specific group provides the pricing leverage and loyalty needed to thrive."
    }
  },
  {
    id: 3,
    category: "Agile Methodologies",
    title: "3. Agile Business Planning (Lean)",
    duration: "15 mins",
    content: "Agile planning frameworks have revolutionized how startups are built. The traditional 60-page business plan often represents unvalidated assumptions that become obsolete upon first customer contact.\n\nThe Lean Canvas is a 1-page business model blueprint across 9 essential building blocks that prioritizes learning speed and Minimum Viable Product (MVP) execution. By focusing on rapid Build-Measure-Learn cycles, founders optimize capital and eliminate waste.\n\nReferences:\n- Ries, E. (2011). The Lean Startup. Crown Business.\n- Maurya, A. (2012). Running Lean. O'Reilly Media.",
    tips: [
      "Build visual 1-page plans that you can adjust weekly based on data.",
      "Launch a Minimum Viable Product (MVP) before committing to large production runs.",
      "Track 2 North Star metrics weekly and avoid vanity metrics."
    ],
    quiz: {
      question: "What key advantage does an agile Lean Canvas provide over traditional business plans?",
      options: [
        "It eliminates the need to track revenue or operational expenses.",
        "It enables you to test hypotheses and pivot strategies quickly with minimal waste.",
        "It guarantees instant automatic bank financing approval."
      ],
      correctIndex: 1,
      explanation: "The Lean Canvas emphasizes validated learning and rapid prototypes, preventing founders from spending months building products no one buys."
    }
  },
  {
    id: 4,
    category: "Personal Finance",
    title: "4. Founder Personal Finances",
    duration: "11 mins",
    content: "A startup's financial resilience is directly tied to the personal financial health of its founders. Mixing company cash flow with personal expenses (commingling funds) clouds unit economics, true product margins, and net profitability.\n\nModern financial governance dictates that founders should assign themselves a fixed baseline salary—even if modest initially—and operate strictly separate bank accounts. This clarifies accounting profit while protecting personal assets from commercial liabilities.\n\nReferences:\n- CFP Board of Standards. (2021). Financial Planning Competency Handbook. John Wiley & Sons.\n- Kiyosaki, R. (2017). Rich Dad Poor Dad. Plata Publishing.",
    tips: [
      "Set a fixed monthly founder salary, even if symbolic in the early months.",
      "Keep separate bank accounts and cards for company versus household expenses.",
      "Build a personal emergency fund covering 3 to 6 months of fixed living costs."
    ],
    quiz: {
      question: "What is the most dangerous consequence of commingling business and personal funds?",
      options: [
        "Artificially doubling reported net margins.",
        "Inability to determine true product costs, leading to silent descapitalization.",
        "Automatic government exemption from corporate tax obligations."
      ],
      correctIndex: 1,
      explanation: "Commingling funds obscures unit costs, making it impossible to know whether the business is genuinely profitable or consuming your personal savings."
    }
  },
  {
    id: 5,
    category: "Business Finance",
    title: "5. Budgeting and Cash Flow Management",
    duration: "14 mins",
    content: "Cash flow is the lifeblood of early-stage ventures. A frequent pitfall is confusing accrual accounting profits with actual liquidity in the bank. Companies rarely fail due to lack of paper profits; they fail when liquidity runs dry to meet immediate obligations like payroll, rent, or inventory.\n\nSound financial discipline requires modeling a rolling 12-week cash flow projection, distinguishing fixed operating expenses from variable costs of goods sold. This foresight allows founders to anticipate seasonal dips and renegotiate supplier terms before liquidity crunches occur.\n\nReferences:\n- Brigham, E. F., & Ehrhardt, M. C. (2019). Financial Management: Theory & Practice. Cengage Learning.\n- Gibson, C. H. (2013). Financial Statement Analysis. Cengage Learning.",
    tips: [
      "Maintain a rolling 12-week cash projection to anticipate liquidity valleys.",
      "Strictly categorize expenses into fixed (rent, software) and variable (materials).",
      "Negotiate longer payment windows with vendors and faster payment terms with clients."
    ],
    quiz: {
      question: "What is Cash Flow and why is it critical for early-stage survival?",
      options: [
        "A theoretical forecast of future sales unrelated to real bank balances.",
        "The actual tracking of cash inflows and outflows determining immediate liquidity.",
        "The total valuation of inventory stored in warehouse facilities."
      ],
      correctIndex: 1,
      explanation: "Cash Flow reflects immediate tangible liquidity, ensuring you have cash on hand to fulfill vital obligations."
    }
  },
  {
    id: 6,
    category: "Pricing & Costing",
    title: "6. Costing and Value-Based Pricing",
    duration: "16 mins",
    content: "Setting prices reactively based solely on competitor sticker prices is a grave financial hazard that quietly erodes gross margins. Rigorous costing requires detailing direct costs (materials, transaction fees, packaging), allocable indirect costs (labor hours, standard spoilage/waste), and calculating the operational Break-Even Point.\n\nOnce baseline costs are established, pricing strategy should shift toward value-based pricing, where prices reflect perceived customer benefits, convenience, and status rather than mere cost-plus markups.\n\nReferences:\n- Nagle, T. T., & Müller, G. (2017). The Strategy and Tactics of Pricing. Routledge.\n- Kotler, P., & Keller, K. L. (2016). Marketing Management. Pearson.",
    tips: [
      "Never treat your personal labor as free; factor your hourly wage into unit costs.",
      "Include a standard shrinkage/defect allowance in your cost model.",
      "Charge premium prices if your customer experience and quality justify it."
    ],
    quiz: {
      question: "What danger arises when copying competitor pricing without internal cost analysis?",
      options: [
        "Instantly capturing 100% market share.",
        "Risking selling below your break-even point and losing money on every order.",
        "Automatically speeding up shipping turnaround times."
      ],
      correctIndex: 1,
      explanation: "Every business has unique overhead. Copying competitors blindly can mean hemorrhaging money despite high order volume."
    }
  },
  {
    id: 7,
    category: "Collective Capital",
    title: "7. Collaborative & Community Financing",
    duration: "13 mins",
    content: "Crowdfunding and community-backed financing have emerged as equitable alternatives to the historic funding gap in traditional banking for female entrepreneurs. These models secure initial or expansion capital through small contributions from a trusted network or customer community, simultaneously validating market demand.\n\nFunding structures span presale rewards, micro-equity, peer lending, and community patronage. This transparent model injects growth capital without suffocating the business with punitive debt terms.\n\nReferences:\n- Belleflamme, P., Lambert, T., & Schwienbacher, A. (2014). Crowdfunding: Tapping the right crowd. Journal of Business Venturing, 29(5), 585-609.\n- Mollick, E. (2014). The dynamics of crowdfunding. Journal of Business Venturing, 29(1), 1-16.",
    tips: [
      "Cultivate an authentic community of supporters who genuinely believe in your mission.",
      "Communicate transparently how community funds directly advance key milestones.",
      "Leverage collaborative platforms to gain visibility and backers."
    ],
    quiz: {
      question: "What is the primary advantage of community financing compared to commercial bank debt?",
      options: [
        "It requires zero communication or engagement with your customer base.",
        "It provides non-predatory capital while turning supporters into lifelong brand advocates.",
        "Funds are granted with no expectation of delivering real value or products."
      ],
      correctIndex: 1,
      explanation: "Community-backed models democratize capital, reducing debt risks while building deep customer loyalty."
    }
  },
  {
    id: 8,
    category: "Legal & Formation",
    title: "8. Legal Formation and Intellectual Property",
    duration: "12 mins",
    content: "Formally incorporating a business entity mitigates personal legal liabilities, protects intellectual property (trademarks, copyrights, formulas), and unlocks enterprise-level B2B contracts. Modern jurisdictions provide streamlined entity structures that allow rapid digital incorporation with minimal legal friction.\n\nSimultaneously, registering your brand name and logo safeguards your hard-earned reputation from copycats and ensures your enterprise value remains intact as you scale.\n\nReferences:\n- General Corporations and Commercial Code guides.\n- Intellectual Property Office (Trademark & Patent guidelines).",
    tips: [
      "Research the entity type and tax regime that offers legal protection and efficiency.",
      "Protect your core brand assets by registering your trademark early.",
      "Draft clear co-founder agreements covering equity, responsibilities, and vesting."
    ],
    quiz: {
      question: "What is the primary benefit of legal formalization and trademark protection?",
      options: [
        "Exemption from providing any customer return policies.",
        "Contractual certainty, asset protection, and the ability to sign corporate agreements.",
        "Guaranteed free primetime television advertising."
      ],
      correctIndex: 1,
      explanation: "Formalization protects personal assets from enterprise debt and secures trademark rights essential for long-term equity value."
    }
  },
  {
    id: 9,
    category: "Brand & Marketing",
    title: "9. Purpose-Driven Storytelling",
    duration: "15 mins",
    content: "Modern consumers increasingly reject sterile, purely transactional sales pitches. High-impact marketing requires a compelling, authentic brand narrative (Storytelling) rooted in a clear foundational purpose.\n\nTransparently communicating your brand's 'Why'—the hurdles overcome, the craftsmanship, and the social impact—creates emotional resonance that transcends price sensitivity and builds enduring affinity.\n\nReferences:\n- Sinek, S. (2009). Start with Why. Portfolio Penguin.\n- Aaker, D. A. (2014). Aaker on Branding. Morgan James Publishing.",
    tips: [
      "Articulate the founding story and non-negotiable core values behind your brand.",
      "Embrace authenticity: show behind-the-scenes processes, challenges, and wins.",
      "Pair clear calls to action with a mission that resonates emotionally."
    ],
    quiz: {
      question: "What is the main outcome of incorporating purpose-driven Storytelling into your brand?",
      options: [
        "Doubling raw production costs immediately.",
        "Fostering emotional connection, empathy, and loyalty beyond price comparisons.",
        "Eliminating the need to maintain quality standards."
      ],
      correctIndex: 1,
      explanation: "Emotional storytelling transforms casual buyers into passionate brand evangelists who actively champion your mission."
    }
  },
  {
    id: 10,
    category: "Social Media",
    title: "10. Strategic Social Media Presence",
    duration: "12 mins",
    content: "Managing business social channels today demands moving away from static, catalogue-style posts. Modern algorithms reward accounts that generate genuine community engagement, favoring educational, entertaining, and relatable short-form video.\n\nThe most effective strategy is mastering one or two primary platforms tailored to your ideal buyer persona before spreading resources thin across every trending app.\n\nReferences:\n- Kaplan, A. M., & Haenlein, M. (2010). Users of the world, unite! Business Horizons, 53(1), 59-68.\n- Mangold, W. G., & Faulds, D. J. (2009). Social media: The new hybrid element of the promotion mix. Business Horizons.",
    tips: [
      "Create interactive formats (polls, questions, BTS videos) that spark comments.",
      "Focus deeply on one platform where your primary buyer actively spends time.",
      "Maintain a realistic editorial calendar to ensure sustainable posting consistency."
    ],
    quiz: {
      question: "What is the most effective approach for social media content strategy?",
      options: [
        "Posting aggressive discount offers exclusively in every feed update.",
        "Balancing value, education, and inspiration alongside clear purchase opportunities.",
        "Buying fake followers to simulate artificial social proof."
      ],
      correctIndex: 1,
      explanation: "Audiences purchase when they receive value, practical insights, and relatable storytelling, laying the groundwork for sustainable conversion."
    }
  },
  {
    id: 11,
    category: "Sales Channels",
    title: "11. E-Commerce and Digital Conversion",
    duration: "14 mins",
    content: "E-Commerce eliminates geographical constraints, allowing your business to operate 24/7. However, driving traffic without conversion optimization results in high bounce rates and lost revenue.\n\nConversion rate optimization (CRO) requires mobile-first design, lightning-fast checkout experiences, clear shipping expectations, and trusted, fraud-protected payment gateways (like Stripe or PayPal) to minimize cart abandonment.\n\nReferences:\n- Laudon, K. C., & Traver, C. G. (2021). E-commerce 2021. Pearson.\n- Chaffey, D. (2019). Digital Marketing. Pearson.",
    tips: [
      "Test your checkout flow on mobile: keep it under 3 effortless clicks.",
      "Display clear shipping policies and contact links directly on product pages.",
      "Sync direct ordering links with your marketplace listings and social bios."
    ],
    quiz: {
      question: "Why is integrating streamlined digital checkout gateways essential?",
      options: [
        "To restrict payments strictly to cash upon delivery.",
        "To remove checkout friction and accelerate buyer purchase intent.",
        "To replace the requirement for shipping fulfillment."
      ],
      correctIndex: 1,
      explanation: "Reducing checkout friction directly boosts conversion rates. Effortless payments turn interested browsers into paying customers."
    }
  },
  {
    id: 12,
    category: "Operations",
    title: "12. Inventory Management and Fulfillment",
    duration: "13 mins",
    content: "Inefficient inventory management quietly destroys startup margins. Overstocking ties up working capital that could fund marketing, while stockouts lead to frustrated buyers and damaged customer retention.\n\nImplementing safety stock thresholds and negotiated shipping carrier agreements ensures predictable fulfillment times, maintaining customer trust and repeat orders.\n\nReferences:\n- Chopra, S., & Meindl, P. (2016). Supply Chain Management. Pearson.\n- Ballou, R. H. (2004). Business Logistics. Pearson Education.",
    tips: [
      "Partner with reliable courier services using discounted prepaid shipping labels.",
      "Set safety stock alerts to reorder inputs before peak seasons arrive.",
      "Reconcile physical inventory against accounting records regularly."
    ],
    quiz: {
      question: "What is the primary risk of carrying excessive, slow-moving inventory?",
      options: [
        "Uncontrollably increasing cash in the bank.",
        "Freezing critical working capital and creating liquidity shortages.",
        "Instantly eliminating all fulfillment expenses."
      ],
      correctIndex: 1,
      explanation: "Tied-up inventory is illiquid cash; balancing inventory velocity with actual demand maintains healthy operating liquidity."
    }
  },
  {
    id: 13,
    category: "Conversion",
    title: "13. High-Impact Consultative Sales",
    duration: "15 mins",
    content: "Effective modern sales relies on diagnosing customer problems rather than delivering aggressive, one-way sales pitches.\n\nThe proven SPIN Selling methodology (Situation, Problem, Implication, Need-Payoff) guides founders to ask strategic questions that uncover deep client needs, making the value of your solution obvious and naturally overcoming price objections.\n\nReferences:\n- Rackham, N. (1988). SPIN Selling. McGraw-Hill.\n- Pink, D. H. (2012). To Sell Is Human. Riverhead Books.",
    tips: [
      "Prepare clear, benefit-driven responses for common pricing objections.",
      "Use a simple follow-up system (CRM or spreadsheet) for interested leads.",
      "Offer attractive introductory promotions to welcome new clients."
    ],
    quiz: {
      question: "What is the most constructive response when a prospect says 'it's too expensive'?",
      options: [
        "Immediately slashing your price and sacrificing your entire profit margin.",
        "Reframing the conversation around unique benefits, ROI, and total value delivered.",
        "Ending the conversation abruptly and ignoring the lead."
      ],
      correctIndex: 1,
      explanation: "Price objections usually signal that the value has not yet been demonstrated. Clarifying results and unique strengths dissolves resistance."
    }
  },
  {
    id: 14,
    category: "Customer Loyalty",
    title: "14. Customer Experience and Retention",
    duration: "12 mins",
    content: "Customer retention research consistently proves that acquiring a new buyer costs 5 to 7 times more than retaining an existing customer.\n\nProviding swift customer support, gathering feedback via Net Promoter Score (NPS), and resolving complaints with generosity extends Customer Lifetime Value (LTV) and generates organic word-of-mouth referrals.\n\nReferences:\n- Reichheld, F. F. (2003). The one number you need to grow. Harvard Business Review, 81(12), 46-55.\n- Blattberg, R. C., et al. (2001). Customer Equity. Harvard Business Press.",
    tips: [
      "Provide responsive customer support via WhatsApp or email.",
      "Treat complaints as golden opportunities to create lifelong loyal fans.",
      "Incentivize repeat orders with loyalty perks, thank-you notes, or referral rewards."
    ],
    quiz: {
      question: "Why is customer retention more profitable than endless customer acquisition?",
      options: [
        "Existing customers accept lower product quality than newcomers.",
        "It lowers acquisition costs and generates predictable, repeat sales with higher margins.",
        "Long-time customers never request product exchanges or assistance."
      ],
      correctIndex: 1,
      explanation: "Satisfied customers buy more frequently, spend more per transaction, and recommend your brand to friends, compounding profitability."
    }
  },
  {
    id: 15,
    category: "Leadership",
    title: "15. Executive Leadership & Negotiation",
    duration: "14 mins",
    content: "As a business matures, a founder must transition from handling every daily operational task to exercising executive leadership, strategic delegation, and multi-party negotiation.\n\nNegotiation research highlights that collaborative, win-win communication styles and empathetic problem-solving generate higher-margin, sustainable commercial agreements than rigid or adversarial tactics.\n\nReferences:\n- Fisher, R., Ury, W. L., & Patton, B. (2011). Getting to Yes. Penguin Books.\n- Babcock, L., & Laschever, S. (2003). Women Don't Ask. Princeton University Press.",
    tips: [
      "Strive for win-win agreements across client contracts, supplier terms, and partnerships.",
      "Establish clear, measurable performance goals for team members.",
      "Avoid micromanagement: empower collaborators with clear guidelines."
    ],
    quiz: {
      question: "What is the primary benefit of delegating routine operational tasks?",
      options: [
        "Completely disengaging from the company’s vision and performance.",
        "Freeing founder time to focus on strategic growth, key partnerships, and scale.",
        "Doubling operational expenses with zero return on time saved."
      ],
      correctIndex: 1,
      explanation: "Delegation frees high-value founder hours for high-leverage activities like strategy, major sales, and leadership."
    }
  },
  {
    id: 16,
    category: "Synergy",
    title: "16. Cross-Collaboration and Network Power",
    duration: "11 mins",
    content: "Modern competitive advantage is not won in isolation. Thriving micro-enterprises embed themselves within collaborative ecosystems, strategic alliances, and commercial clusters.\n\nCo-marketing campaigns, bundled product drops, and shared supplier arrangements lower individual overhead while exposing participating brands to fresh, highly aligned customer audiences.\n\nReferences:\n- Porter, M. E. (1998). Clusters and the new economics of competition. Harvard Business Review, 76(6), 77-90.\n- Dyer, J. H., & Singh, H. (1998). The relational view. Academy of Management Review.",
    tips: [
      "Explore co-marketing collaborations with complementary brands in your network.",
      "Host joint flash sales or giveaway bundles with partner businesses.",
      "Offer mentorship and authentic support to emerging founders in your field."
    ],
    quiz: {
      question: "What role does cross-collaboration play within our founder community?",
      options: [
        "None; total isolation is the only sound business practice.",
        "It combines strengths, doubles marketing exposure, and reduces customer acquisition costs.",
        "It limits individual opportunities by forcing equal profit sharing on all goods."
      ],
      correctIndex: 1,
      explanation: "Collaboration unites compatible customer bases and lowers customer acquisition costs through innovative joint campaigns."
    }
  },
  {
    id: 17,
    category: "Strategy",
    title: "17. Scaling and Your Future Roadmap",
    duration: "16 mins",
    content: "Scaling an organization means growing top-line revenues exponentially while operating costs expand linearly or remain controlled.\n\nThis transformation requires founders to embrace process documentation, standard operating procedures (SOPs), software automation, and repeatable distribution channels to ensure sustainable, long-term health.\n\nReferences:\n- Hoffman, R., & Yeh, J. (2018). Blitzscaling. Currency.\n- Harnish, V. (2014). Scaling Up. Gazelles Publishing.",
    tips: [
      "Document standard operating procedures for customer service and fulfillment.",
      "Evaluate the feasibility of digital products, licensing, or wholesale models.",
      "Maintain an ambitious 3-year vision and never hesitate to lead."
    ],
    quiz: {
      question: "What accurately defines the business concept of 'scaling'?",
      options: [
        "Increasing fixed overhead at twice the rate of revenue.",
        "Multiplying revenue exponentially while keeping operational costs relatively steady.",
        "Hiring triple the staff to manually complete the same tasks without software."
      ],
      correctIndex: 1,
      explanation: "Successful scaling relies on repeatable systems, automated workflows, and standardized processes to multiply revenue without proportional cost spikes."
    }
  }
];

// Deterministically distribute correct answers across A (0), B (1), and C (2)
const TARGET_CORRECT_INDICES = [1, 0, 2, 0, 1, 2, 0, 1, 2, 0, 2, 1, 0, 2, 1, 0, 2];

function shuffleLessonQuiz(lessonList: Lesson[]): Lesson[] {
  return lessonList.map((lesson, idx) => {
    const targetIdx = TARGET_CORRECT_INDICES[idx % TARGET_CORRECT_INDICES.length];
    const opts = [...lesson.quiz.options];
    if (targetIdx !== 1) {
      const temp = opts[targetIdx];
      opts[targetIdx] = opts[1];
      opts[1] = temp;
    }
    return {
      ...lesson,
      quiz: {
        ...lesson.quiz,
        options: opts,
        correctIndex: targetIdx
      }
    };
  });
}

const processedLessonsEs = shuffleLessonQuiz(lessonsDataEs);
const processedLessonsEn = shuffleLessonQuiz(lessonsDataEn);

export default function EducacionCurso({ onBack }: { onBack: () => void }) {
  const { t, language } = useLanguage();
  const [completedLessons, setCompletedLessons] = useState<Record<number, number>>({});
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showRecognitionModal, setShowRecognitionModal] = useState<boolean>(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const lessonsData = language === 'en' ? processedLessonsEn : processedLessonsEs;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('roos_capital_course_saves');
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
  }, []);

  // Save to localStorage when completedLessons changes
  const updateProgress = (lessonId: number, score: number) => {
    const updated = { ...completedLessons, [lessonId]: score };
    setCompletedLessons(updated);
    try {
      localStorage.setItem('roos_capital_course_saves', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  const currentLesson = lessonsData.find(l => l.id === selectedLessonId) || lessonsData[0];

  // Grade Calculations
  const completedCount = Object.keys(completedLessons).length;
  const correctCount = Object.values(completedLessons).filter(score => score === 100).length;
  const finalGrade = Math.round((correctCount / 17) * 100);

  const handleRestartProgress = () => {
    const confirmMessage = language === 'en'
      ? "Are you sure you want to reset your course progress? Your current test scores will be cleared."
      : "¿Segura que deseas reiniciar tu progreso del curso? Se borrarán tus calificaciones actuales.";

    if (window.confirm(confirmMessage)) {
      setCompletedLessons({});
      setSelectedLessonId(1);
      setSelectedAnswerIndex(null);
      setQuizSubmitted(false);
      setIsAnswerCorrect(null);
      try {
        localStorage.removeItem('roos_capital_course_saves');
      } catch (e) {}
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswerIndex(optionIndex);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswerIndex === null) return;
    const isCorrect = selectedAnswerIndex === currentLesson.quiz.correctIndex;
    setIsAnswerCorrect(isCorrect);
    setQuizSubmitted(true);
    
    // Save state
    const scoreEarned = isCorrect ? 100 : 0;
    updateProgress(currentLesson.id, scoreEarned);

    // If successfully concluding the program with >= 70 points, show recognition pop-up
    const nextCompleted = { ...completedLessons, [currentLesson.id]: scoreEarned };
    const nextCompletedCount = Object.keys(nextCompleted).length;
    const nextCorrectCount = Object.values(nextCompleted).filter(s => s === 100).length;
    const nextGrade = Math.round((nextCorrectCount / 17) * 100);

    if (nextCompletedCount === 17 && nextGrade >= 70) {
      setTimeout(() => {
        setShowRecognitionModal(true);
      }, 700);
    }
  };

  // Switch to another module and reset temporary state
  const handleSelectLesson = (id: number) => {
    setSelectedLessonId(id);
    setSelectedAnswerIndex(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);
  };

  const handleNextLesson = () => {
    if (selectedLessonId < 17) {
      handleSelectLesson(selectedLessonId + 1);
    }
  };

  const handlePrevLesson = () => {
    if (selectedLessonId > 1) {
      handleSelectLesson(selectedLessonId - 1);
    }
  };

  const handleDownloadPng = async () => {
    const diplomaEl = document.getElementById('roos-diploma-print-area');
    if (!diplomaEl) return;
    setIsGeneratingPng(true);

    try {
      // Capture the exact visual DOM diploma element with native browser engine at 2x high resolution
      const dataUrl = await toPng(diplomaEl, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#FAF8F5',
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      const downloadLink = document.createElement('a');
      downloadLink.download = `Reconocimiento_Roos_Capital_${finalGrade}pts.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setIsGeneratingPng(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Error generating diploma PNG:', err);
      setIsGeneratingPng(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-20 sm:pb-24 pt-4 sm:pt-6 font-sans">
      <style>{`
        .edu-btn-rose-hover {
          transition: all 0.2s ease-in-out;
        }
        .edu-btn-rose-hover:hover:not(:disabled), .edu-btn-rose-hover:active:not(:disabled) {
          background-image: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${roseGoldPattern}) !important;
          background-repeat: repeat !important;
          background-size: 1100px 800px !important;
          background-attachment: fixed !important;
          border-color: #A85967 !important;
          color: #A85967 !important;
        }
      `}</style>
      
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <a 
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              onBack();
            }
          }}
          className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md border border-[#E2A7B5] hover:bg-[#E2A7B5]/15 text-[#A85967] rounded-full font-medium text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          id="educacion-back-btn"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#A85967]" />
          <span>{t('common.backHome')}</span>
        </a>
        <span className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-white/80 backdrop-blur-md border border-[#E2A7B5]/50 text-[#A85967] rounded-full text-[10px] sm:text-xs font-bold shadow-xs whitespace-nowrap">
          <BookOpenCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-orange shrink-0" />
          {language === 'en' ? 'Academy & Financial Education Center' : 'Centro de Formación y Educación Financiera'}
        </span>
      </div>

      {/* Main Grid: Statistics Banner + Course content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Metrics summary & Module checklist (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white rounded-3xl border border-[#A85967]/10 p-5 sm:p-6 shadow-md relative overflow-hidden">
            <h3 className="text-xs font-black uppercase text-[#A85967] tracking-widest mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-orange" />
              {language === 'en' ? 'Your Performance' : 'Tu Rendimiento'}
            </h3>

            {/* Score Ring Display */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-5 sm:mb-6">
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFF1F3]/50 border-4 border-[#FFF1F3] shadow-inner shrink-0">
                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-black text-[#A85967] block leading-none font-sans">
                    {finalGrade}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-black uppercase text-brand-orange tracking-wider leading-none">
                    {language === 'en' ? 'Points' : 'Puntos'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5 text-left">
                <p className="text-xs sm:text-sm font-bold text-brand-black/80 font-sans">
                  {language === 'en' ? 'Final Score' : 'Calificación Final'} <span className="text-[#A85967] font-black">({finalGrade}/100)</span>
                </p>
                <p className="text-[11px] sm:text-xs text-brand-black/60 font-sans leading-relaxed">
                  {language === 'en'
                    ? `Based on ${completedCount} lessons completed with ${correctCount} correct answers.`
                    : `Basado en ${completedCount} lecciones completadas con ${correctCount} respuestas correctas.`}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-brand-black/60 font-sans">
                <span>{language === 'en' ? 'Completed Modules' : 'Módulos Resueltos'}</span>
                <span>{completedCount} / 17</span>
              </div>
              <div className="w-full bg-[#FFF9FB] border border-[#FCE8EF] rounded-full h-3 overflow-hidden p-0.5 shadow-2xs">
                <div 
                  className="bg-[#FCE8EF] border border-[#E85B81]/30 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedCount / 17) * 100}%` }}
                />
              </div>
            </div>

            {/* Certificate of recognition button when completed with >= 70 points */}
            {completedCount === 17 && finalGrade >= 70 && (
              <div className="mt-4 pt-3 border-t border-[#A85967]/10">
                <button
                  onClick={() => setShowRecognitionModal(true)}
                  className="w-full py-2.5 px-3 bg-[#E85B81] hover:bg-[#DE4B73] text-white text-xs font-bold rounded-xl shadow-md transition-all text-center cursor-pointer active:scale-98"
                >
                  {language === 'en' 
                    ? 'View and Save Recognition' 
                    : 'Ver y Guardar Reconocimiento'}
                </button>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#A85967]/5 flex justify-between items-center">
              <button 
                onClick={handleRestartProgress}
                className="edu-btn-rose-hover px-2.5 py-1 text-[10px] font-black uppercase text-[#E2A7B5] hover:text-brand-wine bg-white border border-[#E2A7B5] hover:bg-[#E2A7B5]/10 rounded-full transition-all flex items-center gap-1.5 focus:outline-none active:scale-95 shadow-sm"
                title={language === 'en' ? 'Reset saved progress' : 'Borrar progreso guardado'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {language === 'en' ? 'Restart course' : 'Reiniciar curso'}
              </button>

              <span className="text-[10px] font-sans font-bold text-brand-orange/90 hidden sm:flex items-center gap-1 bg-brand-orange/5 px-2.5 py-1 rounded-full border border-brand-orange/10">
                <Sparkles className="w-3 h-3" />
                {language === 'en' ? 'Roos Community' : 'Comunidad Roos'}
              </span>
            </div>
          </div>

          {/* Module List selector */}
          <div className="bg-white rounded-3xl border border-[#A85967]/10 shadow-md overflow-hidden">
            <div className="p-5 bg-[#A85967]/5 border-b border-[#A85967]/10 flex items-center justify-between">
              <h3 className="text-xs font-black text-[#A85967] uppercase tracking-wider">
                {language === 'en' ? 'Course Modules (17)' : 'Índice de Módulos (17)'}
              </h3>
              <span className="text-[10px] font-sans font-bold py-0.5 px-2 bg-[#A85967]/10 rounded-full text-[#A85967] hidden sm:inline-block">
                {language === 'en' ? 'Step by Step' : 'Paso a Paso'}
              </span>
            </div>

            <div className="divide-y divide-[#A85967]/5 max-h-[600px] overflow-y-auto">
              {lessonsData.map((lesson) => {
                const isSelected = selectedLessonId === lesson.id;
                const status = completedLessons[lesson.id] !== undefined;
                const isCorrect = completedLessons[lesson.id] === 100;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    className={`w-full p-3 sm:p-4 text-left flex items-start gap-2.5 sm:gap-3 transition-all font-sans relative ${
                      isSelected 
                        ? 'bg-[#FFF1F3] border-l-4 border-[#A85967]' 
                        : 'hover:bg-[#A85967]/5'
                    }`}
                  >
                    <div className="mt-1 shrink-0">
                      {status ? (
                        isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-500 fill-green-50" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-[#A85967]/20 flex items-center justify-center text-[10px] text-brand-black/40 font-bold" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5 text-xs">
                      <div className="flex justify-between items-center gap-1">
                        <span className="text-[10px] font-semibold text-brand-black/40 uppercase tracking-wider leading-none">
                          {lesson.category}
                        </span>
                        <span className="text-[9px] font-medium text-brand-black/30 w-auto shrink-0 leading-none">
                          {lesson.duration}
                        </span>
                      </div>
                      <p className={`font-bold ${isSelected ? 'text-[#A85967]' : 'text-brand-black/85'}`}>
                        {lesson.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Current lesson content & Active Quiz (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Lesson Content Panel */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#A85967]/10 p-5 sm:p-8 md:p-10 shadow-xl space-y-6 sm:space-y-8 relative overflow-hidden">
            
            {/* Top decorative badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A85967]/10 pb-5 sm:pb-6">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-brand-orange hidden sm:inline-block">
                  {currentLesson.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#A85967] tracking-tight leading-snug">
                  {currentLesson.title}
                </h2>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#A85967]/70 bg-[#A85967]/5 py-1.5 px-3 sm:py-2 sm:px-4 rounded-xl border border-[#A85967]/10 self-start sm:self-center shrink-0 select-none hidden sm:inline-block">
                {language === 'en' ? `Module ${currentLesson.id} of 17` : `Módulo ${currentLesson.id} de 17`}
              </span>
            </div>

            {/* Reading description */}
            <div className="prose max-w-none text-brand-black/80 font-sans space-y-6 leading-relaxed">
              <p className="text-sm sm:text-base font-medium font-sans whitespace-pre-line leading-relaxed">
                {currentLesson.content}
              </p>
            </div>

            {/* Practical takeaway Tips box */}
            <div className="bg-[#FFF1F3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#A85967]/10 space-y-3 sm:space-y-4">
              <h4 className="text-[11px] sm:text-xs font-black text-[#A85967] uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                {language === 'en' ? 'Practical Tip / Today’s Challenge' : 'Consejo Práctico / Reto de Hoy'}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {currentLesson.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-xs font-sans font-semibold text-brand-black/75">
                    <span className="w-5 h-5 bg-brand-orange/10 text-brand-orange font-black flex items-center justify-center shrink-0 rounded-full text-[10px]">
                      {i + 1}
                    </span>
                    <span className="mt-0.5 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz Section Area */}
            <div className="pt-6 border-t border-[#A85967]/10 space-y-6">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-brand-orange" />
                <h3 className="text-sm font-black text-[#A85967] uppercase tracking-wider">
                  {language === 'en' ? 'Comprehension Quiz' : 'Quiz de Comprensión'}
                </h3>
              </div>

              {/* Quiz card */}
              <div className="bg-[#FFF1F3]/50 border border-[#A85967]/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm font-black text-brand-black/90 tracking-tight leading-snug">
                  {currentLesson.quiz.question}
                </p>

                {/* Multiple Options list */}
                <div className="space-y-2.5 sm:space-y-3">
                  {currentLesson.quiz.options.map((option, index) => {
                    const isSelected = selectedAnswerIndex === index;
                    const isCorrectOption = index === currentLesson.quiz.correctIndex;
                    
                    let bgClass = "bg-white border-neutral-200 hover:bg-[#FCE8EF] hover:border-[#E85B81]/40 hover:text-[#E85B81] text-neutral-800 shadow-xs";
                    let badgeClass = "bg-neutral-100 text-neutral-600";

                    if (isSelected) {
                      bgClass = "bg-[#FFF0F4] border-2 border-[#E85B81] text-[#E85B81] shadow-sm";
                      badgeClass = "bg-[#E85B81] text-white";
                    }
                    
                    // Style after submit
                    if (quizSubmitted) {
                      if (isCorrectOption) {
                        bgClass = "bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold";
                        badgeClass = "bg-emerald-600 border border-emerald-700 text-white";
                      } else if (isSelected) {
                        bgClass = "bg-rose-50 border-2 border-rose-400 text-rose-950";
                        badgeClass = "bg-rose-500 border border-rose-600 text-white";
                      } else {
                        bgClass = "bg-white/60 border-neutral-200 opacity-50";
                        badgeClass = "bg-neutral-100 border-neutral-200 text-neutral-400";
                      }
                    }

                    return (
                      <button
                        key={index}
                        disabled={quizSubmitted}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-3 sm:p-4 border text-left rounded-xl sm:rounded-2xl text-xs font-semibold leading-relaxed transition-all flex items-start gap-2.5 sm:gap-3 relative cursor-pointer ${bgClass}`}
                      >
                        <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 font-bold font-mono text-[9px] sm:text-[10px] uppercase transition-colors ${badgeClass}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 mt-0.5 leading-relaxed font-sans">{option}</span>

                        {quizSubmitted && isCorrectOption && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2 mt-0.5" />
                        )}
                        {quizSubmitted && isSelected && !isCorrectOption && (
                          <X className="w-4 h-4 text-rose-600 shrink-0 ml-2 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action Button */}
                {!quizSubmitted ? (
                  <button
                    disabled={selectedAnswerIndex === null}
                    onClick={handleQuizSubmit}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all focus:outline-none ${
                      selectedAnswerIndex === null
                        ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
                        : 'bg-[#FFF9FB] hover:bg-[#FCE8EF] text-[#E85B81] border border-[#FCE8EF] hover:border-[#E85B81]/40 shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer'
                    }`}
                  >
                    {language === 'en' ? 'Submit Answer' : 'Enviar Respuesta'}
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Retroalimentación message banner */}
                    <div className={`p-4 rounded-2xl flex items-start gap-3 text-xs leading-relaxed ${
                      isAnswerCorrect 
                        ? 'bg-green-500/10 text-green-800 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-800 border border-red-500/20'
                    }`}>
                      <span className="text-xl shrink-0">
                        {isAnswerCorrect ? '🌸' : '💡'}
                      </span>
                      <div className="space-y-1.5 font-sans">
                        <h5 className="font-extrabold uppercase text-[10px] tracking-wider leading-none">
                          {isAnswerCorrect 
                            ? (language === 'en' ? 'Correct, fantastic choice!' : '¡Correcto, fantástica elección!') 
                            : (language === 'en' ? 'Review the strategy again' : 'Vuelve a revisar la estrategia')}
                        </h5>
                        <p className="font-semibold text-brand-black/75">
                          {currentLesson.quiz.explanation}
                        </p>
                      </div>
                    </div>

                    <p className="text-[10px] font-black uppercase text-brand-black/40 tracking-wider text-center">
                      {language === 'en' ? 'Progress saved locally' : 'Progreso respaldado automáticamente localmente'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Pagination Navifiers */}
            <div className="flex items-center justify-between pt-5 sm:pt-6 border-t border-[#A85967]/10 font-sans text-[10px] sm:text-xs">
              <button
                disabled={selectedLessonId === 1}
                onClick={handlePrevLesson}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold tracking-wide uppercase transition-all border focus:outline-none ${
                  selectedLessonId === 1
                    ? 'opacity-30 cursor-not-allowed border-neutral-200 bg-white text-neutral-400'
                    : 'bg-[#FFF9FB] hover:bg-[#FCE8EF] text-[#E85B81] border-[#FCE8EF] hover:border-[#E85B81]/40 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85B81]" />
                {language === 'en' ? 'Previous' : 'Anterior'}
              </button>

              <span className="text-brand-black/40 font-bold uppercase tracking-wider select-none text-xs">
                <span className="inline sm:hidden">{selectedLessonId}</span>
                <span className="hidden sm:inline">
                  {language === 'en' ? `Lesson ${selectedLessonId} / 17` : `Lección ${selectedLessonId} / 17`}
                </span>
              </span>

              <button
                disabled={selectedLessonId === 17}
                onClick={handleNextLesson}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold tracking-wide uppercase transition-all border focus:outline-none ${
                  selectedLessonId === 17
                    ? 'opacity-30 cursor-not-allowed border-neutral-200 bg-white text-neutral-400'
                    : 'bg-[#FFF9FB] hover:bg-[#FCE8EF] text-[#E85B81] border-[#FCE8EF] hover:border-[#E85B81]/40 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer'
                }`}
              >
                {language === 'en' ? 'Next' : 'Siguiente'}
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E85B81]" />
              </button>
            </div>

          </div>

          {/* Inspirational footer message */}
          <div className="text-center bg-[#FFF9FB] py-4 px-6 sm:py-6 sm:px-10 rounded-2xl sm:rounded-3xl border border-[#FCE8EF] font-sans italic text-xs sm:text-sm leading-relaxed shadow-2xs">
            <span className="block sm:inline text-neutral-800 font-medium">
              {language === 'en'
                ? '"When a woman equips herself financially and masters her working capital, she breaks barriers for herself and collectively elevates her entire community."'
                : '"Cuando una mujer se capacita financieramente y toma el control de su capital de trabajo, derriba barreras para sí misma y transforma colectivamente a toda su comunidad."'}
            </span>{" "}
            <span className="block sm:inline mt-2 sm:mt-0 font-bold text-[#E85B81] not-italic">Roos Capital.</span>
          </div>

        </div>

      </div>

      {/* Pop-up de Reconocimiento Oficial por haber concluido exitosamente el programa con 70+ puntos */}
      {showRecognitionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border-2 border-[#E2A7B5] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowRecognitionModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 flex items-center justify-center shadow-xs transition-colors z-20 cursor-pointer print:hidden"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* DIPLOMA / CERTIFICATE PRINTABLE AREA */}
            <div 
              id="roos-diploma-print-area"
              className="p-6 sm:p-10 md:p-12 text-center bg-[#FAF8F5] relative select-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(253, 245, 247, 0.90) 100%), url(${roseGoldPattern})`,
                backgroundSize: '1100px 800px'
              }}
            >
              {/* Inner Luxury Certificate Border */}
              <div className="border-4 border-[#A85967]/30 rounded-2xl p-6 sm:p-8 bg-white/70 backdrop-blur-xs relative shadow-inner">
                {/* Corner Decorative Accents */}
                <div className="absolute top-2 left-2 text-[#A85967]/60 text-xs">✦</div>
                <div className="absolute top-2 right-2 text-[#A85967]/60 text-xs">✦</div>
                <div className="absolute bottom-2 left-2 text-[#A85967]/60 text-xs">✦</div>
                <div className="absolute bottom-2 right-2 text-[#A85967]/60 text-xs">✦</div>

                {/* Logo Header */}
                <div className="flex justify-center mb-3">
                  <RoosLogo align="center" className="text-[#18181B] scale-110" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-[#E2A7B5] text-[#A85967] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Certificate of Achievement' : 'Certificado de Acreditación'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-lux font-black text-[#A85967] uppercase tracking-wide leading-tight mb-2">
                  {language === 'en' ? 'Official Recognition' : 'Reconocimiento Oficial'}
                </h2>

                <p className="text-xs sm:text-sm font-sans font-semibold text-neutral-600 uppercase tracking-widest mb-4">
                  {language === 'en' 
                    ? 'Women Entrepreneurs & Leadership Program' 
                    : 'Programa de Emprendedoras y Liderazgo'}
                </p>

                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#A85967] to-transparent mx-auto mb-4" />

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans max-w-lg mx-auto mb-6">
                  {language === 'en'
                    ? 'Conferred upon successfully concluding the 17 advanced strategic modules of the Roos Capital Leadership Program, demonstrating dedication, strategic acumen, and exceptional entrepreneurial leadership.'
                    : 'Otorgado por haber concluido exitosamente el Programa de Emprendedoras y Liderazgo de Roos Capital, demostrando dedicación, visión estratégica y habilidades empresariales para liderar y escalar proyectos de alto impacto.'}
                </p>

                {/* Score & Status Pill */}
                <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 rounded-xl bg-[#FFF1F3] border border-[#E2A7B5] mb-6">
                  <span className="text-xs sm:text-sm font-black text-[#A85967] font-sans">
                    {language === 'en' ? 'Final Score:' : 'Calificación Final:'} {finalGrade}/100 {language === 'en' ? 'Points' : 'Puntos'}
                  </span>
                  <span className="hidden sm:inline text-neutral-300">|</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-wider font-sans flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    {language === 'en' ? 'Successfully Approved' : 'Aprobado con Éxito'}
                  </span>
                </div>

                {/* Footer Signatures & Date */}
                <div className="pt-4 border-t border-neutral-200/80 flex flex-row items-end justify-between gap-4 text-left">
                  <div className="shrink-0">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 font-sans tracking-wider">
                      {language === 'en' ? 'Date of Issue' : 'Fecha de Emisión'}
                    </p>
                    <p className="text-xs font-semibold text-neutral-700 font-sans whitespace-nowrap mt-0.5">
                      {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right shrink-0 pr-2 flex flex-col items-end max-w-[160px]">
                    <span 
                      className="text-[#A85967] leading-tight mb-1 whitespace-nowrap select-none italic font-medium tracking-wide block"
                      style={{ 
                        fontFamily: '"Brush Script MT", "Caveat", "Segoe Script", "Dancing Script", "Lucida Handwriting", cursive',
                        fontSize: '20px'
                      }}
                    >
                      Roos Capital
                    </span>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 font-sans whitespace-nowrap leading-none">
                      Leadership Committee
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-end gap-2.5 print:hidden">
              <button
                onClick={() => setShowRecognitionModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                {language === 'en' ? 'Close' : 'Cerrar'}
              </button>
              <button
                onClick={handleDownloadPng}
                disabled={isGeneratingPng}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E85B81] hover:bg-[#DE4B73] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isGeneratingPng
                    ? (language === 'en' ? 'Generating Image...' : 'Generando Imagen...')
                    : downloadSuccess
                      ? (language === 'en' ? '✓ Downloaded!' : '✓ ¡Descargado!')
                      : (language === 'en' ? 'Download Recognition (PNG)' : 'Guardar Reconocimiento (PNG)')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Print Stylesheet for Certificate PDF */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #roos-diploma-print-area,
          #roos-diploma-print-area * {
            visibility: visible !important;
          }
          #roos-diploma-print-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 2.5cm !important;
            background: #FAF8F5 !important;
            box-shadow: none !important;
            border: none !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 9999999 !important;
          }
        }
      `}</style>
    </div>
  );
}
