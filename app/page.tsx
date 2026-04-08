import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      {/* HERO SECTION */}

     <section className="relative w-full h-screen overflow-hidden">

  <video
    autoPlay
    muted
    loop
    playsInline
    data-aos="zoom-out"
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="/videos/ewaste.mp4" type="video/mp4" />
  </video>

  {/* Dark Overlay */}
 <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>

  {/* Content */}
  <div data-aos="fade-up" className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      Smart E-Waste Management
    </h1>

    <p className="max-w-xl text-lg mb-8">
      Reduce pollution and recycle electronics responsibly.
      Schedule pickup and manage e-waste easily.
    </p>

    <a
      href="/request"
      //className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-lg transition"
      className=" w-[250px] bg-gradient-to-r text-[22px] from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:scale-110 transition shadow-lg"
    >
      Request Pickup
    </a>

  </div>

</section>
      {/* FEATURES */}

     <section className="bg-gray-100 py-20">

<h2 className="text-3xl font-bold text-center mb-12">
Our Services
</h2>

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

{/* Pickup */}

<div data-aos="fade-up" className="bg-white p-8 rounded-xl shadow card-hover text-center">

<div className="text-4xl mb-4">🚚</div>

<h3 className="text-xl font-semibold mb-2">
Pickup Service
</h3>

<p className="text-gray-600">
Schedule doorstep pickup for your electronic waste.
</p>

</div>

{/* Recycling */}

<div data-aos="fade-up" className="bg-white p-8 rounded-xl shadow card-hover text-center">

<div className="text-4xl mb-4">♻</div>

<h3 className="text-xl font-semibold mb-2">
Recycling Centers
</h3>

<p className="text-gray-600">
Find certified recycling centers near you.
</p>

</div>

{/* Price */}

<div data-aos="fade-up" className="bg-white p-8 rounded-xl shadow card-hover text-center">

<div className="text-4xl mb-4">💰</div>

<h3 className="text-xl font-semibold mb-2">
Price Estimator
</h3>

<p className="text-gray-600">
Estimate scrap value of your electronics.
</p>

</div>

</div>

</section>

      {/* IMAGE SECTION */}

     <section className="bg-green-700 text-white py-20">

<div data-aos="fade-right"className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

<img
src="/images/ewaste1.jpg"
className="rounded-xl shadow-lg"
/>

<div>

<h2 className="text-3xl font-bold mb-6">
Why Recycle E-Waste?
</h2>

<ul className="space-y-3 text-lg">

<li>✔ Reduce pollution</li>
<li>✔ Recover valuable metals</li>
<li>✔ Protect ecosystems</li>

</ul>

</div>

</div>

</section>

      {/* STATS */}

      <section data-aos="fade-up" className="container mx-auto py-20 px-6 text-center">

        <h2 className="text-3xl font-bold mb-12">
          Impact We Created
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-4xl font-bold text-green-600">
              2,500+
            </h3>
            <p>Devices Recycled</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-4xl font-bold text-green-600">
              1,200+
            </h3>
            <p>Pickup Requests</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-4xl font-bold text-green-600">
              300+
            </h3>
            <p>Recycling Partners</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="bg-gray-900 text-white text-center py-6">
  <p>© 2026 Smart E-Waste Management System</p>
</footer>


    </div>
  );
}