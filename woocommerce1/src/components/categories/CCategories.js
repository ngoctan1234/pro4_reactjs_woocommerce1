import { Button, Container, FormGroup, Input, Modal, ModalBody, ModalFooter,
     ModalHeader, Table,Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCate,addNewCategory ,deleteCategory,editCategory} from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

export default function CCategories() {
    const [text,setText]=useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [cateEdit,setCateEdit]=useState({isEdit:false,id:""})

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    };
    const dispatch = useDispatch();
    const { totalPages, categories } = useSelector((state) => state.cate);

    const limit = 5;
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllCate({ currentPage, limit }))
    }, [currentPage])
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const addNew = () => {
        setModal(!modal)
        dispatch(addNewCategory(text))
        setText("")
    }
    const deleteById =(id)=>{
        dispatch(deleteCategory(id))
    }
    return (
        <div className="products">
            <Container>
                <Button onClick={toggle} className="btn btn-success">Add  new category</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Category ID
                            </th>
                            <th>
                                Category Name
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories && categories.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row" >
                                        {index + 1}
                                    </th>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {
                                            cateEdit.isEdit&&item.id===cateEdit.id?
                                            <Input  type="text" value={text} 
                                            onChange={(e)=>setText(e.target.value)}
                                            onKeyDown={(e)=>{
                                                if(e.key==='Enter'){
                                                    setCateEdit({isEdit:false,id:""})
                                                    dispatch(editCategory({ id: item.id, name: text }))
                                                    setText("");
                                                }
                                                }
                                            }
                                            />
                                            :
                                            <p onDoubleClick={()=>{
                                                setCateEdit({isEdit:true,id:item.id})
                                                setText(item.name);
                                            }}
                                                > {item.name}</p>
                                        }
                                      
                                       
                                    </td>
                                    <td>
                                        <Button className="btn btn-danger"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this category?')) {
                                              deleteById(item.id);
                                            }
                                          }}
                                        
                                        >Delete</Button>
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
                <ModalHeader toggle={toggle}>Add new category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label
                            for="exampleEmail"
                            hidden
                        >
                            Category name
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Name"
                            type="text"
                            value  ={text}
                            onChange={(e)=>setText(e.target.value)}
                        />
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