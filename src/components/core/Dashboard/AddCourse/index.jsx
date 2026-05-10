import DashboardBreadcrumbs from "../../../Common/DashboardBreadcrumbs"
import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <DashboardBreadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard/instructor" },
          { label: "Add Course" },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-richblack-5">Add Course</h1>
      <p className="mb-10 text-richblack-300">
        Follow the steps to create and publish a new course.
      </p>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-xl border border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg font-semibold text-richblack-5">
            Course upload tips
          </p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}
