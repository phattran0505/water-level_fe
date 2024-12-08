import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  YAxis,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://water-level-1.onrender.com/api/level"
      );
      const limitedData = response.data.slice(-10);
      setData(limitedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Lấy dữ liệu lần đầu
    const interval = setInterval(fetchData, 5000); // Gọi API mỗi 5 giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
  }, []);

  const formattedData = data.map((item) => ({
    level: item.level,
    timestamp: new Date(item.timestamp).toLocaleTimeString(), // Định dạng thời gian
  }));
  console.log(data);

  return (
    <div className="App">
      <div className="container">
        <h1>Mực Nước Hiện Tại</h1>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis
              dataKey="timestamp"
              stroke="#9ca3af"
              fontSize={12}
              label={{
                value: "Thời gian",
                position: "insideBottomRight",
                dy: 10,
              }}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              label={{
                value: "Mực nước",
                angle: -90,
                position: "insideLeft",
                dy: -10,
              }}
              domain={[0, 5]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#4b5563",
              }}
              itemStyle={{ color: "#000" }}
              formatter={(value, name) => [`${value} `, "Mực nước"]}
            />
            <Line
              type="monotone"
              dataKey="level"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
              activeDot={{ strokeWidth: 2, r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
