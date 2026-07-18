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

  addSleepExpertMenu();

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