import styled from "styled-components";

//========== Styled Components ============
const CircleDiv = styled.div`
  background: white;
  width: 90%;
  height: 90%;
  border: 3px solid lightgrey;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartNode = {
  x: 100,
  y: 40,
  width: 60,
  height: 60,
  // label: "开始",
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
  component: <CircleDiv>开始</CircleDiv>
};

// need to deep clone
export const FinishNode = JSON.parse(JSON.stringify(StartNode));
FinishNode.x = 100;
FinishNode.y = 300;

FinishNode.component = <CircleDiv>结束</CircleDiv>;
FinishNode.ports.items.pop(); // remove out port
