// main.js - Proyecto Austral 2026

// === CONFIG ===
// Las claves se comparan sin mayúsculas, espacios ni puntos.
const LOGIN_PASSWORDS = ["ARG145TRP184", "TRP184ARG145"];  // se aceptan en los dos órdenes
const CULPRIT_DNI     = "30441226";                        // Dr. Rubén Serot
const MAX_ZIP_TRIES   = 4;                                 // después se bloquea (Ctrl+Shift+F9 los restablece)
const VIDEOS = {
  elias:    { file: "assets/video/msg1.mp4",     name: "mensaje_elias.mp4",       title: "Mensaje del Dr. Elías Helix" },
  registro: { file: "assets/video/registro.mp4", name: "cam01_pasillo_12-11-2026.mp4", title: "Cámara 01 · Pasillo principal — 12-11-2026" },
};
// =============

// Informe de ADN del Proyecto Austral (no es el de la policía): aparece al abrir la evidencia cifrada.
// Perfil STR de la muestra de la escena vs. la base de exclusión del personal → coincide con Serot.
const ADN_DOC = { name: "informe_ADN_confidencial.pdf", title: "Informe confidencial de ADN — Proyecto Austral" };
const ADN_LOCI = [
  // locus,       escena,  Serot
  ["D3S1358",    "15/17", "15/17"],
  ["vWA",        "16/18", "16/18"],
  ["FGA",        "21/24", "21/24"],
  ["D8S1179",    "13/14", "13/14"],
  ["D21S11",     "29/30.2", "29/30.2"],
  ["D18S51",     "14/16", "14/16"],
  ["TH01",       "6/9.3", "6/9.3"],
  ["D13S317",    "11/12", "11/12"],
  ["D16S539",    "9/11",  "9/11"],
  ["D5S818",     "12/12", "12/12"],
  ["CSF1PO",     "10/12", "10/12"],
  ["TPOX",       "8/11",  "8/11"],
  ["D7S820",     "10/11", "10/11"],
  ["Amelogenina","X/Y",   "X/Y"],
];

// Lista oficial de personal registrado (12-11-2026)
const PERSONAL = [
  ["Dr. Elías Helix",          "20.874.219", "Investigador",            "15:23", "—"],
  ["Lic. Lucía Mutis",         "37.214.563", "Becaria doctoral",        "18:47", "21:35"],
  ["Dr. Gustavo Schotlender",  "29.836.477", "Investigador adjunto",    "17:15", "23:02"],
  ["Dr. Dario Do Porto",       "30.823.115", "Investigador",            "10:21", "19:01"],
  ["Téc. Paula Cepa",          "34.197.820", "Técnica de laboratorio",  "19:23", "22:19"],
  ["Lic. Miranda Palumbo",     "31.682.451", "Becaria doctoral",        "18:37", "22:07"],
  ["Dr. Adrian Turjanski",     "23.172.498", "Investigador",            "09:32", "15:17"],
  ["Ing. Germán Jurado",       "42.095.788", "Analista bioinformático", "08:44", "17:43"],
  ["Dra. Carolina Garcia",     "27.554.670", "Médica",                  "08:04", "14:32"],
  ["Lic. Gabriel Garcia",      "41.202.913", "Analista bioinformático", "12:46", "21:45"],
  ["Lic. Justo Olmos",         "36.410.582", "Becario doctoral",        "13:14", "23:44"],
  ["Mercedes Vautier",         "39.485.992", "Estudiante",              "12:56", "16:23"],
  ["Dr. Marcelo Marti",        "28.334.709", "Investigador",            "19:27", "22:13"],
  ["Daniela Capsid",           "34.467.862", "Técnica de laboratorio",  "15:34", "21:10"],
  ["Dr. Rubén Serot",          "30.441.226", "Investigador",            "19:38", "21:33"],
  ["Dr. Iker Redal",           "36.019.347", "Becario postdoctoral",    "09:54", "16:55"],
  ["Joaquín Messano",          "43.366.251", "Estudiante",              "16:09", "18:03"],
  ["Lic. Ernesto Perez",       "40.112.347", "Becario doctoral",        "12:07", "23:25"],
  ["Ing. Ezequiel Ramos",      "39.478.235", "Becario doctoral",        "14:23", "20:02"],
  ["Ayelén Numerosky",         "43.128.691", "Estudiante",              "09:54", "12:12"],
  ["Dr. João Victor Carvalho", "Extranjero", "Investigador visitante",  "08:53", "10:47"],
];

const CHAT = [
  ["13-11-2026 09:58", "María Paula Nodal", "¿Lograste averiguar quién estuvo en el laboratorio anoche?"],
  ["13-11-2026 10:01", "Informante",  "Sí. Te dejé la lista de accesos en el servidor."],
  ["13-11-2026 10:02", "María Paula Nodal", "Perfecto. Aguardo instrucciones."],
  ["13-11-2026 12:22", "Informante",  "También pude rescatar el video de la cámara de seguridad del pasillo."],
  ["13-11-2026 12:22", "Informante",  "Ahí se ve quién fue, no lo podemos creer. Lo guardé en la evidencia cifrada: la clave es el DNI del culpable."],
  ["13-11-2026 12:24", "Informante",  "Y algo más: anoche bioseguridad encontró sangre en los papeles de Elías. La policía no la tiene. Corrí ese ADN contra la base del personal del proyecto y el resultado también está ahí."],
  ["13-11-2026 12:25", "María Paula Nodal", "Ok."],
  ["13-11-2026 13:45", "Informante",  "Tené cuidado, quieren borrar las pruebas."],
  ["13-11-2026 13:46", "Informante",  "Solo vos tenés acceso al proyecto ahora. Junto con el video va un mensaje que te dejó Elías."],
  ["13-11-2026 17:14", "María Paula Nodal", "Tengo a la policía en la puerta."],
  ["13-11-2026 17:15", "Informante",  "Recibido. Mantené la calma y no digas nada."],
  ["13-11-2026 17:15", "Informante",  "Vamos a llamar a los mejores bioinformáticos para que expongan toda la evidencia. Confiá en nosotros."],
];

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const modal = $('modal');
  const loginScreen = $('login-screen');
  const mainSystem = $('main-system');
  const loginInput = $('login-input');
  const loginMsg = $('login-msg');
  const zipInput = $('zip-pass');
  const zipMsg = $('zip-msg');
  const windowsArea = $('windows-area');
  const welcomeHTML = $('welcome').outerHTML;

  let failedLogins = 0;
  let evidenceUnlocked = false;
  // Los intentos se guardan en el navegador: no se reinician al cerrar sesión ni al recargar (F5),
  // solo con los atajos de operadora.
  const TRIES_KEY = 'austral-zip-tries';
  function loadTries(){
    try {
      const n = parseInt(localStorage.getItem(TRIES_KEY), 10);
      return Number.isFinite(n) ? Math.max(0, Math.min(n, MAX_ZIP_TRIES)) : MAX_ZIP_TRIES;
    } catch (e) { return MAX_ZIP_TRIES; }
  }
  function setTries(n){
    zipTriesLeft = n;
    try { localStorage.setItem(TRIES_KEY, String(n)); } catch (e) {}
  }
  let zipTriesLeft = loadTries();

  const normalize = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

  // ---------- login ----------
  function tryLogin(){
    const v = normalize(loginInput.value);
    if (LOGIN_PASSWORDS.includes(v)){
      loginMsg.textContent = '';
      failedLogins = 0;
      loginScreen.classList.add('hidden');
      mainSystem.classList.remove('hidden');
      return;
    }
    failedLogins++;
    shake(loginInput);
    loginInput.select();
    if (!v) loginMsg.textContent = 'Ingrese la contraseña.';
    else if (failedLogins >= 5) loginMsg.textContent = 'ACCESO DENEGADO — ¿revisaste el cuaderno de María Paula?';
    else loginMsg.textContent = 'ACCESO DENEGADO';
  }

  $('login-btn').addEventListener('click', tryLogin);
  loginInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  $('clear-btn').addEventListener('click', () => { loginInput.value = ''; loginMsg.textContent = ''; loginInput.focus(); });
  $('logout-btn').addEventListener('click', resetSystem);

  // Atajos de operadora (combinación difícil de tocar sin querer):
  // Ctrl+Shift+F8: reinicio completo para el próximo turno · Ctrl+Shift+F9: restablecer intentos del ZIP
  document.addEventListener('keydown', e => {
    const op = e.ctrlKey && e.shiftKey;
    if (op && e.key === 'F8'){ e.preventDefault(); setTries(MAX_ZIP_TRIES); resetSystem(); }
    if (op && e.key === 'F9'){ e.preventDefault(); setTries(MAX_ZIP_TRIES); renderTries(); zipMsg.textContent = ''; }
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  function resetSystem(){
    mainSystem.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    closeModal();
    loginInput.value = '';
    loginMsg.textContent = '';
    failedLogins = 0;
    evidenceUnlocked = false;
    windowsArea.innerHTML = welcomeHTML;
    $('lock-status').textContent = '● EVIDENCIA BLOQUEADA';
    $('lock-status').className = 'status locked-txt';
    const ev = $('evidence-item');
    ev.className = 'locked';
    ev.innerHTML = '📦 evidencia_cifrada.zip <span class="badge">🔒</span>';
    setTimeout(() => loginInput.focus(), 100);
  }

  // ---------- archivos ----------
  document.querySelectorAll('nav li.file').forEach(li => {
    li.addEventListener('click', () => openFile(li.dataset.file));
  });
  $('evidence-item').addEventListener('click', () => {
    if (evidenceUnlocked) showEvidence(); else openZipModal();
  });

  function openFile(key){
    if (key === 'ingresos'){
      const rows = PERSONAL.map(p =>
        `<tr><td>${p[0]}</td><td class="num">${p[1]}</td><td>${p[2]}</td><td class="num">${p[3]}</td><td class="num">${p[4]}</td></tr>`
      ).join('');
      addWindow('win-ingresos', 'registro_ingresos.html', `
        <h2>Registro de ingresos</h2>
        <p class="muted">Accesos registrados por el sistema de molinetes — jueves 12-11-2026</p>
        <table class="data-table">
          <thead><tr><th>Nombre</th><th>DNI</th><th>Cargo</th><th>Ingreso</th><th>Salida</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`);
    } else if (key === 'chat'){
      const msgs = CHAT.map(([date, who, text]) =>
        `<div class="bubble ${who === 'María Paula Nodal' ? 'me' : ''}"><span class="meta">${date} · ${who}</span>${text}</div>`
      ).join('');
      addWindow('win-chat', 'chat_informante.html', `<h2>Chat interno — Proyecto Austral</h2><div class="chat">${msgs}</div>`);
    }
  }

  function addWindow(id, title, content){
    const existing = document.getElementById(id);
    if (existing){
      windowsArea.prepend(existing);
      existing.scrollIntoView({behavior:'smooth', block:'start'});
      return existing;
    }
    const win = document.createElement('div');
    win.className = 'window';
    win.id = id;
    win.innerHTML = `<div class="win-title"><span>${title}</span><button class="win-close" title="Cerrar">×</button></div>
                     <div class="win-body">${content}</div>`;
    win.querySelector('.win-close').addEventListener('click', () => win.remove());
    windowsArea.prepend(win);
    windowsArea.scrollTop = 0;
    return win;
  }

  // ---------- evidencia cifrada ----------
  function openZipModal(){
    modal.classList.remove('hidden');
    zipInput.value = '';
    zipMsg.textContent = '';
    zipMsg.className = 'msg';
    renderTries();
    if (zipTriesLeft > 0) setTimeout(() => zipInput.focus(), 50);
  }
  function renderTries(){
    const tries = $('zip-tries');
    const locked = zipTriesLeft <= 0;
    zipInput.disabled = locked;
    $('zip-open').disabled = locked;
    tries.className = 'tries' + (locked ? ' locked' : zipTriesLeft === 1 ? ' last' : '');
    tries.textContent = locked
      ? 'ARCHIVO BLOQUEADO — demasiados intentos fallidos. Contacte al administrador.'
      : `Intentos restantes: ${zipTriesLeft} de ${MAX_ZIP_TRIES}`;
  }
  function closeModal(){
    modal.classList.add('hidden');
    zipMsg.textContent = '';
  }

  function tryZip(){
    if (zipTriesLeft <= 0) return;
    const raw = zipInput.value.trim();
    zipMsg.className = 'msg';
    // errores de formato no consumen intentos
    if (!raw){ zipMsg.textContent = 'Ingrese la clave.'; return; }
    if (!/^\d+$/.test(raw)){ shake(zipInput); zipMsg.textContent = 'Formato inválido: solo números, sin puntos ni espacios.'; return; }
    if (raw === CULPRIT_DNI){
      zipMsg.className = 'msg ok';
      zipMsg.textContent = 'Perfil compatible con la evidencia. Descifrando...';
      setTimeout(() => { closeModal(); unlockEvidence(); }, 1200);
      return;
    }
    shake(zipInput);
    setTries(zipTriesLeft - 1);
    zipInput.value = '';
    zipMsg.textContent = zipTriesLeft > 0 ? 'Clave incorrecta.' : '';
    renderTries();
  }

  $('zip-open').addEventListener('click', tryZip);
  zipInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryZip(); });
  $('zip-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  function unlockEvidence(){
    evidenceUnlocked = true;
    $('lock-status').textContent = '● EVIDENCIA DESBLOQUEADA';
    $('lock-status').className = 'status unlocked-txt';
    const ev = $('evidence-item');
    ev.className = 'unlocked';
    ev.innerHTML = '📦 evidencia_cifrada.zip <span class="badge">✅</span>';
    showEvidence();
  }

  function showEvidence(){
    const win = addWindow('win-evidence', 'evidencia_cifrada.zip', `
      <h2>Evidencia descifrada</h2>
      <p class="muted">3 archivos · hacé click para abrir</p>
      <ul class="media-list">
        <li><a href="#" data-video="registro">🎬 ${VIDEOS.registro.name}</a></li>
        <li><a href="#" data-doc="adn">🧬 ${ADN_DOC.name}</a></li>
        <li><a href="#" data-video="elias">🎥 ${VIDEOS.elias.name}</a></li>
      </ul>`);
    win.querySelectorAll('[data-video]').forEach(a => {
      a.addEventListener('click', e => { e.preventDefault(); openVideo(a.dataset.video); });
    });
    win.querySelector('[data-doc]').addEventListener('click', e => { e.preventDefault(); openAdnReport(); });
  }

  function openAdnReport(){
    const rows = ADN_LOCI.map(([locus, escena, serot]) =>
      `<tr><td>${locus}</td><td class="num">${escena}</td><td class="num">${serot}</td><td class="match">✔</td></tr>`
    ).join('');
    addWindow('win-adn', ADN_DOC.name, `
      <div class="report-head">
        <div><b>PROYECTO AUSTRAL</b> · Unidad de Bioseguridad<br><span class="muted">Instituto Nacional de Virología Antártica</span></div>
        <div class="stamp">CONFIDENCIAL<br><small>uso interno — no remitido a la policía</small></div>
      </div>
      <h2>${ADN_DOC.title}</h2>
      <p class="muted">Emitido: 13-11-2026 11:52 · Ref. AUS-BIO-1112</p>
      <h4>Muestra</h4>
      <p>Relevamiento de bioseguridad posterior al incidente en la <b>Oficina 03</b> (12-11-2026, 23:40).
        Los papeles de trabajo del Dr. Helix estaban revueltos. En el borde de una de las hojas se halló
        una <b>pequeña mancha de sangre</b>, compatible con un corte con papel al manipularlas con apuro.
        La sangre <b>no corresponde</b> al Dr. Elías Helix.</p>
      <p class="muted">Esta muestra no figura en los informes policiales: fue tomada por el equipo del proyecto.</p>
      <h4>Cotejo</h4>
      <p>Por protocolo, todo el personal del Proyecto Austral tiene su perfil genético registrado en la
        <i>base de exclusión</i> (se usa para descartar que las muestras de virus estén contaminadas con ADN del propio equipo).
        El perfil de la escena se comparó contra los 21 integrantes del personal.</p>
      <table class="data-table">
        <thead><tr><th>Marcador (STR)</th><th>Muestra escena</th><th>Perfil 30.441.226</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="verdict">
        COINCIDENCIA TOTAL — 14 de 14 marcadores<br>
        Perfil de la base: <b>Dr. Rubén Serot</b> · DNI 30.441.226<br>
        <span class="muted">Probabilidad de coincidencia al azar: 1 en 4,7 × 10¹⁸</span>
      </div>`);
  }

  function openVideo(key){
    const v = VIDEOS[key];
    const win = addWindow('win-video-' + key, v.name, `
      <h2>${v.title}</h2>
      <video controls autoplay src="${v.file}">Video no encontrado.</video>`);
    const video = win.querySelector('video');
    if (video) video.play().catch(() => {});
  }

  function shake(el){
    el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
  }
});
