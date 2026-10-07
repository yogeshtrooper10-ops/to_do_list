/**
 * Filter and search bar component
 */

import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useTasks } from '@hooks/useTasks';
import { TaskFilterOptions, Priority } from '@types/index';

export const FilterBar: React.FC = () => {
  const { setFilters, clearFilters, categories, filters } = useTasks();
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const handleStatusChange = (status: string) => {
    setFilters({
      ...filters,
      status: status as any,
    });
  };

  const handlePriorityChange = (priority: string) => {
    setFilters({
      ...filters,
      priority: priority as Priority | 'all',
    });
  };

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
        <FiSearch className="text-gray-500 dark:text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearch('')}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <select
            value={filters.priority || 'all'}
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.status || filters.priority || filters.category || filters.searchTerm) && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <FiX size={14} />
          Clear all filters
        </button>
      )}
    </div>
  );
};
