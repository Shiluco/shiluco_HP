import React, { useState } from "react";
import "./Home.css";
import edit from "../assets/edit.svg";
import start from "../assets/start.svg";
import goal from "../assets/goal.svg";

import { isMobile } from "react-device-detect";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Button from "@mui/material/Button";
import EditDialog from "./EditDialog"; // ここでインポート

const ItemTypes = {
  DOT: "dot",
};

interface Station {
  name: string;
  type: string;
}

const Home: React.FC = () => {
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
  const [draggingStation, setDraggingStation] = useState<string | null>(null); // ドラッグ中の駅名を管理するためのステート
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = (item: Station, target: string) => {
    const newSelections = [item.name, target];
    const start = encodeURIComponent(newSelections[0]);
    const goal = encodeURIComponent(newSelections[1]);
    const url = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=${start}&to=${goal}&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`;
    window.location.href = url;
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveOptions = (newOptions: string[]) => {
    setOptions(newOptions);
    localStorage.setItem("editOptions", JSON.stringify(newOptions));
  };

  const StationItem: React.FC<{ station: string }> = ({ station }) => {
    const [{ isDragging: localIsDragging }, drag] = useDrag(
      () => ({
        type: ItemTypes.DOT,
        item: () => {
          setDraggingStation(station); // ドラッグ開始時にステートを更新
          setIsDragging(true);
          return { name: station, type: ItemTypes.DOT };
        },
        end: () => {
          setDraggingStation(null); // ドラッグ終了時にステートを更新
          setIsDragging(false);
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [station]
    );

    return (
      <div
        ref={drag}
        className={`station-item ${localIsDragging ? "dragging" : ""}`}
      >
        <img id="start" src={start} alt="start" />
      </div>
    );
  };

  const StationDropArea: React.FC<{ station: string }> = ({ station }) => {
    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: ItemTypes.DOT,
        drop: (item: Station) => handleDrop(item, station),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      }),
      [station]
    );

    return (
      <div ref={drop} className={`station-drop-area ${isOver ? "over" : ""}`}>
        <img id="goal" src={goal} alt="goal" />
      </div>
    );
  };

  console.log("Rendering Home component");

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
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
              <div key={index} className="station-container">
                <span>{option}</span>
                {isDragging ? (
                  draggingStation === option ? (
                    <StationItem station={option} />
                  ) : (
                    <StationDropArea station={option} />
                  )
                ) : (
                  <StationItem station={option} />
                )}
              </div>
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
    </DndProvider>
  );
};

export default Home;
