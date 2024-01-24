import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { calculateNewTax, calculateS3Tax, calculateOldTax } from "./utils/calculateTax"

import { NumericFormat } from 'react-number-format';

const CurrencyTextField = ({ income, handleIncomeChange }) => {
  return (
    <NumericFormat
      customInput={TextField}
      label="Income"
      variant="outlined"
      fullWidth
      type="text"
      value={income}
      onValueChange={handleIncomeChange}
      thousandSeparator={true}
      prefix={'$'}
      style={{ marginBottom: '16px' }}
    />
  );
};

const formatNumber = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const ProgressiveTaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState();
  const [isSuper, setIsSuper] = useState(false)

  function handleSuper(e) {
    setIsSuper(e.target.checked);
    console.log(e.target.checked)
  }

  const calculateTax = () => {
    const newTax = calculateNewTax(income, isSuper);
    const oldTax = calculateOldTax(income, isSuper);
    const s3Tax = calculateS3Tax(income, isSuper);
    setTax({ newTax, oldTax, s3Tax });
    console.log({ newTax, oldTax, s3Tax })

  };
  const handleIncomeChange = (values) => {
    const { value } = values;
    setIncome(value);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "15px" }}>
      <Typography variant="h4" gutterBottom>
        Stage 3 Plus Calculator
      </Typography>
      <p>Find out if you're better off with the new version of the Stage 3 Tax Cuts.</p>
      <CurrencyTextField
        income={income} handleIncomeChange={handleIncomeChange}
      />
      <FormGroup>
        <FormControlLabel control={<Switch
          onChange={handleSuper}
          inputProps={{ 'aria-label': 'controlled' }}
        />} label="Includes superannuation" />
      </FormGroup>
      <Button variant="contained" color="primary" onClick={calculateTax}>
        Calculate Tax
      </Button>


      {tax && (
        <><Typography variant="h5" style={{ marginTop: '16px' }}>
          <p>Under the new changes, you'll pay <b>{formatNumber(tax.oldTax - tax.newTax)}</b> less next year in taxes.</p>
          {(tax.s3Tax - tax.newTax) < 0 ?
            (<p>That's <span style={{ color: "#EE4B2B" }}><b>{formatNumber(Math.abs(tax.s3Tax - tax.newTax))}</b></span> less than the original Stage 3 tax cuts.</p>) :
            <p>That's <span style={{ color: "#50C878" }}><b>{formatNumber(tax.s3Tax - tax.newTax)}</b></span> better than the original Stage 3 tax cuts.</p>}
        </Typography><TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Current Tax (23/24)</TableCell>
                  <TableCell>Original Stage 3</TableCell>
                  <TableCell>Revised Stage 3</TableCell>
                  <TableCell>Original Tax Cut</TableCell>
                  <TableCell>Revised Tax Cut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>{formatNumber(tax.oldTax)}</TableCell>
                <TableCell>{formatNumber(tax.s3Tax)}</TableCell>
                <TableCell>{formatNumber(tax.newTax)}</TableCell>
                <TableCell>{formatNumber(tax.oldTax - tax.s3Tax)}</TableCell>
                <TableCell>{formatNumber(tax.oldTax - tax.newTax)}</TableCell>
              </TableBody>
            </Table>
          </TableContainer></>
      )}
    </Container>
  );
};

export default ProgressiveTaxCalculator;
