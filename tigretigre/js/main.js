/* ============================================================
   TIGRETIGRE — Interacción
   Lee todo de window.TT (js/datos.js). Scroll siempre nativo.
   - Filas, grilla, shows, clips y formulario se arman desde los datos
   - Hero que rota (fundido, acercamiento lento, tinte del fondo, barritas)
   - Barra de arriba que toma fondo al bajar (nunca se esconde)
   - Búsqueda con etiquetas, ficha como hoja desde abajo, reproductor de clips
     con «Siguiente clip en 5», flechas de las filas en escritorio
   ============================================================ */
(function () {
  'use strict';

  var TT = window.TT;
  var doc = document;
  var raiz = doc.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  var porId = {};
  TT.comunicadores.forEach(function (c) { porId[c.id] = c; });
  var showPorId = {};
  TT.shows.forEach(function (s) { showPorId[s.id] = s; });
  var clipPorId = {};
  TT.clips.forEach(function (c) { clipPorId[c.id] = c; });

  /* ---------- Piezas de HTML ---------- */
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; });
  }
  function ico(id, clase) {
    return '<svg class="' + (clase || 'ico') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>';
  }
  function tigre(clase) {
    return '<svg class="tigre' + (clase ? ' ' + clase : '') + '" aria-hidden="true"><use href="#tigre"/></svg>';
  }
  function foto(src, alt, clase, carga) {
    return '<img class="foto-carga' + (clase ? ' ' + clase : '') + '" src="' + src + '" alt="' + esc(alt || '') + '"' +
      (carga === 'ya' ? '' : ' loading="lazy"') + ' decoding="async">';
  }
  function spans(lista) {
    return lista.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
  }
  function wa(mensaje) {
    return 'https://wa.me/' + (TT.whatsapp || '') + '?text=' + encodeURIComponent(mensaje);
  }
  function normal(t) {
    return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function lugarCorto(s) { return s.lugar.split(' Comedia')[0]; }

  function clipsDe(id) { return TT.clips.filter(function (c) { return c.de === id; }); }
  function listaClips(clave) {
    if (!clave || clave === 'todos') return TT.clips.slice();
    var p = clave.split(':');
    if (p[0] === 'de') return clipsDe(p[1]);
    if (p[0] === 'show') return TT.clips.filter(function (c) { return c.show === p[1]; });
    return TT.clips.slice();
  }
  function funcionesDe(id) {
    var out = [];
    TT.shows.forEach(function (s) {
      s.funciones.forEach(function (f) {
        f.elenco.forEach(function (e) { if (e[0] === id) out.push({ show: s, f: f, rol: e[1] }); });
      });
    });
    return out;
  }

  /* Las fotos aparecen con un fundido cuando llegan (antes, rectángulo oscuro) */
  function marcarFotos(c) {
    $$('img.foto-carga:not(.is-cargada)', c).forEach(function (img) {
      if (img.complete && img.naturalWidth) { img.classList.add('is-cargada'); return; }
      var listo = function () { img.classList.add('is-cargada'); };
      img.addEventListener('load', listo, { once: true });
      img.addEventListener('error', listo, { once: true });
    });
  }

  function posterHTML(c, insignia) {
    return '<li><button class="poster" type="button" data-ficha="' + c.id + '" aria-label="' + esc(c.nombre) + ': ver ficha">' +
      foto(c.foto, '') + tigre('poster__tigre') + (insignia ? '<span class="insignia">' + insignia + '</span>' : '') +
      '<span class="poster__nombre">' + esc(c.nombre) + '</span>' +
      '<span class="poster__extra"><span class="poster__iconos">' + ico('play', 'ico ico--lleno') + ico('plus') + '</span>' +
      '<span class="etiquetas">' + spans(c.etiquetas.slice(0, 3)) + '</span></span>' +
      '</button></li>';
  }
  function tarjetaClipHTML(cl, lista) {
    var c = porId[cl.de];
    return '<li><button class="tarjeta-clip' + (cl.arte ? ' tarjeta-clip--arte' : '') + '" type="button" data-clip="' + cl.id +
      '" data-lista="' + (lista || 'todos') + '" aria-label="Ver el clip ' + esc(cl.titulo) + ', de ' + esc(c.nombre) + '">' +
      foto(cl.imagen, '') + (cl.nuevo ? '<span class="insignia">Nuevo</span>' : '') +
      '<span class="tarjeta-clip__play">' + ico('play', 'ico ico--lleno') + '</span>' +
      '<span class="tarjeta-clip__texto"><span class="tarjeta-clip__titulo">' + esc(cl.titulo) + '</span>' +
      '<span class="tarjeta-clip__de">' + esc(c.nombre) + '</span></span></button></li>';
  }
  function tarjetaShowHTML(s) {
    return '<li><a class="tarjeta-show" href="shows.html#' + s.id + '">' + foto(s.imagen, '') +
      '<span class="tarjeta-show__texto"><span class="tarjeta-show__tipo">' + tigre() + 'Show</span>' +
      '<span class="tarjeta-show__titulo">' + esc(s.nombre) + '</span>' +
      '<span class="tarjeta-show__meta">' + esc(s.cuando + ' · ' + lugarCorto(s)) + '</span></span></a></li>';
  }

  /* ---------- Fechas («Miércoles 7/10») ---------- */
  var MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  function fechaDe(f) {
    var m = /(\d+)\/(\d+)/.exec(f.fecha);
    return m ? new Date(2026, +m[2] - 1, +m[1]) : null;
  }
  function cuandoEs(fecha) {
    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    var dias = Math.round((fecha - hoy) / 86400000);
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Mañana';
    return 'Próxima función';
  }

  /* ============================================================
     Armado de cada página
     ============================================================ */
  var render = {
    comunicadores: function (el) {
      el.innerHTML = TT.comunicadores.map(function (c) { return posterHTML(c); }).join('');
    },
    shows: function (el) {
      el.innerHTML = TT.shows.map(tarjetaShowHTML).join('');
    },
    clips: function (el) {
      el.innerHTML = TT.clips.map(function (c) { return tarjetaClipHTML(c, 'todos'); }).join('');
    },
    categorias: function (el) {
      /* Sin fotos: un mosaico de color por estilo, para no asociar a nadie con una etiqueta de muestra */
      el.innerHTML = TT.etiquetas.filter(function (t) { return t !== 'Conducción'; }).map(function (t, i) {
        return '<li><a class="categoria categoria--' + (i % 3) + '" href="comunicadores.html?etiqueta=' + encodeURIComponent(t) + '">' +
          tigre('categoria__tigre') + '<span>' + esc(t) + '</span></a></li>';
      }).join('');
    },
    proximas: function (el) {
      var items = [];
      TT.shows.forEach(function (s) {
        s.funciones.forEach(function (f) { if (f.proxima || f.hoy) items.push({ s: s, f: f, d: fechaDe(f) }); });
      });
      items.sort(function (a, b) { return a.d - b.d; });
      el.innerHTML = items.map(function (it) {
        var s = it.s, f = it.f, d = it.d;
        var gente = f.elenco.map(function (e) { return porId[e[0]]; });
        var meta = [f.ep, f.fecha, s.hora, s.precio].filter(Boolean).join(' · ');
        return '<article class="proxima">' +
          '<div class="proxima__fecha" aria-hidden="true"><span class="proxima__mes">' + MESES[d.getMonth()] + '</span>' +
          '<span class="proxima__dia">' + d.getDate() + '</span></div>' +
          '<div><a class="proxima__imagen" href="shows.html#' + s.id + '">' + foto(f.imagen || s.imagen, '') +
          '<span class="proxima__cuando">' + cuandoEs(d) + '</span></a>' +
          '<h3 class="proxima__titulo">' + esc(s.nombre) + '</h3>' +
          '<p class="proxima__meta">' + esc(meta) + '</p>' +
          '<div class="elenco-mini"><span class="elenco-mini__fotos">' +
          gente.map(function (c) { return '<img src="' + c.foto + '" alt="" loading="lazy">'; }).join('') + '</span>' +
          '<span class="elenco-mini__nombres">' + gente.map(function (c) { return '<span>' + esc(c.nombre) + '</span>'; }).join(' · ') + '</span></div>' +
          '<div class="proxima__botones"><a class="boton boton--naranja boton--chico" href="' + wa(s.accion.mensaje) +
          '" target="_blank" rel="noopener">' + esc(s.accion.texto) + '</a>' +
          '<a class="boton boton--gris boton--chico" href="shows.html#' + s.id + '">Ver show</a></div></div></article>';
      }).join('');
    },
    elenco: function (el) {
      var s = showPorId[el.getAttribute('data-show')];
      el.innerHTML = s.elenco.map(function (e) {
        var c = porId[e.id];
        var nuevo = TT.clips.some(function (cl) { return cl.de === c.id && cl.nuevo; });
        return posterHTML(c, nuevo ? 'Nuevo<br>clip' : '');
      }).join('');
    },
    grilla: function (el) {
      el.innerHTML = TT.comunicadores.map(function (c) { return posterHTML(c); }).join('');
    },
    filtro: function (el) {
      el.innerHTML = '<button class="capsula" type="button" data-filtrar="" aria-pressed="true">Todos</button>' +
        TT.etiquetas.map(function (t) {
          return '<button class="capsula" type="button" data-filtrar="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>';
        }).join('');
    },
    'shows-detalle': function (el) {
      el.innerHTML = TT.shows.map(showHTML).join('');
    },
    reels: function (el) {
      el.innerHTML = TT.clips.map(function (cl, i) {
        var c = porId[cl.de], s = showPorId[cl.show];
        return '<article class="reel' + (cl.arte ? ' reel--arte' : '') + '" id="clip-' + cl.id + '">' +
          '<img class="reel__fondo" src="' + cl.imagen + '" alt=""' + (i > 1 ? ' loading="lazy"' : '') + ' aria-hidden="true">' +
          foto(cl.imagen, c.nombre, 'reel__foto', i > 1 ? '' : 'ya') +
          '<button class="reel__play" type="button" data-clip="' + cl.id + '" data-lista="todos" aria-label="Ver el clip ' + esc(cl.titulo) + '">' +
          ico('play', 'ico ico--lleno') + '</button>' +
          '<div class="reel__info"><p class="reel__show">' + esc(s.nombre + ' · ' + cl.ep) + '</p>' +
          '<h2 class="reel__titulo">' + esc(cl.titulo) + '</h2>' +
          '<button class="reel__de" type="button" data-ficha="' + c.id + '"><img src="' + c.foto + '" alt="" loading="lazy">' + esc(c.nombre) + '</button></div>' +
          '<div class="reel__acciones">' +
          '<a class="reel__accion" href="contratar.html?c=' + c.id + '">' + ico('message-circle') + 'Contratar</a>' +
          '<button class="reel__accion" type="button" data-compartir="' + cl.id + '">' + ico('share-2') + 'Compartir</button>' +
          '<button class="reel__accion" type="button" data-ficha="' + c.id + '">' + ico('info') + 'Ficha</button>' +
          '</div></article>';
      }).join('');
    }
  };

  function showHTML(s) {
    var clips = listaClips('show:' + s.id);
    var meta = (s.precio ? '<span class="show__destacado">' + esc(s.precio) + '</span>' : '') +
      '<span>2026</span>' + (s.temporada ? '<span class="show__sello">' + esc(s.temporada) + '</span>' : '') +
      '<span>' + esc(s.cuando) + '</span>';
    var personajes = s.elenco.map(function (e) {
      var c = porId[e.id];
      return '<li><button class="personaje" type="button" data-ficha="' + c.id + '">' + foto(c.foto, '') +
        '<span class="personaje__nombre">' + esc(c.nombre) + '</span>' +
        (e.rol ? '<span class="personaje__rol">' + esc(e.rol) + '</span>' : '') + '</button></li>';
    }).join('');
    var funciones = '<ul class="lista-funciones">' + s.funciones.map(function (f) {
      var marca = f.hoy ? 'Hoy' : (f.proxima ? 'Próxima' : '');
      return '<li class="funcion' + (marca ? ' funcion--proxima' : '') + '">' +
        '<span class="funcion__ep">' + (f.ep ? esc(f.ep.replace('T4 ', '')) : '—') + '</span><div>' +
        '<p class="funcion__fecha">' + esc(f.fecha + (s.hora ? ' · ' + s.hora : '')) +
        (marca ? '<span class="funcion__marca">' + marca + '</span>' : '') + '</p>' +
        (f.titulo ? '<p class="funcion__titulo">' + esc(f.titulo) + '</p>' : '') +
        '<p class="funcion__elenco">' + f.elenco.map(function (e) {
          return esc(porId[e[0]].nombre) + (e[1] ? ' <em>(' + esc(e[1].toLowerCase()) + ')</em>' : '');
        }).join(' · ') + '</p></div></li>';
    }).join('') + '</ul>';
    var listaDeClips = '<span class="panel__temporada">' + esc(s.temporada || 'Clips') + '</span><ul class="lista-clips">' +
      clips.map(function (cl, i) {
        var c = porId[cl.de];
        return '<li><button class="fila-clip" type="button" data-clip="' + cl.id + '" data-lista="show:' + s.id + '">' +
          '<span class="fila-clip__imagen">' + foto(cl.imagen, '') + '<span class="fila-clip__play">' + ico('play', 'ico ico--lleno') + '</span></span>' +
          '<span><span class="fila-clip__titulo">' + (i + 1) + '. ' + esc(cl.titulo) + '</span>' +
          '<span class="fila-clip__sub">' + esc(c.nombre + ' · ' + cl.ep) + '</span></span></button></li>';
      }).join('') + '</ul>';
    var pestanas = clips.length
      ? '<div class="pestanas" role="tablist" aria-label="' + esc(s.nombre) + '">' +
        '<button class="pestana" type="button" role="tab" id="tab-clips-' + s.id + '" aria-controls="panel-clips-' + s.id + '" aria-selected="true">Clips</button>' +
        '<button class="pestana" type="button" role="tab" id="tab-funciones-' + s.id + '" aria-controls="panel-funciones-' + s.id + '" aria-selected="false" tabindex="-1">Funciones</button></div>' +
        '<div class="panel" role="tabpanel" id="panel-clips-' + s.id + '" aria-labelledby="tab-clips-' + s.id + '">' + listaDeClips + '</div>' +
        '<div class="panel" role="tabpanel" id="panel-funciones-' + s.id + '" aria-labelledby="tab-funciones-' + s.id + '" hidden>' + funciones + '</div>'
      : '<div class="pestanas"><span class="pestana" aria-selected="true">Funciones</span></div><div class="panel">' + funciones + '</div>';

    return '<article class="show" id="' + s.id + '" aria-labelledby="t-' + s.id + '">' +
      '<div class="show__portada">' + foto(s.imagen, s.nombre, '', 'ya') + '</div>' +
      '<div class="show__info"><p class="show__tipo">' + tigre() + 'Show en ' + esc(lugarCorto(s)) + '</p>' +
      '<h2 class="show__titulo" id="t-' + s.id + '">' + esc(s.nombre) + '</h2>' +
      '<p class="show__meta">' + meta + '</p>' +
      '<div class="show__botones"><a class="boton boton--naranja boton--ancho" href="' + wa(s.accion.mensaje) + '" target="_blank" rel="noopener">' +
      esc(s.accion.texto) + '</a>' +
      (clips.length ? '<button class="boton boton--gris boton--ancho" type="button" data-clips-show="' + s.id + '">' + ico('play', 'ico ico--lleno') + 'Ver clips</button>' : '') +
      '</div><p class="show__desc">' + esc(s.descripcion) + '</p>' +
      '<ul class="datos"><li>' + ico('map-pin') + '<span>' + esc(s.lugar) + '<br>' + esc(s.direccion) +
      ' · <a href="' + s.mapa + '" target="_blank" rel="noopener">Cómo llegar</a></span></li>' +
      '<li>' + ico('clock') + '<span>' + esc(s.llegada || s.formato) + '</span></li></ul></div>' +
      '<section class="personajes" aria-label="Personajes"><div class="fila__cabeza"><h3 class="fila__titulo">Personajes</h3></div>' +
      '<div class="fila__cuerpo"><div class="carril"><ul class="carril__lista">' + personajes + '</ul></div></div></section>' +
      (s.participantes ? '<section class="personajes" aria-label="Anotados"><div class="fila__cabeza"><h3 class="fila__titulo">Anotados este martes</h3></div>' +
        '<ul class="participantes">' + s.participantes.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></section>' : '') +
      pestanas + '</article>';
  }

  $$('[data-render]').forEach(function (el) {
    var f = render[el.getAttribute('data-render')];
    if (f) { f(el); marcarFotos(el); }
  });
  marcarFotos(doc);

  /* ============================================================
     Pausas compartidas (el hero se frena con cualquier capa abierta)
     ============================================================ */
  var capas = [];
  function bloquear(nombre) {
    if (capas.indexOf(nombre) === -1) capas.push(nombre);
    raiz.classList.add('bloqueado');
    if (hero) hero.pausar(nombre);
  }
  function liberar(nombre) {
    capas = capas.filter(function (c) { return c !== nombre; });
    if (!capas.length) raiz.classList.remove('bloqueado');
    if (hero) hero.reanudar(nombre);
  }

  /* ============================================================
     Hero que rota
     ============================================================ */
  var hero = (function () {
    var cont = $('[data-hero]');
    if (!cont) return null;
    var seccion = cont.closest('.hero');
    var puntos = $('[data-hero-puntos]');
    var inicio = cont.getAttribute('data-hero') === 'inicio';
    var gente = (inicio ? TT.heroInicio : TT.heroComunicadores).map(function (id) { return porId[id]; });
    var DUR = 7000;

    cont.innerHTML = gente.map(function (c, i) {
      var tieneClips = clipsDe(c.id).length > 0;
      return '<article class="slide' + (i === 0 ? ' is-activa' : '') + '" aria-roledescription="diapositiva" aria-label="' + (i + 1) + ' de ' + gente.length + ': ' + esc(c.nombre) + '"' + (i ? ' aria-hidden="true"' : '') + '>' +
        '<img class="slide__foto" src="' + ((inicio && c.fotoMural) || c.foto) + '" alt="' + esc(c.nombre) + '" decoding="async"' + (i ? '' : ' fetchpriority="high"') + '>' +
        '<div class="slide__texto"><p class="slide__tipo">' + tigre() + 'Comunicador</p>' +
        '<h2 class="slide__nombre">' + esc(c.nombre) + '</h2>' +
        '<p class="slide__desc">' + esc(c.descripcion) + '</p>' +
        '<p class="etiquetas">' + spans(c.etiquetas.slice(0, 3)) + '</p>' +
        '<div class="slide__botones">' +
        (tieneClips ? '<button class="boton boton--claro" type="button" data-clip-de="' + c.id + '">' + ico('play', 'ico ico--lleno') + 'Ver clips</button>'
                    : '<button class="boton boton--claro" type="button" data-ficha="' + c.id + '">' + ico('info') + 'Ficha</button>') +
        '<a class="boton boton--naranja" href="contratar.html?c=' + c.id + '">Contratar</a></div></div></article>';
    }).join('');
    puntos.innerHTML = gente.map(function (c, i) {
      return '<button class="punto' + (i === 0 ? ' is-activa' : '') + '" type="button" aria-label="Ver a ' + esc(c.nombre) + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>';
    }).join('');
    raiz.style.setProperty('--duracion-slide', DUR + 'ms');

    var slides = $$('.slide', cont), botones = $$('.punto', puntos);
    var actual = 0, timer = null, inicio = 0, resta = DUR, motivos = {};
    var meta = $('meta[name="theme-color"]');

    function tinte() {
      var c = gente[actual];
      raiz.style.setProperty('--tinte', c.tinte);
      if (meta && window.scrollY < 80) meta.setAttribute('content', c.tinte);
    }
    function mostrar(i) {
      actual = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle('is-activa', k === actual);
        if (k === actual) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
      });
      botones.forEach(function (b, k) {
        b.classList.remove('is-activa');
        b.classList.toggle('is-vista', k < actual);
        b.removeAttribute('aria-current');
      });
      void puntos.offsetWidth;   // reinicia la animación de la barrita
      botones[actual].classList.add('is-activa');
      botones[actual].setAttribute('aria-current', 'true');
      tinte();
      resta = DUR;
      programar();
    }
    function programar() {
      clearTimeout(timer);
      if (reducido || Object.keys(motivos).length) return;
      inicio = Date.now();
      timer = setTimeout(function () { mostrar(actual + 1); }, resta);
    }
    function pausar(m) {
      if (!Object.keys(motivos).length && timer) { clearTimeout(timer); resta = Math.max(400, resta - (Date.now() - inicio)); }
      motivos[m] = true;
      seccion.classList.add('hero--pausa');
    }
    function reanudar(m) {
      delete motivos[m];
      if (!Object.keys(motivos).length) { seccion.classList.remove('hero--pausa'); programar(); }
    }

    puntos.addEventListener('click', function (e) {
      var b = e.target.closest('.punto');
      if (b) mostrar(botones.indexOf(b));
    });

    /* Con el dedo: deslizar para pasar */
    var x0 = null, y0 = null;
    cont.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    cont.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) mostrar(actual + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });

    /* Se frena fuera de pantalla, con la pestaña oculta o con el mouse o el foco encima */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) reanudar('fuera'); else pausar('fuera');
      }, { threshold: 0.3 }).observe(cont);
    }
    doc.addEventListener('visibilitychange', function () { if (doc.hidden) pausar('oculta'); else reanudar('oculta'); });
    if (window.matchMedia('(hover: hover)').matches) {
      cont.addEventListener('mouseenter', function () { pausar('mouse'); });
      cont.addEventListener('mouseleave', function () { reanudar('mouse'); });
    }
    /* Solo el foco del teclado lo frena: al volver de un clip, el foco vuelve al botón y no debe dejarlo quieto */
    cont.addEventListener('focusin', function (e) { if (e.target.matches(':focus-visible')) pausar('foco'); });
    cont.addEventListener('focusout', function () { reanudar('foco'); });

    /* Si está la entrada, el primero aparece cuando termina */
    if (raiz.classList.contains('con-intro')) {
      seccion.classList.add('hero--espera');
      pausar('intro');
      setTimeout(arrancarDespuesDeIntro, 1750);
    }
    function arrancarDespuesDeIntro() {
      if (!motivos.intro) return;
      seccion.classList.remove('hero--espera');
      reanudar('intro');
      mostrar(0);
    }
    tinte();
    programar();
    return { pausar: pausar, reanudar: reanudar, saltarIntro: arrancarDespuesDeIntro };
  })();

  /* ============================================================
     Entrada: un toque la saltea
     ============================================================ */
  var intro = $('.intro');
  if (intro && raiz.classList.contains('con-intro')) {
    intro.addEventListener('click', function () {
      raiz.classList.add('intro-saltada');
      if (hero) hero.saltarIntro();
    });
  }

  /* ============================================================
     Barra de arriba: toma fondo al bajar (nunca se esconde)
     ============================================================ */
  var nav = $('[data-nav]');
  var metaColor = $('meta[name="theme-color"]');
  var pendiente = false;
  function alBajar() {
    pendiente = false;
    var y = window.scrollY;
    if (nav) nav.classList.toggle('nav--solido', y > 8);
    if (metaColor && hero) metaColor.setAttribute('content', y < 80 ? getComputedStyle(raiz).getPropertyValue('--tinte').trim() || '#000000' : '#000000');
  }
  window.addEventListener('scroll', function () {
    if (!pendiente) { pendiente = true; requestAnimationFrame(alBajar); }
  }, { passive: true });
  alBajar();

  /* ============================================================
     Flechas de las filas (solo se ven en escritorio)
     ============================================================ */
  function ponerFlechas(c) {
    $$('.fila__cuerpo', c).forEach(function (cuerpo) {
      var carril = $('.carril', cuerpo);
      if (!carril || $('.fila__flecha', cuerpo)) return;
      cuerpo.insertAdjacentHTML('beforeend',
        '<button class="fila__flecha fila__flecha--izq" type="button" data-mover="-1" aria-label="Anteriores">' + ico('chevron-left') + '</button>' +
        '<button class="fila__flecha fila__flecha--der" type="button" data-mover="1" aria-label="Siguientes">' + ico('chevron-right') + '</button>');
      var estado = function () {
        cuerpo.classList.toggle('en-inicio', carril.scrollLeft < 8);
        cuerpo.classList.toggle('en-final', carril.scrollLeft + carril.clientWidth > carril.scrollWidth - 8);
      };
      carril.addEventListener('scroll', estado, { passive: true });
      window.addEventListener('resize', estado);
      estado();
    });
  }
  ponerFlechas(doc);

  /* ============================================================
     Búsqueda con etiquetas
     ============================================================ */
  var busqueda = $('[data-busqueda]');
  var bEntrada = busqueda && $('[data-busqueda-input]', busqueda);
  var bEtiquetas = busqueda && $('[data-busqueda-etiquetas]', busqueda);
  var bResultados = busqueda && $('[data-busqueda-resultados]', busqueda);
  var bTitulo = busqueda && $('[data-busqueda-titulo]', busqueda);
  var bEtiqueta = '';
  var bVuelta = null;

  if (busqueda) {
    bEtiquetas.innerHTML = TT.etiquetas.map(function (t) {
      return '<button class="capsula" type="button" data-etiqueta="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>';
    }).join('');
    bEntrada.addEventListener('input', buscar);
    bEtiquetas.addEventListener('click', function (e) {
      var b = e.target.closest('[data-etiqueta]');
      if (!b) return;
      var t = b.getAttribute('data-etiqueta');
      bEtiqueta = bEtiqueta === t ? '' : t;
      buscar();
    });
  }
  function buscar() {
    var q = normal(bEntrada.value.trim());
    $$('[data-etiqueta]', bEtiquetas).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-etiqueta') === bEtiqueta));
    });
    var gente = TT.comunicadores.filter(function (c) {
      var texto = normal(c.nombre + ' ' + c.etiquetas.join(' '));
      return (!q || texto.indexOf(q) > -1) && (!bEtiqueta || c.etiquetas.indexOf(bEtiqueta) > -1);
    });
    var shows = bEtiqueta ? [] : TT.shows.filter(function (s) { return q && normal(s.nombre + ' ' + s.lugar).indexOf(q) > -1; });
    bTitulo.textContent = bEtiqueta ? bEtiqueta : (q ? 'Resultados' : 'Todos los comunicadores');
    if (!gente.length && !shows.length) {
      bResultados.innerHTML = '<li class="grilla__vacio">No encontramos nada con «' + esc(bEntrada.value.trim()) + '».</li>';
      return;
    }
    bResultados.innerHTML = gente.map(function (c) {
      return '<li><button class="resultado" type="button" data-ficha="' + c.id + '">' + foto(c.foto, '', '', 'ya') +
        '<span><span class="resultado__nombre">' + esc(c.nombre) + '</span><span class="resultado__sub">' +
        esc(c.etiquetas.slice(0, 3).join(' · ')) + '</span></span>' + ico('chevron-right') + '</button></li>';
    }).join('') + shows.map(function (s) {
      return '<li><a class="resultado resultado--show" href="shows.html#' + s.id + '">' + foto(s.imagen, '', '', 'ya') +
        '<span><span class="resultado__nombre">' + esc(s.nombre) + '</span><span class="resultado__sub">' +
        esc('Show · ' + s.cuando) + '</span></span>' + ico('chevron-right') + '</a></li>';
    }).join('');
    marcarFotos(bResultados);
  }
  function abrirBusqueda(desde, conEtiquetas) {
    if (!busqueda) return;
    bVuelta = desde || doc.activeElement;
    busqueda.hidden = false;
    bloquear('busqueda');
    buscar();
    if (conEtiquetas) { var p = $('[data-etiqueta]', bEtiquetas); if (p) p.focus(); }
    else bEntrada.focus();
  }
  function cerrarBusqueda() {
    if (!busqueda || busqueda.hidden) return;
    busqueda.hidden = true;
    liberar('busqueda');
    if (bVuelta && bVuelta.focus) bVuelta.focus();
  }

  /* ============================================================
     Ficha del comunicador (hoja desde abajo; en escritorio, ventana)
     ============================================================ */
  var ficha = $('[data-ficha-capa]');
  var fContenido = ficha && $('[data-ficha-contenido]', ficha);
  var fVuelta = null, fTimer = null;

  function abrirFicha(id, desde) {
    var c = porId[id];
    if (!ficha || !c) return;
    clearTimeout(fTimer);
    fVuelta = desde || doc.activeElement;
    var clips = clipsDe(id);
    var fs = funcionesDe(id);
    fContenido.innerHTML =
      '<span class="ficha__asa" aria-hidden="true"></span>' +
      '<div class="ficha__cabeza"><div class="ficha__poster">' + foto(c.foto, c.nombre, '', 'ya') + tigre() + '</div>' +
      '<div><p class="ficha__tipo">' + tigre() + 'Comunicador</p>' +
      '<h2 class="ficha__nombre" id="ficha-titulo">' + esc(c.nombre) + '</h2>' +
      '<p class="etiquetas">' + spans(c.etiquetas) + '</p></div></div>' +
      '<div class="ficha__botones">' +
      (clips.length ? '<button class="boton boton--claro" type="button" data-clip-de="' + id + '">' + ico('play', 'ico ico--lleno') + 'Ver clips</button>' : '') +
      '<a class="boton boton--naranja' + (clips.length ? '' : ' ficha__solo') + '" href="contratar.html?c=' + id + '">Contratar</a></div>' +
      '<p class="ficha__desc">' + esc(c.descripcion) + '</p>' +
      (fs.length ? '<h3 class="ficha__seccion">Funciones</h3><ul class="ficha__funciones">' + fs.map(function (x) {
        return '<li><span>' + esc(x.show.nombre + (x.f.ep ? ' · ' + x.f.ep : '')) + '</span><span>' +
          esc(x.f.fecha + (x.rol ? ' · ' + x.rol : '')) + '</span></li>';
      }).join('') + '</ul>' : '') +
      (clips.length ? '<h3 class="ficha__seccion">Clips</h3><div class="fila__cuerpo"><div class="carril"><ul class="carril__lista">' +
        clips.map(function (cl) { return tarjetaClipHTML(cl, 'de:' + id); }).join('') + '</ul></div></div>' : '');
    marcarFotos(fContenido);
    ponerFlechas(fContenido);
    ficha.hidden = false;
    $('.ficha__hoja', ficha).scrollTop = 0;
    void ficha.offsetWidth;
    ficha.classList.add('is-abierta');
    bloquear('ficha');
    $('.ficha__cerrar', ficha).focus({ preventScroll: true });
  }
  function cerrarFicha() {
    if (!ficha || ficha.hidden) return;
    ficha.classList.remove('is-abierta');
    fTimer = setTimeout(function () { ficha.hidden = true; }, reducido ? 0 : 420);
    liberar('ficha');
    if (fVuelta && fVuelta.focus && doc.contains(fVuelta)) fVuelta.focus({ preventScroll: true });
  }

  /* Deslizar la hoja hacia abajo la cierra */
  if (ficha) {
    var hoja = $('.ficha__hoja', ficha), yIni = null;
    hoja.addEventListener('touchstart', function (e) { yIni = hoja.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
    hoja.addEventListener('touchend', function (e) {
      if (yIni !== null && e.changedTouches[0].clientY - yIni > 90) cerrarFicha();
      yIni = null;
    }, { passive: true });
  }

  /* ============================================================
     Reproductor de clips, con «Siguiente clip en 5»
     ============================================================ */
  var player = $('[data-player]');
  var pVideo = player && $('video', player);
  var pLista = [], pI = 0, pVuelta = null, pCuenta = null, pRaf = null;
  var pSig = player && $('[data-siguiente]', player);

  function abrirPlayer(lista, i, desde) {
    if (!player || !lista.length) return;
    pVuelta = desde || doc.activeElement;
    player.hidden = false;
    bloquear('player');
    reproducir(lista, i);
    $('.player__cerrar', player).focus({ preventScroll: true });
  }
  function reproducir(lista, i) {
    pLista = lista; pI = i;
    cancelarSiguiente();
    var cl = lista[i], c = porId[cl.de], s = showPorId[cl.show];
    $('[data-player-titulo]', player).textContent = cl.titulo;
    $('[data-player-sub]', player).textContent = c.nombre + ' · ' + s.nombre + ' · ' + cl.ep;
    pVideo.poster = cl.imagen;
    pVideo.src = pVideo.canPlayType('video/mp4; codecs="avc1.42E01E"') ? TT.videoMuestra : TT.videoMuestraWebm;
    pVideo.currentTime = 0;
    var p = pVideo.play();
    if (p && p.catch) p.catch(function () {});
    avanzar();
  }
  function avanzar() {
    cancelAnimationFrame(pRaf);
    var barra = $('[data-player-progreso]', player);
    (function paso() {
      var d = pVideo.duration || 1;
      barra.style.transform = 'scaleX(' + Math.min(1, pVideo.currentTime / d) + ')';
      if (!player.hidden) pRaf = requestAnimationFrame(paso);
    })();
  }
  function mostrarSiguiente() {
    var sig = pLista[pI + 1];
    if (!sig) return;
    var c = porId[sig.de];
    $('[data-siguiente-imagen]', pSig).innerHTML = '<img src="' + sig.imagen + '" alt="">';
    $('[data-siguiente-titulo]', pSig).textContent = sig.titulo;
    $('[data-siguiente-de]', pSig).textContent = c.nombre;
    var num = $('[data-siguiente-num]', pSig);
    var n = 5;
    num.textContent = n;
    pSig.hidden = false;
    pSig.classList.remove('is-contando'); void pSig.offsetWidth; pSig.classList.add('is-contando');
    pCuenta = setInterval(function () {
      n -= 1;
      if (n <= 0) { reproducir(pLista, pI + 1); return; }
      num.textContent = n;
    }, 1000);
  }
  function cancelarSiguiente() {
    clearInterval(pCuenta);
    if (pSig) { pSig.hidden = true; pSig.classList.remove('is-contando'); }
  }
  function cerrarPlayer() {
    if (!player || player.hidden) return;
    cancelarSiguiente();
    cancelAnimationFrame(pRaf);
    pVideo.pause();
    pVideo.removeAttribute('src'); pVideo.load();
    player.hidden = true;
    liberar('player');
    if (pVuelta && pVuelta.focus && doc.contains(pVuelta)) pVuelta.focus({ preventScroll: true });
  }
  if (player) {
    pVideo.addEventListener('ended', mostrarSiguiente);
    $('[data-player-toque]', player).addEventListener('click', function () {
      var aviso = $('[data-player-aviso]', player);
      if (pVideo.paused) { pVideo.play(); aviso.innerHTML = ico('play', 'ico ico--lleno'); }
      else { pVideo.pause(); aviso.innerHTML = ico('pause', 'ico ico--lleno'); }
      aviso.classList.remove('is-visible'); void aviso.offsetWidth; aviso.classList.add('is-visible');
    });
  }

  /* ============================================================
     Pestañas de los shows (Clips · Funciones)
     ============================================================ */
  doc.addEventListener('click', function (e) {
    var tab = e.target.closest('.pestana[role="tab"]');
    if (!tab) return;
    var grupo = tab.parentNode;
    $$('[role="tab"]', grupo).forEach(function (t) {
      var si = t === tab;
      t.setAttribute('aria-selected', String(si));
      t.tabIndex = si ? 0 : -1;
      doc.getElementById(t.getAttribute('aria-controls')).hidden = !si;
    });
  });

  /* ============================================================
     Comunicadores: filtro por etiqueta (?etiqueta=…) y ficha (?c=…)
     ============================================================ */
  var filtro = $('[data-render="filtro"]');
  var grilla = $('[data-render="grilla"]');
  function filtrar(t) {
    $$('[data-filtrar]', filtro).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filtrar') === t)); });
    var n = 0;
    $$('.poster', grilla).forEach(function (p) {
      var c = porId[p.getAttribute('data-ficha')];
      var si = !t || c.etiquetas.indexOf(t) > -1;
      p.parentNode.hidden = !si;
      if (si) n++;
    });
    var url = new URL(location.href);
    if (t) url.searchParams.set('etiqueta', t); else url.searchParams.delete('etiqueta');
    history.replaceState(null, '', url);
    var vacio = $('[data-vacio]');
    if (vacio) vacio.hidden = n > 0;
  }
  if (filtro && grilla) {
    filtro.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filtrar]');
      if (b) filtrar(b.getAttribute('data-filtrar'));
    });
    var params = new URLSearchParams(location.search);
    var et = params.get('etiqueta');
    if (et && TT.etiquetas.indexOf(et) > -1) {
      filtrar(et);
      var elenco = doc.getElementById('elenco');
      if (elenco) elenco.scrollIntoView();
      var activa = $('[data-filtrar="' + et + '"]', filtro);
      if (activa) activa.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    if (params.get('c') && porId[params.get('c')]) abrirFicha(params.get('c'));
  }

  /* Shows: el contenido se arma con JS, así que el ancla se busca después */
  if (location.hash && $('[data-render="shows-detalle"]')) {
    var destino = doc.getElementById(location.hash.slice(1));
    if (destino) setTimeout(function () { destino.scrollIntoView(); }, 0);
  }

  /* ============================================================
     Contratar: formulario corto que termina en WhatsApp
     ============================================================ */
  var form = $('[data-contratar]');
  if (form) {
    $('[data-opciones="eventos"]', form).innerHTML = TT.eventos.map(function (t, i) {
      return '<label class="opcion"><input type="radio" name="evento" value="' + esc(t) + '"' + (i === 0 ? ' required' : '') + '><span>' + esc(t) + '</span></label>';
    }).join('');
    $('[data-opciones="personas"]', form).innerHTML = TT.personas.map(function (t) {
      return '<label class="opcion"><input type="radio" name="personas" value="' + esc(t) + '"><span>' + esc(t) + '</span></label>';
    }).join('');
    $('[data-opciones="perfiles"]', form).innerHTML = TT.comunicadores.map(function (c) {
      return '<label class="perfil"><input type="radio" name="comunicador" value="' + c.id + '"><span><span class="perfil__foto">' +
        foto(c.foto, '') + '</span>' + esc(c.nombre) + '</span></label>';
    }).join('') + '<label class="perfil"><input type="radio" name="comunicador" value=""><span><span class="perfil__foto">' + tigre() +
      '</span>Que me recomienden</span></label>';
    marcarFotos(form);

    var hoyISO = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $('input[name="fecha"]', form).min = hoyISO;

    var q = new URLSearchParams(location.search);
    var pre = q.get('c');
    if (pre && porId[pre]) {
      var r = $('input[name="comunicador"][value="' + pre + '"]', form);
      if (r) { r.checked = true; r.closest('.perfil').scrollIntoView({ block: 'nearest' }); }
    }
    var ev = q.get('e');
    if (ev) { var re = $('input[name="evento"][value="' + ev + '"]', form); if (re) re.checked = true; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var error = $('[data-error]', form);
      if (!d.get('evento')) {
        error.hidden = false;
        $('input[name="evento"]', form).focus();
        return;
      }
      error.hidden = true;
      var c = porId[d.get('comunicador')];
      var fecha = d.get('fecha') ? d.get('fecha').split('-').reverse().join('/') : 'a definir';
      var nombre = String(d.get('nombre') || '').trim();
      var msj = 'Hola TigreTigre! Quiero contratar un show.\n\n' +
        '• Evento: ' + d.get('evento') + '\n' +
        '• Comunicador: ' + (c ? c.nombre : 'que me recomienden') + '\n' +
        '• Fecha: ' + fecha + '\n' +
        '• Personas: ' + (d.get('personas') || 'a definir') + '\n' +
        '• Lugar: ' + (String(d.get('lugar') || '').trim() || 'a definir') +
        (nombre ? '\n\nSoy ' + nombre + '.' : '');
      window.open(wa(msj), '_blank', 'noopener');
    });
    form.addEventListener('change', function () { $('[data-error]', form).hidden = true; });
  }

  /* ============================================================
     Clics de toda la web
     ============================================================ */
  doc.addEventListener('click', function (e) {
    var t = e.target.closest('[data-ficha],[data-clip],[data-clip-de],[data-clips-show],[data-abrir-busqueda],[data-cerrar-busqueda],[data-cerrar-ficha],[data-cerrar-player],[data-mover],[data-compartir],[data-siguiente-ya],[data-siguiente-no]');
    if (!t) return;
    if (t.hasAttribute('data-ficha')) {
      abrirFicha(t.getAttribute('data-ficha'), t);
    } else if (t.hasAttribute('data-clip')) {
      var lista = listaClips(t.getAttribute('data-lista'));
      var i = lista.map(function (c) { return c.id; }).indexOf(t.getAttribute('data-clip'));
      abrirPlayer(lista, Math.max(0, i), t);
    } else if (t.hasAttribute('data-clip-de')) {
      abrirPlayer(listaClips('de:' + t.getAttribute('data-clip-de')), 0, t);
    } else if (t.hasAttribute('data-clips-show')) {
      abrirPlayer(listaClips('show:' + t.getAttribute('data-clips-show')), 0, t);
    } else if (t.hasAttribute('data-abrir-busqueda')) {
      abrirBusqueda(t, t.hasAttribute('data-con-etiquetas'));
    } else if (t.hasAttribute('data-cerrar-busqueda')) {
      cerrarBusqueda();
    } else if (t.hasAttribute('data-cerrar-ficha')) {
      cerrarFicha();
    } else if (t.hasAttribute('data-cerrar-player')) {
      cerrarPlayer();
    } else if (t.hasAttribute('data-siguiente-ya')) {
      reproducir(pLista, pI + 1);
    } else if (t.hasAttribute('data-siguiente-no')) {
      cancelarSiguiente();
    } else if (t.hasAttribute('data-mover')) {
      var carril = $('.carril', t.closest('.fila__cuerpo'));
      carril.scrollBy({ left: +t.getAttribute('data-mover') * carril.clientWidth * 0.86, behavior: reducido ? 'auto' : 'smooth' });
    } else if (t.hasAttribute('data-compartir')) {
      var cl = clipPorId[t.getAttribute('data-compartir')];
      var url = location.href.split('#')[0] + '#clip-' + cl.id;
      var texto = cl.titulo + ', de ' + porId[cl.de].nombre + ' (TigreTigre)';
      if (navigator.share) navigator.share({ title: texto, url: url }).catch(function () {});
      else window.open('https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url), '_blank', 'noopener');
    }
  });

  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (player && !player.hidden) cerrarPlayer();
    else if (ficha && !ficha.hidden) cerrarFicha();
    else if (busqueda && !busqueda.hidden) cerrarBusqueda();
  });
})();
