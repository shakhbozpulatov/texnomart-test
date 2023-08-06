import axios from "axios";

const getCategories = async () => {
  let categories = await axios
    .get("https://dummyjson.com/products/categories")
    .catch((err) => {
      console.log(err);
    });
  const response = categories.data.map((category) => {
    const firstLetter = category[0].toUpperCase();
    const word = category.substr(1).replace(/-/g, " ");

    return `${firstLetter}${word}`;
  });

  return [response, categories];
};

const getProducts = async (page = 1, limit = 12) => {
  const skip = (page - 1) * 10;

  let response = await axios
    .get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    .catch((err) => {
      console.log(err);
    });

  return response.data;
};

const getProductsByCategory = async (category) => {
  let res = await axios
    .get(`https://dummyjson.com/products/category/${category.toLowerCase()}`)
    .catch((err) => {
      console.log(err);
    });

  return res.data;
};

const getProductById = async (id) => {
  let product = await axios
    .get(`https://dummyjson.com/products/${id}`)
    .catch((err) => {
      console.log(err);
    });

  console.log(product);

  return product.data;
};

export { getProducts, getCategories, getProductsByCategory, getProductById };
