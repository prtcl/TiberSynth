import React from 'react';
import Measure from 'react-measure';
import memoize from 'memoize-one';
import Mouse from '../../../../components/Mouse';
import { expo, flip, scale } from '../../../../lib/math';
import stylesheet from './PlayingSurface.less';

const FORMATTERS = {
  hz: n => `${Math.round(n)}hz`,
  ms: n => `${Math.round(n * 1000)}ms`,
  percent: n => `${Math.round(n * 100)}%`,
};

const getPointCx = memoize((x = 0, width = 0) => scale(x, -1, 1, 0, width));
const getPointCy = memoize((y = 0, height = 0) => scale(y, -1, 1, height, 0));

const Point = ({
  dimensions,
  distance = 0,
  label,
  synthesisValue,
  value = 0,
  weight = 0,
  x = 0,
  y = 0,
  valueFormatter,
}) => {
  const { width, height } = dimensions;
  const cx = getPointCx(x, width);
  const cy = getPointCy(y, height);

  const closeness = expo(flip(distance));

  const weightRadius = scale(weight, 0, 1, 3, 45);
  const valueRadius = scale(expo(value), 0, weight, 1, 42);

  const weightStrokeWidth = scale(closeness, 0, 1, 2, 30);
  const valueStrokeWidth = scale(closeness, 0, 1, 4, 15);

  const weightOpacity = scale(closeness, 0, 1, 0.25, 1);
  const valueOpacity = scale(closeness, 0, 1, 0.25, 1);
  const markerOpacity = scale(closeness, 0, 1, 0.75, 1);

  return (
    <g className={stylesheet.point}>
      <circle
        className={stylesheet.weightHalo}
        cx={cx}
        cy={cy}
        r={weightRadius * 3}
        style={{ opacity: weightOpacity }}
      />
      <circle
        className={stylesheet.weight}
        cx={cx}
        cy={cy}
        r={weightRadius}
        style={{ opacity: weightOpacity, strokeWidth: weightStrokeWidth }}
      />
      <circle
        className={stylesheet.value}
        cx={cx}
        cy={cy}
        r={valueRadius}
        style={{ opacity: valueOpacity, strokeWidth: valueStrokeWidth }}
      />
      <circle
        className={stylesheet.marker}
        cx={cx}
        cy={cy}
        r={1}
        style={{ opacity: markerOpacity }}
      />
      <text className={stylesheet.label} x={cx + 13 + valueRadius} y={cy}>
        {label}
      </text>
      <text
        className={stylesheet.synthesisValue}
        x={cx + 13 + valueRadius}
        y={cy + 13}
      >
        {valueFormatter(synthesisValue)}
      </text>
    </g>
  );
};

const PointVisualization = ({
  dimensions,
  points,
  position,
  synthesisValues,
}) => (
  <div className={stylesheet.pointVisualization}>
    <svg className={stylesheet.svg}>
      <g>
        {points.map(point => (
          <Point
            {...point}
            dimensions={dimensions}
            key={point.id}
            position={position}
            synthesisValue={synthesisValues[point.id]}
            valueFormatter={FORMATTERS[point.format]}
          />
        ))}
      </g>
    </svg>
  </div>
);

const PlayingSurface = ({
  onMove,
  onPlay,
  onStop,
  points,
  position,
  spaceId,
  synthesisValues,
}) => (
  <Measure bounds={true}>
    {({ measureRef, contentRect: { bounds: dimensions } }) => (
      <div ref={measureRef} className={stylesheet.container}>
        <Mouse onMove={onMove} onUp={onStop} onDown={onPlay} onLeave={onStop}>
          {spaceId && dimensions.width && (
            <PointVisualization
              dimensions={dimensions}
              key={spaceId}
              points={points}
              position={position}
              spaceId={spaceId}
              synthesisValues={synthesisValues}
            />
          )}
        </Mouse>
      </div>
    )}
  </Measure>
);

export default PlayingSurface;
