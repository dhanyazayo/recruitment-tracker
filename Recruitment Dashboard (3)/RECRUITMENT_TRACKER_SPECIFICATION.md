# Recruitment Tracker - Complete Specification Document

**Application Name:** Recruitment Tracker  
**Version:** 1.0  
**Date:** June 8, 2026  
**Purpose:** Recruitment pipeline management system with SLA tracking and candidate visibility

---

## Table of Contents
1. [Application Overview](#application-overview)
2. [Navigation Structure](#navigation-structure)
3. [Page 1: Overview Dashboard](#page-1-overview-dashboard)
4. [Page 2: Workflow Analytics](#page-2-workflow-analytics)
5. [Page 3: Candidate Details](#page-3-candidate-details)
6. [Page 4: Executive Reports](#page-4-executive-reports)
7. [Page 5: SLA Breakdown](#page-5-sla-breakdown)
8. [Interactive Elements](#interactive-elements)
9. [Color Scheme & Design](#color-scheme--design)
10. [Technical Stack](#technical-stack)

---

## Application Overview

### Purpose
Recruitment Tracker is a comprehensive recruitment pipeline management platform designed to track candidates across hiring stages, monitor Service Level Agreements (SLAs), collect structured feedback, and provide executive-level analytics.

### Key Features
- Real-time candidate tracking across 6 stages
- SLA monitoring and breach alerts
- Candidate profile and feedback management
- Executive hiring analytics
- Recruiter performance tracking

### User Roles
1. **Recruiters**: Track candidates, manage pipeline
2. **Interviewers**: Submit structured feedback
3. **Hiring Managers**: Monitor pipeline health and velocity
4. **Leadership**: View hiring analytics and insights

---

## Navigation Structure

### Top Navigation Bar
**Component:** Header with logo  
**Position:** Sticky at top  
**Background:** White with backdrop blur  

**Elements:**
- Logo: Gradient blue icon with "Recruitment Tracker" text
- Clickable: Yes - returns to home/overview page
- Hover Effect: Logo scales, text turns blue

### Left Sidebar Navigation
**Position:** Fixed left, below header  
**Width:** 256px (64 in Tailwind)  
**Background:** White with gray border

**Main Pages Section:**
1. Overview (Dashboard icon) → `/`
2. Workflow Analytics (GitBranch icon) → `/visual-pipeline`
3. Candidate Details (Users icon) → `/candidate-visibility`
4. Executive Reports (BarChart icon) → `/executive-dashboard`

**Reports & Details Section:**
5. SLA Breakdown (AlertCircle icon) → `/sla-breakdown`

**Visual Indicators:**
- Active page: Blue/Red background + left border + chevron
- Hover: Light background + underline + icon color change
- All items: Cursor pointer, smooth transitions

---

## Page 1: Overview Dashboard

### Page Title
**Internal:** "Recruitment Overview"  
**Sidebar Label:** "Overview"  
**Route:** `/`

### Layout
- Main content area (right of sidebar)
- Centered dashboard card with max-width
- Gradient background (gray-50 to white)

### Dashboard Components

#### 1. Header Section
**Title:** "Recruitment Overview"  
**Right Side:**
- "Live" button (blue background, active state)
- "This Week" button (gray background, inactive)

#### 2. Quick Stats Cards (3 columns)
**Card 1 - Active:**
- Background: Blue (bg-blue-50)
- Label: "Active"
- Value: 37
- Font: Bold, large (text-2xl)

**Card 2 - Selected:**
- Background: Green (bg-green-50)
- Label: "Selected"
- Value: 12

**Card 3 - At Risk:**
- Background: Yellow (bg-yellow-50)
- Label: "At Risk"
- Value: 5

**Design:** Rounded corners (xl), padding, colored backgrounds matching their category

#### 3. Pipeline Stages with Progress Bars (6 stages)

**Stages:**
1. Found - 12 candidates (Gray color)
2. Initial Discussion - 8 candidates (Blue color)
3. First Round - 5 candidates (Purple color)
4. Second Round - 3 candidates (Indigo color)
5. HR Round - 2 candidates (Green color)
6. Selected - 7 candidates (Emerald color)

**Each Stage Card Contains:**
- Stage name + colored dot indicator
- Candidate count (right aligned)
- Progress bar (width based on count)
- Background: Light gray (bg-gray-50)
- Border: Gray
- Rounded corners

**Visual:**
- Progress bar color matches stage color
- Smooth transition animations
- Hover: No effect (display only)

#### 4. Recent Activity Section

**Header:** "Recent Activity"  
**Shows:** Top 3 most recent candidates

**Each Candidate Card:**
- Avatar (circular gradient, initials)
- Name (e.g., "Sarah Chen")
- Role (e.g., "Senior Engineer")
- Days in stage (with clock icon)
- "Feedback pending" badge
- SLA status dot (green/yellow/red - top right)

**Colors:**
- Green dot: On track (within SLA)
- Yellow dot: Approaching breach (1 day left)
- Red dot: Breached SLA

**Design:**
- White background
- Gray border
- Hover: Shadow effect
- Rounded corners (lg)

#### 5. SLA Alert Box (CLICKABLE)

**Purpose:** Critical alert for candidates approaching SLA breach  
**Clickable:** Yes → goes to `/sla-breakdown`

**Visual Design:**
- Background: Red (bg-red-50)
- Border: Thick red (border-2, border-red-300)
- Hover: Darker red background, thicker border, shadow

**Content:**
- Icon: Clock (red)
- Text: "5 candidates approaching SLA breach"
- Link: "View SLA Breakdown →" (underlined, bold, red)

**Interaction:**
- Entire box is clickable
- Clear cursor pointer
- Hover feedback

#### 6. Floating Analytics Widgets (2 widgets)

**Widget 1 (Top Right):**
- Position: Absolute, top-right corner
- Title: "Pipeline Velocity"
- Value: "21 days"
- Trend: "-9 days improved" (green with up arrow)
- Background: White with shadow

**Widget 2 (Bottom Left):**
- Position: Absolute, bottom-left corner
- Title: "Pipeline Health"
- Visual: 3 colored bars (green/yellow/red)
- Icon: Green checkmark
- Background: White with shadow

**Animation:** Fade and scale in on page load

---

## Page 2: Workflow Analytics

### Page Title
**Internal:** "Hiring Workflow & Stage Analytics"  
**Sidebar Label:** "Workflow Analytics"  
**Route:** `/visual-pipeline`

### Layout
- Full width layout
- Gradient background
- Centered content (max-width)

### Components

#### 1. Page Header
**Title:** "Hiring Workflow & Stage Analytics" (text-4xl, bold)  
**Subtitle:** "Track candidates through every stage with real-time metrics, conversion rates, and bottleneck detection."

#### 2. Stage Flow Cards (6 stages - vertical layout)

**Each Stage Card Contains:**
- Colored icon box (left) with candidate count
- Stage name and description
- Metrics section (right):
  - Avg Days in stage
  - Conversion rate
- Full-width progress bar at bottom

**Visual Design:**
- White background
- Gray border
- Large rounded corners (2xl)
- Shadow (hover: larger shadow)
- Hover: Slight scale up

**Stage Details:**

1. **Found** (Gray gradient)
   - Count: 12
   - Avg Days: 2
   - Conversion: 75%

2. **Initial Discussion** (Blue gradient)
   - Count: 8
   - Avg Days: 4
   - Conversion: 65%

3. **First Round** (Purple gradient)
   - Count: 5
   - Avg Days: 6
   - Conversion: 60%

4. **Second Round** (Indigo gradient)
   - Count: 3
   - Avg Days: 5
   - Conversion: 67%

5. **HR Round** (Green gradient)
   - Count: 2
   - Avg Days: 3
   - Conversion: 100%

6. **Selected** (Emerald gradient)
   - Count: 7
   - Avg Days: 0
   - Conversion: —

**Connectors:**
- Animated down arrows between stages
- Bounce animation (continuous)
- Gray color

#### 3. Summary Stats (Bottom - 4 cards)

**Card 1:** Total Active - 37  
**Card 2:** Avg per Stage - 4.2 days (blue)  
**Card 3:** Overall Conversion - 68% (green)  
**Card 4:** Time to Hire - 21 days (purple)

**Design:** White cards, border, centered text, icons

---

## Page 3: Candidate Details

### Page Title
**Internal:** "Candidate Profile & Feedback Management"  
**Sidebar Label:** "Candidate Details"  
**Route:** `/candidate-visibility`

### Layout
- Two-column layout (lg:grid-cols-3, 2:1 ratio)
- Left: Candidate detail panel
- Right: Quick actions and SLA status

### Left Column: Candidate Detail Screen

#### 1. Candidate Header
**Profile:**
- Large avatar (gradient, initials: "SC")
- Name: "Sarah Chen" (text-2xl, bold)
- Role: "Senior Software Engineer"
- SLA Status: Green dot + "Within SLA"
- Current Stage: "First Round"

**Action Button:**
- "Move to Next Stage" (blue, right side)

#### 2. Tab Navigation
**Tabs:**
1. Profile (User icon)
2. Feedback (MessageSquare icon)
3. Timeline (Clock icon)

**Active Tab:** Blue underline, blue text  
**Inactive Tabs:** Gray text, hover effect

#### 3. Tab Content

**Profile Tab:**
- Contact section (email, phone)
- Experience (years, previous company)
- Skills (tags in blue pills)

**Feedback Tab:**
- Feedback cards from interviewers
- Each card shows:
  - Interviewer name and role
  - Date submitted
  - Rating (Strong Yes/Yes/Maybe/No with icon)
  - Comments
- "Add Feedback" button (dashed border, bottom)

**Timeline Tab:**
- Activity feed with icons
- Events:
  - Moved to First Round
  - Feedback submitted
  - Interview scheduled
  - Application received
- Each with timestamp and user

### Right Column: Side Panels

#### 1. SLA Status Card
**Header:** "SLA Status"

**Status Display:**
- Background: Green (bg-green-50)
- Border: Green
- Icon: Star
- Text: "Within SLA"
- Days Remaining: "3 days remaining"

**SLA Targets:**
- First Round: 7 days
- Current: 4 days (green text)

#### 2. Quick Feedback Modal
**Header:** "Quick Feedback"

**Rating Buttons (2x2 grid):**
- Strong Yes (hover: green)
- Yes (hover: blue)
- Maybe (hover: yellow)
- No (hover: red)

**Comments:**
- Textarea for feedback
- Placeholder: "Share your feedback..."

**Submit Button:**
- Blue background
- Full width
- "Submit Feedback" text

---

## Page 4: Executive Reports

### Page Title
**Internal:** "Executive Hiring Analytics"  
**Sidebar Label:** "Executive Reports"  
**Route:** `/executive-dashboard`

### Layout
- Full width dashboard
- White background
- Multiple sections

### Components

#### 1. Page Header
**Title:** "Executive Hiring Analytics" (text-4xl)  
**Subtitle:** "Real-time hiring metrics, stage distribution analysis, delay alerts, and recruiter performance tracking."

#### 2. Executive Dashboard Mockup

**Dashboard Header (Gradient blue-purple):**

**Top Bar:**
- Title: "Executive Hiring Dashboard"
- Timestamp: "Updated 2 minutes ago"
- Export button
- Configure button

**Quick Stats (4 cards):**
1. Total Active: 115 (blue, trending up)
2. Avg Time to Hire: 19d (green, -9 days improvement)
3. Conversion Rate: 68% (green, +12%)
4. At Risk: 10 (yellow, alert icon)

#### 3. Pipeline Summary Section

**Shows 5 stages:**
- Each row: Stage name, count, trend indicator, progress bar
- Color coded by stage
- Change indicators (+/- numbers in colored pills)

**Stages:**
1. Found: 12 (+8)
2. Initial Discussion: 8 (+5)
3. First Round: 5 (0)
4. Second Round: 3 (-2)
5. HR Round: 2 (+3)

#### 4. Delay Hotspots Section

**Critical Issues (Red background):**
- Stage: Initial Discussion
- 5 candidates delayed
- Avg 8 days over SLA
- Alert icon

**Medium Issues (Yellow background):**
- First Round: 3 candidates, 6 days over
- HR Round: 2 candidates, 4 days over

**On Track (Green background):**
- "All other stages on track" with checkmark

#### 5. Recruiter Performance Table

**Table Headers:**
- Recruiter
- Active Pipeline
- Conversion Rate
- Velocity

**Sample Data:**
1. Sarah M. - 38 candidates - 31% - Fast (green)
2. Michael K. - 34 candidates - 29% - Fast (green)
3. Emma L. - 28 candidates - 24% - Medium (yellow)
4. James R. - 22 candidates - 19% - Medium (yellow)

**Design:**
- Striped rows (gray-50 alternating)
- Border between rows
- Velocity badges (green/yellow colored)

---

## Page 5: SLA Breakdown

### Page Title
**Internal:** "SLA Breakdown"  
**Sidebar Label:** "SLA Breakdown"  
**Route:** `/sla-breakdown`

### Purpose
Detailed view of all candidates showing their SLA compliance status, grouped by severity.

### SLA Targets Reference

**Defined Time Limits:**
- Found → Initial: 2 days
- Initial → First: 4 days
- First → Second: 7 days
- Second → HR: 5 days
- HR → Decision: 3 days

### Layout
- Full width
- Gradient background
- Comprehensive list view

### Components

#### 1. Page Header
**Title:** "SLA Breakdown" (text-4xl)  
**Subtitle:** "Monitor all candidates and their Service Level Agreement status"

#### 2. Summary Dashboard (4 cards across)

**Card 1 - Total Candidates:**
- Icon: TrendingUp (blue)
- Value: 12
- Label: "Total Candidates"

**Card 2 - On Track:**
- Icon: CheckCircle (green)
- Value: 5
- Label: "On Track"
- Border: Green

**Card 3 - Approaching:**
- Icon: Clock (yellow)
- Value: 5
- Label: "Approaching"
- Border: Yellow

**Card 4 - Breached:**
- Icon: AlertTriangle (red)
- Value: 2
- Label: "Breached"
- Border: Red

#### 3. SLA Targets Reference Box

**Background:** Blue (bg-blue-50)  
**Border:** Blue  
**Title:** "SLA Targets by Stage"

**Grid of 5 cards showing:**
- Stage name
- Target days
- White background, blue border

#### 4. Critical Section: SLA Breached

**Header:**
- Red AlertTriangle icon
- Title: "Critical: SLA Breached"
- Count badge: Red pill with count

**Example Candidate Card:**

**Emma Wilson - UX Designer**
- Avatar: Red gradient with "EW"
- Current Stage: Initial Discussion
- Days in Stage: 12 days (red, bold)
- SLA Target: 4 days
- Overdue: 8 days (red, bold)
- Recruiter: Emma L.
- Action Button: "Take Action" (red, prominent)

**Visual:**
- Red border (2px)
- Red background tint
- Hover: Shadow and darker background
- Clear prominence

#### 5. Warning Section: Approaching SLA Breach

**Header:**
- Yellow Clock icon
- Title: "Warning: Approaching SLA Breach"
- Count badge: Yellow pill

**Example Candidate Card:**

**Sarah Chen - Senior Engineer**
- Avatar: Yellow gradient with "SC"
- Current Stage: First Round
- Days in Stage: 6 days (yellow)
- SLA Target: 7 days
- Days Remaining: 1 day (yellow, bold)
- Recruiter: Michael K.
- Action Button: "Schedule Now" (yellow)

**Visual:**
- Yellow border (2px)
- Yellow background tint
- Less prominent than red
- Hover effects

#### 6. On Track Section

**Header:**
- Green CheckCircle icon
- Title: "On Track"
- Count badge: Green pill

**Candidate Cards:**
- Similar layout to above sections
- Green avatar gradient
- Normal gray borders
- Status badge: "On Track" (green pill)
- No action button, just status display

**Visual:**
- Subtle, less prominent
- Green accents
- Clean, organized

### Candidate Card Structure (Consistent across all sections)

**Left Side:**
- Avatar (colored gradient based on status)
- Name (bold)
- Role (smaller, gray)

**Metrics Grid:**
1. Current Stage
2. Days in Stage
3. SLA Target
4. Days Remaining/Overdue
5. Recruiter Name

**Right Side:**
- Action button (color-coded by severity)
- OR Status badge (for on-track)

---

## Interactive Elements

### Fully Clickable Elements (7 total)

1. **Recruitment Tracker Logo**
   - Goes to: `/` (home)
   - Hover: Scale + blue text + shadow

2. **Sidebar: Overview**
   - Goes to: `/`
   - Hover: Blue background + underline

3. **Sidebar: Workflow Analytics**
   - Goes to: `/visual-pipeline`
   - Hover: Blue background + underline

4. **Sidebar: Candidate Details**
   - Goes to: `/candidate-visibility`
   - Hover: Blue background + underline

5. **Sidebar: Executive Reports**
   - Goes to: `/executive-dashboard`
   - Hover: Blue background + underline

6. **Sidebar: SLA Breakdown**
   - Goes to: `/sla-breakdown`
   - Hover: Red background + underline

7. **SLA Alert Box (Overview page)**
   - Goes to: `/sla-breakdown`
   - Hover: Darker red + shadow + thicker border

### Placeholder Buttons (Visual Only)

**Overview Page:**
- Live / This Week toggle buttons

**Candidate Details:**
- Move to Next Stage
- Add Feedback
- Submit Feedback
- Tab switches (Profile/Feedback/Timeline)

**SLA Breakdown:**
- Take Action (red - on breached candidates)
- Schedule Now (yellow - on approaching candidates)

---

## Color Scheme & Design

### Primary Colors

**Blue (Primary):**
- `#3B82F6` - Primary actions, main navigation
- `#60A5FA` - Light variant
- `#2563EB` - Dark variant

**Status Colors:**

**Green (Success/On Track):**
- `#10B981` - SLA on track, positive metrics
- Light: `bg-green-50`, Text: `text-green-600`

**Yellow (Warning/Approaching):**
- `#F59E0B` - SLA approaching, warnings
- Light: `bg-yellow-50`, Text: `text-yellow-600`

**Red (Critical/Breached):**
- `#EF4444` - SLA breached, critical alerts
- Light: `bg-red-50`, Text: `text-red-600`

**Gray (Neutral):**
- `#F9FAFB` - Light backgrounds
- `#E5E7EB` - Borders
- `#6B7280` - Secondary text
- `#1F2937` - Dark text

### Stage Colors

- Found: Gray (#9CA3AF)
- Initial Discussion: Blue (#60A5FA)
- First Round: Purple (#A78BFA)
- Second Round: Indigo (#818CF8)
- HR Round: Green (#34D399)
- Selected: Emerald (#10B981)

### Typography

**Font Family:** Inter (from Google Fonts)

**Sizes:**
- Headings: text-4xl (36px), text-2xl (24px), text-xl (20px)
- Body: text-base (16px)
- Small: text-sm (14px), text-xs (12px)

**Weights:**
- Bold: font-bold (700)
- Semibold: font-semibold (600)
- Medium: font-medium (500)
- Normal: font-normal (400)

### Spacing & Layout

**Padding:**
- Cards: p-6 (24px), p-4 (16px)
- Sections: py-24 (96px vertical)

**Rounded Corners:**
- Small: rounded-lg (8px)
- Medium: rounded-xl (12px)
- Large: rounded-2xl (16px)

**Shadows:**
- Small: shadow-sm
- Medium: shadow-md
- Large: shadow-xl
- Extra Large: shadow-2xl

### Design Principles

1. **Clean & Minimal** - No clutter, plenty of white space
2. **Professional** - Enterprise-grade appearance
3. **Functional** - Form follows function
4. **Consistent** - Repeated patterns and colors
5. **Accessible** - Clear contrast, readable fonts
6. **Responsive** - Works on different screen sizes

---

## Technical Stack

### Frontend Framework
- **React** (v18.3.1)
- **React Router** (v7.13.0) - Multi-page navigation
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** (v4.1.12) - Utility-first CSS
- **Motion/React** (v12.23.24) - Animations

### UI Components & Icons
- **Lucide React** (v0.487.0) - Icon library
- **Recharts** (v2.15.2) - Charts (for Executive page)
- **Radix UI** - Accessible component primitives

### Build Tools
- **Vite** (v6.3.5) - Build tool and dev server
- **pnpm** - Package manager

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Hero.tsx (Overview dashboard)
│   │   ├── InteractivePipeline.tsx (Workflow)
│   │   ├── ProductDeepDive.tsx (Candidate details)
│   │   ├── ExecutiveDashboard.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── PipelineDashboardPage.tsx
│   │   ├── VisualPipelinePage.tsx
│   │   ├── CandidateVisibilityPage.tsx
│   │   ├── ExecutiveDashboardPage.tsx
│   │   └── SLABreakdownPage.tsx
│   └── App.tsx (Main routing)
├── styles/
│   ├── index.css
│   ├── theme.css
│   ├── fonts.css
│   └── pipelinehq-theme.css
└── imports/ (images, assets)
```

### Routes
```
/ → Overview Dashboard
/visual-pipeline → Workflow Analytics
/candidate-visibility → Candidate Details
/executive-dashboard → Executive Reports
/sla-breakdown → SLA Breakdown
```

---

## Key Business Logic

### SLA Calculation

**Status Determination:**
```
target_days = stage_sla_target[current_stage]
days_remaining = target_days - days_in_stage

if days_remaining < 0:
    status = "breached"
    severity = "critical"
elif days_remaining <= 1:
    status = "approaching"
    severity = "warning"
else:
    status = "on-track"
    severity = "normal"
```

**SLA Targets by Stage:**
- Found: 2 days
- Initial Discussion: 4 days
- First Round: 7 days
- Second Round: 5 days
- HR Round: 3 days

### Candidate Flow

**Stages (in order):**
1. Found (initial discovery)
2. Initial Discussion (phone screen)
3. First Round (technical/behavioral)
4. Second Round (advanced interview)
5. HR Round (culture fit, compensation)
6. Selected (offer accepted) / Rejected

**Metrics Tracked:**
- Days in each stage
- Conversion rate between stages
- Overall time to hire
- SLA compliance per candidate
- Recruiter performance

---

## Screenshots Guide

### How to Capture Screenshots

**For Word Document:**

1. **Full Page Screenshots:**
   - Use browser extension: "GoFullPage" or "Fireshot"
   - Captures entire scrolling page

2. **Section Screenshots:**
   - Windows: `Windows + Shift + S`
   - Mac: `Cmd + Shift + 4`

3. **Recommended Captures:**
   - Overview Dashboard (full page)
   - Workflow Analytics (full page)
   - Candidate Details (full page)
   - Executive Reports (full page)
   - SLA Breakdown (full page)
   - Sidebar navigation (close-up)
   - Individual components (cards, widgets)

### Converting This Document to Word

**Method 1: Direct Open**
1. Open Microsoft Word
2. File → Open
3. Select this .md file
4. Word will convert automatically

**Method 2: Online Converter**
1. Use: pandoc.org or dillinger.io
2. Upload this .md file
3. Download as .docx

**Method 3: Paste in Word**
1. Copy this content
2. Paste into Word
3. Format as needed

---

## Document Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-06-08 | Initial specification created | Claude |

---

## Appendix: Sample Data

### Mock Candidates (12 total)

1. Sarah Chen - Senior Engineer - First Round - 6 days - Approaching
2. Michael Torres - Product Manager - Second Round - 4 days - On Track
3. Emma Wilson - UX Designer - Initial Discussion - 12 days - Breached
4. James Park - Data Scientist - HR Round - 2 days - On Track
5. Lisa Anderson - Frontend Developer - First Round - 8 days - Breached
6. David Kim - Backend Engineer - Found - 1 day - On Track
7. Rachel Green - Product Designer - Second Round - 6 days - Approaching
8. Tom Bradley - DevOps Engineer - Initial Discussion - 5 days - Approaching
9. Sophie Turner - QA Engineer - HR Round - 4 days - Breached
10. Alex Martinez - Full Stack Dev - First Round - 3 days - On Track
11. Nina Patel - UI Designer - Found - 3 days - Approaching
12. Chris Evans - Security Engineer - Second Round - 2 days - On Track

### Recruiters

1. Sarah M. - 38 active candidates - 31% conversion
2. Michael K. - 34 active candidates - 29% conversion
3. Emma L. - 28 active candidates - 24% conversion
4. James R. - 22 active candidates - 19% conversion

---

**End of Specification Document**
