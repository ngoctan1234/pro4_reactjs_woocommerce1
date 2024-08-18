
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";
import Home from "./layoutPages/home/Home";
import Products from "./layoutPages/products/Products";
import NotFound from "./components/notFound/NotFound";
import FormLogin from './components/formLogin/FormLogin';

import "./App.css"
import AdminPage from './adminPages/AdminPage';
import ProductDetailPage from './adminPages/ProductDetailPage';

function App() {
  return (
    <div className="App">
          <Router>
                <Routes>
                    <Route path="/login" element={<FormLogin />}></Route>
                    <Route index element={<Home />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                    <Route path="/admin" element={<AdminPage />}></Route>
                    <Route path="/product-detail/:id" element={<ProductDetailPage />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
           
            
    
    </div>
    
  );
}

export default App;
