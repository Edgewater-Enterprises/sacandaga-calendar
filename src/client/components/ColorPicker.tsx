import { EventColor } from "@/shared/constants";

export const ColorPicker = ({
  selectedColor,
  onChange,
}: {
  selectedColor: EventColor;
  onChange: (color: EventColor) => void;
}) => {
  return (
    <div className="color-picker">
      {Object.values(EventColor).map(color => (
        <button
          key={color}
          type="button"
          className="color-btn"
          onClick={() => onChange(color)}
          style={{
            backgroundColor: color,
            outline: selectedColor === color ? "2px solid white" : undefined,
          }}
        />
      ))}
    </div>
  );
};
