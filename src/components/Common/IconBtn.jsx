export default function IconBtn({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type = "submit",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
