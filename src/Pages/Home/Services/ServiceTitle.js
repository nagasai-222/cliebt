import { Typography } from "@mui/material";
import React from "react";

const ServiceTitile = ({ title, sx }) => {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: "bold",
          textAlign: "center",
          ...sx,
        }}
      >
        {title}{" "}
      </Typography>
    </div>
  );
};

export default ServiceTitile;