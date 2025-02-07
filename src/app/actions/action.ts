import { cars } from "@/app/types/CarsType";

export const addToCart = (product: cars) => {
    const cart: cars[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex === -1) {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId: string) => {
    let cart: cars[] = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string) => {
    const cart: cars[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const productIndex = cart.findIndex((item) => item._id === productId);

    if (productIndex > -1) {
        // Quantity logic is removed since you don't need it
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const getCartItems = (): cars[] => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
};
