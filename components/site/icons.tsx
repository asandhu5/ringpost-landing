import {
  BarChart3,
  Bot,
  Brain,
  CalendarCheck,
  Globe,
  Inbox,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Phone,
  PhoneCall,
  RotateCcw,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";

export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "ai-receptionist": PhoneCall,
  inbox: Inbox,
  booking: CalendarCheck,
  knowledge: Brain,
  social: Sparkles,
  reviews: Star,
  winback: RotateCcw,
  insights: BarChart3,
  advisor: Bot,
};

export const CHANNEL_ICONS: Record<string, LucideIcon> = {
  phone: Phone,
  sms: MessageSquare,
  whatsapp: MessageCircle,
  instagram: Instagram,
  messenger: MessagesSquare,
  email: Mail,
  web_chat: Globe,
};
