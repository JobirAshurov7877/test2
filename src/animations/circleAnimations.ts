import { keyframes } from "styled-components";

export const moveBlue = keyframes`
 0% {
    transform-origin: 400% 50%;
    transform: rotate(0deg);
}
50% {
    transform-origin: -350% 50%;
    transform: rotate(1turn);
}
50.1% {
    transform-origin: 400% 50%;
    transform: rotate(0deg);
}
100% {
    transform-origin: 400% 50%;
    transform: rotate(-1turn);
}
`;

export const moveOrange = keyframes`
  0% {
    transform-origin: 20% 300%;
    transform: rotate(45deg);
}
50% {
    transform-origin: 20% 300%;
    transform: rotate(1turn);
}
50.1% {
    transform-origin: 20% -300%;
    transform: rotate(0deg);
}
100% {
    transform-origin: 20% -300%;
    transform: rotate(-1turn);
}
`;
