import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const api = {
  // 用户相关API
  getUsers: (params) => axios.get(`${API_URL}/users`, { params }),

  // 设备相关API
  getAllDevices: () => axios.get(`${API_URL}/devices`),
  getDevice: (id) => axios.get(`${API_URL}/devices/${id}`),
  updateDevice: (id, data) => axios.patch(`${API_URL}/devices/${id}`, data),

  // 房间相关API
  getRooms: () => axios.get(`${API_URL}/rooms`),

  // 场景相关API
  getScenes: () => axios.get(`${API_URL}/scenes`),
  activateScene: (sceneId) => {
    return axios.get(`${API_URL}/scenes/${sceneId}`).then((res) => {
      const scene = res.data
      // 遍历设备并更新状态
      const updatePromises = scene.devices.map((device) =>
        axios.patch(`${API_URL}/devices/${device.id}`, device)
      )
      return Promise.all(updatePromises).then(() => scene)
    })
  }
}