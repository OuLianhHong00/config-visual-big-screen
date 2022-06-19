// 基础柱状图
export const barData = {
  xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    { name: 'Rainfall', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: 'Evaporation', data: [20, 182, 191, 234, 290, 330, 310] },
  ],
};
// 堆叠柱状图
export const stackBarData = {
  xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    { name: 'Rainfall', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: 'Evaporation', stack: 'ad', data: [20, 182, 191, 234, 290, 330, 310] },
    { name: 'Email', stack: 'ad', data: [10, 132, 131, 204, 250, 370, 300] },
  ],
};

// 折柱图
export const barLineData = {
  xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  series: [
    {
      name: 'Rainfall',
      type: 'bar',
      stack: 'ad1',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    { name: 'Evaporation', stack: 'ad', type: 'bar', data: [20, 182, 191, 234, 290, 330, 310] },
    { name: 'Email', type: 'line', data: [10, 132, 131, 204, 250, 370, 300] },
  ],
};

export const lineData = {
  xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    { name: 'Email', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: 'Union Ads', data: [220, 182, 191, 234, 290, 330, 310] },
  ],
};

// 排名轮播滚动
const array: { name: string; value: number }[] = [];
for (let i = 0; i < 30; i++) {
  array.push({ name: `数据${i}`, value: Math.floor(Math.random() * (1000 - 5)) + 5 });
}
export const rankList = array;
