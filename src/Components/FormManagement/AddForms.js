import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import { surveyForm_postFormData, surveyFormBlock_postBlockData, formListing_getData } from '../../Services/Services';
import { Link } from 'react-router-dom';
import AddBlocks from './AddBlocks';

const AddForms = () => {

    const [formCreated, setFormCreated] = useState(false);

    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [maxMarks, setMaxMarks] = useState("");
    const [formID, setFormID] = useState(0);

    const [addBlockComponent, setAddBlockComponent] = useState([]);
    const [count, setCount] = useState(0);

    // Handle input1 change
    const handleFormNameChange = (event) => {
        setFormName(event.target.value);
    };

    // Handle input2 change
    const handleFormDescriptionChange = (event) => {
        setFormDescription(event.target.value);
    };

    // Handle input3 change
    const handleMaxMarksChange = (event) => {
        setMaxMarks(event.target.value);
    };


    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        surveyForm_postFormData({
            name: formName,
            description: formDescription,
            max_marks: maxMarks,
        })
            .then((response) => {
                setFormCreated(true);
                console.log(response.data);
                return response;
            })
            .catch((error) => {
                return error;
            });
    };

    const handleDelete = (index) => {
        const newComponents = [...addBlockComponent];
        newComponents.splice(index, 1);
        setAddBlockComponent(newComponents);
    };

    const handleAddBlocks = async () => {
        // formListing_getData().then((response) => {
        //     console.log(response.data);
        //     console.log(response.data[0].id);
        //     setFormID(response.data[0].id);
        //     return response;
        // })
        //     .catch((error) => {
        //         return error;
        //     });

            setCount(count + 1);
            const newBlockComponent = <AddBlocks count={count} formID={formID} />;
            setAddBlockComponent([...addBlockComponent, newBlockComponent]);
    }


    return (
        <div className='createForms-container'>
            {!formCreated ?
                //After Form Creation
                (
                    <>
                        <div className='container'>
                            <div>
                                <h2 className='inlineDisplay'>FORM DETAILS</h2>
                                <h5 className='inlineDisplay'>Marks: {maxMarks}</h5>
                            </div>

                            <Link to='/dashboard' className='links'><Button variant="contained" color="primary">
                                Back to Dashboard
                            </Button></Link>
                        </div>
                        <div className='details-container'>
                            <div>
                                <h4 className='inlineDisplay'>Form Name:</h4>
                                <p className='inlineDisplay'>{formName}</p>
                            </div>
                            <div>
                                <h4 className='inlineDisplay'>Form Description:</h4>
                                <p className='inlineDisplay'>{formDescription}</p>
                            </div>
                        </div>

                        <div className='formBtn'>
                            <Button variant="contained" color="primary" onClick={() => handleAddBlocks()}>
                                Add New Block
                            </Button>
                        </div>
                        <div>
                            {addBlockComponent.map((component, index) => (
                                <div key={index} >
                                    {component}
                                    <div className='deleteBlockBtn-container'>
                                        <Button variant="contained" color="primary" onClick={() => handleDelete(index)}>
                                            Delete Above Block
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </>
                )
                :
                //First Create Form
                (
                    <>
                        <div className='container'>
                            <h3 className='inlineDisplay'>ENTER FORM DETAILS</h3>
                            <Link to='/dashboard' className='links'><Button variant="contained" color="primary">
                                Back to Dashboard
                            </Button></Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Form Name"
                                value={formName}
                                onChange={handleFormNameChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Form Description"
                                value={formDescription}
                                onChange={handleFormDescriptionChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Maximum Marks"
                                variant="outlined"
                                value={maxMarks}
                                onChange={handleMaxMarksChange}
                                fullWidth
                                margin="normal"
                                inputProps={{
                                    type: 'number',
                                    pattern: '[0-9]*',
                                    min: 10
                                }}
                            />
                            <Button variant="contained" color="primary" type="submit" onClick={() => handleSubmit}>
                                Save
                            </Button>
                        </form>
                    </>
                )
            }

        </div>
    )
}

export default AddForms
