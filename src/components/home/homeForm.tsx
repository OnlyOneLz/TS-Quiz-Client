import React, { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel, SelectChangeEvent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomeForm = () => {
    const [category, setCategory] = useState<any>();

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
    };

    const handleStartQuiz = () => {
        localStorage.setItem('category', category);
    };

    return (
        <div className="grid-item-4">
            <form className="quiz-selecion">
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
                        <MenuItem value={'Programming Languages'}>Programming Languages</MenuItem>
                        <MenuItem value={'Databases'}>Databases</MenuItem>
                        <MenuItem value={'Web Development'}>Web Development</MenuItem>
                        <MenuItem value={'Software Development Lifecycle'}>Software Development Lifecycle</MenuItem>
                        <MenuItem value={'Random'}>Random</MenuItem>
                    </Select>
                </FormControl>
                <Link to={'/quiz2'}>
                    <Button
                        onClick={() => handleStartQuiz()}
                        disabled={!category}
                        variant="contained"
                        color="secondary"
                        style={{
                            border: '3px black solid ',
                            color: 'white',
                            backgroundColor: 'black',
                            marginTop: '1rem'
                        }}
                    >
                        Start Quiz!
                    </Button>
                </Link>
            </form>
        </div>
    );
};

export default HomeForm;
