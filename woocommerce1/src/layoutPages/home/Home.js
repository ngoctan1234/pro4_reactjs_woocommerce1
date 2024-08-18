import { Container } from "reactstrap";
import CProducts from "../../components/cProducts/CProducts";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
export default function Home(){
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
            <h1>Home page</h1>
            </Container>
            
                <CProducts />
            <Footer />
        </div>
    )
}