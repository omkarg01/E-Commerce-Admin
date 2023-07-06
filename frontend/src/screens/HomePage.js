import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { caretBack } from 'ionicons/icons';
import styled from 'styled-components';

const HomePage = () => (
    <>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={caretBack}  mode={'md'} defaultHref={'admin/orders'}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">Hello World</IonContent>
        </IonPage>
    </>
);


export default HomePage;