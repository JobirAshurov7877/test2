import { MyLoading } from "@/ui";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Styled component for the container

const Onboarding = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MyLoading />
    </div>
  );
};

export default Onboarding;
