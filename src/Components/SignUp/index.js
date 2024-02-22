import React, { useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const SignUp= () => {
  const [form, setForm] = useState({});
  const navigate=useNavigate()
  const updateForm = (field, event) => {
    const newForm = {...form, [field]: event.target.value };
    setForm(newForm)
  }
  const handleSubmit = async () => {
    try {
      console.log(form);
      const {status, data} = await axios.post('/api/users/register', form);
      debugger
      if (status === 201) {
        navigate('/login');
      } 
    } catch(err) {
      alert(err.message)
    }
  }
  return (
    <Container maxWidth="sm" >
      <Box
        component="form"
        className='container-class'
        sx={{
          marginTop: 5,
          padding: 5,
          width: '100%',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ m: 2 }}>
          <Typography
            component={'h3'}
            sx={{ textAlign: 'center' }}
          >
            Register Page
          </Typography>
        </Box>
        <Box>
        <TextField
            required
            id="email-field"
            label="Username"
            value={form.name}
            onChange={(e)=> updateForm('name', e)}
          />
        <TextField
            required
            id="email-field"
            label="Email"
            value={form.email}
            onChange={(e)=> updateForm('email', e)}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            type='password'
            value={form.password}
            onChange={(e)=> updateForm('password', e)}
          />
          <Box sx={{ display: 'flex', m: 2, justifyContent: 'center' }}>
            <Button onClick={handleSubmit} size="large" variant='outlined'>Register</Button>
          </Box>
          <Link to='/login' >Already have an account? </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp;