(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-order-popup-open]"),
    closeModalBtn: document.querySelector("[data-order-popup-close]"),
    modal: document.querySelector("[data-order-popup]"),
  };

  if (refs.openModalBtn) {
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  }

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
