import React from "react";
import "./Course.css";

function Course() {
  return (
    <div className="course">
      
      {/* Title */}
      <div className="title">
        Start Learning Chinese Your Way
      </div>

      {/* Cards Grid */}
      <div className="grid">

        {/* Card 1 */}
        <div className="course-card pink">
          <h3>HSK 1 Beginner</h3>
          <ul>
            <li>词汇</li>
            <li>基础语法</li>
            <li>日常用语</li>
          </ul>
          <button>Learn More</button>
        </div>

        {/* Card 2 */}
        <div className="course-card green">
          <h3>Daily Conversation</h3>
          <ul>
            <li>问候</li>
            <li>点餐</li>
            <li>购物</li>
          </ul>
          <button>Try Now</button>
        </div>

        {/* Card 3 */}
        <div className="course-card red">
          <h3>Chinese for Travel</h3>
          <ul>
            <li>机场</li>
            <li>酒店</li>
            <li>出行</li>
          </ul>
          <button>Learn More</button>
        </div>

      </div>
    </div>
  );
}

export default Course;
