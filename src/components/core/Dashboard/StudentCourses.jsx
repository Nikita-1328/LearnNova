import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import DashboardBreadcrumbs from "../../Common/DashboardBreadcrumbs"
import CourseCard from "../Catalog/Course_Card"
import { apiConnector } from "../../../services/apiConnector"
import { courseEndpoints } from "../../../services/apis"

export default function StudentCourses() {
  const { loading } = useSelector((state) => state.profile)
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await apiConnector(
          "GET",
          courseEndpoints.GET_ALL_COURSE_API
        )
        if (!cancelled && response?.data?.success) {
          setCourses(response.data.data || [])
        }
      } catch (e) {
        console.log(e)
        if (!cancelled) setCourses([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/my-profile" },
          { label: "Courses" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-semibold text-richblack-5">Courses</h1>
      <p className="mb-10 text-richblack-300">
        Explore published courses and open a course to buy or add it to your
        wishlist.
      </p>

      {loading || courses === null ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="rounded-xl border border-richblack-700 bg-richblack-800 py-16 text-center text-richblack-100">
          No courses available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              Height="h-[200px]"
            />
          ))}
        </div>
      )}
    </>
  )
}
