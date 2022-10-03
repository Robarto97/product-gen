import "./products.css";
const Products = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <div className="image-wrapper">
            <img src={product.images[0]} alt="" />
          </div>
          <div className="bottom">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p className="category">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
