import type { FeatureItem, KpiItem, OperationRecord, RankingItem } from "../types";

export const localFeatures: FeatureItem[] = [
  {
    "id": 1,
    "title": "座位热力图可视化",
    "description": "以楼层平面图形式展示所有座位状态（空闲/已约/使用中/不可用），支持按区域（静音区/讨论区/窗景区）筛选，点击座位查看详情。",
    "status": "已上线",
    "metric": "88%"
  },
  {
    "id": 2,
    "title": "按小时预约与选座",
    "description": "用户选择日期和时段（最小单位1小时），在座位图上点选心仪座位，系统自动检测时段冲突，预约成功后生成二维码。",
    "status": "排期中",
    "metric": "31 单"
  },
  {
    "id": 3,
    "title": "学习时长排行与成就徽章",
    "description": "记录用户累计学习时长，生成日/周/月排行榜，设置成就徽章（如连续7天打卡、学习100小时），增强学习动力。",
    "status": "巡检中",
    "metric": "10 项"
  },
  {
    "id": 4,
    "title": "静音区/讨论区分区管理",
    "description": "将自习室划分为静音区和讨论区，不同区域适用不同规则（静音区禁止交谈），预约时明确标注区域类型。",
    "status": "优化中",
    "metric": "4 级"
  },
  {
    "id": 5,
    "title": "违约黑名单与公告",
    "description": "用户预约后未签到或提前离场超过一定次数记入黑名单，限制预约权限；管理员可发布系统公告和活动通知，首页轮播展示。",
    "status": "可导出",
    "metric": "28 条"
  }
];

export const localKpis: KpiItem[] = [
  {
    "label": "今日处理",
    "value": "108",
    "trend": "+12%",
    "tone": "primary"
  },
  {
    "label": "预约/订单",
    "value": "46",
    "trend": "+8%",
    "tone": "warm"
  },
  {
    "label": "履约率",
    "value": "90%",
    "trend": "+3%",
    "tone": "cool"
  },
  {
    "label": "待处理",
    "value": "5",
    "trend": "需跟进",
    "tone": "neutral"
  }
];

export const operationRecords: OperationRecord[] = [
  {
    "key": "ldstudyroom-1",
    "name": "座位热力图可视化",
    "owner": "运营组",
    "status": "已上线",
    "metric": "88%",
    "priority": "高"
  },
  {
    "key": "ldstudyroom-2",
    "name": "按小时预约与选座",
    "owner": "管理员",
    "status": "排期中",
    "metric": "31 单",
    "priority": "中"
  },
  {
    "key": "ldstudyroom-3",
    "name": "学习时长排行与成就徽章",
    "owner": "服务台",
    "status": "巡检中",
    "metric": "10 项",
    "priority": "低"
  },
  {
    "key": "ldstudyroom-4",
    "name": "静音区/讨论区分区管理",
    "owner": "财务组",
    "status": "优化中",
    "metric": "4 级",
    "priority": "高"
  },
  {
    "key": "ldstudyroom-5",
    "name": "违约黑名单与公告",
    "owner": "审核组",
    "status": "可导出",
    "metric": "28 条",
    "priority": "中"
  }
];

export const localRanking: RankingItem[] = [
  { "rank": 1, "user_id": "u004", "user_name": "赵雨萱", "total_minutes": 320, "current_streak": 23, "total_hours": "5h 20m" },
  { "rank": 2, "user_id": "u008", "user_name": "吴梦琪", "total_minutes": 280, "current_streak": 18, "total_hours": "4h 40m" },
  { "rank": 3, "user_id": "u002", "user_name": "李思雨", "total_minutes": 240, "current_streak": 8, "total_hours": "4h 00m" },
  { "rank": 4, "user_id": "u012", "user_name": "林思彤", "total_minutes": 220, "current_streak": 7, "total_hours": "3h 40m" },
  { "rank": 5, "user_id": "u006", "user_name": "刘诗涵", "total_minutes": 210, "current_streak": 15, "total_hours": "3h 30m" },
  { "rank": 6, "user_id": "u010", "user_name": "孙雅婷", "total_minutes": 195, "current_streak": 11, "total_hours": "3h 15m" },
  { "rank": 7, "user_id": "u001", "user_name": "张小明", "total_minutes": 185, "current_streak": 12, "total_hours": "3h 05m" },
  { "rank": 8, "user_id": "u007", "user_name": "周子轩", "total_minutes": 175, "current_streak": 9, "total_hours": "2h 55m" },
  { "rank": 9, "user_id": "u011", "user_name": "黄嘉伟", "total_minutes": 160, "current_streak": 4, "total_hours": "2h 40m" },
  { "rank": 10, "user_id": "u003", "user_name": "王浩然", "total_minutes": 150, "current_streak": 5, "total_hours": "2h 30m" }
];
