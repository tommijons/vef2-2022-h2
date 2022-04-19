import { Layout } from "../components/layout/Layout"
import { Footer } from "../components/footer/Footer"
import { Restaurant } from "./api/globals"
import { Button } from "../components/form/Button";

// TODO: Birta allt í körfu og búa til pöntun...
export default function Cart() {
    
    return(
        <Layout
        title={Restaurant.name}

        footer={
            <Footer></Footer>
        }>
            <div>Karfa tóm</div>
        </Layout>
    )
}
