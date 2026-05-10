import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import DashboardBreadcrumbs from "../../Common/DashboardBreadcrumbs"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token)
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <p className="mb-10 text-richblack-300">
        Continue learning — open a course to pick up where you left off.
      </p>

      {!enrolledCourses ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 py-20 text-center text-richblack-100">
          You have not enrolled in any course yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-richblack-700">
          <div className="flex bg-richblack-700 text-sm font-semibold uppercase tracking-wide text-richblack-100">
            <p className="w-[45%] px-5 py-4">Course</p>
            <p className="hidden w-1/4 px-2 py-4 sm:block">Duration</p>
            <p className="flex-1 px-2 py-4">Progress</p>
          </div>
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col border-t border-richblack-700 bg-richblack-800 sm:flex-row sm:items-center ${
                i === arr.length - 1 ? "" : ""
              }`}
              key={course._id}
            >
              <div
                className="flex w-full cursor-pointer gap-4 px-5 py-4 sm:w-[45%]"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="flex min-w-0 flex-col justify-center gap-1">
                  <p className="font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="line-clamp-2 text-xs text-richblack-400">
                    {course.courseDescription.length > 80
                      ? `${course.courseDescription.slice(0, 80)}…`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="hidden w-1/4 px-2 py-4 text-sm text-richblack-200 sm:block">
                {course?.totalDuration}
              </div>
              <div className="flex w-full flex-col gap-2 px-5 py-4 sm:flex-1 sm:px-2">
                <p className="text-sm text-richblack-300">
                  Progress:{" "}
                  <span className="font-semibold text-yellow-50">
                    {course.progressPercentage || 0}%
                  </span>
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="#FFD60A"
                  baseBgColor="#2C333F"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
