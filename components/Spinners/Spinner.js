export const SpinOne = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex items-center mt-5 justify-center space-x-2 animate-bounce">
        <div className="w-4 h-4 bg-cloud-theme-blue  rounded-full"></div>
        <div className="w-4 h-4 bg-cloud-theme-gold  rounded-full"></div>
        <div className="w-4 h-4 bg-cloud-theme-dark rounded-full"></div>
      </div>
    </div>
  );
};
export const SpinTwo = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
      </div>
    </>
  );
};
export const SpinThree = () => {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
      </div>
    </>
  );
};
export const SpinFour = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex content-center justify-center items-center">
        <div className="mr-3">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
          ></div>
        </div>
        <div className="mr-3">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"
          ></div>
        </div>
        <div className="mr-3">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-16 h-16 border-4 border-blue-400 border-dotted rounded-full animate-spin"
          ></div>
        </div>
        <div className="mr-3">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin"
          ></div>
        </div>
      </div>
    </div>
  );
};
export const SpinMadoido = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-cloud-theme-gold animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
    </>
  );
};

export const BasicLoaderOptions = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-purple-500
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-green-500
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-500"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
    spinner-border
    animate-spin
    inline-block
    w-8
    h-8
    border-4
    rounded-full
    text-yellow-500
  "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export const BasicLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export const BasicLoaderDrwingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
        spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
          text-purple-500
        "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
        spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
          text-green-500
        "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-red-500"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
        spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
          text-yellow-500
        "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-gray-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
