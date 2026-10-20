// KRRoseX Official Interactive Website Script

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        if (mobileToggle) mobileToggle.textContent = "☰";
      });
    });
  }

  // 2. Interactive Rewards Country / Currency Switcher
  const rewardTabs = document.querySelectorAll(".rewards-tabs .tab-btn");
  const rewardCards = document.querySelectorAll(".rewards-grid .reward-card");

  if (rewardTabs.length > 0 && rewardCards.length > 0) {
    rewardTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        rewardTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.getAttribute("data-country");

        rewardCards.forEach(card => {
          const region = card.getAttribute("data-region") || "";
          if (target === "all" || region.includes(target) || region === "all") {
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

  // 4. Live Coin-to-Cash Interactive Calculator
  const coinSlider = document.getElementById("coinSlider");
  const calcCoinDisplay = document.getElementById("calcCoinDisplay");
  const calcPayoutDisplay = document.getElementById("calcPayoutDisplay");
  const calcMethodDisplay = document.getElementById("calcMethodDisplay");
  const currButtons = document.querySelectorAll(".calc-curr-btn");

  let currentCurrency = "INR";

  const payoutConversion = {
    INR: {
      symbol: "₹",
      calc: (coins) => {
        if (coins < 3500) return { val: 0, method: "Min. 3,500 coins required (₹10 UPI)" };
        if (coins < 8000) return { val: 10, method: "UPI Instant Transfer" };
        if (coins < 15500) return { val: 25, method: "UPI / Flipkart Voucher" };
        if (coins < 30000) return { val: 50, method: "UPI / Flipkart Voucher" };
        if (coins < 70000) return { val: 100, method: "UPI / Flipkart Gift Card" };
        const base = Math.floor((coins / 30000) * 100);
        return { val: base, method: "UPI / Flipkart Direct Payout" };
      }
    },
    USD: {
      symbol: "$",
      calc: (coins) => {
        if (coins < 6000) return { val: 0, method: "Min. 6,000 coins required ($1 Amazon)" };
        if (coins < 28000) return { val: 1, method: "Amazon Gift Card" };
        if (coins < 54000) return { val: 5, method: "Amazon Gift Card" };
        if (coins < 60000) return { val: 10, method: "Amazon Gift Card" };
        if (coins < 90000) return { val: 10, method: "Apple / Amazon Gift Card" };
        if (coins < 120000) return { val: 15, method: "Starbucks Gift Card" };
        if (coins < 130000) return { val: 20, method: "Apple Gift Card" };
        if (coins < 140000) return { val: 25, method: "Amazon Gift Card" };
        if (coins < 160000) return { val: 25, method: "Google Play Gift Card" };
        if (coins < 230000) return { val: 30, method: "Starbucks Gift Card" };
        if (coins < 260000) return { val: 40, method: "Apple Gift Card" };
        if (coins < 300000) return { val: 50, method: "Google Play Gift Card" };
        if (coins < 500000) return { val: 60, method: "Starbucks Gift Card" };
        if (coins < 1200000) return { val: 100, method: "Apple / Play / Starbucks $100" };
        return { val: 250, method: "Google Play $250 Mega Reward" };
      }
    },
    GBP: {
      symbol: "£",
      calc: (coins) => {
        if (coins < 7500) return { val: 0, method: "Min. 7,500 coins for £1 Amazon UK" };
        if (coins < 35000) return { val: 1, method: "Amazon UK Voucher" };
        if (coins < 68000) return { val: 5, method: "Amazon UK Voucher" };
        if (coins < 165000) return { val: 10, method: "Amazon UK Voucher" };
        return { val: 25, method: "Amazon UK £25 Voucher" };
      }
    },
    EUR: {
      symbol: "€",
      calc: (coins) => {
        if (coins < 6500) return { val: 0, method: "Min. 6,500 coins for €1 Amazon EU" };
        if (coins < 31000) return { val: 1, method: "Amazon Europe Voucher" };
        if (coins < 60000) return { val: 5, method: "Amazon Europe Voucher" };
        if (coins < 145000) return { val: 10, method: "Amazon Europe Voucher" };
        return { val: 25, method: "Amazon Europe €25 Voucher" };
      }
    },
    JPY: {
      symbol: "¥",
      calc: (coins) => {
        if (coins < 6000) return { val: 0, method: "Min. 6,000 coins for ¥150 Amazon JP" };
        if (coins < 19000) return { val: 150, method: "Amazon Japan Voucher" };
        if (coins < 55000) return { val: 500, method: "Amazon Japan Voucher" };
        if (coins < 125000) return { val: 1500, method: "Amazon Japan Voucher" };
        return { val: 3500, method: "Amazon Japan ¥3,500 Gift Voucher" };
      }
    },
    AED: {
      symbol: "AED ",
      calc: (coins) => {
        if (coins < 8500) return { val: 0, method: "Min. 8,500 coins for 5 AED Amazon" };
        if (coins < 25000) return { val: 5, method: "Amazon UAE E-Voucher" };
        if (coins < 57000) return { val: 15, method: "Amazon UAE E-Voucher" };
        if (coins < 140000) return { val: 35, method: "Amazon UAE E-Voucher" };
        return { val: 90, method: "Amazon UAE 90 AED Gift Voucher" };
      }
    }
  };

  function updateCalculator() {
    if (!coinSlider || !calcCoinDisplay || !calcPayoutDisplay || !calcMethodDisplay) return;
    const coins = parseInt(coinSlider.value, 10);
    calcCoinDisplay.textContent = coins.toLocaleString();

    const config = payoutConversion[currentCurrency] || payoutConversion.INR;
    const res = config.calc(coins);

    calcPayoutDisplay.textContent = config.symbol + res.val.toLocaleString();
    calcMethodDisplay.textContent = res.method;
  }

  if (coinSlider) {
    coinSlider.addEventListener("input", updateCalculator);
  }

  if (currButtons.length > 0) {
    currButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        currButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCurrency = btn.getAttribute("data-curr") || "INR";
        updateCalculator();
      });
    });
  }

  // Initialize Calculator on page load
  updateCalculator();

  // 5. Interactive Phone Mockup Quiz Option
  const quizOption = document.getElementById("interactiveQuizOption");
  const phoneWallet = document.querySelector(".phone-wallet-pill span");

  if (quizOption && phoneWallet) {
    quizOption.addEventListener("click", () => {
      if (!quizOption.classList.contains("correct-answered")) {
        quizOption.classList.add("correct-answered");
        quizOption.style.background = "rgba(0, 230, 118, 0.25)";
        quizOption.style.borderColor = "var(--accent-green)";
        quizOption.style.color = "var(--accent-green)";
        quizOption.innerHTML = "✓ Correct! +50 Coins Added 🎉";
        
        const currentCoins = parseInt(phoneWallet.textContent.replace(/,/g, ""), 10) || 35400;
        phoneWallet.textContent = (currentCoins + 50).toLocaleString();
      }
    });
  }

  // 6. Contact & Account Deletion Form Handlers
  const deleteForm = document.getElementById("deletionForm");
  if (deleteForm) {
    deleteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("delEmail")?.value || "";
      const uid = document.getElementById("delUid")?.value || "";
      const reason = document.getElementById("delReason")?.value || "";

      const subject = encodeURIComponent("Account Deletion Request - UID: " + uid);
      const body = encodeURIComponent(
        `Dear KRRoseX Privacy Team,\n\nI am requesting permanent account and data deletion pursuant to Google Play policies and GDPR/CCPA regulations.\n\nAccount Email: ${email}\nUser UID: ${uid}\nReason for Deletion: ${reason}\n\nPlease purge all my personal identifiers, coin history, and profile data within 7 business days.\n\nThank you.`
      );

      window.location.href = `mailto:support@krrosex.com?subject=${subject}&body=${body}`;

      const feedback = document.getElementById("formFeedback");
      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = "✅ Your deletion request has been submitted. All account data and identifiers will be permanently purged within 7 business days.";
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

      const subject = encodeURIComponent("KRRoseX Support Inquiry from " + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nInquiry Details:\n${msg}`);

      window.location.href = `mailto:support@krrosex.com?subject=${subject}&body=${body}`;

      const feedback = document.getElementById("contactFeedback");
      if (feedback) {
        feedback.style.display = "block";
        feedback.innerHTML = "✅ Thank you! Your support ticket has been prepared. Our team responds within 24 to 48 hours.";
      }
    });
  }
});
