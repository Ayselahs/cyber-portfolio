import Header from "../../components/header";
import Footer from "../../components/footer";
import ContactForm from "../../components/contactItems/contactForm";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Header />
      <Head>
        <title>Contact - My Cyber Portfolio</title>
        <meta name="description" content="Get in touch for inquiries" />
      </Head>
      <div className="min-h-screen bg-slate-50 py-16">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
