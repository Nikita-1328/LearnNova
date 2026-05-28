import { Link } from "react-router-dom"

/**
 * items: [{ label: string, to?: string }] — last item without `to` is current page
 */
export default function DashboardBreadcrumbs({ items }) {
  return (
    <nav
      className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-richblack-300"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-richblack-500" aria-hidden>
              /
            </span>
          )}
          {item.to ? (
            <Link
              to={item.to}
              className="transition-colors hover:text-yellow-50"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-yellow-50">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
