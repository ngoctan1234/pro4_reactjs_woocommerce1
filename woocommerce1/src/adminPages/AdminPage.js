import { Container } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import CCategories from "../components/categories/CCategories";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
export default function AdminPage(){
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
            <h1>Admin page</h1>
            </Container>
            
            <CCategories />
            <Footer />
        </div>
    )
}