import React, { useState, useCallback } from "react";
import _toString from "lodash/toString";

import styles from "./index.module.less";
import classnames from "classnames";

interface NativeNumberInputProps {
  onChange?: (value: number) => void;
  value?: number; // 数值
  step?: number; // 每步变化数
  min?: number;
  max?: number;
  precision?: number; // 小数点后保留几位(0则为整数)
  wrapperClassName?: string; // 外层容器类名
  className?: string; // 输入框类名
  tipHandler?: (min: number, max: number) => void; // 超出 范围 提示方法
  needStepBtn?: boolean;
}

// 两数相加，保留小数位多的小数位长度
const addNum = (num1: number, num2: number): number => {
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

const NativeNumberInput: React.FC<NativeNumberInputProps> = (
  props
): JSX.Element => {
  const {
    className,
    wrapperClassName,
    precision = 0,
    min = 0,
    max = 100,
    step = 1,
    value: defaultValue,
    onChange,
    tipHandler,
    needStepBtn = true,
  } = props;

  // 存储值
  const [value, setValue] = useState(_toString(defaultValue));

  // 格式化数字（TODO：处理整数 / 小数）
  const parseValue = useCallback(
    (num: string): string => {
      // console.log('parseValue start: ', num);
      if (num === "") return "0";
      const numStr = _toString(num);

      // 不保留小数
      if (precision === 0) {
        // 替换非数字字符
        return num.replace(/\D/g, "");
      }

      // 0 开头且无小数点
      if (numStr.indexOf("0") === 0 && numStr.indexOf(".") === -1) {
        // 处理 01 变成 1,并且不处理 1.
        return _toString(parseFloat(num));
      }
      // '0.' 开头 且可转为数字
      if (
        numStr.indexOf("0") === 0 &&
        numStr.indexOf(".") === 1 &&
        !isNaN(Number(num))
      ) {
        return _toString(num);
      }

      // 保留 precision 位小数，如 两位：[0 ~ 99999.99]
      // 有值且不可转为有效数字（'0.'也在其列 <!0 为 true>，故上面单独处理）
      if (num && !Number(num)) {
        // 转为浮点型数
        return _toString(parseFloat(num));
      }
      // 可转为有效数字
      // console.log('可转为有效数字: ', num);
      return _toString(num);
    },
    [precision]
  );

  // 极值判断
  const judgeExtremeValue = useCallback(
    (val: string, resetMin = false) => {
      const judgedVal = Number(val);
      // 无需重置为最小值
      if (!resetMin) {
        if (val === "" || judgedVal < min) {
          tipHandler?.(min, max); // 提示信息
        }
      } else {
        if (judgedVal < min) {
          tipHandler?.(min, max); // 提示信息
          val = _toString(min);
        }
      }
      if (judgedVal > max) {
        tipHandler?.(min, max);
        val = _toString(max);
      }
      return val;
    },
    [min, max]
  );

  // 处理输入的数值，返回最终应当保存的值 [string]
  const handleValue = useCallback(
    (val: string): string => {
      // parseValue() 返回的【一定】是一个可转为数字的值 [string]
      const parsedVal = parseValue(val);
      // console.log('parsedVal: ', parsedVal);
      let resultVal = ""; // 最终处理后的结果
      // 整数
      if (precision === 0) {
        resultVal = judgeExtremeValue(parsedVal);
      } else {
        // 小数，经过 parseValue 方法，最多只会有一个小数点
        if (parsedVal.indexOf(".") > -1) {
          // 含小数点 截掉小数点后多余位数
          const arr = parsedVal.split(".");
          // 简单容错：使用 Math.abs()，避免会传负数
          arr[1] = arr[1].substr(0, Math.abs(precision));
          resultVal = arr.join(".");
          // 有小数位极值判定
          resultVal = judgeExtremeValue(resultVal);
        } else {
          // 无小数位极值判定
          resultVal = judgeExtremeValue(parsedVal);
        }
      }
      // console.log('resultVal: ', resultVal);
      return resultVal;
    },
    [precision, judgeExtremeValue]
  );

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      // console.log('handleChange: ', val);
      const newValue = handleValue(val);
      // console.log('最终赋值结果 newValue: ', newValue);
      setValue(newValue);
      onChange?.(Number(newValue));
    },
    [handleValue, onChange]
  );

  // 变更输入框显示的值
  const changeVal = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(Number(newValue));
    },
    [onChange]
  );

  // 输入框失去焦点
  const handleBlur = useCallback(() => {
    changeVal(judgeExtremeValue(value, true));
  }, [value]);

  // 数值增加按钮
  const handleIncrease = useCallback(() => {
    const addedVal = addNum(Number(value), step);
    changeVal(judgeExtremeValue(_toString(addedVal), true));
  }, [value, step]);

  // 数值减小
  const handleDecrease = useCallback(() => {
    const addedVal = addNum(Number(value), -1 * step);
    changeVal(judgeExtremeValue(_toString(addedVal), true));
  }, [value, step]);

  const rootCls = classnames(styles.wrapper, wrapperClassName);
  const iptCls = classnames(styles.ipt, className);

  return (
    <div className={rootCls}>
      {needStepBtn && (
        <div className={styles.icon} onClick={handleDecrease}>
          <span className={styles.decrease} />
        </div>
      )}

      <input
        className={iptCls}
        value={value}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {needStepBtn && (
        <div className={styles.icon} onClick={handleIncrease}>
          <span className={styles.increase} />
        </div>
      )}
    </div>
  );
};

export default NativeNumberInput;
