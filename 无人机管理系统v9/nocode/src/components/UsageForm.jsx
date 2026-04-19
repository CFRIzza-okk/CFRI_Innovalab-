import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, FileText, Save, Zap } from 'lucide-react';

const UsageForm = ({ selectedDrone, selectedBattery, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    operator: '',
    startTime: '',
    endTime: '',
    location: '',
    purpose: '',
    notes: '',
    weather: '',
    flightDuration: '',
    preFlightVoltage: '',
    postFlightVoltage: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      drone: selectedDrone,
      battery: selectedBattery,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="h-6 w-6 mr-2" />
        使用登记
      </h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">选中的设备</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-600">无人机:</span>
            <span className="ml-2 text-gray-700">{selectedDrone?.name} ({selectedDrone?.model})</span>
          </div>
          <div>
            <span className="text-blue-600">电池:</span>
            <span className="ml-2 text-gray-700">{selectedBattery?.name} ({selectedBattery?.level}%)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              操作员
            </label>
            <input
              type="text"
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入操作员姓名"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              飞行地点
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入飞行地点"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              开始时间
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              结束时间
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              飞行时长 (分钟)
            </label>
            <input
              type="number"
              name="flightDuration"
              value={formData.flightDuration}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入飞行时长"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              天气状况
            </label>
            <select
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择天气状况</option>
              <option value="晴朗">晴朗</option>
              <option value="多云">多云</option>
              <option value="阴天">阴天</option>
              <option value="小雨">小雨</option>
              <option value="大风">大风</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Zap className="h-4 w-4 inline mr-1" />
              飞行前电池电压 (V)
            </label>
            <input
              type="number"
              step="0.1"
              name="preFlightVoltage"
              value={formData.preFlightVoltage}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入飞行前电压"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Zap className="h-4 w-4 inline mr-1" />
              飞行后电池电压 (V)
            </label>
            <input
              type="number"
              step="0.1"
              name="postFlightVoltage"
              value={formData.postFlightVoltage}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入飞行后电压"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            飞行目的
          </label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择飞行目的</option>
            <option value="巡检">巡检</option>
            <option value="拍摄">拍摄</option>
            <option value="测绘">测绘</option>
            <option value="监控">监控</option>
            <option value="训练">训练</option>
            <option value="其他">其他</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            备注
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入备注信息（可选）"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Save className="h-4 w-4 mr-2" />
            提交登记
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsageForm;
