import React from "react";
import { useDrag } from "react-dnd";
import start from "../assets/start.svg";

const ItemTypes = {
  BIRD: "bird",
};

interface GetStationItemProps {
  station: string;
  setDraggingStation: (station: string | null) => void;
}

const GetStationItem: React.FC<GetStationItemProps> = ({
  station,
  setDraggingStation,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BIRD,
      item: () => {
        setDraggingStation(station);
        return { name: station, type: ItemTypes.BIRD };
      },
      end: () => {
        setDraggingStation(null);
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [station]
  );

  return (
    <div ref={drag} className={`station-item ${isDragging ? "dragging" : ""}`}>
      <img id="start" src={start} alt="start" />
    </div>
  );
};

export default GetStationItem;
