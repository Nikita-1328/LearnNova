import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const CHART_COLORS = [
  "rgba(255, 214, 10, 0.85)",
  "rgba(6, 214, 160, 0.75)",
  "rgba(239, 71, 111, 0.75)",
  "rgba(17, 138, 178, 0.75)",
  "rgba(131, 56, 236, 0.7)",
  "rgba(255, 190, 11, 0.75)",
  "rgba(251, 86, 7, 0.75)",
]

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const palette = (n) =>
    Array.from({ length: n }, (_, i) => CHART_COLORS[i % CHART_COLORS.length])

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: palette(courses.length),
        borderWidth: 0,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: palette(courses.length),
        borderWidth: 0,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#AFB2BF",
          boxWidth: 12,
          padding: 16,
          font: { size: 11 },
        },
      },
    },
  }

  return (
    <div className="flex h-full min-h-[380px] flex-col rounded-xl border border-richblack-700 bg-richblack-800 p-6 md:p-8">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <p className="mt-1 text-sm text-richblack-400">
        Breakdown by course — switch between students and income.
      </p>
      <div className="mt-4 inline-flex rounded-lg border border-richblack-700 bg-richblack-900 p-1">
        <button
          type="button"
          onClick={() => setCurrChart("students")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-all ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50 shadow-sm"
              : "text-richblack-300 hover:text-richblack-5"
          }`}
        >
          Students
        </button>
        <button
          type="button"
          onClick={() => setCurrChart("income")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-all ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50 shadow-sm"
              : "text-richblack-300 hover:text-richblack-5"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mt-6 min-h-[260px] flex-1">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}
