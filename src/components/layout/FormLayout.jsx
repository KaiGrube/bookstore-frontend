import {Alert, Box, Button, Fade, Paper, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {selectToken} from "../../_store/slice/authSlice.js";
import {useSelector} from "react-redux";

export default function FormLayout({title, readFirst, titleIcon, topRightSection, formElements, submitButtonText, url, onSuccess}) {

  const [state, setState] = useState({})
  const [errors, setErrors] = useState(null)

  const token = useSelector(selectToken);

  useEffect(() => {
     fetch()
  }, [])

  function resetErrors() {
    setErrors([])
  }

  function handleOnChangeElement(name, event) {
    resetErrors()
    setState({ ...state, [name]: event.target.value } )
  }

  async function fetch() {
    setErrors([]);
    const config = {
      url: url,
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      // data: state,
      validateStatus: status => true,
    }
    // const response = await axios(config);
    // if (response.status === 200) {
    //   onSuccess(response.data)
    // }
    // if (response.status >= 400) {
    //   setErrors(response.data.errors)
    // }
  }


  async function submit(event) {
    event.preventDefault()
    setErrors([]);
    const config = {
      url: url,
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("token"),
      },
      data: state,
      validateStatus: status => true,
    }
    const response = await axios(config);
    if (response.status === 200) {
     onSuccess(response.data)
    }
    if (response.status >= 400) {
      setErrors(response.data.errors)
    }
  }

  return(
    <Fade in transition={300}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >

        <Paper
          component="form"
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "30rem",
            padding: "1rem",
          }}
        >

          {/*Icon + title*/}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "primary.main"
          }}>

            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}>

              {React.cloneElement(titleIcon, {
                fontSize: "large",
              })}

              <Typography variant="h4">
                {title}
              </Typography>
            </Box>
            {topRightSection}
          </Box>

          {/*form elements*/}
          {formElements.map((element, index) =>
            <TextField key={index}
                       label={element.label}
                       type={element.type}
                       onChange={e => handleOnChangeElement(element.name, e)}
                       size="small"
                       variant="outlined"
                       required={element.required}
            />
          )}

          {/*Errors*/}

          {errors &&
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}>
            {errors.map((error, index) =>
              <Fade in key={index} transition={300}>
                <Alert severity="error">{error}</Alert>
              </Fade>
            )}
          </Box>
          }

          {/*Submit button*/}
          <Button type="submit"
                  onClick={submit}
                  variant="contained"
          >
            {submitButtonText}
          </Button>

        </Paper>
      </Box>
    </Fade>
  )
}