// src/utils/safe-storage.js
/**
 * 安全版 JSON.stringify，自动处理循环引用
 */
export const safeStringify = (obj, indent = 2) => {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    // 检测到循环引用时，返回占位符
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return '[Circular Reference]';
      }
      cache.add(value);
    }
    // 过滤掉 Vue 内部响应式对象
    if (value && value.__v_isRef) {
      return value.value;
    }
    if (value && value._isVue) {
      return '[Vue Instance]';
    }
    return value;
  }, indent);
};

/**
 * 安全的 localStorage 操作
 */
export const safeLocalStorage = {
  setItem(key, value) {
    try {
      const serialized = safeStringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.warn(`安全存储失败 (${key}):`, error);
      // 尝试存储简化版本
      try {
        localStorage.setItem(key, JSON.stringify({ 
          _error: '存储失败', 
          _timestamp: new Date().toISOString() 
        }));
      } catch (e) {
        // 完全放弃
      }
    }
  },
  
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`安全读取失败 (${key}):`, error);
      localStorage.removeItem(key); // 清理损坏的数据
      return null;
    }
  },
  
  removeItem(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  }
};

// 替换原生的 JSON.stringify（谨慎使用，可能影响其他库）
if (process.env.NODE_ENV === 'development') {
  window.__originalJSONStringify = JSON.stringify;
  JSON.stringify = function(obj, replacer, space) {
    try {
      return window.__originalJSONStringify.call(this, obj, replacer, space);
    } catch (error) {
      if (error.message.includes('circular structure')) {
        console.warn('检测到循环引用，使用安全序列化:', error);
        return safeStringify(obj, space);
      }
      throw error;
    }
  };
}