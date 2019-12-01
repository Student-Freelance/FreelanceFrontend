import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react";
import {useStores} from "../index";


const ArrayComponent = (props) => {
    const [input, setInput] = useState("");
    const {userStore} = useStores();
    const handleArrayChange = (event, key) => {
        props.storelink[key] = (event.target.value);

    };

    return (
        <Container>
            <label className='col-form-label-sm'>{props.description}</label>
            {
                props.storelink.map((value, key) => {
                    return (
                        <Card key={key} body>
                            <div className="input-group">
                                <input
                                    type="text" value={props.storelink[key]}
                                    name={props.name} onChange={(e) => handleArrayChange(e, key)}
                                    disabled={!props.editMode}
                                    className={(!props.editMode ? 'form-control-plaintext' : 'form-control')}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                props.storelink.remove(value)
                                                userStore.updateUser({...userStore.studentUser})
                                            }}
                                    >Delete
                                    </button>
                                </div>
                            </div>
                        </Card>

                    )
                })
            }
            <br/>
            < div
                className="input-group mb-3">
                < input
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
            </div>
        </Container>
    );
};

export default observer(ArrayComponent)

