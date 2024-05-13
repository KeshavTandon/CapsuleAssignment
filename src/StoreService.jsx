class StoreService{
   prepareSaltAvailabilityList = (stores) => {
      const saltAvailabilityList = [];
      return stores.saltSuggestions.reduce((acc, item) => {
      const availibilityObject = this.applyFilteredSuggestions(item)
    acc.push(availibilityObject);
    return acc;
    }
      ,saltAvailabilityList)
   }   

   applyFilteredSuggestions = (item) => {
     return {
        forms: item.available_forms,
        strengths: Object.keys(item.salt_forms_json[item.most_common.Form]),
        packings: Object.keys(item.salt_forms_json[item.most_common.Form][item.most_common.Strength]),
        salt: item.salt,
        selectedValues: {
            form: item.most_common.Form,
            strength: item.most_common.Strength,
            packing: item.most_common.Packing
        },
         minimumSellingPrice: this.extractMinimumRates(item, {
            form: item.most_common.Form,
            strength: item.most_common.Strength,
            packing: item.most_common.Packing
        })
      }
   }

   extractMinimumRates = (item, selectedValues) => {
    let minRate = 10000000;
    let x = Object.values(item.salt_forms_json[selectedValues.form][selectedValues.strength][selectedValues.packing]).reduce((acc, productData) => {
        if(productData){
            productData.forEach(pharmacyRateObj => {
                if(pharmacyRateObj.selling_price < minRate){
                    minRate = pharmacyRateObj.selling_price;    
                }
            })
            acc= minRate;
        }
        return acc;
    },null)
    return x;
   }

   prepareAvailibilityMap=(stores)=>{
    let availibilityMap = {};
       for(let saltObj of stores.saltSuggestions){
          let salt = saltObj.salt;
          availibilityMap[salt] = {};
         for(let form of Object.keys(saltObj.salt_forms_json)){
             for(let strength of Object.keys(saltObj.salt_forms_json[form])){
                 for(let packing of Object.keys(saltObj.salt_forms_json[form][strength])){
                    for(let product of Object.values(saltObj.salt_forms_json[form][strength][packing]))
                      if(product){
                            availibilityMap[salt][form] = true;
                            availibilityMap[salt][strength] = true;
                            availibilityMap[salt][packing] = true;                      
                        }
                    }
                }
            }
         }
         return availibilityMap;
       }
   }

export default new StoreService();