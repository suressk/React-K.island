import React, { useState, useCallback, memo } from "react";
import _toString from "lodash/toString";
import classnames from "classnames";
import { addNum, parseValue } from "./util";
import styles from "./index.module.less";

interface NativeNumberInputProps {
  onChange?: (value: number) => void;
  value?: number | string; // 数值
  step?: number; // 每步变化数
  min?: number;
  max?: number;
  precision?: number; // 小数点后保留几位(0则为整数)
  wrapperClassName?: string; // 外层容器类名
  className?: string; // 输入框类名
  tipHandler?: (min: number, max: number) => void; // 超出极值 toast 提示
  needStepBtn?: boolean; // 是否需要 - & + 按钮
}

/**
 * 封装原生数字输入框，目前不支持负数
 * @param props
 * @returns
 */
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
  const [value, setValue] = useState(_toString(defaultValue) || "0");

  // 极值判断
  const judgeExtremeValue = useCallback(
    (val: string, checkMin = false) => {
      const judgedVal = Number(val);
      // 是否检测最小值
      if (!checkMin) {
        if (val === "" || judgedVal < min) {
          tipHandler?.(min, max); // 提示信息
        }
      } else {
        if (judgedVal < min) {
          tipHandler?.(min, max); // 提示信息
          val = _toString(min);
        }
      }
      // 检测最大值
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
      const parsedVal = parseValue(val, precision);
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

  // 更新 value
  const changeVal = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(Number(newValue));
    },
    [onChange]
  );

  // 输入框内容变更触发
  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      // console.log('handleChange: ', val);
      const newValue = handleValue(val);
      // console.log('最终赋值结果 newValue: ', newValue);
      changeVal(newValue);
    },
    [handleValue, changeVal]
  );

  // 输入框失焦触发
  const handleBlur = useCallback(() => {
    const val = judgeExtremeValue(value, true);
    if (val === "") {
      changeVal("0");
    } else {
      changeVal(val);
    }
  }, [value]);

  // 数值增加按钮
  const handleIncrease = useCallback(() => {
    const addedVal = addNum(Number(value), step);
    changeVal(judgeExtremeValue(_toString(addedVal), true));
  }, [value, step]);

  // 数值减小按钮
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

export default memo(NativeNumberInput);
