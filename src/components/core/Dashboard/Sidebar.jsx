import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

function SectionLabel({ children }) {
  return (
    <p className="mb-1 mt-6 px-8 text-[11px] font-bold uppercase tracking-[0.12em] text-richblack-500">
      {children}
    </p>
  )
}

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  const profileLink = sidebarLinks.find((l) => l.id === 1)
  const instructorLinks = sidebarLinks.filter(
    (l) => l.type === ACCOUNT_TYPE.INSTRUCTOR
  )
  const studentLinks = sidebarLinks.filter(
    (l) => l.type === ACCOUNT_TYPE.STUDENT
  )

  const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
  const isStudent = user?.accountType === ACCOUNT_TYPE.STUDENT

  const dashboardHome = isInstructor
    ? "/dashboard/instructor"
    : "/dashboard/my-profile"

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] w-[280px] shrink-0 place-items-center border-r border-richblack-800 bg-richblack-900">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <aside className="flex h-[calc(100vh-3.5rem)] w-[280px] shrink-0 flex-col border-r border-richblack-800 bg-richblack-900">
        <Link
          to={dashboardHome}
          className="border-b border-richblack-800 px-6 py-6 transition-colors hover:bg-richblack-800/40"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-richblack-500">
            Dashboard
          </p>
          <p className="mt-1 text-lg font-bold text-richblack-5">LearnNova</p>
        </Link>

        <div className="flex items-center gap-3 border-b border-richblack-800 px-6 py-5">
          <img
            src={
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}+${user?.lastName}`
            }
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-richblack-700"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="truncate text-xs text-richblack-400">{user?.email}</p>
            <span className="mt-1 inline-block rounded-md bg-richblack-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-yellow-50">
              {user?.accountType}
            </span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto py-4">
          {profileLink && (
            <SidebarLink link={profileLink} iconName={profileLink.icon} />
          )}

          {isInstructor && (
            <>
              <SectionLabel>Instructor</SectionLabel>
              {instructorLinks.map((link) => (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              ))}
            </>
          )}

          {isStudent && (
            <>
              <SectionLabel>Learning</SectionLabel>
              {studentLinks.map((link) => (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              ))}
            </>
          )}

          <div className="mx-6 my-4 h-px bg-richblack-800" />

          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            type="button"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex w-full items-center gap-x-3 py-3 pl-8 pr-4 text-left text-sm font-medium text-richblack-400 transition-colors hover:bg-richblack-800/60 hover:text-pink-200"
          >
            <VscSignOut className="text-lg" />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
