import { Container } from "reactstrap";
import CProducts from "../../components/cProducts/CProducts";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function Products(){
   
    return (
        <div>
            <Header />
          <Container>
          <h1>Product page</h1>
          </Container>
            <CProducts />
            <Footer />
        </div>
    )
}