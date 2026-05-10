import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  return (
    <div className="w-full min-w-[280px] shrink-0 rounded-xl border border-richblack-700 bg-richblack-800 p-6 lg:sticky lg:top-4 lg:max-w-sm">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total</p>
      <p className="mb-6 text-3xl font-semibold text-yellow-50">Rs. {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={() => navigate("/dashboard/checkout")}
        customClasses="w-full justify-center py-3 font-bold"
      />
    </div>
  )
}
