import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://intern-task-api.bravo68web.workers.dev/api/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await response.json();

        // Assuming the response format contains a "user" object with the email (sub)
        if (response.ok && userData.user) {
          setCurrentUser(userData.user); // Save the user info
        } else {
          console.error("Failed to fetch user data:", userData);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://intern-task-api.bravo68web.workers.dev/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized access, redirecting to login.");
            navigate("/login");
          }
          return;
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <span>Welcome, {currentUser?.sub}</span>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>

      <div className="p-4 max-w-7xl mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div key={product.id} className="p-4 border rounded shadow-md">
                <div className="relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-32 w-full object-cover mb-2"
                  />
                  <span
                    className="bg-green-500 text-white p-1 transform -rotate-6 absolute bottom-2 right-2"
                    style={{ display: "block", width: "max-content" }}
                  >
                    ${product.price}
                  </span>
                </div>
                <h3 className="text-lg mt-2">{product.title}</h3>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`p-2 ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
