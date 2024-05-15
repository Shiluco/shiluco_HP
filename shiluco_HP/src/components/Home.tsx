import React, { useState } from 'react';
import './Home.css';    

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';


const Home: React.FC = () =>
{
    const [selections, setSelections] = useState([] as string[]);
    const options: string[] = [
        '浜松駅%2F遠鉄バス',
        '田町中央通り%2F遠鉄バス',
        '六間坂上%2F遠鉄バス',
    ];
    
    const handleCheckboxChange = (option: string) =>
    { 
        setSelections((prevSelections) => {
      if (prevSelections.includes(option)) {
        return prevSelections.filter((item) => item !== option);
      } else {
        return [...prevSelections, option];
      }
    });
    }

    const handleClick = () => {
        if (selections.length >= 2) {
            const start = selections[0];
            const goal = selections[1];
            const url = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=${start}&to=${goal}&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`;
            window.location.href = url;
        } else {
            alert('Please select at least two options.');
        }
    };

    return (
        <div>
            <h1 id = "title" >乗換案内</h1>

            <div id = "stations">
                {options.map((option, index) => (
                <FormControlLabel
                    key={index}
                    
                    control={
                    <Checkbox
                        checked={selections.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        value={option}
                    />
                    }
                        
                    label={decodeURIComponent(option)}
                />
                ))}
            </div>

            
            <Button id="go_button" variant="contained" color="primary" onClick={handleClick}>
                Go
            </Button>
        </div>
    );
}

export default Home;
