export interface NavItem {
  label: string
  id: string
}

export interface MetaItem {
  value: string
  label: string
}

export interface Fact {
  value: string
  label: string
}

export interface SkillGroup {
  num: string
  title: string
  tags: string[]
}

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tech: string[]
  highlights: string[]
}

export interface ExperienceItem {
  period: string
  role: string
  company: string
  description: string
}

export interface BlogPost {
  slug: string
  date: string
  title: string
  category: string
  excerpt: string
  body: string[]
}

export interface SocialLink {
  label: string
  href: string
}
