import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const isActive = Boolean(
    matchPath({ path: link.path, end: true }, location.pathname)
  )

  return (
    <NavLink
      to={link.path}
      end
      onClick={() => dispatch(resetCourseState())}
      className={`relative flex items-center gap-x-3 py-3 pl-8 pr-4 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-richblack-800 text-yellow-50"
          : "text-richblack-300 hover:bg-richblack-800/60 hover:text-richblack-5"
      } `}
    >
      <span
        className={`absolute left-0 top-1/2 h-[52%] w-[3px] -translate-y-1/2 rounded-r-full bg-yellow-50 transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
      <Icon className="shrink-0 text-lg opacity-90" />
      <span>{link.name}</span>
    </NavLink>
  )
}
