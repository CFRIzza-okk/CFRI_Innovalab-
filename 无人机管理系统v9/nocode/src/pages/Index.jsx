import { Battery, UserPlus, List, FileText, Plus } from 'lucide-react';
import BatteryCard from '../components/BatteryCard';
import DroneCard from '../components/DroneCard';
import UsageForm from '../components/UsageForm';
import React, { useEffect, useState } from 'react';
import UsageRecords from '../components/UsageRecords';
import { storage } from '../lib/storage';
const Index = () => {
  const [activeTab, setActiveTab] = useState('drones');
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [showUsageForm, setShowUsageForm] = useState(false);
  const [usageRecords, setUsageRecords] = useState(storage.get('usageRecords', []));
  const [showAddDrone, setShowAddDrone] = useState(false);
  const [showAddBattery, setShowAddBattery] = useState(false);

  // 模拟无人机数据 - 修改为Crazyflie命名，移除飞行时间和序列号
  const [drones, setDrones] = useState(storage.get('drones', [
    {
      id: 1,
      name: 'Crazyflie-01',
      model: 'Crazyflie 2.1',
      status: '可用',
      batteryLevel: 85,
      payload: '相机'
    },
    {
      id: 2,
      name: 'Crazyflie-02',
      model: 'Crazyflie 2.1',
      status: '使用中',
      batteryLevel: 60,
      payload: '传感器'
    },
    {
      id: 3,
      name: 'Crazyflie-03',
      model: 'Crazyflie 2.1',
      status: '维护中',
      batteryLevel: 0,
      payload: '无'
    }
  ]));

  // 模拟电池数据 - 移除序列号和循环次数，统一型号为3v250mh，容量为250mAh
  const [batteries, setBatteries] = useState(storage.get('batteries', [
    {
      id: 1,
      name: 'BAT-001',
      model: '3v250mh',
      status: '可用',
      level: 95,
      voltage: 12.6,
      lastCharge: '2024-01-15',
      capacity: 250
    },
    {
      id: 2,
      name: 'BAT-002',
      model: '3v250mh',
      status: '使用中',
      level: 65,
      voltage: 11.8,
      lastCharge: '2024-01-14',
      capacity: 250
    },
    {
      id: 3,
      name: 'BAT-003',
      model: '3v250mh',
      status: '充电中',
      level: 25,
      voltage: 10.5,
      lastCharge: '2024-01-13',
      capacity: 250
    }
  ]));

  // 自动保存数据到本地存储
  useEffect(() => {
    storage.set('drones', drones);
  }, [drones]);

  useEffect(() => {
    storage.set('batteries', batteries);
  }, [batteries]);

  useEffect(() => {
    storage.set('usageRecords', usageRecords);
  }, [usageRecords]);

  const handleDroneSelect = (drone) => {
    setSelectedDrone(drone);
    if (selectedBattery) {
      setShowUsageForm(true);
    }
  };

  const handleBatterySelect = (battery) => {
    setSelectedBattery(battery);
    if (selectedDrone) {
      setShowUsageForm(true);
    }
  };

  const handleUsageSubmit = (usageData) => {
    setUsageRecords([usageData, ...usageRecords]);
    setShowUsageForm(false);
    setSelectedDrone(null);
    setSelectedBattery(null);
  };

  const handleCancelUsage = () => {
    setShowUsageForm(false);
    setSelectedDrone(null);
    setSelectedBattery(null);
  };

  const handleUpdateDrone = (updatedDrone) => {
    setDrones(drones.map(drone => 
      drone.id === updatedDrone.id ? updatedDrone : drone
    ));
  };

  const handleDeleteDrone = (droneId) => {
    setDrones(drones.filter(drone => drone.id !== droneId));
  };

  const handleUpdateBattery = (updatedBattery) => {
    // 确保电量百分比根据电压自动计算
    const calculatedLevel = Math.min(Math.max(Math.round((updatedBattery.voltage / 4.2) * 100), 0), 100);
    const batteryWithCalculatedLevel = {
      ...updatedBattery,
      level: calculatedLevel
    };
    
    setBatteries(batteries.map(battery => 
      battery.id === updatedBattery.id ? batteryWithCalculatedLevel : battery
    ));
  };

  const handleDeleteBattery = (batteryId) => {
    setBatteries(batteries.filter(battery => battery.id !== batteryId));
  };

  const handleAddDrone = () => {
    const newDrone = {
      id: Date.now(),
      name: `Crazyflie-${String(drones.length + 1).padStart(2, '0')}`,
      model: 'Crazyflie 2.1',
      status: '可用',
      batteryLevel: 100,
      payload: '无'
    };
    setDrones([...drones, newDrone]);
    setShowAddDrone(false);
  };

  const handleAddBattery = () => {
    const newBattery = {
      id: Date.now(),
      name: `BAT-${String(batteries.length + 1).padStart(3, '0')}`,
      model: '3v250mh',
      status: '可用',
      level: 100,
      voltage: 12.6,
      lastCharge: new Date().toISOString().split('T')[0],
      capacity: 250
    };
    setBatteries([...batteries, newBattery]);
    setShowAddBattery(false);
  };

  const tabs = [
    { id: 'drones', label: '无人机管理', icon: 'https://s3plus.meituan.net/nocode-external/nocode_image/default/uav-p38zcww7epqgtdkk1bwrnw4kjrmkgz.png' },
    { id: 'batteries', label: '电池管理', icon: Battery },
    { id: 'records', label: '使用记录', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">无人机使用登记系统</h1>
          <p className="text-gray-600">管理您的无人机和电池，记录使用情况</p>
        </div>

        {/* 标签页导航 */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {typeof Icon === 'string' ? (
                      <img 
                        src={Icon} 
                        alt="无人机图标" 
                        className="h-4 w-4 object-contain"
                      />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 内容区域 */}
        {showUsageForm ? (
          <UsageForm
            selectedDrone={selectedDrone}
            selectedBattery={selectedBattery}
            onSubmit={handleUsageSubmit}
            onCancel={handleCancelUsage}
          />
        ) : (
          <div>
            {activeTab === 'drones' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">无人机列表</h2>
                  <div className="flex space-x-4">
                    <div className="text-sm text-gray-600">
                      点击选择无人机进行使用登记
                    </div>
                    <button
                      onClick={handleAddDrone}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>添加无人机</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drones.map((drone) => (
                    <DroneCard
                      key={drone.id}
                      drone={drone}
                      onSelect={handleDroneSelect}
                      onUpdate={handleUpdateDrone}
                      onDelete={handleDeleteDrone}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'batteries' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">电池列表</h2>
                  <div className="flex space-x-4">
                    <div className="text-sm text-gray-600">
                      点击选择电池进行使用登记
                    </div>
                    <button
                      onClick={handleAddBattery}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>添加电池</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {batteries.map((battery) => (
                    <BatteryCard
                      key={battery.id}
                      battery={battery}
                      onSelect={handleBatterySelect}
                      onUpdate={handleUpdateBattery}
                      onDelete={handleDeleteBattery}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <UsageRecords records={usageRecords} />
            )}
          </div>
        )}

        {/* 选中状态提示 */}
        {(selectedDrone || selectedBattery) && !showUsageForm && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>
                已选择: {selectedDrone && selectedBattery ? '无人机和电池' : 
                       selectedDrone ? '无人机' : '电池'}
              </span>
            </div>
            <div className="text-sm mt-1">
              {selectedDrone && !selectedBattery && '请选择电池'}
              {selectedBattery && !selectedDrone && '请选择无人机'}
              {selectedDrone && selectedBattery && '点击任意设备开始登记'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
