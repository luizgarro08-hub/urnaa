// ====== CONFIGURAÇÃO (edite aqui) ======
const PIN = '1234'; // PIN do mesário para Apuração e Candidatos. TROQUE antes de usar.
// Os cargos agora são criados na página "Candidatos".
// ========================================
const CHAVE = 'urna_v1';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let CARGOS = [];
function carregar() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(CHAVE)); } catch (e) {}
  if (!d || !d.cands) d = { cargos: [], cands: [], votes: {} };
  if (!d.votes) d.votes = {};
  if (!d.cargos) d.cargos = d.cands.length ? [{ id: 'prefeito', nome: 'Prefeito', dig: 2 }, { id: 'vereador', nome: 'Vereador', dig: 4 }] : [];
  CARGOS = d.cargos;
  return d;
}
let db = carregar();
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(db)); }
  catch (e) { alert('Não foi possível salvar os dados neste navegador.'); }
}
function exigirPin(ini) {
  let ok = false;
  try { ok = sessionStorage.getItem('pin_ok') === '1'; } catch (e) {}
  if (ok) return ini();
  const o = document.createElement('div'); o.className = 'gate';
  o.innerHTML = '<div class="card"><h2>Área restrita</h2><p class="mut">Digite o PIN do mesário.</p><input id="pin" type="password" inputmode="numeric"><p><button class="btn" id="pok">Entrar</button></p><div class="msg" id="pm"></div></div>';
  document.body.appendChild(o);
  const tenta = () => {
    if ($('#pin').value === PIN) { try { sessionStorage.setItem('pin_ok', '1'); } catch (e) {} o.remove(); ini(); }
    else $('#pm').textContent = 'PIN incorreto.';
  };
  $('#pok').onclick = tenta;
  $('#pin').onkeydown = e => { if (e.key === 'Enter') tenta(); };
  $('#pin').focus();
}
function menu() {
  $('#nav').innerHTML = '<a href="index.html">Início</a><a href="urna.html">Urna</a><a href="apuracao.html">Apuração</a><a href="cadastro.html">Candidatos</a>';
}
