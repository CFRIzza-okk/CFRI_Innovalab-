import { Calendar, Battery, Zap, Edit, X, Save, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
const BatteryCard = ({ battery, onSelect, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...battery });

  // 自动计算电量百分比
  const calculateBatteryLevel = (voltage) => {
    return Math.min(Math.max(Math.round((voltage / 4.2) * 100), 0), 100);
  };

  // 更新编辑数据时自动计算电量
  const handleVoltageChange = (e) => {
    const voltage = parseFloat(e.target.value) || 0;
    const level = calculateBatteryLevel(voltage);
    setEditData({ 
      ...editData, 
      voltage: voltage,
      level: level
    });
  };

  const getBatteryColor = (level) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    if (level >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '可用': return 'bg-green-100 text-green-800';
      case '使用中': return 'bg-blue-100 text-blue-800';
      case '充电中': return 'bg-yellow-100 text-yellow-800';
      case '故障': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...battery });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">编辑电池</h3>
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
              value="3v250mh"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
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
              <option value="充电中">充电中</option>
              <option value="故障">故障</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电压 (V)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4.2"
                value={editData.voltage}
                onChange={handleVoltageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电量 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={calculateBatteryLevel(editData.voltage)}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">容量 (mAh)</label>
              <input
                type="number"
                min="0"
                value="250"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">上次充电日期</label>
            <input
              type="date"
              value={editData.lastCharge}
              onChange={(e) => setEditData({ ...editData, lastCharge: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // 计算当前电量百分比
  const currentLevel = calculateBatteryLevel(battery.voltage);

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onSelect(battery)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Battery className={`h-8 w-8 ${getBatteryColor(currentLevel)}`} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{battery.name}</h3>
            <p className="text-sm text-gray-600">3v250mh</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(battery.status)}`}>
            {battery.status}
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
              onDelete(battery.id);
            }}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">电量</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${currentLevel >= 50 ? 'bg-green-500' : currentLevel >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${currentLevel}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getBatteryColor(currentLevel)}`}>
              {currentLevel}%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">电压: {battery.voltage}V</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">上次充电: {battery.lastCharge}</span>
          </div>
          <div className="text-gray-600">
            容量: 250mAh
          </div>
        </div>
        
        {currentLevel < 20 && (
          <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 p-2 rounded">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">电量过低，建议充电</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatteryCard;
