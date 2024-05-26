import React, { useState, useRef } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./SwipeSelect.css";

type SwipeSelectProps = {
  options: string[];
  selections: string[];
  handleCheckboxChange: (option: string) => void;
};

const SwipeSelect: React.FC<SwipeSelectProps> = ({
  options,
  selections,
  handleCheckboxChange,
}) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedRefs = useRef(new Set<string>());

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsSwiping(true);
    selectedRefs.current.clear();
    handleMouseMove(e); // 開始時点でも選択を反映
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const stationHeight = rect.height / options.length;
    const hoveredIndex = Math.floor(y / stationHeight);

    if (hoveredIndex >= 0 && hoveredIndex < options.length) {
      const currentStation = options[hoveredIndex];
      if (!selectedRefs.current.has(currentStation)) {
        selectedRefs.current.add(currentStation);
        handleCheckboxChange(currentStation);
      }
    }
  };

  const handleMouseUp = () => {
    setIsSwiping(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="container"
    >
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
  );
};

export default SwipeSelect;
