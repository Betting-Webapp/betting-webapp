import { useState } from "react"
import { Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const Register = ({ userData, setUserData }) => {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        // await fetch('http://betting.eastus.cloudapp.azure.com:5000/loginPlayer'), {
        // await fetch('https://bettingtrial1.azurewebsites.net/loginPlayer', {
        // await fetch('http://ec2-3-144-235-181.us-east-2.compute.amazonaws.com/loginPlayer', {
        // await fetch('http://127.0.0.1:5001/registerPlayer', {
        await fetch('https://tornelud.busillis.com/registerPlayer', {
            mode: 'cors',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
            }, method: form.method, body: JSON.stringify(formJson)
        })
            .then((response) => response.json())
            .then(async (response) => {
                if (response.status == 200) {
                    navigate('/')
                }
                else {
                    alert('Error')
                }
            })
            .catch((err) => {
                console.log(err);
            });
        //calluserData

    }
    return (<>
        <form method="post" onSubmit={handleSubmit}>
            {/* <label>
                Email: <input name="emailAddress" type="text" />
            </label>
            <hr />
            <label>
                Password: <input name="password" type="password" />
            </label> */}
            <TextField variant="standard" label="Email" name="emailAddress" type="text" />
            <br/>
            <TextField variant="standard" label="Password" name="password" type="password" />
            <br/>
            <TextField variant="standard" label="Confirm Password" name="confirmPassword" type="password" />
            <br/>
            <TextField variant="standard" label="First Name" name="firstName" type="text" />
            <br/>
            <TextField variant="standard" label="Last Name" name="lastName" type="text" />
            <br/>
            <TextField variant="standard" label="Contact" name="contact" type="number" />
            <br/>
            {/* <hr /> */}
            {/* <button type="reset">Reset form</button>
            <button type="submit">Submit form</button> */}
            {/* <Button variant="outlined">Reset</Button> */}
            <Button variant="contained" type="submit">Register</Button>
        </form>
    </>)
}

