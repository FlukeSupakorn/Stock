import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import axios from "axios";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId");

  //WARN : wishlist fetch database
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/wishlist/${userId}`);
        setWishlist(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleWishlistChange = (productId, isInWishlist) => {
    setWishlist(prevWishlist => 
      prevWishlist.map(item => 
        item.id === productId ? { ...item, isInWishlist } : item
      )
    );
  };

  return (
    <div className="flex flex-col m-10">
      <div className="text-3xl font-noto">สินค้าในรายการโปรด</div>
      <div className="mt-5">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                userId={userId}
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-xl font-noto">ยังไม่มีสินค้าในรายการโปรด</div>
        )}
      </div>
    </div>
  );
}

export default ({ userId }) => (
  <Layout>
    <WishlistPage userId={userId} />
  </Layout>
);
