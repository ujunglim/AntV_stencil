import styled from "styled-components";

// Styled Component
const RectDIV = styled.div`
  background: white;
  width: 90%;
  height: 90%;
  border: 3px dotted lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Rect = {
  x: 50,
  y: 150,
  width: 160,
  height: 70,
  label: "Rect",
  ports: {
    items: [
      { group: "in", id: "in1" },
      { group: "out", id: "out1" }
    ],
    groups: {
      in: {
        position: { name: "top" },
        attrs: {
          circle: {
            r: 0,
            magnet: false
          }
        },
        zIndex: 2
      },
      out: {
        position: { name: "bottom" },
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#1890FF",
            strokeWidth: 2,
            fill: "#1890FF"
          }
        },
        zIndex: 2
      }
    }
  },
  shape: "react-shape",
  component: <RectDIV>长方体</RectDIV>
};
