"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");
  const positionTabs = document.querySelectorAll(".position-tab");
  const resultLabel = document.getElementById("resultLabel");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const priorityGrid = document.getElementById("priorityGrid");
  const faqItems = document.querySelectorAll(".faq-list details");

  function addSleepExpertMenu() {
    if (!navigation || navigation.querySelector(".nav-group")) return;

    const currentAboutLink = navigation.querySelector('a[href="#about"]');
    if (currentAboutLink) currentAboutLink.remove();

    const sleepExpertMenu = document.createElement("div");
    sleepExpertMenu.className = "nav-group";
    sleepExpertMenu.innerHTML = `
      <button class="nav-parent" type="button" aria-expanded="false" aria-controls="sleepExpertSubmenu">
        <span>Sleep Expert</span>
        <span class="nav-arrow" aria-hidden="true">⌄</span>
      </button>
      <div class="nav-submenu" id="sleepExpertSubmenu">
        <a href="#top" aria-current="page">Home</a>
        <a href="#about">About Your Sleep Expert</a>
      </div>
    `;

    navigation.insertBefore(sleepExpertMenu, navigation.firstElementChild);

    if (!navigation.querySelector('a[href="#research"]')) {
      const researchLink = document.createElement("a");
      researchLink.href = "#research";
      researchLink.textContent = "Sleep Research";
      sleepExpertMenu.insertAdjacentElement("afterend", researchLink);
    }

    const menuStyles = document.createElement("style");
    menuStyles.setAttribute("data-sleep-expert-menu", "");
    menuStyles.textContent = `
      .nav-group {
        position: relative;
        display: flex;
        align-items: center;
      }

      .nav-parent {
        padding: 0;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: var(--navy-900);
        background: transparent;
        border: 0;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
      }

      .nav-parent::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: -8px;
        left: 0;
        height: 2px;
        background: var(--gold);
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.2s ease;
      }

      .nav-parent:hover::after,
      .nav-parent:focus-visible::after,
      .nav-group.submenu-open .nav-parent::after {
        transform: scaleX(1);
      }

      .nav-arrow {
        display: inline-block;
        color: var(--gold);
        font-size: 1rem;
        line-height: 1;
        transition: transform 0.2s ease;
      }

      .nav-group.submenu-open .nav-arrow,
      .nav-group:hover .nav-arrow,
      .nav-group:focus-within .nav-arrow {
        transform: rotate(180deg);
      }

      .nav-submenu {
        position: absolute;
        top: calc(100% + 18px);
        left: 50%;
        z-index: 120;
        min-width: 225px;
        padding: 10px;
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: 14px;
        box-shadow: 0 20px 45px rgba(7, 24, 39, 0.16);
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, 8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      .nav-submenu::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 100%;
        left: 0;
        height: 18px;
      }

      .nav-group:hover .nav-submenu,
      .nav-group:focus-within .nav-submenu,
      .nav-group.submenu-open .nav-submenu {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0);
      }

      .nav .nav-submenu a {
        min-height: 44px;
        padding: 10px 13px;
        display: flex;
        align-items: center;
        color: var(--navy-900);
        border-radius: 9px;
        font-size: 0.78rem;
        white-space: nowrap;
      }

      .nav .nav-submenu a::after {
        display: none;
      }

      .nav .nav-submenu a:hover,
      .nav .nav-submenu a:focus-visible {
        color: var(--navy-950);
        background: rgba(207, 171, 103, 0.16);
      }

      @media (max-width: 1080px) and (min-width: 851px) {
        .nav .nav-submenu a,
        .nav .nav-submenu a:not(.nav-cta) {
          display: flex;
        }
      }

      @media (max-width: 850px) {
        .nav-group {
          width: 100%;
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-parent {
          width: 100%;
          min-height: 61px;
          padding: 0;
          justify-content: space-between;
          color: var(--white);
          font-size: 1rem;
          text-align: left;
        }

        .nav-parent::after {
          display: none;
        }

        .nav-submenu {
          position: static;
          min-width: 0;
          max-height: 0;
          padding: 0;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.045);
          border: 0;
          border-radius: 10px;
          box-shadow: none;
          opacity: 1;
          pointer-events: none;
          transform: none;
          transition: max-height 0.25s ease, margin 0.25s ease;
        }

        .nav-submenu::before {
          display: none;
        }

        .nav-group:hover .nav-submenu,
        .nav-group:focus-within .nav-submenu {
          transform: none;
        }

        .nav-group.submenu-open .nav-submenu {
          max-height: 130px;
          margin-bottom: 10px;
          pointer-events: auto;
          transform: none;
        }

        .nav .nav-submenu a,
        .nav .nav-submenu a:not(.nav-cta) {
          min-height: 52px;
          padding: 0 18px;
          display: flex;
          color: rgba(255, 255, 255, 0.86);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 0;
          font-size: 0.9rem;
          white-space: normal;
        }

        .nav .nav-submenu a:last-child {
          border-bottom: 0;
        }

        .nav .nav-submenu a:hover,
        .nav .nav-submenu a:focus-visible {
          color: var(--gold-light);
          background: rgba(255, 255, 255, 0.06);
        }
      }
    `;

    document.head.appendChild(menuStyles);

    const parentButton = sleepExpertMenu.querySelector(".nav-parent");
    parentButton.addEventListener("click", () => {
      const isOpen = sleepExpertMenu.classList.toggle("submenu-open");
      parentButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!sleepExpertMenu.contains(event.target)) {
        sleepExpertMenu.classList.remove("submenu-open");
        parentButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  function addResearchAndMediaSections() {
    const main = document.querySelector("main");
    const introStrip = document.querySelector(".intro-strip");
    const matchSection = document.getElementById("match");

    if (!main || !introStrip || !matchSection || document.getElementById("research")) return;

    const heroTitle = document.getElementById("hero-title");
    const heroIntro = document.querySelector(".hero-intro");

    if (heroTitle) {
      heroTitle.textContent = "Quality sleep supports recovery, memory, and how you feel every day.";
    }

    if (heroIntro) {
      heroIntro.textContent =
        "Learn how sleep supports healthy brain and body function, then build a personalized sleep environment with the right mattress, adjustable base, pillow, and temperature comfort.";
    }

    const mediaSection = document.createElement("section");
    mediaSection.className = "section sleep-visual-section";
    mediaSection.id = "sleep-education";
    mediaSection.setAttribute("aria-labelledby", "sleep-visual-title");
    mediaSection.innerHTML = `
      <div class="section-heading centered-heading visual-heading">
        <p class="eyebrow">Sleep education that feels human</p>
        <h2 id="sleep-visual-title">Your sleep environment should support the way your body rests.</h2>
        <p>
          Quality sleep is influenced by comfort, support, temperature, light, sound, movement, and positioning.
          The goal is not a one-size-fits-all mattress—it is a complete sleep system designed around the individual.
        </p>
      </div>

      <div class="sleep-photo-grid">
        <article class="sleep-photo-card">
          <img
            src="https://images.pexels.com/photos/6541151/pexels-photo-6541151.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=82"
            alt="A person sleeping peacefully on a supportive pillow in a softly lit bedroom"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
          <div>
            <span>Personal comfort</span>
            <h3>Support should match your sleeping position.</h3>
            <p>Mattress contouring and pillow height work together to support the head, neck, shoulders, hips, and natural spinal alignment.</p>
          </div>
        </article>

        <article class="sleep-photo-card">
          <img
            src="https://images.pexels.com/photos/5990951/pexels-photo-5990951.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=82"
            alt="A couple resting together on a bright bed"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
          <div>
            <span>Couples' sleep</span>
            <h3>Two sleepers may need two different solutions.</h3>
            <p>Motion isolation, edge support, temperature control, mattress size, and independent adjustable positioning can reduce nighttime disruption.</p>
          </div>
        </article>

        <article class="sleep-photo-card">
          <img
            src="https://images.pexels.com/photos/6941126/pexels-photo-6941126.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=82"
            alt="A calm nighttime bedroom with a person resting under white bedding"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
          <div>
            <span>Sleep environment</span>
            <h3>Light, temperature, and bedding affect comfort.</h3>
            <p>A cool, dark, quiet room and breathable bedding can help create conditions that support more continuous and comfortable sleep.</p>
          </div>
        </article>
      </div>

      <div class="sleep-video-grid" aria-label="Sleep video resources">
        <a class="sleep-video-card" href="https://mixkit.co/free-stock-video/woman-falls-asleep-in-her-bed-3213/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://images.pexels.com/photos/6541151/pexels-photo-6541151.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&q=80"
            alt="Preview image for a licensed sleep routine video"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
          <span class="video-play" aria-hidden="true">▶</span>
          <div class="video-copy">
            <small>Licensed lifestyle video · Mixkit</small>
            <h3>A calming bedtime routine</h3>
            <p>Watch a short licensed video showing a person reading, turning off the light, and settling into bed.</p>
          </div>
        </a>

        <a class="sleep-video-card official-video" href="https://www.nhlbi.nih.gov/education/sleep-health/videos" target="_blank" rel="noopener noreferrer">
          <img
            src="https://images.pexels.com/photos/6941126/pexels-photo-6941126.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&q=80"
            alt="Nighttime sleep environment representing official sleep education"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
          <span class="video-play" aria-hidden="true">▶</span>
          <div class="video-copy">
            <small>Official education · NIH/NHLBI</small>
            <h3>Sleep and sleep-disorder videos</h3>
            <p>Explore official videos featuring sleep researchers and people living with sleep disorders such as sleep apnea.</p>
          </div>
        </a>
      </div>

      <p class="media-credit">
        Lifestyle photography: Pexels contributors, used under the Pexels license. Video resources open on the licensed provider or official NIH website.
      </p>
    `;

    const researchSection = document.createElement("section");
    researchSection.className = "section research-section";
    researchSection.id = "research";
    researchSection.setAttribute("aria-labelledby", "research-title");
    researchSection.innerHTML = `
      <div class="section-heading split-heading research-heading">
        <div>
          <p class="eyebrow">Recent sleep research</p>
          <h2 id="research-title">What current studies are teaching us about sleep.</h2>
        </div>
        <p>
          Research summaries are written for general education. Human and animal findings are clearly separated,
          and no study is presented as proof that a mattress or adjustable base treats a medical condition.
        </p>
      </div>

      <div class="research-grid">
        <article class="research-card">
          <div class="research-meta"><span>Human study</span><time datetime="2026-06-30">June 2026</time></div>
          <h3>Coordinated sleep rhythms were linked to overnight memory consolidation.</h3>
          <p>
            Intracranial recordings from 19 people showed that coordinated rhythms across the hippocampus,
            thalamus, and frontal brain regions predicted overnight motor-memory consolidation.
          </p>
          <a href="https://pubmed.ncbi.nlm.nih.gov/40654700/" target="_blank" rel="noopener noreferrer">Read the PubMed record <span>→</span></a>
        </article>

        <article class="research-card">
          <div class="research-meta"><span>Human meta-analysis</span><time datetime="2026-02-01">February 2026</time></div>
          <h3>Several nights of restricted sleep were associated with higher inflammatory markers.</h3>
          <p>
            An updated review of 35 experimental studies involving 887 participants found that persistent partial
            sleep restriction—not a single disrupted night—was associated with increases in IL-6 and C-reactive protein.
          </p>
          <a href="https://pubmed.ncbi.nlm.nih.gov/40474574/" target="_blank" rel="noopener noreferrer">Read the PubMed record <span>→</span></a>
        </article>

        <article class="research-card">
          <div class="research-meta"><span>NIH-funded animal study</span><time datetime="2026-06-08">June 8, 2026</time></div>
          <h3>Researchers identified brain activity connected with sleep's restorative effect.</h3>
          <p>
            In mice, researchers induced localized sleep-like activity that helped recalibrate neural connections
            and offset some memory-task effects of sleep deprivation. Human implications require further study.
          </p>
          <a href="https://www.nih.gov/news-events/news-releases/researchers-trigger-sleeps-restorative-effect-parts-awake-brain" target="_blank" rel="noopener noreferrer">Read the NIH summary <span>→</span></a>
        </article>
      </div>

      <div class="research-takeaway">
        <div class="takeaway-icon" aria-hidden="true">✦</div>
        <div>
          <p class="eyebrow">Practical takeaway</p>
          <h3>Protecting sleep continuity matters.</h3>
          <p>
            A properly selected mattress and adjustable base cannot diagnose or cure a health condition, but pressure relief,
            stable support, reduced partner disturbance, temperature comfort, and personalized positioning may help remove
            common sources of discomfort that interrupt sleep.
          </p>
        </div>
      </div>
    `;

    introStrip.insertAdjacentElement("afterend", mediaSection);
    matchSection.insertAdjacentElement("beforebegin", researchSection);

    const mediaStyles = document.createElement("style");
    mediaStyles.setAttribute("data-sleep-media", "");
    mediaStyles.textContent = `
      .sleep-visual-section {
        background: #f3ede3;
      }

      .visual-heading {
        margin-bottom: 48px;
      }

      .sleep-photo-grid,
      .sleep-video-grid,
      .research-grid {
        width: min(var(--max-width), 100%);
        margin: 0 auto;
        display: grid;
        gap: 20px;
      }

      .sleep-photo-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .sleep-photo-card {
        overflow: hidden;
        background: var(--white);
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        box-shadow: 0 18px 45px rgba(7, 24, 39, 0.08);
      }

      .sleep-photo-card img {
        width: 100%;
        height: 255px;
        object-fit: cover;
      }

      .sleep-photo-card > div {
        padding: 25px 24px 28px;
      }

      .sleep-photo-card span,
      .research-meta span {
        color: var(--gold);
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .sleep-photo-card h3,
      .sleep-video-card h3,
      .research-card h3,
      .research-takeaway h3 {
        margin-top: 10px;
        color: var(--navy-950);
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.45rem;
      }

      .sleep-photo-card p,
      .sleep-video-card p,
      .research-card p,
      .research-takeaway p:not(.eyebrow) {
        margin: 12px 0 0;
        color: var(--muted);
        font-size: 0.85rem;
        line-height: 1.75;
      }

      .sleep-video-grid {
        margin-top: 28px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .sleep-video-card {
        position: relative;
        min-height: 350px;
        overflow: hidden;
        color: var(--white);
        border-radius: var(--radius-md);
        box-shadow: 0 22px 55px rgba(7, 24, 39, 0.16);
        text-decoration: none;
        isolation: isolate;
      }

      .sleep-video-card::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(180deg, rgba(7, 24, 39, 0.06), rgba(7, 24, 39, 0.9));
      }

      .sleep-video-card img {
        position: absolute;
        inset: 0;
        z-index: -2;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .sleep-video-card:hover img,
      .sleep-video-card:focus-visible img {
        transform: scale(1.035);
      }

      .video-play {
        position: absolute;
        top: 26px;
        right: 26px;
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        color: var(--navy-950);
        background: rgba(234, 210, 160, 0.94);
        border-radius: 50%;
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2);
      }

      .video-copy {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 30px;
      }

      .video-copy small {
        color: var(--gold-light);
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .sleep-video-card h3 {
        color: var(--white);
        font-size: 1.8rem;
      }

      .sleep-video-card p {
        color: rgba(255, 255, 255, 0.76);
      }

      .media-credit {
        width: min(var(--max-width), 100%);
        margin: 22px auto 0;
        color: var(--muted);
        font-size: 0.68rem;
        text-align: center;
      }

      .research-section {
        color: var(--white);
        background:
          radial-gradient(circle at 90% 10%, rgba(79, 163, 201, 0.17), transparent 25%),
          linear-gradient(135deg, var(--navy-950), #0d2b43 64%, #163d58);
      }

      .research-heading h2 {
        color: var(--white);
      }

      .research-heading > p {
        color: rgba(255, 255, 255, 0.7);
      }

      .research-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .research-card {
        min-height: 390px;
        padding: 30px 28px;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: var(--radius-md);
        backdrop-filter: blur(10px);
      }

      .research-meta {
        display: flex;
        justify-content: space-between;
        gap: 15px;
      }

      .research-meta time {
        color: rgba(255, 255, 255, 0.54);
        font-size: 0.67rem;
      }

      .research-card h3 {
        color: var(--white);
        font-size: 1.55rem;
      }

      .research-card p {
        color: rgba(255, 255, 255, 0.7);
      }

      .research-card a {
        width: fit-content;
        margin-top: auto;
        padding-top: 24px;
        color: var(--gold-light);
        font-size: 0.78rem;
        font-weight: 700;
        text-decoration: none;
      }

      .research-card a span {
        display: inline-block;
        transition: transform 0.2s ease;
      }

      .research-card a:hover span,
      .research-card a:focus-visible span {
        transform: translateX(5px);
      }

      .research-takeaway {
        width: min(var(--max-width), 100%);
        margin: 28px auto 0;
        padding: 29px 31px;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 24px;
        align-items: start;
        color: var(--ink);
        background: var(--cream);
        border-radius: var(--radius-md);
      }

      .takeaway-icon {
        width: 56px;
        height: 56px;
        display: grid;
        place-items: center;
        color: var(--gold-light);
        background: var(--navy-950);
        border-radius: 17px;
        font-size: 1.4rem;
      }

      @media (max-width: 980px) {
        .sleep-photo-grid,
        .research-grid {
          grid-template-columns: 1fr;
        }

        .sleep-photo-card {
          display: grid;
          grid-template-columns: minmax(250px, 0.85fr) 1fr;
        }

        .sleep-photo-card img {
          height: 100%;
          min-height: 260px;
        }
      }

      @media (max-width: 760px) {
        .sleep-video-grid {
          grid-template-columns: 1fr;
        }

        .sleep-photo-card {
          display: block;
        }

        .sleep-photo-card img {
          height: 240px;
          min-height: 0;
        }

        .research-takeaway {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .sleep-video-card img {
          transition: none;
        }
      }
    `;

    document.head.appendChild(mediaStyles);
  }

  addSleepExpertMenu();
  addResearchAndMediaSections();

  const sleepProfiles = {
    side: {
      label: "Side Sleeper Priorities",
      title: "Pressure relief with balanced support",
      description:
        "Side sleepers often need enough cushioning at the shoulder and hip while the mattress supports the waist so the spine stays comfortably aligned.",
      priorities: [
        ["Comfort", "Medium to plush"],
        ["Pressure areas", "Shoulders and hips"],
        ["Useful feature", "Responsive contouring"]
      ]
    },
    back: {
      label: "Back Sleeper Priorities",
      title: "Stable support through the hips and lower back",
      description:
        "Back sleepers usually benefit from a surface that supports the natural curve of the lower back without allowing the hips to sink too deeply.",
      priorities: [
        ["Comfort", "Medium to firm"],
        ["Support area", "Waist and hips"],
        ["Useful feature", "Lumbar support"]
      ]
    },
    stomach: {
      label: "Stomach Sleeper Priorities",
      title: "A supportive surface that limits midsection sink",
      description:
        "Stomach sleepers often need stronger support under the hips and abdomen to reduce excessive arching through the lower back.",
      priorities: [
        ["Comfort", "Medium-firm to firm"],
        ["Support area", "Hips and abdomen"],
        ["Useful feature", "Low-profile pillow"]
      ]
    },
    combo: {
      label: "Combination Sleeper Priorities",
      title: "Responsive comfort that makes movement easier",
      description:
        "Combination sleepers usually need a mattress that relieves pressure in multiple positions while responding quickly enough to make changing positions feel natural.",
      priorities: [
        ["Comfort", "Balanced medium feel"],
        ["Movement", "Easy repositioning"],
        ["Useful feature", "Responsive materials"]
      ]
    },
    couples: {
      label: "Couples Priorities",
      title: "Shared comfort without shared disruption",
      description:
        "Couples should consider motion separation, edge support, temperature, mattress size, and whether each person needs independent adjustable positioning.",
      priorities: [
        ["Comfort", "Mutually agreeable feel"],
        ["Movement", "Motion isolation"],
        ["Useful feature", "Split adjustment"]
      ]
    }
  };

  function closeMenu() {
    if (!menuButton || !navigation) return;

    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");

    const sleepExpertMenu = navigation.querySelector(".nav-group");
    const sleepExpertButton = navigation.querySelector(".nav-parent");
    if (sleepExpertMenu) sleepExpertMenu.classList.remove("submenu-open");
    if (sleepExpertButton) sleepExpertButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      document.body.classList.toggle("menu-open", isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeMenu();
    });
  }

  function renderSleepProfile(position) {
    const profile = sleepProfiles[position];

    if (!profile || !resultLabel || !resultTitle || !resultDescription || !priorityGrid) {
      return;
    }

    resultLabel.textContent = profile.label;
    resultTitle.textContent = profile.title;
    resultDescription.textContent = profile.description;

    const fragment = document.createDocumentFragment();

    profile.priorities.forEach(([label, value]) => {
      const card = document.createElement("article");
      const labelElement = document.createElement("small");
      const valueElement = document.createElement("strong");

      labelElement.textContent = label;
      valueElement.textContent = value;
      card.append(labelElement, valueElement);
      fragment.appendChild(card);
    });

    priorityGrid.replaceChildren(fragment);
  }

  positionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const position = tab.dataset.position;

      positionTabs.forEach((otherTab) => {
        const isActive = otherTab === tab;
        otherTab.classList.toggle("active", isActive);
        otherTab.setAttribute("aria-selected", String(isActive));
      });

      renderSleepProfile(position);
    });
  });

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });
});
