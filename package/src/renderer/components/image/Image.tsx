import React, { useMemo } from "react";

import type { IImage } from "../../../skia";
import { useImage } from "../../../skia";
import type { CustomPaintProps } from "../../processors/Paint";
import { useDrawing } from "../../nodes/Drawing";
import type { RectDef } from "../../processors/Shapes";
import { processRect } from "../../processors/Shapes";
import type { AnimatedProps } from "../../processors/Animations/Animations";

import type { Fit } from "./BoxFit";
import { fitRects } from "./BoxFit";

export interface SourceProps {
  source: number | IImage;
}

export type ImageProps = RectDef &
  CustomPaintProps & {
    fit: Fit;
  };

export const Image = (
  defaultProps: AnimatedProps<ImageProps> & SourceProps
) => {
  const image = useImage(defaultProps.source);
  const props = useMemo<AnimatedProps<ImageProps>>(
    () => ({ ...defaultProps, image }),
    [defaultProps, image]
  );
  const onDraw = useDrawing(
    props,
    ({ canvas, paint }, { fit, ...rectProps }) => {
      if (image === null) {
        return;
      }
      const rect = processRect(rectProps);
      const { src, dst } = fitRects(
        fit,
        { x: 0, y: 0, width: image.width(), height: image.height() },
        rect
      );
      canvas.drawImageRect(image, src, dst, paint);
    }
  );
  return <skDrawing onDraw={onDraw} {...props} />;
};

Image.defaultProps = {
  x: 0,
  y: 0,
  fit: "contain",
};
