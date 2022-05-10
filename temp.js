const URL = "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword="
const MATCHED_CLASS = "Suggestion__item--matched";
const SELECTED_CLASS = "Suggestion__item--selected";
const $App = document.querySelector(".App");
const $SelectedLanguage = document.createElement("div");
const selectedArr = [];
const $SearchForm = document.querySelector(".SearchInput");
const $SearchInput = document.querySelector(".SearchInput__input");
const $Suggestion = document.createElement("div");
let suggestionCount = 0;
let suggestionIdx = 1;

window.onload = () => document.querySelector(".SearchInput__input").focus();

const selectSuggestion = (e) => {
    const word = e.currentTarget.innerText;
    alert(word);
    if (selectedArr.includes(word))
        selectedArr.splice([selectedArr.indexOf(word)], 1);
    if (selectedArr.length >= 5)
        selectedArr.unshift();
    selectedArr.push(word);
}

$SelectedLanguage.className = "SelectedLanguage";

$SearchForm.addEventListener("submit", e => e.preventDefault());

$SearchInput.addEventListener("keydown", keyInput => {
    document.querySelector(`.Suggestion li:nth-child(${suggestionIdx})`).classList.remove(SELECTED_CLASS);
    console.log(keyInput.key);
    switch (keyInput.key) {
        case ("ArrowUp") :
            suggestionIdx = suggestionIdx > 1 ? suggestionIdx - 1 : suggestionCount;
            document.querySelector(`.Suggestion li:nth-child(${suggestionIdx})`).classList.add(SELECTED_CLASS);
            break;
        case ("ArrowDown") : 
            suggestionIdx = suggestionIdx < suggestionCount ? suggestionIdx + 1 : 1;
            document.querySelector(`.Suggestion li:nth-child(${suggestionIdx})`).classList.add(SELECTED_CLASS);
            break;
        case ("Enter") :
            console.log("hi");
            break;
    }
})

$Suggestion.className = "Suggestion";
$Suggestion.style.display = "none";

$App.insertBefore($SelectedLanguage, $SearchForm);
$App.appendChild($Suggestion);

$SearchForm.addEventListener("input", (e) => {
    const word = e.target.value;
    if (word === "") {
        $Suggestion.style.display = "none";
        return ;
    }
    fetch(URL + word)
    .then(res => res.json())
    .then(arr => {
        suggestionCount = arr.length;
        if (suggestionCount === 0)
            return ;
        $Suggestion.style.display = "block";
        while ($Suggestion.hasChildNodes())
            $Suggestion.firstChild.remove();
        const $ul = document.createElement("ul");
        arr.forEach((item, idx) => {
            const $li = document.createElement("li");
            const $span = document.createElement("span");
            $span.classList.add(MATCHED_CLASS);
            $span.textContent = word;
            $li.appendChild($span);
            $li.insertAdjacentText("afterbegin",item.split(new RegExp(word, "i"))[0]);
            $li.insertAdjacentText("beforeend",item.split(new RegExp(word, "i"))[1]);
            $li.addEventListener("click", selectSuggestion)
            if (idx == 0)
                $li.classList.add(SELECTED_CLASS);
            $ul.appendChild($li);
        })
        $Suggestion.appendChild($ul);
        
    })
})
    



