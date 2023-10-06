import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { GlobalStyle } from "./global.styles";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(
  () => import("./routes/navigation/navigation.component")
);
const Authentication = lazy(
  () => import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
