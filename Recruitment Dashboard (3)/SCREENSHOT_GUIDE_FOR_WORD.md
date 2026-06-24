# How to Create Word Document with Screenshots

## Quick Steps

### Step 1: Take Screenshots

**Option A: Full Page Screenshots (Recommended)**
1. Install browser extension:
   - Chrome/Edge: "GoFullPage" or "Awesome Screenshot"
   - Firefox: "Fireshot"
2. Click the extension icon
3. Select "Capture Entire Page"
4. Save as PNG

**Option B: Manual Screenshots**
- **Windows**: Press `Windows + Shift + S`, select area
- **Mac**: Press `Cmd + Shift + 4`, select area

### Step 2: Screenshots to Capture

#### Essential Screenshots (5 pages):
1. ✅ Overview Dashboard (home page)
2. ✅ Workflow Analytics page
3. ✅ Candidate Details page
4. ✅ Executive Reports page
5. ✅ SLA Breakdown page

#### Detail Screenshots:
6. ✅ Left sidebar navigation (close-up)
7. ✅ SLA alert box (clickable element)
8. ✅ Quick stats cards
9. ✅ Candidate card (with SLA indicator)
10. ✅ Stage cards from workflow page

### Step 3: Convert Markdown to Word

**Method 1: Open in Word Directly**
```
1. Open Microsoft Word
2. File → Open
3. Navigate to: RECRUITMENT_TRACKER_SPECIFICATION.md
4. Word will auto-convert
5. Save as .docx
```

**Method 2: Online Converter**
```
1. Go to: https://cloudconvert.com/md-to-docx
2. Upload: RECRUITMENT_TRACKER_SPECIFICATION.md
3. Download converted .docx file
```

**Method 3: Use Pandoc (if installed)**
```bash
pandoc RECRUITMENT_TRACKER_SPECIFICATION.md -o Recruitment_Tracker_Spec.docx
```

### Step 4: Add Screenshots to Word

**Template Structure:**

```
Cover Page
├─ Title: Recruitment Tracker Specification
├─ Date: June 8, 2026
└─ Version: 1.0

Table of Contents (Auto-generated)

1. Overview
   ├─ [Insert: Full dashboard screenshot]
   └─ Description text

2. Page 1: Overview Dashboard
   ├─ [Insert: Full page screenshot]
   ├─ Components:
   │   ├─ [Insert: Quick stats screenshot]
   │   ├─ [Insert: Stage cards screenshot]
   │   └─ [Insert: SLA alert screenshot]
   └─ Description of each component

3. Page 2: Workflow Analytics
   ├─ [Insert: Full page screenshot]
   └─ Description

4. Page 3: Candidate Details
   ├─ [Insert: Full page screenshot]
   └─ Description

5. Page 4: Executive Reports
   ├─ [Insert: Full page screenshot]
   └─ Description

6. Page 5: SLA Breakdown
   ├─ [Insert: Full page screenshot]
   └─ Description

7. Navigation & Interactions
   ├─ [Insert: Sidebar screenshot]
   ├─ [Insert: Clickable elements highlight]
   └─ List of interactive elements

Appendix
├─ Technical details
└─ Sample data
```

---

## Detailed Word Document Template

### Formatting Recommendations

**Fonts:**
- Headings: Calibri or Arial, 14-18pt, Bold
- Body: Calibri or Arial, 11pt, Regular
- Code/Technical: Consolas or Courier New, 10pt

**Colors:**
- Headings: Dark Blue (#1F4788)
- Screenshots: Add border (gray, 1pt)
- Tables: Light gray header background

**Page Setup:**
- Margins: 1 inch all sides
- Orientation: Portrait (or Landscape for wide screenshots)
- Page numbers: Bottom center

---

## Screenshot Organization

### Page 1: Overview Dashboard

**Full Screenshot:**
[Capture entire page from top navigation to bottom]

**Component Screenshots:**

1. **Quick Stats Section**
   - Caption: "Quick Stats: Active (37), Selected (12), At Risk (5)"
   - Callouts: Point to each stat card

2. **Stage Progress Bars**
   - Caption: "Pipeline Stages with Candidate Counts"
   - Highlight: Progress bar colors

3. **Recent Activity Cards**
   - Caption: "Recent Candidate Activity with SLA Indicators"
   - Callouts: Point to SLA dots (green/yellow/red)

4. **SLA Alert Box (Important!)**
   - Caption: "Critical SLA Alert - Clickable to SLA Breakdown page"
   - Border: Highlight with red box to show it's clickable

### Page 2: Workflow Analytics

**Full Screenshot:**
[Capture full scrolling page]

**Component Screenshots:**

1. **Stage Cards**
   - Caption: "Stage Flow with Metrics (Count, Avg Days, Conversion)"
   - Highlight: One complete card showing all metrics

2. **Animated Arrows**
   - Caption: "Stage Connectors with Animation"

3. **Summary Stats**
   - Caption: "Overall Pipeline Metrics"

### Page 3: Candidate Details

**Full Screenshot:**
[Capture both columns]

**Component Screenshots:**

1. **Candidate Header**
   - Caption: "Candidate Profile Header with SLA Status"

2. **Tab Navigation**
   - Caption: "Profile / Feedback / Timeline Tabs"
   - Show: Active vs inactive state

3. **Feedback Card**
   - Caption: "Interviewer Feedback with Rating"

4. **SLA Status Panel**
   - Caption: "Real-time SLA Monitoring"

### Page 4: Executive Reports

**Full Screenshot:**
[Capture full dashboard]

**Component Screenshots:**

1. **Header Metrics**
   - Caption: "Key Executive Metrics"

2. **Pipeline Summary**
   - Caption: "Stage Distribution with Trends"

3. **Delay Hotspots**
   - Caption: "Critical Delay Alerts"
   - Highlight: Red/Yellow/Green sections

4. **Recruiter Performance**
   - Caption: "Recruiter Leaderboard"

### Page 5: SLA Breakdown

**Full Screenshot:**
[Capture full page with all sections]

**Component Screenshots:**

1. **Summary Cards**
   - Caption: "SLA Status Overview (Total, On Track, Approaching, Breached)"

2. **SLA Targets Reference**
   - Caption: "Defined SLA Timeframes by Stage"

3. **Breached Candidate Card**
   - Caption: "Critical - SLA Breached Example"
   - Callouts: Point to each metric field
   - Highlight: Red "Take Action" button

4. **Approaching Candidate Card**
   - Caption: "Warning - Approaching SLA Example"
   - Highlight: Yellow "Schedule Now" button

5. **On Track Candidate Card**
   - Caption: "On Track - Healthy Status Example"

---

## Adding Annotations to Screenshots

### In Word (Built-in Tools):

1. **Insert Screenshot:**
   ```
   Insert → Pictures → This Device
   Select screenshot file
   ```

2. **Add Callouts:**
   ```
   Insert → Shapes → Callout
   Draw callout on image
   Add text description
   ```

3. **Add Arrows:**
   ```
   Insert → Shapes → Arrow
   Point to important elements
   Change color to red/blue for visibility
   ```

4. **Add Borders:**
   ```
   Click image
   Picture Format → Picture Border
   Choose Gray, 1pt
   ```

### External Tools (Before Import):

**Option 1: Windows Snip & Sketch**
- Capture → Annotate → Save → Import to Word

**Option 2: Mac Preview**
- Open screenshot → Tools → Annotate → Save

**Option 3: Online Tool**
- Use: annotely.com or markup.io
- Upload → Add arrows/text → Download → Import

---

## Final Checklist

Before finalizing your Word document:

✅ All 5 main pages have full screenshots  
✅ Navigation (sidebar) screenshot included  
✅ Important components have detail shots  
✅ Clickable elements are highlighted/annotated  
✅ Screenshots have captions explaining what they show  
✅ Color-coded sections match the app (red for SLA, blue for primary)  
✅ Table of contents is generated and clickable  
✅ Page numbers added  
✅ Headers/footers added with doc title  
✅ Consistent formatting throughout  
✅ Proofread for typos  
✅ File saved with clear name: "Recruitment_Tracker_Specification_v1.0.docx"

---

## Sample Page Layout in Word

```
┌─────────────────────────────────────────┐
│  Page 1: Overview Dashboard             │
├─────────────────────────────────────────┤
│                                         │
│  The Overview Dashboard provides...     │
│  [Full page screenshot here]            │
│                                         │
│  Key Components:                        │
│  ┌──────────────────────┐              │
│  │ 1. Quick Stats       │              │
│  │ [Component screenshot│              │
│  │  with callouts]      │              │
│  └──────────────────────┘              │
│                                         │
│  The quick stats section displays...   │
│                                         │
│  ┌──────────────────────┐              │
│  │ 2. Stage Progress    │              │
│  │ [Screenshot]         │              │
│  └──────────────────────┘              │
│                                         │
│  Table 1: Stage Details                │
│  ┌────────┬───────┬─────────┐         │
│  │ Stage  │ Count │ Color   │         │
│  ├────────┼───────┼─────────┤         │
│  │ Found  │ 12    │ Gray    │         │
│  └────────┴───────┴─────────┘         │
│                                         │
└─────────────────────────────────────────┘
```

---

## Tips for Professional Document

1. **Use consistent screenshot sizes**
   - Full page: Full width of page
   - Components: 50-70% width, centered

2. **Add figure numbers**
   - "Figure 1: Overview Dashboard"
   - "Figure 2: SLA Alert Component"

3. **Create a List of Figures**
   - After Table of Contents
   - Auto-generated in Word

4. **Use tables for specifications**
   - Technical details (colors, fonts)
   - Component measurements
   - SLA targets

5. **Add hyperlinks**
   - Link figure references to actual figures
   - Link "see Figure 3" → jumps to Figure 3

6. **Include a glossary**
   - SLA = Service Level Agreement
   - UI = User Interface
   - CTA = Call to Action

---

**Ready to create your Word document!**

Files you now have:
1. ✅ RECRUITMENT_TRACKER_SPECIFICATION.md (this document)
2. ✅ SCREENSHOT_GUIDE_FOR_WORD.md (this guide)
3. ✅ CLICKABLE_ELEMENTS.md (reference)

Next steps:
1. Take screenshots of all pages
2. Convert .md to Word
3. Insert screenshots following this guide
4. Add annotations and callouts
5. Proofread and save!
