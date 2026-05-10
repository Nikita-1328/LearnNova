import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import DashboardBreadcrumbs from "../../../Common/DashboardBreadcrumbs"
import IconBtn from "../../../Common/IconBtn"
import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import GetAvgRating from "../../../../utils/avgRating"

export default function Checkout() {
  const { cart, total } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (user) {
      setFullName(
        [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
      )
      setEmail(user.email || "")
    }
  }, [user])

  useEffect(() => {
    if (!cart?.length) {
      navigate("/dashboard/wishlist", { replace: true })
    }
  }, [cart, navigate])

  const handlePay = () => {
    if (!fullName.trim() || !email.trim()) {
      return
    }
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch, {
      fullName: fullName.trim(),
      email: email.trim(),
    })
  }

  if (paymentLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Wishlist", to: "/dashboard/wishlist" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-semibold text-richblack-5">
        Checkout
      </h1>
      <p className="mb-10 text-richblack-300">
        Review your order and complete payment.
      </p>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-4">
          <h2 className="text-lg font-semibold text-richblack-5">
            Order summary
          </h2>
          {cart.map((course) => {
            const avg = GetAvgRating(course?.ratingAndReviews)
            const instructor = course?.instructor
            const instructorName = instructor
              ? `${instructor.firstName} ${instructor.lastName}`
              : "Instructor"
            return (
              <div
                key={course._id}
                className="flex flex-col gap-4 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:flex-row sm:items-start"
              >
                <img
                  src={course?.thumbnail}
                  alt=""
                  className="h-28 w-full rounded-lg object-cover sm:h-24 sm:w-40"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-richblack-5">
                    {course?.courseName}
                  </p>
                  <p className="mt-1 text-sm text-richblack-400">
                    {instructorName}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-yellow-50">{avg || 0}</span>
                    <ReactStars
                      count={5}
                      value={avg}
                      size={18}
                      edit={false}
                      activeColor="#FFD60A"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                    <span className="text-sm text-richblack-400">
                      {course?.ratingAndReviews?.length ?? 0} Ratings
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-yellow-50 sm:text-right">
                  Rs. {course?.price}
                </p>
              </div>
            )
          })}
        </div>

        <div className="w-full shrink-0 rounded-xl border border-richblack-700 bg-richblack-800 p-6 lg:max-w-md lg:sticky lg:top-4">
          <h2 className="text-lg font-semibold text-richblack-5">
            Payment details
          </h2>
          <p className="mt-2 text-sm text-richblack-300">
            Enter the details you want on the receipt. Razorpay will open next.
          </p>

          <label className="mt-6 block">
            <span className="mb-1 block text-sm text-richblack-300">
              Full name
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-style w-full"
              placeholder="Your full name"
              required
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm text-richblack-300">
              Email ID
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-style w-full"
              placeholder="you@example.com"
              required
            />
          </label>

          <div className="mt-6 border-t border-richblack-700 pt-4">
            <p className="text-sm text-richblack-300">Total</p>
            <p className="mt-1 text-2xl font-semibold text-yellow-50">
              Rs. {total}
            </p>
          </div>

          <IconBtn
            type="button"
            text={`Pay Rs. ${total}`}
            disabled={!fullName.trim() || !email.trim()}
            onclick={handlePay}
            customClasses="mt-6 w-full justify-center py-3"
          />
        </div>
      </div>
    </>
  )
}
