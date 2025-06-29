import { EventColor } from "@shared/constants";
import { useState } from "react";

export const ColorPicker = ({
  initialValue,
  onChange,
}: {
  initialValue: EventColor;
  onChange: (color: EventColor) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState(initialValue);

  return (
    <div className="color-picker">
      {Object.values(EventColor).map(color => (
        <ColorButton
          key={color}
          color={color}
          onClick={() => {
            onChange(color);
            setSelectedColor(color);
          }}
          isSelected={selectedColor === color}
        />
      ))}
    </div>
  );
};

const ColorButton = ({
  color,
  onClick,
  isSelected,
}: {
  color: EventColor;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <button
      type="button"
      className="color-btn"
      onClick={onClick}
      style={{ backgroundColor: color, outline: isSelected ? "2px solid white" : undefined }}
    />
  );
};
