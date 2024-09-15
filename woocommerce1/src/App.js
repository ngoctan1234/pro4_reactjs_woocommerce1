
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route ,Link,HashRouter} from "react-router-dom";
import Home from "./layoutPages/home/Home";
import Products from "./layoutPages/products/Products";
import NotFound from "./components/notFound/NotFound";
import FormLogin from './components/formLogin/FormLogin';

import "./App.css"
import AdminPage from './adminPages/AdminPage';
import ProductDetailPage from './adminPages/ProductDetailPage';
import Validation from './components/validation/Validation';

function App() {
  return (
    <div className="App">
          <HashRouter>
                <Routes>
                    <Route path="/login" element={<FormLogin />}></Route>
                    <Route index element={<Home />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                    <Route path="/admin" element={<AdminPage />}></Route>
                    <Route path="/validation" element={<Validation />}></Route>
                    <Route path="/product-detail/:id" element={<ProductDetailPage />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </HashRouter>
           
            
    
    </div>
    
  );
}

export default App;
