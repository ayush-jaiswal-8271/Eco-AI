// API Types for EcoSense AI

export interface DashboardSummary {
  sustainability_score: number;
  score_change: number;
  energy_kwh: number;
  energy_change: number;
  water_liters: number;
  water_change: number;
  waste_kg: number;
  waste_change: number;
  is_demo?: boolean;
}

export interface ResourceTrendPoint {
  timestamp: string;
  energy: number;
  water: number;
  waste: number;
}

export interface TrendsData {
  hourly?: ResourceTrendPoint[];
  daily?: ResourceTrendPoint[];
  monthly?: ResourceTrendPoint[];
}

export interface BuildingStat {
  name: string;
  value: number;
  percentage: number;
}

export interface ResourceStatTrend {
  label: string;
  value: number;
  baseline: number;
}

export interface ResourceStats {
  total: number;
  unit: string;
  change: number;
  average_daily: number;
  peak_building: string;
  buildings: BuildingStat[];
  trends: ResourceStatTrend[];
}

export interface AIInsight {
  id: string;
  title: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  building: string;
  detected_at: string;
  anomaly_score: number;
  description: string;
  evidence: string;
  recommendation: string;
  potential_savings: string;
}

export interface WasteScanResult {
  item_name: string;
  category: string;
  confidence: number;
  disposal_instructions: string;
  co2_saved_kg: number;
  is_demo?: boolean;
}

export interface WasteScanHistory {
  id: string;
  item_name: string;
  category: string;
  confidence: number;
  disposal_instructions: string;
  co2_saved_kg: number;
  timestamp: string;
}

export interface ChatResponse {
  reply: string;
  intent: string;
  confidence: number;
  data?: any;
  is_demo?: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  category: string;
  description: string;
  estimated_cost_usd: number;
  payback_months: number;
  co2_reduction_tons: number;
  roi_percentage: number;
  impact_level: 'high' | 'medium' | 'low';
  status: string;
  is_demo?: boolean;
}

export interface ReportSummary {
  total_energy_kwh: number;
  total_water_liters: number;
  total_waste_kg: number;
  carbon_footprint_tons: number;
  sustainability_score: number;
}

export interface Report {
  period: string;
  generated_at: string;
  summary: ReportSummary;
  is_demo?: boolean;
}

export interface AppInfo {
  name: string;
  version: string;
  status: string;
  ai_module_status: string;
  collaborators: string[];
  is_demo?: boolean;
}
