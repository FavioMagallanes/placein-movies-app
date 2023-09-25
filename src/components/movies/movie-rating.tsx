import { useState } from "react";
import { Rating, Typography } from "@material-tailwind/react";

export const MovieRating = () => {
  const [rated, setRated] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <Rating value={rated} onChange={value => setRated(value)} />
      <Typography color="blue-gray" className="font-medium text-xs mr-2">
        {rated}.0 Rated
      </Typography>
    </div>
  );
};
