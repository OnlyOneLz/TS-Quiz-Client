import React, { useState } from "react"
import { FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Button } from '@mui/material';

const HomeForm = () => {
    const [category, setCategory] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    return (
        <div className='grid-item-4'>
                <form className='quiz-selecion'>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                            style={{ border: '3px black solid' }}
                        >
                            <MenuItem value={'react'}>React</MenuItem>
                            <MenuItem value={'typeScript'}>Typescript</MenuItem>
                            <MenuItem value={'random'}>Random</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="secondary" style={{ border: '3px black solid ', color: 'white', backgroundColor: 'black', marginTop: '1rem' }}>
                        Start Quiz!
                    </Button>
                </form>
            </div>
    )
}

export default HomeForm
