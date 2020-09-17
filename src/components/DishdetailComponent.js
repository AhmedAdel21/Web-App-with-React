import React from 'react';
import { Card , CardImg  , CardText , CardBody , CardTitle} from 'reactstrap';


function RenderDish(selectedDish) {
        if (selectedDish != null){
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width='100%' src={selectedDish.image} alt={selectedDish.name}/>
                        <CardBody>
                            <CardTitle>{selectedDish.name}</CardTitle>
                            <CardText>{selectedDish.description}</CardText>
                        </CardBody>
                    </Card>   
                </div>            
            );
        }
        else {
            return(<div></div>);
        }
}

function RenderComments(selectedDish) {
        if (selectedDish != null){
            const allComments = selectedDish.comments.map((comment) =>{
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
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <p>{allComments}</p>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
}

const DishDetail = (props) => {
        const selectedDish = props.selectedDish;
        return(
            <div className="container">
                <div className='row'>
                    {RenderDish(selectedDish)}
                    {RenderComments(selectedDish)}
                </div>
            </div>
            
        );
}



export default DishDetail;