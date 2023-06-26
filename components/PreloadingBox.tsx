import PreLoader from "./preloader";

const PreLoadingBox = () => {
  return (
    <div className="w-full px-6 py-6 border-[#eff2f6] bg-white shadow rounded relative">
    <div className="items-center justify-between  gap-6">
      <div className="gap-2 items-center">
        {/* <div className="w-8 h-8 rounded-full object-cover bg-gray-200 animate-pulse"></div> */}
        <PreLoader width="w-32" />
      </div>
      <PreLoader width="w-32" />
    </div>
    <PreLoader width="w-32 mt-14" />
  </div>
  );
};

export default PreLoadingBox;