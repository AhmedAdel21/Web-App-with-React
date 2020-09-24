import React from 'react';
import { Card , CardImg  , CardText , CardBody , CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom'

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

function RenderComments({comments}) {
        
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
            
        );
}



export default DishDetail;