"use client";
import Link from "next/link";
import { Smartphone, Building2, MonitorCog, MessageCircle } from "@/app/components/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <p className="text-sm text-fg-brand font-medium mb-2">Interactive Prototype</p>
        <h1 className="text-4xl font-bold text-fg mb-2">퍼니 (Funni)</h1>
        <p className="text-base text-fg-muted">촬영 스튜디오 대관·예약 O2O 플랫폼</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full mb-8">
        <Link href="/consumer" className="group bg-surface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-line-subtle">
          <div className="w-12 h-12 bg-action-primary/10 rounded-xl flex items-center justify-center text-fg-brand mb-4"><Smartphone size={24} strokeWidth={1.5} /></div>
          <h2 className="text-lg font-bold text-fg mb-1">소비자 화면</h2>
          <p className="text-xs text-fg-disabled mb-3 leading-relaxed">스튜디오 탐색 → 예약 → 결제</p>
          <span className="text-fg-brand font-medium text-sm group-hover:underline">열기 →</span>
        </Link>

        <Link href="/business" className="group bg-surface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-line-subtle">
          <div className="w-12 h-12 bg-action-primary/10 rounded-xl flex items-center justify-center text-fg-brand mb-4"><Building2 size={24} strokeWidth={1.5} /></div>
          <h2 className="text-lg font-bold text-fg mb-1">업체 화면</h2>
          <p className="text-xs text-fg-disabled mb-3 leading-relaxed">스튜디오 관리 → 예약 달력 → 정산</p>
          <span className="text-fg-brand font-medium text-sm group-hover:underline">열기 →</span>
        </Link>

        <Link href="/admin" className="group bg-surface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-line-subtle">
          <div className="w-12 h-12 bg-action-primary/10 rounded-xl flex items-center justify-center text-fg-brand mb-4"><MonitorCog size={24} strokeWidth={1.5} /></div>
          <h2 className="text-lg font-bold text-fg mb-1">어드민 웹</h2>
          <p className="text-xs text-fg-disabled mb-3 leading-relaxed">입점 관리 → 수동 정산 → 광고</p>
          <span className="text-fg-brand font-medium text-sm group-hover:underline">열기 →</span>
        </Link>
      </div>

      <div className="bg-surface rounded-2xl p-5 max-w-4xl w-full border border-line-subtle shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Smartphone size={14} strokeWidth={1.5} className="text-fg-secondary" /><span className="text-sm font-bold text-fg">앱 구조</span>
        </div>
        <p className="text-xs text-fg-muted leading-relaxed">
          소비자와 업체는 <strong className="text-fg-brand">하나의 앱</strong>에서 동작합니다.
          하단 네비게이션 바(홈/카테고리/마이페이지)는 동일하며, 마이페이지만 계정 유형에 따라 업체 전용 메뉴로 전환됩니다.
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-5 max-w-4xl w-full border border-line-subtle shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="policy-badge">⚠️ 정책 미확정</span>
          <span className="text-sm font-bold text-fg">표시 안내</span>
        </div>
        <p className="text-xs text-fg-muted leading-relaxed">
          노란 점선 테두리 영역은 <strong className="text-warning-fg">고객사와 정책이 확정되어야 개발 가능한 부분</strong>입니다.
          각 화면에서 확인하시고, 해당 항목이 결정되면 기획 확정 → 개발 착수가 가능합니다.
        </p>
      </div>

      <div className="bg-action-primary/5 border border-line-brand/20 rounded-2xl p-5 max-w-4xl w-full">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle size={14} strokeWidth={1.5} className="text-fg-brand" /><span className="text-sm font-bold text-fg-brand">질문 수정 안내</span>
        </div>
        <p className="text-xs text-fg-muted leading-relaxed">
          각 화면의 <strong className="text-warning-fg">정책 미확정</strong> 영역에서 질문 텍스트를 클릭하면 직접 수정할 수 있습니다.
          수정된 질문과 답변은 <strong className="text-fg-brand">클라우드에 저장</strong>되어 재부팅 후에도 유지됩니다.
        </p>
      </div>

    </div>
  );
}
