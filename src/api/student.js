// ../../api/student.js
import axios from 'axios' // 改用官方默认Axios，不是 ~/axios

// 路径必须是 /api/student/queryAll（带 /api 前缀，匹配代理）
export function getStudentList() {
  return axios.get('/api/student/queryAll')
}