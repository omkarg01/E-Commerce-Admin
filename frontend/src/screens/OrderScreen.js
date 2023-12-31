import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import { IonContent, IonPage } from '@ionic/react'
import MyHeader from '../components/MyHeader'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = async () => {
    try {
      const msg = {
        "to": "cVA9FLIhSIeMHXNRp3-LrH:APA91bGpaT1_QMe9a9clPkvHB56QmQAWjgtp-6-I0rNi2IGzi0MqaS_EAl9ShU2wRc3YG7Lh8glsKevD7unwd1IoS__c48XeuJU5w0y96lY8yI-Jn7221SLFBZa-lbdLEXHstX07Ux1j",
        "notification": {
          "body": "Your order has been delivered!",
          "title": "In E-Commerce App",
          "android_channel_id": "channel-id4",
          "sound": "default"
        }
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "key=AAAAK7YEuqo:APA91bGxQyOuHZWal3ovKOofiaOkEskt0YgHSIBV0BK6ic-kX1H1ZDdvlSPvEFqT4uHa1-ZexaI3_d84x6kXVerv2HSaC1WOnO8C36HOGx0FMlJ8uB88ExYb-y80YQ0fbhC2a_Qz0GKJ",
        },
      }
      const { data } = await axios.post("https://fcm.googleapis.com/fcm/send", msg, config)
      console.log(data);
      dispatch(deliverOrder(order))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <IonPage>
      <MyHeader title={"Order"} link={"/admin/orderlist"} />
      <IonContent className="ion-padding" style={{ fontFamily: "Fantasy" }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <React.Fragment>
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order ID</h2>
                    <p>{orderId}</p>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>{' '}
                      <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                      <strong>Address:</strong>
                      {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message variant='success'>
                        Delivered on {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Delivered</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {"Google Pay"}
                    </p>
                    {order.isPaid ? (
                      <Message variant='success'>Paid on {order.paidAt}</Message>
                    ) : (
                      <Message variant='danger'>Not Paid</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {/* {!order.isPaid && (
                      <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                    )} */}
                    {loadingDeliver && <Loader />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <ListGroup.Item>
                          <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliverHandler}
                          >
                            Mark As Delivered
                          </Button>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </IonContent>
    </IonPage>
  )
}

export default OrderScreen
