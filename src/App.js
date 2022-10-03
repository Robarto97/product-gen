import "./App.css";
import Products from "./Products-component";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

function App() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = 0;
  if (products) {
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Change Category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  let totalProducts = products;
  const filterList = () => {
    if (!category) {
      totalProducts = products;
      return currentProducts;
    } else {
      totalProducts = products.filter(
        (product) => product.category === category.toLowerCase()
      );
      return totalProducts;
    }
  };

  let filteredList = useMemo(filterList, [category, currentProducts]);

  return (
    <div className="App">
      <h1>All Products!</h1>
      <input
        value={search}
        type="text"
        placeholder="Show Products Per Page"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setProductsPerPage(e.target.value);
            setSearch("");
          }
        }}
      />
      <div className="category-wrapper">
        <span>Filter by Category:</span>
        <select
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
          <option value="Fragrances">Fragrances</option>
          <option value="Skincare">Skincare</option>
          <option value="Groceries">Groceries</option>
          <option value="Home-decoration">Home decoration</option>
          <option value="Furniture">Furniture</option>
          <option value="Tops">Tops</option>
          <option value="Womens-dresses">Women dresses</option>
          <option value="Womens-shoes">Women shoes</option>
          <option value="Mens-shirts">Men shirts</option>
          <option value="Mens-shoes">Men shoes</option>
          <option value="Mens-watches">Men watches</option>
          <option value="Womens-watches">Women watches</option>
          <option value="Womens-bags">Women bags</option>
          <option value="Womens-jewellery">Women jewellery</option>
          <option value="Sunglasses">Sunglasses</option>
          <option value="Automotive">Automotive</option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Lighting">Lighting</option>
        </select>
      </div>
      {products && <Products products={filteredList} />}
      {products && (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={totalProducts.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default App;
