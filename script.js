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

  if (navigation && !navigation.querySelector('a[href="community-savings.html"]')) {
    const savingsLink = document.createElement("a");
    savingsLink.href = "community-savings.html";
    savingsLink.textContent = "Community Savings";
    const callToAction = navigation.querySelector(".nav-cta");
    navigation.insertBefore(savingsLink, callToAction || null);
  }

  const sleepTopics = {
    side: {
      label: "Sleep & Recovery",
      title: "Rest is an active part of well-being",
      description:
        "Quality sleep supports many restorative processes in the brain and body. This section will explain credible public research in practical language without promising diagnosis, treatment, or a cure.",
      priorities: [
        ["Learn about", "Sleep stages"],
        ["Understand", "Rest and recovery"],
        ["Apply", "Practical habits"]
      ]
    },
    back: {
      label: "Sleep & Memory",
      title: "Sleep supports learning and memory processing",
      description:
        "Sleep is closely connected with attention, learning, and memory consolidation. Consistent, sufficient rest can support how the brain processes and organizes information.",
      priorities: [
        ["Explore", "Memory consolidation"],
        ["Consider", "Sleep consistency"],
        ["Protect", "Wind-down time"]
      ]
    },
    stomach: {
      label: "Sleep Environment",
      title: "Your surroundings can make rest easier or harder",
      description:
        "Light, sound, temperature, mattress comfort, pillow support, and bedroom routines all contribute to the conditions surrounding sleep.",
      priorities: [
        ["Room", "Cool, dark, quiet"],
        ["Comfort", "Supportive sleep surface"],
        ["Reduce", "Nighttime disruption"]
      ]
    },
    combo: {
      label: "Sleep Routines",
      title: "Consistency helps prepare the body for rest",
      description:
        "A regular schedule and calming wind-down routine can help create more predictable sleep cues. Small, sustainable changes are often more useful than an overly complicated routine.",
      priorities: [
        ["Timing", "Consistent schedule"],
        ["Before bed", "Calming routine"],
        ["Limit", "Late stimulation"]
      ]
    },
    couples: {
      label: "Couples & Sleep",
      title: "Two sleepers can have different comfort needs",
      description:
        "Partners may differ in sleep position, temperature preference, movement sensitivity, pillow needs, and preferred bed position. A personalized system can address those differences.",
      priorities: [
        ["Movement", "Motion isolation"],
        ["Comfort", "Individual preferences"],
        ["Position", "Split adjustment options"]
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
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
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

  function renderSleepTopic(topicKey) {
    const topic = sleepTopics[topicKey];
    if (!topic || !resultLabel || !resultTitle || !resultDescription || !priorityGrid) return;

    resultLabel.textContent = topic.label;
    resultTitle.textContent = topic.title;
    resultDescription.textContent = topic.description;

    const fragment = document.createDocumentFragment();
    topic.priorities.forEach(([label, value]) => {
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
      positionTabs.forEach((otherTab) => {
        const isActive = otherTab === tab;
        otherTab.classList.toggle("active", isActive);
        otherTab.setAttribute("aria-selected", String(isActive));
      });
      renderSleepTopic(tab.dataset.position);
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