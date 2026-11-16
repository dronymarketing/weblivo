/* LA ESTRELLA — ingreso: se toca el nombre y se escribe el PIN de 4 números */
(function () {
  'use strict';
  var $ = UI.$, esc = UI.esc;
  var lista = $('#usuarios');

  function destino(u) { return u.rol === 'duena' ? 'panel/' : 'caja/'; }

  function pintar() {
    var actual = LE.usuario(), html = '';
    if (actual) {
      html += '<a class="usuario" href="' + destino(actual) + '" style="background:var(--acento-suave)"><span class="avatar avatar--acento">' + esc(UI.iniciales(actual.nombre)) + '</span>' +
        '<span><span class="usuario__nombre">Seguir como ' + esc(actual.nombre) + '</span><span class="usuario__rol">Ya ingresaste · tocá para volver</span></span></a>';
    }
    LE.usuarios().slice().sort(function (a, b) { return (b.activo - a.activo) || (a.rol === 'duena' ? -1 : 1); }).forEach(function (u) {
      html += '<button type="button" class="usuario" data-id="' + esc(u.id) + '"' + (u.activo ? '' : ' disabled') + '>' +
        '<span class="avatar' + (u.rol === 'duena' ? ' avatar--acento' : '') + '">' + esc(UI.iniciales(u.nombre)) + '</span>' +
        '<span><span class="usuario__nombre">' + esc(u.nombre) + '</span>' +
        '<span class="usuario__rol">' + UI.rolNombre(u.rol) + (u.activo ? ' · PIN de muestra ' + esc(u.pin) : ' · sin acceso') + '</span></span></button>';
    });
    lista.innerHTML = html;
  }

  function pedirPin(u) {
    var pin = '';
    var cuerpo = document.createElement('div');
    cuerpo.innerHTML = '<p class="suave centro">' + esc(u.nombre) + ' · ' + UI.rolNombre(u.rol) + '</p><div class="pin-puntos" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p class="pin-error" role="alert"></p>';
    var puntos = cuerpo.querySelectorAll('.pin-puntos i'), err = cuerpo.querySelector('.pin-error');
    function actualizar() { puntos.forEach(function (p, i) { p.classList.toggle('is-on', i < pin.length); }); }
    var teclado = UI.teclado(function (k) {
      err.textContent = '';
      if (k === 'borrar') pin = pin.slice(0, -1); else if (pin.length < 4) pin += k;
      actualizar();
      if (pin.length === 4) {
        var r = LE.entrar(u.id, pin);
        if (r.ok) { location.href = destino(u); }
        else { err.textContent = r.error; pin = ''; setTimeout(actualizar, 250); UI.beep(false); }
      }
    });
    cuerpo.appendChild(teclado);
    UI.modal({ titulo: 'Escribí tu PIN', cuerpo: cuerpo });
  }

  lista.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-id]'); if (!b) return;
    pedirPin(LE.usuarios().filter(function (u) { return u.id === b.dataset.id; })[0]);
  });
  $('#restablecer').addEventListener('click', function () {
    UI.confirmar('Restablecer el borrador', 'Se borra todo lo que cargaste y se vuelven a generar los datos de muestra.', { ok: 'Restablecer', peligro: true }).then(function (si) { if (si) { LE.reset(); location.reload(); } });
  });
  pintar();
})();
