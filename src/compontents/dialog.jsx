import React, { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import {
    Grid, Button, Snackbar, Alert, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Input, MenuItem,
    Tab, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, FormControl, FormControlLabel, Typography
} from '@mui/material';
import TestChart from './chart.jsx';
export const DialogComponent = React.memo(({ dialog, form, handleDialogClose, editMode, saveBtn }) => {
    const [localFormState, setLocalFormState] = useState(form);
    const [chartData, setChartData] = useState([{ type: 'area', name: 'Area', data: [] }]);

    // useEffect(() => { setLocalFormState(form); setChartData([{ type: 'area', name: 'Area', data: [5, 6, 7, 8, 9, 9] }]) }, [form]);
    useEffect(() => { setLocalFormState(form); setChartData([{ type: 'area', name: 'Area', data: [form.Aroma, form.Balance, form.Body, form.Acidity, form.Aftertaste, form.Flavor], pointPlacement: 'on' }]) }, [form]);

    // Handler
    const handleFormText = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        const chartFields = ['Aroma', 'Balance', 'Body', 'Acidity', 'Aftertaste', 'Flavor'];
        setLocalFormState((prevState) => ({ ...prevState, [name]: value, }));

        const numericValue = parseInt(value);  // 문자열을 숫자로 변환
        if (['Aroma', 'Balance', 'Body', 'Acidity', 'Aftertaste', 'Flavor'].includes(name)) {
            setChartData((prevState) => {
                const newData = [...prevState[0].data];
                newData[chartFields.indexOf(name)] = numericValue;
                return [{ ...prevState[0], data: newData }];
            });
        }
    };
    const handleSave = () => {
        const filteredFormState = Object.fromEntries(
            Object.entries(localFormState).filter(([key, value]) => value !== null)
        );
        saveBtn(filteredFormState);
        // saveBtn(localFormState);
        // console.log(filteredFormState);
    };
    const handleClose = () => { handleDialogClose(); }

    return (
        <Dialog open={dialog}
            fullWidth={false} maxWidth={'lg'}
            onClose={handleClose}>
            <DialogContent>
                <DialogContentText> {editMode ? 'EDIT Infomation' : 'ADD Infomation'} </DialogContentText>
                <DialogContentText>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {/* Chart */}
                        <Grid item xs={5}>
                            <TestChart data={chartData} height={300} />
                        </Grid>
                        <Grid item xs={7} container spacing={2}>
                            {/* 점수 */}
                            <>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" onChange={handleFormText} type="number"
                                        label="Aroma"
                                        name="Aroma"
                                        value={localFormState.Aroma}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" onChange={handleFormText} type="number"
                                        label="Balance"
                                        name="Balance"
                                        value={localFormState.Balance}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" onChange={handleFormText} type="number"
                                        label="Body"
                                        name="Body"
                                        value={localFormState.Body}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" onChange={handleFormText} type="number"
                                        label="Acidity"
                                        name="Acidity"
                                        value={localFormState.Acidity}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" onChange={handleFormText} type="number"
                                        label="Aftertaste"
                                        name="Aftertaste"
                                        value={localFormState.Aftertaste}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" onChange={handleFormText} type="number"
                                        label="Flavor"
                                        name="Flavor"
                                        value={localFormState.Flavor}
                                    />
                                </Grid>
                            </>

                            {/* 국가, 지역, 농장명, 품종 */}
                            <>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="국가"
                                        name="Country"
                                        value={localFormState.Country}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="지역"
                                        name="Region"
                                        value={localFormState.Region}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="농장명"
                                        name="FarmName"
                                        value={localFormState.FarmName}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="품종"
                                        name="Variety"
                                        value={localFormState.Variety}
                                    />
                                </Grid>
                            </>

                            {/* 가공방식, 고도, 로스팅포인트, 구매처, 구매일자 */}
                            <>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="가공방식"
                                        name="Processing"
                                        value={localFormState.Processing}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="고도"
                                        name="Altitude"
                                        value={localFormState.Altitude}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="로스팅"
                                        name="Roasting"
                                        value={localFormState.Roasting}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="구매처"
                                        name="Store"
                                        value={localFormState.Store}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="구매일자"
                                        name="PurchaseDate"
                                        value={localFormState.PurchaseDate}
                                    />
                                </Grid>
                            </>

                            {/*  선호도, 1잔당가격, 중량, 구매금액 */}
                            <>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="선호도"
                                        name="Preference"
                                        value={localFormState.Preference}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="1잔가격"
                                        name="Cost"
                                        value={localFormState.Cost}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="중량"
                                        name="Weight"
                                        value={localFormState.Weight}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="구매금액"
                                        name="PurchaseAmount"
                                        value={localFormState.PurchaseAmount}
                                    />
                                </Grid>
                            </>

                            {/* 레시피, 클릭수 */}
                            <>
                                <Grid item xs={9}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="레시피"
                                        name="Recipe"
                                        value={localFormState.Recipe}
                                    />
                                </Grid>
                                <Grid item xs={1.5}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="홀츠클로츠"
                                        name="ClickH"
                                        value={localFormState.ClickH}
                                    />
                                </Grid>
                                <Grid item xs={1.5}>
                                    <TextField
                                        variant="standard" fullWidth onChange={handleFormText}
                                        label="코만단테"
                                        name="ClickC"
                                        value={localFormState.ClickC}
                                    />
                                </Grid>
                            </>

                        </Grid>
                        {/* 컵노트, 센서리 */}
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    variant="standard" fullWidth onChange={handleFormText}
                                    label="컵노트"
                                    name="CupNotes"
                                    value={localFormState.CupNotes}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="standard" fullWidth onChange={handleFormText}
                                    label="센서리"
                                    name="Sensory"
                                    value={localFormState.Sensory}
                                />
                            </Grid>
                        </>
                    </Grid>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
})