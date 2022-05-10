import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import { fetchLanguages } from "./api.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: []
  };

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async word => {
      if (word.length === 0) this.setState({ fetchedLanguages: [] });
      else this.setState({ fetchedLanguages: await fetchLanguages(word) });
    }
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      selectedIndex: 0,
      items: []
    }
  });

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState
    };

    suggestion.setState({ items: this.state.fetchedLanguages });
  };
}
