import { useState } from "react";

function ButtonDisplay({ keyParams, label, selectedValue, parentKey, callback }) {
  const [showMore, setShowMore] = useState(false);

  const handleMoreClick = () => {
    setShowMore(!showMore);
  };

  const visibleNodes = showMore ? keyParams : keyParams.slice(0, 4);

  return (
    <div>
      <div className="pl-10 flex flex-row w-4/4 rounded-lg ">
        <div className="mr-10 min-w-20">{label}</div>
        <div
          className={`grid grid-cols-2 `}
        >
          {visibleNodes.map((form) => (
            <button
              key={form}
              className="mb-5 mr-5 text-gray-600 border border-gray-600 rounded-md p-1 bg-white hover:bg-gray-100 focus:outline-none"
              style={{width: 'fit-content', borderColor: `${form == selectedValue ? 'darkgreen': ''}`,  borderWidth: `${form == selectedValue ? '3px': 'thin'}`}}
              onClick = {()=>{
                 callback(parentKey, form)
              }}
            >
              {form}
            </button>
          ))}

        </div>
            {keyParams.length > 4 && (
            <button
              onClick={handleMoreClick}
              className="cursor-pointer mb-5 text-blue-700 font-bold"
              style={{alignSelf: 'end'}}
            >
              {showMore ? "hide.." : "more.."}
            </button>
          )}
      </div>
    </div>
  );
}

export default ButtonDisplay;
