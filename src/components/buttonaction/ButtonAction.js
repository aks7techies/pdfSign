import * as React from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import  {useNavigate}  from 'react-router-dom';
import './buttonaction.css';

function ButtonAction() {
    const [value, setValue] = React.useState(0);
    const history = useNavigate();

    const Complete = (event, newValue) => {
      setValue(newValue);
      history('/complete');
    };
    const unComplete = (event, newValue) => {
      setValue(newValue);
      history('/un-complete');
    };
  return (
    <>
    <section className="container-fluid p-4">
        <Stack spacing={2} direction="row" className="shadow px-4 py-2">
          <Button variant="outlined" onClick={Complete}>
            Completed
          </Button>
          <Button variant="outlined" onClick={unComplete}>
            Un-Completed
          </Button>
        </Stack>
      </section>
    
    </>
  )
}

export default ButtonAction