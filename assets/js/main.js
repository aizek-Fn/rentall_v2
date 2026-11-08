(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rp=n=>"Rp"+n.toLocaleString("id-ID"),e=s=>s.replace(/&/g,"&amp;");
const img=(i,w)=>`https://images.unsplash.com/photo-${i}?auto=format&fit=crop&w=${w}&q=80`;
const C=[["Alat Outdoor","120+","1504280390367-361c6d9f38f4","#8a9f5a"],["Kamera & Fotografi","85+","1495707902641-75cac588d2e9","#6b8fb3"],["Event & Party","200+","1574482211311-45a2169db57c","#9a6f93"],["Perabotan","150+","1583847268964-b28dc8f51f92","#d4a24f"],["Perlengkapan Bayi","90+","1559135141-2bea6465fccf","#c4714b"],["Perkakas","110+","1572981779307-38b8cabb2407","#5f9c8a"]];
const PH='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8 20.5 7.6v8.8L12 21.2 3.5 16.4V7.6L12 2.8Z"/><path d="M3.5 7.6 12 12.4l8.5-4.8M12 12.4v8.8"/></svg>';
const I=[
{m:"1478131143081-80f7f84ca84d",n:"Tenda Dome 4 Orang",c:0,p:85000,d:"Tenda dome tahan hujan untuk 4 orang, lengkap flysheet dan pasak. Dicek dan dibersihkan sebelum dikirim."},
{m:"1553062407-98eeb64c6a62",n:"Carrier 60L",c:0,p:45000,d:"Tas gunung 60 liter dengan rangka penyangga punggung dan rain cover."},
{m:"1516035069371-29a1b244cc32",n:"Kamera Mirrorless + Lensa Kit",c:1,p:250000,d:"Kamera mirrorless 24 MP dengan lensa kit, dua baterai, dan kartu memori 64 GB."},
{m:"1502920917128-1aa500764cbd",n:"Lensa 50mm f/1.8",c:1,p:75000,d:"Lensa prime untuk potret dengan latar blur. Termasuk pelindung dan tas lensa."},
{m:"1470225620780-dba8ba36b745",n:"Sound System Portable",c:2,p:300000,d:"Speaker aktif dengan dua mikrofon nirkabel, cocok untuk acara sampai 50 orang."},
{m:"1519167758481-83f550bb49b3",n:"Tenda Pesta 3x3 m",c:2,p:150000,d:"Tenda lipat 3x3 meter dengan rangka besi kokoh untuk acara outdoor."},
{m:"1555041469-a586c61ea9bc",n:"Sofa 2 Dudukan",c:3,p:120000,d:"Sofa nyaman untuk dua orang, cocok untuk acara, sesi foto, atau tamu menginap."},
{m:"1503602642458-232111445657",n:"Meja Lipat + 4 Kursi",c:3,p:70000,d:"Satu set meja lipat dan empat kursi, ringan dan mudah disimpan."},
{m:"1566004100631-35d015d6a491",n:"Stroller Lipat Ringan",c:4,p:55000,d:"Stroller yang bisa dilipat satu tangan, dengan sabuk pengaman dan kanopi."},
{m:"1515488042361-ee00e0ddd4e4",n:"Baby Crib Portable",c:4,p:65000,d:"Tempat tidur bayi lipat dengan kasur dan kelambu, aman untuk bepergian."},
{m:"1504148455328-c376907d081c",n:"Bor Tangan Nirkabel",c:5,p:50000,d:"Bor nirkabel dengan dua baterai dan satu set mata bor serta obeng."},
{m:"1530124566582-a618bc2615dc",n:"Tangga Lipat Aluminium",c:5,p:40000,d:"Tangga lipat aluminium tinggi 3 meter dengan pengunci aman."}
];
const NAV=[["index.html","Home"],["kategori.html","Kategori"],["tentang.html","Tentang Kami"],["faq.html","FAQ"],["contact.html","Contact"]];
let page=location.pathname.split("/").pop().toLowerCase();
if(!page)page="index.html";else if(!page.includes("."))page+=".html";
const days=(a,b)=>a&&b&&b>=a?Math.round((new Date(b)-new Date(a))/864e5)+1:1;

document.head.insertAdjacentHTML("beforeend",'<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Crect width=%2764%27 height=%2764%27 rx=%2714%27 fill=%27%230F1F1A%27/%3E%3Cpath d=%27M18 20h28v8H18zm4 12h20v14H22z%27 fill=%27%238A9F5A%27/%3E%3C/svg%3E">');
$("#hdr").innerHTML=`<a class="skip" href="#main">Lewati ke konten utama</a><header class="top"><div class="wrap bar"><a class="logo" href="index.html"><span class="mk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 20.5 7.6v8.8L12 21.2 3.5 16.4V7.6L12 2.8Z"/><path d="M3.5 7.6 12 12.4l8.5-4.8M12 12.4v8.8"/></svg></span><span class="tx"><span>Rent<b>All</b></span><small>Sewa Mudah, Hidup Lebih Ringan</small></span></a><button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Buka menu navigasi"><span></span></button><nav id="menu" aria-label="Navigasi utama"><ul>${NAV.map(([h,t])=>`<li><a href="${h}"${h===page?' aria-current="page"':""}>${t}</a></li>`).join("")}</ul><div class="acct"><button class="btn line" data-auth="login">Masuk</button><button class="btn org" data-auth="register">Daftar</button></div></nav></div></header>`;
$("#ftr").innerHTML=`<footer><div class="wrap"><div class="fgrid"><div><a class="logo" href="index.html"><span class="mk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8 20.5 7.6v8.8L12 21.2 3.5 16.4V7.6L12 2.8Z"/><path d="M3.5 7.6 12 12.4l8.5-4.8M12 12.4v8.8"/></svg></span><span class="tx"><span>Rent<b>All</b></span><small>Sewa Mudah, Hidup Lebih Ringan</small></span></a><p>Platform sewa barang yang memudahkan kamu mendapatkan apa saja, kapan saja, tanpa perlu membeli.</p></div><div><h3>Tautan cepat</h3><ul>${NAV.map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join("")}</ul></div><div><h3>Kategori</h3><ul>${C.slice(0,4).map(c=>`<li><a href="kategori.html?cat=${encodeURIComponent(c[0])}">${e(c[0])}</a></li>`).join("")}</ul></div><div><h3>Bantuan</h3><ul><li><a href="contact.html">Hubungi kami</a></li><li><a href="faq.html">Pertanyaan umum</a></li><li><button class="lk" data-auth="login">Masuk akun</button></li><li><button class="lk" data-auth="register">Daftar baru</button></li></ul></div></div><div class="copy">© 2026 RentAll. Sewa Mudah, Hidup Lebih Ringan. Proyek demo front-end: data barang dan kontak hanya contoh.</div></div></footer>`;
const burger=$(".burger"),menu=$("#menu");
const shut=()=>{menu.classList.remove("open");burger.setAttribute("aria-expanded","false");burger.setAttribute("aria-label","Buka menu navigasi")};
burger.onclick=()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Tutup menu navigasi":"Buka menu navigasi")};
document.addEventListener("keydown",ev=>{if(ev.key==="Escape"&&menu.classList.contains("open")){shut();burger.focus()}});

/* ikon */
const IC=['<path d="M12 3 19 6v5c0 4.4-2.9 7.9-7 9.9-4.1-2-7-5.5-7-9.9V6l7-3Z"/><path d="m9.2 12 2 2 3.6-3.8"/>','<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.6Z"/>','<path d="M4.5 13.5v-1.2a7.5 7.5 0 0 1 15 0v1.2"/><path d="M4.5 13h2.6v5.6H6a1.5 1.5 0 0 1-1.5-1.5V13Z"/><path d="M19.5 13h-2.6v5.6H18a1.5 1.5 0 0 0 1.5-1.5V13Z"/><path d="M19.5 18.6v.4a2.5 2.5 0 0 1-2.5 2.5h-3.2"/>','<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z"/>'];
const WI=['<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z"/>','<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>','<path d="M12 3 19 6v5c0 4.4-2.9 7.9-7 9.9-4.1-2-7-5.5-7-9.9V6l7-3Z"/><path d="m9.2 12 2 2 3.6-3.8"/>','<path d="M12 3v18M16.5 7.5c0-1.9-2-3-4.5-3s-4.5 1.2-4.5 3 2 2.7 4.5 3.2 4.5 1.3 4.5 3.3-2 3-4.5 3-4.5-1.1-4.5-3"/>'];
const svg=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
$$(".perks li").forEach((li,i)=>li.innerHTML=`<span class="ic">${svg(IC[i])}</span><span>${li.innerHTML}</span>`);
$$(".why>div").forEach((d,i)=>d.insertAdjacentHTML("afterbegin",`<span class="wi">${svg(WI[i])}</span>`));

/* dialog: item detail + login/register */
const dlg=document.createElement("dialog");document.body.append(dlg);
dlg.addEventListener("click",ev=>{if(ev.target===dlg||ev.target.closest(".dclose"))dlg.close()});
const X='<button class="dclose" aria-label="Tutup">×</button>';
const auth=m=>{const r=m==="register";dlg.innerHTML=`${X}<form class="dbody" data-demo data-ok="${r?"Akun demo untuk {n} dibuat (tidak disimpan di server).":"Berhasil masuk (demo, tidak ada akun sungguhan)."}" ${r?'data-min="1"':""} novalidate><h2>${r?"Daftar akun baru":"Masuk ke RentAll"}</h2><p>${r?"Gratis, dan hanya butuh satu menit.":"Selamat datang kembali, yuk lanjutkan sewamu."}</p>${r?'<label>Nama lengkap<input name="nama" autocomplete="name" required data-l="Nama lengkap"></label>':""}<label>Email<input name="email" type="email" autocomplete="email" required data-l="Email"></label><label>Kata sandi<input name="pw" type="password" autocomplete="${r?"new":"current"}-password" required data-l="Kata sandi"></label>${r?'<label class="chk"><input type="checkbox" required data-l="Persetujuan syarat"> Saya setuju dengan syarat dan ketentuan</label>':""}<button class="btn" type="submit">${r?"Daftar":"Masuk"}</button><p class="msg" role="status" aria-live="polite"></p><p class="note">${r?"Sudah punya akun?":"Belum punya akun?"} <button type="button" class="lk" style="color:var(--olive-d);font-weight:600" data-auth="${r?"login":"register"}">${r?"Masuk di sini":"Daftar di sini"}</button></p></form>`;if(!dlg.open)dlg.showModal();shut()};
const item=i=>{const p=I[i],fr=$("#from")?.value||"",to=$("#to")?.value||"",n=days(fr,to),t=p.p*n,
w=encodeURIComponent(`Halo RentAll, saya mau sewa ${p.n}${fr&&to?` tanggal ${fr} sampai ${to}`:""}.`);
dlg.innerHTML=`${X}<img src="${img(p.m,900)}" alt="${e(p.n)}" onerror="this.remove()"><div class="dbody"><span class="note">${e(C[p.c][0])}</span><h2>${p.n}</h2><p>${p.d}</p><div class="est"><strong>${rp(t)}</strong><br><span class="note">${n} hari × ${rp(p.p)}${fr&&to?"":" (pilih tanggal di halaman Kategori untuk hitung otomatis)"}${t>=500000?". Gratis antar!":". Gratis antar untuk pesanan di atas Rp500.000."}</span></div><a class="btn org" href="https://wa.me/6281234567890?text=${w}" target="_blank" rel="noopener">Pesan via WhatsApp</a></div>`;dlg.showModal()};
document.addEventListener("click",ev=>{const a=ev.target.closest("[data-auth]"),m=ev.target.closest("[data-item]");if(a)auth(a.dataset.auth);if(m)item(+m.dataset.item)});

/* form demo */
const val=(f,m)=>{const bad=$$("[required]",f).filter(x=>x.type==="checkbox"?!x.checked:!x.value.trim()),em=f.elements.email,pw=f.elements.pw;
if(em&&em.value&&!/^\S+@\S+\.\S+$/.test(em.value)&&!bad.includes(em))bad.push(em);
if(f.dataset.min&&pw.value&&pw.value.length<6&&!bad.includes(pw))bad.push(pw);
if(bad.length){m.className="msg err";m.textContent="Periksa kolom: "+bad.map(x=>x.dataset.l).join(", ")+(pw&&f.dataset.min?" (kata sandi minimal 6 karakter)":"")+".";bad[0].focus();return false}return true};
document.addEventListener("submit",ev=>{const f=ev.target;if(!("demo" in f.dataset))return;ev.preventDefault();const m=$(".msg",f);if(!val(f,m))return;
m.className="msg ok";m.textContent=f.dataset.ok.replace("{n}",(f.elements.nama?.value||"").trim());if(f.id==="cf")f.reset()});

/* home */
const cats=$("#cats");
if(cats)cats.innerHTML=C.map(c=>`<a class="ccard" style="--c:${c[3]}" href="kategori.html?cat=${encodeURIComponent(c[0])}"><img src="${img(c[2],700)}" alt="" loading="lazy" onerror="this.remove()"><div><h3>${e(c[0])}</h3><span>${c[1]} barang</span></div></a>`).join("");
const sc=$("select[data-cat]");if(sc)sc.innerHTML='<option value="">Semua kategori</option>'+C.map(c=>`<option>${e(c[0])}</option>`).join("");
const fr=$("#from"),to=$("#to");
if(fr&&to){const t=new Date().toISOString().slice(0,10);fr.min=t;to.min=t;fr.addEventListener("change",()=>{to.min=fr.value||t;if(to.value&&to.value<to.min)to.value=""})}

/* kategori */
const il=$("#items");
if(il){
const q=new URLSearchParams(location.search),qi=$("#q");let cat=C.findIndex(c=>c[0]===q.get("cat"));
qi.value=q.get("q")||"";fr.value=q.get("from")||"";to.value=q.get("to")||"";
if(fr.value)to.min=fr.value;
$("#chips").innerHTML=[["Semua",-1],...C.map((c,i)=>[c[0],i])].map(([t,i])=>`<button class="cp" style="--c:${i<0?"#0f1f1a":C[i][3]}" data-c="${i}" aria-pressed="${i===cat}">${e(t)}</button>`).join("");
const draw=()=>{const k=qi.value.trim().toLowerCase(),a=I.map((p,i)=>({...p,i})).filter(p=>(cat<0||p.c===cat)&&(!k||(p.n+" "+C[p.c][0]).toLowerCase().includes(k)));
$("#count").textContent=`${a.length} barang ditemukan${fr.value&&to.value?` untuk ${days(fr.value,to.value)} hari`:""}`;
il.innerHTML=a.length?a.map(p=>`<article class="card" style="--c:${C[p.c][3]}"><figure>${PH}<img src="${img(p.m,600)}" alt="${e(p.n)}" loading="lazy" onerror="this.remove()"><span class="tag">${rp(p.p)}/hari</span></figure><div class="cb"><small>${e(C[p.c][0])}</small><h3>${p.n}</h3><button class="btn line" data-item="${p.i}">Lihat dan sewa</button></div></article>`).join(""):`<div class="empty"><h3>Barang belum ditemukan</h3><p>Coba kata kunci lain atau tampilkan semua kategori.</p><button class="btn" id="reset">Tampilkan semua</button></div>`};
$("#chips").onclick=ev=>{const b=ev.target.closest("[data-c]");if(!b)return;cat=+b.dataset.c;$$("[data-c]",$("#chips")).forEach(x=>x.setAttribute("aria-pressed",+x.dataset.c===cat));draw()};
qi.oninput=draw;[fr,to].forEach(x=>x.onchange=draw);
il.addEventListener("click",ev=>{if(ev.target.id==="reset"){cat=-1;qi.value="";$$("[data-c]").forEach(x=>x.setAttribute("aria-pressed",+x.dataset.c===-1));draw()}});
draw()}
})();
