/* ============================================================
   DAANKLUST — script.js
   Modules: cookie, navbar + hamburgermenu, project modal
            met echte fotogalerij + stappen-tijdlijn,
            sterren-review + localStorage, scroll reveal
   ============================================================ */

/* ═══════════════════════════════════════════════════════════
   PROJECT DATA
   fotos[]: echte Unsplash-URLs
   stappen[]: { titel, beschrijving }
   materialen[]: string-array voor tag-chips
═══════════════════════════════════════════════════════════ */
const PROJECTS = {

  badkamer: {
    titel:    'De bouw van de boomhut (cabit)',
    datum:    '12 juli 2024',
    tags:     [{ label:'Renovatie', cls:'orange' }, { label:'Sanitair', cls:'green' }],
    headerBg: 'linear-gradient(135deg,#3D6B5A 0%,#1E3D30 100%)',
    uitleg:   'Volledig verouderde badkamer uit 1998 getransformeerd naar een moderne spa-ruimte. Nieuwe tegels van 60×120 cm, inloopdouche, vloerverwarming, vrijstaand toilet en LED-spiegels. Van sloop tot sleuteloverdracht in precies 8 werkdagen afgerond.',
    fotos: [
      'Foto1.jpeg',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=960&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=960&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=960&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702519?w=960&q=80'
    ],
    stappen: [
      { titel:'Inspectie & offerte',  beschrijving:'Badkamer opgemeten, bouwkundige staat gecheckt en materiaallijst opgesteld. Offerte geaccepteerd binnen twee dagen.' },
      { titel:'Sloopwerk',            beschrijving:'Oude tegels verwijderd, douche en sanitair gedemonteerd, vloer gestript tot op het beton. Sloopafval netjes afgevoerd.' },
      { titel:'Loodgieterswerk',      beschrijving:'Nieuwe water- en afvoerleidingen aangelegd voor inloopdouche en wastafel. Thermostaatkranen en vloerverwarmingsgroepen gemonteerd.' },
      { titel:'Tegelen',              beschrijving:'Wanden en vloer betegeld met 60×120 cm mat-witte tegels. Voegen netjes afgewerkt in lichtgrijs.' },
      { titel:'Afwerking & oplevering', beschrijving:'Sanitair gemonteerd, silicone aangebracht, alles schoongemaakt. Klant rondgeleid en instructie gegeven over onderhoud.' }
    ],
    materialen: ['Tegels 60×120 cm','Inloopdouche','Thermostaatkraan','Vloerverwarming','LED-spiegel','PUR-schuim']
  },

  veranda: {
    titel:    'Houten tuinhuis',
    datum:    '2024',
    tags:     [{ label:'Hout', cls:'orange' }, { label:'Buiten', cls:'green' }],
    headerBg: 'linear-gradient(135deg,#7A5A38 0%,#3A2A12 100%)',
    uitleg:   'Een houten tuinhuis plaatsen met een overkapping op een betonnenplaat en een eigen vloer.',
    fotos: [
      '2.0MateriaalTuinHuis.jpeg',
      '2.0BasisTuinHuis.jpeg',
      '2.0BasisTuinHuis2.jpeg',
      '2.0MortelLeggen.jpeg',
      '2.0Vloer leggen.jpeg',
      '2.0MainPlanken.jpeg',
      '2.0deurTuinHUIS.jpeg',
      '2.0DeurZetten.jpeg',
      '2.0BezigPlankenZetten.jpeg',
      '2.0BezigDak.jpeg',
      '2.0EindeDak.jpeg',
      '2.0werkenAanDakTerras.jpeg',
      '2.0Bezig met blauwe smurrie.jpeg',
      '2.0VloerLeggenBlauweSmurie.jpeg',
      '2.0VloerMortel.jpeg',
      '2.0VloerLeggenBinnen.jpeg',
      '2.0VloerLeggenBinnen2.jpeg',
      '2.0EindeVloer.jpeg',
      '2.0EindeVloer2.jpeg',
      '2.0regendak.jpeg',
      '2.0Watersysteem.jpeg',
      '2.0Watersysteem2.jpeg',
      '2.0Watersysteem3.jpeg'
    ],
    stappen: [
      { titel:'Ontwerp & tekening',     },
      { titel:'Fundatiepunten stellen', },
      { titel:'Draagconstructie',     },
      { titel:'Dakbeschot & LED',       },
      { titel:'Plantenbakken & finish',  }
    ],
    materialen: ['Beton','Tegels','Hout','Waterpas']
  },

  schilderwerk: {
    titel:    'Omheining tand & groef',
    datum:    '2026',
    tags:     [{ label:'Hout', cls:'orange' }, { label:'Buiten', cls:'green' }, { label:'Omheining', cls:'amber' }],
    headerBg: 'linear-gradient(135deg,#A04820 0%,#501808 100%)',
    uitleg:   'Het plaatsen van een omheining van 24 meter. Het materiaal bestond uit betonnen palen en platen en houten planken die via tand en groef in elkaar gingen. Dit werkje nam veel tijd en krackt in beslag. De palen waren loodzwaar en het was een precisiewerkje.',
    fotos: [
      'the bg.jpeg',
      'heg knippen.jpeg',
      'Video afbreken.mp4',
      'FotoMeten.jpeg',
      'brommer.jpeg',
      'VideoBrommer.mp4',
      'gat.jpeg',
      'VideoPetriet.mp4',
      'paaltje.jpeg',
      'fotopaal.jpeg',
      'gorilla.jpeg',
      'klied.jpeg',
      'hoekpas.jpeg',
      'FotoPlankenInslaan.jpeg',
      '67.jpeg',
      'patriot.jpeg',
      '2.0.jpeg',
      'bg1.jpeg',
      '30.jpeg',
      'hek1.jpeg',
      'palen.jpeg',
      'Foto1.jpeg',
      'khalidhek.jpeg',
      '3.jpeg',
      'einde.jpeg'
    ],
    stappen: [
      { titel:'De haag inkorten', beschrijving:'De haag inkorten zodat de omheining er kon staan.' },
      { titel:'Touwtje',      beschrijving:'Een touwtje binden van ene naar andere kant aan de hand van een laser.' },
      { titel:'Afbraakwerken',   beschrijving:'De oude omheining afbreken met de Arebos. Alles moest eruit.' },
      { titel:'Gaten boren', beschrijving:'Gaten maken met de boormachine en veel problemen met de wortels uithalen.' },
      { titel:'Plaaten van betonpaal en plaat',  beschrijving:'De paal en plaat doot het huis naar de tuin brengen en dan op de juiste plaats installeren.' },
      { titel:'Waterpas zetten en controleren met waterpas',  beschrijving:'Met een paal en gewone waterpas alles controleren.' },
      { titel:'Waterpas en laten drogen',  beschrijving:'Met een zak turbobeton de paal vastzetten en alles controleren met de waterpas.' },
      { titel:'Opvullen met planken',  beschrijving:'13 planken per paneel erin kloppen.' },
      { titel:'12 keer opnieuw',  beschrijving:'Dit bovenstaand proces 12 keer herhalen.' },
      { titel:'Laatste paneel',  beschrijving:'Bij het laatste paneel moesten de onderdelen ingekort worden.' }
    ],
    materialen: ['12 betonpalen','12 betonplaten','12 keer 13 houten planken','12 zakken turbobeton']
  },

  tuinmuur: {
    titel:    'Tuinmuur met houten poort',
    datum:    '9 februari 2024',
    tags:     [{ label:'Metselwerk', cls:'orange' }, { label:'Tuin', cls:'green' }],
    headerBg: 'linear-gradient(135deg,#7A5A38 0%,#3A2010 100%)',
    uitleg:   'Verwaarloosde hoektuin in Amstelveen omgetoverd met een strakke bakstenen muur van 80 cm hoog en 32 meter lengte. Bijzondere uitdaging: het niveau liep 12 cm op. Poort van 180×120 cm getimmerd in thermisch gemodificeerd accoyahout met roestvaststalen beslag. Klaar in 6 werkdagen.',
    fotos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=960&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=960&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=960&q=80',
      'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=960&q=80',
      'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=960&q=80'
    ],
    stappen: [
      { titel:'Uitgraven & fundering',  beschrijving:'Fundering 40 cm diep uitgegraven, gewapend betonnet gelegd en gestort. Extra aandacht voor het niveauverschil van 12 cm.' },
      { titel:'Metselwerk',             beschrijving:'Gevelstenen gemetseld op cementspecie, waterpassend en loodrecht. Voegen net afgewerkt in dezelfde kleur als de bestaande gevel.' },
      { titel:'Poort timmeren',         beschrijving:'Accoyahout op maat gezaagd en gefreesd voor sponning. Constructie verlijmd en gebout met RVS slotbouten.' },
      { titel:'Beslag & scharnieren',   beschrijving:'Zwarte RVS grendels, scharnieren en slotplaat gemonteerd. Poort nauwkeurig afgesteld voor soepele werking.' },
      { titel:'Afwerking tuin',         beschrijving:'Muur afgewerkt met waterwerende dakstenen. Grond aangevuld en vlakgeharkt. Beplantingszone langs de muur aangelegd.' }
    ],
    materialen: ['Gevelstenen WDF','Accoyahout 28mm','RVS beslag','Cementspecie','Bewapeningsnetten','Dakstenen']
  },

  kozijnen: {
    titel:    'Houten balustrade',
    datum:    '2022',
    tags:     [{ label:'Hout', cls:'orange' }, { label:'Binnen', cls:'red' }],
    headerBg: 'linear-gradient(135deg,#3A6040 0%,#1A3020 100%)',
    uitleg:   'Het maken van een houten balustrade op de zolder voor de veiligheid van de kinderen, dit zonder plan en eigengekozen materiaal.',
    fotos: [
      '0.5Onderdelen2.jpeg',
      '0.5Onderdelen.jpeg',
      '0.5Stuk1NietGemonteerd.jpeg',
      '0.5Waterpas.jpeg', 
      '0.5Stuk1.jpeg',
      '0.5Einde3.jpeg',
      '0.5Einde.jpeg',
      '0.5Eindemetpoort.jpeg',
      '0.5Einde2.jpeg',
    ],
    stappen: [
      { titel:'Planken op maat zagen',     },
      { titel:'Kader bouwen',          },
      { titel:'Planken tussenzetten',    },
      { titel:'Meten en alles juist plaatsen', },
      { titel:'Vastzetten en waterpas', }
    ],
    materialen: ['Hout voor kader','Hout voor planken','Vijzen','Waterpas']
  },

elektriciteit: {
    titel:    'boem',
    datum:    '2022',
    tags:     [{ label:'Hout', cls:'orange' }, { label:'Binnen', cls:'red' }],
    headerBg: 'linear-gradient(135deg,#3A6040 0%,#1A3020 100%)',
    uitleg:   'Het maken van een houten balustrade op de zolder voor de veiligheid van de kinderen, dit zonder plan en eigengekozen materiaal.',
    fotos: [
      '0.5Einde.jpeg',
      '0.5Einde2.jpeg',
      '0.5Einde3.jpeg',
      '0.5Eindemetpoort.jpeg',
      '0.5Onderdelen.jpeg',
      '0.5Onderdelen2.jpeg',
      '0.5Stuk1.jpeg',
      '0.5Stuk1NietGemonteerd.jpeg',
      '0.5Waterpas.jpeg'
    ],
    stappen: [
      { titel:'Planken op maat zagen',     },
      { titel:'Kader bouwen',          },
      { titel:'Planken tussenzetten',    },
      { titel:'Meten en alles juist plaatsen', },
      { titel:'Vastzetten en waterpas', }
    ],
    materialen: ['Hout voor kader','Hout voor planken','Vijzen','Waterpas']
  },

    toilet: {
    titel:    'Een volledig nieuw toilet',
    datum:    '2023',
    tags:     [{ label:'Sainitair', cls:'blue' }, { label:'Binnen', cls:'red' }],
    headerBg: 'linear-gradient(135deg,#3A6040 0%,#1A3020 100%)',
    uitleg:   'Het renoveren van een bestaand toilet, nieuwe gangwc, tegeltjes en vloer.',
    fotos: [
      '7.0Demonteren3.0.jpeg',
      '7.0Demonteren4.jpeg',
      '7.0Demonteren5.jpeg',
      '7.0Demonteren2.jpeg',
      '7.0Demonteren.jpeg',
      '7.0bezig.jpeg',
      '7.0WaterpasMonteren.jpeg',
      '7.0Monteren.jpeg',
      '7.0Monteren2.jpeg',
      '7.0toiletWeg.jpeg',
      '7.0toiletGroen.jpeg',
      '7.0Toilet.jpeg',
      '7.0Videos.mp4',
      '7.0BezigKiezelSteentjes.jpeg',
      '7.0EindeKiezelSteentjes.jpeg',
      '7.0Isimo.jpeg',
      '7.0eindresultaat.jpeg'
    ],
    stappen: [
      { titel:'Planken op maat zagen',     },
      { titel:'Kader bouwen',          },
      { titel:'Planken tussenzetten',    },
      { titel:'Meten en alles juist plaatsen', },
      { titel:'Vastzetten en waterpas', }
    ],
    materialen: ['Toilet','Parket','Mozaïkstenen','Waterpas']
  }
};


/* ═══════════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════════ */
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. COOKIE POPUP ── */
  const cookiePopup   = document.getElementById('cookie-popup');
  const cookieOverlay = document.getElementById('cookie-overlay');
  const COOKIE_KEY    = 'daanklust_cookie_consent';

  if (!localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => {
      cookieOverlay.classList.add('visible');
      setTimeout(() => cookiePopup.classList.add('visible'), 50);
    }, 700);
  }

  function hideCookie(decision) {
    localStorage.setItem(COOKIE_KEY, decision);
    cookiePopup.classList.remove('visible');
    cookieOverlay.classList.remove('visible');
  }

  document.getElementById('cookie-accept').addEventListener('click',  () => hideCookie('accepted'));
  document.getElementById('cookie-decline').addEventListener('click', () => hideCookie('declined'));


  /* ── 2. NAVBAR ── */
  const navbar     = document.getElementById('navbar');
  const navAnchors = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');

  function updateNav() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    const y = window.scrollY + navbar.offsetHeight + 40;
    let current = '';
    sections.forEach(s => { if (y >= s.offsetTop) current = s.id; });
    navAnchors.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`)
    );
  }
  window.addEventListener('scroll', updateNav, { passive:true });
  updateNav();


  /* ── 3. HAMBURGER MENU ── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );


  /* ── 4. SMOOTH SCROLL (navbar compensatie) ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8,
        behavior:'smooth'
      });
    });
  });


  /* ── 5. PROJECT MODAL ── */
  const modal      = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const backdrop   = document.getElementById('modal-backdrop');

  let galleryImages = [];
  let galleryIndex  = 0;

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click',   () => openModal(card.dataset.project));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.project); }
    });
  });

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click',   closeModal);
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  changePhoto(-1);
    if (e.key === 'ArrowRight') changePhoto(+1);
  });

  document.getElementById('gallery-prev').addEventListener('click', () => changePhoto(-1));
  document.getElementById('gallery-next').addEventListener('click', () => changePhoto(+1));

  function openModal(id) {
    const data = PROJECTS[id];
    if (!data) return;
    fillModal(data);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-panel').scrollTop = 0;
    setTimeout(() => modalClose.focus(), 200);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function fillModal(data) {
    /* Header */
    const header = document.getElementById('modal-header');
    const glow   = document.getElementById('modal-header-glow');
    header.style.background = data.headerBg;
    glow.style.background   = data.headerBg;

    /* Tags */
    document.getElementById('modal-tag-row').innerHTML = data.tags
      .map(t => `<span class="modal-chip modal-chip--${t.cls}">${esc(t.label)}</span>`)
      .join('');

    document.getElementById('modal-title').textContent = data.titel;
    document.getElementById('modal-date').textContent  = `📅 ${data.datum}`;

    /* Fotogalerij opbouwen */
    galleryImages = data.fotos;
    galleryIndex  = 0;
    renderGallery();

    /* Beschrijving */
    document.getElementById('modal-desc').innerHTML =
      data.uitleg.split('\n').map(p => `<p>${esc(p)}</p>`).join('');

    /* Materialen */
    document.getElementById('modal-materials').innerHTML =
      data.materialen.map(m => `<span class="tag tag--orange">${esc(m)}</span>`).join('');



    /* Stappen */
    document.getElementById('modal-steps').innerHTML = data.stappen
      .map(s => `<li>
        <div class="step-title">${esc(s.titel)}</div>
        <div class="step-desc">${esc(s.beschrijving)}</div>
      </li>`)
      .join('');
  }

  /* ── Galerij helpers ── */
  function isVideo(src) {
    return /\.(mp4|webm|ogg|mov)$/i.test(src);
  }

  function showMediaItem(src) {
    const mainImg   = document.getElementById('gallery-main-img');
    const mainVideo = document.getElementById('gallery-main-video');

    if (isVideo(src)) {
      mainImg.style.display = 'none';
      mainVideo.style.display = 'block';
      mainVideo.src = src;
      mainVideo.load();
    } else {
      mainVideo.style.display = 'none';
      mainVideo.pause();
      mainVideo.src = '';
      mainImg.style.display = 'block';
      mainImg.src = src;
      mainImg.alt = `Foto ${galleryIndex + 1}`;
    }
  }

  function renderGallery() {
    const thumbsEl  = document.getElementById('gallery-thumbs');
    const counter   = document.getElementById('gallery-counter');

    // Hoofdfoto of video
    showMediaItem(galleryImages[galleryIndex]);
    counter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;

    // Thumbnails
    thumbsEl.innerHTML = '';
    galleryImages.forEach((src, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (i === galleryIndex ? ' active' : '');
      if (isVideo(src)) {
        thumb.innerHTML = `<span class="video-thumb-icon">▶</span>`;
      } else {
        thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${i+1}" loading="lazy" />`;
      }
      thumb.addEventListener('click', () => { galleryIndex = i; refreshGallery(); });
      thumbsEl.appendChild(thumb);
    });

    // Pijlen tonen/verbergen
    const showArrows = galleryImages.length > 1;
    document.getElementById('gallery-prev').style.display = showArrows ? 'flex' : 'none';
    document.getElementById('gallery-next').style.display = showArrows ? 'flex' : 'none';
  }

  function refreshGallery() {
    const mainImg  = document.getElementById('gallery-main-img');
    const counter  = document.getElementById('gallery-counter');
    const thumbs   = document.querySelectorAll('.gallery-thumb');
    const src      = galleryImages[galleryIndex];

    if (isVideo(src)) {
      showMediaItem(src);
    } else {
      mainImg.classList.add('fading');
      setTimeout(() => {
        showMediaItem(src);
        mainImg.classList.remove('fading');
      }, 200);
    }

    counter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === galleryIndex));
  }

  function changePhoto(dir) {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex + dir + galleryImages.length) % galleryImages.length;
    refreshGallery();
  }


  /* ── 6. STERREN-RATING ── */
  const stars     = document.querySelectorAll('.star');
  const starLabel = document.getElementById('star-label');
  let selected    = 0;
  const labels    = ['','Slecht','Matig','Goed','Heel goed','Uitstekend!'];

  function highlight(v) {
    stars.forEach(s => s.classList.toggle('active', +s.dataset.value <= v));
  }
  stars.forEach(s => {
    s.addEventListener('mouseenter', () => { highlight(+s.dataset.value); starLabel.textContent = labels[+s.dataset.value]; });
    s.addEventListener('mouseleave', () => { highlight(selected); starLabel.textContent = selected ? labels[selected] : 'Kies een beoordeling'; });
    s.addEventListener('click',      () => { selected = +s.dataset.value; highlight(selected); starLabel.textContent = labels[selected]; });
  });


  /* ── 7. REVIEW FORMULIER (localStorage) ── */
  const reviewsCont = document.getElementById('reviews-container');
  const formMsg     = document.getElementById('form-message');

  loadReviews();

  document.getElementById('submit-review').addEventListener('click', () => {
    const name = document.getElementById('reviewer-name').value.trim();
    const text = document.getElementById('reviewer-text').value.trim();
    if (!name)          { msg('⚠️ Vul uw naam in.',              false); return; }
    if (!selected)      { msg('⚠️ Kies een beoordeling.',        false); return; }
    if (text.length<15) { msg('⚠️ Schrijf minimaal 15 tekens.', false); return; }

    const review = {
      name, text, rating: selected,
      date: new Date().toLocaleDateString('nl-NL',{ month:'long', year:'numeric' })
    };
    const all = JSON.parse(localStorage.getItem('daanklust_reviews')||'[]');
    all.push(review);
    localStorage.setItem('daanklust_reviews', JSON.stringify(all));
    addReviewCard(review, true);

    document.getElementById('reviewer-name').value = '';
    document.getElementById('reviewer-text').value = '';
    selected = 0; highlight(0); starLabel.textContent = 'Kies een beoordeling';
    msg('✅ Bedankt! Uw review is geplaatst.', true);
  });

  function addReviewCard(r, isNew) {
    const div = document.createElement('div');
    div.className = 'review-card' + (isNew ? ' new-review' : '');
    if (isNew) { div.style.opacity='0'; div.style.transform='translateY(16px)'; div.style.transition='opacity .5s,transform .5s' }
    div.innerHTML = `
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <p class="review-text">"${esc(r.text)}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.name.charAt(0).toUpperCase()}</div>
        <div><strong>${esc(r.name)}</strong><span>${esc(r.date)}</span></div>
      </div>`;
    reviewsCont.appendChild(div);
    if (isNew) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        div.style.opacity='1'; div.style.transform='translateY(0)';
      }));
      setTimeout(() => div.scrollIntoView({ behavior:'smooth', block:'nearest' }), 300);
    }
  }

  function loadReviews() {
    JSON.parse(localStorage.getItem('daanklust_reviews')||'[]').forEach(r => addReviewCard(r,false));
  }

  function msg(txt, ok) {
    formMsg.textContent = txt;
    formMsg.style.color = ok ? 'var(--amber)' : '#ff7070';
    clearTimeout(msg._t);
    msg._t = setTimeout(() => { formMsg.textContent='' }, 4000);
  }


  /* ── 8. SCROLL REVEAL ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in-view'), i * 70);
        io.unobserve(e.target);
      }
    });
  }, { threshold:0.1 });

  document.querySelectorAll('.project-card, .review-card, .about-container, .contact-wrap')
    .forEach(el => { el.classList.add('reveal'); io.observe(el); });

});
