import { useEffect, useState } from "react";
import { getProduct } from "../utils/api";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={product.name}
              style={{ width: 300, height: 300, objectFit: "cover", marginBottom: 10 }}
            />
          ))}
        </div>

        {/* Product Info */}
        <div>
          <p>{product.description}</p>
          <p>
            Price: <b>${product.price}</b>{" "}
            {product.compareAtPrice && (
              <span style={{ textDecoration: "line-through", color: "#888" }}>
                ${product.compareAtPrice}
              </span>
            )}
          </p>
          <p>Stock: {product.stock}</p>
          <p>Rating: {product.rating} ({product.reviewCount} reviews)</p>

          {/* Specifications */}
          <h3>Specifications:</h3>
          <ul>
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <p>
            Tags:{" "}
            {product.tags.map((tag) => (
              <span key={tag} style={{ marginRight: 5, color: "#555" }}>
                #{tag}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ marginTop: 30 }}>
        <h2>Reviews:</h2>
        {product.reviews.length === 0 && <p>No reviews yet.</p>}
        {product.reviews.map((rev) => (
          <div key={rev.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 15, paddingBottom: 10 }}>
            <h4>
              {rev.title} {rev.verifiedPurchase && <span style={{ color: "green" }}>(Verified Purchase)</span>}
            </h4>
            <p>Rating: {rev.rating} / 5</p>
            <p>{rev.comment}</p>
            <small>Posted on: {new Date(rev.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
