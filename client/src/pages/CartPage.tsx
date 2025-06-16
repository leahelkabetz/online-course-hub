import { Container, Row, Col, Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import { useState, useMemo } from "react";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
 return (
  <Container className="mt-5" dir="rtl">
    <h2 className="mb-4">העגלה שלי</h2>

    {cartItems.length === 0 ? (
      <p>העגלה ריקה</p>
    ) : (
      <>
        <Row xs={1} md={2} lg={3} className="g-4">
          {cartItems.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Img variant="top" src={item.image} height={160} style={{ objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>קטגוריה: {item.category}</Card.Text>
                  <Card.Text>מחיר: ₪{item.price}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    הסרה מהעגלה
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button variant="outline-danger" onClick={() => dispatch(clearCart())}>
            נקה עגלה
          </Button>
        </div>
      </>
    )}
  </Container>
);

};

export default CartPage;
