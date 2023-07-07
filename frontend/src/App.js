import React from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// import Header from './components/Header'
// import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useSelector } from 'react-redux'

import { Route } from 'react-router';

import { library, exit, fileTray, peopleCircleOutline } from 'ionicons/icons';


const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Header /> */}
        {/* <main className='py-3'> */}
        {/* <Container> */}
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route
          path='/admin/productlist'
          // render={() => <ProductListScreen/>}
          component={ProductListScreen}
          exact
        />
        <Route
          path='/admin/productlist/:pageNumber'
          component={ProductListScreen}
          exact
        />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route path='/admin/orderlist' component={OrderListScreen} />
        <Route path='/search/:keyword' component={HomeScreen} exact />
        <Route path='/page/:pageNumber' component={HomeScreen} exact />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={HomeScreen}
          exact
        />
        <Route path='/' component={HomeScreen} exact />
        {/* </Container> */}
        {/* </main> */}
        {/* <Footer /> */}
        {/* </Router> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/admin/productlist">
          <IonIcon icon={library} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>

        <IonTabButton tab="radio" href="/admin/orderlist">
          <IonIcon icon={fileTray} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>

        <IonTabButton tab="library" href="/admin/userlist">
          <IonIcon icon={peopleCircleOutline} />
          <IonLabel>Users</IonLabel>
        </IonTabButton>

        <IonTabButton tab="search" href="/search">
          <IonIcon icon={exit} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

const App = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // console.log(userInfo);
  return (
    <IonApp>
      <IonReactRouter>
        {/* <Router> */}
        <Route path="/login" component={LoginScreen} exact={true} />
        <Route path="/" component={userInfo?.isAdmin ? MainTabs : LoginScreen} />
        {/* <MainTabs /> */}
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
