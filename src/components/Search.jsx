import { useEffect, useState } from "react";
import icon from "../components/searchIcon.png";
import Card from "./Card";
import ButtonDisplay from "./ButtonDisplay";
import { useSelector, useDispatch } from "react-redux";
import { addStore } from "./DataSlice";
import storeService from "../StoreService";
import { addOrignalData } from "./OrignalSlice";

function Search() {
  const storeItems = useSelector((state) => state.stores.items || []);
  const orignalItems = useSelector((state) => state.orignalData.orignalItems || []);

  const [searchQuery, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getStores();
  }, []);

  async function getStores() {
    try {
      const response = await fetch(
        `https://backend.cappsule.co.in/api/v1/new_search?q=${searchQuery}&pharmacyIds=1,2,3`
      );
      const json = await response.json();
      const saltAvailabilityList = storeService.prepareSaltAvailabilityList(
        json.data
      );
      dispatch(addStore(saltAvailabilityList));
      dispatch(addOrignalData(json.data))
    } catch (error) {
      console.log(error);
    }
  }

  const setSelectedKeys = (key, value, index) => {
    let clonedOrignalItems = JSON.parse(JSON.stringify(orignalItems));
    let clonedStoreItems = JSON.parse(JSON.stringify(storeItems));
    if(key == 'form'){
       clonedOrignalItems.saltSuggestions[index].most_common.Form = value;
       clonedOrignalItems.saltSuggestions[index].most_common.Strength = Object.keys(orignalItems.saltSuggestions[index].salt_forms_json[value])[0];
       clonedOrignalItems.saltSuggestions[index].most_common.Packing = Object.keys(orignalItems.saltSuggestions[index].salt_forms_json[value][Object.keys(orignalItems.saltSuggestions[index].salt_forms_json[value])[0]])[0];

    }
    if(key == 'strength'){
       clonedOrignalItems.saltSuggestions[index].most_common.Strength = value;
       clonedOrignalItems.saltSuggestions[index].most_common.Packing = Object.keys(orignalItems.saltSuggestions[index].salt_forms_json[clonedOrignalItems.saltSuggestions[index].most_common.Form][value])[0];
    }
    if(key == 'packing'){
       clonedOrignalItems.saltSuggestions[index].most_common.Packing = value;
    }
    const formattedNode = storeService.applyFilteredSuggestions(
        clonedOrignalItems.saltSuggestions[index]
      );
     clonedStoreItems[index] = formattedNode;
      dispatch(addStore(clonedStoreItems));
      dispatch(addOrignalData(clonedOrignalItems))
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 space-y-10">
      <div className="flex items-center rounded-lg overflow-hidden w-3/4 bg-white shadow-lg">
        <img src={icon} alt="search" className="w-10 h-10 p-1 bg-white" />
        <input
          type="search"
          className="w-full px-4 py-2 text-base text-gray-700 bg-white focus:outline-none"
          placeholder="Type your medicine name here"
          onChange={handleInputChange}
        />
        <button
          className="px-5 py-2 text-blue-500 font-bold"
          onClick={() => {
            getStores();
          }}
        >
          Search
        </button>
      </div>

      {storeItems.map((item, index) => (
        <Card key={item.id} salt={item.salt} selectedValues={item.selectedValues} minimumSellingPrice = {item.minimumSellingPrice} >
          <ButtonDisplay callback={(parentKey, value)=>{
             setSelectedKeys(parentKey, value, index)
          }} parentKey='form' keyParams={item.forms} selectedValue = {item.selectedValues.form} label="Form:" />
          <ButtonDisplay callback={(parentKey, value)=>{
            setSelectedKeys(parentKey, value, index)
          }} parentKey='strength' keyParams={item.strengths} selectedValue = {item.selectedValues.strength} label="Strength:" />
          <ButtonDisplay callback={(parentKey, value)=>{
            setSelectedKeys(parentKey, value, index)
          }} parentKey='packing' keyParams={item.packings} selectedValue = {item.selectedValues.packing} label="Packing:" />
        </Card>
      ))}
    </div>
  );
}

export default Search;
