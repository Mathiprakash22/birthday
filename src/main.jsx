import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard'
import Day1 from './days/day1'
import Day2 from './days/day2'
import Day3 from './days/day3'
import Day4 from './days/day4'
import Day5 from './days/day5'
import Day6 from './days/day6'
import Day7 from './days/day7'
import Day8 from './days/day8'
import Day9 from './days/day9'
import Day10 from './days/day10'
import Day11 from './days/day11'
import Day12 from './days/day12'
import Day13 from './days/day13'
import Day14 from './days/day14'
import Day15 from './days/day15'
import Day16 from './days/day16'
import Day17 from './days/day17'
import Day18 from './days/day18'
import Day19 from './days/day19'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/day/1" element={<Day1 />} />
      <Route path="/day/2" element={<Day2 />} />
      <Route path="/day/3" element={<Day3 />} />
      <Route path="/day/4" element={<Day4 />} />
      <Route path="/day/5" element={<Day5 />} />
      <Route path="/day/6" element={<Day6 />} />
      <Route path="/day/7" element={<Day7 />} />
      <Route path="/day/8" element={<Day8 />} />
      <Route path="/day/9" element={<Day9 />} />
      <Route path="/day/10" element={<Day10 />} />
      <Route path="/day/11" element={<Day11 />} />
      <Route path="/day/12" element={<Day12 />} />
      <Route path="/day/13" element={<Day13 />} />
      <Route path="/day/14" element={<Day14 />} />
      <Route path="/day/15" element={<Day15 />} />
      <Route path="/day/16" element={<Day16 />} />
      <Route path="/day/17" element={<Day17 />} />
      <Route path="/day/18" element={<Day18 />} />
      <Route path="/day/19" element={<Day19 />} />
    </Routes>
  </BrowserRouter>
)
