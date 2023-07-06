const Hero = () => {
  return (
    <>
      <h1 className="mt-5 text-2xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
        Powered by
        <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          {" "}
          Alpha Vantage API
        </span>
      </h1>
      <h2 className="mt-5 text-lg text-gray-600 sm:text-xl max-w-3xl text-center mx-2 md:mx-auto">
        Stay ahead of the market trends with our intuitive, an open-source Stock
        Watchlist app that maximize your profits, unleash your financial
        potential and elevate your portfolio management game
      </h2>
    </>
  );
};

export default Hero;
