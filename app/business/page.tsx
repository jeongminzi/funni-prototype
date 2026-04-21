"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PolicyForm from "../components/PolicyForm";
import {
  Camera, Dumbbell, Heart, Cake, Package, Video, MoreHorizontal,
  CameraSolid, DumbbellSolid, HeartSolid, RingSolid, CakeSolid, PackageSolid, ShoppingSolid, VideoSolid, MoreHorizontalSolid,
  Home, HomeSolid, LayoutGrid, LayoutGridSolid, User, UserSolid, Bell, Phone, PhoneSolid, MapPin, MapPinSolid, Calendar, CalendarSolid,
  DollarSign, BarChart3, Building2, Building2Solid, StoreSolid, CashStack, ImageIcon, X, Star, ChevronLeft, ChevronRight, ChevronDown, RotateCcw,
  AlertSolid, PencilSolid, MessageSolid, Check, Clock, Fire
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

type Screen = "home" | "category" | "detail" | "register" | "bookings" | "bookingDetail" | "settlement" | "notifications" | "studioView" | "mypage" | "bizSignup" | "approvalWaiting" | "dashboard" | "bizInfo" | "reviews" | "login" | "regionPicker";

// 2-depth 화면의 상단 네비바 타이틀
const SCREEN_TITLES: Partial<Record<Screen, string>> = {
  detail: "스튜디오 상세",
  register: "스튜디오 등록",
  bookings: "예약 관리",
  bookingDetail: "예약 상세",
  settlement: "정산",
  notifications: "알림",
  studioView: "스튜디오 보기",
  approvalWaiting: "승인 대기",
  dashboard: "대시보드",
  bizInfo: "업체 정보",
  reviews: "리뷰 관리",
  bizSignup: "업체 가입",
  regionPicker: "지역",
};
type BookingFilter = "전체" | "확정" | "취소요청" | "완료";
type Tab = "home" | "category" | "my";

// Studio browsing data — 소비자와 동일한 탐색 화면
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
  "프로필":     { label: "인기",   cls: "bg-badge-best-bg text-on-badge-best" },
  "바디프로필": { label: "HOT",    cls: "bg-badge-hot-bg text-on-badge-hot" },
  "웨딩":       { label: "신규",   cls: "bg-info-solid text-fg-inverse" },
  "영상":       { label: "-20%",   cls: "bg-badge-hot-bg text-on-badge-hot" },
};

const STUDIOS: { id: number; name: string; cat: string; cats: string[]; desc: string; area: string; price: number; rating: number; reviews: number; phone: string; vatIncluded: boolean }[] = [
  { id: 1, name: "루미에르 스튜디오", cat: "프로필", cats: ["프로필"], desc: "프로필촬영, 증명사진, 프로필영상", area: "서울 강남구", price: 50000, rating: 4.8, reviews: 124, phone: "02-1234-5678", vatIncluded: true },
  { id: 2, name: "선셋 포토랩", cat: "바디프로필", cats: ["바디프로필"], desc: "바디프로필, 커플촬영, 운동기록", area: "서울 성수동", price: 80000, rating: 4.9, reviews: 89, phone: "02-2345-6789", vatIncluded: false },
  { id: 3, name: "블룸 웨딩 스튜디오", cat: "웨딩", cats: ["웨딩"], desc: "웨딩스냅, 본식촬영, 야외웨딩", area: "서울 잠실", price: 200000, rating: 4.7, reviews: 56, phone: "02-3456-7890", vatIncluded: true },
  { id: 4, name: "미니미 키즈포토", cat: "돌잔치", cats: ["돌잔치"], desc: "돌잔치촬영, 백일사진, 가족사진", area: "경기 판교", price: 120000, rating: 4.6, reviews: 34, phone: "031-456-7890", vatIncluded: true },
  { id: 5, name: "프로덕트 랩", cat: "제품", cats: ["제품"], desc: "제품촬영, 음식사진, 상세페이지", area: "서울 홍대", price: 40000, rating: 4.5, reviews: 67, phone: "02-4567-8901", vatIncluded: false },
  { id: 6, name: "무브 필름랩", cat: "영상", cats: ["영상"], desc: "유튜브촬영, 광고영상, 인터뷰", area: "서울 합정", price: 60000, rating: 4.7, reviews: 45, phone: "02-5678-9012", vatIncluded: true },
];

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

const ALL_BOOKINGS: { id: number; month: number; date: number; name: string; cat: string; time: string; price: number; status: string; isManual?: boolean }[] = [
  { id: 1, month: 5, date: 10, name: "김철수", cat: "프로필", time: "10:00~12:00", price: 100000, status: "확정" },
  { id: 2, month: 5, date: 10, name: "이영희", cat: "바디프로필", time: "14:00~16:00", price: 160000, status: "확정" },
  { id: 3, month: 5, date: 10, name: "박지민", cat: "프로필", time: "17:00~19:00", price: 100000, status: "확정" },
  { id: 4, month: 5, date: 11, name: "최수현", cat: "프로필", time: "10:00~12:00", price: 100000, status: "취소요청" },
  { id: 5, month: 5, date: 11, name: "정다은", cat: "바디프로필", time: "13:00~15:00", price: 160000, status: "확정" },
  { id: 6, month: 5, date: 12, name: "한소희", cat: "프로필", time: "15:00~17:00", price: 100000, status: "완료" },
  { id: 7, month: 5, date: 13, name: "오진우", cat: "바디프로필", time: "10:00~13:00", price: 240000, status: "확정" },
  { id: 8, month: 5, date: 15, name: "윤서연", cat: "프로필", time: "11:00~13:00", price: 100000, status: "확정" },
  { id: 9, month: 5, date: 20, name: "강민지", cat: "바디프로필", time: "14:00~16:00", price: 160000, status: "취소요청" },
  { id: 10, month: 5, date: 25, name: "임재현", cat: "프로필", time: "16:00~18:00", price: 100000, status: "확정" },
  { id: 11, month: 4, date: 5, name: "송예진", cat: "프로필", time: "10:00~12:00", price: 100000, status: "완료" },
  { id: 12, month: 4, date: 12, name: "류현우", cat: "바디프로필", time: "14:00~16:00", price: 160000, status: "완료" },
  { id: 13, month: 4, date: 18, name: "장미래", cat: "웨딩", time: "10:00~14:00", price: 400000, status: "완료" },
];

const NOTIFICATIONS: { id: number; type: string; text: string; time: string; action?: { screen: Screen; filter?: BookingFilter } }[] = [
  { id: 1, type: "booking", text: "새 예약 요청 · 5/10 프로필 · 김철수님", time: "10분 전", action: { screen: "bookings", filter: "확정" } },
  { id: 2, type: "cancel", text: "최수현님이 5/11 예약 취소를 요청했어요", time: "30분 전", action: { screen: "bookings", filter: "취소요청" } },
  { id: 3, type: "review", text: "한소희님이 리뷰를 남겼어요 ★★★★★", time: "2시간 전", action: { screen: "reviews" } },
  { id: 4, type: "settlement", text: "4월 2주차 정산 450,000원을 입금했어요", time: "1일 전", action: { screen: "settlement" } },
  { id: 5, type: "booking", text: "새 예약 요청 · 5/13 바디프로필 · 오진우님", time: "2일 전", action: { screen: "bookings", filter: "확정" } },
];

const SETTLEMENTS = [
  { id: 1, date: "2026.04.10", period: "4월 2주차", count: 8, total: 680000, fee: "?%", net: "?", status: "완료" },
  { id: 2, date: "2026.04.03", period: "4월 1주차", count: 5, total: 450000, fee: "?%", net: "?", status: "완료" },
  { id: 3, date: "2026.03.27", period: "3월 4주차", count: 6, total: 520000, fee: "?%", net: "?", status: "완료" },
  { id: 4, date: "2026.03.20", period: "3월 3주차", count: 4, total: 320000, fee: "?%", net: "?", status: "완료" },
];

export default function BusinessApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [tab, setTab] = useState<Tab>("home");
  const [selectedCats, setSelectedCats] = useState<string[]>(["프로필", "바디프로필"]);
  const [calDate, setCalDate] = useState(10);
  const [calMonth, setCalMonth] = useState(5); // 1~12
  const [calYear, setCalYear] = useState(2026);
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("전체");
  const [selectedBooking, setSelectedBooking] = useState(ALL_BOOKINGS[0]);
  const [bookings, setBookings] = useState(ALL_BOOKINGS);
  const [registered, setRegistered] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const [settlementMonth, setSettlementMonth] = useState("4월");
  const [selectedStudio, setSelectedStudio] = useState(STUDIOS[0]);
  const [categoryCats, setCategoryCats] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [regionPickerTop, setRegionPickerTop] = useState("서울");
  const [regionPickerDraft, setRegionPickerDraft] = useState("전체");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [customPriceMin, setCustomPriceMin] = useState<string>("");
  const [customPriceMax, setCustomPriceMax] = useState<string>("");
  const [sort, setSort] = useState<"newest" | "rating" | "priceAsc">("newest");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const historyStack = useRef<{ s: Screen; t: Tab }[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const homeTrendingRef = useRef<HTMLDivElement>(null);
  const [homeChipBarVisible, setHomeChipBarVisible] = useState(false);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
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
    setPrevScreen(screen);
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
  const [adIdx, setAdIdx] = useState(0);
  const [hidePolicyAreas, setHidePolicyAreas] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualDate, setManualDate] = useState("");
  const [manualTime, setManualTime] = useState("");
  const [manualMemo, setManualMemo] = useState("");
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setAdIdx(prev => Math.min(prev + 1, 2));
    if (diff < -50) setAdIdx(prev => Math.max(prev - 1, 0));
  };

  // 홈: 지역 + 가격대 필터 + 정렬
  const homeFiltered = STUDIOS
    .filter(s => {
      if (selectedRegion === "전체" || !selectedRegion.trim()) return true;
      const kw = selectedRegion.trim().toLowerCase();
      return s.area.toLowerCase().includes(kw);
    })
    .filter(s => {
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
    return b.rating - a.rating;
  });

  // 카테고리 탭: 카테고리 + 지역 — 다중 선택, 배열 비면 전체
  const catFiltered = STUDIOS
    .filter(s => categoryCats.length === 0 || s.cats.some(c => categoryCats.includes(c)))
    .filter(s => {
      if (selectedRegion === "전체" || !selectedRegion.trim()) return true;
      const kw = selectedRegion.trim().toLowerCase();
      return s.area.toLowerCase().includes(kw);
    });

  const toggleCat = (c: string) => {
    setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const todayBookings = bookings.filter(b => b.month === 5 && b.date === 10 && b.status !== "완료");
  const monthBookings = bookings.filter(b => b.month === calMonth);
  const dateBookings = monthBookings.filter(b => b.date === calDate);
  const filteredBookings = bookingFilter === "전체" ? dateBookings : dateBookings.filter(b => b.status === bookingFilter);
  const datesWithBookings = [...new Set(monthBookings.map(b => b.date))];

  const totalRevenue = bookings.filter(b => b.status === "완료" || b.status === "확정").reduce((s, b) => s + b.price, 0);
  const pendingAmount = bookings.filter(b => b.status === "확정").reduce((s, b) => s + b.price, 0);

  const handleBookingAction = (id: number, action: "accept" | "reject") => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: action === "accept" ? "확정" : "취소완료" } : b));
    setScreen("bookings");
  };

  return (
    <div className="min-h-screen bg-surface-subtle flex flex-col items-center py-8 px-4">
      <Link href="/" className="text-sm text-fg-brand mb-4 hover:underline">← 메인으로</Link>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-fg">업체 화면</h2>
        <button onClick={() => setHidePolicyAreas(v => !v)}
          className="text-xs px-3 py-1.5 rounded-full bg-surface border border-line text-fg-secondary hover:bg-surface-muted">
          세부규칙 미확정 {hidePolicyAreas ? "보기" : "숨기기"}
        </button>
      </div>

      <div className={`w-[375px] bg-surface rounded-[40px] border-[8px] border-gray-900 overflow-hidden shadow-2xl relative ${hidePolicyAreas ? "hide-policy" : ""}`} style={{ height: 780 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-surface-inverse rounded-b-2xl z-20" />

        {/* Header — 1-depth: Funni 비즈니스 로고 + Bell, 2-depth: Back + 화면 타이틀 */}
        {screen !== "login" && (
          <div className="relative z-10 bg-surface pt-10 pl-2 pr-4 pb-2 border-b border-line-subtle">
            {(["home","category","mypage"] as Screen[]).includes(screen) ? (
              <div className="flex items-center justify-between h-12">
                <button onClick={() => { setScreen("home"); setTab("home"); }} className="flex items-center">
                  <img src="/funni-logo.png" alt="퍼니" className="w-12 h-12" />
                  <span className="text-xl font-bold text-fg -ml-1.5">퍼니</span>
                  <span className="text-fg-brand text-sm font-medium ml-1">비즈니스</span>
                </button>
                <button onClick={() => { navigate("notifications"); setHasNotif(false); }} className="relative text-fg-muted p-1">
                  <Bell size={20} strokeWidth={1.5} />
                  {hasNotif && <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-danger-solid rounded-full" />}
                </button>
              </div>
            ) : (
              <div className="flex items-center h-12">
                <button onClick={goBack} className="text-fg-secondary p-1 -ml-1">
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <h1 className="text-base font-bold text-fg ml-2">{SCREEN_TITLES[screen] ?? ""}</h1>
                {screen === "regionPicker" ? (
                  <button onClick={() => { setRegionPickerDraft("전체"); setRegionPickerTop("서울"); }}
                    className="ml-auto flex items-center gap-1 text-sm font-medium text-fg-muted">
                    <RotateCcw size={14} strokeWidth={2} /> 초기화
                  </button>
                ) : (
                  <button onClick={() => { setScreen("home"); setTab("home"); }} className="ml-auto text-fg-secondary p-1">
                    <HomeSolid size={22} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div ref={scrollContainerRef} className={`overflow-y-auto bg-surface ${screen === "regionPicker" ? "" : "pb-20"}`} style={{ height: screen === "login" ? "calc(780px - 28px)" : `calc(780px - 76px - ${(["home","category","mypage"] as Screen[]).includes(screen) ? 56 : 40}px)` }}>

          {/* ===== HOME (IA-010: 소비자와 동일한 스튜디오 탐색, 단 예약 불가) ===== */}
          {screen === "home" && (
            <div>
              {/* 업체 모드 안내 */}
              <div className="bg-action-primary/5 border-b border-line-brand/10 px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] text-fg-brand font-medium inline-flex items-center gap-1"><Building2Solid size={12} />업체 계정 · 스튜디오만 둘러볼 수 있어요</span>
                <button onClick={() => { navigate("dashboard"); setTab("my"); }} className="text-[10px] text-fg-brand underline">내 대시보드 →</button>
              </div>

              {/* 지역 picker — 최상단 */}
              <div className="px-4 pt-3 pb-1">
                <button onClick={() => { setRegionPickerDraft(selectedRegion); navigate("regionPicker"); }}
                  className="inline-flex items-center gap-1 text-fg">
                  <MapPinSolid size={16} className="text-fg-muted" />
                  <span className="text-[15px] font-bold">{selectedRegion === "전체" ? "전국" : selectedRegion}</span>
                  <ChevronDown size={14} strokeWidth={2} />
                </button>
              </div>

              {/* 프리미엄 광고 (REQ-112) */}
              <div className="policy-area mx-4 mt-6 p-2">
                <PolicyBadge label="광고 세부 규칙 미확정" />
                <div className="mt-1 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                  <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${adIdx * 100}%)` }}>
                    {STUDIOS.slice(0, 3).map((s, i) => (
                      <div key={i} onClick={() => { setSelectedStudio(s); navigate("detail"); }} className="min-w-full cursor-pointer">
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
              </div>

              {/* 카테고리 아이콘 그리드 */}
              <div className="px-4 my-8">
                <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                  {CATEGORIES.map(c => {
                    const badge = HOME_CAT_BADGES[c.name];
                    return (
                      <button key={c.name} onClick={() => { setCategoryCats(c.name === "전체" ? [] : [c.name]); setTab("category"); setScreen("category"); }}
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

              {/* 메인 배너 */}
              <BannerSlider />

              {/* 섹션 1: 이런 스튜디오는 어때요? */}
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {[...STUDIOS].sort((a, b) => b.rating - a.rating).slice(0, 6).map(s => (
                    <div key={s.id} onClick={() => { setSelectedStudio(s); navigate("detail"); }} className="cursor-pointer">
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

              {/* 섹션 2: 원하는 가격대로 찾아봐요 */}
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

              {/* Studio List — 2열 그리드 세로형 카드 */}
              <div className="px-4 pb-4">
                {homeSorted.length === 0 ? (
                  <div className="text-center py-12"><p className="text-fg-disabled text-sm">조건에 맞는 스튜디오가 없어요</p></div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {homeSorted.map(s => (
                      <div key={s.id} onClick={() => { setSelectedStudio(s); navigate("detail"); }} className="cursor-pointer">
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
              {/* 지역 picker — 홈과 동일 */}
              <div className="px-4 pt-3 pb-1">
                <button onClick={() => { setRegionPickerDraft(selectedRegion); navigate("regionPicker"); }}
                  className="inline-flex items-center gap-1 text-fg">
                  <MapPinSolid size={16} className="text-fg-muted" />
                  <span className="text-[15px] font-bold">{selectedRegion === "전체" ? "전국" : selectedRegion}</span>
                  <ChevronDown size={14} strokeWidth={2} />
                </button>
              </div>

              {/* 카테고리 칩 — 다중 선택, 스크롤해도 상단 고정 */}
              <div className="sticky top-0 z-[5] bg-surface px-4 pt-3 pb-3 border-b border-line-subtle">
                <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
                  {(() => {
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

              {/* 카테고리 정책 영역 */}
              <div className="policy-area mx-4 mt-3 mb-4 p-2">
                <PolicyBadge label="카테고리 목록 미확정" />
                <PolicyForm question="상세 카테고리 목록을 확정해주세요. (웨딩/프로필/피아노 등 대략적 방향만 논의됨)" screen="업체" area="카테고리 목록" />
              </div>

              <p className="px-4 mt-6 text-sm font-bold mb-3">&lsquo;{categoryCats.length === 0 ? "전체" : categoryCats.join(", ")}&rsquo; 스튜디오 <span className="text-fg-brand">{catFiltered.length}</span></p>

              {/* 카테고리 페이지 광고 배너 */}
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
                <div key={s.id} onClick={() => { setSelectedStudio(s); navigate("detail"); }}
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

          {/* ===== DETAIL (IA-012: 업체는 조회만, 예약 불가) ===== */}
          {screen === "detail" && (
            <div>
              <div className="h-52 bg-surface-subtle flex items-center justify-center text-fg-disabled">
                <ImageIcon size={56} strokeWidth={1} />
              </div>
              <div className="p-4 pb-4">
                <h2 className="text-lg font-bold mb-0.5">{selectedStudio.name}</h2>
                <p className="text-sm text-fg-secondary">{selectedStudio.area}</p>
                <div className="flex items-center gap-2 mt-1 mb-4">
                  <span className="text-sm text-star">★ {selectedStudio.rating}</span>
                  <span className="text-sm text-fg-secondary">리뷰 {selectedStudio.reviews}개</span>
                </div>

                <div className="bg-surface-muted rounded-xl p-4 mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">촬영 가격</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{selectedStudio.price.toLocaleString()}원</span>
                    <span className="text-xs text-fg-disabled">/ 시간 · {selectedStudio.vatIncluded ? "VAT 포함" : "VAT 별도"}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">포트폴리오</p>
                  <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-surface-subtle flex items-center justify-center text-gray-300"><ImageIcon size={20} strokeWidth={1} /></div>)}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-fg-muted mb-2 font-medium">리뷰</p>
                  <div className="space-y-2">
                    {[
                      { name: "김**", rating: 5, text: "분위기 너무 좋아요!", reply: "감사합니다! 다음에도 좋은 촬영 하겠습니다." },
                      { name: "이**", rating: 4, text: "시설이 깔끔해요", reply: null },
                    ].map((r, i) => (
                      <div key={i} className="bg-surface-muted rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1"><span className="text-xs font-medium">{r.name}</span><span className="text-xs text-star">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span></div>
                        <p className="text-xs text-fg-muted">{r.text}</p>
                        {r.reply && (
                          <div className="bg-surface rounded-lg p-2.5 mt-2 border border-line-subtle">
                            <p className="text-[10px] text-fg-brand font-medium mb-0.5">업체 답변</p>
                            <p className="text-xs text-fg-muted">{r.reply}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 업체 계정 예약 제한 (REQ-107) */}
                <div className="bg-warning-bg border border-warning-bg rounded-xl p-3 mb-3">
                  <p className="text-xs font-bold text-warning-fg inline-flex items-center gap-1"><Building2Solid size={12} />업체 계정 안내</p>
                  <p className="text-[10px] text-warning-fg mt-1">업체 계정은 스튜디오를 둘러보기만 할 수 있어요. 예약은 소비자 계정으로 해주세요</p>
                </div>
              </div>
            </div>
          )}

          {/* ===== DASHBOARD (IA-063 실적 대시보드) ===== */}
          {screen === "dashboard" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">실적 대시보드</h2>


              {/* Summary */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-action-primary/5 rounded-2xl p-3 border border-line-brand/10 text-center">
                  <p className="text-[10px] text-fg-muted mb-1">오늘 예약</p>
                  <p className="text-xl font-bold text-fg-brand">{todayBookings.length}<span className="text-[10px] font-normal ml-0.5">건</span></p>
                </div>
                <div className="bg-success-50 rounded-2xl p-3 border border-green-100 text-center overflow-hidden">
                  <p className="text-[10px] text-fg-muted mb-1">이번 달</p>
                  <p className="text-sm font-bold text-success-600 truncate">{(totalRevenue / 10000).toFixed(0)}<span className="text-[10px] font-normal">만원</span></p>
                </div>
                <button onClick={() => { navigate("bookings"); setBookingFilter("취소요청"); }}
                  className="bg-danger-50 rounded-2xl p-3 border border-red-100 text-center">
                  <p className="text-[10px] text-fg-muted mb-1">취소 요청</p>
                  <p className="text-xl font-bold text-danger-solid">{bookings.filter(b => b.status === "취소요청").length}<span className="text-[10px] font-normal ml-0.5">건</span></p>
                </button>
              </div>

              {/* 월별 통계 */}
              <div className="bg-surface-muted rounded-xl p-4 mb-4">
                <p className="text-xs font-bold mb-3">월별 실적</p>
                <div className="space-y-2">
                  {[{m: "2026.05", bk: 12, rv: 1400000, rating: 4.8}, {m: "2026.04", bk: 18, rv: 2200000, rating: 4.7}, {m: "2026.03", bk: 15, rv: 1800000, rating: 4.6}].map((s, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-line-subtle last:border-0">
                      <span className="text-xs text-fg-muted">{s.m}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span>{s.bk}건</span>
                        <span className="font-bold">{(s.rv / 10000).toFixed(0)}만</span>
                        <span className="text-star">★ {s.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-bold text-sm mb-3">오늘의 예약</h3>
              {todayBookings.length === 0 ? (
                <div className="text-center py-8 bg-surface-muted rounded-xl mb-4"><p className="text-sm text-fg-disabled">오늘은 예약이 없어요</p></div>
              ) : todayBookings.map(b => (
                <button key={b.id} onClick={() => { setSelectedBooking(b); navigate("bookingDetail"); }}
                  className="w-full flex items-center gap-3 p-3 bg-surface-muted rounded-xl mb-2 text-left">
                  <div className="w-11 h-11 bg-action-primary/10 rounded-full flex items-center justify-center text-fg-brand"><Camera size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{b.name}</p>
                    <p className="text-xs text-fg-disabled">{b.cat} · {b.time}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${b.status === "취소요청" ? "bg-danger-bg text-danger-fg" : "bg-success-bg text-success-fg"}`}>{b.status}</span>
                    <p className="text-xs font-bold mt-1">{b.price.toLocaleString()}원</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ===== BIZ INFO (IA-065 업체 기본정보 수정) ===== */}
          {screen === "bizInfo" && (
            <div className="p-4 pb-28">
              <h2 className="text-base font-bold mb-4">업체 기본정보 수정</h2>
              <div className="space-y-3">
                <div><p className="text-xs text-fg-muted mb-1">업체명</p><input type="text" defaultValue="루미에르 스튜디오" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">대표자명</p><input type="text" defaultValue="김사장" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">사업자등록번호</p><input type="text" defaultValue="123-45-67890" disabled className="w-full bg-surface-subtle rounded-xl px-4 py-2.5 text-sm outline-none border border-line text-fg-muted" /></div>
                <div><p className="text-xs text-fg-muted mb-1">연락처</p><input type="tel" defaultValue="02-1234-5678" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">이메일</p><input type="email" defaultValue="lumiere@example.com" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
              </div>
            </div>
          )}

          {/* ===== NOTIFICATIONS ===== */}
          {screen === "notifications" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">알림</h2>
              {NOTIFICATIONS.map(n => (
                <button key={n.id} onClick={() => {
                  if (!n.action) return;
                  if (n.action.filter) setBookingFilter(n.action.filter);
                  navigate(n.action.screen);
                  setTab("my");
                }}
                  className="flex gap-3 py-3 border-b border-line-subtle w-full text-left hover:bg-surface-muted cursor-pointer">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    n.type === "booking" ? "bg-surface-brand-soft text-fg-brand" : n.type === "cancel" ? "bg-danger-bg text-danger-solid" : n.type === "review" ? "bg-warning-bg text-star" : "bg-success-bg text-success-fg"
                  }`}>
                    {n.type === "booking" ? <Calendar size={16} strokeWidth={1.5} /> : n.type === "cancel" ? <X size={16} strokeWidth={1.5} /> : n.type === "review" ? <Star size={16} strokeWidth={1.5} /> : <DollarSign size={16} strokeWidth={1.5} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-fg-secondary">{n.text}</p>
                    <p className="text-[10px] text-fg-disabled mt-0.5">{n.time}</p>
                  </div>
                  <span className="text-fg-disabled text-xs mt-2 shrink-0">›</span>
                </button>
              ))}
            </div>
          )}

          {/* ===== STUDIO REGISTER ===== */}
          {screen === "register" && !registered && (
            <div className="p-4 pb-28">
              <h2 className="text-base font-bold mb-4">스튜디오 등록</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-fg-muted mb-1.5 block font-medium">스튜디오 이름</label>
                  <input type="text" defaultValue="루미에르 스튜디오" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm border border-line-subtle outline-none focus:border-line-brand" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1.5 block font-medium">주소</label>
                  <input type="text" defaultValue="서울시 강남구 역삼동 123-4" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm border border-line-subtle outline-none focus:border-line-brand" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1.5 block font-medium">연락처</label>
                  <input type="text" defaultValue="02-1234-5678" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm border border-line-subtle outline-none focus:border-line-brand" />
                </div>

                {/* Categories - Toggle */}
                <div className="policy-area p-3">
                  <PolicyBadge label="카테고리 목록 미확정" />
                  <label className="text-xs text-fg-muted mb-1.5 block font-medium mt-1">카테고리 (복수 선택)</label>
                  <div className="flex flex-wrap gap-2">
                    {["프로필", "바디프로필", "웨딩", "돌잔치", "제품", "영상"].map(c => (
                      <button key={c} onClick={() => toggleCat(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedCats.includes(c) ? "bg-action-primary text-fg-inverse border-line-brand" : "bg-surface text-fg-disabled border-line"
                        }`}>
                        {selectedCats.includes(c) ? "✓ " : ""}{c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Per-Category Price */}
                {selectedCats.length > 0 && (
                  <div>
                    <label className="text-xs text-fg-muted mb-1.5 block font-medium">카테고리별 가격 · 설명</label>
                    {selectedCats.map((c, i) => (
                      <div key={c} className="bg-action-primary/5 rounded-xl p-3 mb-2 border border-line-brand/10">
                        <p className="text-sm font-bold text-fg mb-2">{c} 촬영</p>
                        <input type="text" defaultValue={`${(i + 1) * 30000 + 20000}원 / 시간`}
                          className="w-full bg-surface rounded-lg px-3 py-2 text-sm border border-line-subtle mb-1.5 outline-none focus:border-line-brand" />
                        <input type="text" placeholder={`${c} 촬영을 소개해주세요`}
                          className="w-full bg-surface rounded-lg px-3 py-2 text-xs border border-line-subtle outline-none focus:border-line-brand text-fg-muted" />
                      </div>
                    ))}
                  </div>
                )}

                {/* 카테고리별 포트폴리오 업로드 (REQ-103 / IA-060) */}
                <div>
                  <label className="text-xs text-fg-muted mb-1.5 block font-medium">카테고리별 포트폴리오 (카테고리당 사진 최대 30장, 동영상은 올릴 수 없어요)</label>
                  {selectedCats.length === 0 ? (
                    <div className="bg-surface-muted rounded-xl p-4 text-center">
                      <p className="text-xs text-fg-disabled">카테고리를 먼저 골라주세요</p>
                    </div>
                  ) : selectedCats.map((c, catIdx) => (
                    <div key={c} className="bg-surface-muted rounded-xl p-3 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold">{c} 포트폴리오</p>
                        <span className="text-[10px] text-fg-disabled">{catIdx === 0 ? 6 : catIdx === 1 ? 4 : 0} / 30장</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(() => {
                          const count = catIdx === 0 ? 6 : catIdx === 1 ? 4 : 0;
                          return Array.from({ length: Math.min(count + 1, 10) }).map((_, i) => (
                            <div key={i} className={`aspect-square rounded-lg flex items-center justify-center ${
                              i < count ? "bg-surface-subtle" : "bg-surface border-2 border-dashed border-line-strong text-fg-disabled text-lg cursor-pointer hover:border-line-brand hover:text-fg-brand-strong"
                            }`}>
                              {i >= count && "+"}
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 헤어/메이크업 옵션 3종 (REQ-103) */}
                <div className="bg-surface-muted rounded-xl p-3">
                  <p className="text-xs text-fg-muted font-medium mb-2">헤어 / 메이크업 옵션 설정</p>
                  {[
                    { name: "헤어 메이크업", defaultPrice: "30,000" },
                    { name: "얼굴 메이크업", defaultPrice: "50,000" },
                    { name: "세트 (헤어+얼굴)", defaultPrice: "70,000" },
                  ].map((opt, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 accent-action-primary" />
                      <span className="text-xs flex-1">{opt.name}</span>
                      <input type="text" defaultValue={`${opt.defaultPrice}원`} className="w-24 bg-surface rounded-lg px-2 py-1.5 text-xs border border-line text-right outline-none" />
                    </div>
                  ))}
                </div>

                {/* 출장 가능 + 부가세 (REQ-103) */}
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 bg-surface-muted rounded-xl px-4 py-3 flex-1 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-action-primary" />
                    <span className="text-xs">🚗 출장 가능</span>
                  </label>
                  <label className="flex items-center gap-2 bg-surface-muted rounded-xl px-4 py-3 flex-1 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-action-primary" />
                    <span className="text-xs">VAT 포함</span>
                  </label>
                </div>

                {/* Schedule */}
                <div className="policy-area p-3">
                  <PolicyBadge label="예약 단위 미확정" />
                  <p className="text-xs font-medium text-fg-secondary mt-1 mb-2">운영 시간 설정</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-surface rounded-lg px-3 py-2.5 text-sm text-center border border-line-subtle">09:00 시작</div>
                    <div className="bg-surface rounded-lg px-3 py-2.5 text-sm text-center border border-line-subtle">22:00 종료</div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-fg-secondary mb-1">휴무일</p>
                    <div className="flex gap-1.5">
                      {["월","화","수","목","금","토","일"].map((d, i) => (
                        <button key={d} className={`w-9 h-9 rounded-lg text-xs font-medium ${
                          i === 0 ? "bg-danger-bg text-danger-600" : "bg-surface-subtle text-fg-muted"
                        }`}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-warning-fg mt-2">예약 단위 · 최소 시간 · 버퍼 → 미확정</p>
                </div>

              </div>
            </div>
          )}

          {/* Studio Registered */}
          {screen === "register" && registered && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold">내 스튜디오</h2>
                <button onClick={() => setRegistered(false)} className="text-xs text-fg-brand font-medium">수정하기</button>
              </div>

              <div className="bg-surface-subtle rounded-2xl h-40 flex items-center justify-center text-fg-disabled mb-4"><ImageIcon size={48} strokeWidth={1} /></div>

              <h3 className="text-lg font-bold mb-1">루미에르 스튜디오</h3>
              <p className="text-xs text-fg-disabled mb-3">서울시 강남구 역삼동 123-4</p>

              <div className="flex gap-2 mb-4">
                {selectedCats.map(c => (
                  <span key={c} className="text-xs bg-action-primary/10 text-fg-brand px-2.5 py-1 rounded-full font-medium">{c}</span>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                {selectedCats.map((c, i) => (
                  <div key={c} className="flex justify-between items-center bg-surface-muted rounded-xl p-3">
                    <span className="text-sm">{c} 촬영</span>
                    <span className="text-sm font-bold">{((i + 1) * 30000 + 20000).toLocaleString()}원 / 시간</span>
                  </div>
                ))}
              </div>

              <div className="bg-surface-muted rounded-xl p-3 mb-4">
                <p className="text-xs text-fg-muted mb-2">포트폴리오</p>
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-surface-subtle rounded-lg" />
                  ))}
                </div>
                <p className="text-[10px] text-fg-disabled mt-1">6 / 30장</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-action-primary/5 rounded-xl p-3 text-center border border-line-brand/10">
                  <p className="text-[10px] text-fg-muted">총 예약</p>
                  <p className="text-lg font-bold text-fg-brand">{bookings.length}건</p>
                </div>
                <div className="bg-warning-bg rounded-xl p-3 text-center border border-warning-bg">
                  <p className="text-[10px] text-fg-muted">평균 평점</p>
                  <p className="text-lg font-bold text-star">4.8 ★</p>
                </div>
              </div>
            </div>
          )}

          {screen === "studioView" && (
            <div />
          )}

          {/* ===== BOOKINGS ===== */}
          {screen === "bookings" && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold">예약 관리</h2>
                <button onClick={() => setShowManualModal(true)}
                  className="flex items-center gap-1 bg-brand-bg text-brand-fg px-3 py-1.5 rounded-full text-[10px] font-medium">
                  <PencilSolid size={10} />수기 일정 추가
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2 mb-3">
                {(["전체", "확정", "취소요청", "완료"] as BookingFilter[]).map(f => (
                  <button key={f} onClick={() => setBookingFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      bookingFilter === f ? "bg-action-primary text-fg-inverse" : "bg-surface-subtle text-fg-muted"
                    }`}>
                    {f} {f !== "전체" && <span className="ml-0.5">{bookings.filter(b => b.date === calDate && b.status === f).length}</span>}
                  </button>
                ))}
              </div>

              {/* Calendar */}
              <div className="bg-surface-muted rounded-xl p-3 mb-4 border border-line-subtle">
                <div className="flex justify-between items-center mb-2">
                  <button onClick={() => { if (calMonth === 1) { setCalMonth(12); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); setCalDate(1); }}
                    className="w-7 h-7 rounded-full bg-surface border border-line flex items-center justify-center text-fg-muted text-sm">‹</button>
                  <span className="text-sm font-medium">{calYear}년 {calMonth}월</span>
                  <button onClick={() => { if (calMonth === 12) { setCalMonth(1); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); setCalDate(1); }}
                    className="w-7 h-7 rounded-full bg-surface border border-line flex items-center justify-center text-fg-muted text-sm">›</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                  {["일", "월", "화", "수", "목", "금", "토"].map(d => <span key={d} className="text-fg-disabled py-1">{d}</span>)}
                  {/* 첫째 날 요일 오프셋 */}
                  {Array.from({ length: new Date(calYear, calMonth - 1, 1).getDay() }).map((_, i) => <span key={`empty-${i}`} />)}
                  {Array.from({ length: new Date(calYear, calMonth, 0).getDate() }).map((_, i) => {
                    const d = i + 1;
                    const hasBooking = calMonth === 5 && calYear === 2026 && datesWithBookings.includes(d);
                    const isSelected = calDate === d;
                    return (
                      <button key={i} onClick={() => setCalDate(d)}
                        className={`py-1 rounded-lg relative transition-all ${
                          isSelected ? "bg-action-primary text-fg-inverse font-bold" :
                          hasBooking ? "bg-action-primary/10 text-fg-brand font-medium" : "text-fg-muted hover:bg-surface-subtle"
                        }`}>
                        {d}
                        {hasBooking && !isSelected && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-action-primary rounded-full" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Bookings */}
              <p className="text-xs text-fg-muted mb-2 font-medium">{calMonth}월 {calDate}일 예약 ({filteredBookings.length}건)</p>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-8 bg-surface-muted rounded-xl">
                  <p className="text-sm text-fg-disabled">이 날짜에는 예약이 없어요</p>
                </div>
              ) : (
                <div>
                  {bookingFilter === "취소요청" && (
                    <div className="policy-area p-2 mb-2">
                      <PolicyBadge label="취소/환불 정책 미확정" />
                      <p className="text-[10px] text-warning-fg mt-1">→ 소비자 화면 &gt; 내 예약에 질문으로 표기</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    {filteredBookings.map(b => (
                      <button key={b.id} onClick={() => { setSelectedBooking(b); navigate("bookingDetail"); }}
                        className="w-full bg-surface-muted rounded-xl p-3 border border-line-subtle flex justify-between items-center text-left">
                        <div>
                          <p className="text-sm font-medium">{b.name}</p>
                          <p className="text-xs text-fg-disabled">{b.cat} · {b.time}</p>
                          <p className="text-xs font-bold mt-0.5">{b.price.toLocaleString()}원</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                            b.status === "취소요청" ? "bg-danger-bg text-danger-fg" :
                            b.status === "완료" ? "bg-surface-subtle text-fg-muted" :
                            b.status === "취소완료" ? "bg-surface-subtle text-fg-disabled" :
                            b.status === "수기" ? "bg-warning-bg text-warning-fg" :
                            "bg-success-bg text-success-fg"
                          }`}>{b.status}</span>
                          <span className="text-xs text-fg-disabled">›</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== BOOKING DETAIL ===== */}
          {screen === "bookingDetail" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">예약 상세</h2>

              <div className="bg-surface-muted rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-action-primary/10 rounded-full flex items-center justify-center text-xl">👤</div>
                  <div>
                    <p className="text-base font-bold">{selectedBooking.name}</p>
                    <p className="text-xs text-fg-disabled">고객</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-fg-muted">촬영 종류</span>
                    <span className="font-medium">{selectedBooking.cat}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-fg-muted">날짜</span>
                    <span className="font-medium">2026.05.{selectedBooking.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-fg-muted">시간</span>
                    <span className="font-medium">{selectedBooking.time}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-line pt-2">
                    <span className="text-fg-muted">금액</span>
                    <span className="font-bold text-fg-brand">{selectedBooking.price.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-fg-muted">상태</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      selectedBooking.status === "취소요청" ? "bg-danger-bg text-danger-fg" :
                      selectedBooking.status === "완료" ? "bg-surface-subtle text-fg-muted" :
                      "bg-success-bg text-success-fg"
                    }`}>{selectedBooking.status}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.status === "취소요청" && (
                <div className="policy-area p-3 mb-4">
                  <PolicyBadge label="취소/환불 정책 미확정" />
                  <p className="text-sm font-medium mt-2 mb-2 text-danger-fg">예약자가 취소를 요청했어요</p>
                  <p className="text-[10px] text-warning-fg mt-1">→ 소비자 화면 &gt; 내 예약에 질문으로 표기</p>
                </div>
              )}

            </div>
          )}

          {/* ===== MY PAGE (업체) ===== */}
          {screen === "mypage" && (
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-brand-bg rounded-full flex items-center justify-center text-fg-brand"><Building2Solid size={28} /></div>
                <div>
                  <p className="font-bold">루미에르 스튜디오</p>
                  <p className="text-xs text-fg-disabled">김사장님</p>
                  <div className="flex gap-1.5 mt-1">
                    <span className="text-[10px] bg-action-primary/10 text-fg-brand px-2 py-0.5 rounded-full font-medium">업체 모드</span>
                  </div>
                </div>
              </div>

              {/* Quick Menu — 업체 마이페이지 전용 메뉴 (IA Group 07) */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button onClick={() => { navigate("register"); }}
                  className="bg-surface-muted rounded-xl p-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center text-sky-500">
                    <StoreSolid size={20} />
                  </div>
                  <p className="text-sm font-medium mt-2">내 스튜디오 관리</p>
                  <p className="text-[10px] text-fg-disabled">등록·수정·삭제</p>
                </button>
                <button onClick={() => { navigate("bookings"); }}
                  className="bg-surface-muted rounded-xl p-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center text-emerald-500">
                    <CalendarSolid size={20} />
                  </div>
                  <p className="text-sm font-medium mt-2">내 예약 달력</p>
                  <p className="text-[10px] text-fg-disabled">예약·수기 일정</p>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button onClick={() => navigate("bizInfo")}
                  className="bg-surface-muted rounded-xl p-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center text-violet-500">
                    <Building2Solid size={20} />
                  </div>
                  <p className="text-sm font-medium mt-2">업체 기본정보</p>
                  <p className="text-[10px] text-fg-disabled">기본정보 수정</p>
                </button>
                <button onClick={() => navigate("settlement")}
                  className="bg-surface-muted rounded-xl p-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center text-yellow-500">
                    <CashStack size={20} />
                  </div>
                  <p className="text-sm font-medium mt-2">정산 내역</p>
                  <p className="text-[10px] text-fg-disabled">월별 정산</p>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 mb-4">
                <button onClick={() => navigate("dashboard")}
                  className="bg-surface-muted rounded-xl p-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center text-red-500">
                    <BarChart3 size={20} />
                  </div>
                  <p className="text-sm font-medium mt-2">실적 대시보드</p>
                  <p className="text-[10px] text-fg-disabled">월별 예약·매출</p>
                </button>
              </div>

              {/* 업체 마이페이지 미확정 사항 — IA/명세서 기반 */}
              <div className="policy-area p-3 mb-4">
                <PolicyBadge label="업체 마이페이지 정책 미확정" />
                <PolicyForm question="업체 계정 정지/해제 기준은? (위반 사항, 재활성화 절차)" screen="업체" area="계정 정지 기준" />
                <p className="text-[10px] text-warning-fg mt-1">• 입점 심사 → 어드민 웹 &gt; 업체 관리에 질문으로 표기</p>
                <p className="text-[10px] text-warning-fg">• 취소/환불 → 소비자 화면 &gt; 내 예약에 질문으로 표기</p>
                <p className="text-[10px] text-warning-fg">• 정산 주기 → 업체 화면 &gt; 정산 내역에 질문으로 표기</p>
              </div>

              <div className="space-y-0">
                {[
                  { label: "리뷰 관리", action: () => navigate("reviews") },
                  { label: "고객센터", action: () => {} },
                  { label: "로그아웃", action: () => setScreen("login") },
                ].map(m => (
                  <button key={m.label} onClick={m.action}
                    className="flex justify-between items-center py-3.5 border-b border-line-subtle w-full text-left">
                    <span className="text-sm">{m.label}</span>
                    <span className="text-fg-disabled text-xs">›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== SETTLEMENT ===== */}
          {screen === "settlement" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">정산 내역</h2>

              {/* Period Filter */}
              <div className="flex gap-2 mb-4">
                {["전체", "4월", "3월"].map(m => (
                  <button key={m} onClick={() => setSettlementMonth(m)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      settlementMonth === m ? "bg-action-primary text-fg-inverse" : "bg-surface-subtle text-fg-muted"
                    }`}>{m}</button>
                ))}
              </div>

              <div className="policy-area p-3 mb-4">
                <PolicyBadge label="정산 세부 규칙 미확정" />
                <PolicyForm question="월 정산 기준일은? (매월 1일 / 마지막주 / 기타)" screen="업체" area="월 정산 기준일" />
                <PolicyForm question="최소 정산 금액은? (N원 미만 시 이월?)" screen="업체" area="최소 정산 금액" />
                <div className="mt-2 bg-surface rounded-xl p-4 border border-line-subtle">
                  <p className="text-xs text-fg-muted">{settlementMonth === "전체" ? "전체 정산금" : "이번달 금액"}</p>
                  <p className="text-2xl font-bold text-fg-brand mt-0.5">{pendingAmount.toLocaleString()}원</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-surface-muted rounded-lg p-2"><span className="text-fg-disabled">수수료율</span><br/><span className="text-warning-fg font-medium">어드민 설정 (?%)</span></div>
                    <div className="bg-surface-muted rounded-lg p-2"><span className="text-fg-disabled">차감 방식</span><br/><span className="text-warning-fg font-medium">자동 vs 수동 → 미확정</span></div>
                    <div className="bg-surface-muted rounded-lg p-2"><span className="text-fg-disabled">정산 단위</span><br/><span className="text-warning-fg font-medium">건별 vs 일괄 → 미확정</span></div>
                    <div className="bg-surface-muted rounded-lg p-2"><span className="text-fg-disabled">환불 후 처리</span><br/><span className="text-warning-fg font-medium">차감 vs 별도 → 미확정</span></div>
                  </div>
                </div>
              </div>

              <h3 className="text-xs font-medium text-fg-muted mb-2">정산 기록</h3>
              {SETTLEMENTS
                .filter(s => settlementMonth === "전체" || s.period.includes(settlementMonth))
                .map(s => (
                <div key={s.id} className="bg-surface rounded-xl p-4 border border-line-subtle mb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium">{s.period}</p>
                      <p className="text-[10px] text-fg-disabled">{s.date} · {s.count}건</p>
                    </div>
                    <span className="text-[10px] bg-success-bg text-success-fg px-2 py-0.5 rounded-full font-medium">{s.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-fg-disabled">
                      총 {s.total.toLocaleString()}원 → 수수료 {s.fee}
                    </div>
                    <p className="text-sm font-bold text-warning-fg">정산액 {s.net}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== REVIEWS (REQ-111 업체 리뷰 답변) ===== */}
          {screen === "reviews" && (
            <div className="p-4">
              <h2 className="text-base font-bold mb-4">리뷰 관리</h2>

              {[
                { author: "김**", rating: 5, text: "분위기 너무 좋아요! 사진 결과물도 만족합니다", date: "2026.04.10", replied: true, reply: "감사합니다! 다음에도 좋은 촬영 하겠습니다." },
                { author: "이**", rating: 4, text: "접근성이 좋고 시설이 깔끔해요", date: "2026.04.08", replied: false },
                { author: "한**", rating: 5, text: "결과물 퀄리티가 정말 좋습니다. 재방문 예정!", date: "2026.03.28", replied: true, reply: "좋은 리뷰 감사합니다! 또 뵙겠습니다." },
                { author: "박**", rating: 3, text: "가격 대비 보통이었어요", date: "2026.03.20", replied: false },
              ].map((r, i) => (
                <div key={i} className="bg-surface-muted rounded-xl p-4 mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-medium">{r.author}</span>
                      <span className="text-xs text-star ml-2">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    </div>
                    <span className="text-[10px] text-fg-disabled">{r.date}</span>
                  </div>
                  <p className="text-xs text-fg-muted mb-2">{r.text}</p>
                  {r.replied && r.reply ? (
                    <div className="bg-surface rounded-lg p-2.5 border border-line-subtle">
                      <p className="text-[10px] text-fg-brand font-medium mb-1">업체 답변</p>
                      <p className="text-xs text-fg-muted">{r.reply}</p>
                    </div>
                  ) : (
                    <button className="w-full bg-surface border border-line rounded-lg py-2 text-xs text-fg-muted hover:border-line-brand hover:text-fg-brand-strong transition-all">
                      답글 작성
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ===== LOGIN (IA-003: 소비자/업체 공용) ===== */}
          {screen === "login" && (
            <div className="p-6 pt-16 flex flex-col items-center">
              <img src="/funni-logo.png" alt="퍼니" className="w-20 h-20 mb-3" />
              <p className="text-3xl font-bold text-fg-brand mb-1">퍼니</p>
              <p className="text-xs text-fg-disabled mb-10">스튜디오 대관·예약 플랫폼</p>

              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-[#FEE500] text-[#191919] py-3 rounded-xl font-bold text-sm mb-2 flex items-center justify-center gap-2">카카오로 로그인</button>
              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-[#03C75A] text-fg-inverse py-3 rounded-xl font-bold text-sm mb-6 flex items-center justify-center gap-2">네이버로 로그인</button>

              <div className="flex items-center gap-4 w-full mb-6">
                <div className="flex-1 h-px bg-line" /><span className="text-xs text-fg-disabled">또는</span><div className="flex-1 h-px bg-line" />
              </div>

              <input type="email" placeholder="이메일" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line mb-2" />
              <input type="password" placeholder="비밀번호" className="w-full bg-surface-muted rounded-xl px-4 py-3 text-sm outline-none border border-line mb-4" />
              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-action-primary text-fg-inverse py-3 rounded-xl font-bold text-sm mb-4">로그인</button>

              <div className="flex items-center gap-4 text-xs text-fg-disabled mb-6">
                <button onClick={() => navigate("bizSignup")}>업체 회원가입</button>
                <span>|</span>
                <button>비밀번호 찾기</button>
              </div>

              <p className="text-[10px] text-fg-disabled text-center">소비자 계정은 소비자용 앱에서 따로 가입해주세요.<br />같은 사람도 소비자와 업체 계정을 각각 만들어야 해요</p>
            </div>
          )}

          {/* ===== BIZ SIGNUP (IA-002) ===== */}
          {screen === "bizSignup" && (
            <div className="p-4 pb-28">
              <h2 className="text-base font-bold mb-1">업체 회원가입</h2>
              <p className="text-xs text-fg-disabled mb-6">사업자 계정 · 심사가 끝나면 쓸 수 있어요</p>

              <div className="space-y-3 mb-4">
                <div><p className="text-xs text-fg-muted mb-1">사업자등록번호</p><input type="text" placeholder="000-00-00000" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">대표자명</p><input type="text" placeholder="홍길동" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">상호명</p><input type="text" placeholder="스튜디오명" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
                <div><p className="text-xs text-fg-muted mb-1">연락처</p><input type="tel" placeholder="02-0000-0000" className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" /></div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-fg-muted mb-2">포트폴리오 사진 업로드 (최대 30장)</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-surface-subtle rounded-xl flex items-center justify-center border-2 border-dashed border-line-strong"><span className="text-xl text-fg-disabled">+</span></div>
                  {[1,2,3].map(i => <div key={i} className="aspect-square bg-surface-subtle rounded-xl" />)}
                </div>
                <p className="text-[10px] text-fg-disabled mt-1">사진만 올릴 수 있어요 (동영상 제외)</p>
              </div>

            </div>
          )}

          {/* ===== APPROVAL WAITING ===== */}
          {screen === "approvalWaiting" && (
            <div className="p-6 flex flex-col items-center justify-center" style={{ minHeight: 450 }}>
              <div className="w-20 h-20 bg-warning-bg rounded-full flex items-center justify-center text-warning-fg mb-4"><Clock size={40} strokeWidth={1.5} /></div>
              <h2 className="text-lg font-bold mb-2">심사하고 있어요</h2>
              <p className="text-sm text-fg-muted text-center mb-6">보내주신 정보를 살펴보고 있어요</p>

              <div className="bg-warning-bg border border-warning-bg rounded-xl p-4 w-full mb-6">
                <p className="text-xs font-bold text-warning-fg mb-2">심사 안내</p>
                <div className="space-y-1.5 text-[10px] text-warning-fg">
                  <p>• 사업자등록번호와 포트폴리오를 확인해요</p>
                  <p>• 영업일 기준으로 1~3일 걸려요</p>
                  <p>• 결과는 가입한 이메일로 알려드려요</p>
                  <p>• 심사가 끝나면 스튜디오를 등록할 수 있어요</p>
                </div>
              </div>

              <button onClick={() => { setScreen("home"); setTab("home"); }} className="w-full bg-action-primary text-fg-inverse py-3 rounded-xl font-bold text-sm">홈으로 돌아가기</button>
            </div>
          )}
        </div>

        {/* ===== 수기 일정 추가 모달 (IA-062 / REQ-104) ===== */}
        {showManualModal && (
          <div className="absolute inset-0 bg-black/50 z-30 flex items-end">
            <div className="w-full bg-surface rounded-t-3xl p-5 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold">수기 일정 추가</h3>
                <button onClick={() => setShowManualModal(false)} className="text-fg-disabled text-xl">✕</button>
              </div>
              <p className="text-[10px] text-fg-disabled mb-4">앱 밖에서 받은 예약을 달력에 직접 추가해요</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">날짜</label>
                  <input type="date" value={manualDate} onChange={e => setManualDate(e.target.value)}
                    className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">시간</label>
                  <input type="time" value={manualTime} onChange={e => setManualTime(e.target.value)}
                    className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">메모</label>
                  <textarea value={manualMemo} onChange={e => setManualMemo(e.target.value)}
                    placeholder="예약자명, 연락처, 특이사항 등" rows={3}
                    className="w-full bg-surface-muted rounded-xl px-4 py-2.5 text-sm outline-none border border-line resize-none" />
                </div>
              </div>
              <button onClick={() => {
                if (!manualDate || !manualTime) { alert("날짜와 시간을 입력해주세요"); return; }
                const d = new Date(manualDate);
                const newBooking = {
                  id: Date.now(),
                  month: d.getMonth() + 1,
                  date: d.getDate(),
                  name: manualMemo.split(/[,\s]/)[0] || "수기 일정",
                  cat: "수기",
                  time: manualTime + "~",
                  price: 0,
                  status: "수기",
                  isManual: true,
                };
                setBookings(prev => [...prev, newBooking]);
                setCalMonth(d.getMonth() + 1);
                setCalYear(d.getFullYear());
                setCalDate(d.getDate());
                setShowManualModal(false); setManualDate(""); setManualTime(""); setManualMemo("");
              }}
                className="w-full bg-action-primary text-fg-inverse py-3 rounded-xl font-bold text-sm mt-4">일정 추가</button>
            </div>
          </div>
        )}

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
              <button disabled className="flex-1 bg-surface-subtle text-fg-disabled py-3.5 rounded-xl font-bold text-sm cursor-not-allowed">예약은 소비자 계정에서 가능해요</button>
            </div>
          </div>
        )}
        {screen === "register" && !registered && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <button onClick={() => goBack()} className="flex-1 bg-surface border border-line text-fg-secondary py-3.5 rounded-xl font-medium text-sm">취소</button>
              <button onClick={() => setRegistered(true)} className="flex-[2] bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">등록 완료</button>
            </div>
          </div>
        )}
        {screen === "bizInfo" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <button onClick={() => goBack()} className="w-full bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">저장하기</button>
          </div>
        )}
        {screen === "bizSignup" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <button onClick={() => navigate("approvalWaiting")} className="w-full bg-action-primary text-fg-inverse py-3.5 rounded-xl font-bold text-sm">가입 신청하기</button>
          </div>
        )}
        {screen === "bookingDetail" && selectedBooking.status === "취소요청" && (
          <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-line-subtle px-4 pt-3 pb-6 z-20">
            <div className="flex gap-2">
              <button onClick={() => handleBookingAction(selectedBooking.id, "reject")}
                className="flex-1 bg-surface border border-line text-fg-secondary py-3.5 rounded-xl font-medium text-sm">취소 거절하기</button>
              <button onClick={() => handleBookingAction(selectedBooking.id, "accept")}
                className="flex-[2] bg-danger-solid text-fg-inverse py-3.5 rounded-xl font-bold text-sm">취소 수락하기</button>
            </div>
          </div>
        )}

        {/* Bottom Tab - 1-depth(top-level) 화면에서만 노출 */}
        {(["home","category","mypage"] as Screen[]).includes(screen) && <div className="absolute bottom-0 left-0 right-0 h-14 bg-surface border-t border-line-subtle flex items-center z-10">
          {[
            { key: "home" as Tab, Icon: HomeSolid, label: "홈", s: "home" as Screen },
            { key: "category" as Tab, Icon: LayoutGridSolid, label: "카테고리", s: "category" as Screen },
            { key: "my" as Tab, Icon: UserSolid, label: "마이페이지", s: "mypage" as Screen },
          ].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setScreen(t.s); }}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
                tab === t.key ? "text-fg-brand" : "text-fg-disabled"
              }`}>
              <t.Icon size={20} strokeWidth={1.5} />
              <span className="text-[10px]">{t.label}</span>
            </button>
          ))}
        </div>}
      </div>
    </div>
  );
}
