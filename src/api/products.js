import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async ({ queryKey }) => {
  try {
    const [
      _key,
      { page = 1, limit = 9, search = "", category = "", min = "", max = "" },
    ] = queryKey;

    const skip = (page - 1) * limit;

    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

    //  PRIORITY 1: CATEGORY API
    if (category) {
      url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    //  PRIORITY 2: SEARCH API (override category)
    if (search) {
      url = `${BASE_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    const res = await axios.get(url);

    let products = res.data.products;

    //  HANDLE search + category together (manual filter)
    if (search && category) {
      products = products.filter((p) => p.category === category);
    }

    // PRICE FILTER (client side)
    if (min && Number(min) >= 0) {
      products = products.filter((p) => p.price >= Number(min));
    }

    if (max && Number(max) >= 0) {
      products = products.filter((p) => p.price <= Number(max));
    }

    return {
      ...res.data,
      products,
    };
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

//  SINGLE PRODUCT
export const fetchProductById = async ({ queryKey }) => {
  const [_key, id] = queryKey;

  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};
