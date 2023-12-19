import { useState } from "react"
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const Login = ({ userData, setUserData }) => {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        // await fetch('http://betting.eastus.cloudapp.azure.com:5000/loginPlayer'), {
        // await fetch('https://bettingtrial1.azurewebsites.net/loginPlayer', {
        // await fetch('http://ec2-3-144-235-181.us-east-2.compute.amazonaws.com/loginPlayer', {
        // await fetch('http://127.0.0.1:5001/loginPlayer', {
        await fetch('https://tornelud.busillis.com/loginPlayer', {
            mode: 'cors',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
            }, method: form.method, body: JSON.stringify(formJson)
        })
            .then((response) => response.json())
            .then(async (response) => {
                if (response.uuid) {
                    setUserData(response);
                    navigate('/home')
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
            <br/>
            {/* <hr /> */}
            {/* <button type="reset">Reset form</button>
            <button type="submit">Submit form</button> */}
            {/* <Button variant="outlined">Reset</Button> */}
            <Button variant="contained" type="submit">Log In</Button>
            <div><Typography align='center' variant='h6'>OR</Typography></div>
            <Button variant="outlined" onClick={() => {navigate('/registerPlayer')}}>Register</Button>
        </form>
    </>)
}

