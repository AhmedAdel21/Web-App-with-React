import React , {Component} from 'react';
import { Card , CardImg  , CardText , CardBody , CardTitle,Modal , ModalHeader, ModalBody, Row, Label, Col, Breadcrumb, Button, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}) {
        return(
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
             </Card>               
            );
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
        }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishID, values.rating, values.author, values.comment)
        this.toggleModal();
    }

    render(){
        return(
        <React.Fragment>
            <Button outline onClick={this.toggleModal}>
                <span className='fa fa-pencil'></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor='rating' md={12}>
                                Rating
                            </Label>
                            <Col md={12}>
                                <Control.select className="form-control" model=".rating"
                                id='.rating' name='.rating' >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label md={12}>
                                Your Name
                            </Label>
                            <Col md={12}>
                                <Control.text className="form-control" model=".author"
                                name="author" id="author" placeholder="Your Name"
                                validators={{ required, minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                            }}/>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label md={12}>
                                Comment
                            </Label>
                            <Col md={12}>
                                <Control.textarea rows='6' model='.comment' id='comment'
                                name='comment' className='form-control'/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button> 
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
        );
    }
}
function RenderComments({comments, addComment, dishID}) {
        
            const allComments = comments.map((comment) =>{
                return(
                    <ul className='list-unstyled'>
                        <li><p>{comment.comment}</p></li>
                        <li><p>-- {comment.author} ,
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p></li>
                    </ul>
                );

            });

            return(
                <div>
                <h4>Comments</h4>
                <p>{allComments}</p>
                <CommentForm addComment={addComment} dishID={dishID} />
                </div>
            );
        
        
}

const DishDetail = (props) => {
        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/Menu' >Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment} dishID={props.dish.id} />
                    </div>
                </div>
            </div>
            
        );
}



export default DishDetail;