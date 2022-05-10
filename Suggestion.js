export default function Suggestion({ $target, initialState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $target.appendChild(this.$element);

  this.state = initialState;

  this.setState = nextState => {
    this.state = { ...initialState, ...nextState };
    this.render();
  };

  this.render = () => {
    const { items = [], selectedIndex } = this.state;
    if (items.length > 0) {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
		<ul>${items
      .map(
        (item, index) =>
          `<li data-index="${index}" ${
            selectedIndex === index
              ? 'class="Suggestion__item--selected"'
              : null
          }>${item}</li>`
      )
      .join("")}
		</ul>
	`;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  this.render();

  window.addEventListener("keyup", ({ key }) => {});
}
