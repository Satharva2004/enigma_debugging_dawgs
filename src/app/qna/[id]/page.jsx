'use client'
 
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Clock,
  User,
  Tag,
  CheckCircle,
  Reply,
  Flag,
  Edit,
  Trash2,
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  getQuestionById,
  voteQuestion,
  markQuestionResolved,
  getAnswersByQuestion,
  createAnswer,
  voteAnswer,
  markAnswerHelpful
} from '@/services/qnaServices'
import useAuth from '@/hooks/useAuth'
 
const QuestionDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [expandedReplies, setExpandedReplies] = useState({})
 
  useEffect(() => {
    fetchQuestion()
    fetchAnswers()
  }, [id])
 
  const fetchQuestion = async () => {
    try {
      const response = await getQuestionById(id)
      setQuestion(response.data)
    } catch (error) {
      console.error('Error fetching question:', error)
    }
  }
 
  const fetchAnswers = async () => {
    try {
      const response = await getAnswersByQuestion(id)
      setAnswers(response.data.answers)
    } catch (error) {
      console.error('Error fetching answers:', error)
    } finally {
      setLoading(false)
    }
  }
 
  const handleVoteQuestion = async (voteType) => {
    if (!user) {
      alert('Please login to vote')
      return
    }
 
    try {
      const response = await voteQuestion(id, voteType)
      setQuestion(prev => ({
        ...prev,
        voteCount: response.data.voteCount,
        upvotes: response.data.upvotes,
        downvotes: response.data.downvotes
      }))
    } catch (error) {
      console.error('Error voting on question:', error)
    }
  }
 
  const handleVoteAnswer = async (answerId, voteType) => {
    if (!user) {
      alert('Please login to vote')
      return
    }
 
    try {
      const response = await voteAnswer(answerId, voteType)
      setAnswers(answers.map(answer =>
        answer._id === answerId
          ? { ...answer, voteCount: response.data.voteCount, upvotes: response.data.upvotes, downvotes: response.data.downvotes }
          : answer
      ))
    } catch (error) {
      console.error('Error voting on answer:', error)
    }
  }
 
  const handleSubmitReply = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to reply')
      return
    }
 
    try {
      const answerData = {
        content: replyContent,
        questionId: id,
        parentAnswerId: replyingTo
      }
      
      await createAnswer(answerData)
      setReplyContent('')
      setReplyingTo(null)
      setShowReplyForm(false)
      fetchAnswers()
    } catch (error) {
      console.error('Error creating answer:', error)
    }
  }
 
  const handleMarkResolved = async (answerId) => {
    if (!user || question.author._id !== user.id) {
      alert('Only the question author can mark it as resolved')
      return
    }
 
    try {
      await markQuestionResolved(id, answerId)
      setQuestion(prev => ({ ...prev, isResolved: true, acceptedAnswer: answerId }))
      setAnswers(answers.map(answer =>
        answer._id === answerId
          ? { ...answer, isAccepted: true }
          : { ...answer, isAccepted: false }
      ))
    } catch (error) {
      console.error('Error marking question as resolved:', error)
    }
  }
 
  const handleMarkHelpful = async (answerId) => {
    if (!user) {
      alert('Please login to mark answers as helpful')
      return
    }
 
    try {
      await markAnswerHelpful(answerId)
      setAnswers(answers.map(answer =>
        answer._id === answerId
          ? { ...answer, isHelpful: !answer.isHelpful }
          : answer
      ))
    } catch (error) {
      console.error('Error marking answer as helpful:', error)
    }
  }
 
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }
 
  const toggleReplies = (answerId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [answerId]: !prev[answerId]
    }))
  }
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
 
  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Question not found</h1>
          <Link href="/qna" className="text-blue-600 hover:text-blue-700">
            ← Back to Q&A
          </Link>
        </div>
      </div>
    )
  }
 
  const AnswerCard = ({ answer, isReply = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 ${isReply ? 'ml-8 mt-4' : 'mb-4'}`}
    >
      <div className="flex gap-4">
        {/* Vote section */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleVoteAnswer(answer._id, 'upvote')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ThumbsUp className={`h-5 w-5 ${answer.upvotes?.includes(user?.id) ? 'text-green-500' : 'text-gray-400'}`} />
          </button>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {answer.voteCount || 0}
          </span>
          <button
            onClick={() => handleVoteAnswer(answer._id, 'downvote')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ThumbsDown className={`h-5 w-5 ${answer.downvotes?.includes(user?.id) ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
 
        {/* Answer content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {answer.author?.name || 'Anonymous'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{formatDate(answer.createdAt)}</span>
              </div>
              {answer.isAccepted && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Accepted
                </span>
              )}
              {answer.isHelpful && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  Helpful
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {!isReply && (
                <button
                  onClick={() => handleMarkHelpful(answer._id)}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Mark as helpful
                </button>
              )}
              {!isReply && question.author._id === user?.id && !question.isResolved && (
                <button
                  onClick={() => handleMarkResolved(answer._id)}
                  className="text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  Accept answer
                </button>
              )}
            </div>
          </div>
 
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {answer.content}
            </p>
          </div>
 
          {/* Reply button */}
          {!isReply && (
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => {
                  setReplyingTo(answer._id)
                  setShowReplyForm(true)
                }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Reply className="h-4 w-4" />
                Reply
              </button>
              
              {answer.replies && answer.replies.length > 0 && (
                <button
                  onClick={() => toggleReplies(answer._id)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {expandedReplies[answer._id] ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide {answer.replies.length} replies
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show {answer.replies.length} replies
                    </>
                  )}
                </button>
              )}
            </div>
          )}
 
          {/* Nested replies */}
          {isReply === false && answer.replies && expandedReplies[answer._id] && (
            <div className="mt-4 space-y-4">
              {answer.replies.map((reply) => (
                <AnswerCard key={reply._id} answer={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/qna"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Q&A
          </Link>
        </div>
      </div>
 
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"
        >
          <div className="flex gap-4">
            {/* Vote section */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleVoteQuestion('upvote')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ThumbsUp className={`h-6 w-6 ${question.upvotes?.includes(user?.id) ? 'text-green-500' : 'text-gray-400'}`} />
              </button>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {question.voteCount || 0}
              </span>
              <button
                onClick={() => handleVoteQuestion('downvote')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ThumbsDown className={`h-6 w-6 ${question.downvotes?.includes(user?.id) ? 'text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
 
            {/* Question content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {question.title}
                </h1>
                {question.isResolved && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Resolved
                  </span>
                )}
              </div>
 
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {question.content}
                </p>
              </div>
 
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
 
              {/* Meta information */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{question.author?.name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(question.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{question.views || 0} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{question.replyCount || 0} answers</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {question.category}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
 
        {/* Answers */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {answers.length} Answer{answers.length !== 1 ? 's' : ''}
            </h2>
            <button
              onClick={() => setShowReplyForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Reply className="h-4 w-4" />
              Answer Question
            </button>
          </div>
 
          {answers.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No answers yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Be the first to answer this question!
              </p>
              <button
                onClick={() => setShowReplyForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Answer Question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <AnswerCard key={answer._id} answer={answer} />
              ))}
            </div>
          )}
        </div>
 
        {/* Reply Form Modal */}
        {showReplyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {replyingTo ? 'Reply to Answer' : 'Answer Question'}
                </h3>
                <button
                  onClick={() => {
                    setShowReplyForm(false)
                    setReplyingTo(null)
                    setReplyContent('')
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
 
              <form onSubmit={handleSubmitReply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Answer *
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
 
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReplyForm(false)
                      setReplyingTo(null)
                      setReplyContent('')
                    }}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {replyingTo ? 'Reply' : 'Answer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
 
export default QuestionDetailPage