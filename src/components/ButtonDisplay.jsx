import { useState } from "react";
import PropTypes from 'prop-types';
function ButtonDisplay({ keyParams, label, selectedValue, parentKey, callback,minimumSellingPrice, availibilityMap, salt }) {
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
              className={`mb-5 mr-5 text-gray-600 ${availibilityMap[salt][form] && minimumSellingPrice
                 ? 'border' : 'border-dashed'} border-gray-600 rounded-md p-1 bg-white hover:bg-gray-100 focus:outline-none`}
              style={{width: 'fit-content', borderColor: `${form == selectedValue && availibilityMap[salt][form] && minimumSellingPrice ? 'darkgreen': form == selectedValue && !availibilityMap[salt][form] ? '#5d6063' : ''}`,  borderWidth: `${form == selectedValue ? '2px': 'thin'}`}}
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

ButtonDisplay.propTypes = {
  keyParams: PropTypes.node,
  label:PropTypes.node,
  selectedValue:PropTypes.node,
  parentKey:PropTypes.node,
  callback:PropTypes.node,
  minimumSellingPrice:PropTypes.node,
  availibilityMap:PropTypes.node,
  salt:PropTypes.node
};


export default ButtonDisplay;
