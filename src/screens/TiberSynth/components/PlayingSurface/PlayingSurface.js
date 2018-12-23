import React from 'react';
import Measure from 'react-measure';
import Mouse from '../../../../components/Mouse';
import { expo, scale } from '../../../../lib/math';
import stylesheet from './PlayingSurface.less';

const Point = ({ dimensions, x, y, value, distance }) => {
  const { width, height } = dimensions;
  const cx = scale(x, -1, 1, 0, width);
  const cy = scale(y, -1, 1, height, 0);
  const r = scale(value, 0, 1, 2, 50);
  const opacity = scale(expo(distance), 1, 0, 0.15, 0.8);

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} style={{ opacity }} />
    </g>
  );
};

const PointVisualization = ({ dimensions, points }) => (
  <div className={stylesheet.pointVisualization}>
    <svg className={stylesheet.svg}>
      <g>
        {points.map(point => (
          <Point key={point.id} {...point} dimensions={dimensions} />
        ))}
      </g>
    </svg>
  </div>
);

const PlayingSurface = ({ points, spaceId, onMove, onPlay, onStop }) => (
  <Measure bounds={true}>
    {({ measureRef, contentRect: { bounds: dimensions } }) => (
      <div ref={measureRef} className={stylesheet.container}>
        <Mouse onMove={onMove} onUp={onStop} onDown={onPlay} onLeave={onStop}>
          {spaceId && dimensions.width && (
            <PointVisualization
              dimensions={dimensions}
              key={spaceId}
              spaceId={spaceId}
              points={points}
            />
          )}
        </Mouse>
      </div>
    )}
  </Measure>
);

export default PlayingSurface;
