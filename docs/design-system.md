# Funni Design System — Color Tokens (Draft)

> 상태: **초안 v0.1** — 사용처 확정 후 `app/globals.css`에 반영 예정
> 구조: **Primitive(원시 팔레트) → Semantic(의미론 토큰) → UI**
> 원칙: UI 코드에서는 **Semantic 토큰만** 참조한다. Primitive는 Semantic이 참조하는 값 저장소.

---

## 1. Primitive Palette

원시 컬러 스케일. 값 자체만 정의하며, UI 코드에 직접 쓰지 않는다.

### 1.1 Brand (Violet)

| 토큰 | Hex | 비고 |
|---|---|---|
| `--brand-50`  | `#F5F3FF` | 현재 `primary-bg` |
| `--brand-100` | `#EDE9FE` | 현재 `primary-light` |
| `--brand-200` | `#DDD6FE` | |
| `--brand-300` | `#C4B5FD` | |
| `--brand-400` | `#A78BFA` | |
| `--brand-500` | `#8B5CF6` | |
| `--brand-600` | `#7C3AED` | **현재 `primary`** |
| `--brand-700` | `#6D28D9` | |
| `--brand-800` | `#5B21B6` | 현재 `primary-dark` |
| `--brand-900` | `#4C1D95` | |

### 1.2 Neutral (Gray)

| 토큰 | Hex |
|---|---|
| `--neutral-0`    | `#FFFFFF` |
| `--neutral-50`   | `#F9FAFB` |
| `--neutral-100`  | `#F3F4F6` |
| `--neutral-200`  | `#E5E7EB` |
| `--neutral-300`  | `#D1D5DB` |
| `--neutral-400`  | `#9CA3AF` |
| `--neutral-500`  | `#6B7280` |
| `--neutral-600`  | `#4B5563` |
| `--neutral-700`  | `#374151` |
| `--neutral-800`  | `#1F2937` |
| `--neutral-900`  | `#111827` |
| `--neutral-1000` | `#000000` |

### 1.3 Success (Emerald)

| 토큰 | Hex | 비고 |
|---|---|---|
| `--success-50`  | `#ECFDF5` | |
| `--success-100` | `#D1FAE5` | |
| `--success-500` | `#10B981` | 현재 `success` |
| `--success-600` | `#059669` | |
| `--success-700` | `#047857` | |

### 1.4 Warning (Amber)

| 토큰 | Hex | 비고 |
|---|---|---|
| `--warning-50`  | `#FFFBEB` | |
| `--warning-100` | `#FEF3C7` | 현재 `warning-light` |
| `--warning-500` | `#F59E0B` | 현재 `warning` |
| `--warning-600` | `#D97706` | |
| `--warning-700` | `#92400E` | 현재 policy-badge 텍스트 |

### 1.5 Danger (Red)

| 토큰 | Hex | 비고 |
|---|---|---|
| `--danger-50`  | `#FEF2F2` | |
| `--danger-100` | `#FEE2E2` | |
| `--danger-500` | `#EF4444` | 현재 `danger` |
| `--danger-600` | `#DC2626` | |
| `--danger-700` | `#B91C1C` | |

### 1.6 Info (Blue) — 신규

| 토큰 | Hex |
|---|---|
| `--info-50`  | `#EFF6FF` |
| `--info-100` | `#DBEAFE` |
| `--info-500` | `#3B82F6` |
| `--info-600` | `#2563EB` |
| `--info-700` | `#1D4ED8` |

---

## 2. Semantic Tokens

UI 코드가 실제로 참조하는 토큰. 각 토큰의 "사용 맥락"은 아래 표의 **Usage** 칼럼에 기입한다 (현재는 초안 가이드).

### 2.1 Surface — 배경

| 토큰 | 참조 | Usage (초안) |
|---|---|---|
| `--surface-base`         | `neutral-0`   | 카드, 모달, 시트 기본 배경 |
| `--surface-muted`        | `neutral-50`  | 페이지 섹션 구분 배경 |
| `--surface-subtle`       | `neutral-100` | 인풋, 비활성 영역 배경 |
| `--surface-inverse`      | `neutral-900` | 어드민 헤더 등 다크 배경 |
| `--surface-brand-subtle` | `brand-50`    | 앱 전체(body) 배경 |
| `--surface-brand-soft`   | `brand-100`   | 선택/호버 배경 (cat-circle.active 등) |

### 2.2 Text — 글자

| 토큰 | 참조 | Usage (초안) |
|---|---|---|
| `--text-primary`      | `neutral-900` | 제목, 본문 기본 |
| `--text-secondary`    | `neutral-700` | 보조 본문 |
| `--text-muted`        | `neutral-500` | 캡션, 플레이스홀더 |
| `--text-disabled`     | `neutral-400` | 비활성 텍스트 |
| `--text-inverse`      | `neutral-0`   | 다크 배경 위 텍스트 |
| `--text-brand`        | `brand-600`   | 링크, 강조, 가격 |
| `--text-brand-strong` | `brand-800`   | 링크 호버 |

### 2.3 Border — 보더

| 토큰 | 참조 | Usage (초안) |
|---|---|---|
| `--border-subtle` | `neutral-100` | 카드 내부 구분선 |
| `--border-base`   | `neutral-200` | 기본 보더 (인풋, 카드) |
| `--border-strong` | `neutral-300` | 강조 보더 |
| `--border-brand`  | `brand-600`   | 선택/활성 보더 |

### 2.4 Action — 버튼/인터랙션

| 토큰 | 참조 | Usage (초안) |
|---|---|---|
| `--action-primary-bg`         | `brand-600` | Primary 버튼 배경 |
| `--action-primary-bg-hover`   | `brand-700` | Primary 호버 |
| `--action-primary-bg-pressed` | `brand-800` | Primary 눌림 |
| `--action-primary-fg`         | `neutral-0` | Primary 버튼 글자 |
| `--action-secondary-bg`       | `neutral-0` | Secondary(아웃라인) 버튼 배경 |
| `--action-secondary-border`   | `brand-600` | Secondary 버튼 보더 |
| `--action-secondary-fg`       | `brand-600` | Secondary 버튼 글자 |

### 2.5 Status — 상태 배지/알림

| 토큰 | 참조 | Usage (초안) |
|---|---|---|
| `--status-success-bg`    | `success-100` | 확정/완료 배지 배경 |
| `--status-success-fg`    | `success-700` | 확정/완료 배지 글자 |
| `--status-success-solid` | `success-500` | 체크마크, 솔리드 아이콘 |
| `--status-warning-bg`    | `warning-100` | 대기/정책 미확정 배경 |
| `--status-warning-fg`    | `warning-700` | 대기/정책 미확정 글자 |
| `--status-warning-solid` | `warning-500` | policy-area 점선 보더 |
| `--status-danger-bg`     | `danger-100`  | 취소/오류 배지 배경 |
| `--status-danger-fg`     | `danger-700`  | 취소/오류 배지 글자 |
| `--status-danger-solid`  | `danger-500`  | HOT 배지, 삭제 아이콘 |
| `--status-info-bg`       | `info-100`    | 정보 배지 배경 |
| `--status-info-fg`       | `info-700`    | 정보 배지 글자 |
| `--status-info-solid`    | `info-500`    | 정보 아이콘 |

### 2.6 Feedback — 특수 UI

| 토큰 | 참조 | Usage (초안) |
|---|---|---|
| `--badge-best-bg` | `brand-600`  | BEST 배지 배경 |
| `--badge-best-fg` | `neutral-0`  | BEST 배지 글자 |
| `--badge-hot-bg`  | `danger-500` | HOT 배지 배경 |
| `--badge-hot-fg`  | `neutral-0`  | HOT 배지 글자 |
| `--rating-star`   | `warning-500`| 별점 아이콘 |

---

## 3. 현재 코드베이스 → Semantic 매핑 (이관 가이드)

이관 시 Tailwind 기본 팔레트와 하드코딩 hex를 아래 기준으로 치환.

| 현재 사용 | → 교체 Semantic |
|---|---|
| `bg-white` | `--surface-base` |
| `bg-gray-50`, `bg-gray-100` | `--surface-muted`, `--surface-subtle` |
| `bg-gray-900` | `--surface-inverse` |
| `bg-primary-bg`, `#F5F3FF` | `--surface-brand-subtle` |
| `text-gray-500/600` | `--text-muted` / `--text-secondary` |
| `text-gray-700/900` | `--text-secondary` / `--text-primary` |
| `text-primary`, `#7C3AED` | `--text-brand` or `--action-primary-bg` (맥락별) |
| `border-gray-100/200` | `--border-subtle` / `--border-base` |
| `bg-green-100 text-green-700` | `--status-success-bg` / `--status-success-fg` |
| `bg-amber-100`, `#FEF3C7` | `--status-warning-bg` |
| `bg-red-100 text-red-500/600` | `--status-danger-bg` / `--status-danger-fg` |
| `text-yellow-500/600` (별점) | `--rating-star` |
| `.policy-badge` 하드코딩 | `--status-warning-bg/fg/solid` 조합 |
| `.badge-best` 하드코딩 | `--badge-best-bg/fg` |
| `.badge-hot` 하드코딩 | `--badge-hot-bg/fg` |
| `.keyword-pill` `#7C3AED` | `--text-brand` + `--border-brand` + `--surface-base` |
| `.cat-circle` border `#E5E7EB` | `--border-base` → active: `--border-brand` + `--surface-brand-subtle` |

### 미정(확인 필요)
- 홈/소비자 배너 그래디언트 (`from-purple-50 to-violet-100`, `from-pink-100 to-blue-100` 등) — 토큰화 여부
- 어드민 차트 색상 (초록/노랑/보라) — `--chart-*` 별도 계열로 추가할지
- 링크 hover 외 포커스 링 색 — `--focus-ring` 토큰 필요 여부

---

## 4. TODO (확정 후 반영)

- [ ] 각 Semantic 토큰의 Usage 칼럼을 실제 사용처 기준으로 확정
- [ ] 누락 토큰 추가 (focus-ring, chart-*, gradient-*, overlay/scrim 등)
- [ ] `app/globals.css` `@theme` 블록에 Primitive + Semantic 반영
- [ ] `globals.css` 내 하드코딩 컴포넌트(`.policy-badge`, `.badge-best`, `.badge-hot`, `.keyword-pill`, `.cat-circle`) 토큰 치환
- [ ] 기존 Tailwind 기본 팔레트 사용처 점진 이관
- [ ] 다크모드 대응 여부 결정 (대응한다면 Semantic 토큰에 라이트/다크 분기)
