import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {useStores} from "../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";


const ArrayComponent = (props) => {
    const [input, setInput] = useState("");
    const {userStore} = useStores();
    const handleArrayChange = (event, key) => {
        props.storelink[key] = (event.target.value);

    };

    return (
        <Container className='text-center'>
            <label className='col-form-label-sm'>{props.description}</label>
            <ListGroup> {
                props.storelink.map((value, key) => {
                    return (
                        <ListGroupItem key={key}>
                            <div className="input-group">
                                <input
                                    type="text" value={props.storelink[key]}
                                    name={props.name} onChange={(e) => handleArrayChange(e, key)}
                                    disabled={!props.editMode}
                                    className={(!props.editMode ? 'form-control-plaintext text-center' : 'form-control')}
                                />
                                {props.editMode ?
                                    <div className="input-group-append">
                                        <button className="btn btn-danger"
                                                type="button"
                                                onClick={() => {
                                                    props.storelink.remove(value);
                                                    userStore.updateUser({...userStore.studentUser})
                                                }}
                                        >Delete
                                        </button>
                                    </div> : ''}
                            </div>
                        </ListGroupItem>

                    )
                })
            }  </ListGroup>
            <br/>
            {props.editMode ?
                <div
                    className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type here"
                        value={input}
                        onChange={event => {
                            setInput(event.target.value)
                        }
                        }
                    />
                    <div className="input-group-append">
                        <button className="btn btn-success"
                                type="submit"
                                onClick={() => {
                                    props.storelink.push(input);
                                    userStore.updateUser({...userStore.studentUser})
                                }}
                        >Add new
                        </button>
                    </div>
                </div> : ''
            }
        </Container>
    );
};

export default observer(ArrayComponent)

