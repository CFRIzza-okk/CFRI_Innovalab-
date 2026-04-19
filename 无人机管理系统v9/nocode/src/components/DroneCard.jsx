import React, { useState } from 'react';
import { Battery, Clock, MapPin, Edit, Save, X } from 'lucide-react'

const DroneCard = ({ drone, onSelect, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...drone });

  const getStatusColor = (status) => {
    switch (status) {
      case '可用': return 'bg-green-100 text-green-800';
      case '使用中': return 'bg-blue-100 text-blue-800';
      case '维护中': return 'bg-yellow-100 text-yellow-800';
      case '故障': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...drone });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">编辑无人机</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-gray-600 hover:bg-gray-50 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名称</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">型号</label>
            <input
              type="text"
              value={editData.model}
              onChange={(e) => setEditData({ ...editData, model: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="可用">可用</option>
              <option value="使用中">使用中</option>
              <option value="维护中">维护中</option>
              <option value="故障">故障</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">载荷</label>
            <input
              type="text"
              value={editData.payload}
              onChange={(e) => setEditData({ ...editData, payload: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入载荷信息"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电池电量 (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={editData.batteryLevel}
              onChange={(e) => setEditData({ ...editData, batteryLevel: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onSelect(drone)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src="https://s3plus.meituan.net/nocode-external/nocode_image/default/uav-p38zcww7epqgtdkk1bwrnw4kjrmkgz.png" 
            alt="无人机图标" 
            className="h-8 w-8 object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{drone.name}</h3>
            <p className="text-sm text-gray-600">{drone.model}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(drone.status)}`}>
            {drone.status}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(drone.id);
            }}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Battery className="h-4 w-4 text-gray-500" />
          <span className="text-gray-600">电池: {drone.batteryLevel}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-600">载荷: {drone.payload}</span>
        </div>
      </div>
    </div>
  );
};

export default DroneCard;
