import { useSelector } from "react-redux"

import DashboardBreadcrumbs from "../../../Common/DashboardBreadcrumbs"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/my-profile" },
          { label: "Wishlist" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-semibold text-richblack-5">
        My Wishlist
      </h1>
      <p className="mb-8 border-b border-richblack-700 pb-4 text-richblack-300">
        {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Wishlist
      </p>
      {total > 0 ? (
        <div className="flex flex-col-reverse items-start gap-x-10 gap-y-8 lg:flex-row lg:items-start">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-16 rounded-xl border border-richblack-700 bg-richblack-800 py-20 text-center">
          <p className="text-xl text-richblack-100">Your wishlist is empty</p>
          <p className="mt-2 text-richblack-400">
            Add courses from the catalog to see them here.
          </p>
        </div>
      )}
    </>
  )
}
