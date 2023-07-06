import LOADER from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <img width={60} height={60} alt="Loading..." src={LOADER} />
    </div>
  );
};

export default Loader;
