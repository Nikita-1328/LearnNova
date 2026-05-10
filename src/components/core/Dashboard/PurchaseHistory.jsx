import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import DashboardBreadcrumbs from "../../Common/DashboardBreadcrumbs"
import { formatDate } from "../../../services/formatDate"
import { getPurchaseHistory } from "../../../services/operations/profileAPI"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await getPurchaseHistory(token)
      if (!cancelled) setRows(data)
    })()
    return () => {
      cancelled = true
    }
  }, [token])

  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/my-profile" },
          { label: "Purchase History" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-semibold text-richblack-5">
        Purchase History
      </h1>
      <p className="mb-8 text-richblack-300">
        Courses you have paid for through Razorpay (new purchases appear after
        successful payment).
      </p>

      {rows === null ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 py-16 text-center text-richblack-100">
          No purchases yet. Browse{" "}
          <Link
            to="/dashboard/courses"
            className="text-yellow-50 underline hover:text-yellow-25"
          >
            Courses
          </Link>{" "}
          to enroll.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-richblack-700">
          <table className="w-full min-w-[640px] text-left text-richblack-5">
            <thead className="bg-richblack-700 text-sm text-richblack-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Payment ID</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const course = p.courseId
                const title = course?.courseName || "Course removed"
                return (
                  <tr
                    key={`${p.paymentId}-${p.orderId}-${i}`}
                    className="border-t border-richblack-700 bg-richblack-800"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {course?.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="h-12 w-16 rounded-md object-cover"
                          />
                        )}
                        <div>
                          {course?._id ? (
                            <Link
                              to={`/courses/${course._id}`}
                              className="font-medium text-yellow-50 hover:underline"
                            >
                              {title}
                            </Link>
                          ) : (
                            <span>{title}</span>
                          )}
                          {course?.instructor && (
                            <p className="text-xs text-richblack-400">
                              {course.instructor.firstName}{" "}
                              {course.instructor.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">Rs. {p.amount}</td>
                    <td className="max-w-[140px] truncate px-4 py-4 text-sm text-richblack-200">
                      {p.orderId || "—"}
                    </td>
                    <td className="max-w-[140px] truncate px-4 py-4 text-sm text-richblack-200">
                      {p.paymentId || "—"}
                    </td>
                    <td className="px-4 py-4 text-sm text-richblack-200">
                      {p.purchasedAt
                        ? formatDate(p.purchasedAt)
                        : "—"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
