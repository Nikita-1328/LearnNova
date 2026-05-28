import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { VscEllipsis, VscCheck, VscTrash } from "react-icons/vsc"

import pythonThumbnail from "../../../assets/Images/python_thumbnail.png"
import DashboardBreadcrumbs from "../../Common/DashboardBreadcrumbs"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

const MOCK_COURSES = [
  {
    _id: "mock-python-1",
    courseName: "The Complete Python",
    courseDescription: "Start Description",
    thumbnail: pythonThumbnail,
    totalDuration: "2hr 30 mins",
    progressPercentage: 68,
  },
  {
    _id: "mock-python-2",
    courseName: "The Complete Python",
    courseDescription: "Start Description",
    thumbnail: pythonThumbnail,
    totalDuration: "2hr 30 mins",
    progressPercentage: 20,
  },
  {
    _id: "mock-python-3",
    courseName: "The Complete Python",
    courseDescription: "Start Description",
    thumbnail: pythonThumbnail,
    totalDuration: "2hr 30 mins",
    progressPercentage: 85,
  },
  {
    _id: "mock-python-4",
    courseName: "The Complete Python",
    courseDescription: "Start Description",
    thumbnail: pythonThumbnail,
    totalDuration: "2hr 30 mins",
    progressPercentage: 100,
  }
]

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [openMenuId, setOpenMenuId] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token)
        const filterPublishCourse = res ? res.filter((ele) => ele.status !== "Draft") : []
        
        if (filterPublishCourse.length === 0) {
          setEnrolledCourses(MOCK_COURSES)
        } else {
          // Merge user courses with mocks for the complete Figma experience
          setEnrolledCourses([...filterPublishCourse, ...MOCK_COURSES])
        }
      } catch (error) {
        console.log("Could not fetch enrolled courses. Using mock courses fallback.")
        setEnrolledCourses(MOCK_COURSES)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close dropdown menu when clicking anywhere else
  useEffect(() => {
    const handleGlobalClick = () => setOpenMenuId(null)
    window.addEventListener("click", handleGlobalClick)
    return () => window.removeEventListener("click", handleGlobalClick)
  }, [])

  const filteredCourses = enrolledCourses?.filter((course) => {
    if (activeTab === "pending") {
      return (course.progressPercentage || 0) < 100
    }
    if (activeTab === "completed") {
      return (course.progressPercentage || 0) === 100
    }
    return true
  })

  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/my-profile" },
          { label: "Enrolled Courses" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-richblack-5">
        Enrolled Courses
      </h1>
      <p className="mb-6 text-richblack-300">
        Continue learning — open a course to pick up where you left off.
      </p>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-x-2 rounded-full bg-richblack-800 p-1 w-fit border border-richblack-700 shadow-inner">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "all"
              ? "bg-richblack-900 text-richblack-5 border border-richblack-700 shadow-md font-semibold"
              : "text-richblack-400 hover:text-richblack-5"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "pending"
              ? "bg-richblack-900 text-richblack-5 border border-richblack-700 shadow-md font-semibold"
              : "text-richblack-400 hover:text-richblack-5"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "completed"
              ? "bg-richblack-900 text-richblack-5 border border-richblack-700 shadow-md font-semibold"
              : "text-richblack-400 hover:text-richblack-5"
          }`}
        >
          Completed
        </button>
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !filteredCourses.length ? (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 py-20 text-center text-richblack-100 shadow-md">
          {activeTab === "all" && "You have not enrolled in any course yet."}
          {activeTab === "pending" && "You do not have any pending courses."}
          {activeTab === "completed" && "You have not completed any courses yet."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-richblack-700 shadow-lg">
          <div className="flex bg-richblack-700 text-sm font-semibold uppercase tracking-wide text-richblack-100">
            <p className="w-[45%] px-5 py-4">Course Name</p>
            <p className="hidden w-[25%] px-2 py-4 sm:block">Durations</p>
            <p className="flex-1 px-2 py-4">Progress</p>
          </div>
          {filteredCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col border-t border-richblack-700 bg-richblack-800 sm:flex-row sm:items-center ${
                i === arr.length - 1 ? "" : ""
              }`}
              key={course._id}
            >
              <div
                className="flex w-full cursor-pointer gap-4 px-5 py-4 sm:w-[45%]"
                onClick={() => {
                  if (course._id.startsWith("mock-")) {
                    toast.error("This is a mockup course preview.")
                  } else {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }
                }}
              >
                <img
                  src={course.thumbnail}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-lg object-cover ring-1 ring-richblack-700"
                />
                <div className="flex min-w-0 flex-col justify-center gap-1">
                  <p className="font-semibold text-richblack-5 truncate">
                    {course.courseName}
                  </p>
                  <p className="line-clamp-2 text-xs text-richblack-400">
                    {course.courseDescription.length > 80
                      ? `${course.courseDescription.slice(0, 80)}…`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="hidden w-[25%] px-2 py-4 text-sm text-richblack-200 sm:block">
                {course?.totalDuration}
              </div>
              <div className="flex w-full items-center gap-4 px-5 py-4 sm:flex-1 sm:px-2">
                {/* Progress Details */}
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-xs text-richblack-300">
                    {course.progressPercentage === 100 ? (
                      <span className="font-bold text-caribbeangreen-200">Completed</span>
                    ) : (
                      <>
                        Progress:{" "}
                        <span className="font-semibold text-blue-100">
                          {course.progressPercentage || 0}%
                        </span>
                      </>
                    )}
                  </p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    bgColor={course.progressPercentage === 100 ? "#06D6A0" : "#47A5C5"}
                    baseBgColor="#2C333F"
                  />
                </div>

                {/* Vertical Three-dot Menu */}
                <div className="relative shrink-0 mr-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuId(openMenuId === course._id ? null : course._id)
                    }}
                    className="rounded-full p-2 text-richblack-300 transition-colors hover:bg-richblack-700 hover:text-richblack-5"
                    aria-label="Course Options"
                  >
                    <VscEllipsis className="text-xl rotate-90" />
                  </button>

                  {/* Popover actions dropdown */}
                  {openMenuId === course._id && (
                    <div
                      className="absolute right-0 top-full mt-2 z-50 w-44 rounded-lg border border-richblack-700 bg-richblack-900 py-1.5 shadow-xl transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setEnrolledCourses((prev) =>
                            prev.map((c) =>
                              c._id === course._id ? { ...c, progressPercentage: 100 } : c
                            )
                          )
                          setOpenMenuId(null)
                          toast.success(`"${course.courseName}" marked as completed!`)
                        }}
                        disabled={course.progressPercentage === 100}
                        className="flex w-full items-center gap-x-2 px-3 py-2 text-left text-xs font-semibold text-richblack-100 transition-colors hover:bg-richblack-700 hover:text-richblack-5 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <VscCheck className="text-sm shrink-0" />
                        <span>Mark as Completed</span>
                      </button>
                      
                      <div className="my-1 border-t border-richblack-700" />
                      
                      <button
                        onClick={() => {
                          setEnrolledCourses((prev) => prev.filter((c) => c._id !== course._id))
                          setOpenMenuId(null)
                          toast.success(`"${course.courseName}" removed.`)
                        }}
                        className="flex w-full items-center gap-x-2 px-3 py-2 text-left text-xs font-semibold text-pink-200 transition-colors hover:bg-richblack-700 hover:text-pink-50"
                      >
                        <VscTrash className="text-sm shrink-0" />
                        <span>Remove</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
