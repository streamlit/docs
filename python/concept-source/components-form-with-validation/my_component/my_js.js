export default function ({
  parentElement,
  setStateValue,
  setTriggerValue,
  data,
}) {
  const form = parentElement.querySelector("#contact-form");
  const nameInput = parentElement.querySelector("#name");
  const emailInput = parentElement.querySelector("#email");
  const messageInput = parentElement.querySelector("#message");
  const saveDraftBtn = parentElement.querySelector("#save-draft");
  const status = parentElement.querySelector("#status");

  // Register custom CSS variables with third values from
  // --st-heading-font-sizes and --st-heading-font-weights
  requestAnimationFrame(() => {
    const container = parentElement.querySelector(".form-container");
    const headingSizes = getComputedStyle(form)
      .getPropertyValue("--st-heading-font-sizes")
      .trim();
    const headingWeights = getComputedStyle(form)
      .getPropertyValue("--st-heading-font-weights")
      .trim();
    const sizes = headingSizes.split(",").map((s) => s.trim());
    const weights = headingWeights.split(",").map((s) => s.trim());
    if (sizes[2] && container) {
      container.style.setProperty("--st-heading-font-size-h3", sizes[2]);
    }
    if (weights[2] && container) {
      container.style.setProperty("--st-heading-font-weight-h3", weights[2]);
    }
  });

  // Load draft if available
  const loadDraft = (draft) => {
    nameInput.value = draft.name || "";
    emailInput.value = draft.email || "";
    messageInput.value = draft.message || "";
  };

  loadDraft(data?.draft || {});

  // Save draft
  const saveDraft = () => {
    setStateValue("draft", {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    });
    setTriggerValue("action", "save_draft");
    status.textContent = "Draft saved!";
    status.style.color = "var(--st-green-color)";
    setTimeout(() => (status.textContent = ""), 2000);
  };

  // Submit form
  const submitForm = (e) => {
    e.preventDefault();

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      status.textContent = "Please fill all fields";
      status.style.color = "var(--st-red-color)";
      return;
    }

    status.textContent = "Message sent!";
    status.style.color = "var(--st-blue-color)";
    setTimeout(() => (status.textContent = ""), 2000);
    setTriggerValue("submit", {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    });
    loadDraft({});
    setStateValue("draft", {});
  };

  // Event listeners - only update on button clicks
  saveDraftBtn.addEventListener("click", saveDraft);
  form.addEventListener("submit", submitForm);

  return () => {
    saveDraftBtn.removeEventListener("click", saveDraft);
    form.removeEventListener("submit", submitForm);
  };
}
