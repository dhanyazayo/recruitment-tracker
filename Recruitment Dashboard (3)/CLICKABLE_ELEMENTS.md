# Clickable Elements Guide

## 🔗 All Clickable Links & Buttons in the Application

### **Navigation (Always Visible)**

#### Top Navigation Bar
- ✅ **"Recruitment Tracker" Logo** 
  - Goes to: Home / Overview page
  - Visual: Hover scales up, text turns blue

#### Left Sidebar
- ✅ **Overview** → `/` (Home page)
- ✅ **Workflow Analytics** → `/visual-pipeline`
- ✅ **Candidate Details** → `/candidate-visibility`
- ✅ **Executive Reports** → `/executive-dashboard`
- ✅ **SLA Breakdown** → `/sla-breakdown`
  - Visual: Blue background for main pages, Red for SLA
  - Hover: Underline effect, lighter background
  - Active: Left border highlight + chevron icon

---

### **Page 1: Overview Dashboard**

#### Clickable Elements:
1. ✅ **SLA Alert Box** (red box at bottom)
   - Text: "5 candidates approaching SLA breach"
   - Goes to: `/sla-breakdown`
   - Visual: Red border, underlined link text, hover darkens

#### Non-Clickable (Just Display):
- Live/This Week buttons (not functional)
- Quick Stats cards (Active: 37, Selected: 12, At Risk: 5)
- Stage progress bars
- Candidate cards
- Floating analytics widgets

---

### **Page 2: Workflow Analytics**

#### Clickable Elements:
- None currently (all visual displays)

#### Non-Clickable (Just Display):
- All stage cards
- Conversion metrics
- Summary stats at bottom

---

### **Page 3: Candidate Details**

#### Clickable Elements:
- Profile/Feedback/Timeline tabs (interactive but stay on same page)
- "Move to Next Stage" button (placeholder)
- "Add Feedback" button (placeholder)

#### Non-Clickable (Just Display):
- Candidate profile info
- Feedback cards
- Timeline events

---

### **Page 4: Executive Reports**

#### Clickable Elements:
- None currently (all visual displays)

#### Non-Clickable (Just Display):
- All metric cards
- Pipeline summary
- Delay hotspots
- Recruiter performance table

---

### **Page 5: SLA Breakdown**

#### Clickable Elements:
1. ✅ **"Take Action" buttons** (on breached candidates)
   - Visual: Red background, shadow on hover, scales up
   - Functionality: Placeholder for action modal

2. ✅ **"Schedule Now" buttons** (on approaching candidates)
   - Visual: Yellow background, shadow on hover, scales up
   - Functionality: Placeholder for scheduling

#### Non-Clickable (Just Display):
- All candidate cards
- Summary cards at top
- SLA target reference
- Status badges

---

## Visual Indicators for Clickable Elements

### ✅ Sidebar Links:
- **Cursor**: Pointer
- **Hover**: Blue/Red background fade, underline text
- **Active**: Solid background + left border + chevron

### ✅ Logo:
- **Cursor**: Pointer  
- **Hover**: Scales slightly, text turns blue, logo gets shadow

### ✅ SLA Alert Box:
- **Cursor**: Pointer
- **Hover**: Darker background, thicker border
- **Link Text**: Underlined in red

### ✅ Action Buttons:
- **Cursor**: Pointer
- **Hover**: Darker shade, shadow effect, slight scale up
- **Color**: Red for critical, Yellow for warning

---

## Summary

**Total Functional Clickable Links: 7**
1. Recruitment Tracker logo → Home
2. Overview (sidebar) → Home
3. Workflow Analytics (sidebar) → Visual Pipeline
4. Candidate Details (sidebar) → Candidate View
5. Executive Reports (sidebar) → Executive Dashboard
6. SLA Breakdown (sidebar) → SLA Page
7. SLA Alert Box → SLA Page

**Placeholder Buttons (visual only): ~8**
- Live/This Week toggles
- Move to Next Stage
- Add Feedback
- Take Action (x3 on SLA page)
- Schedule Now (x3 on SLA page)
