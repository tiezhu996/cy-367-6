CREATE TABLE IF NOT EXISTS operation_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_name VARCHAR(120) NOT NULL,
  owner_name VARCHAR(80) NOT NULL,
  status VARCHAR(40) NOT NULL,
  metric VARCHAR(40) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO operation_records (module_name, owner_name, status, metric)
VALUES ('座位热力图可视化', '运营组', 'ready', '100%');

CREATE TABLE IF NOT EXISTS study_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(80) NOT NULL,
  user_name VARCHAR(80) NOT NULL,
  study_date DATE NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_date (user_id, study_date)
);

CREATE TABLE IF NOT EXISTS user_streaks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(80) NOT NULL UNIQUE,
  user_name VARCHAR(80) NOT NULL,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_study_date DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO study_records (user_id, user_name, study_date, duration_minutes) VALUES
('u001', '张小明', CURDATE(), 185),
('u002', '李思雨', CURDATE(), 240),
('u003', '王浩然', CURDATE(), 150),
('u004', '赵雨萱', CURDATE(), 320),
('u005', '陈梓豪', CURDATE(), 95),
('u006', '刘诗涵', CURDATE(), 210),
('u007', '周子轩', CURDATE(), 175),
('u008', '吴梦琪', CURDATE(), 280),
('u009', '郑浩然', CURDATE(), 130),
('u010', '孙雅婷', CURDATE(), 195),
('u011', '黄嘉伟', CURDATE(), 160),
('u012', '林思彤', CURDATE(), 220);

INSERT INTO user_streaks (user_id, user_name, current_streak, longest_streak, last_study_date) VALUES
('u001', '张小明', 12, 15, CURDATE()),
('u002', '李思雨', 8, 10, CURDATE()),
('u003', '王浩然', 5, 7, CURDATE()),
('u004', '赵雨萱', 23, 30, CURDATE()),
('u005', '陈梓豪', 3, 5, CURDATE()),
('u006', '刘诗涵', 15, 18, CURDATE()),
('u007', '周子轩', 9, 12, CURDATE()),
('u008', '吴梦琪', 18, 25, CURDATE()),
('u009', '郑浩然', 6, 8, CURDATE()),
('u010', '孙雅婷', 11, 14, CURDATE()),
('u011', '黄嘉伟', 4, 6, CURDATE()),
('u012', '林思彤', 7, 9, CURDATE());
