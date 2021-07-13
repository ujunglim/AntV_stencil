import { Addon, Graph, Shape } from "@antv/x6";
import { usePortal } from "@antv/x6-react-shape";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FinishNode, StartNode } from "./Node/Circle";

const GRAPH_1 = "GRAPH_1";

export default function GraphEditor() {
  const [Portal, setPortalGraph] = usePortal(GRAPH_1);
  const [graph, setGraph] = useState();
  const [stencil, setStencil] = useState();
  // fake data
  const [bound, setBound] = useState([
    { name: "a", x: 30, y: 30, w: 100, h: 70 },
    { name: "b", x: 180, y: 40, w: 100, h: 70 },
    { name: "c", x: 40, y: 160, w: 100, h: 70 },
    { name: "d", x: 200, y: 190, w: 100, h: 70 }
  ]);

  useEffect(() => {
    // create graph instance
    const g = new Graph({
      container: document.getElementById("container"),
      // autoResize: true,
      width: 400,
      height: 400,
      grid: {
        size: 10,
        visible: true,
        type: "dot", // 'dot' | 'fixedDot' | 'mesh'
        args: {
          color: "#a0a0a0", // 网格线/点颜色
          thickness: 1 // 网格线宽度/网格点大小
        }
      }
    });
    // create stencil instance
    const s = new Addon.Stencil({
      title: "Components",
      target: g,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: "Search by shape name",
      notFoundText: "Not Found",
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          name: "group1",
          title: "Group(Collapsable)"
        },
        {
          name: "group2",
          title: "Group",
          collapsable: false
        }
      ],
      validateNode(droppingNode, options) {
        // get x,y of dropping node
        const { x, y } = droppingNode.getProp("position");
        // console.log(x, y);
        for (let i = 0; i < bound.length; i++) {
          const { x: boundX, y: boundY, w, h } = bound[i];

          const maxX = boundX + w - 70;
          const maxY = boundY + h - 40;
          // if drop node inside of boundary
          if (boundX <= x && x <= maxX && boundY <= y && y <= maxY) {
            console.log(bound[i].name);
            return true;
          }
        }
        return false;
      }
    });

    // render boundary
    for (let i = 0; i < bound.length; i++) {
      const { x, y, w, h } = bound[i];
      g.addNode({
        x: x,
        y: y,
        width: w,
        height: h,
        attrs: {
          label: {
            text: "Hello",
            fill: "#6a6c8a"
          },
          body: {
            stroke: "#31d0c6",
            strokeWidth: 2
          }
        }
      });
    }

    g.on("node:click", (e) => {
      console.log(e);
    });

    setPortalGraph(g);
    setGraph(g);
    setStencil(s);

    const stencilDOM = document.querySelector("#stencil-panel");
    stencilDOM.appendChild(s.container);
  }, [Portal]);

  const r = new Shape.Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
      text: { text: "rect", fill: "white" }
    }
  });

  const c = new Shape.Circle({
    width: 60,
    height: 60,
    attrs: {
      circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
      text: { text: "ellipse", fill: "white" }
    }
  });

  stencil && stencil.load([r], "group1");
  stencil && stencil.load([c], "group2");

  return (
    <DIV>
      <ToolDiv id="stencil-panel"></ToolDiv>
      <EditorContainer id="container"></EditorContainer>
    </DIV>
  );
}

//============ styled components ==============
const EditorContainer = styled.div`
  border: 3px solid lightgrey;
  border-radius: 10px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

const ToolDiv = styled.div`
  width: 200px;
  border: 1px solid #f0f0f0;
  position: relative; /* !!! */
`;

const DIV = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
