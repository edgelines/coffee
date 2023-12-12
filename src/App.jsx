import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Chip, Divider, Tabs, Tab, Stack, Snackbar, Alert, IconButton, Typography, Paper, RadioGroup, Radio, FormLabel, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
import styledComponents from 'styled-components';
import CSS from './App.module.css';
import { CgAddR } from 'react-icons/cg'
import { DialogComponent } from './compontents/dialog.jsx';
import { baseURL } from './compontents/util.jsx';
import Chart from './compontents/chart.jsx';

import './App.css';

function App() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [snackbar, setSnackbar] = useState(false);
    const [severity, setSeverity] = useState('success');
    const vertical = 'bottom';
    const horizontal = 'center';
    const [orignData, setOrignData] = useState([]);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState('All');
    // Form State & Handler
    const [dialog, setDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ Country: "", Region: "", FarmName: "", Variety: "", Processing: "", Altitude: "", Roasting: "", Store: "", PurchaseDate: "", CupNotes: "", Sensory: "", Preference: "", Cost: "", Weight: "", PurchaseAmount: "", Recipe: "", ClickH: "", ClickC: "", Aroma: "", Balance: "", Body: "", Acidity: "", Aftertaste: "", Flavor: "" });

    // Form Controll
    const newForm = () => { setEditMode(false); setDialog(true); resetForm(); }
    const resetForm = () => { setForm({ Country: "", Region: "", FarmName: "", Variety: "", Processing: "", Altitude: "", Roasting: "", Store: "", PurchaseDate: "", CupNotes: "", Sensory: "", Preference: "", Cost: "", Weight: "", PurchaseAmount: "", Recipe: "", ClickH: "", ClickC: "", Aroma: "", Balance: "", Body: "", Acidity: "", Aftertaste: "", Flavor: "" }); };
    const editBtn = (content) => { setEditMode(true); setForm({ ...form, id: content.id, Country: content.Country, Region: content.Region, FarmName: content.FarmName, Variety: content.Variety, Processing: content.Processing, Altitude: content.Altitude, Roasting: content.Roasting, Store: content.Store, PurchaseDate: content.PurchaseDate, CupNotes: content.CupNotes, Sensory: content.Sensory, Preference: content.Preference, Cost: content.Cost, Weight: content.Weight, PurchaseAmount: content.PurchaseAmount, Recipe: content.Recipe, ClickH: content.ClickH, ClickC: content.ClickC, Aroma: content.Aroma, Balance: content.Balance, Body: content.Body, Acidity: content.Acidity, Aftertaste: content.Aftertaste, Flavor: content.Flavor }); setDialog(true); };
    const handleDialogClose = () => { resetForm(); setDialog(false); }

    // Fetch 
    const fetchData = async () => {
        const res = await axios.get(`${baseURL}/toy/Coffee`)
        let result = res.data.map(item => {
            return { ...item, Aroma: parseFloat(item.Aroma), Balance: parseFloat(item.Balance), Body: parseFloat(item.Body), Acidity: parseFloat(item.Acidity), Aftertaste: parseFloat(item.Aftertaste), Flavor: parseFloat(item.Flavor), id: item['_id'] }
        }).sort((a, b) => new Date(b.PurchaseDate) - new Date(a.PurchaseDate))
        setData(result);
        setOrignData(result);
        console.log(result);
    }
    useEffect(() => { fetchData(); }, [])
    useEffect(() => { 싱글블랜드핸들러(); }, [selected])

    // Handler
    const 싱글블랜드핸들러 = () => {
        let filtered = [...orignData];
        switch (selected) {
            case 'Single':
                return setData(filtered.filter(item => item.Country !== '블랜드'));
            case 'Blend':
                return setData(filtered.filter(item => item.Country === '블랜드'));
            default:
                return setData(filtered);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setSnackbar(false);
    };

    const saveBtn = (newFormData) => {
        if (editMode) {
            updateDatabase(newFormData);
        } else {
            saveToDatabase(newFormData);
        }
        setDialog(false);
        resetForm();
    };

    // DB CRUD Function
    const saveToDatabase = async (newFormData) => {
        try {
            await axios.post(`${baseURL}/toy/uploadCoffee`, newFormData);
            setSnackbar(true);
            setSeverity('success');
            setDialog(false);
        } catch (error) {
            setSnackbar(true);
            setSeverity('error');
            console.error(error);
        }
        fetchData();
    };

    const updateDatabase = async (newFormData) => {
        try {
            const { id, ...rest } = newFormData;  // id를 제거
            await axios.put(`${baseURL}/toy/updateCoffee/${newFormData.id}`, rest);
            setSnackbar(true);
            setSeverity('success');
            setDialog(false);
        } catch (error) {
            setSnackbar(true);
            setSeverity('error');
            console.error(error);
        }
        fetchData();
    };

    const deleteDatabase = async (deleteID) => {
        const confirmDelete = window.confirm("이 항목을 삭제 할까요?");
        if (confirmDelete) {
            try {
                await axios.delete(`${baseURL}/toy/deleteCoffee/${deleteID.id}`);
                setSnackbar(true);
                setSeverity('success');
            } catch (error) {
                setSnackbar(true);
                setSeverity('error');
                console.error("Error deleting award:", error);
            }
        }
        fetchData();
    };

    // CSS
    const labelStyle = { fontSize: '13px', textAlign: 'start', color: '#efe9e9ed' }
    const dividerStyle = { borderColor: '#efe9e9ed', mt: 2, mb: 2 }
    return (
        <Grid container sx={{ mt: '30px', p: 1 }}>
            {/* FeedBack SnackBar */}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbar}
                onClose={handleClose}
                autoHideDuration={5000}
            >
                <Alert severity={severity} elevation={6} onClose={handleClose}>
                    {severity === 'success' ? '변경 사항을 저장했어요.' : severity === 'error' ? '에러가 발생했어요. 잠시후 다시 시도해주세요.' : 'Kindly ensure all fields are filled out.'}
                </Alert>
            </Snackbar>
            {/* Dialog */}
            <DialogComponent dialog={dialog} form={form} editMode={editMode} handleDialogClose={handleDialogClose} saveBtn={saveBtn} />
            {/* List */}
            <Grid item xs={isMobile ? 12 : 1.5} sx={{ pl: 3, pr: 5 }}>
                <Grid container>
                    <IconButton sx={{ color: '#efe9e9ed' }} onClick={newForm} ><CgAddR /></IconButton>
                </Grid>
                <Divider sx={dividerStyle} />
                <Grid container>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        defaultValue="All"
                        // value={filterByArtGenre} // 현재 페이지 값을 RadioGroup의 value로 설정
                        onChange={(event) => setSelected(event.target.value)} // 페이지 변경 핸들러
                    >
                        <FormLabel sx={{ textAlign: 'start', fontWeight: 660, color: '#efe9e9ed' }}>Filter by Single/Blend</FormLabel>
                        {['All', 'Single', 'Blend'].map((item) => (
                            <FormControlLabel value={item} control={<Radio size='small' />} label={item} key={item} sx={{ '.MuiFormControlLabel-label': labelStyle }} />
                        ))}
                    </RadioGroup>
                </Grid>
                <Divider sx={dividerStyle} />
                <Grid container>
                    <StyledTypography>
                        선호도
                    </StyledTypography>
                    <Grid container sx={{ mt: 1, mb: -1 }}>
                        <Grid item xs={6}>
                            <StyledTypography>0</StyledTypography>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: 'end' }}>
                            <StyledTypography>10</StyledTypography>
                        </Grid>
                    </Grid>
                    <GradientLegend />
                </Grid>
            </Grid>
            <Grid item xs={isMobile ? 12 : 9} container>
                <Grid container spacing={3}>
                    {data.map((item) => (
                        <Grid item xs={isMobile ? 12 : 2} key={item.id} className={CSS.listGroupitem} onClick={() => editBtn(item)}>
                            <Item preference={item.Preference}>

                                <Chart data={[{ type: 'area', name: 'Area', data: [item.Aroma, item.Balance, item.Body, item.Acidity, item.Aftertaste, item.Flavor], pointPlacement: 'on' }]} height={150} />

                                <StyledTypography>{item.Country === '-' ? '' : item.Country}</StyledTypography>
                                <StyledTypography>{item.Region === '-' ? '' : item.Region}</StyledTypography>
                                <StyledTypography>{item.FarmName === '-' ? '' : item.FarmName}</StyledTypography>
                                <StyledTypography>{item.Processing === '-' ? '' : item.Processing}</StyledTypography>
                                {isMobile ? '' :
                                    <StyledTypography>{item.Store === '-' ? '' : item.Store}</StyledTypography>
                                }
                                <StyledTypography>{item.PurchaseDate === '-' ? '' : item.PurchaseDate}</StyledTypography>

                            </Item>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <img src={'/img/Main/CoffeeFlavorWheel.png'} style={{ width: '100%' }} />
                    </Grid>
                </Grid>
            </Grid >
            <Grid item xs={isMobile ? 0 : 1.5}></Grid>
        </Grid >
    );
}

export default App;


const StyledTypography = styledComponents(Typography)`
    font-family: 'Helvetica';
    font-size: 13px;
    color: #efe9e9ed;
`;

// 선호도 그라데이션 적용
const getBorderColor = (preference) => {
    const value = Math.floor(200 * (preference / 10));
    return `rgb(${value}, ${value}, ${value})`;
    // const hue = Math.floor(200 - (preference * 20));
    // return `hsl(${hue}, 100%, 50%)`;
}

const Item = styled(Paper)(({ theme, preference }) => ({
    backgroundColor: '#404040',
    padding: theme.spacing(1),
    textAlign: 'center',
    border: `2px solid ${getBorderColor(preference)}`,
}));

// 그라데이션 범주
const GradientLegend = styled('div')({
    width: '100%',
    height: '20px',
    background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(200, 200, 200))',
    borderRadius: '5px',
    margin: '10px 0'
});

