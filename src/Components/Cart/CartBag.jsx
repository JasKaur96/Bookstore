import React from 'react';
import Appbar from '../../Components/Header/Header';
import './CartBag.css';
import Service from '../../Services/BookService';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@material-ui/icons/RemoveCircleOutlineTwoTone';
import { TextField, Button } from '@material-ui/core';
import Dont from "../../Assets/book.png";
import Header from '../../Components/Header/Header';
import Footer from '../Footer/Footer';
// import Footer from '../Footer/Footer';

const service = new Service();
 
class CartBag extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            _cartbooks: [],
            name: "",
            phno: "",
            pincode: "",
            locality: "",
            address: "",
            city: "",
            state: "",
            show: false,
            showOs: false,
            reload: true,
            nameError: false, phnoError: false, pincodeError: false, localityError: false,
            addressError: false, cityError: false, stateError: false,
        })

    }
    validationCheck = () => {
        this.setState({
            nameError: false, nameErrormsg: "", phnoError: false, phnoErrormsg: "", pincodeError: false,
            pincodeErrormsg: "", localityError: false, localityErrormsg: "", addressError: false,
            addressErrormsg: "", cityError: false, cityErrormsg: "", stateError: false, stateErrormsg: ""
        })
        var valid = true;
        if (this.state.name.length === 0) {
            this.setState({ nameError: true })
            this.setState({ nameErrormsg: "Enter your name " })
            valid = false;
        }
       
        let patter = /^[0-9]{10}$/;
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.phno)) {
            this.setState({ phnoError: true })
            this.setState({ phnoErrormsg: " enter your 10 digit mobile number" })
            valid = false;
        }
            let pincodePattern = /^[0-9]{6}$/;
            let pincodeNo = new RegExp(pincodePattern);
            if (!pincodeNo.test(this.state.pincode)) {
             this.setState({ pincodeError: true })
             this.setState({ pincodeErrormsg: "please enter your pin code" })
             valid = false;
         }
        let localityPattern = /[a-zA-Z][a-zA-Z ]*/;
        let local = new RegExp(localityPattern)
        if (!local.test(this.state.locality)) {
            this.setState({ localityError: true })
            this.setState({ localityErrormsg: "please enter your locality" })
            valid = false;
        }
        let addressPattern = /[a-zA-Z][a-zA-Z ]*/;
        let localaddress = new RegExp(addressPattern)
        if (!localaddress.test(this.state.address)) {
            this.setState({ addressError: true })
            this.setState({ addressErrormsg: "please enter  your address " })
            valid = false;
        }
        if (this.state.city.length === 0) {
            this.setState({ cityError: true })
            this.setState({ cityErrormsg: "Enter your  city " })
            valid = false;
        }
        let statePattern = /[a-zA-Z][a-zA-Z ]*/;
        let stateName = new RegExp(statePattern)
        if (!stateName.test(this.state.state)) {
            this.setState({ stateError: true })
            this.setState({ stateErrormsg: "please enter your state name" })
            valid = false;
        }
        return valid;

    }

    componentDidMount() {
      this.getCart();
    } 
    
    changeState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    order = () => {
        let store = [];
        this.state._cartbooks.map((val) => {
            let arr = {
                "product_id": val.product_id._id,
                "product_name": val.product_id.bookName,
                "product_quantity": val.quantityToBuy,
                "product_price": val.product_id.price
            };
            store.push(arr);
        })

        let data = {
            orders: store,
        };
        service.order(data).then((res) => {
            console.log(res);
            this.props.history.push('/ordersuccess')
        }).catch((err) => {
            console.log(err);
        })
        this.state._cartbooks.map((val) => {
            this.removeCartId(val._id);
        })
    }
    getCart(){
        service.getCartItems().then((res) => {
            console.log(res);
            this.setState({ _cartbooks: res.data.result });
            // console.log(JSON.stringify(this.state._cartbooks));
        })
    }

    increment = (productid, quantity) => {
        let data = {
            "quantityToBuy": quantity + 1
        }
        console.log(data);
        console.log("Quantity",data.quantityToBuy);
        service.cartIncrementDecrement(data, productid).then((res) => {
            this.getCart();
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    decrement = (productid, quantity) => {
        let data = {
            "quantityToBuy": quantity - 1
        }
        if(data.quantityToBuy >= 1){
            service.cartIncrementDecrement(data, productid).then((res) => {
                console.log(res);
                this.getCart();
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            console.log("Out of Stock!")
        }
       
    }

    changeStates = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    submitUserDetails = () => {
        if (this.validationCheck()) {
            let data = {
                "addressType": "Home",
                "fullAddress": `${this.state.name},${this.state.address},${this.state.locality},${this.state.pincode},${this.state.phno}`,
                "city": this.state.city,
                "state": this.state.state
            }

            service.userDetails(data).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
            this.setState({ showOs: true });
        } 
    }
    showCD = () => {
        this.setState({show: true});
        console.log("Show Customer Details", this.state.show)
    }

    removeCartId = (id) => {
        service.removeCartItem(id).then((res) => {
            console.log(res);
            this.setState({ reload: !this.state.reload })
            this.componentDidMount();
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (<>
            <Header cartbooks={this.state._cartbooks.length} show={false} />

            <div className="cartcontent"> <span className="Home">Home/MyCart</span>
            <br/>
                <div className="cartitems box">
                    <div className="mycart"> My Cart({this.state._cartbooks.length})</div>
                    {this.state._cartbooks.map((val, index) => {
                        return (<><div className="part1">
                            <div className="container">  <div>
                                <img src={Dont} alt="" />
                            </div>
                                <div className="items">
                                    <div>{val.product_id.bookName}</div>
                                    <div className="author"> by {val.product_id.author}</div>
                                    <div className="price">Rs.{val.product_id.price * val.quantityToBuy}</div>
                                    <div className="inlineicons">
                                        <AddCircleOutlineTwoToneIcon style={{ opacity: 0.4,cursor:"pointer"}} onClick={()=>this.increment(val._id, val.quantityToBuy)} />
                                        <div className="quantity">{val.quantityToBuy}</div>
                                        <RemoveCircleOutlineTwoToneIcon style={{ opacity: 0.4, cursor:"pointer"}} onClick={()=>this.decrement(val._id, val.quantityToBuy)} />
                                      {this.state.show === false ? <div className="remove" onClick={() => this.removeCartId(val._id)}>Remove</div>:<></>}
                                    </div>
                                   </div>
                            </div>
                        </div>
                        <div className="placeOrder">
                        {this.state._cartbooks.length - 1 === index ? this.state.show ? null : <Button  variant="contained" color="primary" onClick={this.showCD}>
                                    Place Order</Button> : null}
                        </div></>
                        )
                    })
                }
                </div>
                <div className="customerdetails box">
                    <div className="mycart">Customer Details </div>
                    {this.state.show ? <><br></br> <div className="addressfield">
                        <TextField id="outlined-basic" label="Name" variant="outlined"
                            name="name"
                            margin='dense' onChange={this.changeStates}
                            onChange={(e) => this.changeState(e)}
                            error={this.state.nameError}
                            helperText={this.state.nameErrormsg}
                        />
                        <TextField id="outlined-basic" label="Phone number" variant="outlined"
                            name="phno"
                            onChange={(e) => this.changeState(e)}
                            error={this.state.phnoError}
                            helperText={this.state.phnoErrormsg}
                            margin='dense' onChange={this.changeStates}
                        /><TextField id="outlined-basic" label="Pin Code" variant="outlined"
                            name="pincode"
                            onChange={(e) => this.changeState(e)}
                             error={this.state.pincodeError}
                             helperText={this.state.pincodeErrormsg}
                             margin='dense' onChange={this.changeStates}
                        /><TextField id="outlined-basic" label="Locality" variant="outlined"
                            name="locality"
                            margin='dense' onChange={this.changeStates}
                            error={this.state.localityError}
                            helperText={this.state.localityErrormsg}
                            margin='dense' onChange={this.changeStates}
                        />
                        <TextField id="outlined-basic" label="Address" variant="outlined"
                            name="address" 
                            className="address"
                            margin="dense" onChange={this.changeStates}
                            onChange={(e) => this.changeState(e)}
                            error={this.state.addressError}
                            helperText={this.state.addressErrormsg}
                        /><TextField id="outlined-basic" label="City/Town" variant="outlined"
                            name="city"
                            margin='dense' onChange={this.changeStates}
                            onChange={(e) => this.changeState(e)}
                            error={this.state.cityError}
                            helperText={this.state.cityErrormsg}
                        />
                        <TextField id="outlined-basic" label="State" variant="outlined"
                            name="state"
                            margin='dense' onChange={this.changeStates}
                            onChange={(e) => this.changeState(e)}
                            error={this.state.stateError}
                            helperText={this.state.stateErrormsg}
                        />

                    </div> 
                        {this.state.showOs ? null : <Button variant="contained" onClick={this.submitUserDetails}>Continue</Button>} </>
                        : null}</div>

                <div className="cartitems box">
                    <div className="mycart"> Order Summary</div>
                    {this.state.showOs ?
                        <> {this.state._cartbooks.map((val, index) => {
                            return (<> <br></br><div className="part1">
                                <div className="container">  <div>
                                    <img src={Dont} alt="" />
                                </div>
                                    <div className="items">
                                        <div>{val.product_id.bookName}</div>
                                        <div className="author"> by{val.product_id.author}</div>
                                        <div className="price">Quantity : {val.quantityToBuy}<br></br>Rs.{val.product_id.price * val.quantityToBuy}</div>

                                    </div></div>
                                    
                            </div>
                            <div className="checkout">
                                        {this.state._cartbooks.length - 1 === index
                                            ? <Button variant="contained" color="primary" onClick={this.order}>
                                                CHECKOUT </Button> : null}
                                    </div></>)

                        }) 
                        }<div><br></br></div> </> : null}
                </div>

            </div>
            <Footer/>
        </>)
    }
}
export default CartBag;