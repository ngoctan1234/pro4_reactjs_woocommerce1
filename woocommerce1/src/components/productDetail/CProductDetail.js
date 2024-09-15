import { Button, Container, FormGroup, Input, Label, Table } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductDetail, uploadImage } from "../../redux/productSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import axiosInstance from "../../utils/axiosInstance";

export default function CProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetails } = useSelector((state) => state.pro);
    const [images, setImages] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        dispatch(getAllProductDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (productDetails) {
            productDetails.forEach(item => {
                fetchImage(item.imageUrl);
            });
        }
    }, [productDetails]);

    const fetchImage = async (imageUrl) => {
        const token = localStorage.getItem("accessToken"); // Lấy token của bạn từ Redux store hoặc localStorage
        try {
            const response = await axiosInstance.get(`/products/images/${imageUrl}`, {
                responseType: 'blob' // Đảm bảo phản hồi trả về là Blob
            });
            const imageObjectURL = URL.createObjectURL(response.data);
            setImages(prev => ({ ...prev, [imageUrl]: imageObjectURL }));
        } catch (error) {
            console.error("Error fetching image", error);
        }
    };
    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append each selected file to the form data
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            dispatch(uploadImage({id,formData}))
            console.log('Uploaded successfully:');
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };
    return (
        <div className="products">
            <Container>

                <h1>Id: {id}</h1>
                <form onSubmit={handleImageUpload}>
                    <FormGroup>
                        <Label for="imageUpload">Upload Image</Label>
                        <input type="file" name="files" multiple onChange={handleFileChange} />
                    </FormGroup>
                    <Button  type="submit" className="btn btn-success">Add new image</Button>
                </form>
                
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productDetails && productDetails.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.id}</td>
                                <td>
                                    <img src={images[item.imageUrl]} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                </td>
                                <td>
                                    <Button className="btn btn-danger">
                                        <i className="fa-solid fa-delete-left"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
