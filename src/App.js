import "./App.css";
import Products from "./Products-component";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function App() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [search, setSearch] = useState("");

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

  return (
    <div className="App">
      <h1>All Products!</h1>
      <input
        type="text"
        placeholder="Show Products Per Page"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setProductsPerPage(e.target.value);
          }
        }}
      />
      {products && <Products products={currentProducts} />}
      {products && (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default App;
