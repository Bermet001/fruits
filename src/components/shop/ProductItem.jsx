import React from "react";
import styled from "styled-components";

export const ProductItem = (props) => {
  const {
    name,
    price,
    src,
    alt,
    id,
    onAddProduct,
    quantity,
    onDecreaseProduct,
    onRemoveHandler,
  } = props;
  return (
    <ProductContainer>
      <ProductInfo>
        <p>{id}</p>
        <ProductImage src={src} alt={alt} />
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}$</ProductPrice>
        <ButtonsContainer>
          <Button onClick={() => onAddProduct(id)}>+</Button>
          <span>{quantity}</span>
          <Button onClick={() => onDecreaseProduct(id)}>-</Button>
          <Button onClick={() => onRemoveHandler(id)}>Remove</Button>
        </ButtonsContainer>
      </ProductInfo>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 700px;
`;

const ProductInfo = styled.div`
  flex: 1;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  gap: 130px;
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 16px;
`;

const ProductImage = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  &:hover {
    background-color: #e8e8e8;
  }
`;
