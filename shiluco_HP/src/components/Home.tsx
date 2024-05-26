import React, { useState } from "react";
import "./Home.css";
import edit from "../assets/edit.svg";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import EditDialog from "./EditDialog"; // ここでインポート

const Home: React.FC = () => {
  const [selections, setSelections] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(() => {
    const storedOptions = localStorage.getItem("editOptions");
    return storedOptions
      ? (JSON.parse(storedOptions) as string[])
      : [
          "浜松駅/遠鉄バス",
          "田町中央通り/遠鉄バス",
          "市役所南/遠鉄バス",
          "六間坂上/遠鉄バス",
          "イオンモール浜松市野/遠鉄バス",
        ]; // 初期値を設定
  });

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  const handleCheckboxChange = (option: string) => {
    setSelections((prevSelections) => {
      const newSelections = prevSelections.includes(option)
        ? prevSelections.filter((item) => item !== option)
        : [...prevSelections, option];

      if (newSelections.length === 2) {
        const start = encodeURIComponent(newSelections[0]);
        const goal = encodeURIComponent(newSelections[1]);
        const url = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=${start}&to=${goal}&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`;
        window.location.href = url;
      }

      return newSelections;
    });
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveOptions = (newOptions: string[]) => {
    setOptions(newOptions);
    localStorage.setItem("options", JSON.stringify(newOptions));
  };

  return (
    <div>
      <div id="head">
        <h1 id="title">Home</h1>
        <Button id="editButton" onClick={handleEditClick}>
          <img id="edit" src={edit} alt="edit" />
        </Button>
      </div>

      <div>
        <div id="stations">
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
      </div>

      <EditDialog
        open={editDialogOpen}
        onClose={handleEditClose}
        options={options}
        onSave={handleSaveOptions}
      />
    </div>
  );
};

export default Home;
