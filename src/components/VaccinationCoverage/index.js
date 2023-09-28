// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageList} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-title">Vaccination Coverage</h1>
      <ResponsiveContainer width={800} height={500}>
        <BarChart data={vaccinationCoverageList} margin={{top: 5}}>
          <XAxis
            dataKey="vaccine_date"
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'gray', strokeWidth: 1}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar
            dataKey="dose_1"
            name="Dose1"
            fill="#2d87bb"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose_2"
            name="Dose2"
            fill="#f54394"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
