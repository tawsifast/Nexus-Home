import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReviews";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import RentalStatistics from "@/components/RentalStatistics";
import TopLocations from "@/components/TopLocations";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div className="">  
      <Banner/>
      <Featured/>
      <WhyChooseUs/>
      <CustomerReviews/>
      <TopLocations/>
      <RentalStatistics/>
      <Footer/>
    </div>
  );
}
