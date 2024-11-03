import styled from "styled-components";

const MyLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #00000025;
  z-index: 9999;
`;

export default MyLoadingContainer;
