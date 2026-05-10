import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import DashboardBreadcrumbs from "../../Common/DashboardBreadcrumbs"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/instructor" },
          { label: "Overview" },
        ]}
      />

      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-richblack-5">
          Hi {user?.firstName}{" "}
          <span className="font-normal text-richblack-400">—</span>{" "}
          <span className="text-2xl font-semibold text-richblack-200">
            Instructor
          </span>
        </h1>
        <p className="text-base text-richblack-300">
          Track your courses, students, and revenue at a glance.
        </p>
      </div>

      {loading ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
              <p className="text-sm font-medium text-richblack-400">
                Total courses
              </p>
              <p className="mt-2 text-3xl font-bold text-yellow-50">
                {courses.length}
              </p>
            </div>
            <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
              <p className="text-sm font-medium text-richblack-400">
                Total students
              </p>
              <p className="mt-2 text-3xl font-bold text-yellow-50">
                {totalStudents}
              </p>
            </div>
            <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
              <p className="text-sm font-medium text-richblack-400">
                Total income
              </p>
              <p className="mt-2 text-3xl font-bold text-yellow-50">
                Rs. {totalAmount}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">
            <div className="min-h-[360px] flex-1">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex h-full min-h-[360px] flex-col justify-center rounded-xl border border-richblack-700 bg-richblack-800 p-8">
                  <p className="text-lg font-semibold text-richblack-5">
                    Visualize
                  </p>
                  <p className="mt-3 text-richblack-300">
                    Not enough enrollment data yet. When students join your
                    courses, charts will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-richblack-5">
                  Your courses
                </h2>
                <p className="mt-1 text-sm text-richblack-400">
                  Recently active offerings
                </p>
              </div>
              <Link
                to="/dashboard/my-courses"
                className="text-sm font-semibold text-yellow-50 hover:text-yellow-25"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <Link
                  key={course._id}
                  to={`/dashboard/edit-course/${course._id}`}
                  className="group overflow-hidden rounded-xl border border-richblack-700 bg-richblack-900 transition-colors hover:border-richblack-600"
                >
                  <img
                    src={course.thumbnail}
                    alt=""
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="p-4">
                    <p className="line-clamp-2 font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-richblack-400">
                      <span>{course.studentsEnroled.length} students</span>
                      <span>·</span>
                      <span className="font-medium text-yellow-50">
                        Rs. {course.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 px-6 py-20 text-center">
          <p className="text-xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <p className="mt-2 text-richblack-400">
            Start by publishing your first course.
          </p>
          <Link
            to="/dashboard/add-course"
            className="mt-6 inline-block rounded-md bg-yellow-50 px-6 py-3 text-sm font-bold text-richblack-900 transition hover:bg-yellow-25"
          >
            Create a course
          </Link>
        </div>
      )}
    </div>
  )
}
