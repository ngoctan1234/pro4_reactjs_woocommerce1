import { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../redux/authSlice";
import { useNavigate,Link } from "react-router-dom";
export default function FormLogin() {
    const [username, setUsername] = useState('12345');
    const [password, setPassword] = useState('12345');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);
    const navigate=useNavigate()
    const handleLogin = (e) => {
      e.preventDefault();
      dispatch(login({ username, password }));
        navigate("/");
      
    };
    return (
        <div>
            <Container className="w-50 p-5 my-5">
                <h1>Login</h1>
            <Form onSubmit={(e)=>handleLogin(e)}>
                <FormGroup floating>
                    <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="User name"
                        value={username}
                        type="text"
                    />
                    <Label for="exampleEmail">
                        Username
                    </Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Password"
                        value={password}
                        type="password"
                    />
                    <Label for="examplePassword">
                        Password
                    </Label>
                </FormGroup>
                {' '}
                <Button>
                    Submit
                </Button>
            </Form>
            </Container>
        </div>
    )
}