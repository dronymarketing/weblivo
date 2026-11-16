/* LA ESTRELLA — ingreso: se toca el nombre y se escribe el PIN de 4 números */
(function () {
  'use strict';
  var $ = UI.$, esc = UI.esc;
  var lista = $('#usuarios');

  /* ----- Modo conectado: email y contraseña (Supabase) ----- */
  function destinoPerfil(p) { return p.rol === 'admin' ? 'panel/' : 'caja/'; }
  function montarNube() {
    $('.ingreso h1').textContent = 'Ingresá'; $('.ingreso__sub').textContent = 'Con tu email y contraseña.';
    var perfil = LE.nube.perfil(), registro = false; var np = $('#nota-primera'); if (np) np.hidden = false;
    lista.innerHTML = (perfil && perfil.activo ? '<a class="usuario" href="' + destinoPerfil(perfil) + '" style="background:var(--acento-suave);margin-bottom:14px"><span class="avatar avatar--acento">' + esc(UI.iniciales(perfil.nombre)) + '</span><span><span class="usuario__nombre">Seguir como ' + esc(perfil.nombre) + '</span><span class="usuario__rol">Ya ingresaste · tocá para volver</span></span>' + UI.ico('chevron-right', 'usuario__ir') + '</a>' : '') +
      '<form id="acceso" novalidate>' +
      '<label class="campo" id="campo-nombre" hidden><span>Tu nombre y apellido</span><input name="nombre" class="entrada" autocomplete="name" maxlength="60"></label>' +
      '<label class="campo"><span>Email</span><input name="email" type="email" class="entrada" autocomplete="username" inputmode="email" autocapitalize="off"></label>' +
      '<label class="campo"><span>Contraseña</span><input name="clave" type="password" class="entrada" autocomplete="current-password"></label>' +
      '<p class="pin-error" id="acceso-aviso" role="alert" style="text-align:left"></p>' +
      '<button type="submit" class="btn btn--acento btn--grande btn--bloque" id="acceso-ok">Entrar</button>' +
      '<button type="button" class="btn btn--linea btn--bloque" id="acceso-alternar" style="margin-top:10px">Crear cuenta nueva</button></form>';
    var f = $('#acceso'), aviso = $('#acceso-aviso');
    function modo(r) { registro = r; $('#campo-nombre').hidden = !r; $('#acceso-ok').textContent = r ? 'Crear cuenta' : 'Entrar'; $('#acceso-alternar').textContent = r ? 'Ya tengo cuenta' : 'Crear cuenta nueva'; f.clave.setAttribute('autocomplete', r ? 'new-password' : 'current-password'); aviso.textContent = ''; }
    $('#acceso-alternar').addEventListener('click', function () { modo(!registro); });
    f.addEventListener('submit', function (e) {
      e.preventDefault(); aviso.style.color = ''; aviso.textContent = '';
      if (!f.email.value.trim() || !f.clave.value) { aviso.textContent = 'Escribí tu email y tu contraseña.'; return; }
      if (registro && f.nombre.value.trim().length < 2) { aviso.textContent = 'Escribí tu nombre.'; return; }
      UI.hacer(function () { return registro ? LE.nube.registrar(f.nombre.value, f.email.value, f.clave.value) : LE.nube.entrar(f.email.value, f.clave.value); }).then(function (r) {
        if (r.ok) { location.href = destinoPerfil(r.valor); return; }
        var er = r.error || {}; if (er.aviso || er.pendiente) { aviso.style.color = 'var(--texto)'; modo(false); aviso.textContent = er.message; }
      });
    });
  }
  if (LE.nubeActiva) { montarNube(); return; }


  function destino(u) { return u.rol === 'admin' ? 'panel/' : 'caja/'; }

  function pintar() {
    var actual = LE.usuario(), html = '';
    if (actual) {
      html += '<a class="usuario" href="' + destino(actual) + '" style="background:var(--acento-suave)"><span class="avatar avatar--acento">' + esc(UI.iniciales(actual.nombre)) + '</span>' +
        '<span><span class="usuario__nombre">Seguir como ' + esc(actual.nombre) + '</span><span class="usuario__rol">Ya ingresaste · tocá para volver</span></span>' + UI.ico('chevron-right', 'usuario__ir') + '</a>';
    }
    LE.usuarios().slice().sort(function (a, b) { return (b.activo - a.activo) || (a.rol === 'admin' ? -1 : 1); }).forEach(function (u) {
      html += '<button type="button" class="usuario" data-id="' + esc(u.id) + '"' + (u.activo ? '' : ' disabled') + '>' +
        '<span class="avatar' + (u.rol === 'admin' ? ' avatar--acento' : '') + '">' + esc(UI.iniciales(u.nombre)) + '</span>' +
        '<span><span class="usuario__nombre">' + esc(u.nombre) + '</span>' +
        '<span class="usuario__rol">' + UI.rolNombre(u.rol) + (u.activo ? '' : ' · sin acceso') + '</span></span>' + UI.ico('chevron-right', 'usuario__ir') + '</button>';
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
  pintar();
})();
