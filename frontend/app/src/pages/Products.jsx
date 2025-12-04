import { useEffect, useState } from "react";
import { getProducts } from "../utils/api"; // your axios wrapper
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.data.products);
        setPagination(res.data.data.pagination);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const {value} = e.target;
    const filtered = products.filter((f) => f.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredProducts(filtered);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <p>
        Page {pagination?.page} of {pagination?.pages} | Total: {pagination?.total}
      </p>
      <div className="search-section">
        <input className="search" type="text" placeholder="Search by Name" onChange={handleSearch} />
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {(filteredProducts.length ? filteredProducts : products)?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
