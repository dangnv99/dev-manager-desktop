import React, { useState } from "react";
import { useTaskManager } from "../../contexts/TaskManagerContext";
import axios from "axios";
import {
  Brain,
  BookOpen,
  ExternalLink,
  Star,
  Clock,
  RefreshCw,
  Lightbulb,
  Video,
  FileText,
  Globe,
} from "lucide-react";

// List câu hỏi để random mỗi lần gọi API
const questions = [
  "Thiết lập xác thực dựa trên JWT với refresh token",
  "Menu trên mobile không đóng khi click bên ngoài",
  "Refactor các query và thêm index để cải thiện tốc độ",
  "Tìm hiểu và đánh giá khả năng áp dụng GraphQL",
  "Cách xuất file PDF ở phía frontend",
  "Thực tiễn tốt nhất khi review code",
];

function getRandomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

const AILearningRecommendations: React.FC = () => {
  const { state } = useTaskManager();
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");

  const generateRecommendations = async () => {
    setIsGenerating(true);
    setError(null);
    setRecommendations([]);
    try {
      const question = getRandomQuestion();
      setCurrentQuestion(question);
      const url = `https://de666aa7b3e5.ngrok-free.app/api/chat/v3?question=${encodeURIComponent(
        question
      )}`;
      const res = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "1" },
      });

      if (
        typeof res.data === "string" &&
        res.data.trim().startsWith("<!DOCTYPE html")
      ) {
        setError(
          "API trả về không phải JSON. Có thể ngrok hết hạn, bị CORS, hoặc server trả về lỗi:\n\n" +
            res.data.substring(0, 400)
        );
        return;
      }
      setRecommendations(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err: any) {
      if (err.response && typeof err.response.data === "string") {
        setError("API trả về lỗi:\n\n" + err.response.data.substring(0, 400));
      } else {
        setError(
          "Có lỗi khi gọi API: " +
            (err.message ||
              "Không kết nối được hoặc lỗi không xác định (có thể ngrok hoặc backend đã tắt).")
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <Video className="w-4 h-4" />;
      case "article":
        return <FileText className="w-4 h-4" />;
      case "tutorial":
        return <BookOpen className="w-4 h-4" />;
      case "book":
        return <Globe className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "Advanced":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
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
            <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Học tập</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đề xuất tài liệu phù hợp với task của bạn
              </p>
            </div>
          </div>

          <button
            onClick={generateRecommendations}
            disabled={isGenerating}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isGenerating
                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Phân tích...</span>
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4" />
                <span>Tìm tài liệu</span>
              </>
            )}
          </button>
        </div>
        {isGenerating && (
          <div className="text-xs text-gray-500 mt-3 italic">
            <span className="font-medium">
              Đang phân tích các task của bạn để gợi ý kiến thức nên học...{" "}
            </span>
            <span className="text-blue-700 dark:text-blue-300"></span>
          </div>
        )}
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 text-red-500 font-medium whitespace-pre-line">
            {error}
          </div>
        )}
        {recommendations.length === 0 && !isGenerating && !error ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-green-500" />
            </div>
            <h4 className="text-lg font-medium mb-2">
              Sẵn sàng tìm tài liệu học tập
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI sẽ phân tích task và kỹ năng hiện tại để đề xuất tài liệu học
              tập phù hợp nhất.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-blue-500" />
                <span>Khóa học</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-green-500" />
                <span>Bài viết</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <span>Tutorial</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-200 overflow-y-auto">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-md ${
                  state.theme === "dark"
                    ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={rec.thumbnail}
                    alt={rec.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getTypeIcon(rec.type)}
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <a
                        href={rec.url}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="flex items-center space-x-3 mb-2 text-xs text-gray-500">
                      <span>{rec.provider}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${getDifficultyColor(
                          rec.difficulty
                        )}`}
                      >
                        {rec.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{rec.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{rec.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      💡 {rec.reason}
                    </p>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        Kỹ năng liên quan:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
                          {rec.skills}
                        </span>
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

export default AILearningRecommendations;
