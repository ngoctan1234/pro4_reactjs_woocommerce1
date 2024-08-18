
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Button, Container, FormGroup, Input, Modal, ModalBody, ModalFooter,
    ModalHeader, Table, Label
} from "reactstrap";
import { addNewProduct, editProduct, deleteProduct, getAll } from "../../redux/productSlice";
import { getAllCate } from "../../redux/categorySlice";
import CategoryDropdown from '../categoryDropdown/CategoryDropdown';
import ReactPaginate from 'react-paginate';
export default function CProducts() {
    const [currentPage, setCurrentPage] = useState(0)
    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    };
    const [product, setProduct] = useState({ name: "Iphone 15 pro max", price: "30000", description: "Không trả góp", category_id: 3 })
    const dispatch = useDispatch();
    const { products ,totalPages} = useSelector((state) => state.pro);
    const { categories } = useSelector((state) => state.cate);
    const navigate = useNavigate()
    const  limit = 5;
    useEffect(() => {
        dispatch(getAll({currentPage,limit}))
        dispatch(getAllCate({ currentPage, limit }))
    }, [currentPage])
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const addNew = () => {
        setModal(!modal)
        //  console.log(category)
        //  setProduct({...product,category_id:category.id})
        dispatch(addNewProduct({ ...product, category_id: category.id }))
        setProduct({ name: "Iphone 15 pro max", price: "30000", description: "Không trả góp", category_id: 3 })
    }
    const deleteById = (id) => {
        dispatch(deleteProduct(id))
    }
    const [category, setCategory] = useState({})
    // if(categories){
    //     setCategory(categories[0])
    // }
    console.log(categories && categories)
    const [proEdit, setProEdit] = useState({ isEdit: false, id: "" })
    const handle_edit = (id, item) => {
        setProEdit({ isEdit: true, id })
        setProduct(item)
        
    }
    const handle_save = (id) => {
        console.log("test product")
        console.log(product)
       dispatch(editProduct({id,product:{...product,category_id:category.id}}))
       setProduct({ name: "Iphone 15 pro max", price: "30000", description: "Không trả góp", category_id: 3 })
       setProEdit({ isEdit: false, id: "" })
    }
    return (
        <div className="products">

            <Container>
                <Button onClick={toggle} className="btn btn-success">Add  New Product</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Product name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                description
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.map((item, index) => (
                                <tr key={index} className={proEdit.isEdit && item.id === proEdit.id ?"product-item active":"product-item"}>
                                    <th scope="row" >
                                        {index + 1}
                                    </th>
                                    <td>

                                        {proEdit.isEdit && item.id === proEdit.id ?
                                            <Input type="text" value={product.name}
                                                onChange={(e) => setProduct({...product,name:e.target.value})} 
                                            />
                                            :
                                            item.name
                                        }
                                    </td>
                                    <td>
                                    {proEdit.isEdit && item.id === proEdit.id ?
                                            <Input type="text" value={product.price}
                                                onChange={(e) => setProduct({...product,price:e.target.value})} 
                                            />
                                            :
                                            item.price
                                        }
                                    </td>
                                    <td>
                                    {proEdit.isEdit && item.id === proEdit.id ?
                                            <Input type="text" value={product.description}
                                                onChange={(e) => setProduct({...product,description:e.target.value})} 
                                            />
                                            :
                                            item.description
                                        }
                                    </td>
                                    <td>
                                    {proEdit.isEdit && item.id === proEdit.id ?
                                            <CategoryDropdown categories={categories} categoryId={item.category_id} onSelect={setCategory}
                                            />
                                            :
                                           ( categories &&
                                            categories.find(x => x.id === item.category_id)?.name
                                           )
                                        }
                                       

                                    </td>
                                    <td>
                                        {
                                              proEdit.isEdit && item.id === proEdit.id ?
                                              <Button className="btn btn-success"
                                                    onClick={() => handle_save(item.id)}
                                                >Save </Button>
                                                :
                                                <>
                                                <Button className="btn btn-warning"
                                            onClick={() => handle_edit(item.id, item)}
                                        ><i class="fa-regular fa-pen-to-square"></i></Button>
                                        <Button className="btn btn-danger"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this category?')) {
                                                    deleteById(item.id);
                                                }
                                            }}
                                        ><i class="fa-solid fa-delete-left"></i></Button>
                                         <Button className="btn btn-success">
                                        <Link className="nav-link" to={`/product-detail/${item.id}`}> <i class="fa-brands fa-product-hunt"></i></Link>
                                            </Button>
                                                </>
                                        }
                                        
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </Table>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(totalPages)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </Container>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label
                            for="exampleEmail"
                            hidden
                        >
                            Product name
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Name"
                            type="text"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            for="exampleEmail"
                            hidden
                        >
                            Product Price
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Price"
                            type="text"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            for="exampleEmail"
                            hidden
                        >
                            Description
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Description"
                            type="text"
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            for="exampleEmail"
                            hidden
                        >
                            Category
                        </Label>
                        <CategoryDropdown categories={categories} onSelect={setCategory} />
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addNew}>
                        Add
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}