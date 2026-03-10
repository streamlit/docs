export default function (component) {
  const { setStateValue, parentElement, data } = component;

  const label = parentElement.querySelector("label");
  label.innerText = data.label;

  const input = parentElement.querySelector("input");
  if (input.value !== data.value) {
    input.value = data.value ?? "";
  }

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      setStateValue("value", e.target.value);
    }
  };

  input.onblur = (e) => {
    setStateValue("value", e.target.value);
  };
}
