import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { IonContent, IonPage } from '@ionic/react'
import MyHeader from '../components/MyHeader'

const PartnershipScreen = ({ match, history }) => {
    const productId = match.params.id || 1;

    const [vendorName, setVendorName] = useState('')
    const [addressVendor, setAddressVendor] = useState('')
    const [pincode, setPincode] = useState('')
    const [vendorEmail, setVendorEmail] = useState('')
    const [vendorPhone, setVendorPhone] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [ownerPhone, setOwnerPhone] = useState('')
    const [pandcard, setPandcard] = useState('')
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')
    const [isChecked, setIsChecked] = useState(false);

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate

    //   useEffect(() => {
    // if (successUpdate) {
    //   dispatch({ type: PRODUCT_UPDATE_RESET })
    //   history.push('/admin/productlist')
    // } else {
    //   if (!product.name || product._id !== productId) {
    //     dispatch(listProductDetails(productId))
    //   } else {
    //     setName(product.name)
    //     setPrice(product.price)
    //     setImage(product.image)
    //     setBrand(product.brand)
    //     setCategory(product.category)
    //     setCountInStock(product.countInStock)
    //     setDescription(product.description)
    //   }
    // }
    //   }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch(
        //   updateProduct({
        //     _id: productId,
        //     name,
        //     price,
        //     image,
        //     brand,
        //     category,
        //     description,
        //     countInStock,
        //   })
        // )
    }

    return (
        <IonPage>
            <MyHeader title={"Partnership Registration"} />
            <IonContent className="ion-padding">
                {/* <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link> */}
                <FormContainer>
                    {/* <h1>Edit Product</h1> */}
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler} style={{ fontFamily: "Fantasy" }}>
                            <Form.Group controlId='vendorName'>
                                <Form.Label>Vendor Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Vendor Name'
                                    value={vendorName}
                                    onChange={(e) => setVendorName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='addressVendor'>
                                <Form.Label>Address of Vendor</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter vendor address'
                                    value={addressVendor}
                                    onChange={(e) => setAddressVendor(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='pincode'>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter pincode'
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='vendorEmail'>
                                <Form.Label>Vendor Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter email'
                                    value={vendorEmail}
                                    onChange={(e) => setVendorEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='vendorPhone'>
                                <Form.Label>Vendor Phone</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter vendor phone number'
                                    value={vendorPhone}
                                    onChange={(e) => setVendorPhone(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='ownerName'>
                                <Form.Label>Owner Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter owner name'
                                    value={ownerName}
                                    onChange={(e) => setOwnerName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='ownerEmail'>
                                <Form.Label>Owner Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter email'
                                    value={ownerEmail}
                                    onChange={(e) => setOwnerEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='ownerPhone'>
                                <Form.Label>Owner Phone</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter owner phone number'
                                    value={ownerPhone}
                                    onChange={(e) => setOwnerPhone(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Shop Registration Ceritificate</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Image url'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    disabled={true}
                                ></Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='pandcard'>
                                <Form.Label>Shop Pancard</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter pancard number'
                                    value={pandcard}
                                    onChange={(e) => setPandcard(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='terms&conditions'>
                                <FormCheck id="terms&conditions" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} label="Terms & Conditions" />
                            </Form.Group>
                            {/* 
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

                            <Button className='border-solid ml-5 my-3' type='submit' variant='primary'>
                                Request for Partnership
                            </Button>
                        </Form>
                    )}
                </FormContainer>
            </IonContent>
        </IonPage>
    )
}

export default PartnershipScreen
