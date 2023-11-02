import React from "react";
import styled from "styled-components";
import { FaShoppingBasket } from "react-icons/fa";
import { ProductItem } from "./ProductItem";

export const Products = ({
  products,
  onAddProduct,
  onDecreaseProduct,
  onRemoveHandler,
  totalPrice,
}) => {
  return (
    <ProductsContainer>
      <Title>Товары в магазине:</Title>
      <InnerDiv>
        {products.map((item) => {
          return (
            <ProductItem
              {...item}
              key={item.id}
              onAddProduct={onAddProduct}
              onDecreaseProduct={onDecreaseProduct}
              onRemoveHandler={onRemoveHandler}
            />
          );
        })}
      </InnerDiv>
      <ShoppingCartIcon />{" "}
      <h3>
        Total Price:{totalPrice}${/*цены космические*/}
      </h3>
    </ProductsContainer>
  );
};
const ProductsContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ShoppingCartIcon = styled(FaShoppingBasket)`
  font-size: 36px;
`;

const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
