const PreLoader = ({width}) => {
  return (
    <span className={`block p-2 bg-gray-200 animate-pulse rounded-lg ` + width}></span>
  );
};

export default PreLoader;