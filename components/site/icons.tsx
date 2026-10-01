import {
  BarChart3,
  Bot,
  Brain,
  CalendarCheck,
  Globe,
  ImagePlus,
  Camera,
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
  "ai-media": Sparkles,
  uploads: Camera,
  social: ImagePlus,
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
};
