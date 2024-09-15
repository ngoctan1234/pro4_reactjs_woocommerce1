import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import Header from '../header/Header';

const Validation = () => {
    const [res, setRes] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors([]); // Reset lỗi trước khi gửi form
        setIsSubmitted(false); // Reset trạng thái hiển thị thành công
        try {
            const response = await axios.post('http://localhost:8080/category/insert', { name });
            console.log(response.data); // Xử lý response khi thành công
            setRes(response.data);
            setIsSubmitted(true); // Đặt trạng thái thành công
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data); // Lưu lỗi từ server
            }
        }
    };

    return (
        <div>
            <Header />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="categoryName">Name</Label>
                    <Input
                        type="text"
                        id="categoryName"
                        value={name}
                        invalid={errors.length > 0} // Kiểm tra nếu có lỗi
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* Hiển thị lỗi từ backend dưới form input */}
                    {errors.length > 0 && (
                        <FormFeedback>
                            {errors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </FormFeedback>
                    )}
                </FormGroup>

                <Button type="submit" color="primary">Submit</Button>
            </Form>

            {/* Hiển thị thông báo thành công */}
            {isSubmitted && (
                <Alert color="success" className="mt-3">
                    {res}
                </Alert>
            )}
        </div>
    );
};

export default Validation;
