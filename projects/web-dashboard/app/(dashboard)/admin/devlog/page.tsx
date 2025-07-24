'use client';

import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiTag, FiUser, FiCalendar, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

interface DevLog {
  id: string;
  title: string;
  content: string;
  category: 'feature' | 'bugfix' | 'improvement' | 'refactor' | 'docs';
  status: 'completed' | 'in-progress' | 'planned';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export default function DevLogPage() {
  const [logs, setLogs] = useState<DevLog[]>([
    {
      id: '1',
      title: 'Docker 환경 구축 완료',
      content: '88ERP와 new_88toy 프로젝트에 Docker 개발 환경을 구축했습니다. docker-compose를 통해 웹서버, DB, Redis, 모니터링 서비스를 한번에 실행할 수 있습니다.',
      category: 'feature',
      status: 'completed',
      author: 'Ann',
      createdAt: '2025-07-14',
      updatedAt: '2025-07-14',
      tags: ['Docker', 'DevOps', '환경설정']
    },
    {
      id: '2',
      title: '자동 배포 시스템 구현',
      content: '내부 네트워크 환경을 고려하여 GitHub를 통한 자동 배포 시스템을 구현했습니다. 운영서버가 5분마다 변경사항을 체크하여 자동으로 배포합니다.',
      category: 'feature',
      status: 'completed',
      author: 'Ann',
      createdAt: '2025-07-14',
      updatedAt: '2025-07-14',
      tags: ['배포', '자동화', 'GitHub']
    },
    {
      id: '3',
      title: 'API 500 에러 해결',
      content: '포트 충돌로 인한 API 500 에러를 해결했습니다. 88ERP는 3010 포트, new_88toy는 3001 포트로 변경하여 정상 작동합니다.',
      category: 'bugfix',
      status: 'completed',
      author: 'Ann',
      createdAt: '2025-07-14',
      updatedAt: '2025-07-14',
      tags: ['버그수정', 'API', 'Next.js']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingLog, setEditingLog] = useState<DevLog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'feature' as DevLog['category'],
    status: 'planned' as DevLog['status'],
    tags: [] as string[],
    tagInput: ''
  });

  const [filter, setFilter] = useState({
    category: 'all',
    status: 'all',
    search: ''
  });

  const categoryColors = {
    feature: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <FiPlus /> },
    bugfix: { bg: 'bg-red-100', text: 'text-red-700', icon: <FiAlertCircle /> },
    improvement: { bg: 'bg-green-100', text: 'text-green-700', icon: <FiCheckCircle /> },
    refactor: { bg: 'bg-purple-100', text: 'text-purple-700', icon: <FiEdit2 /> },
    docs: { bg: 'bg-gray-100', text: 'text-gray-700', icon: <FiInfo /> }
  };

  const statusColors = {
    completed: { bg: 'bg-green-100', text: 'text-green-700' },
    'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    planned: { bg: 'bg-gray-100', text: 'text-gray-700' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLog) {
      // 수정
      setLogs(logs.map(log => 
        log.id === editingLog.id 
          ? {
              ...log,
              title: formData.title,
              content: formData.content,
              category: formData.category,
              status: formData.status,
              tags: formData.tags,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : log
      ));
    } else {
      // 새로 추가
      const newLog: DevLog = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        category: formData.category,
        status: formData.status,
        author: 'Ann',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        tags: formData.tags
      };
      setLogs([newLog, ...logs]);
    }
    
    handleCloseModal();
  };

  const handleEdit = (log: DevLog) => {
    setEditingLog(log);
    setFormData({
      title: log.title,
      content: log.content,
      category: log.category,
      status: log.status,
      tags: log.tags,
      tagInput: ''
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 이 개발로그를 삭제하시겠습니까?')) {
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLog(null);
    setFormData({
      title: '',
      content: '',
      category: 'feature',
      status: 'planned',
      tags: [],
      tagInput: ''
    });
  };

  const handleAddTag = () => {
    if (formData.tagInput && !formData.tags.includes(formData.tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const filteredLogs = logs.filter(log => {
    if (filter.category !== 'all' && log.category !== filter.category) return false;
    if (filter.status !== 'all' && log.status !== filter.status) return false;
    if (filter.search && !log.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !log.content.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">개발로그</h1>
          <p className="text-gray-600 mt-1">프로젝트 개발 진행사항을 기록합니다</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" />
          새 로그 작성
        </button>
      </div>

      {/* 필터 */}
      <div className="card">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <select
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="feature">기능 추가</option>
                <option value="bugfix">버그 수정</option>
                <option value="improvement">개선</option>
                <option value="refactor">리팩토링</option>
                <option value="docs">문서화</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체</option>
                <option value="completed">완료</option>
                <option value="in-progress">진행중</option>
                <option value="planned">계획</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input
                type="text"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                placeholder="제목 또는 내용으로 검색..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 개발로그 목록 - 게시판 형태 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성자
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성일
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {filteredLogs.length - index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${categoryColors[log.category].bg} ${categoryColors[log.category].text}`}>
                        {log.category === 'feature' ? '기능 추가' :
                         log.category === 'bugfix' ? '버그 수정' :
                         log.category === 'improvement' ? '개선' :
                         log.category === 'refactor' ? '리팩토링' : '문서화'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {log.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {log.content}
                      </div>
                      {log.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {log.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[log.status].bg} ${statusColors[log.status].text}`}>
                        {log.status === 'completed' ? '완료' :
                         log.status === 'in-progress' ? '진행중' : '계획'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                      {log.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {log.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleEdit(log)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 작성/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      {editingLog ? '개발로그 수정' : '새 개발로그 작성'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          제목 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          내용 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as DevLog['category'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="feature">기능 추가</option>
                            <option value="bugfix">버그 수정</option>
                            <option value="improvement">개선</option>
                            <option value="refactor">리팩토링</option>
                            <option value="docs">문서화</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as DevLog['status'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="planned">계획</option>
                            <option value="in-progress">진행중</option>
                            <option value="completed">완료</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">태그</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={formData.tagInput}
                            onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTag();
                              }
                            }}
                            placeholder="태그를 입력하고 Enter"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            추가
                          </button>
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                              <span key={tag} className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      {editingLog ? '수정' : '작성'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}