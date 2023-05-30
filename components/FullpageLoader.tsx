
const FullPageLoader = () => {
  return (
    <div className="flex-col items-center justify-center h-screen w-full fixed top-0 left-0 z-[999] bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      <p className='mt-6'>Loading. Please Wait</p>
    </div>
  );
};

export default FullPageLoader;

