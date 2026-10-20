// KRRoseX Official Website Script

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        if (mobileToggle) mobileToggle.textContent = "☰";
      });
    });
  }

  // 2. Rewards Country / Currency Switcher
  const rewardTabs = document.querySelectorAll(".rewards-tabs .tab-btn");
  const rewardCards = document.querySelectorAll(".rewards-grid .reward-card");

  if (rewardTabs.length > 0 && rewardCards.length > 0) {
    rewardTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        rewardTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.getAttribute("data-country");

        rewardCards.forEach(card => {
          const region = card.getAttribute("data-region");
          if (target === "all" || region === target || region === "all") {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 3. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // 4. Contact / Deletion Form Handlers
  const deleteForm = document.getElementById("deletionForm");
  if (deleteForm) {
    deleteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("delEmail")?.value || "";
      const uid = document.getElementById("delUid")?.value || "";
      const reason = document.getElementById("delReason")?.value || "";

      // Open mail client as standard fallback or show success
      const subject = encodeURIComponent("Account Deletion Request - UID: " + uid);
      const body = encodeURIComponent(
        `Dear Rose X Support Team,\n\nI am requesting permanent account and data deletion.\n\nAccount Email: ${email}\nAccount UID: ${uid}\nReason: ${reason}\n\nPlease erase my account and all associated data within 7 business days.\n\nThank you.`
      );

      window.location.href = `mailto:support@krrosex.com?subject=${subject}&body=${body}`;

      const feedback = document.getElementById("formFeedback");
      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = "✅ Your deletion request template has been generated. All associated account data will be permanently purged within 7 business days.";
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cName")?.value || "";
      const email = document.getElementById("cEmail")?.value || "";
      const msg = document.getElementById("cMsg")?.value || "";

      const subject = encodeURIComponent("Support Inquiry from " + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

      window.location.href = `mailto:support@krrosex.com?subject=${subject}&body=${body}`;

      const feedback = document.getElementById("contactFeedback");
      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = "✅ Thank you! Your message has been prepared for our support team. We reply within 24-48 hours.";
      }
    });
  }
});
