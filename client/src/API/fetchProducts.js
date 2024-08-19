import { useCallback } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { productsState, categoriesState } from "../recoil/atom";

const url = "http://localhost:3333/";
const fetchProductsList = () => {
  const [products, setProducts] = useRecoilState(productsState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(url + "products");
      if (response.data.status === "ok") {
        setProducts(response.data.data);
        return response.data.data;
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [setProducts]);

  const fetchProductWithCategories = useCallback(async ({ filters }) => {
    // console.log(filters);
    try {
      const response = await axios.get(url + "products/category", {
        params: filters,
      });
      if (response.data.status === "ok") {
        setProducts(response.data.data);
        return response.data.data;
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [setProducts]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(url + "products/categories");
      if (response.data.status === "ok") {
        setCategories(response.data.data);
        // console.log(response.data.data);
        // console.log(products);
        return response.data.data;
      } else {
        console.error("Error fetching categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { fetchProducts, fetchCategories, fetchProductWithCategories };
};
export default fetchProductsList;
