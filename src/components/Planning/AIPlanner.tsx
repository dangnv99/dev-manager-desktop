import React, { useState } from "react";
import { useTaskManager } from "../../contexts/TaskManagerContext";
import {
  Brain,
  Zap,
  CheckCircle,
  RefreshCw,
  Sparkles,
  Bug,
  LayoutDashboard,
  FileText,
  Eye,
  Wrench,
} from "lucide-react";

// Gọi API thật lấy suggestion AI
const fetchAiSuggestions = async (tasks) => {
  const response = await fetch(
    "https://de666aa7b3e5.ngrok-free.app/api/chat/v4",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks }),
    }
  );
  if (!response.ok) throw new Error("API request failed");
  return await response.json();
};

const AIPlanner = () => {
  const { state } = useTaskManager();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const generateAIplan = async () => {
    setIsGenerating(true);
    try {
      const suggestions = await fetchAiSuggestions(state.tasks);
      setAiSuggestions(suggestions);
    } catch (err) {
      setAiSuggestions([]);
      alert("Có lỗi khi lấy đề xuất AI. Vui lòng thử lại!");
    } finally {
      setIsGenerating(false);
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case "ui":
        return <LayoutDashboard className="w-5 h-5" />;
      case "feature":
        return <FileText className="w-5 h-5" />;
      case "bug":
        return <Bug className="w-5 h-5" />;
      case "review":
        return <Eye className="w-5 h-5" />;
      case "refactor":
        return <Wrench className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`rounded-xl transition-colors duration-300 ${
        state.theme === "dark"
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      <div className="p-6 border-b border-current border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Planning Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phân tích thông minh và đề xuất tối ưu cho dev team
              </p>
            </div>
          </div>

          <button
            onClick={generateAIplan}
            disabled={isGenerating}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isGenerating
                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Đang phân tích...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Tạo kế hoạch AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        {aiSuggestions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-purple-500" />
            </div>
            <h4 className="text-lg font-medium mb-2">
              Sẵn sàng tối ưu hóa kế hoạch dev
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI sẽ phân tích {state.tasks.length} task của bạn và đưa ra các đề
              xuất thông minh sát thực tế phát triển phần mềm.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Phát triển UI/UX</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Phát triển chức năng</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Fix bug, review, refactor</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {aiSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border transition-colors duration-200 ${
                  state.theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${getImpactColor(
                      suggestion.impact
                    )}`}
                  >
                    {getSuggestionIcon(suggestion.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                          suggestion.impact
                        )}`}
                      >
                        Impact: {suggestion.impact}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {suggestion.description}
                    </p>

                    <div className="text-xs text-gray-500 mb-3">
                      <strong>Lý do:</strong> {suggestion.reasoning}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        💡 {suggestion.action}
                      </span>

                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors duration-200">
                          Áp dụng
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                          Bỏ qua
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
