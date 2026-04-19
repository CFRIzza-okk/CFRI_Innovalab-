import React from 'react';
import { Calendar, Clock, MapPin, User, Phone as Drone, Battery, FileText, Zap } from 'lucide-react'

const UsageRecords = ({ records }) => {
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('zh-CN');
  };

  const getPurposeColor = (purpose) => {
    const colors = {
      '巡检': 'bg-blue-100 text-blue-800',
      '拍摄': 'bg-green-100 text-green-800',
      '测绘': 'bg-purple-100 text-purple-800',
      '监控': 'bg-orange-100 text-orange-800',
      '训练': 'bg-yellow-100 text-yellow-800',
      '其他': 'bg-gray-100 text-gray-800'
    };
    return colors[purpose] || 'bg-gray-100 text-gray-800';
  };

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">暂无使用记录</h3>
        <p className="text-gray-500">开始登记您的第一次飞行记录吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="h-6 w-6 mr-2" />
        使用记录
      </h2>
      
      {records.map((record) => (
        <div key={record.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPurposeColor(record.purpose)}`}>
                {record.purpose}
              </span>
              <span className="text-sm text-gray-500">{record.date}</span>
            </div>
            <div className="text-sm text-gray-500">
              记录ID: {record.id}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">操作员: {record.operator}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">地点: {record.location}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  开始: {formatDateTime(record.startTime)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  结束: {formatDateTime(record.endTime)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  飞行前电压: {record.preFlightVoltage}V
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  飞行后电压: {record.postFlightVoltage}V
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">飞行时长: {record.flightDuration} 分钟</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">天气: {record.weather}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Drone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  无人机: {record.drone?.name} ({record.drone?.model})
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Battery className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  电池: {record.battery?.name} ({Math.round((record.battery?.voltage / 4.2) * 100)}%)
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Battery className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  电池电压: {record.battery?.voltage}V
                </span>
              </div>
            </div>
          </div>
          
          {record.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h4 className="text-sm font-medium text-gray-700 mb-1">备注</h4>
              <p className="text-sm text-gray-600">{record.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsageRecords;
