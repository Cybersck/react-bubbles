import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle, SymbolShape} from "@potion/element";

const Bubbles = ({ colors, showAll }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  let shapes = ['symbolCross', 'symbolCircle'];
  return (
    <div className="bubble-wrap">
      <p>Bubbles</p>
      <Svg width={25*colors.length} height={25*colors.length}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[25*colors.length, 25*colors.length]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  if (showAll) {
                    return (
                      <Circle
                        key={key}
                        cx={x}
                        cy={y}
                        r={r}
                        fill={colors[i].code.hex}
                      />
                    );
                  } else {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                      component={shapes[Math.floor(Math.random() * shapes.length -1)]}
                    />
                  );
                }
              }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
