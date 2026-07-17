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
