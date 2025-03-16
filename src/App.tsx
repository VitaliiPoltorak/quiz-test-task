import AppRoutes from "./routes";
import { useViewportHeight } from "./hooks/useViewportHeight";

const App = () => {
  useViewportHeight();
  return <AppRoutes/>;
};

export default App;
