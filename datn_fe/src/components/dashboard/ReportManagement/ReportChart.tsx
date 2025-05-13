"use client";

import { ApiResponse } from '@/types/api-responses';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

// Modified interface for Recharts format
interface RechartsData {
  name: string;
  [key: string]: string | number;
}

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

export interface ReportChartProps {
  type: ChartType;
  title: string;
  endpoint?: string;
  staticData?: ChartData;
  height?: number;
  className?: string;
  dateRange?: { start: string; end: string };
  filterKey?: string;
  filterValue?: string | number;
  refreshTrigger?: number;
}

export default function ReportChart({
  type,
  title,
  endpoint,
  staticData,
  height = 300,
  className = '',
  dateRange,
  filterKey,
  filterValue,
  refreshTrigger = 0
}: ReportChartProps) {
  const [data, setData] = useState<RechartsData[] | null>(null);
  const [originalData, setOriginalData] = useState<ChartData | null>(staticData || null);
  const [loading, setLoading] = useState<boolean>(!!endpoint);
  const [error, setError] = useState<string | null>(null);

  // Default colors for charts
  const COLORS = [
    '#3498db', '#f44336', '#ff9800', '#4caf50', '#9c27b0',
    '#2196f3', '#e91e63', '#cddc39', '#00bcd4', '#ff5722'
  ];

  useEffect(() => {
    if (endpoint) {
      setLoading(true);
      setError(null);

      let url = endpoint;
      const params = new URLSearchParams();
      
      if (dateRange) {
        params.append('startDate', dateRange.start);
        params.append('endDate', dateRange.end);
      }
      
      if (filterKey && filterValue !== undefined) {
        params.append(filterKey, filterValue.toString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      axios.get<ApiResponse<ChartData>>(url)
        .then(response => {
          if (response.data.success && response.data.data) {
            setOriginalData(response.data.data);
            // Convert Chart.js data format to Recharts format
            const rechartsData = convertToRechartsFormat(response.data.data);
            setData(rechartsData);
          } else {
            setError(response.data.message || 'Không thể tải dữ liệu biểu đồ');
          }
        })
        .catch(err => {
          console.error('Lỗi khi tải dữ liệu biểu đồ:', err);
          setError('Không thể tải dữ liệu biểu đồ');
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (staticData) {
      setData(convertToRechartsFormat(staticData));
    }
  }, [endpoint, dateRange, filterKey, filterValue, refreshTrigger, staticData]);

  // Convert Chart.js data format to Recharts format
  const convertToRechartsFormat = (chartJsData: ChartData): RechartsData[] => {
    const { labels, datasets } = chartJsData;
    
    return labels.map((label, index) => {
      const item: RechartsData = { name: label };
      
      datasets.forEach(dataset => {
        item[dataset.label] = dataset.data[index];
      });
      
      return item;
    });
  };

  const renderChart = () => {
    if (!data || !originalData) {
      return <div className="text-gray-400 flex h-full justify-center items-center">Không có dữ liệu</div>;
    }

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {originalData.datasets.map((dataset, index) => (
                <Line 
                  key={dataset.label}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={dataset.borderColor as string || COLORS[index % COLORS.length]}
                  fill={dataset.backgroundColor as string || "transparent"}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {originalData.datasets.map((dataset, index) => (
                <Bar 
                  key={dataset.label}
                  dataKey={dataset.label}
                  fill={
                    Array.isArray(dataset.backgroundColor)
                      ? dataset.backgroundColor[index % dataset.backgroundColor.length]
                      : dataset.backgroundColor || COLORS[index % COLORS.length]
                  }
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
      case 'doughnut':
        // For pie/doughnut charts, data format needs special handling
        const pieData = originalData.labels.map((label, index) => ({
          name: label,
          value: originalData.datasets[0].data[index]
        }));
        
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={type === 'doughnut' ? 80 : 100}
                innerRadius={type === 'doughnut' ? 60 : 0}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      Array.isArray(originalData.datasets[0].backgroundColor)
                        ? originalData.datasets[0].backgroundColor[index % originalData.datasets[0].backgroundColor.length]
                        : COLORS[index % COLORS.length]
                    } 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              {originalData.datasets.map((dataset, index) => (
                <Radar 
                  key={dataset.label}
                  name={dataset.label}
                  dataKey={dataset.label}
                  stroke={dataset.borderColor as string || COLORS[index % COLORS.length]}
                  fill={dataset.backgroundColor as string || COLORS[index % COLORS.length]}
                  fillOpacity={0.6}
                />
              ))}
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="text-gray-400">Loại biểu đồ không được hỗ trợ</div>;
    }
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${className}`} style={{ height: `${height}px` }}>
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse text-gray-400">Đang tải dữ liệu biểu đồ...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${className}`} style={{ height: `${height}px` }}>
        <div className="flex justify-center items-center h-full">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${className}`}>
      {title && <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">{title}</h3>}
      <div style={{ height: height, width: '100%' }}>
        {renderChart()}
      </div>
    </div>
  );
}
