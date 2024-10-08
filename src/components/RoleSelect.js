import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Avatar from '../assets/Avatar.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import background from '../assets/background.jpg';
import centeredImage from '../assets/image_login.png'; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../features/auth/authSlice'; // Import register

const RoleSelect = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [image, setUploadedImg] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const dispatch = useDispatch();
  const { status, registrationMessage, error } = useSelector((state) => state.auth);

  const phone_number = useSelector((state) => state.auth.phone_number); // Get phone_number from state
  const first_name = useSelector((state) => state.auth.first_name); // Get firstName from state
  const last_name = useSelector((state) => state.auth.last_name); // Get lastName from state
  const password = useSelector((state) => state.auth.password); // Get password from state

  const handleContinue = async () => {
    try {
      const action = await dispatch(userDetails({ phone_number, first_name, last_name, password, department, role,image }));
      if (userDetails.fulfilled.match(action)) {
        if (action.payload) {
          navigate('/Login');
        } else {
          setSnackbarMessage(action.payload.message || 'User not registered successfully');
          setOpenSnackbar(true);
        }
      } else {
        setSnackbarMessage(error.message || 'An error occurred');
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage('An unexpected error occurred');
      setOpenSnackbar(true);
    }
  };



  // useEffect(() => {
  //   if (status === 'succeeded' && registrationMessage) {
  //     navigate('/Login');
  //   }
  // }, [status, registrationMessage, navigate]);


  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '120%',
          boxShadow: 3
        }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderTopRightRadius: '5%',
            borderBottomRightRadius: '5%',
            overflow: 'hidden'
          }}
        >
          <img src={background} alt="Background" style={{ width: '100%', height: '100vh' }} />
          <img src={centeredImage} alt="Centered" style={{ position: 'absolute', width: '60%', height: 'auto' }} />
        </Box>

        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4' sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 'bold' }}>Register Now</Typography>

            <Box sx={{ position: 'relative', display: 'inline-block', marginBottom: 2 }}>
              <img
                src={image || Avatar}
                alt='User Avatar'
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="icon-button-file">
                <AddCircleIcon
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    borderRadius: '50%',
                    fontSize: '2rem',
                    cursor: 'pointer'
                  }}
                />
              </label>
            </Box>
            <Box disableGutters>
              <FormControl disableGutters variant="outlined" margin="normal" sx={{ width: '486px' }}>
                <InputLabel id="department-label">Select Department</InputLabel>
                <Select
                  labelId="department-label"
                  value={department}
                  onChange={handleDepartmentChange}
                  label="Department"
                  sx={{
                    backgroundColor: '#F7F7FC',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="sap">SAP</MenuItem>
                  <MenuItem value="webnapp">WEB N APP</MenuItem>
                  <MenuItem value="erp">ERP</MenuItem>
                  <MenuItem value="qa">QA</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box disableGutters>
              <FormControl disableGutters variant="outlined" margin="normal" sx={{ width: '486px'}}>
                <InputLabel id="role-label">Select Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  onChange={handleRoleChange}
                  label="Role"
                  sx={{
                    backgroundColor: '#F7F7FC',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="designer">Designer</MenuItem>
                  <MenuItem value="analyst">Analyst</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#1F487C',
                borderRadius: '50px',
                width: '327px',
                height: '52px',
                '&:hover': {
                  backgroundColor: '#1F487C',
                },
              }}
              onClick={handleContinue}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RoleSelect;
