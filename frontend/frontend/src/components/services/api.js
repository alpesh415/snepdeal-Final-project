const API_BASE_URL = "https://snepdeal-final-project-5.onrender.com";

export const API = {
  // Auth
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,

  // Products
  products: `${API_BASE_URL}/product/get`,
  productById: (id) => `${API_BASE_URL}/product/get/${id}`,

  // Categories
  categories: `${API_BASE_URL}/category/get`,

  // Cart
  cart: `${API_BASE_URL}/cart`,

  // Wishlist
  wishlist: `${API_BASE_URL}/wishlist`,

  // Orders
  orders: `${API_BASE_URL}/order`,

  
  payment: `${API_BASE_URL}/payment`,
};

export default API;