import { Container } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import CCategories from "../components/categories/CCategories";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CProductDetail from "../components/productDetail/CProductDetail";
export default function ProductDetailPage(){
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
  
    const navigate=useNavigate()
  
    if (!user){
         navigate("/login")
        
    }
    return (
        <div>
            <Header />
            <Container>
            <h1>Product detail page</h1>
            </Container>
            
            <CProductDetail />
            <Footer />
        </div>
    )
}