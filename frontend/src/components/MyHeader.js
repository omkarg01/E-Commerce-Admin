import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { caretBack ,exit } from 'ionicons/icons';
import { useSelector } from 'react-redux'


const MyHeader = ({link, title}) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // console.log(userInfo)
  return (
    <IonHeader style={{"marginBottom" : "20px"}}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon={caretBack} mode={'md'} defaultHref={link === null ? null : link}></IonBackButton>
        </IonButtons>
        {/* <IonButtons slot="end">
          <IonBackButton icon={exit} mode={'md'} defaultHref={"/logout"}></IonBackButton>
        </IonButtons> */}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default MyHeader