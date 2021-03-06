import React from "react";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {useStores} from "../index";
import {useHistory, withRouter} from "react-router-dom";
import {FormText, ListGroup, ListGroupItem} from "react-bootstrap";


const JobObjectComponent = (props) => {
    const {userStore, jobStore} = useStores();
    const history = useHistory();


    return (
        <Container className='text-center'>
            <label className='col-form-label-sm'>{props.description}</label>
            <ListGroup> {
                props.storelink.map((value, key) => {
                    return (
                        <ListGroupItem style={{cursor: 'pointer'}} key={key} body>
                            <div className="input-group">
                                <FormText
                                    onClick={() => {
                                        history.push(`/job/${value.id}`)
                                    }}
                                    type="text"
                                    className={'form-control-plaintext text-center'}
                                >{value.title} - Click for details</FormText>
                                {props.editMode ?
                                    <div className="input-group-append">
                                        <button className="btn btn-danger"
                                                type="button"
                                                onClick={() => {
                                                    jobStore.deleteJob(value.id);
                                                    userStore.companyUser.jobs.remove(value.id);
                                                    userStore.updateUser({...userStore.companyUser})
                                                }}
                                        >Delete
                                        </button>
                                    </div> : ''}
                            </div>
                        </ListGroupItem>
                    )
                })
            }      </ListGroup>
            <br/>
            {props.editMode ?
                <div>
                    <button className="btn btn-success"
                            type="submit"
                            onClick={() => {
                                history.push(`/create/${userStore.companyUser.companyName}`)
                            }}
                    >Add new
                    </button>
                </div>

                : ''
            }
        </Container>
    );
};

export default withRouter(observer(JobObjectComponent))

