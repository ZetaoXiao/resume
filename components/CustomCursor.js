"use client";

// 自定义光标默认关闭:使用系统原生光标，避免弹簧跟随造成的延迟与“被劫持”的感觉。
// 如需恢复视觉光标，将下面的开关改为 true，并在 globals.css 中恢复 cursor 相关规则。
const ENABLE_CUSTOM_CURSOR = false;

export default function CustomCursor() {
  if (!ENABLE_CUSTOM_CURSOR) return null;
  return null;
}
