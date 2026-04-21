"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PolicyForm from "../components/PolicyForm";
import {
  Camera, Dumbbell, Heart, Cake, Package, Video, MoreHorizontal,
  CameraSolid, DumbbellSolid, HeartSolid, RingSolid, CakeSolid, PackageSolid, ShoppingSolid, VideoSolid, MoreHorizontalSolid,
  Home, HomeSolid, LayoutGrid, LayoutGridSolid, User, UserSolid, Bell, Phone, PhoneSolid, MapPin, MapPinSolid, Star, Pencil, Check, X,
  CheckCircle2, ImageIcon, Calendar, Clock, ChevronLeft, ChevronDown, RotateCcw, AlertSolid, Building2Solid,
  Fire, DollarSign, CashStack
} from "@/app/components/icons";

function PolicyBadge({ label }: { label: string }) {
  return <span className="policy-badge"><AlertSolid size={10} />{label}</span>;
}

// 레퍼런스 2.2 서브섹션: 그래디언트 대신 플랫 Semantic 배경. 역할별 다른 계열.
const BANNERS = [
  { title: "봄맞이 스튜디오 할인 이벤트", desc: "3월~5월 프로필 촬영 20% 할인", bg: "bg-surface-brand-subtle", ring: "ring-line-brand/10" },
  { title: "웨딩 시즌 특별 패키지", desc: "웨딩스냅 + 본식촬영 세트 할인", bg: "bg-warning-bg", ring: "ring-warning-solid/10" },
  { title: "바디프로필 인기 스튜디오 TOP5", desc: "성수·강남 지역 추천 스튜디오", bg: "bg-info-bg", ring: "ring-info-solid/10" },
];

function BannerSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(prev => (prev + 1) % BANNERS.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="px-4 my-6">
      <div className="overflow-hidden rounded-xl">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {BANNERS.map((b, i) => (
            <div key={i} className={`min-w-full ${b.bg} rounded-xl p-4 relative ring-1 ${b.ring}`}>
              <span className="absolute top-2 right-2 text-[9px] bg-surface-inverse/70 text-fg-inverse px-1.5 py-0.5 rounded">AD</span>
              <p className="text-sm font-bold text-fg mb-0.5">{b.title}</p>
              <p className="text-[10px] text-fg-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1 mt-2">
        {BANNERS.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-action-primary w-4" : "bg-surface-subtle"}`} />)}
      </div>
    </div>
  );
}

const CATEGORIES = [
  { name: "전체",     Icon: LayoutGridSolid,     color: "text-fg-muted" },
  { name: "프로필",   Icon: CameraSolid,         color: "text-sky-500" },
  { name: "바디프로필", Icon: DumbbellSolid,       color: "text-emerald-500" },
  { name: "웨딩",     Icon: RingSolid,           color: "text-pink-500" },
  { name: "돌잔치",   Icon: CakeSolid,           color: "text-yellow-500" },
  { name: "제품",     Icon: ShoppingSolid,       color: "text-red-500" },
  { name: "영상",     Icon: VideoSolid,          color: "text-violet-500" },
  { name: "기타",     Icon: MoreHorizontalSolid, color: "text-fg-muted" },
];

// 레퍼런스 2.2 아이콘 그리드: 역할별로 다른 Semantic 배지 — 위계 명확화
const HOME_CAT_BADGES: Record<string, { label: string; cls: string }> = {
  "프로필":     { label: "인기",   cls: "bg-badge-best-bg text-on-badge-best" },      // Brand (추천/큐레이션)
  "바디프로필": { label: "HOT",    cls: "bg-badge-hot-bg text-on-badge-hot" },        // Danger (긴급/한정)
  "웨딩":       { label: "신규",   cls: "bg-info-solid text-fg-inverse" },            // Info (정보)
  "영상":       { label: "-20%",   cls: "bg-badge-hot-bg text-on-badge-hot" },        // Danger (할인)
};

// 카테고리별 포트폴리오 (REQ-106: 탐색 경로의 카테고리에 맞는 사진만 표시)
type StudioCategoryPortfolio = Record<string, number[]>;

const STUDIOS: {
  id: number; name: string; cats: string[]; desc: string; area: string;
  price: number; rating: number; reviews: number; phone: string;
  createdAt: string; location: string;
  portfolios: StudioCategoryPortfolio;
  vatIncluded: boolean;
}[] = [
  { id: 1, name: "루미에르 스튜디오", cats: ["프로필"], desc: "프로필촬영, 증명사진, 프로필영상, 이력서사진", area: "서울 강남구", price: 50000, rating: 4.8, reviews: 124, phone: "02-1234-5678", createdAt: "2026-04-10", location: "서울특별시 강남구 역삼동 123-4",
    portfolios: { "프로필": [1,2,3,4,5,6] }, vatIncluded: true },
  { id: 2, name: "선셋 포토랩", cats: ["바디프로필"], desc: "바디프로필, 커플촬영, 다이어트기록", area: "서울 성수동", price: 80000, rating: 4.9, reviews: 89, phone: "02-2345-6789", createdAt: "2026-03-28", location: "서울특별시 성동구 성수동 45-6",
    portfolios: { "바디프로필": [1,2,3,4,5,6] }, vatIncluded: false },
  { id: 3, name: "블룸 웨딩 스튜디오", cats: ["웨딩"], desc: "웨딩스냅, 본식촬영, 야외웨딩", area: "서울 잠실", price: 200000, rating: 4.7, reviews: 56, phone: "02-3456-7890", createdAt: "2026-04-05", location: "서울특별시 송파구 잠실동 78-9",
    portfolios: { "웨딩": [1,2,3,4,5,6] }, vatIncluded: true },
  { id: 4, name: "미니미 키즈포토", cats: ["돌잔치"], desc: "돌잔치촬영, 백일사진, 가족사진", area: "경기 판교", price: 120000, rating: 4.6, reviews: 34, phone: "031-456-7890", createdAt: "2026-03-15", location: "경기도 성남시 분당구 판교동 12-3",
    portfolios: { "돌잔치": [1,2,3,4,5,6] }, vatIncluded: true },
  { id: 5, name: "프로덕트 랩", cats: ["제품"], desc: "제품촬영, 음식사진, 상세페이지, 스틸컷", area: "서울 홍대", price: 40000, rating: 4.5, reviews: 67, phone: "02-4567-8901", createdAt: "2026-04-12", location: "서울특별시 마포구 홍대입구 45-6",
    portfolios: { "제품": [1,2,3,4,5,6] }, vatIncluded: false },
  { id: 6, name: "무브 필름랩", cats: ["영상"], desc: "유튜브촬영, 광고영상, 인터뷰", area: "서울 합정", price: 60000, rating: 4.7, reviews: 45, phone: "02-5678-9012", createdAt: "2026-04-08", location: "서울특별시 마포구 합정동 78-9",
    portfolios: { "영상": [1,2,3,4,5,6] }, vatIncluded: true },
];

const HAIR_MAKEUP_OPTIONS = [
  { id: 1, name: "헤어 메이크업", price: 30000 },
  { id: 2, name: "얼굴 메이크업", price: 50000 },
  { id: 3, name: "세트 (헤어+얼굴)", price: 70000 },
];

const REGIONS = ["전체", "서울 강남", "서울 성수", "서울 잠실", "서울 홍대", "서울 합정", "경기 판교"];

// 지역 picker 페이지용 2단 데이터 (좌: 광역, 우: 세부)
const REGIONS_BY_AREA: { name: string; subs: string[] }[] = [
  { name: "서울", subs: ["서울 전체", "강남", "성수", "잠실", "홍대", "합정", "명동/을지로", "북촌/삼청", "서초/방배"] },
  { name: "경기", subs: ["경기 전체", "판교", "분당", "일산", "수원"] },
  { name: "인천", subs: ["인천 전체", "송도", "구월동"] },
  { name: "부산", subs: ["부산 전체", "해운대", "서면"] },
  { name: "제주도", subs: ["제주 전체", "제주시", "서귀포"] },
  { name: "울산", subs: ["울산 전체"] },
  { name: "경남", subs: ["경남 전체", "창원", "김해"] },
  { name: "대구", subs: ["대구 전체", "중구"] },
  { name: "경북", subs: ["경북 전체", "포항", "경주"] },
  { name: "강원", subs: ["강원 전체", "춘천", "강릉"] },
  { name: "대전", subs: ["대전 전체", "유성", "둔산"] },
];
const PRICE_RANGES = [
  { key: "all", label: "전체", min: 0, max: Infinity },
  { key: "low", label: "5만원 이하", min: 0, max: 50000 },
  { key: "mid", label: "5~10만원", min: 50001, max: 100000 },
  { key: "high", label: "10~20만원", min: 100001, max: 200000 },
  { key: "premium", label: "20만원 이상", min: 200001, max: Infinity },
];

const BOOKED_TIMES = ["10:00", "11:00", "15:00"];

const CONSUMER_NOTIFICATIONS: { id: number; type: string; text: string; time: string; read: boolean; action?: { screen: Screen; tab?: Tab; reviewTarget?: string } }[] = [
  { id: 1, type: "booking", text: "루미에르 스튜디오 사장님이 예약을 확정했어요", time: "10분 전", read: false, action: { screen: "myBookings", tab: "mypage" } },
  { id: 2, type: "remind", text: "내일 선셋 포토랩에서 촬영해요", time: "1시간 전", read: false, action: { screen: "myBookings", tab: "mypage" } },
  { id: 3, type: "review", text: "프로덕트 랩 촬영은 어땠어요? 리뷰를 남겨주세요", time: "3시간 전", read: true, action: { screen: "reviewWrite", tab: "mypage", reviewTarget: "프로덕트 랩" } },
  { id: 4, type: "booking", text: "블룸 웨딩 스튜디오 사장님이 예약을 확정했어요", time: "1일 전", read: true, action: { screen: "myBookings", tab: "mypage" } },
  { id: 5, type: "system", text: "퍼니 앱을 새로 업데이트했어요", time: "3일 전", read: true },
];

const UPCOMING_BOOKINGS = [
  { studio: "루미에르 스튜디오", location: "서울 강남구", date: "2026.05.10 (토)", time: "14:00~16:00", cat: "프로필", price: "100,000원", status: "확정" },
  { studio: "선셋 포토랩", location: "서울 성수동", date: "2026.05.18 (일)", time: "10:00~12:00", cat: "바디프로필", price: "160,000원", status: "확정" },
  { studio: "블룸 웨딩 스튜디오", location: "서울 잠실", date: "2026.05.25 (일)", time: "10:00~14:00", cat: "웨딩", price: "800,000원", status: "대기" },
];
const COMPLETED_BOOKINGS = [
  { studio: "프로덕트 랩", location: "서울 홍대", date: "2026.04.20 (일)", time: "13:00~15:00", cat: "제품", price: "80,000원", status: "완료", canReview: true },
  { studio: "블룸 웨딩 스튜디오", location: "서울 잠실", date: "2026.04.05 (토)", time: "10:00~14:00", cat: "웨딩", price: "800,000원", status: "완료", canReview: false },
  { studio: "미니미 키즈포토", location: "경기 판교", date: "2026.03.22 (토)", time: "10:00~12:00", cat: "돌잔치", price: "240,000원", status: "완료", canReview: false },
];
const CANCELLED_BOOKINGS = [
  { studio: "무브 필름랩", location: "서울 합정", date: "2026.04.15 (화)", time: "15:00~17:00", cat: "영상", price: "120,000원", status: "취소됨", reason: "소비자 취소" },
  { studio: "루미에르 스튜디오", location: "서울 강남구", date: "2026.03.28 (금)", time: "10:00~12:00", cat: "프로필", price: "100,000원", status: "취소됨", reason: "업체 사유" },
];
const MY_REVIEWS_DATA = [
  { studio: "블룸 웨딩 스튜디오", date: "2026.04.06", rating: 5, text: "정말 만족스러운 촬영이었습니다. 결과물도 훌륭해요!" },
  { studio: "미니미 키즈포토", date: "2026.03.23", rating: 4, text: "아이가 편안하게 촬영할 수 있었어요. 스태프가 친절합니다." },
  { studio: "프로덕트 랩", date: "2026.03.10", rating: 5, text: "제품 사진 퀄리티가 기대 이상이에요. 재방문 예정!" },
];
const PAYMENT_HISTORY = [
  { studio: "루미에르 스튜디오", date: "2026.05.08", amount: "100,000원", method: "카드", status: "결제완료" },
  { studio: "선셋 포토랩", date: "2026.05.05", amount: "160,000원", method: "카드", status: "결제완료" },
  { studio: "블룸 웨딩 스튜디오", date: "2026.04.03", amount: "800,000원", method: "카카오페이", status: "결제완료" },
  { studio: "프로덕트 랩", date: "2026.04.18", amount: "80,000원", method: "카드", status: "결제완료" },
  { studio: "무브 필름랩", date: "2026.04.13", amount: "120,000원", method: "카드", status: "환불완료" },
];
const ALL_MY_BOOKINGS_FOR_MYPAGE = [
  { studio: "루미에르 스튜디오", location: "서울 강남구", date: "2026.05.10 (토)", time: "14:00~16:00", cat: "프로필 촬영", price: "100,000원", status: "확정" },
  { studio: "선셋 포토랩", location: "서울 성수동", date: "2026.05.18 (일)", time: "10:00~12:00", cat: "바디프로필", price: "160,000원", status: "확정" },
  { studio: "블룸 웨딩 스튜디오", location: "서울 잠실", date: "2026.05.25 (일)", time: "10:00~14:00", cat: "웨딩", price: "800,000원", status: "대기" },
  { studio: "무브 필름랩", location: "서울 합정", date: "2026.05.30 (토)", time: "13:00~15:00", cat: "영상", price: "120,000원", status: "확정" },
  { studio: "프로덕트 랩", location: "서울 홍대", date: "2026.06.05 (금)", time: "11:00~13:00", cat: "제품", price: "80,000원", status: "대기" },
  { studio: "프로덕트 랩", location: "서울 홍대", date: "2026.04.20 (일)", time: "13:00~15:00", cat: "제품", price: "80,000원", status: "완료" },
  { studio: "미니미 키즈포토", location: "경기 판교", date: "2026.04.12 (토)", time: "10:00~12:00", cat: "돌잔치", price: "240,000원", status: "완료" },
  { studio: "무브 필름랩", location: "서울 합정", date: "2026.04.05 (토)", time: "15:00~17:00", cat: "영상", price: "120,000원", status: "취소" },
  { studio: "블룸 웨딩 스튜디오", location: "서울 잠실", date: "2026.03.22 (토)", time: "10:00~14:00", cat: "웨딩", price: "800,000원", status: "완료" },
];

type Screen = "home" | "category" | "myBookings" | "detail" | "booking" | "done" | "mypage" | "reviewWrite" | "myReviews" | "paymentHistory" | "login" | "signup" | "bizSignup" | "forgotPassword" | "notifications" | "regionPicker";

// 2-depth 화면의 상단 네비바 타이틀
const SCREEN_TITLES: Partial<Record<Screen, string>> = {
  detail: "스튜디오 상세",
  booking: "예약 확인",
  done: "예약 완료",
  myBookings: "내 예약",
  reviewWrite: "리뷰 작성",
  myReviews: "내 리뷰",
  paymentHistory: "결제 내역",
  notifications: "알림",
  regionPicker: "지역",
};
type Sort = "newest" | "rating" | "priceAsc";
type BookingFilter = "예정" | "완료" | "취소";
type Tab = "home" | "category" | "mypage";

const TIMES = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

export default function ConsumerApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [prevScreenRef, setPrevScreenRef] = useState<Screen>("home");
  const [selectedStudio, setSelectedStudio] = useState(STUDIOS[0]);
  const [tab, setTab] = useState<Tab>("home");
  const [sort, setSort] = useState<Sort>("newest");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [dateSheetOpen, setDateSheetOpen] = useState(false);
  const dateSelectedInSheet = useRef(false);
  const timeSelectedInSheet = useRef(false);
  const openDateSheet = () => {
    dateSelectedInSheet.current = false;
    timeSelectedInSheet.current = false;
    setDateSheetOpen(true);
  };
  const handleDateSelectInSheet = (day: number) => {
    setSelectedDate(day);
    dateSelectedInSheet.current = true;
    if (timeSelectedInSheet.current) setDateSheetOpen(false);
  };
  const handleTimeSelectInSheet = (t: string) => {
    setSelectedTime(t);
    timeSelectedInSheet.current = true;
    if (dateSelectedInSheet.current) setDateSheetOpen(false);
  };
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("예정");
  const [adIdx, setAdIdx] = useState(0);
  const [detailImgIdx, setDetailImgIdx] = useState(0);
  const detailImgCount = 4;
  const detailTouchStartX = useRef(0);
  const handleDetailTouchStart = (e: React.TouchEvent) => { detailTouchStartX.current = e.touches[0].clientX; };
  const handleDetailTouchEnd = (e: React.TouchEvent) => {
    const diff = detailTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setDetailImgIdx(prev => (prev + 1) % detailImgCount);
    if (diff < -50) setDetailImgIdx(prev => (prev - 1 + detailImgCount) % detailImgCount);
  };
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewTarget, setReviewTarget] = useState("");
  const [reviewTargetDate, setReviewTargetDate] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userName, setUserName] = useState("김퍼니");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [categoryCat, setCategoryCat] = useState("프로필"); // legacy: 단일 카테고리 선택 (홈 그리드 연동용)
  const [categoryCats, setCategoryCats] = useState<string[]>([]); // 카테고리 화면: 다중 선택
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [regionPickerTop, setRegionPickerTop] = useState("서울");
  const [regionPickerDraft, setRegionPickerDraft] = useState("전체");
  const [hidePolicyAreas, setHidePolicyAreas] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [customPriceMin, setCustomPriceMin] = useState<string>("");
  const [customPriceMax, setCustomPriceMax] = useState<string>("");
  const [detailEntryCat, setDetailEntryCat] = useState<string>(""); // 탐색 진입 카테고리
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [editingReviewIdx, setEditingReviewIdx] = useState<number | null>(null);
  const [editReviewRating, setEditReviewRating] = useState(5);
  const [editReviewText, setEditReviewText] = useState("");

  const touchStartX = useRef(0);
  const historyStack = useRef<{ s: Screen; t: Tab }[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const homeTrendingRef = useRef<HTMLDivElement>(null);
  const [homeChipBarVisible, setHomeChipBarVisible] = useState(false);

  // 화면 전환 시 스크롤 최상단으로, 상세 화면 이탈 시 선택값 초기화
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
    if (screen !== "detail" && screen !== "booking" && screen !== "done") {
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedOptions([]);
    }
  }, [screen]);

  // 홈: 스크롤이 "이런 스튜디오는 어때요?" 섹션 근처에 도달하면 스티키 칩 바 노출
  useEffect(() => {
    if (screen !== "home") { setHomeChipBarVisible(false); return; }
    const root = scrollContainerRef.current;
    const el = homeTrendingRef.current;
    if (!root || !el) return;
    const onScroll = () => {
      setHomeChipBarVisible(root.scrollTop >= el.offsetTop - 100);
    };
    onScroll();
    root.addEventListener('scroll', onScroll);
    return () => root.removeEventListener('scroll', onScroll);
  }, [screen]);

  const navigate = (to: Screen) => {
    historyStack.current.push({ s: screen, t: tab });
    setPrevScreenRef(screen);
    setScreen(to);
  };
  const goBack = () => {
    if (screen === "home") return;
    const prev = historyStack.current.pop();
    if (prev) {
      setScreen(prev.s);
      setTab(prev.t);
    } else {
      setScreen("home");
      setTab("home");
    }
  };

  // 홈: 지역 + 가격대 필터 + 정렬
  const homeFiltered = STUDIOS
    .filter(s => {
      if (selectedRegion === "전체" || !selectedRegion.trim()) return true;
      const kw = selectedRegion.trim().toLowerCase();
      return s.area.toLowerCase().includes(kw);
    })
    .filter(s => {
      // 커스텀 범위 우선 (원 단위)
      const cmin = customPriceMin ? parseInt(customPriceMin) : null;
      const cmax = customPriceMax ? parseInt(customPriceMax) : null;
      if (cmin !== null || cmax !== null) {
        if (cmin !== null && s.price < cmin) return false;
        if (cmax !== null && s.price > cmax) return false;
        return true;
      }
      const pr = PRICE_RANGES.find(p => p.key === selectedPriceRange);
      if (!pr) return true;
      return s.price >= pr.min && s.price <= pr.max;
    });
  const homeSorted = [...homeFiltered].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "priceAsc") return a.price - b.price;
    // newest
    return b.createdAt.localeCompare(a.createdAt);
  });

  // 섹션 1 "이런 스튜디오는 어때요?" — 지역만 적용 (가격 필터 무시), 평점 내림차순 top 6
  const popularStudios = STUDIOS
    .filter(s => {
      if (selectedRegion === "전체" || !selectedRegion.trim()) return true;
      return s.area.toLowerCase().includes(selectedRegion.trim().toLowerCase());
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // 카테고리 탭: 카테고리 + 지역 — 다중 선택, 배열 비면 전체
  const catFiltered = STUDIOS
    .filter(s => categoryCats.length === 0 || s.cats.some(c => categoryCats.includes(c)))
    .filter(s => {
      if (selectedRegion === "전체" || !selectedRegion.trim()) return true;
      const kw = selectedRegion.trim().toLowerCase();
      return s.area.toLowerCase().includes(kw);
    });

  const toggleOption = (id: number) => setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const timeIdx = selectedTime ? TIMES.indexOf(selectedTime) : -1;
  const endTime = timeIdx >= 0 ? (TIMES[Math.min(timeIdx + 2, TIMES.length - 1)] || "22:00") : "";
  const basePrice = selectedStudio.price * 2;
  const optionsTotal = selectedOptions.reduce((sum, id) => sum + (HAIR_MAKEUP_OPTIONS.find(o => o.id === id)?.price || 0), 0);
  const totalPrice = basePrice + optionsTotal;

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setAdIdx(prev => Math.min(prev + 1, 2));
    if (diff < -50) setAdIdx(prev => Math.max(prev - 1, 0));
  };

  // 마이페이지: 예정된 예약(확정 + 대기)만
  const upcomingMyBookings = ALL_MY_BOOKINGS_FOR_MYPAGE.filter(b => b.status === "확정" || b.status === "대기");
  const filteredBookings = bookingFilter === "예정" ? UPCOMING_BOOKINGS : bookingFilter === "완료" ? COMPLETED_BOOKINGS : CANCELLED_BOOKINGS;

  const statusColor = (s: string) => {
    if (s === "확정") return "bg-success-bg text-success-fg";
    if (s === "대기") return "bg-warning-bg text-warning-fg";
    if (s === "완료") return "bg-gray-200 text-fg-muted";
    return "bg-danger-bg text-danger-solid";
  };

  // 상세 화면에서 표시할 포트폴리오 (IA-012: 카테고리별 갤러리)
  const detailPortfolio = (() => {
    if (detailEntryCat && selectedStudio.portfolios[detailEntryCat]) {
      return { cat: detailEntryCat, photos: selectedStudio.portfolios[detailEntryCat] };
    }
    const firstCat = selectedStudio.cats[0];
    return { cat: firstCat, photos: selectedStudio.portfolios[firstCat] || [] };
  })();

  const authScreens: Screen[] = ["login", "signup", "bizSignup", "forgotPassword"];
  const showHeader = !authScreens.includes(screen);
  // 바텀 네비는 1-depth(top-level) 화면에서만 노출. 상세/예약/완료/알림 등 2-depth 이상에선 숨김.
  const topLevelScreens: Screen[] = ["home", "category", "mypage"];
  const showBottomNav = topLevelScreens.includes(screen);

  const openDetail = (s: typeof STUDIOS[0], fromCat?: string) => {
    setSelectedStudio(s);
    setSelectedOptions([]);
    setDetailEntryCat(fromCat || "");
    navigate("detail");
  };

  return (
    <div className="min-h-screen bg-surface-subtle flex flex-col items-center py-8 px-4">
      <Link href="/" className="text-sm text-fg-brand mb-4 hover:underline">← 메인으로</Link>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-fg">소비자 화면</h2>
        <button onClick={() => setHidePolicyAreas(v => !v)}
          className="text-xs px-3 py-1.5 rounded-full bg-surface border border-line text-fg-secondary hover:bg-surface-muted">
          정책 영역 {hidePolicyAreas ? "보기" : "숨기기"}
        </button>
      </div>

      <div className={`w-[375px] bg-surface rounded-[40px] border-[8px] border-gray-900 overflow-hidden shadow-2xl relative ${hidePolicyAreas ? "hide-policy" : ""}`} style={{ height: 780 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-surface-inverse rounded-b-2xl z-20" />

        {/* Header — 1-depth: Funni 로고 + Bell, 2-depth: Back + 화면 타이틀 (+ 옵션 우측) */}
        {showHeader && (
          <div className="relative z-10 bg-surface pt-10 pl-2 pr-4 pb-2">
            {topLevelScreens.includes(screen) ? (
              <div className="flex items-center justify-between h-12">
                <button onClick={() => { setScreen("home"); setTab("home"); }} className="flex items-center">
                  <img src="/funni-logo.png" alt="퍼니" className="w-12 h-12" />
                  <span className="text-xl font-bold text-fg-brand -ml-1.5">퍼니</span>
                </button>
                <button onClick={() => navigate("notifications")} className="text-fg-muted relative p-1">
                  <Bell size={20} strokeWidth={1.5} />
                  {CONSUMER_NOTIFICATIONS.some(n => !n.read) && <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-danger-solid rounded-full" />}
                </button>
              </div>
            ) : (
              <div className="flex items-center h-12">
                <button onClick={goBack} className="text-fg-secondary p-1 -ml-1">
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <h1 className="text-base font-bold text-fg ml-2">{SCREEN_TITLES[screen] ?? ""}</h1>
                {screen === "regionPicker" && (
                  <button onClick={() => { setRegionPickerDraft("전체"); setRegionPickerTop("서울"); }}
                    className="ml-auto flex items-center gap-1 text-sm font-medium text-fg-muted">
                    <RotateCcw size={14} strokeWidth={2} /> 초기화
                  </button>
                )}
                {screen !== "regionPicker" && (
                  <button onClick={() => { setScreen("home"); setTab("home"); }} className="ml-auto text-fg-secondary p-1">
                    <HomeSolid size={22} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* 홈 스티키 카테고리 칩 — 상단 네비게이션 아래에서 미끄러져 내려옴 */}
        {screen === "home" && (
          <div
            className={`absolute left-0 right-0 bg-surface border-b border-line-subtle z-[5] transition-transform duration-300 ease-out ${homeChipBarVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}
            style={{ top: 84 }}
          >
            <div className="flex gap-2 overflow-x-auto px-4 py-2" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map(c => (
                <button key={c.name} onClick={() => { setCategoryCat(c.name); setCategoryCats(c.name === "전체" ? [] : [c.name]); setTab("category"); setScreen("category"); }}
                  className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs border border-line-subtle text-fg-secondary bg-surface flex items-center gap-1">
                  <c.Icon size={13} strokeWidth={1.5} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}


        <div ref={scrollContainerRef} className={`overflow-y-auto bg-surface ${screen === "regionPicker" ? "" : "pb-20"}`} style={{ height: `calc(780px - ${showHeader ? 84 : 28}px - ${showBottomNav ? 56 : 12}px)` }}>

          {/* ===== HOME (IA-010) ===== */}
          {screen === "home" && (
            <div>
              {/* 지역 picker — 최상단. 클릭 시 regionPicker 페이지로 이동 */}
              <div className="px-4 pt-3 pb-1">
                <button onClick={() => { setRegionPickerDraft(selectedRegion); navigate("regionPicker"); }}
                  className="inline-flex items-center gap-1 text-fg">
                  <MapPinSolid size={16} className="text-fg-muted" />
                  <span className="text-[15px] font-bold">{selectedRegion === "전체" ? "전국" : selectedRegion}</span>
                  <ChevronDown size={14} strokeWidth={2} />
                </button>
              </div>

              {/* 프리미엄 영역 — 광고 스튜디오 (REQ-112) */}
              <div className="policy-area mx-4 mt-6 p-2">
                <PolicyBadge label="광고 세부 규칙 미확정" />
                <div className="mt-1 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                  <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${adIdx * 100}%)` }}>
                    {STUDIOS.slice(0, 3).map((s, i) => (
                      <div key={i} onClick={() => openDetail(s)} className="min-w-full cursor-pointer">
                        <div className="bg-surface-subtle rounded-xl p-4 flex gap-3 items-center relative">
                          <span className="absolute top-2 left-2 bg-surface-inverse/70 text-fg-inverse text-[9px] px-2 py-0.5 rounded font-medium">AD</span>
                          <span className="badge-best absolute top-2 right-2">추천</span>
                          <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center text-fg-disabled shrink-0"><ImageIcon size={24} strokeWidth={1.5} /></div>
                          <div>
                            <p className="text-sm font-bold text-fg">{s.name}</p>
                            <p className="text-[10px] text-fg-muted mt-0.5">{s.cats.join(", ")} · {s.area}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs font-bold">{s.price.toLocaleString()}원</span>
                              <span className="text-[10px] text-star">★ {s.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1.5 mt-2">
                    {[0,1,2].map(i => (
                      <button key={i} onClick={() => setAdIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === adIdx ? "bg-action-primary w-4" : "bg-line-strong"}`} />
                    ))}
                  </div>
                </div>
                <PolicyForm question="프리미엄 영역 구좌 수는?" screen="소비자" area="광고 구좌 수" />
                <PolicyForm question="광고 노출 기간 단위는? (주간 / 월간 / 건별)" screen="소비자" area="광고 기간 단위" />
                <PolicyForm question="광고 과금 방식은? (고정가 / 입찰)" screen="소비자" area="광고 과금 방식" />
              </div>

              {/* 카테고리 아이콘 그리드 (레퍼런스 2.2 / 3.1 — 역할별 배지로 정보 위계) */}
              <div className="px-4 my-8">
                <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                  {CATEGORIES.map(c => {
                    const badge = HOME_CAT_BADGES[c.name];
                    return (
                      <button key={c.name} onClick={() => { setCategoryCat(c.name); setCategoryCats(c.name === "전체" ? [] : [c.name]); setTab("category"); setScreen("category"); }}
                        className="flex flex-col items-center gap-1.5">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-2xl bg-surface-subtle flex items-center justify-center ${c.color}`}>
                            <c.Icon size={24} strokeWidth={1.5} />
                          </div>
                          {badge && (
                            <span className={`absolute -top-1 -right-1 text-[9px] leading-none px-1.5 py-2 rounded-full font-bold ${badge.cls}`}>
                              {badge.label}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-fg-secondary">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 메인 배너 (REQ-113 / IA-A05: 메인 화면 배너 이미지 영역) */}
              <BannerSlider />

              {/* 섹션 1: 지금 인기있는 / 스튜디오 (2-line 타이틀 + 전체보기 + 카드 6개) */}
              <div ref={homeTrendingRef} className="px-4 mt-10 mb-2">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold leading-tight flex items-center gap-1.5">
                      <Fire size={20} className="text-danger-solid" />
                      이런 스튜디오는 어때요?
                    </h3>
                  </div>
                  <button onClick={() => { setSort("newest"); setSelectedPriceRange("all"); setSelectedRegion("전체"); setCustomPriceMin(""); setCustomPriceMax(""); }}
                    className="text-xs text-fg-secondary">
                    전체보기
                  </button>
                </div>
                {/* 인기 스튜디오 카드 6개 (평점 내림차순) */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {[...STUDIOS].sort((a, b) => b.rating - a.rating).slice(0, 6).map(s => (
                    <div key={s.id} onClick={() => openDetail(s)} className="cursor-pointer">
                      <div className="relative aspect-square bg-surface-subtle rounded-xl overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-fg-disabled">
                          <ImageIcon size={40} strokeWidth={1} />
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                          {s.rating >= 4.8 && <span className="badge-best">BEST</span>}
                          {s.reviews >= 100 && <span className="badge-hot">HOT</span>}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-bold text-fg line-clamp-1">{s.name}</p>
                        <p className="text-[11px] text-fg-secondary mt-0.5">{s.area}</p>
                        <div className="flex items-baseline gap-1 mt-1.5">
                          <span className="text-[15px] font-bold text-fg tracking-tight">{s.price.toLocaleString()}원</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={11} strokeWidth={0} fill="currentColor" className="text-star" />
                          <span className="text-[11px] font-semibold text-fg-secondary">{s.rating}</span>
                          <span className="text-[11px] text-fg-muted">({s.reviews})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 섹션 2: 가격대별 / 스튜디오 (2-line 타이틀 + 가격 필터 칩) */}
              <div className="px-4 mt-10 mb-3">
                <div className="mb-5">
                  <h3 className="text-lg font-bold leading-tight flex items-center gap-1.5">
                    <CashStack size={20} className="text-success-solid" />
                    원하는 가격대로 찾아봐요
                  </h3>
                </div>
                <div className="flex gap-2 overflow-x-auto items-center" style={{ scrollbarWidth: 'none' }}>
                  {PRICE_RANGES.map(p => (
                    <button key={p.key} onClick={() => { setSelectedPriceRange(p.key); setCustomPriceMin(""); setCustomPriceMax(""); }}
                      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs border transition-all shrink-0 ${selectedPriceRange === p.key && !customPriceMin && !customPriceMax ? "border-line-brand bg-surface-brand-soft text-fg-brand font-medium" : "border-line-subtle text-fg-secondary bg-surface"}`}>{p.label}</button>
                  ))}
                  {/* 커스텀 범위 입력 */}
                  <div className={`flex items-center gap-0.5 text-xs shrink-0 rounded-full border transition-all ${customPriceMin || customPriceMax ? "border-line-brand bg-surface-brand-soft text-fg-brand" : "border-line-subtle bg-surface text-fg-secondary"} px-3 py-1`}>
                    <input type="number" placeholder="최소" value={customPriceMin} onChange={e => setCustomPriceMin(e.target.value)}
                      className="w-10 bg-transparent outline-none text-right" />
                    <span>원</span>
                    <span className="mx-0.5">~</span>
                    <input type="number" placeholder="최대" value={customPriceMax} onChange={e => setCustomPriceMax(e.target.value)}
                      className="w-10 bg-transparent outline-none text-right" />
                    <span>원</span>
                    {(customPriceMin || customPriceMax) && (
                      <button onClick={() => { setCustomPriceMin(""); setCustomPriceMax(""); }} className="ml-0.5">✕</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Studio List — 2열 그리드 세로형 카드 (레퍼런스 이미지 패턴) */}
              <div className="px-4 pb-4">
                {homeSorted.length === 0 ? (
                  <div className="text-center py-12"><p className="text-fg-disabled text-sm">조건에 맞는 스튜디오가 없습니다</p></div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {homeSorted.map(s => (
                      <div key={s.id} onClick={() => openDetail(s)} className="cursor-pointer">
                        {/* 썸네일 — 정사각형 + 큐레이션 배지 오버레이 (좌측 정렬, 가로 배열) */}
                        <div className="relative aspect-square bg-surface-subtle rounded-xl overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-fg-disabled">
                            <ImageIcon size={40} strokeWidth={1} />
                          </div>
                          <div className="absolute top-2 left-2 flex gap-1">
                            {s.rating >= 4.8 && (
                              <span className="badge-best">BEST</span>
                            )}
                            {s.reviews >= 100 && (
                              <span className="badge-hot">HOT</span>
                            )}
                          </div>
                        </div>
                        {/* 이미지 아래 정보 (레퍼런스 3.3 타이포 계층) */}
                        <div className="mt-2">
                          <p className="text-sm font-bold text-fg line-clamp-1">{s.name}</p>
                          <p className="text-[11px] text-fg-secondary mt-0.5">{s.area}</p>
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="text-[15px] font-bold text-fg tracking-tight">{s.price.toLocaleString()}원</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={11} strokeWidth={0} fill="currentColor" className="text-star" />
                            <span className="text-[11px] font-semibold text-fg-secondary">{s.rating}</span>
                            <span className="text-[11px] text-fg-muted">({s.reviews})</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== REGION PICKER ===== */}
          {screen === "regionPicker" && (
            <div className="flex h-full overflow-hidden bg-surface">
              {/* 좌: 광역 */}
              <div className="w-[38%] bg-surface-muted overflow-y-auto pb-24">
                {REGIONS_BY_AREA.map(r => (
                  <button key={r.name} onClick={() => setRegionPickerTop(r.name)}
                    className={`w-full text-left px-4 py-3.5 text-sm transition-colors ${regionPickerTop === r.name ? "bg-surface text-fg font-bold" : "text-fg-secondary hover:bg-surface-subtle"}`}>
                    {r.name}
                  </button>
                ))}
              </div>
              {/* 우: 세부 */}
              <div className="flex-1 overflow-y-auto pb-24">
                {(REGIONS_BY_AREA.find(r => r.name === regionPickerTop)?.subs ?? []).map(sub => {
                  const value = sub.includes("전체") ? "전체" : sub;
                  const isSelected = regionPickerDraft === value;
                  return (
                    <button key={sub} onClick={() => setRegionPickerDraft(value)}
                      className={`w-full text-left px-4 py-3.5 text-sm font-semibold transition-colors ${isSelected ? "text-fg-brand" : "text-fg"}`}>
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== CATEGORY (IA-011) ===== */}
          {screen === "category" && (
            <div>
              {/* 지역 picker — 홈과 동일 (최상단) */}
              <div className="px-4 pt-3 pb-1">
                <button onClick={() => { setRegionPickerDraft(selectedRegion); navigate("regionPicker"); }}
                  className="inline-flex items-center gap-1 text-fg">
                  <MapPinSolid size={16} className="text-fg-muted" />
                  <span className="text-[15px] font-bold">{selectedRegion === "전체" ? "전국" : selectedRegion}</span>
                  <ChevronDown size={14} strokeWidth={2} />
                </button>
              </div>

              {/* 카테고리 칩 — 다중 선택, 선택된 항목 왼쪽 정렬, X 아이콘으로 삭제. 스크롤해도 상단 고정 */}
              <div className="sticky top-0 z-[5] bg-surface px-4 pt-3 pb-3 border-b border-line-subtle">
                <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
                  {(() => {
                    // "전체"는 항상 맨 앞, 나머지는 선택된 순서 + 미선택
                    const all = CATEGORIES.find(c => c.name === "전체");
                    const others = CATEGORIES.filter(c => c.name !== "전체");
                    const selected = categoryCats
                      .map(name => others.find(c => c.name === name))
                      .filter((c): c is typeof CATEGORIES[number] => !!c);
                    const unselected = others.filter(c => !categoryCats.includes(c.name));
                    const displayList = [all!, ...selected, ...unselected];
                    return displayList.map(c => {
                      const isAll = c.name === "전체";
                      const isSelected = !isAll && categoryCats.includes(c.name);
                      const isActiveAll = isAll && categoryCats.length === 0;
                      const activeStyle = (isSelected || isActiveAll)
                        ? "border-line-brand bg-surface-brand-soft text-fg-brand font-semibold"
                        : "border-line-subtle text-fg-secondary bg-surface";
                      const handleClick = () => {
                        if (isAll) { setCategoryCats([]); return; }
                        setCategoryCats(prev => prev.includes(c.name) ? prev.filter(n => n !== c.name) : [...prev, c.name]);
                      };
                      return (
                        <button key={c.name} onClick={handleClick}
                          className={`shrink-0 whitespace-nowrap rounded-full ${isSelected ? "pl-3.5 pr-2" : "px-3.5"} py-1.5 text-xs border transition-all flex items-center gap-1 ${activeStyle}`}>
                          <c.Icon size={13} strokeWidth={1.5} />
                          {c.name}
                          {isSelected && <X size={12} strokeWidth={2} className="ml-0.5 text-fg-brand" />}
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* 카테고리 정책 영역 (미확정 항목 — 토글 시 숨김) */}
              <div className="policy-area mx-4 mb-4 p-2">
                <PolicyBadge label="카테고리 목록 미확정" />
                <PolicyForm question="상세 카테고리 목록을 확정해주세요. (웨딩/프로필/피아노 등 대략적 방향만 논의됨)" screen="소비자" area="카테고리 목록" />
              </div>

              <p className="px-4 text-sm font-bold mb-3">&lsquo;{categoryCats.length === 0 ? "전체" : categoryCats.join(", ")}&rsquo; 스튜디오 <span className="text-fg-brand">{catFiltered.length}</span></p>

              {/* 스튜디오 리스트 상단 광고 배너 (REQ-113, 플랫 Semantic) */}
              <div className="mx-4 mb-3 overflow-hidden rounded-xl">
                <div className="bg-surface-brand-subtle rounded-xl p-4 flex items-center gap-3 relative ring-1 ring-line-brand/10">
                  <span className="absolute top-2 left-2 bg-surface-inverse/70 text-fg-inverse text-[9px] px-2 py-0.5 rounded font-medium">AD</span>
                  <div className="w-14 h-14 bg-surface rounded-lg flex items-center justify-center shrink-0 text-fg-brand"><ImageIcon size={22} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-xs font-bold text-fg">카테고리별 추천 배너</p>
                    <p className="text-[10px] text-fg-muted mt-0.5">관리자가 등록한 광고 배너 영역</p>
                  </div>
                </div>
              </div>

              {catFiltered.map(s => (
                <div key={s.id} onClick={() => openDetail(s, categoryCat)}
                  className="mx-4 flex gap-3 py-3 border-b border-line-subtle cursor-pointer">
                  <div className="relative w-[120px] h-[120px] shrink-0">
                    <div className="w-full h-full bg-surface-subtle rounded-xl flex items-center justify-center text-fg-disabled"><ImageIcon size={28} strokeWidth={1.5} /></div>
                    <div className="absolute top-2 left-2 flex gap-1">
                      {s.rating >= 4.8 && <span className="badge-best">BEST</span>}
                      {s.reviews >= 100 && <span className="badge-hot">HOT</span>}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold text-fg">{s.name}</p>
                      <p className="text-[11px] text-fg-muted mt-0.5">{s.cats.join(", ")} · {s.area}</p>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[15px] font-bold text-fg tracking-tight">{s.price.toLocaleString()}원</span>
                        <span className="text-[10px] text-fg-muted">/ 시간</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={11} strokeWidth={0} fill="currentColor" className="text-star" />
                        <span className="text-[11px] font-semibold text-fg-secondary">{s.rating}</span>
                        <span className="text-[11px] text-fg-muted">({s.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== DETAIL (IA-012) ===== */}
          {screen === "detail" && (
            <div>
              {/* 사진 캐러셀 (드래그 스와이프) */}
              <div className="overflow-hidden bg-surface-subtle" onTouchStart={handleDetailTouchStart} onTouchEnd={handleDetailTouchEnd}>
                <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${detailImgIdx * 100}%)` }}>
                  {Array.from({ length: detailImgCount }).map((_, i) => (
                    <div key={i} className="min-w-full h-52 flex items-center justify-center text-fg-disabled">
                      <ImageIcon size={56} strokeWidth={1} />
                    </div>
                  ))}
                </div>
              </div>
              {/* 캐러셀 dots — 사진 4px 아래, 선택=브랜드/미선택=그레이 */}
              <div className="flex justify-center gap-1.5 pt-1 pb-2">
                {Array.from({ length: detailImgCount }).map((_, i) => (
                  <button key={i} onClick={() => setDetailImgIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === detailImgIdx ? "bg-action-primary w-4" : "bg-line-strong"}`} />
                ))}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-0.5">{selectedStudio.name}</h2>
                <p className="text-sm text-fg-secondary">{selectedStudio.area}</p>
                <div className="flex items-center gap-2 mt-1 mb-4">
                  <span className="text-sm text-star">★ {selectedStudio.rating}</span>
                  <span className="text-sm text-fg-secondary">리뷰 {selectedStudio.reviews}개</span>
                </div>

                {/* 가격표 */}
                <div className="bg-surface-muted rounded-xl p-4 mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">촬영 가격</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{selectedStudio.price.toLocaleString()}원</span>
                    <span className="text-xs text-fg-disabled">/ 시간 · {selectedStudio.vatIncluded ? "VAT 포함" : "VAT 별도"}</span>
                  </div>
                </div>

                {/* 날짜 및 시간 선택 (바텀시트 트리거) */}
                <div className="mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">날짜 및 시간</p>
                  <button onClick={openDateSheet} className="w-full flex items-center justify-between bg-surface border border-line rounded-xl px-4 py-3">
                    {selectedDate !== null && selectedTime !== null ? (
                      <span className="text-sm font-medium">2026.05.{selectedDate} · {selectedTime}</span>
                    ) : (
                      <span className="text-sm text-fg-disabled">날짜 · 시간</span>
                    )}
                    <ChevronDown size={16} className="text-fg-muted" />
                  </button>
                </div>

                {/* 헤어/메이크업 옵션 */}
                <div className="bg-surface-muted rounded-xl p-4 mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">헤어 / 메이크업 옵션</p>
                  <div className="space-y-2">
                    {HAIR_MAKEUP_OPTIONS.map(opt => (
                      <button key={opt.id} onClick={() => toggleOption(opt.id)}
                        className={`w-full flex justify-between items-center p-3 rounded-lg border text-left transition-all ${selectedOptions.includes(opt.id) ? "border-line-brand bg-action-primary/5" : "border-line"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOptions.includes(opt.id) ? "border-line-brand bg-action-primary" : "border-line-strong"}`}>
                            {selectedOptions.includes(opt.id) && <Check size={10} strokeWidth={3} className="text-fg-inverse" />}
                          </span>
                          <span className="text-sm">{opt.name}</span>
                        </div>
                        <span className="text-sm font-medium">+{opt.price.toLocaleString()}원</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 카테고리별 포트폴리오 (IA-012 / REQ-106) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-fg-muted font-medium">{detailPortfolio.cat} 포트폴리오</p>
                    <span className="text-[10px] text-fg-disabled">최대 30장</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                    {detailPortfolio.photos.map((_, i) => (
                      <div key={i} className="aspect-square bg-surface-subtle flex items-center justify-center text-gray-300"><ImageIcon size={20} strokeWidth={1} /></div>
                    ))}
                  </div>
                </div>

                {/* 위치 (지도) - REQ-106 */}
                <div className="mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">위치</p>
                  <div className="bg-surface-subtle rounded-xl overflow-hidden border border-line">
                    <div className="h-32 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center relative">
                      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                      <MapPin size={32} strokeWidth={1.5} className="text-fg-brand z-10" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium text-fg-secondary">{selectedStudio.location}</p>
                      <a href={`tel:${selectedStudio.phone}`} className="flex items-center gap-1 text-[10px] text-fg-brand mt-1">
                        <Phone size={12} strokeWidth={1.5} /> {selectedStudio.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Reviews (IA-031) */}
                <div className="policy-area mb-4 p-3">
                  <PolicyBadge label="리뷰 세부 규칙 미확정" />
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-2">리뷰 {selectedStudio.reviews}개</p>
                    <div className="space-y-2">
                      {[
                        { name: "김**", rating: 5, text: "분위기 너무 좋아요! 사진 결과물도 만족합니다", reply: "감사합니다! 다음에도 좋은 촬영 하겠습니다." },
                        { name: "이**", rating: 4, text: "접근성이 좋고 시설이 깔끔해요", reply: null },
                      ].map((r, i) => (
                        <div key={i} className="bg-surface rounded-lg p-3 border border-line-subtle">
                          <div className="flex items-center gap-2 mb-1"><span className="text-xs font-medium">{r.name}</span><span className="text-xs text-star">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span></div>
                          <p className="text-xs text-fg-muted">{r.text}</p>
                          {r.reply && (
                            <div className="bg-surface-muted rounded-lg p-2.5 mt-2 border border-line-subtle">
                              <p className="text-[10px] text-fg-brand font-medium mb-0.5">업체 답변</p>
                              <p className="text-xs text-fg-muted">{r.reply}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-warning-600 mt-2">작성 기간 · 사진 첨부 · 수정/삭제 · 글자 수 제한 → 미확정</p>
                    <PolicyForm question="리뷰 작성 가능 기간은? (촬영 후 며칠 이내?)" screen="소비자" area="리뷰 작성 기간" />
                    <PolicyForm question="리뷰 수정/삭제가 가능한가요?" screen="소비자" area="리뷰 수정/삭제" />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ===== BOOKING (IA-020) ===== */}
          {screen === "booking" && (
            <div>
              <div className="p-4">
              <h2 className="text-lg font-bold mb-4">예약 확인</h2>
              <div className="bg-surface-muted rounded-xl p-4 mb-4">
                <p className="font-bold text-sm">{selectedStudio.name}</p>
                <p className="text-xs text-fg-disabled mt-1">{selectedStudio.cats.join(", ")} · {selectedStudio.area}</p>
              </div>
              <div className="space-y-3 mb-4 px-1">
                <div className="flex justify-between text-sm"><span className="text-fg-muted">날짜</span><span className="font-medium">{selectedDate !== null ? `2026.05.${selectedDate} (${["목","금","토","일","월","화","수"][selectedDate - 8]})` : "-"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-fg-muted">시간</span><span className="font-medium">{selectedTime} ~ {endTime} (2시간)</span></div>
                <div className="flex justify-between text-sm"><span className="text-fg-muted">촬영 비용</span><span className="font-medium">{basePrice.toLocaleString()}원</span></div>
                {selectedOptions.length > 0 && selectedOptions.map(id => {
                  const opt = HAIR_MAKEUP_OPTIONS.find(o => o.id === id);
                  return opt ? <div key={id} className="flex justify-between text-sm"><span className="text-fg-muted">{opt.name}</span><span className="font-medium">+{opt.price.toLocaleString()}원</span></div> : null;
                })}
                <div className="flex justify-between text-sm border-t border-line-subtle pt-3"><span className="text-fg-muted font-bold">총 금액</span><span className="font-bold text-fg-brand text-base">{totalPrice.toLocaleString()}원</span></div>
              </div>

              <div className="policy-area mb-4 p-3">
                <PolicyBadge label="취소/환불 정책 미확정" />
                <div className="mt-2 space-y-1.5">
                  <p className="text-xs text-warning-fg font-medium">취소/환불 규칙</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-fg-disabled">
                    <span>7일 전 취소</span><span className="text-warning-600 font-medium">→ ?% 환불</span>
                    <span>3일 전 취소</span><span className="text-warning-600 font-medium">→ ?% 환불</span>
                    <span>당일 취소</span><span className="text-warning-600 font-medium">→ ?% 환불</span>
                    <span>노쇼</span><span className="text-warning-600 font-medium">→ ?</span>
                  </div>
                </div>
                <PolicyForm question="예약 취소/환불 정책을 확정해주세요. (취소 수수료, 환불 기준 등)" screen="소비자" area="취소/환불 정책" />
              </div>
              </div>
            </div>
          )}

          {/* ===== DONE (IA-022) ===== */}
          {screen === "done" && (
            <div className="p-6 pb-28 flex flex-col items-center justify-center" style={{ minHeight: 500 }}>
              <div className="w-14 h-14 bg-success-600 rounded-full flex items-center justify-center mb-4 text-fg-inverse"><Check size={28} strokeWidth={3} /></div>
              <h2 className="text-lg font-bold mb-6">예약을 확정했어요</h2>
              <div className="bg-surface-muted rounded-xl p-4 w-full mb-3">
                <p className="text-base font-medium text-fg">{selectedStudio.name}</p>
                <p className="text-sm text-fg-secondary mt-1">2026.05.{selectedDate} {selectedTime} ~ {endTime}</p>
              </div>
              <div className="bg-surface-muted rounded-xl p-4 w-full">
                <p className="text-xs text-fg-muted font-medium mb-2">결제 수단</p>
                <div className="flex justify-between text-sm">
                  <span className="text-fg-secondary">신용카드 (토스페이먼츠)</span>
                  <span className="font-medium text-fg">****1234</span>
                </div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-line-subtle">
                  <span className="text-fg-secondary">결제 금액</span>
                  <span className="font-bold text-fg">{totalPrice.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          )}

          {/* ===== MY BOOKINGS (IA-023/051) ===== */}
          {screen === "myBookings" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">내 예약</h2>
              <div className="flex gap-2 mb-4">
                {(["예정", "완료", "취소"] as BookingFilter[]).map(f => (
                  <button key={f} onClick={() => setBookingFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${bookingFilter === f ? "border-line-brand bg-surface-brand-soft text-fg-brand" : "border-line text-fg-secondary bg-surface"}`}>{f} {f === "예정" ? UPCOMING_BOOKINGS.length : f === "완료" ? COMPLETED_BOOKINGS.length : CANCELLED_BOOKINGS.length}</button>
                ))}
              </div>
              {filteredBookings.length === 0 ? <div className="text-center py-12"><p className="text-fg-disabled text-sm">해당 예약이 없습니다</p></div> : filteredBookings.map((b, i) => (
                <div key={i} className="bg-surface rounded-xl p-4 mb-3 border border-line-subtle">
                  <div className="flex gap-3 mb-3">
                    <div className="w-20 h-20 bg-surface-subtle rounded-lg flex items-center justify-center text-fg-disabled shrink-0">
                      <ImageIcon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-sm font-bold truncate min-w-0 ${bookingFilter === "취소" ? "line-through text-fg-disabled" : ""}`}>{b.studio}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium shrink-0 ${statusColor(b.status)}`}>{b.status === "확정" && <Check size={10} strokeWidth={3} />}{b.status}</span>
                      </div>
                      <p className="text-[11px] text-fg-muted mt-1">{b.cat} · {b.location}</p>
                      <p className="text-xs text-fg-secondary mt-2">{b.date}</p>
                      <p className="text-xs text-fg-secondary mt-1">{b.time}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-line-subtle">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-fg-muted">총 결제</span>
                      <span className="text-sm font-bold">{b.price}</span>
                    </div>
                    {bookingFilter === "예정" && <div className="policy-area px-2 py-1 mt-2 flex justify-end items-center gap-1"><AlertSolid size={10} /><span className="text-[10px] text-warning-fg">취소 정책 미확정</span></div>}
                    {bookingFilter === "완료" && (b as { canReview?: boolean }).canReview && (
                      <div className="flex justify-end mt-2">
                        <button onClick={() => { setReviewTarget(b.studio); setReviewTargetDate(b.date); setReviewRating(5); setReviewText(""); navigate("reviewWrite"); }} className="bg-brand-bg text-brand-fg text-xs font-medium px-3 py-1.5 rounded-md">리뷰 작성</button>
                      </div>
                    )}
                    {bookingFilter === "취소" && <p className="text-[10px] text-fg-disabled mt-2 text-right">{(b as { reason?: string }).reason}</p>}
                  </div>
                </div>
              ))}
              {/* 취소/환불 정책 미확정 — REQ-108, 미확정 항목 */}
              <div className="policy-area mt-4 p-3">
                <PolicyBadge label="취소/환불 정책 미확정" />
                <PolicyForm question="예약 취소 시 환불 기준은? (7일 전/3일 전/당일/노쇼 각각 환불율)" screen="소비자" area="취소/환불 정책" />
                <PolicyForm question="취소 수수료 부과 기준은? (업체/소비자 귀책 구분)" screen="소비자" area="취소 수수료" />
              </div>
            </div>
          )}

          {/* ===== REVIEW WRITE (IA-030) ===== */}
          {screen === "reviewWrite" && (() => {
            const reviewStudio = STUDIOS.find(s => s.name === reviewTarget);
            return (
            <div className="p-4 pb-28">
              <h2 className="text-base font-bold mb-4">리뷰 작성</h2>
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <p className="text-sm font-bold">{reviewTarget}</p>
                {reviewStudio && (
                  <p className="text-xs text-fg-muted">{reviewStudio.cats.join(", ")} · {reviewStudio.area}</p>
                )}
              </div>
              {reviewTargetDate && (
                <div className="bg-surface-muted rounded-xl p-3 mb-6 flex items-center justify-between">
                  <span className="text-xs text-fg-muted">방문 날짜</span>
                  <span className="text-sm font-medium text-fg">{reviewTargetDate}</span>
                </div>
              )}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">별점</p>
                <div className="flex gap-3 justify-center">{[1,2,3,4,5].map(star => <button key={star} onClick={() => setReviewRating(star)} className={`text-5xl ${star <= reviewRating ? "text-star" : "text-line-strong"}`}>★</button>)}</div>
                <p className="text-center text-xs text-fg-disabled mt-3">{reviewRating}점</p>
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">리뷰 내용</p>
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="촬영 경험을 공유해주세요" className="w-full bg-surface-muted rounded-xl p-4 text-sm outline-none resize-none border border-line focus:border-line-brand" rows={5} />
                <p className="text-right text-[10px] text-fg-disabled mt-1">{reviewText.length}/500</p>
              </div>
            </div>
            );
          })()}

          {/* ===== MY REVIEWS (IA-053) ===== */}
          {screen === "myReviews" && editingReviewIdx === null && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">내 리뷰 관리</h2>
              {MY_REVIEWS_DATA.map((r, i) => (
                <div key={i} className="bg-surface-muted rounded-xl p-4 mb-3">
                  <div className="flex justify-between items-start mb-2"><div><p className="text-sm font-bold">{r.studio}</p><p className="text-xs text-fg-disabled mt-0.5">{r.date}</p></div><span className="text-xs text-star">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span></div>
                  <p className="text-xs text-fg-muted">{r.text}</p>
                  <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-line-subtle">
                    <button onClick={() => { setEditingReviewIdx(i); setEditReviewRating(r.rating); setEditReviewText(r.text); }} className="text-[10px] text-fg-brand px-2 py-1 font-medium">수정</button>
                    <button className="text-[10px] text-danger-solid px-2 py-1">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== MY REVIEW EDIT ===== */}
          {screen === "myReviews" && editingReviewIdx !== null && (
            <div className="p-4 pb-28">
              <h2 className="text-base font-bold mb-4">리뷰 수정</h2>
              <div className="bg-surface-muted rounded-xl p-4 mb-6"><p className="text-sm font-bold">{MY_REVIEWS_DATA[editingReviewIdx].studio}</p><p className="text-xs text-fg-disabled mt-0.5">{MY_REVIEWS_DATA[editingReviewIdx].date}</p></div>
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">별점</p>
                <div className="flex gap-2 justify-center">{[1,2,3,4,5].map(star => <button key={star} onClick={() => setEditReviewRating(star)} className="text-3xl">{star <= editReviewRating ? "★" : "☆"}</button>)}</div>
                <p className="text-center text-xs text-fg-disabled mt-2">{editReviewRating}점</p>
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">리뷰 내용</p>
                <textarea value={editReviewText} onChange={e => setEditReviewText(e.target.value)} className="w-full bg-surface-muted rounded-xl p-4 text-sm outline-none resize-none border border-line focus:border-line-brand" rows={5} />
                <p className="text-right text-[10px] text-fg-disabled mt-1">{editReviewText.length}/500</p>
              </div>
            </div>
          )}

          {/* ===== PAYMENT HISTORY (IA-052) ===== */}
          {screen === "paymentHistory" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">결제 내역</h2>
              {PAYMENT_HISTORY.map((p, i) => (
                <div key={i} className="flex justify-between items-center py-3.5 border-b border-line-subtle">
                  <div><p className="text-sm font-medium">{p.studio}</p><p className="text-xs text-fg-disabled mt-0.5">{p.date} · {p.method}</p></div>
                  <div className="text-right"><p className={`text-sm font-bold ${p.status === "환불완료" ? "text-danger-solid" : "text-fg"}`}>{p.status === "환불완료" ? "-" : ""}{p.amount}</p><p className={`text-[10px] ${p.status === "환불완료" ? "text-danger-solid" : "text-success-solid"}`}>{p.status}</p></div>
                </div>
              ))}
            </div>
          )}

          {/* ===== MY PAGE (IA-050) ===== */}
          {screen === "mypage" && (
            <div className="p-4">
              {/* 프로필 편집 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-action-primary/10 rounded-full flex items-center justify-center text-fg-brand"><User size={26} strokeWidth={1.5} /></div>
                  <button onClick={() => setIsEditingProfile(true)} className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-action-primary rounded-full flex items-center justify-center text-fg-inverse shadow"><Camera size={11} strokeWidth={2} /></button>
                </div>
                <div className="flex-1">
                  {isEditingProfile ? (
                    <div className="flex items-center gap-2"><input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="text-sm font-bold border-b border-line-brand outline-none bg-transparent w-24" autoFocus /><button onClick={() => setIsEditingProfile(false)} className="text-[10px] text-fg-brand font-medium bg-action-primary/10 px-2 py-1 rounded">완료</button></div>
                  ) : (<div className="flex items-center gap-2"><p className="font-bold">{userName}</p><button onClick={() => setIsEditingProfile(true)} className="text-fg-disabled"><Pencil size={12} strokeWidth={1.5} /></button></div>)}
                </div>
              </div>

              {/* 예정된 예약 (확정 + 대기만) */}
              <div className="mb-4 -mx-4">
                <div className="flex items-center gap-1 mb-3 px-4">
                  <h3 className="font-bold text-sm">예정된 예약</h3>
                  <span className="text-fg-brand font-bold text-sm">{upcomingMyBookings.length}</span>
                </div>
                {upcomingMyBookings.length === 0 ? (
                  <p className="px-4 text-xs text-fg-muted">예정된 예약이 없습니다</p>
                ) : (
                  <div className="flex gap-3 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: 'none' }}>
                    {upcomingMyBookings.map((b, i) => (
                      <div key={i} className="shrink-0 w-[280px] bg-surface rounded-xl p-4 border border-line-subtle">
                        <div className="flex gap-3 mb-3">
                          <div className="w-20 h-20 bg-surface-subtle rounded-lg flex items-center justify-center text-fg-disabled shrink-0">
                            <ImageIcon size={24} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <p className="text-sm font-bold truncate min-w-0">{b.studio}</p>
                              <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium shrink-0 ${statusColor(b.status)}`}>
                                {b.status === "확정" && <Check size={10} strokeWidth={3} />}
                                {b.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-fg-muted mt-1">{b.cat} · {b.location}</p>
                            <p className="text-xs text-fg-secondary mt-2">{b.date}</p>
                            <p className="text-xs text-fg-secondary mt-1">{b.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-line-subtle">
                          <span className="text-sm text-fg-muted">총 결제</span>
                          <span className="text-sm font-bold">{b.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-0">
                {[
                  { label: "내 예약 내역", action: () => navigate("myBookings") },
                  { label: "내 리뷰 관리", action: () => navigate("myReviews") },
                  { label: "결제 내역", action: () => navigate("paymentHistory") },
                  { label: "고객센터", action: () => {} },
                  { label: "로그아웃", action: () => navigate("login") },
                ].map(m => (
                  <button key={m.label} onClick={m.action} className="flex justify-between items-center py-3.5 border-b border-line-subtle w-full text-left">
                    <span className="text-sm">{m.label}</span><span className="text-gray-300 text-xs">›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== LOGIN (IA-003) ===== */}
          {screen === "login" && (
            <div className="p-6 pt-16 flex flex-col items-center">
              <p className="text-3xl font-bold text-fg-brand mb-2">퍼니</p>
              <p className="text-xs text-fg-disabled mb-10">스튜디오 대관·예약 플랫폼</p>

              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-[#FEE500] text-[#191919] py-3 rounded-xl font-bold text-sm mb-2 flex items-center justify-center gap-2">카카오로 시작하기</button>
              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-[#03C75A] text-fg-inverse py-3 rounded-xl font-bold text-sm mb-6 flex items-center justify-center gap-2">네이버로 시작하기</button>

              <div className="flex items-center gap-4 w-full mb-6">
                <div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-fg-disabled">또는</span><div className="flex-1 h-px bg-gray-200" />
              </div>

              <input type="email" placeholder="이메일" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line mb-2" />
              <input type="password" placeholder="비밀번호" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line mb-4" />
              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-action-primary text-fg-inverse py-3 rounded-xl font-bold text-sm mb-4">로그인</button>

              <div className="flex items-center gap-4 text-xs text-fg-disabled">
                <button onClick={() => navigate("signup")}>회원가입</button>
                <span>|</span>
                <button onClick={() => navigate("forgotPassword")}>비밀번호 찾기</button>
              </div>

              <div className="mt-8 w-full">
                <button onClick={() => navigate("bizSignup")} className="w-full border border-line-brand text-fg-brand py-3 rounded-xl font-medium text-sm inline-flex items-center justify-center gap-1.5"><Building2Solid size={14} />업체 회원가입</button>
              </div>
            </div>
          )}

          {/* ===== SIGNUP (IA-001) ===== */}
          {screen === "signup" && (
            <div className="p-6 pt-16">
              <h2 className="text-lg font-bold mb-1">회원가입</h2>
              <p className="text-xs text-fg-disabled mb-6">소비자 계정</p>


              <div className="space-y-3 mb-4">
                <div><p className="text-xs text-fg-muted mb-1">이름</p><input type="text" placeholder="홍길동" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">닉네임 (앱 내 표시)</p><input type="text" placeholder="퍼니유저" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">이메일</p><input type="email" placeholder="email@example.com" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">비밀번호</p><input type="password" placeholder="8자 이상" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
              </div>

              {/* 약관 동의 (REQ-101) */}
              <div className="space-y-2 mb-4 bg-surface-muted rounded-xl p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="w-4 h-4 accent-[#7C3AED]" />
                  <span className="text-xs flex-1"><span className="text-danger-solid">*</span> 서비스 이용약관 동의</span>
                  <span className="text-[10px] text-fg-disabled underline">보기</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreePrivacy} onChange={e => setAgreePrivacy(e.target.checked)} className="w-4 h-4 accent-[#7C3AED]" />
                  <span className="text-xs flex-1"><span className="text-danger-solid">*</span> 개인정보 처리방침 동의</span>
                  <span className="text-[10px] text-fg-disabled underline">보기</span>
                </label>
              </div>

              <p className="text-xs text-fg-disabled mb-3">또는 SNS로 가입</p>
              <button className="w-full bg-[#FEE500] text-[#191919] py-3 rounded-xl font-bold text-sm mb-2">카카오로 가입</button>
              <button className="w-full bg-[#03C75A] text-fg-inverse py-3 rounded-xl font-bold text-sm mb-6">네이버로 가입</button>

              <button onClick={() => { if (agreeTerms && agreePrivacy) { setScreen("home"); setTab("home"); } }} disabled={!agreeTerms || !agreePrivacy}
                className={`w-full py-3 rounded-xl font-bold text-sm ${agreeTerms && agreePrivacy ? "bg-action-primary text-fg-inverse" : "bg-gray-200 text-fg-disabled cursor-not-allowed"}`}>가입하기</button>
            </div>
          )}

          {/* ===== BIZ SIGNUP (IA-002) ===== */}
          {screen === "bizSignup" && (
            <div className="p-6 pt-16">
              <h2 className="text-lg font-bold mb-1">업체 회원가입</h2>
              <p className="text-xs text-fg-disabled mb-6">사업자 계정 · 심사가 끝나면 쓸 수 있어요</p>

              <div className="policy-area p-3 mb-4">
                <PolicyBadge label="업체 입점 세부 규칙 미확정" />
                <p className="text-[10px] text-warning-600 mt-1">→ 어드민 웹 &gt; 업체 관리에 질문으로 표기</p>
              </div>


              <div className="space-y-3 mb-4">
                <div><p className="text-xs text-fg-muted mb-1">업체명</p><input type="text" placeholder="스튜디오명" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">대표자명</p><input type="text" placeholder="홍길동" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">사업자등록번호</p><input type="text" placeholder="000-00-00000" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">연락처</p><input type="tel" placeholder="02-0000-0000" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">이메일</p><input type="email" placeholder="biz@example.com" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">비밀번호</p><input type="password" placeholder="8자 이상" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" /></div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-fg-muted mb-2">스튜디오/작업물 사진 업로드</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-surface-subtle rounded-xl flex items-center justify-center border-2 border-dashed border-line-strong"><span className="text-xl text-fg-disabled">+</span></div>
                  {[1,2,3].map(i => <div key={i} className="aspect-square bg-surface-subtle rounded-xl" />)}
                </div>
                <p className="text-[10px] text-fg-disabled mt-1">심사할 때 참고해요</p>
              </div>

              {/* 약관 동의 */}
              <div className="space-y-2 mb-4 bg-surface-muted rounded-xl p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#7C3AED]" />
                  <span className="text-xs flex-1"><span className="text-danger-solid">*</span> 서비스 이용약관 동의</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#7C3AED]" />
                  <span className="text-xs flex-1"><span className="text-danger-solid">*</span> 개인정보 처리방침 동의</span>
                </label>
              </div>

              <button onClick={() => { setScreen("login"); }} className="w-full bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm mb-3">가입 신청하기</button>

              <div className="bg-warning-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold text-warning-fg mb-1">승인 안내</p>
                <div className="space-y-1 text-[10px] text-warning-600">
                  <p>• 심사는 2~3일 걸려요</p>
                  <p>• 전화로 확인할 수 있으니 연락을 꼭 받아주세요</p>
                  <p>• 결과는 가입한 이메일로 알려드려요</p>
                </div>
              </div>
            </div>
          )}

          {/* ===== FORGOT PASSWORD (IA-004) ===== */}
          {screen === "forgotPassword" && (
            <div className="p-6 pt-16">
              <h2 className="text-lg font-bold mb-1">비밀번호 찾기</h2>
              <p className="text-xs text-fg-disabled mb-8">가입할 때 쓴 이메일로 재설정 링크를 보내드려요</p>
              <div className="mb-6">
                <p className="text-xs text-fg-muted mb-1">이메일</p>
                <input type="email" placeholder="email@example.com" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line" />
              </div>
              <button onClick={goBack} className="w-full bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm mb-4">재설정 링크 보내기</button>
              <p className="text-center text-[10px] text-fg-disabled">입력한 이메일로 재설정 링크를 보내드려요</p>
            </div>
          )}

          {/* ===== NOTIFICATIONS (IA-040) ===== */}
          {screen === "notifications" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">알림</h2>
              {CONSUMER_NOTIFICATIONS.map(n => {
                const IconComp = n.type === "booking" ? Calendar : n.type === "remind" ? Clock : n.type === "review" ? Star : Bell;
                const handleClick = () => {
                  if (!n.action) return;
                  if (n.action.reviewTarget) { setReviewTarget(n.action.reviewTarget); setReviewTargetDate(COMPLETED_BOOKINGS.find(b => b.studio === n.action!.reviewTarget)?.date ?? ""); setReviewRating(5); setReviewText(""); }
                  if (n.action.tab) setTab(n.action.tab);
                  navigate(n.action.screen);
                };
                return (
                  <button key={n.id} onClick={handleClick}
                    className={`flex gap-3 py-3.5 border-b border-line-subtle w-full text-left ${n.read ? "opacity-60" : ""} ${n.action ? "hover:bg-surface-muted cursor-pointer" : ""}`}>
                    <div className="w-9 h-9 rounded-full bg-surface-subtle flex items-center justify-center shrink-0 text-fg-muted">
                      <IconComp size={16} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-fg-secondary">{n.text}</p>
                      <p className="text-[10px] text-fg-disabled mt-1">{n.time}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 bg-action-primary rounded-full mt-2 shrink-0" />}
                    {n.action && <span className="text-gray-300 text-xs mt-2 shrink-0">›</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Fixed 바텀 CTA — 특정 화면에서만 상주 */}
        {screen === "regionPicker" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <button onClick={() => goBack()}
                className="flex-1 bg-surface border border-line text-fg-secondary py-3.5 rounded-xl font-medium text-sm">이전</button>
              <button onClick={() => { setSelectedRegion(regionPickerDraft); goBack(); }}
                className="flex-[2] bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">적용</button>
            </div>
          </div>
        )}
        {screen === "detail" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <a href={`tel:${selectedStudio.phone}`} className="flex items-center justify-center w-14 h-12 bg-surface border border-line text-fg-secondary rounded-xl shrink-0">
                <PhoneSolid size={18} />
              </a>
              <button onClick={() => navigate("booking")} className="flex-1 bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">예약하기</button>
            </div>
          </div>
        )}
        {screen === "booking" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <button onClick={() => goBack()} className="flex-1 bg-surface border border-line text-fg-secondary py-3.5 rounded-xl font-medium text-sm">이전</button>
              <button onClick={() => navigate("done")} className="flex-[2] bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">{totalPrice.toLocaleString()}원 결제하기</button>
            </div>
          </div>
        )}
        {screen === "done" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <button onClick={() => { setScreen("myBookings"); setTab("mypage"); }} className="flex-1 bg-surface border border-line text-fg-secondary py-3.5 rounded-xl font-medium text-sm">예약 내역 확인</button>
              <button onClick={() => { setScreen("home"); setTab("home"); }} className="flex-1 bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">홈으로</button>
            </div>
          </div>
        )}
        {screen === "myReviews" && editingReviewIdx !== null && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <button onClick={() => setEditingReviewIdx(null)} className="flex-1 bg-surface-subtle text-fg-muted py-3.5 rounded-xl font-medium text-sm">취소</button>
              <button onClick={() => setEditingReviewIdx(null)} className="flex-[2] bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">수정 완료</button>
            </div>
          </div>
        )}
        {screen === "reviewWrite" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <button onClick={() => { setScreen("myBookings"); setTab("mypage"); }} className="w-full bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">리뷰 등록하기</button>
          </div>
        )}

        {/* 날짜/시간 선택 바텀시트 — 상세 화면에서 날짜 버튼 클릭 시 */}
        {screen === "detail" && dateSheetOpen && (
          <>
            <div className="absolute inset-0 bg-black/40 z-30" onClick={() => setDateSheetOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl z-40 max-h-[85%] overflow-y-auto">
              <div className="p-4 pb-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-10 h-1 bg-line rounded-full" />
                </div>
                <h3 className="text-base font-bold mb-4">날짜 · 시간 선택</h3>
                <p className="text-sm font-medium mb-2">날짜</p>
                <div className="bg-surface-muted rounded-xl p-3">
                  <p className="text-xs font-medium text-center mb-2">2026년 5월</p>
                  <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] text-fg-disabled mb-1">
                    {["일","월","화","수","목","금","토"].map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 text-center">
                    {Array.from({ length: 5 }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const isAvailable = [5, 10, 11, 13, 15, 18, 20, 25].includes(day);
                      return (
                        <button key={day} onClick={() => handleDateSelectInSheet(day)}
                          className={`py-1 rounded text-[11px] transition-all ${selectedDate === day ? (isAvailable ? "bg-action-primary text-fg-inverse font-bold" : "bg-gray-300 text-fg-muted font-bold") : isAvailable ? "bg-action-primary/10 text-fg-brand font-medium" : "text-fg-disabled hover:bg-surface-subtle"}`}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-2 text-[9px] text-fg-disabled">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-action-primary rounded-full" /> 선택됨</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-action-primary/20 rounded-full" /> 예약 가능</span>
                  </div>
                </div>
                <p className="text-sm font-medium mb-2 mt-4">시간</p>
                {(() => {
                  const isDateAvailable = selectedDate !== null && [5, 10, 11, 13, 15, 18, 20, 25].includes(selectedDate);
                  return (
                    <>
                      {!isDateAvailable && (
                        <p className="text-[10px] text-danger-solid mb-1.5">이 날짜는 예약이 어려워요. 다른 날짜를 골라주세요</p>
                      )}
                      <div className="grid grid-cols-4 gap-1.5">
                        {TIMES.map(t => {
                          const booked = BOOKED_TIMES.includes(t);
                          const disabled = !isDateAvailable || booked;
                          return (
                            <button key={t} onClick={() => !disabled && handleTimeSelectInSheet(t)} disabled={disabled}
                              className={`rounded-lg py-2 text-center text-xs transition-all ${disabled ? "bg-gray-200 text-gray-300 line-through cursor-not-allowed" : selectedTime === t ? "bg-action-primary text-fg-inverse font-bold" : "bg-surface-subtle text-fg-muted"}`}>{t}</button>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
                <button onClick={() => setDateSheetOpen(false)} className="w-full mt-5 bg-surface border border-line text-fg-secondary py-3.5 rounded-xl font-medium text-sm">닫기</button>
              </div>
            </div>
          </>
        )}

        {/* Bottom Tab — 1-depth(top-level) 화면에서만 노출 */}
        {showBottomNav && (
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-surface border-t border-line-subtle flex items-center z-10">
            {[
              { key: "home" as Tab, Icon: HomeSolid, label: "홈", s: "home" as Screen },
              { key: "category" as Tab, Icon: LayoutGridSolid, label: "카테고리", s: "category" as Screen },
              { key: "mypage" as Tab, Icon: UserSolid, label: "마이페이지", s: "mypage" as Screen },
            ].map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); setScreen(t.s); }}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${tab === t.key ? "text-fg-brand" : "text-fg-disabled"}`}>
                <t.Icon size={20} strokeWidth={1.5} />
                <span className="text-[10px]">{t.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
