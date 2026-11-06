
const eventos = [
  {
    fecha: "3000 a.C.", era: "Edad Antigua",
    titulo: "Nace la figura del escriba",
    quien: "Surge en Mesopotamia y Egipto a raíz de la invención de la escritura cuneiforme y jeroglífica.",
    relevancia: "Es la primera profesión administrativa formal: encargada de la contabilidad, los impuestos y los registros del Estado.",
    contexto: "Imhotep (c. 2650 a.C.) fue arquitecto y médico; Hipócrates (c. 460 a.C.) formalizó la ética médica. El trabajo pasa de la división natural a funciones especializadas."
  },
  {
    fecha: "1088", era: "Edad Media y Renacimiento",
    titulo: "Se funda la Universidad de Bolonia",
    quien: "Impulsada por juristas y estudiantes en Italia.",
    relevancia: "Nace la educación superior profesional y los títulos oficiales para ejercer derecho y medicina.",
    contexto: "Los gremios organizan el aprendizaje en aprendiz, oficial y maestro. Gutenberg (c. 1440) populariza los manuales técnicos con la imprenta."
  },
  {
    fecha: "1769", era: "Revolución Industrial",
    titulo: "James Watt patenta la máquina de vapor",
    quien: "El ingeniero escocés perfeccionó el diseño de Newcomen con un condensador separado.",
    relevancia: "Marca el nacimiento de las ingenierías industriales y el paso de la fuerza humana a los procesos mecanizados.",
    contexto: "En 1810 Humboldt funda la Universidad de Berlín y une investigación y enseñanza. Surgen las ingenierías mecánica, civil y de minas, y el trabajo asalariado en fábricas."
  },
  {
    fecha: "1911", era: "Siglo XX",
    titulo: "Frederick W. Taylor publica Los principios de la administración científica",
    quien: "Obra del ingeniero estadounidense Frederick W. Taylor.",
    relevancia: "Convierte los talleres en corporaciones estructuradas y da origen a carreras de gestión, logística y administración de personal.",
    contexto: "Henri Fayol sistematiza la administración de empresas en 1916. Aparecen los departamentos de Recursos Humanos y marketing."
  },
  {
    fecha: "1962", era: "Siglo XX",
    titulo: "Primer departamento de Ciencias de la Computación",
    quien: "La Universidad de Purdue (EE. UU.) lo establece como carrera académica.",
    relevancia: "Formaliza las profesiones informáticas y hace del software un campo profesional independiente.",
    contexto: "Antes llegaron el transistor (1947) y después el microprocesador Intel 4004 (1971) y la World Wide Web de Tim Berners-Lee (1989)."
  },
  {
    fecha: "2020 – 2022", era: "Siglo XXI",
    titulo: "Trabajo remoto global e inteligencia artificial generativa",
    quien: "Detonado por las restricciones sanitarias de 2020 y por el despegue masivo de la IA generativa desde 2022.",
    relevancia: "El puesto de trabajo deja de ser un lugar físico y se automatizan tareas cognitivas: las carreras se vuelven interdisciplinarias.",
    contexto: "Crecen los científicos de datos, los ingenieros de IA y los especialistas en ciberseguridad. El aprendizaje continuo se vuelve parte de la carrera."
  }
];

/* ---------- Construir la línea ---------- */
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

/* ---------- Ficha ampliada (zoom in / zoom out) ---------- */
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

/* Resalta el evento cercano al centro de la pantalla */
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(en => en.target.classList.toggle("activo", en.isIntersecting));
}, { rootMargin: "-35% 0px -35% 0px" });
document.querySelectorAll(".evento").forEach(el => obs.observe(el));

/* ---------- Cielo estrellado ---------- */
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
