import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import DashboardBreadcrumbs from "../../Common/DashboardBreadcrumbs"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/my-profile" },
          { label: "My Profile" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-richblack-5">My Profile</h1>
      <p className="mb-10 text-richblack-300">
        Your account details and public profile information.
      </p>

      <div className="flex flex-col justify-between gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-6 sm:flex-row sm:items-center sm:px-10 sm:py-8">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square h-[88px] w-[88px] rounded-full object-cover ring-2 ring-richblack-600"
          />
          <div className="space-y-1">
            <p className="text-xl font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
          customClasses="shrink-0"
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-8 flex flex-col gap-y-8 rounded-xl border border-richblack-700 bg-richblack-800 p-6 sm:px-10 sm:py-8">
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-lg font-semibold text-richblack-5">About</h2>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            outline
            customClasses="shrink-0"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`text-sm font-medium leading-relaxed ${
            user?.additionalDetails?.about
              ? "text-richblack-25"
              : "text-richblack-400"
          }`}
        >
          {user?.additionalDetails?.about ?? "Write something about yourself."}
        </p>
      </div>

      <div className="flex flex-col gap-y-8 rounded-xl border border-richblack-700 bg-richblack-800 p-6 sm:px-10 sm:py-8">
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-lg font-semibold text-richblack-5">
            Personal details
          </h2>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            outline
            customClasses="shrink-0"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[640px] flex-col justify-between gap-8 sm:flex-row">
          <div className="flex flex-1 flex-col gap-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-richblack-500">
                First name
              </p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-richblack-500">
                Email
              </p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-richblack-500">
                Gender
              </p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-richblack-500">
                Last name
              </p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-richblack-500">
                Phone
              </p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "—"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-richblack-500">
                Date of birth
              </p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.dateOfBirth
                  ? formattedDate(user.additionalDetails.dateOfBirth)
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
