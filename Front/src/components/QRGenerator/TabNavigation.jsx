import React from 'react';
import { Link, MessageSquare, User } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'url', label: 'URL', icon: Link },
        { id: 'text', label: 'Texto', icon: MessageSquare },
        { id: 'contact', label: 'Contacto', icon: User },
    ];

    return (
        <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200
                ${isActive
                                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default TabNavigation;
