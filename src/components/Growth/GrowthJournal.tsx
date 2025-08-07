import React, { useState } from 'react';
import { useTaskManager } from '../../contexts/TaskManagerContext';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Calendar,
  Star,
  TrendingUp,
  Brain,
  Target,
  Award,
  Lightbulb,
  Heart,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
  skills: string[];
  lessons: string[];
  challenges: string[];
  goals: string[];
  rating: number;
}

const GrowthJournal: React.FC = () => {
  const { state } = useTaskManager();
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  
  // Mock journal entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2025-01-17',
      title: 'Hoàn thành Authentication System',
      content: 'Hôm nay tôi đã hoàn thành việc xây dựng hệ thống xác thực JWT. Học được rất nhiều về security best practices và cách implement refresh token. Gặp khó khăn với việc handle token expiration nhưng đã tìm ra giải pháp tốt.',
      mood: 'great',
      skills: ['JWT', 'Security', 'Node.js'],
      lessons: [
        'Luôn validate token ở middleware level',
        'Implement proper error handling cho expired tokens',
        'Sử dụng httpOnly cookies cho refresh tokens'
      ],
      challenges: [
        'Xử lý race condition khi refresh token',
        'Tối ưu hóa performance của middleware'
      ],
      goals: [
        'Tìm hiểu thêm về OAuth 2.0',
        'Implement 2FA trong tuần tới'
      ],
      rating: 5
    },
    {
      id: '2',
      date: '2025-01-16',
      title: 'Nghiên cứu GraphQL',
      content: 'Bắt đầu tìm hiểu về GraphQL để chuẩn bị cho task tiếp theo. Đọc documentation và làm theo tutorial cơ bản. Cảm thấy GraphQL có potential lớn nhưng cần thời gian để master.',
      mood: 'good',
      skills: ['GraphQL', 'API Design'],
      lessons: [
        'GraphQL resolver pattern rất powerful',
        'Schema-first approach có nhiều ưu điểm',
        'Cần careful với N+1 query problem'
      ],
      challenges: [
        'Complex query optimization',
        'Learning curve khá steep'
      ],
      goals: [
        'Build một GraphQL API hoàn chỉnh',
        'Tìm hiểu về DataLoader pattern'
      ],
      rating: 4
    },
    {
      id: '3',
      date: '2025-01-15',
      title: 'Database Performance Tuning',
      content: 'Spent whole day optimizing database queries. Learned about indexing strategies and query execution plans. Performance improved by 60% after adding proper indexes.',
      mood: 'okay',
      skills: ['PostgreSQL', 'Performance', 'SQL'],
      lessons: [
        'EXPLAIN ANALYZE is your best friend',
        'Composite indexes can be tricky',
        'Always measure before and after optimization'
      ],
      challenges: [
        'Complex join optimization',
        'Balancing read vs write performance'
      ],
      goals: [
        'Learn about database partitioning',
        'Study advanced PostgreSQL features'
      ],
      rating: 4
    }
  ]);

  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    mood: 'good',
    skills: [],
    lessons: [''],
    challenges: [''],
    goals: [''],
    rating: 3
  });

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'good':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'okay':
        return <Meh className="w-5 h-5 text-blue-500" />;
      case 'bad':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400';
      case 'good':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'okay':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'bad':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
    }
  };

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: newEntry.date || new Date().toISOString().split('T')[0],
        title: newEntry.title,
        content: newEntry.content,
        mood: newEntry.mood as 'great' | 'good' | 'okay' | 'bad',
        skills: newEntry.skills || [],
        lessons: newEntry.lessons?.filter(l => l.trim()) || [],
        challenges: newEntry.challenges?.filter(c => c.trim()) || [],
        goals: newEntry.goals?.filter(g => g.trim()) || [],
        rating: newEntry.rating || 3
      };
      
      setJournalEntries([entry, ...journalEntries]);
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: '',
        mood: 'good',
        skills: [],
        lessons: [''],
        challenges: [''],
        goals: [''],
        rating: 3
      });
      setIsAddingEntry(false);
    }
  };

  const addListItem = (field: 'lessons' | 'challenges' | 'goals') => {
    setNewEntry({
      ...newEntry,
      [field]: [...(newEntry[field] || []), '']
    });
  };

  const updateListItem = (field: 'lessons' | 'challenges' | 'goals', index: number, value: string) => {
    const items = [...(newEntry[field] || [])];
    items[index] = value;
    setNewEntry({
      ...newEntry,
      [field]: items
    });
  };

  const removeListItem = (field: 'lessons' | 'challenges' | 'goals', index: number) => {
    const items = [...(newEntry[field] || [])];
    items.splice(index, 1);
    setNewEntry({
      ...newEntry,
      [field]: items
    });
  };

  return (
    <div className={`rounded-xl transition-colors duration-300 ${
      state.theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Nhật ký phát triển</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ghi chép hành trình học tập và phát triển bản thân
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddingEntry(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm nhật ký</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Add Entry Form */}
        {isAddingEntry && (
          <div className={`mb-6 p-6 rounded-lg border ${
            state.theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <h4 className="font-medium mb-4">Tạo nhật ký mới</h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ngày</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      state.theme === 'dark'
                        ? 'bg-gray-600 border-gray-500 text-white'
                        : 'bg-white border-gray-200'
                    } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tâm trạng</label>
                  <select
                    value={newEntry.mood}
                    onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value as any })}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      state.theme === 'dark'
                        ? 'bg-gray-600 border-gray-500 text-white'
                        : 'bg-white border-gray-200'
                    } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                  >
                    <option value="great">Tuyệt vời 🌟</option>
                    <option value="good">Tốt 😊</option>
                    <option value="okay">Bình thường 😐</option>
                    <option value="bad">Không tốt 😞</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="VD: Hoàn thành tính năng authentication..."
                  className={`w-full px-3 py-2 rounded-lg border ${
                    state.theme === 'dark'
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 placeholder-gray-500'
                  } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nội dung</label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={4}
                  placeholder="Mô tả chi tiết về những gì bạn đã học được, làm được hôm nay..."
                  className={`w-full px-3 py-2 rounded-lg border ${
                    state.theme === 'dark'
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 placeholder-gray-500'
                  } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Đánh giá ngày (1-5 sao)</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewEntry({ ...newEntry, rating: star })}
                      className="transition-colors duration-200"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (newEntry.rating || 0)
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Lists */}
              {['lessons', 'challenges', 'goals'].map((field) => (
                <div key={field}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      {field === 'lessons' ? '📚 Bài học rút ra' : 
                       field === 'challenges' ? '🎯 Thách thức gặp phải' : 
                       '🚀 Mục tiêu tiếp theo'}
                    </label>
                    <button
                      onClick={() => addListItem(field as any)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm"
                    >
                      + Thêm
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(newEntry[field as keyof typeof newEntry] as string[] || ['']).map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateListItem(field as any, index, e.target.value)}
                          placeholder={`Nhập ${field === 'lessons' ? 'bài học' : field === 'challenges' ? 'thách thức' : 'mục tiêu'}...`}
                          className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                            state.theme === 'dark'
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                              : 'bg-white border-gray-200 placeholder-gray-500'
                          } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                        />
                        {(newEntry[field as keyof typeof newEntry] as string[])?.length > 1 && (
                          <button
                            onClick={() => removeListItem(field as any, index)}
                            className="text-red-600 hover:text-red-700 px-2"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleAddEntry}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Lưu nhật ký
              </button>
              <button
                onClick={() => setIsAddingEntry(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Journal Entries List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {journalEntries.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Chưa có nhật ký nào. Hãy bắt đầu ghi chép hành trình học tập của bạn!</p>
            </div>
          ) : (
            journalEntries.map((entry) => (
              <div
                key={entry.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getMoodColor(entry.mood)}`}>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div>
                      <h4 className="font-medium">{entry.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(entry.date), 'dd/MM/yyyy', { locale: vi })}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-3 h-3 ${
                                index < entry.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {entry.content}
                </p>

                {entry.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {entry.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expanded Content */}
                {selectedEntry?.id === entry.id && (
                  <div className="mt-4 pt-4 border-t border-current border-opacity-10 space-y-4">
                    {entry.lessons.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                          Bài học rút ra
                        </h5>
                        <ul className="space-y-1">
                          {entry.lessons.map((lesson, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.challenges.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-red-500" />
                          Thách thức
                        </h5>
                        <ul className="space-y-1">
                          {entry.challenges.map((challenge, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.goals.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-blue-500" />
                          Mục tiêu tiếp theo
                        </h5>
                        <ul className="space-y-1">
                          {entry.goals.map((goal, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Journal Stats */}
        <div className={`mt-6 p-4 rounded-lg ${
          state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h4 className="font-medium mb-3">Thống kê nhật ký</h4>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-indigo-600">
                {journalEntries.length}
              </div>
              <div className="text-xs text-gray-500">Tổng nhật ký</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {journalEntries.filter(e => e.mood === 'great' || e.mood === 'good').length}
              </div>
              <div className="text-xs text-gray-500">Ngày tích cực</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {Math.round(journalEntries.reduce((acc, entry) => acc + entry.rating, 0) / journalEntries.length * 10) / 10 || 0}
              </div>
              <div className="text-xs text-gray-500">Đánh giá TB</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {journalEntries.reduce((acc, entry) => acc + entry.lessons.length, 0)}
              </div>
              <div className="text-xs text-gray-500">Bài học</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthJournal;