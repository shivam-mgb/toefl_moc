import React from 'react';


const AdminPanel = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Left Side Panel - Enhanced Design */}
                <div className="w-64 bg-indigo-700 text-white py-8 px-4 shadow-lg">
                    <div className="mb-10 px-2">
                        <h2 className="text-3xl font-bold text-center tracking-tight">TOEFL Admin</h2>
                        <p className="text-sm text-indigo-200 text-center mt-1">Content Management</p>
                    </div>
                    <nav>
                        <a href="#" className="flex items-center py-3 px-4 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200 group">
                            {/* <HomeIcon className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-300 group-hover:text-white" /> */}
                            <span>Home</span>
                        </a>
                        <a href="#" className="flex items-center py-3 px-4 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200 group">
                            {/* <ViewBoardsIcon className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-300 group-hover:text-white" /> */}
                            <span>Dashboard</span>
                        </a>
                        <a href="#" className="flex items-center py-3 px-4 bg-indigo-800 rounded-md font-semibold text-white group" aria-current="page">
                            {/* <DocumentTextIcon className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-200 group-hover:text-white" /> */}
                            <span>Section Creation</span>
                        </a>
                        <a href="#" className="flex items-center py-3 px-4 text-white hover:bg-indigo-600 rounded-md transition-colors duration-200 group">
                            {/* <PresentationChartBarIcon className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-300 group-hover:text-white" /> */}
                            <span>Test Results</span>
                        </a>
                    </nav>
                </div>

                {/* Main Content Area - Enhanced Cards */}
                <div className="flex-1 p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Test Sections</h1>
                        <p className="text-gray-500 mt-1">Select a section below to create and manage content.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Reading Section Card - Enhanced */}
                        <a href="/admin/section/reading" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-blue-700">Reading Section</div>
                                <p className="text-gray-700 text-base">
                                    Craft compelling reading passages and engaging questions to assess comprehension.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">Manage Content</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Passages & Questions</span>
                            </div>
                        </a>

                        {/* Listening Section Card - Enhanced */}
                        <a href="/admin/section/listening" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-green-700">Listening Section</div>
                                <p className="text-gray-700 text-base">
                                    Upload audio lectures and conversations, design questions to test listening skills.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">Manage Content</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Audio & Questions</span>
                            </div>
                        </a>

                        {/* Speaking Section Card - Enhanced */}
                        <a href="/admin/section/speaking" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-yellow-700">Speaking Section</div>
                                <p className="text-gray-700 text-base">
                                    Define speaking tasks, prompts, and guidelines for effective speaking practice.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <span className="inline-block bg-yellow-100 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">Manage Tasks</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Speaking Prompts</span>
                            </div>
                        </a>

                        {/* Writing Section Card - Enhanced */}
                        <a href="/admin/section/writing" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-red-700">Writing Section</div>
                                <p className="text-gray-700 text-base">
                                    Create writing prompts and instructions for integrated and independent writing tasks.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <span className="inline-block bg-red-100 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">Manage Tasks</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Writing Prompts</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;