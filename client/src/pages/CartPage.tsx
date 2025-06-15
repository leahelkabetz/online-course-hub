import { Container, Row, Col, Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import { useState, useMemo } from "react";

const CartPage = () => {
  return(
    <h1>Cart Page</h1>
  )
};

export default CartPage;
