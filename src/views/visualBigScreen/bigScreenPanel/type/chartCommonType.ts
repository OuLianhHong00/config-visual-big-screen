import { MenuEnum } from '../enums/commonEnum';
export interface MenuOptionsItemType {
  type?: string;
  label?: string;
  key: MenuEnum | string;
  icon?: string;
  fnHandle?: Function;
  disabled?: boolean;
  hidden?: boolean;
}

export interface ChartItem {
  code: string;
  type: string;
  label: string;
  icon: string;
  uuid: string;
  option: {
    attr: [];
    dataSource: {
      dataType: number;
      staticData: any[];
      dynamicData: string;
    };
    position: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
  };
}
