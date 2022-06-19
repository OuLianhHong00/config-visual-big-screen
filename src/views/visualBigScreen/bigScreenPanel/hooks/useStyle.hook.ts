export const useComponentStyle = (attr, index: number) => {
  if (!attr) return {};
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.left}px`,
    top: `${attr.top}px`,
  };
  return componentStyle;
};

export const useSizeStyle = (attr, scale?: number) => {
  if (!attr) return {};
  return {
    width: `${scale ? scale * attr.width : attr.width}px`,
    height: `${scale ? scale * attr.height : attr.height}px`,
  };
};

// 锚点位置
export const usePointStyle = (point: string, index: number, attr, cursorResize: string[]) => {
  const { width, height } = attr;

  const isTop = /t/.test(point);
  const isBottom = /b/.test(point);
  const isLeft = /l/.test(point);
  const isRight = /r/.test(point);

  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = isLeft ? 0 : width;
    newTop = isTop ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (isTop || isBottom) {
      newLeft = width / 2;
      newTop = isTop ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (isLeft || isRight) {
      newLeft = isLeft ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }

  const style = {
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursorResize[index] + '-resize',
  };

  return style;
};
