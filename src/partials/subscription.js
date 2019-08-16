const subscriptionBell = document.querySelector(".gallery");
const openSubscription = document.querySelector(".subscription");

subscriptionBell.addEventListener("click", open);
function open(event) {
  const result = event.target.classList.contains('subscription_Bell');
  if (!result) {
    return;
  };
  openSubscription.classList.add("subscription_is_open");
};
