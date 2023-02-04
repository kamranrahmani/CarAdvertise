const {Op} = require('sequelize');

function filterQuery(query){
    
    let filterArray = [];
    for(const key in query){
        if(key.toLowerCase() == 'price' && query[key].trim().length > 0){
            const filterPrice = {
                price:{
                    [Op.lt] : query[key]
                }
            }
            filterArray.push(filterPrice);
        }
        else if(key.toLowerCase() == 'mileage' && query[key].trim().length > 0){
            const filterMileage = {
                mileage:{
                    [Op.lt] : query[key]
                }
            }
            filterArray.push(filterMileage);
            
        }
        else if(key.toLowerCase() == 'brand' && query[key] != 'ALL'){
            const filterBrand = {
                brandId:{
                    [Op.eq] : query[key]
                }
            }
            filterArray.push(filterBrand);
            
        }
        else if(key.toLowerCase() == 'year' && query[key].trim().length > 0){
            const filterYear = {
                year:{
                    [Op.lt] : query[key]
                }
            }
            filterArray.push(filterYear);    
        }
    }
    let filterClause = {
        [Op.and] : filterArray
    }
    return filterClause;
}

module.exports = {
    filterQuery
}