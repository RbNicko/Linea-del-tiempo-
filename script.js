
const eventos = [
  {
    fecha: "c. 10,000 a.C.", era: "Prehistoria",
    titulo: "Revolución Neolítica: la primera división del trabajo",
    quien: "Surgen los primeros agricultores, ganaderos y alfareros al aparecer la agricultura.",
    relevancia: "Marca la primera gran división del trabajo: se pasa de la subsistencia pura a oficios distintos.",
    contexto: "El dominio de la metalurgia (Edad de Bronce y Hierro), la rueda, la escritura y la irrigación agrícola traen nuevos oficios. En Grecia y Roma el trabajo manual se asigna a los esclavos y las artes liberales quedan para la élite libre."
  },
  {
    fecha: "c. 400 a.C.", era: "Edad Antigua",
    titulo: "Se institucionaliza el Juramento Hipocrático",
    quien: "Lo formalizan Hipócrates y sus discípulos en la Antigua Grecia.",
    relevancia: "La medicina deja de ser una práctica empírico-religiosa y se convierte en una profesión basada en la observación científica y en una ética profesional estricta.",
    contexto: "Hipócrates (460–370 a.C.) es el padre de la medicina occidental. Imhotep (c. 2650 a.C.) es el primer arquitecto y médico del que hay registro formal. Hacia 450 a.C. el pensamiento clásico separa el trabajo intelectual del físico."
  },
  {
    fecha: "1088", era: "Edad Media y Renacimiento",
    titulo: "Se funda la Universidad de Bolonia y las titulaciones oficiales",
    quien: "Fundada por juristas, entre ellos Irnerio, en Bolonia, Italia.",
    relevancia: "Es la primera institución que certifica con títulos académicos la capacidad de ejercer profesiones como el derecho, y desplaza el monopolio del aprendizaje familiar o gremial.",
    contexto: "Surgen las universidades medievales, orientadas al derecho, la teología y la medicina. Nace el concepto formal de profesión, ligado a la educación superior y a las corporaciones de oficios."
  },
  {
    fecha: "1268", era: "Edad Media y Renacimiento",
    titulo: "Ordenanza de gremios de París y Registro de Oficios",
    quien: "Redactado por Étienne Boileau, preboste de París durante el reinado de Luis IX.",
    relevancia: "Reúne por primera vez las reglas, derechos, deberes y estructura (aprendiz, oficial, maestro) de los oficios manuales y comerciales. Sienta las bases del derecho laboral y corporativo profesional.",
    contexto: "Hacia 1150 se institucionalizan los gremios de comerciantes y artesanos en Europa Occidental. Gutenberg (c. 1400–1468) inventa la imprenta de tipos móviles y Leonardo da Vinci (1452–1519) encarna al hombre del Renacimiento: arte, ingeniería y anatomía."
  },
  {
    fecha: "1776", era: "Revolución Industrial",
    titulo: "Adam Smith publica La riqueza de las naciones",
    quien: "Obra del economista y filósofo escocés Adam Smith.",
    relevancia: "Teoriza la división del trabajo con el ejemplo de la fábrica de alfileres y explica cómo la especialización profesional dispara la productividad. Es la base del diseño del trabajo moderno.",
    contexto: "La Primera Revolución Industrial (1760–1840) mecaniza los procesos textiles y el transporte. James Watt (1736–1819) desarrolla la máquina de vapor moderna. El sistema gremial desaparece poco a poco y surgen ingenieros industriales, administradores y contadores."
  },
  {
    fecha: "1911", era: "Revolución Industrial",
    titulo: "Taylor publica The Principles of Scientific Management",
    quien: "Obra de Frederick Winslow Taylor (1856–1915) en Estados Unidos.",
    relevancia: "Da origen formal a la ingeniería industrial y a la gestión de operaciones: el trabajo empírico de fábrica pasa a medirse con tiempos, estándares y cronómetros.",
    contexto: "Henry Ford (1863–1947) lleva la especialización a la producción en cadena de montaje. El ferrocarril, el telégrafo, la electricidad y el motor de combustión interna aceleran las profesiones técnicas modernas."
  },
  {
    fecha: "1919", era: "Siglo XX",
    titulo: "Se crea la Organización Internacional del Trabajo",
    quien: "Se crea mediante el Tratado de Versalles, tras la Primera Guerra Mundial.",
    relevancia: "Es el primer organismo internacional que regula el trabajo a escala global. Establece estándares como la jornada de 8 horas, la protección a la maternidad y la seguridad e higiene laboral.",
    contexto: "Se consolidan los colegios profesionales y los títulos expedidos por el Estado. El sector terciario (servicios, finanzas, comunicación) supera al industrial. W. Edwards Deming (1900–1993) es clave en la gestión de la calidad."
  },
  {
    fecha: "1947 – 1969", era: "Siglo XX",
    titulo: "Nace la era digital: transistor y ARPANET",
    quien: "En 1947 se inventa el transistor y en 1969 se crea ARPANET, antecesor de Internet.",
    relevancia: "Inicia la era digital, y a finales de siglo la informática revoluciona la productividad.",
    contexto: "Alan Turing (1912–1954) es el padre de la informática teórica y de la inteligencia artificial. Llegan los circuitos integrados, la computadora personal, la telefonía celular y el software de productividad."
  },
  {
    fecha: "2020 – 2026", era: "Siglo XXI",
    titulo: "Teletrabajo masivo e IA generativa",
    quien: "La pandemia de COVID-19 (2020) acelera el teletrabajo y la educación virtual. Entre 2022 y 2026 se generaliza la IA generativa en el trabajo del conocimiento.",
    relevancia: "El trabajo pasa de presencial a híbrido o remoto, la IA y la robótica automatizan tareas rutinarias y surgen roles interdisciplinarios: científicos de datos, especialistas en ciberseguridad, prompt engineers y éticos de IA.",
    contexto: "El smartphone masivo (2007) abrió el trabajo conectado en movilidad. Hinton, LeCun y Bengio, precursores del aprendizaje profundo, sostienen las herramientas actuales, junto con la computación en la nube, el IoT y blockchain."
  }
];

const lista = document.getElementById("linea");
eventos.forEach((e, i) => {
  const li = document.createElement("li");
  li.className = "evento";
  li.innerHTML = `
    <span class="punto"></span>
    <button class="tarjeta" type="button" aria-haspopup="dialog" data-i="${i}">
      <span class="fecha">${e.fecha}</span>
      <span class="era">${e.era}</span>
    </button>`;
  lista.appendChild(li);
});


const reducidoUI = matchMedia("(prefers-reduced-motion: reduce)").matches;
const DUR = reducidoUI ? 1 : 600;
const EASE = "cubic-bezier(.22,.8,.2,1)";

const velo = document.createElement("div");
velo.className = "velo";
const ficha = document.createElement("article");
ficha.className = "ficha";
ficha.setAttribute("role", "dialog");
ficha.setAttribute("aria-modal", "true");
ficha.tabIndex = -1;
document.body.append(velo, ficha);

let botonOrigen = null, ocupado = false;

function transformDesde(r, f) {
  const dx = r.left - f.left, dy = r.top - f.top;
  return `translate(${dx}px, ${dy}px) scale(${r.width / f.width}, ${r.height / f.height})`;
}

function abrir(boton) {
  if (ocupado || botonOrigen) return;
  const e = eventos[boton.dataset.i];
  botonOrigen = boton; ocupado = true;
  ficha.innerHTML = `
    <div class="contenido">
      <div class="fecha">${e.fecha}</div>
      <div class="era">${e.era}</div>
      <h3>${e.titulo}</h3>
      <p><strong>Quién y cómo:</strong> ${e.quien}</p>
      <p><strong>Relevancia:</strong> ${e.relevancia}</p>
      <p class="contexto">${e.contexto}</p>
    </div>`;
  ficha.setAttribute("aria-label", `${e.fecha}, ${e.era}`);
  const r = boton.getBoundingClientRect();
  velo.classList.add("visible");
  ficha.classList.add("visible");
  const f = ficha.getBoundingClientRect();
  boton.classList.add("oculta");

  const zoom = ficha.animate(
    [{ transform: transformDesde(r, f), opacity: 0.4 }, { transform: "none", opacity: 1 }],
    { duration: DUR, easing: EASE }
  );
  ficha.querySelector(".contenido").animate(
    [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }],
    { duration: DUR * 0.6, delay: DUR * 0.4, easing: "ease-out", fill: "backwards" }
  );
  zoom.finished.then(() => { ocupado = false; ficha.focus({ preventScroll: true }); });
}

function cerrar() {
  if (ocupado || !botonOrigen) return;
  ocupado = true;
  const boton = botonOrigen;
  const f = ficha.getBoundingClientRect();
  const r = boton.getBoundingClientRect();
  velo.classList.remove("visible");

  ficha.querySelector(".contenido").animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: DUR * 0.3, easing: "ease-in", fill: "forwards" }
  );
  const zoom = ficha.animate(
    [{ transform: "none", opacity: 1 }, { transform: transformDesde(r, f), opacity: 0.2 }],
    { duration: DUR * 0.8, delay: DUR * 0.1, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" }
  );
  zoom.finished.then(() => {
    ficha.classList.remove("visible");
    zoom.cancel();
    boton.classList.remove("oculta");
    boton.focus({ preventScroll: true });
    botonOrigen = null; ocupado = false;
  });
}

lista.addEventListener("click", ev => {
  const boton = ev.target.closest(".tarjeta");
  if (boton) abrir(boton);
});
velo.addEventListener("click", cerrar);
document.addEventListener("keydown", ev => { if (ev.key === "Escape") cerrar(); });


const obs = new IntersectionObserver(entradas => {
  entradas.forEach(en => en.target.classList.toggle("activo", en.isIntersecting));
}, { rootMargin: "-35% 0px -35% 0px" });
document.querySelectorAll(".evento").forEach(el => obs.observe(el));


const lienzo = document.getElementById("estrellas");
const ctx = lienzo.getContext("2d");
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
let estrellas = [], ancho, alto;

function crearEstrellas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  ancho = innerWidth; alto = innerHeight;
  lienzo.width = ancho * dpr; lienzo.height = alto * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const total = Math.min(260, Math.floor(ancho * alto / 6500));
  estrellas = Array.from({ length: total }, () => ({
    x: Math.random() * ancho,
    y: Math.random() * alto,
    r: Math.random() * 1.3 + 0.3,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    fase: Math.random() * Math.PI * 2,
    vel: Math.random() * 0.02 + 0.004
  }));
}

function dibujar() {
  ctx.clearRect(0, 0, ancho, alto);
  for (const s of estrellas) {
    if (!reducido) {
      s.fase += s.vel;
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = ancho; else if (s.x > ancho) s.x = 0;
      if (s.y < 0) s.y = alto; else if (s.y > alto) s.y = 0;
    }
    const brillo = 0.5 + 0.5 * Math.sin(s.fase);
    ctx.globalAlpha = 0.08 + 0.92 * brillo * brillo;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (!reducido) requestAnimationFrame(dibujar);
}

addEventListener("resize", () => { crearEstrellas(); if (reducido) dibujar(); });
crearEstrellas();
dibujar();

