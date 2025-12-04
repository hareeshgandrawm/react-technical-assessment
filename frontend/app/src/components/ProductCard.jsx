import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
      <div
            key={product.id}
            style={{
              border: "1productx solid #ccc",
              padding: 10,
              width: 250,
              borderRadius: 8,
            }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "150", height: 150, objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <p>Rating: {product.rating} ({product.reviewCount} reviews)</p>
             <Link to={`/products/${product.id}`}>
                <button>View Details</button>
            </Link>
        </div>
  );
}

export default ProductCard;
