import { environment } from '../environments/environment';

export const API = {
    getResourcData:  environment.server_url + '/resource/list', // 获取资源类型列表
    getResourceTree:  environment.server_url + '/resource/tree', // 获取目录
    logout:  environment.server_url + '/login/quit', // 退出登录
};
