// 获取dom在屏幕中的top和left
export const getDomTopLeftById = (id) => {
  const dom = document.getElementById(id);
  let top = 0;
  let left = 0;
  if (dom != null) {
    top = dom.getBoundingClientRect().top;
    left = dom.getBoundingClientRect().left;
  }
  return { top: top, left: left };
};

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
};
