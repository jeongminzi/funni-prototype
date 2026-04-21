"use client";
/**
 * lucide-react 호환 래퍼.
 * 내부 구현은 @mdi/react + @mdi/js (Material Design Icons, pictogrammers.com/library/mdi).
 *
 * 사용 측은 기존 lucide API 유지:
 *   import { Camera, Phone } from "@/app/components/icons";
 *   <Camera size={20} className="text-fg-brand" />
 *
 * - size: lucide 관례대로 픽셀 수. 내부에서 (size/24) rem 단위로 변환.
 * - strokeWidth, fill: MDI는 filled path 기반이라 무시 (outline variant 아이콘으로 느낌 유지).
 * - className: SVG 루트에 그대로 전달 (text-* 색상 등).
 */
import MdiIcon from "@mdi/react";
import {
  mdiAccountGroupOutline,
  mdiAccountOutline,
  mdiBellOutline,
  mdiCakeVariant,
  mdiCalendarBlank,
  mdiCamera,
  mdiClock,
  mdiChartBar,
  mdiCakeVariantOutline,
  mdiAccount,
  mdiAlert,
  mdiCashMultiple,
  mdiChevronRight,
  mdiFire,
  mdiHeart,
  mdiHome,
  mdiMapMarker,
  mdiPackageVariant,
  mdiRing,
  mdiShopping,
  mdiStore,
  mdiVideo,
  mdiViewGrid,
  mdiCalendarBlankOutline,
  mdiCameraOutline,
  mdiCellphone,
  mdiCheck,
  mdiCheckCircleOutline,
  mdiChevronDown,
  mdiChevronLeft,
  mdiClockOutline,
  mdiClose,
  mdiCurrencyUsd,
  mdiDotsHorizontal,
  mdiDumbbell,
  mdiHeartOutline,
  mdiHomeOutline,
  mdiImageOutline,
  mdiMapMarkerOutline,
  mdiMessage,
  mdiMessageOutline,
  mdiMessagePlusOutline,
  mdiMessageTextOutline,
  mdiMonitorDashboard,
  mdiOfficeBuilding,
  mdiOfficeBuildingOutline,
  mdiPackageVariantClosed,
  mdiPencil,
  mdiPencilOutline,
  mdiPhone,
  mdiPhoneOutline,
  mdiRotateLeft,
  mdiSend,
  mdiStar,
  mdiTrashCanOutline,
  mdiVideoOutline,
  mdiViewGridOutline,
} from "@mdi/js";

type Props = {
  size?: number;
  className?: string;
  // lucide 호환을 위해 받기만 하고 사용은 안 함 (MDI는 filled path 기반)
  strokeWidth?: number;
  fill?: string;
};

const make =
  (path: string) =>
  function Icon({ size = 24, className }: Props) {
    return <MdiIcon path={path} size={size / 24} className={className} />;
  };

export const BarChart3 = make(mdiChartBar);
export const Bell = make(mdiBellOutline);
export const Building2 = make(mdiOfficeBuildingOutline);
export const Cake = make(mdiCakeVariantOutline);
export const Calendar = make(mdiCalendarBlankOutline);
export const Camera = make(mdiCameraOutline);
export const Check = make(mdiCheck);
export const CheckCircle2 = make(mdiCheckCircleOutline);
export const ChevronDown = make(mdiChevronDown);
export const ChevronLeft = make(mdiChevronLeft);
export const ChevronRight = make(mdiChevronRight);
export const Clock = make(mdiClockOutline);
export const DollarSign = make(mdiCurrencyUsd);
export const Dumbbell = make(mdiDumbbell);
export const Heart = make(mdiHeartOutline);
export const Home = make(mdiHomeOutline);
export const ImageIcon = make(mdiImageOutline);
export const LayoutGrid = make(mdiViewGridOutline);
export const MapPin = make(mdiMapMarkerOutline);
export const MessageCircle = make(mdiMessageOutline);
export const MessageSquarePlus = make(mdiMessagePlusOutline);
export const MonitorCog = make(mdiMonitorDashboard);
export const MoreHorizontal = make(mdiDotsHorizontal);
export const Package = make(mdiPackageVariantClosed);
export const Pencil = make(mdiPencilOutline);
export const Phone = make(mdiPhoneOutline);
export const RotateCcw = make(mdiRotateLeft);
export const Send = make(mdiSend);
export const Smartphone = make(mdiCellphone);
export const Star = make(mdiStar);
export const Trash2 = make(mdiTrashCanOutline);
export const User = make(mdiAccountOutline);
export const Users = make(mdiAccountGroupOutline);
export const Video = make(mdiVideoOutline);
export const X = make(mdiClose);

// Solid (filled) variants — 카테고리 그리드 등 강조 용도
export const CalendarSolid = make(mdiCalendarBlank);
export const CameraSolid = make(mdiCamera);
export const ClockSolid = make(mdiClock);
export const DumbbellSolid = make(mdiDumbbell);
export const HeartSolid = make(mdiHeart);
export const RingSolid = make(mdiRing);
export const CakeSolid = make(mdiCakeVariant);
export const PackageSolid = make(mdiPackageVariant);
export const ShoppingSolid = make(mdiShopping);
export const StoreSolid = make(mdiStore);
export const Building2Solid = make(mdiOfficeBuilding);
export const AlertSolid = make(mdiAlert);
export const PencilSolid = make(mdiPencil);
export const MessageSolid = make(mdiMessage);
export const VideoSolid = make(mdiVideo);
export const LayoutGridSolid = make(mdiViewGrid);
export const MoreHorizontalSolid = make(mdiDotsHorizontal);
export const HomeSolid = make(mdiHome);
export const UserSolid = make(mdiAccount);
export const MapPinSolid = make(mdiMapMarker);
export const PhoneSolid = make(mdiPhone);
export const Fire = make(mdiFire);
export const CashStack = make(mdiCashMultiple);
