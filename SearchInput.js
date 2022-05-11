export default function SearchInput({ $target, initialState, onChange }) {
  this.state = initialState;
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";

  this.render = () => {
    this.$element.innerHTML = `
	<input 
		class="SearchInput__input" 
		type="text" 
		placeholder="프로그램 언어를 입력하세요." 
		value="${this.state}"
		/>
	`;
  };

  this.render();

  this.$element.addEventListener("keyup", e => onChange(e.target.value));
  this.$element.addEventListener("submit", e => e.preventDefault());
  $target.appendChild(this.$element);

  document.querySelector(".SearchInput__input").focus();
}
