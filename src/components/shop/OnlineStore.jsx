import React, { useReducer, useEffect } from "react";
import { Products } from "./Products";
import Card from "./Card";

const initProduct = () => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts
    ? JSON.parse(storedProducts)
    : {
        products: [
          {
            id: 1,
            name: "product 1",
            price: 10,
            quantity: 0,

            src: "https://media.istockphoto.com/id/185262648/photo/red-apple-with-leaf-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gUTvQuVPUxUYX1CEj-N3lW5eRFLlkGrU_cwwwOWxOh8=",
            text: "Added",
          },
          {
            id: 2,
            name: "product 2",
            price: 20,
            quantity: 0,

            src: "https://greenshop.md/images/thumbnails/550/450/detailed/1/%D0%B0%D0%BF%D0%B5%D0%BB%D1%8C%D1%81%D0%B8%D0%BD.jpg",
            text: "Added",
          },
          {
            id: 3,
            name: "product 3",
            price: 30,
            quantity: 0,
            src: "https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy9wcm9kdWN0cy83MS9jb3ZlcnMvRXdZamhhLmpwZw.jpg",
            text: "Added",
          },
        ],
        cart: [],
        totalQuantity: 0,
      };
};
function productReduser(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      const prodactToAdd = state.products.find((item) => {
        return item.id === action.payload;
      });
      if (prodactToAdd) {
        prodactToAdd.quantity += 1;
        const itemInCard = state.cart.find((item) => {
          return item.id === +prodactToAdd.id;
        });
        if (itemInCard) {
          itemInCard.quantity += 1;
          itemInCard.totalPrice = itemInCard.quantity * itemInCard.price;
        } else {
          state.cart.push({
            ...prodactToAdd,
            quantity: 1,
            totalPrice: prodactToAdd.price,
          });
        }
        state.totalQuantity += 1;

        return {
          ...state, //возвращяет новый объект
          cart: [...state.cart],
        };
      }
      console.log(prodactToAdd);
      break;

    case "DECREASE":
      const updatedCard = state.cart.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.price;
          }
          if (state.totalQuantity > 0) {
            state.totalQuantity -= 1;
          }
        }
        return item;
      });
      const updatedProduct = state.products.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.price;
          }
          if (state.totalQuantity > 0) {
            state.totalQuantity -= 1;
          }
        }
        return item;
      });
      console.log(updatedProduct);

      return {
        ...state,
        cart: updatedCard,
        products: updatedProduct,
      };

    case "REMOVE":
      const removeCard = state.cart.filter(
        (item) => item.id !== action.payload
      );
      const removeQuantity = state.products.map((item) =>
        item.id === action.payload ? { ...item, quantity: 0 } : { ...item }
      );
      return {
        ...state,
        cart: removeCard,
        products: removeQuantity,
      };

    default:
      return;
  }
}

const OnlineStore = () => {
  const [products, dispacht] = useReducer(productReduser, initProduct());

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProductHandler = (id) => {
    dispacht({ type: "ADD_PRODUCT", payload: id });
  };
  const decreaceProductHandler = (id) => {
    dispacht({ type: "DECREASE", payload: id });
  };

  const remuoveProductHandler = (id) => {
    dispacht({ type: "REMOVE", payload: id });
  };

  const totalPrices = products.cart.reduce(
    (acc, current) => acc + current.totalPrice,
    0
  );

  console.log(products);
  return (
    <>
      <Card cardEl={products.cart} />
      <Products
        products={products.products}
        onAddProduct={addProductHandler}
        onDecreaseProduct={decreaceProductHandler}
        onRemoveHandler={remuoveProductHandler}
        totalPrice={totalPrices}
      />
      {/* <h3>Total price:{totalPrices}</h3> */}
    </>
  );
};

export default OnlineStore;
