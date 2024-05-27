import React from "react";
import { useDrop } from "react-dnd";
import goal from "../assets/goal.svg";

const ItemTypes = {
  BIRD: "bird",
};

interface StationDropAreaProps {
  station: string;
  handleDrop: (item: { name: string; type: string }, target: string) => void;
}

const StationDropArea: React.FC<StationDropAreaProps> = ({
  station,
  handleDrop,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BIRD,
      drop: (item: { name: string; type: string }) => handleDrop(item, station),
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

export default StationDropArea;
