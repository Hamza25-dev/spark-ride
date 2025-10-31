import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Cards = ({
  data,
  columns = 3, // Default to 3 columns
  className = "",
  cardClassName = "",
  imageClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  showImage = true,
  showTitle = true,
  showDescription = true,
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns] || gridCols[3]} ${className}`}>
      {data.map((item, index) => (
        <Card key={index} className={`bg-gray-800 border-gray-700 text-white ${cardClassName}`}>
          {showImage && item.image && (
            <div className="mb-4">
              <Image
                src={item.image}
                alt={item.title || "Card image"}
                width={300}
                height={200}
                className={`w-full h-48 object-cover rounded-t-lg ${imageClassName}`}
              />
            </div>
          )}
          <CardContent className="p-4">
            {showTitle && item.title && (
              <h3 className={`text-lg font-bold mb-2 ${titleClassName}`}>
                {item.title}
              </h3>
            )}
            {showDescription && item.description && (
              <p className={`text-gray-300 ${descriptionClassName}`}>
                {item.description}
              </p>
            )}
            {/* Add more customizable content if needed */}
            {item.children && <div className="mt-4">{item.children}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
