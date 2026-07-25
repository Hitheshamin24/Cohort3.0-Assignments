import React from "react";

const OurStory = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="bg-[#101010] border border-zinc-700 rounded-3xl p-8 md:p-10">
        <h2 className="font-syne text-[24px] font-bold text-white mb-6">
          Our Story
        </h2>

        <div className="space-y-5 font-dm-sans text-[14px] leading-8 text-zinc-400">
          <p>
            SkyMart started in 2022 as a small side project with a simple
            vision—to make online shopping faster, fairer, and more enjoyable.
            We wanted to create a platform where quality products meet
            affordable prices, without compromising on customer experience.
          </p>

          <p>
            Today, thousands of customers trust SkyMart for electronics,
            fashion, home essentials, accessories, and much more. Our mission
            is to continuously improve the way people shop online through
            innovation, transparency, and outstanding service.
          </p>

          <p>
            Every order we deliver represents our commitment to quality,
            reliability, and customer satisfaction. We're proud of how far
            we've come, but we're even more excited about what's ahead.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;