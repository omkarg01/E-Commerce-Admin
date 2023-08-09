import React from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
// import ProductScreen from './screens/ProductScreen'
// import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
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

import { library, exit, fileTray, peopleCircleOutline, home } from 'ionicons/icons';
import LogoutScreen from './screens/LogoutScreen'
import PartnershipScreen from './screens/PartnershipScreen'
import { Switch } from 'react-router-dom/cjs/react-router-dom'


const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Header /> */}
        {/* <main className='py-3'> */}
        {/* <Container> */}
        <Route path='/order/:id' component={OrderScreen} />
       
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route
          path='/admin/productlist'
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
        <Route path='/admin/partnership' component={PartnershipScreen} />
        {/* <Route path='/search/:keyword' component={HomeScreen} exact /> */}
        <Route path='/page/:pageNumber' component={HomeScreen} exact />
        {/* <Route
          path='/search/:keyword/page/:pageNumber'
          component={HomeScreen}
          exact
        /> */}

        <Route path='/logout' component={LogoutScreen} />
        <Route path='/home' component={HomeScreen} exact />
        {/* <Route path='/' component={HomeScreen} exact /> */}
        {/* </Container> */}
        {/* </main> */}
        {/* <Footer /> */}
        {/* </Router> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="products" href="/admin/productlist">
          <IonIcon icon={library} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>

        <IonTabButton tab="orders" href="/admin/orderlist">
          <IonIcon icon={fileTray} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="users" href="/admin/userlist">
          <IonIcon icon={peopleCircleOutline} />
          <IonLabel>Users</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab="partnership" href="/admin/partnership">
          <IonIcon icon={peopleCircleOutline} />
          <IonLabel>Partnership</IonLabel>
        </IonTabButton>

        <IonTabButton tab="logout" href="/logout">
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
  console.log('userInfo', userInfo);
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route path='/register' component={RegisterScreen} />
          <Route path="/" component={userInfo ? MainTabs : LoginScreen} />
        </Switch>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
