const productModel = require("../models/productModel");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case in sensitive
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }



  filter() {
    
    const queryCopy = { ...this.queryStr }; // console.log(queryCopy);
    //Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]); // console.log(queryCopy);

    //Filter For Price and rating
    // console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //regular expression
    this.query = this.query.find(JSON.parse(queryStr)); //  this.query means productModel.find() understood this
    // console.log(queryStr);
    return this;
  }

  pagination(resultPerPage){
    
    const currentPage = Number(this.queryStr.page) || 1;  //50product ,per page 5

    const skip = resultPerPage * (currentPage-1);

    this.query =  this.query.limit(resultPerPage).skip(skip);
    return this;


  }
}

module.exports = ApiFeatures;
