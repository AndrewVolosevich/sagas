import Counter from "./components/Counter/Counter";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Posts from "./components/Posts/Posts";

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
      <Posts />
    </Provider>
  );
}

export default App;
