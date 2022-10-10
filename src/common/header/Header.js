import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import { InputLabel, FormControl, Input, Button, Tabs, Tab, Typography } from '@material-ui/core';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement(document.getElementById('root'));

export default function Header(props) {

    if (localStorage.getItem("userData") === "" || localStorage.getItem("userData") === null) {
        console.log("UserData added");
        let userData = [{email: "Admin@123", password: "Admin123"}];
        localStorage.setItem("userData", JSON.stringify(userData))
    }


    if (sessionStorage.getItem("btnName") === null) {
        sessionStorage.setItem("btnName", "LOGIN")
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const [loginBtnName, setLoginBtnName] = React.useState(sessionStorage.getItem("btnName"));
    const [registrationMsg, setRegistrationMsg] = React.useState("")

    function openModal() {
        if (loginBtnName === "LOGIN") {
            setIsOpen(true);
        }
        else {
            sessionStorage.setItem("btnName", "LOGIN");
            setLoginBtnName(sessionStorage.getItem("btnName"));
            window.alert("Logout Successful!");
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleTabs(e, newValue) {
        setTabValue(newValue);
    }

    function TabPanel(props) {
        const {children, value, index} = props;
        return (
            <div>
                {value===index && children}
            </div>
        )
    }

    function loginValidate() {
        const username = document.getElementById("modal-username").value;
        const password = document.getElementById("modal-password").value;

        if (username!=="" && password!=="") {
            let userData = JSON.parse(localStorage.getItem("userData"));

            let loginSuccess = false;
            for (let i=0; i<userData.length; i++) {
                if (userData[i].email===username && userData[i].password===password) {
                    loginSuccess = true;
                }
            }

            if (loginSuccess) {
                sessionStorage.setItem("btnName", "LOGOUT");
                setLoginBtnName(sessionStorage.getItem("btnName"));
                closeModal();
                window.alert("LOGIN Successful!");
            }
            else {
                window.alert("LOGIN Unsuccessful! Please Register or check your username and password")
            }
        }
        
    }

    function onRegister() {
        const firstName = document.getElementById("modal-firstname").value;
        const lastName = document.getElementById("modal-lastname").value;
        const email = document.getElementById("modal-email").value;
        const password = document.getElementById("modal-password").value;
        const contact = document.getElementById("modal-contact").value;

        if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && contact !== "") {
            let newUser = {
                email: email,
                password: password,
            }
            let userData = JSON.parse(localStorage.getItem("userData"));
            userData.push(newUser);
            localStorage.setItem("userData", JSON.stringify(userData));
            setRegistrationMsg("Registration Successful. Please Login!")
        }
    }

    function bookClickHandle() {
        if (loginBtnName==="LOGIN") {
            openModal();
        }
    }
 
    if (props.headerFor === "home") {
        return (
            <div className="header">
                <div>
                    <img src={logo} alt="logo-img" id="logo-img"/>
                </div>
                <div>
                    <Button variant="contained" id="header-login" onClick={openModal}>{loginBtnName}</Button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        id="header-modal"
                    >
                        <Tabs value={tabValue} onChange={handleTabs}>
                            <Tab label="LOGIN"/>
                            <Tab label="REGISTER"/>
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-login-username" >Username</InputLabel>
                                <Input type="text" id="modal-username" /> 
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-login-password">Password</InputLabel>
                                <Input type='password' id="modal-password" />
                            </FormControl> <br/> <br/>

                            <Button variant="contained" color="primary" onClick={loginValidate}>LOGIN</Button>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-firstname" required={true}>First Name</InputLabel>
                                <Input id="modal-firstname"  required={true}/> 
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-lastname">Last Name</InputLabel>
                                <Input id="modal-lastname" />
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-email">Email</InputLabel>
                                <Input type='email' id="modal-email" />
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-password">Password</InputLabel>
                                <Input type="password" id="modal-password" />
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-contact">Contact No.</InputLabel>
                                <Input id="modal-contact" />
                            </FormControl> <br/> <br/>

                            <Typography variant="body1">
                                {registrationMsg}
                            </Typography>

                            <Button form="modal-form" variant="contained" color="primary" id="modal-register-btn" onClick={onRegister}>REGISTER</Button>
                            
                        </TabPanel>
                            
                    </Modal>
                </div>
            </div>
        )
    }
    else if (props.headerFor === "detail") {
        return (
            <div className="header">
                <div>
                    <img src={logo} alt="logo-img" id="logo-img"/>
                </div>
                <div id="header-btn-div">
                    <Button variant="contained" color="primary" id="header-book-btn" onClick={bookClickHandle}>BOOK SHOW</Button>
                    <Button variant="contained" id="header-login" onClick={openModal}>{loginBtnName}</Button>
                </div>
                <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        id="header-modal"
                    >
                        <Tabs value={tabValue} onChange={handleTabs}>
                            <Tab label="LOGIN"/>
                            <Tab label="REGISTER"/>
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-login-username" >Username</InputLabel>
                                <Input type="text" id="modal-username" /> 
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-login-password">Password</InputLabel>
                                <Input type='password' id="modal-password" />
                            </FormControl> <br/> <br/>

                            <Button variant="contained" color="primary" onClick={loginValidate}>LOGIN</Button>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-firstname" required={true}>First Name</InputLabel>
                                <Input id="modal-firstname" name="firstName"/>
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-lastname">Last Name</InputLabel>
                                <Input id="modal-lastname" name="lastName"/>
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-email">Email</InputLabel>
                                <Input type='email' id="modal-email" name="email"/>
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-password">Password</InputLabel>
                                <Input type="password" id="modal-password" name="password"/>
                            </FormControl> <br/> <br/>

                            <FormControl required={true}>
                                <InputLabel htmlFor="modal-contact">Contact No.</InputLabel>
                                <Input id="modal-contact" name="contact"/>
                            </FormControl> <br/> <br/>

                            <Typography variant="body1">
                                {registrationMsg}
                            </Typography>

                            <Button form="modal-form" variant="contained" color="primary" id="modal-register-btn" onClick={onRegister}>REGISTER</Button>
                            
                        </TabPanel>
                            
                    </Modal>
            </div>
        )
    }
    
}