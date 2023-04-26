import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';

const AddBlocks = ({ count, formID }) => {

  const [blockCreated, setBlockCreated] = useState(false);

  const [blockName, setBlockName] = useState("");


  const handleBlockNameChange = (event) => {
    setBlockName(event.target.value);
  };

  const handleBlockNameSubmit = () => {
    setBlockCreated(true);
    console.log(formID);
    // surveyFormBlock_postBlockData({
    //     name: blockName,
    //     survey_id: formID,
    // })
    //     .then((response) => {
    //         console.log("This is my form id " + formID);
    //         setCount(count + 1);
    //         const newBlockComponent = <AddBlocks count={count} blockName={blockName} setBlockName={setBlockName} />;
    //         setAddBlockComponent([...addBlockComponent, newBlockComponent]);
    //         return response;
    //     })
    //     .catch((error) => {
    //         return error;
    //     });
  }

  return (
    <>
      {
        blockCreated ?
          //After Block Creation
          (
            <>
              <div className='block-container'>
                <div className='addQuesBtn-container'>
                  <Button variant="contained" color="primary">
                    Add Questions
                  </Button>
                </div>

                <div>
                  <h4 className='inlineDisplay'>Block Name:</h4>
                  <p className='inlineDisplay'>{blockName}</p>
                </div>
              </div>
            </>
          )
          :
          //First Create Block
          (
            <>
              <form onSubmit={handleBlockNameSubmit}>
                <TextField
                  label="Block Name"
                  value={blockName}
                  onChange={handleBlockNameChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  style={{ color: 'black' }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form >
            </>
          )
      }

    </>

  )
}

export default AddBlocks
