import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import RentalStatistics from "@/components/RentalStatistics";
import TopLocations from "@/components/TopLocations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-red-600">
      
      <Banner/>
      <WhyChooseUs/>
      <CustomerReviews/>
      <TopLocations/>
      <RentalStatistics/>
      <Footer/>
    </div>
  );
}
