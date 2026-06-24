# Recruitment Tracker - AI Code Generation Spec

> **Note:** This specification is optimized for AI code generation tools (Cursor, GitHub Copilot, etc.)
> All values shown are examples for mock data - actual implementation should use dynamic data sources.

---

## Page 1: Overview Dashboard

### Quick Stats Section

**Layout:** 3 columns, equal width, gap-4

**Data Structure:**
```typescript
interface QuickStat {
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

const quickStats: QuickStat[] = [
  { label: "Active", value: 37, bgColor: "bg-blue-50", textColor: "text-blue-900" },
  { label: "Selected", value: 12, bgColor: "bg-green-50", textColor: "text-green-900" },
  { label: "At Risk", value: 5, bgColor: "bg-yellow-50", textColor: "text-yellow-900" }
];
```

**Component Spec:**

Each card should:
- Display: label (text-xs, gray), value (text-2xl, bold, colored)
- Background: Colored background matching category
- Padding: p-4
- Border radius: rounded-xl
- No border

**Mock Data Source:**
```javascript
// In real app: fetch from API or state management
// For now: use hardcoded mock data as shown above
```

---

### Pipeline Stages Section

**Layout:** Vertical stack, space-y-3

**Data Structure:**
```typescript
interface PipelineStage {
  stage: string;          // Stage name
  count: number;          // Number of candidates
  color: string;          // Tailwind color class (e.g., "bg-gray-400")
  slaTarget?: number;     // Optional: SLA target in days
}

const pipelineStages: PipelineStage[] = [
  { stage: "Found", count: 12, color: "bg-gray-400" },
  { stage: "Initial Discussion", count: 8, color: "bg-blue-400" },
  { stage: "First Round", count: 5, color: "bg-purple-400" },
  { stage: "Second Round", count: 3, color: "bg-indigo-400" },
  { stage: "HR Round", count: 2, color: "bg-green-400" },
  { stage: "Selected", count: 7, color: "bg-emerald-400" }
];
```

**Component Spec:**

Each stage card:
- Top row: Stage name (left) + Count (right)
- Progress bar: Width calculated as `(count / maxCount) * 100%`
- Background: bg-gray-50
- Border: border-gray-200
- Padding: p-4
- Border radius: rounded-xl

**Progress Bar Logic:**
```javascript
const maxCount = Math.max(...pipelineStages.map(s => s.count));
const widthPercentage = (stage.count / maxCount) * 100;
```

---

### Recent Activity Section

**Data Structure:**
```typescript
interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: string;
  daysInStage: number;
  slaStatus: "green" | "yellow" | "red";  // SLA indicator
  recruiter: string;
  hasPendingFeedback: boolean;
}

const recentCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Engineer",
    stage: "First Round",
    daysInStage: 3,
    slaStatus: "green",
    recruiter: "Michael K.",
    hasPendingFeedback: true
  },
  // ... more candidates
];
```

**SLA Status Color Mapping:**
```javascript
const getSLAColor = (status: string) => {
  switch (status) {
    case "green": return "bg-green-500";   // Within SLA
    case "yellow": return "bg-yellow-500"; // Approaching
    case "red": return "bg-red-500";       // Breached
    default: return "bg-gray-400";
  }
};
```

**Component Spec:**

Each candidate card:
- Avatar: Circular gradient, show initials from name
- Name: font-medium, text-gray-900
- Role: text-xs, text-gray-500
- Days badge: Clock icon + "{daysInStage} days"
- Feedback badge: AlertCircle icon + "Feedback pending"
- SLA dot: w-2 h-2 rounded-full, colored based on status (top right)

**Avatar Initials Logic:**
```javascript
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('');
};
// "Sarah Chen" → "SC"
```

---

### SLA Alert Box (CLICKABLE)

**Data:**
```typescript
interface SLAAlert {
  count: number;        // Number of at-risk candidates
  severity: "warning" | "critical";
  link: string;         // Navigation link
}

const slaAlert: SLAAlert = {
  count: 5,
  severity: "critical",
  link: "/sla-breakdown"
};
```

**Component Spec:**
- Type: `<a>` tag or `<Link>` component
- href/to: `/sla-breakdown`
- Background: bg-red-50
- Border: 2px, border-red-300
- Padding: p-4
- Border radius: rounded-xl
- Hover: bg-red-100, border-red-400, shadow-md
- Cursor: pointer

**Content:**
```jsx
<a href="/sla-breakdown" className="block bg-red-50 border-2 border-red-300...">
  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4 text-red-600" />
    <span>{alert.count} candidates approaching SLA breach</span>
  </div>
  <div className="text-xs text-red-600 underline">
    View SLA Breakdown →
  </div>
</a>
```

---

### Floating Analytics Widgets

**Data Structure:**
```typescript
interface AnalyticWidget {
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down";
    value: string;
    color: string;
  };
  position: "top-right" | "bottom-left";
}

const widgets: AnalyticWidget[] = [
  {
    label: "Pipeline Velocity",
    value: "21 days",
    trend: { direction: "down", value: "-9 days improved", color: "text-green-600" },
    position: "top-right"
  },
  {
    label: "Pipeline Health",
    value: null,  // Shows visual bars instead
    position: "bottom-left"
  }
];
```

**Component Spec:**

Widget 1 (Top Right):
- Position: absolute, -top-6, -right-6
- Background: white, shadow-xl, border-gray-200
- Animation: Fade + scale in (delay: 1s)
- Contains: Label, Value, Trend with icon

Widget 2 (Bottom Left):
- Position: absolute, -bottom-6, -left-6
- Background: white, shadow-xl
- Animation: Fade + scale in (delay: 1.2s)
- Contains: Label, 3 colored bars (visual chart), checkmark icon

**Bar Chart Logic for Widget 2:**
```jsx
<div className="flex gap-1">
  <div className="w-2 h-8 bg-green-500 rounded"></div>   {/* On track */}
  <div className="w-2 h-6 bg-yellow-500 rounded"></div>  {/* Approaching */}
  <div className="w-2 h-3 bg-red-500 rounded"></div>     {/* Breached */}
</div>
```

---

## Mock Data Best Practices

### ✅ DO:
- Provide example values in comments
- Show data structures with TypeScript interfaces
- Include realistic ranges (not just 1, 2, 3)
- Demonstrate edge cases (0 candidates, 100+ candidates)

### ❌ DON'T:
- Hardcode specific values without comments
- Use only placeholder text like "Lorem ipsum"
- Skip type definitions
- Forget to show array/object structures

---

## Example: Complete Component with Mock Data

```tsx
// QuickStatsSection.tsx

interface QuickStat {
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

export function QuickStatsSection() {
  // TODO: Replace with API call or state management
  const stats: QuickStat[] = [
    { label: "Active", value: 37, bgColor: "bg-blue-50", textColor: "text-blue-900" },
    { label: "Selected", value: 12, bgColor: "bg-green-50", textColor: "text-green-900" },
    { label: "At Risk", value: 5, bgColor: "bg-yellow-50", textColor: "text-yellow-900" }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.bgColor} rounded-xl p-4`}>
          <div className="text-xs text-gray-600 mb-1 font-medium">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
```

**Key Points:**
- ✅ Shows exact data structure
- ✅ Includes type definitions
- ✅ Has TODO comment for future API integration
- ✅ Uses realistic example values
- ✅ Demonstrates the mapping/rendering logic

---

## When to Include vs Exclude Specific Values

### ✅ **INCLUDE specific values when:**

1. **Demonstrating data types**
   ```typescript
   count: 37              // ✅ Shows it's a number
   percentage: 68         // ✅ Shows it's an integer percentage
   ```

2. **Showing realistic UI scaling**
   ```typescript
   // Example values help AI understand space requirements
   candidates: 1247       // 4 digits
   vs
   candidates: 7          // 1 digit
   ```

3. **Illustrating business logic**
   ```typescript
   slaTarget: 7           // ✅ Shows typical SLA timeframe
   daysInStage: 6         // ✅ Shows comparison logic (6 < 7 = on track)
   ```

4. **Color/status mappings**
   ```typescript
   // ✅ Clear mapping
   { days: 1, status: "yellow" }    // Approaching
   { days: -2, status: "red" }      // Breached (negative = overdue)
   { days: 5, status: "green" }     // On track
   ```

### ❌ **EXCLUDE or generalize when:**

1. **Values will always be dynamic**
   ```typescript
   // Instead of: currentUser: "John Smith"
   // Use: currentUser: string  // Logged in user name
   ```

2. **Specific numbers aren't important**
   ```typescript
   // Instead of: buttonWidth: "120px"
   // Use: "Auto-sized based on content"
   ```

3. **Focus is on structure, not content**
   ```typescript
   // Instead of listing 50 mock candidates
   // Use: "Array of Candidate objects (see interface above)"
   ```

---

## Summary: AI-Optimized Spec Format

```markdown
### Component Name

**Purpose:** Brief description

**Data Structure:**
[TypeScript interface with example values in comments]

**Component Spec:**
[Visual/style requirements]

**Logic/Calculations:**
[Any formulas or conditional logic]

**Mock Data:**
[Small realistic example array]

**Implementation Notes:**
[Any special considerations]
```

This format gives AI all it needs:
- ✅ Type safety
- ✅ Example values for context
- ✅ Clear structure
- ✅ Implementation guidance
- ✅ Mock data for testing

---

**Use this format for Cursor AI - it will generate much better code!**
