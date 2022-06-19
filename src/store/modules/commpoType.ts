// 编辑画布属性
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
  IS_CREATE = 'isCreate',
  IS_DRAG = 'isDrag',
}
// 编辑区域
export type EditCanvasType = {
  // 编辑区域 DOM
  [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null;
  [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null;
  // 偏移大小
  [EditCanvasTypeEnum.OFFSET]: number;
  // 缩放
  [EditCanvasTypeEnum.SCALE]: number;
  // 缩放
  [EditCanvasTypeEnum.USER_SCALE]: number;
  // 锁定缩放
  [EditCanvasTypeEnum.LOCK_SCALE]: boolean;
  // 初始化创建
  [EditCanvasTypeEnum.IS_CREATE]: boolean;
  // 拖拽中
  [EditCanvasTypeEnum.IS_DRAG]: boolean;
};

export type ComponentType = {
  code: string;
  uuid: string;
  type: string;
  label: string;
  icon: string;
  option: {
    attr: any[];
    // 数据源
    dataSource: {
      dataType: number;
      staticData: any[];
      dynamicData: string;
    };
    // 坐标
    position: {
      left: string;
      top: string;
      width: number;
      height: number;
    };
  };
};

// 对象类型
export enum HistoryTargetTypeEnum {
  CANVAS = 'canvas',
  CHART = 'chart',
  BOX = 'box',
}

// 操作类型枚举
export enum HistoryActionTypeEnum {
  // 新增
  ADD = 'add',
  // 删除
  DELETE = 'delete',
  // 更新（位置，属性）
  UPDATE = 'update',
  // 移动
  MOVE = 'move',
  // 复制
  COPY = 'copy',
  // 剪切
  CUT = 'cut',
  // 粘贴
  PASTE = 'paste',
  // 置顶
  TOP = 'top',
  // 置底
  BOTTOM = 'bottom',
  // 上移
  UP = 'up',
  // 下移
  DOWN = 'down',
  // 选择历史记录
  SELECT_HISTORY = 'selectHistory',
}

// 右键枚举
export enum MenuEnum {
  ARROW_UP = 'up',
  ARROW_RIGHT = 'right',
  ARROW_DOWN = 'down',
  ARROW_LEFT = 'left',
  DELETE = 'delete',
  COPY = 'copy',
  CUT = 'cut',
  PARSE = 'parse',
  TOP = 'top',
  BOTTOM = 'bottom',
  UP = 'up',
  DOWN = 'down',
  CLEAR = 'clear',
  BACK = 'back',
  FORWORD = 'forward',
}
