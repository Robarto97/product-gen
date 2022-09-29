import "./products.css"
const Products = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
