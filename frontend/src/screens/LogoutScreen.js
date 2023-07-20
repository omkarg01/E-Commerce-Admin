import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { Button, Modal } from 'react-bootstrap';

const LogoutScreen = () => {
    const [show, setShow] = useState(false);
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const handleClose = () => {
        console.log("closed");
        // logoutHandler()
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const logoutHandler = () => {
        handleClose()
        dispatch(logout())
    }
    console.log("logout screen")
    useEffect(() => {
        handleShow()
        // logoutHandler()
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={logoutHandler}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutScreen