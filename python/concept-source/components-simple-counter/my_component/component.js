export default function ({ parentElement, setStateValue }) {
  let count = 0;
  const display = parentElement.querySelector("#count");
  const button = parentElement.querySelector("#increment");

  button.onclick = () => {
    count++;
    display.textContent = count;
    setStateValue("count", count);
  };
}
