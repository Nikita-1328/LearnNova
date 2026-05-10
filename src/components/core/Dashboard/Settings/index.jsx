import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DashboardBreadcrumbs from "../../../Common/DashboardBreadcrumbs"

export default function Settings() {
  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/my-profile" },
          { label: "Settings" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-richblack-5">Settings</h1>
      <p className="mb-10 text-richblack-300">
        Update your profile, password, or account preferences.
      </p>
      <ChangeProfilePicture />
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </>
  )
}
