/*
 * @Author: Seven
 * @Date: 2024-03-21 14:11:13
 * @LastEditTime: 2024-03-21 14:14:30
 * @LastEditors: Seven
 * @Description: 
 */


/**
 * @description: 为保证每个弹出层的id不同，生成guid的方法（不能用时间戳哈）
 */
export const getGuid = (): string => {
  return Array.from(
      { length: 8 },
      (_, i) =>
          (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
          ([1, 2, 3, 4].includes(i) ? '-' : '')
  ).join('')
}