// 本地存储工具函数
export const storage = {
  // 获取存储的数据
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('获取本地存储失败:', error);
      return defaultValue;
    }
  },

  // 设置存储的数据
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('设置本地存储失败:', error);
    }
  },

  // 删除存储的数据
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('删除本地存储失败:', error);
    }
  }
};
