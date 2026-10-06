/* ============================================================
   TIGRETIGRE — Datos del borrador
   Todo sale de los flyers de @tigretigreproducciones (refs/), salvo lo marcado MUESTRA.
   Las páginas leen solo de acá: para sumar un comunicador, un show o un clip,
   se agrega una entrada y aparece en el inicio, las filas, la búsqueda y las fichas.
   ============================================================ */

window.TT = {

  /* PENDIENTE: número de WhatsApp de la productora (Santi lo pasa después).
     Mientras esté vacío, los botones abren WhatsApp para elegir a quién mandar el mensaje. */
  whatsapp: '',
  instagram: 'https://www.instagram.com/tigretigreproducciones/',
  mail: 'tigretigreproducciones@gmail.com',

  /* Etiquetas de la lupa y de «¿Para qué evento?».
     MUESTRA: qué comunicador hace qué especialidad lo tiene que confirmar el cliente. */
  etiquetas: ['Stand up', 'Humor negro', 'Adultos mayores', 'Cumpleaños', 'Despedidas', 'Eventos privados', 'Conducción'],

  /* Comunicadores. Fotos recortadas de los flyers del cliente.
     «descripcion»: hechos de los flyers. «etiquetas»: «Stand up» y «Conducción» son reales;
     el resto es MUESTRA. «tinte»: el color de la foto, para el fondo del hero. */
  comunicadores: [
    { id: 'gabo9d', nombre: 'Gabo9d', foto: 'img/comunicadores/gabo9d.jpg', tinte: '#3a2418',
      etiquetas: ['Stand up', 'Conducción', 'Cumpleaños', 'Eventos privados'],
      descripcion: 'Presenta Stand Up Vieja Chela los miércoles y el Open Mic de los martes.' },
    { id: 'lucho-diaz', nombre: 'Lucho Díaz', foto: 'img/comunicadores/lucho-diaz.jpg', tinte: '#2f2220',
      etiquetas: ['Stand up', 'Humor negro', 'Despedidas'],
      descripcion: 'Abrió el episodio 6 y vuelve el miércoles 7/10 en el episodio 12.' },
    { id: 'augusto-dangelo', nombre: 'Augusto D’Angelo', foto: 'img/comunicadores/augusto-dangelo.jpg', tinte: '#3b2414',
      etiquetas: ['Stand up', 'Adultos mayores', 'Eventos privados'],
      descripcion: 'Cerró el episodio 5 y cierra el Open Mic del martes 6 de octubre.' },
    { id: 'willy', nombre: 'Willy', foto: 'img/comunicadores/willy.jpg', tinte: '#2c1f1c',
      etiquetas: ['Stand up', 'Despedidas', 'Eventos privados'],
      descripcion: 'Cerró el episodio 6 de Stand Up Vieja Chela, el miércoles 22 de julio.' },
    { id: 'mati-morales', nombre: 'Mati Morales', foto: 'img/comunicadores/mati-morales.jpg', tinte: '#30201b',
      etiquetas: ['Stand up', 'Cumpleaños', 'Eventos privados'],
      descripcion: 'Abrió el episodio 5 de Stand Up Vieja Chela, el miércoles 15 de julio.' },
    { id: 'andres-bazzano', nombre: 'Andrés Bazzano', foto: 'img/comunicadores/andres-bazzano.jpg', tinte: '#3a2614',
      etiquetas: ['Stand up', 'Humor negro', 'Cumpleaños'],
      descripcion: 'Estuvo en Stand Up Vieja Chela el miércoles 2 de septiembre.' },
    { id: 'maxi-montanari', nombre: 'Maxi Montanari', foto: 'img/comunicadores/maxi-montanari.jpg', tinte: '#3a2614',
      etiquetas: ['Stand up', 'Despedidas', 'Cumpleaños'],
      descripcion: 'Abrió la temporada 4 con «Soy indeciso». Vuelve el miércoles 7/10.' },
    { id: 'pablo-oyhenart', nombre: 'Pablo Oyhenart', foto: 'img/comunicadores/pablo-oyhenart.jpg', tinte: '#2f1d17',
      etiquetas: ['Stand up', 'Adultos mayores', 'Eventos privados'],
      descripcion: 'Fue parte del episodio 7, «La noche de la risa», el 5 de agosto.' },
    { id: 'ponetepillo', nombre: 'Ponetepillo', foto: 'img/comunicadores/ponetepillo.jpg', tinte: '#331d14',
      etiquetas: ['Stand up', 'Humor negro', 'Cumpleaños'],
      descripcion: 'Cerró el episodio 1 con «¿Se tomaron el G?» y volvió en el 7.' },
    { id: 'chivi', nombre: 'Chivi', foto: 'img/comunicadores/chivi.jpg', tinte: '#3a2414',
      etiquetas: ['Stand up', 'Despedidas', 'Adultos mayores'],
      descripcion: 'Estuvo en el episodio 11 de Stand Up Vieja Chela, el 30 de septiembre.' }
  ],

  /* Los que rotan en el hero del inicio, en este orden */
  hero: ['gabo9d', 'lucho-diaz', 'augusto-dangelo', 'willy', 'mati-morales', 'andres-bazzano'],

  /* Shows: cada uno es como una serie. «funciones» son los episodios. */
  shows: [
    {
      id: 'stand-up-vieja-chela',
      nombre: 'Stand Up Vieja Chela',
      tipo: 'Show',
      imagen: 'img/shows/stand-up-vieja-chela.jpg',
      lugar: 'Vieja Chela Comedia & Cerveza',
      logoLugar: 'img/shows/vieja-chela-logo.jpg',
      direccion: 'Alejo Rosell y Rius 1700, Montevideo',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Alejo+Rosell+y+Rius+1700+Montevideo',
      cuando: 'Miércoles 22 h',
      hora: '22 h',
      llegada: 'Se recomienda estar antes de las 21:30',
      precio: 'Entrada gratis',
      temporada: 'Temporada 4',
      descripcion: 'Noche de stand up, birra y risas aseguradas. Vení a pasarla bien, reírte fuerte y brindar con amigos.',
      accion: { texto: 'Reservá gratis', mensaje: 'Hola! Quiero reservar para Stand Up Vieja Chela del miércoles 7/10.' },
      elenco: [
        { id: 'gabo9d', rol: 'Presentador' }, { id: 'maxi-montanari' }, { id: 'lucho-diaz' },
        { id: 'pablo-oyhenart' }, { id: 'ponetepillo' }, { id: 'willy' }, { id: 'mati-morales' },
        { id: 'augusto-dangelo' }, { id: 'andres-bazzano' }, { id: 'chivi' }
      ],
      /* Los roles van solo donde el flyer los dice. PENDIENTE: el tercero del episodio 11
         («Diego Ma…», sale cortado en la captura) y los episodios 2, 3, 4, 8, 9 y 10. */
      funciones: [
        { ep: 'T4 E12', fecha: 'Miércoles 7/10', proxima: true, imagen: 'img/shows/t4e12.jpg', elenco: [['maxi-montanari'], ['gabo9d'], ['lucho-diaz']] },
        { ep: 'T4 E11', fecha: 'Miércoles 30/9', elenco: [['chivi'], ['gabo9d']] },
        { ep: '', fecha: 'Miércoles 2/9', elenco: [['andres-bazzano'], ['gabo9d'], ['augusto-dangelo']] },
        { ep: 'T4 E7', fecha: 'Miércoles 5/8', titulo: 'La noche de la risa', elenco: [['pablo-oyhenart'], ['gabo9d', 'Presenta'], ['ponetepillo']] },
        { ep: 'T4 E6', fecha: 'Miércoles 22/7', titulo: 'Vieja Chela en vivo', elenco: [['lucho-diaz', 'Apertura'], ['gabo9d', 'Presentador'], ['willy', 'Cierre']] },
        { ep: 'T4 E5', fecha: 'Miércoles 15/7', titulo: 'Vieja Chela en vivo', elenco: [['mati-morales', 'Apertura'], ['gabo9d', 'Presentador'], ['augusto-dangelo', 'Cierre']] },
        { ep: 'T4 E1', fecha: 'Miércoles 3/6', elenco: [['maxi-montanari', 'Abre'], ['gabo9d', 'Presentador'], ['ponetepillo', 'Cierre']] }
      ]
    },
    {
      id: 'open-mic',
      nombre: 'Open Mic',
      tipo: 'Show',
      imagen: 'img/shows/open-mic.jpg',   /* FOTO DE BANCO (Unsplash): micrófono, sin personas */
      lugar: 'Vieja Chela Comedia & Cerveza',
      logoLugar: 'img/shows/vieja-chela-logo.jpg',
      direccion: 'Alejo Rosell y Rius 1700, Montevideo',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Alejo+Rosell+y+Rius+1700+Montevideo',
      cuando: 'Martes 21:30',
      hora: '21:30',
      formato: '6 participantes · 5 minutos cada uno · 1 escenario',
      descripcion: 'Anotate, queremos verte. Seis comediantes, cinco minutos cada uno y un solo escenario.',
      accion: { texto: 'Anotate', mensaje: 'Hola! Quiero anotarme en el Open Mic de los martes en Vieja Chela.' },
      elenco: [{ id: 'gabo9d', rol: 'Presenta' }, { id: 'augusto-dangelo', rol: 'Cierra la noche' }],
      participantes: ['Soy Chelo', 'Panda', 'Sabri', 'Marcos Castillo', 'Gabo Machado', 'Daniel Moreno'],
      funciones: [
        { ep: '', fecha: 'Martes 6/10', hoy: true, elenco: [['gabo9d', 'Presenta'], ['augusto-dangelo', 'Cierra']] }
      ]
    }
  ],

  /* Clips: los chistes cortos que se van subiendo (en lugar de los episodios).
     Los tres de la temporada 4, episodio 1, llevan el nombre y el arte del flyer.
     MUESTRA: todos reproducen img/clips/muestra.mp4 hasta que lleguen los videos reales. */
  clips: [
    { id: 'noche-de-la-risa', titulo: 'La noche de la risa', de: 'pablo-oyhenart', show: 'stand-up-vieja-chela', ep: 'T4 E7', imagen: 'img/comunicadores/pablo-oyhenart.jpg', nuevo: true },
    { id: 'dos-de-septiembre', titulo: 'Noche del 2 de septiembre', de: 'andres-bazzano', show: 'stand-up-vieja-chela', ep: 'Miércoles 2/9', imagen: 'img/comunicadores/andres-bazzano.jpg', nuevo: true },
    { id: 'apertura-e6', titulo: 'Apertura del episodio 6', de: 'lucho-diaz', show: 'stand-up-vieja-chela', ep: 'T4 E6', imagen: 'img/comunicadores/lucho-diaz.jpg' },
    { id: 'cierre-e6', titulo: 'Cierre del episodio 6', de: 'willy', show: 'stand-up-vieja-chela', ep: 'T4 E6', imagen: 'img/comunicadores/willy.jpg' },
    { id: 'apertura-e5', titulo: 'Apertura del episodio 5', de: 'mati-morales', show: 'stand-up-vieja-chela', ep: 'T4 E5', imagen: 'img/comunicadores/mati-morales.jpg' },
    { id: 'cierre-e5', titulo: 'Cierre del episodio 5', de: 'augusto-dangelo', show: 'stand-up-vieja-chela', ep: 'T4 E5', imagen: 'img/comunicadores/augusto-dangelo.jpg' },
    { id: 'me-falta-un-dactil', titulo: 'Me falta un dáctil', de: 'gabo9d', show: 'stand-up-vieja-chela', ep: 'T4 E1', imagen: 'img/clips/me-falta-un-dactil.jpg', arte: true },
    { id: 'soy-indeciso', titulo: 'Soy indeciso', de: 'maxi-montanari', show: 'stand-up-vieja-chela', ep: 'T4 E1', imagen: 'img/clips/soy-indeciso.jpg', arte: true },
    { id: 'se-tomaron-el-g', titulo: '¿Se tomaron el G?', de: 'ponetepillo', show: 'stand-up-vieja-chela', ep: 'T4 E1', imagen: 'img/clips/se-tomaron-el-g.jpg', arte: true }
  ],
  videoMuestra: 'img/clips/muestra.mp4',
  videoMuestraWebm: 'img/clips/muestra.webm',   /* para los navegadores sin H.264 */

  /* Contratar: tipos de evento y cantidad de gente */
  eventos: ['Cumpleaños', 'Despedida', 'Fiesta privada', 'Empresa', 'Bar o boliche', 'Otro'],
  personas: ['Hasta 30', '30 a 80', '80 a 150', 'Más de 150']
};
