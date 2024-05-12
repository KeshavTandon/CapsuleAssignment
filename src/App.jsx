// import Card from "./components/Card"
import { Provider } from "react-redux"
import SearchBar from "./components/Search"
import store from "./components/Store"

const App = () => {
  return (
    <Provider store={store}>
      <SearchBar/>
    </Provider>
  )
}
export default App