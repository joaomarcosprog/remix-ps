import { LucideIcon } from 'lucide-react';

export interface Course {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  curriculum: string[];
}

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface FirstAidUpdate {
  id: string;
  title: string;
  source: string;
  sourceType: 'sobrasa' | 'aha' | 'samu' | 'lei' | 'geral';
  category: string;
  date: string;
  summary: string;
  practicalImpact: string;
  verificationStatus: string;
  sourceUrl?: string;
}