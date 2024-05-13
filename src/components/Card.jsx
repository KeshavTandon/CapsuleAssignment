import PropTypes from "prop-types";

function Card({ children, salt, selectedValues, minimumSellingPrice }) {
  return (
    <div  className="flex flex-col items-center justify-center  w-full">
      <div style={{background: 'linear-gradient(to left, #e9f4e9, white)'}} className="flex justify-between w-3/4 bg-white shadow-lg rounded-lg p-1">
        <div className="grid grid-cols-1 gap-2" style={{width: '500px'}}>{children}</div>
        <div className="self-center">
          <div className="text-center font-semibold font-serif ">{salt}</div>
          <div className="font-medium text-center text-blue-800">{`${selectedValues.form} | ${selectedValues.strength} | ${selectedValues.packing}`}</div>
          </div>
        {minimumSellingPrice ? <div className="mr-10 self-center font-extrabold text-3xl text-blue-950 ">{`From Rs. ${minimumSellingPrice}`}</div>: 
        <div className="font-normal text-xs self-center p-2 text-center w-32 h-14 bg-white mr-10">No stores selling this product near you</div>}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  salt: PropTypes.node,
  selectedValues: PropTypes.node,
  minimumSellingPrice: PropTypes.node,
};

export default Card;
