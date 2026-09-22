export const API_BASE = "http://localhost:8095";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}


export const normalizeProduct = (p) => {
  if (!p) return null;

  const original = Number(p.price) || 0;
  const selling = p.discountPrice > 0 ? Number(p.discountPrice) : original;
  const discount =
    original > selling && original > 0
      ? Math.round(((original - selling) / original) * 100)
      : 0;

  return {
    id: p._id,
    _id: p._id,
    title: p.name,
    name: p.name,
    description: p.description,
    price: selling,
    oldPrice: original,
    discount,
    rating: p.rating ?? 4,
    reviews: p.reviews ?? 0,
    category: p.category?.name || p.category || "",
    categoryId: p.category?._id || p.category || "",
    brand: p.brand || "",
    image: p.image,
    stock: p.stock ?? 0,
  };
};

export const api = {
  auth: {
    register: (payload) => request("/auth/register", { method: "POST", body: payload }),
    login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  },

  products: {
    getAll: () => request("/product/get"),
    getById: (id) => request(`/product/get/${id}`),
  },

  categories: {
    getAll: () => request("/category/get"),
  },

  cart: {
    add: (payload) => request("/cart/add", { method: "POST", body: payload }),
    get: (userId) => request(`/cart/get/${userId}`),
    update: (payload) => request("/cart/update", { method: "PUT", body: payload }),
    remove: (payload) => request("/cart/remove", { method: "DELETE", body: payload }),
    clear: (payload) => request("/cart/clear", { method: "DELETE", body: payload }),
  },

  wishlist: {
    add: (payload) => request("/wishlist/add", { method: "POST", body: payload }),
    get: (userId) => request(`/wishlist/get/${userId}`),
    remove: (payload) => request("/wishlist/remove", { method: "DELETE", body: payload }),
  },

  orders: {
    create: (payload) => request("/order/create", { method: "POST", body: payload }),
    getMine: (userId) => request(`/order/my-orders/${userId}`),
    getById: (id) => request(`/order/get/${id}`),
    cancel: (id) => request(`/order/cancel/${id}`, { method: "PUT" }),
  },

  payments: {
    create: (payload) => request("/payment/create", { method: "POST", body: payload }),
    getByOrder: (orderId) => request(`/payment/order/${orderId}`),
    createRazorpayOrder: (payload) =>
      request("/payment/razorpay/create-order", { method: "POST", body: payload }),
    verifyRazorpay: (payload) =>
      request("/payment/razorpay/verify", { method: "POST", body: payload }),
  },
};

export default api;
