// Modal_Subscription and Modal_Subscription_Thenks

const subscriptionBell = document.querySelector(".gallery");
const openSubscription = document.querySelector(".subscription");
const lightboxShadow = document.querySelector(".lightbox_shadow");

const openSubscriptionThenks = document.querySelector(".subscription_btn");
const SubscriptionThenks = document.querySelector(".subscription_thenks");
const closeSubscriptionThenks = document.querySelector(".subscription_thenks_btn");
const formSubscription = document.querySelector(".subscription_container");


subscriptionBell.addEventListener("click", open);
function open(event) {
  const result = event.target.classList.contains("subscription_Bell");
  const result2 = event.target.classList.contains("svg-bell");
  if (result || result2) {
    openSubscription.classList.add("subscription_is_open");
    lightboxShadow.classList.add("lightbox_shadow_is_open");
    window.addEventListener("keydown", closeKey);
  }
  return;
}

formSubscription.addEventListener("submit", openThenks);
function openThenks() {
  openSubscription.classList.remove("subscription_is_open");
  SubscriptionThenks.classList.add("subscription_thenks_open");
}

lightboxShadow.addEventListener("click", close);
closeSubscriptionThenks.addEventListener("click", close);
function close() {
  if (event.target !== event.currentTarget) {
    return;
  }
  if (openSubscription.classList[1] === "subscription_is_open") {
    openSubscription.classList.remove("subscription_is_open");
  }
  if (SubscriptionThenks.classList[1] === "subscription_thenks_open") {
    SubscriptionThenks.classList.remove("subscription_thenks_open");
  }
  lightboxShadow.classList.remove("lightbox_shadow_is_open");
}

function closeKey(event) {
  if (event.code !== "Escape") {
    return;
  }
  if (openSubscription.classList[1] === "subscription_is_open") {
    openSubscription.classList.remove("subscription_is_open");
  }
  if (SubscriptionThenks.classList[1] === "subscription_thenks_open") {
    SubscriptionThenks.classList.remove("subscription_thenks_open");
  }
  lightboxShadow.classList.remove("lightbox_shadow_is_open");
}
