/* =========================================================
   Lissandra Bassi — scripts do site
   ---------------------------------------------------------
   TODOS OS DADOS EDITÁVEIS FICAM NO OBJETO CONFIG ABAIXO.
   Para ver as pendências marcadas na página, abra o endereço
   com ?dev no final (ex.: workshop/index.html?dev).
   ========================================================= */

const CONFIG = {
  produto: "Mapa da Conversa que se Repete",
  preco: "R$ 197",
  precoPorPessoa: "R$ 98,50",          // 197 ÷ 2 — usado só na oferta
  data: "domingo, 1º de novembro de 2026",
  dataCurta: "domingo, 1º/11",
  dataFechamento: "Domingo, 1º de novembro",
  horario: "19h",
  prazoInscricao: "quinta-feira, 29 de outubro",
  prazoInscricaoCurto: "quinta, 29/10",
  prazoISO: "2026-10-29T23:59:00-03:00", // [PENDENTE] confirmar horário-limite
  prazoConfirmado: false,                // mude para true quando o horário-limite for confirmado (liga o contador)
  duracao: "2 horas",
  vagas: 8,
  minimoCasais: 4,
  checkoutUrl: "#CHECKOUT-PENDENTE",     // [PENDENTE] cole aqui o link do checkout
  gravacaoUrl: null,                     // [PENDENTE] — se null, não exibe link
  livro: { titulo: "Casal de Verdade", autora: "Lissandra Bassi", formato: null }, // [PENDENTE] formato
  plataforma: null,                      // [PENDENTE] Zoom/Meet etc. — se null, a pergunta fica oculta

  whatsapp: "5511963051717",
  msgInscricao: "Oi Lissandra! Quero garantir nossa vaga no workshop Mapa da Conversa que se Repete (domingo, 1º/11, às 19h).",
  msgAtendimento: "Oi Lissandra! Vim pelo site e gostaria de agendar uma conversa sobre o acompanhamento terapêutico.",

  // Depoimentos REAIS, com autorização por escrito.
  // Se o array estiver vazio, a seção de depoimentos NÃO aparece na página.
  // Avaliações públicas do Google (texto literal). [PENDENTE] confirmar autorização de uso do nome.
  depoimentos: [
    // { texto: "...", nome: "Nome e sobrenome ou iniciais autorizadas", fonte: "google" | "whatsapp" | "formulario", estrelas: 5 | null }
    {
      nome: "Giovanna Gontijo", fonte: "google", estrelas: 5, imagem: "giovanna-gontijo.png",
      texto: "Sempre achamos que nosso maior problema eram as brigas do dia a dia, mas na terapia percebemos que o verdadeiro gatilho era o dinheiro. Cada decisão financeira gerava discussão – economizar ou gastar, investir ou segurar, quem pagava o quê… parecia que nunca estávamos no mesmo time. A Liss nos ajudou a enxergar que finanças no casamento não são sobre números, mas sobre valores, segurança e expectativas. Aprendemos a conversar sem acusações, a criar um planejamento que respeitasse as necessidades dos dois e, o mais importante, a confiar um no outro. Hoje, nossas discussões financeiras viraram planos – e isso fez toda a diferença!"
    },
    {
      nome: "Sergio Alves", fonte: "google", estrelas: 5, imagem: "sergio-alves.png",
      texto: "Na terapia, entendemos que cada um sente e percebe as coisas de um jeito diferente e que reconhecer isso não significa perder ou ceder, mas sim respeitar a experiência do outro sem se sentir atacado. Hoje em dia eu e minha esposa conseguimos conversar sem desmerecer o que o outro sente, e isso fez toda a diferença para nossa conexão."
    },
    {
      nome: "Carlos Eduardo", fonte: "google", estrelas: 5, imagem: "carlos-eduardo.png",
      texto: "Sempre tivemos dificuldades em impor limites para nossos pais quando o assunto era a criação dos nossos filhos. O que começava como um “conselho” dos avós logo virava um conflito entre nós dois. Eu achava que ela defendia demais a família dela, ela achava que eu dava mais ouvidos para a minha, e no meio disso tudo, esquecíamos que a prioridade era a educação dos nossos filhos.A terapia nos ajudou a nos unir como um time, a criar acordos claros e a entender que os avós têm um papel importante, mas quem decide somos nós. Hoje, conseguimos lidar com opiniões externas sem que isso gere brigas entre a gente. Foi um aprendizado essencial para termos mais paz na nossa família."
    },
    {
      nome: "Marcos Cezar", fonte: "google", estrelas: 5, imagem: "marcos-cezar.png",
      texto: "A terapeuta Lissandra é maravilhosa. Eu e minha esposa conseguimos restabelecer o convívio, a parceria e aprender muito durante a terapia. Sem o auxílio dela, estaríamos separados! Tem coisas que só quem está de fora e tenha conhecimento para auxiliar. Além de trazer um conhecimento incrível, a escuta sempre atenta e uma experiência vasta com casais, ela oferece sugestões de ações, de combinados e diversas outras possibilidades para os gatilhos que criamos durante a vida - e que geralmente são as causadoras das desavenças. Recomendo muito!!"
    },
    {
      nome: "Patrícia Koizumi", fonte: "google", estrelas: 5, imagem: "patricia-koizumi.png",
      texto: "Lissandra é uma excelente profissional, humanizada e dedicada muito acolhedora, eu e meu marido estamos fazendo terapia para casal e estamos gostando muito, já colhemos muitas mudanças em nosso relacionamento.\n\nHoje dia 16/10/2024 volto aqui após 18 meses de tratamento eu e meu marido fizemos com a Dra Lissandra Bassi,  pra confirmar as primeiras avaliações que eu fiz, tivemos alta da terapia de casal estamos muito bem, Lissandra é maravilhosa nos ajudou muito e só tenho a agradecer, não só a profissional excelente que é, mas também por toda empatia e sensibilidade que tem! Gratidão"
    }
  ]
};

(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function wa(msg) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- Dados nos textos ---------- */
  var values = {
    produto: CONFIG.produto,
    preco: CONFIG.preco,
    precoPorPessoa: CONFIG.precoPorPessoa,
    dataCurta: CONFIG.dataCurta,
    dataCap: cap(CONFIG.data),
    dataFechamento: CONFIG.dataFechamento,
    horario: CONFIG.horario,
    prazoInscricaoCurto: CONFIG.prazoInscricaoCurto,
    duracao: CONFIG.duracao,
    vagas: String(CONFIG.vagas),
    minimoCasais: String(CONFIG.minimoCasais),
    plataforma: CONFIG.plataforma || ""
  };
  $$("[data-config]").forEach(function (el) {
    var v = values[el.getAttribute("data-config")];
    if (v) el.textContent = v;
  });

  if (/[?&]dev\b/.test(location.search)) document.body.classList.add("show-pending");
  if (/[?&]shot\b/.test(location.search)) document.documentElement.classList.add("shot");

  /* ---------- Links ---------- */
  var checkoutOk = CONFIG.checkoutUrl && CONFIG.checkoutUrl.indexOf("#CHECKOUT") !== 0;
  $$("[data-checkout]").forEach(function (el) {
    // Enquanto o checkout estiver pendente, o botão abre o WhatsApp com a mensagem de inscrição.
    el.href = checkoutOk ? CONFIG.checkoutUrl : wa(CONFIG.msgInscricao);
    el.target = "_blank";
    el.rel = "noopener";
  });
  if (checkoutOk) $$("[data-cta]").forEach(function (el) { el.href = CONFIG.checkoutUrl; });
  $$("[data-whatsapp]").forEach(function (el) {
    el.href = wa(CONFIG.msgAtendimento);
    el.target = "_blank";
    el.rel = "noopener";
  });
  if (CONFIG.gravacaoUrl) {
    var g = $("[data-gravacao]");
    if (g) { g.hidden = false; $("[data-gravacao-link]").href = CONFIG.gravacaoUrl; }
  }
  if (CONFIG.plataforma) { var pl = $("[data-plataforma]"); if (pl) pl.hidden = false; }

  /* ---------- Faixas diagonais ---------- */
  var bandText = [CONFIG.produto, "1º de novembro", CONFIG.horario, "Ao vivo", "Até " + CONFIG.vagas + " casais"];
  $$("[data-band]").forEach(function (track) {
    var html = "";
    for (var r = 0; r < 4; r++) bandText.forEach(function (t) { html += "<span>" + t + " ✦</span>"; });
    track.innerHTML = html + html;
  });

  /* ---------- Contador (só com prazo confirmado) ---------- */
  var cd = $("[data-countdown]");
  if (cd && CONFIG.prazoConfirmado && CONFIG.prazoISO) {
    var days = Math.ceil((new Date(CONFIG.prazoISO) - new Date()) / 86400000);
    if (days > 0) { cd.textContent = "Faltam " + days + (days === 1 ? " dia" : " dias") + " para o fim das inscrições."; cd.hidden = false; }
  }

  /* ---------- FAQ (acordeão acessível) ---------- */
  $$("[data-faq] .faq__item").forEach(function (item, i) {
    var btn = $(".faq__btn", item), panel = $(".faq__a", item);
    var id = "faq-a-" + i;
    panel.id = id;
    btn.setAttribute("aria-controls", id);
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      item.classList.toggle("is-open", !open);
      setTimeout(function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); }, 500);
    });
  });

  /* ---------- Depoimentos ---------- */
  var tSec = $("#depoimentos");
  var list = CONFIG.depoimentos || [];
  if (tSec && list.length) {
    var track = $("[data-track]", tSec), dots = $("[data-dots]", tSec), carousel = $("[data-carousel]", tSec);
    list.forEach(function (d) {
      var card = document.createElement("figure");
      card.className = "testi";
      // Print da avaliação (imagem). O texto completo vai no alt.
      if (d.imagem) {
        card.classList.add("testi--print");
        var im = document.createElement("img");
        im.src = "../images/depoimentos/" + d.imagem;
        im.loading = "lazy";
        im.decoding = "async";
        im.alt = "Avaliação de " + d.nome + " no Google, 5 estrelas: " + d.texto.replace(/\s+/g, " ");
        card.appendChild(im);
        track.appendChild(card);
        return;
      }
      var top = document.createElement("div");
      top.className = "testi__top";
      if (d.fonte === "google") {
        top.innerHTML = '<svg viewBox="0 0 24 24" aria-label="Avaliação no Google"><path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.96S8.78 6.26 12 6.26c1.83 0 3.06.78 3.76 1.45l2.57-2.47C16.68 3.7 14.55 2.8 12 2.8 6.92 2.8 2.8 6.92 2.8 12s4.12 9.2 9.2 9.2c5.31 0 8.83-3.73 8.83-8.99 0-.6-.07-1.06-.15-1.51z"/></svg>';
        if (d.estrelas) {
          var st = document.createElement("span");
          st.className = "testi__stars";
          st.setAttribute("aria-label", d.estrelas + " de 5 estrelas");
          st.textContent = "★★★★★".slice(0, d.estrelas);
          top.appendChild(st);
        }
      } else {
        top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><use href="#i-quote"/></svg>';
      }
      var q = document.createElement("blockquote");
      q.textContent = "“" + d.texto + "”";
      var who = document.createElement("figcaption");
      who.className = "testi__who";
      var av = document.createElement("span");
      av.className = "testi__avatar";
      av.setAttribute("aria-hidden", "true");
      av.textContent = d.nome.split(/\s+/).map(function (p) { return p.charAt(0); }).slice(0, 2).join("").toUpperCase();
      var nm = document.createElement("span");
      nm.textContent = d.nome;
      var src = document.createElement("span");
      src.className = "testi__src";
      src.textContent = { google: "Avaliação no Google", whatsapp: "Mensagem no WhatsApp", formulario: "Formulário" }[d.fonte] || "";
      nm.appendChild(src);
      who.appendChild(av);
      who.appendChild(nm);
      card.appendChild(top);
      card.appendChild(q);
      card.appendChild(who);
      track.appendChild(card);
    });
    if (list.length < 3) {
      carousel.classList.add("carousel--static");
    } else {
      var cards = $$(".testi", track);
      cards.forEach(function (c, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Ir para o depoimento " + (i + 1));
        b.addEventListener("click", function () { track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: "smooth" }); });
        dots.appendChild(b);
      });
      var step = function () { return cards[0].getBoundingClientRect().width + 20; };
      $("[data-prev]", tSec).addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
      $("[data-next]", tSec).addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
      var sync = function () {
        var i = Math.round(track.scrollLeft / step());
        $$("button", dots).forEach(function (b, k) { b.setAttribute("aria-current", String(k === i)); });
      };
      track.addEventListener("scroll", sync, { passive: true });
      sync();
    }
    tSec.hidden = false;
  }

  /* ---------- Header e barra fixa mobile ---------- */
  var header = $(".site-header");
  var mbar = $("[data-mbar]");
  var hero = $("[data-hero]") || $(".home-hero");
  var offer = $("#oferta");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-solid", y > 40);
    if (mbar && hero) {
      var past = hero.getBoundingClientRect().bottom < 0;
      var r = offer ? offer.getBoundingClientRect() : null;
      var atOffer = r && r.top < window.innerHeight && r.bottom > 0;
      mbar.classList.toggle("is-visible", past && !atOffer);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* =======================================================
     ANIMAÇÕES (GSAP + ScrollTrigger + Lenis)
     Sem as bibliotecas ou com "reduzir movimento", tudo
     aparece normalmente, sem animação.
     ======================================================= */
  function splitWords(el) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "w";
            var i = document.createElement("span"); i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    };
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    walk(el);
    $$(".w", el).forEach(function (w) { w.setAttribute("aria-hidden", "true"); });
  }

  function initAnimations() {
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("js-anim");

    // Rolagem suave
    var lenis = null;
    if (window.Lenis) {
      lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(t, { offset: -60, duration: 1.4 });
        else t.scrollIntoView({ behavior: "smooth" });
      });
    });

    $$("[data-split]").forEach(splitWords);

    // Hero: entrada orquestrada
    var heroEl = $("[data-hero]");
    if (heroEl) {
      var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".ws-hero__video", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0)
        .from(".ws-hero .pill", { y: 24, opacity: 0, duration: .9 }, .25)
        .from(".ws-hero h1 .w > span", { yPercent: 115, rotate: 4, duration: 1.15, stagger: .055 }, .4)
        .from(".ws-hero .actions, .ws-hero .micro", { y: 24, opacity: 0, duration: .9, stagger: .12 }, "-=.55")
        .from(".scroll-cue", { opacity: 0, duration: .8 }, "-=.3");
      gsap.to(".ws-hero__content", { yPercent: -22, opacity: 0, ease: "none", scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ws-hero__video", { scale: 1.12, ease: "none", scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: true } });
    }

    // Home: entrada
    if ($(".home-hero")) {
      var th = gsap.timeline({ defaults: { ease: "power3.out" } });
      th.from(".home-hero__bg img", { scale: 1.12, duration: 2.4, ease: "power2.out" }, 0)
        .from(".home-hero h1 .w > span", { yPercent: 115, duration: 1.1, stagger: .045 }, .3)
        .from(".home-hero [data-hero-item]", { y: 24, opacity: 0, duration: .9, stagger: .12 }, "-=.6");
    }

    // Revelações genéricas (cada tipo entra de um jeito)
    var FROM = {
      up: { y: 60, opacity: 0 },
      left: { x: -80, opacity: 0 },
      right: { x: 80, opacity: 0 },
      scale: { scale: .9, opacity: 0, y: 30 },
      clip: { clipPath: "inset(100% 0% 0% 0% round 28px)" }
    };
    var SELF = /^(P|H1|H2|H3|LI|A|IMG)$/;
    $$("[data-reveal]").forEach(function (el) {
      var type = el.getAttribute("data-reveal");
      var vars = Object.assign({}, FROM[type] || FROM.up);
      var targets = (type === "clip" || type === "scale" || SELF.test(el.tagName) || el.children.length < 2) ? [el] : Array.prototype.slice.call(el.children);
      Object.assign(vars, {
        duration: type === "clip" ? 1.4 : 1.1,
        ease: type === "clip" ? "power4.inOut" : "power3.out",
        stagger: .11,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start: "top 84%", once: true }
      });
      if (type === "clip") vars.clipPath = "inset(100% 0% 0% 0% round 28px)";
      gsap.from(targets, vars);
    });

    // Grupo de cartões (objeções)
    $$("[data-reveal-group]").forEach(function (el) {
      gsap.from(el.children, { y: 70, opacity: 0, rotate: 1.5, duration: 1, ease: "power3.out", stagger: .14, clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
    });

    // Cenas: as falas aparecem como um diálogo
    $$("[data-scene]").forEach(function (card, i) {
      var lines = $$(".scene__lines li", card);
      var t = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } });
      t.from(card, { y: 90, opacity: 0, duration: 1.1, ease: "power3.out", delay: (i % 3) * .14 })
        .from($(".scene__head", card), { y: 12, opacity: 0, duration: .6, ease: "power2.out" }, "-=.6")
        .from($(".scene__num", card), { y: 30, opacity: 0, duration: .9, ease: "power3.out" }, "<")
        .from(lines, {
          opacity: 0,
          x: function (k, el) { return el.classList.contains("l") ? -26 : el.classList.contains("r") ? 26 : 0; },
          y: function (k, el) { return el.classList.contains("hears") ? 10 : 0; },
          duration: .7, ease: "power2.out", stagger: .34
        }, "-=.3");
    });

    // Palavras gigantes deslizando com a rolagem
    $$("[data-drift]").forEach(function (el) {
      var dir = parseFloat(el.getAttribute("data-drift")) || 1;
      var inPanel = !!el.closest(".panel-giant");
      gsap.set(el, { xPercent: -50, yPercent: inPanel ? -38 : 0 });
      gsap.fromTo(el, { x: -140 * dir }, { x: 140 * dir, ease: "none", scrollTrigger: { trigger: el.closest("section"), start: "top bottom", end: "bottom top", scrub: true } });
    });

    // Fotos em parallax
    $$("[data-parallax]").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -7, scale: 1.14 }, { yPercent: 7, scale: 1.14, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // Mecanismo: cada tentativa entra e é riscada
    $$(".tries li").forEach(function (li, i) {
      gsap.from(li, { x: -50, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 86%", once: true } });
      ScrollTrigger.create({ trigger: li, start: "top 66%", once: true, onEnter: function () { setTimeout(function () { li.classList.add("is-struck"); }, 250); } });
    });

    // Método: quadrados e selo
    var sq = $("[data-squares]");
    if (sq) {
      var ts = gsap.timeline({ scrollTrigger: { trigger: sq, start: "top 78%", once: true } });
      ts.from($$(".step__sq", sq), { scale: .55, rotate: -10, opacity: 0, duration: .9, ease: "back.out(1.6)", stagger: .12 })
        .from($(".seal", sq), { scale: 0, rotate: -120, duration: 1.1, ease: "back.out(1.4)" }, "-=.4");
    }
    $$(".pillars__seal-m .seal").forEach(function (s) {
      gsap.from(s, { scale: 0, rotate: -120, duration: 1.1, ease: "back.out(1.4)", scrollTrigger: { trigger: s, start: "top 85%", once: true } });
    });

    // Mapa: as linhas são "escritas" uma a uma
    var sheet = $("[data-map]");
    if (sheet) {
      var tm = gsap.timeline({ scrollTrigger: { trigger: sheet, start: "top 78%", once: true } });
      tm.from(sheet, { y: 70, rotate: 2.5, opacity: 0, duration: 1.1, ease: "power3.out" })
        .from($(".map__tag", sheet), { y: -16, opacity: 0, duration: .6, ease: "power2.out" }, "-=.4")
        .from($$(".map__row dt", sheet), { opacity: 0, x: -14, duration: .5, stagger: .28 }, "-=.2")
        .from($$(".map__row dd", sheet), { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power2.inOut", stagger: .28 }, "<+.1");
    }

    // Selo da oferta
    var offerSeal = $(".offer .seal");
    if (offerSeal) gsap.from(offerSeal, { scale: 0, rotate: -160, duration: 1.2, ease: "back.out(1.5)", scrollTrigger: { trigger: ".offer", start: "top 80%", once: true }, delay: .3 });

    // Fechamento: título palavra por palavra
    $$(".closing h2 .w > span").length && gsap.from(".closing h2 .w > span", { yPercent: 115, duration: 1, ease: "power3.out", stagger: .035, scrollTrigger: { trigger: ".closing h2", start: "top 82%", once: true } });

    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }

  // O script é carregado com "defer": o HTML já está pronto aqui.
  initAnimations();
})();
