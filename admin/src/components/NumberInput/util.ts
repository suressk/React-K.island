import _toString from "lodash/toString";

// 两数相加，保留小数位多的小数位长度
export const addNum = (num1: number, num2: number): number => {
  let sq1 = 0,
    sq2 = 0;
  try {
    // 数值 num1 小数位数
    sq1 = _toString(num1).split(".")[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    // 数值 num2 小数位数
    sq2 = _toString(num2).split(".")[1].length;
  } catch (e) {
    sq2 = 0;
  }
  const m = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
};

// 格式化数字，处理01变成1,并且不处理1. 这种情况
export function parseValue(num: string): string {
  if (num === "") return "0";

  const numStr = _toString(num);
  if (numStr.indexOf("0") === 0 && numStr.indexOf(".") === -1) {
    // 处理01变成1,并且不处理1.
    return _toString(parseFloat(num));
  }
  return _toString(num);
}

export function pxTransform(size: number): string {
  if (!size) return "";
  const designWidth = 750;
  const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  };
  return `${size / deviceRatio[designWidth]}rpx`;
}

export interface AtInputNumberProps {
  /**
   * 输入框类型
   * @type {'number' | 'digit'}
   * @description 必填，type='digit' 时，h5 无法显示数字输入框，若需要数字输入框建议使用 number (v1.5.1 支持)
   */
  type: "number" | "digit";
  /**
   * 输入框当前值
   * @type {number | string}
   * @description 必填，输入框当前值，开发者需要通过 onChange 事件来更新 value 值
   */
  value: number | string;

  customStyle?: any;
  /**
   * 最小值
   * @type {number}
   * @default 0
   */
  min?: number;
  /**
   * 最大值
   * @type {number}
   * @default 100
   */
  max?: number;
  /**
   * 每次点击改变的间隔大小
   * @type {number}
   * @default 1
   */
  step?: number;
  /**
   * 组件的大小
   * @default 'normal'
   */
  size?: "normal" | "large";
  /**
   * input 宽度
   * @type {number}
   * @description 不包括两侧按钮，单位根据环境转为 rpx 或 rem
   * @default 120
   */
  width?: number;
  /**
   * 是否禁止输入，禁止点击按钮
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否禁止输入，但不禁止点击按钮
   * @type {boolean}
   * @default false
   */
  disabledInput?: boolean;
  /**
   * 输入框值改变时触发的事件
   * @param {number} value 输入框当前值
   * @description 开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填
   */
  onChange: (value: number, e: any) => void;
  /**
   * 输入框值失去焦点时触发的事件
   */
  onBlur?: any;
  /**
   * 输入框尝试输入错误数组触发的事件
   * @param {InputError} errCb
   */
  onErrorInput?: (errCb: any) => void;
  /**
   * 输入框类名
   */
  className?: string;
  /**
   * 输入框外层 View 盒子类名
   */
  wrapperClassName?: string;
  /**
   * 自定义数字类型
   */
  customType?: "int" | "digit";
}

export interface InputError {
  type: "OVER" | "LOW" | "DISABLED";
  errorValue: number;
}
