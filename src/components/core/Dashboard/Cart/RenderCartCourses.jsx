import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"
import GetAvgRating from "../../../../utils/avgRating"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col gap-4">
      {cart.map((course) => {
        const avg = GetAvgRating(course?.ratingAndReviews)
        const instructor = course?.instructor
        const instructorName = instructor
          ? `${instructor.firstName} ${instructor.lastName}`
          : "Instructor"
        const levelLabel = course?.category?.name || "All levels"
        return (
          <div
            key={course._id}
            className="flex w-full flex-col gap-4 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-36 w-full shrink-0 rounded-lg object-cover md:h-[148px] md:w-[220px]"
              />
              <div className="flex min-w-0 flex-col justify-center space-y-2">
                <p className="text-lg font-semibold text-richblack-5">
                  {course?.courseName}
                </p>
                <p className="text-sm text-richblack-300">{instructorName}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-yellow-50">{avg || 0}</span>
                  <ReactStars
                    count={5}
                    value={avg}
                    size={20}
                    edit={false}
                    activeColor="#FFD60A"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                  <span className="text-sm text-richblack-400">
                    {course?.ratingAndReviews?.length ?? 0} Ratings
                  </span>
                  <span className="text-sm text-richblack-500">·</span>
                  <span className="text-sm text-richblack-400">{levelLabel}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
              <button
                type="button"
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-2 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm font-medium text-pink-200 transition-colors hover:bg-richblack-600"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <p className="text-2xl font-semibold text-yellow-50">
                Rs. {course?.price}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
