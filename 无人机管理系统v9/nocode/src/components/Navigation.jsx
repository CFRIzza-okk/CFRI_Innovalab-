import React from 'react';
import { Battery, ClipboardList } from 'lucide-react'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="https://s3plus.meituan.net/nocode-external/nocode_image/default/uav-p38zcww7epqgtdkk1bwrnw4kjrmkgz.png" 
              alt="无人机图标" 
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-xl font-bold text-gray-800">无人机管理系统</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Battery className="h-5 w-5" />
              <span className="text-sm">电池管理</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ClipboardList className="h-5 w-5" />
              <span className="text-sm">使用登记</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
