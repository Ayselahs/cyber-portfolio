import HeroSection from "../components/hero";
import Header from "../components/header";
import SelectedWorkSection from "../components/selectedWork";
import Footer from "../components/footer";
import SkillsSection from "../components/skills";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <SkillsSection />
      <SelectedWorkSection />
      <Footer />
    </main>
  );
}
