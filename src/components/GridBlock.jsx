import React from "react";

export default function GridBlock({ content, properties }) {
  const {
    // default values on case anything went wrong from the api
    cols,
    rows = 1,
    outer_left_right_margins = 16,
    outer_top_bottom_margins = 8,
    inner_left_right_spacing = 16,
    inner_top_bottom_spacing = 16,
    direction = "vertical",
  } = properties;

  // Calculate grid layout based on direction
  const isVertical = direction === "vertical";
  const gridCols = isVertical ? cols : rows;
  const gridRows = isVertical ? rows : cols;

  // Convert spacing values to pixels
  const outerHorizontal = `${outer_left_right_margins}px`;
  const outerVertical = `${outer_top_bottom_margins}px`;
  const innerHorizontal = `${inner_left_right_spacing}px`;
  const innerVertical = `${inner_top_bottom_spacing}px`;

  // i did it here because of two reasons:
  // 1 - i think handling calculations like this is better than using ${} with tailwind
  // 2 - it's more readable
  const containerStyle = {
    padding: `${outerVertical} ${outerHorizontal}`,
    display: "grid",
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gap: `${innerVertical} ${innerHorizontal}`,
  };

  const handleItemClick = (action) => {
    if (action?.target && action?.id) {
      console.log(`Clicked ${action.target} with ID: ${action.id}`);
      // since i dont have specific endpoint like /apple etc
      // i just logged to console 
    }
  };

  return (
    <div>
      <div style={containerStyle}>
        {content.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(item.action)}>
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={item.image}
                alt={item.title || `Grid item ${index + 1}`}
                className="w-full object-cover object-center transition-opacity duration-200 group-hover:opacity-90"
                type="avif"
              />
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {item.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
