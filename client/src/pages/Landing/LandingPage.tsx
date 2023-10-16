import { Banner } from "../../components/Banner";
import { ProductGoal } from "../../components/ProductGoal";
import { Services } from "../../components/Services";
import { Testimonials } from "../../components/Testimonials";
import { ContactUs } from "../../components/ContactUs";
import { Footer } from "../../components/Footer";

function LandingPage () {
    return (
        <div>
            <Banner />
            <ProductGoal />
            <Services />
            <Testimonials />
            <ContactUs />
            <Footer />
        </div>
    )
}

export default LandingPage;