import useRouterElements from './useRouterElements'

function App() {
  const routerElement = useRouterElements()
  return <div>{routerElement}</div>
}

export default App
