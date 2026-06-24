# Recruitment Tracker - Detailed Requirements Explanation

## What This Application Does

This is a recruitment management system that helps companies track job candidates as they move through the hiring process. Think of it as a digital command center where recruiters, hiring managers, and executives can see exactly where every candidate stands in the hiring pipeline.

---

## Why This Application Exists

**The Problem:**
When companies hire people, candidates often get "lost" in the process. Someone might have a great first interview, but then weeks go by without follow-up. Feedback from interviewers sits in email inboxes. Executives don't know if hiring is on track. Good candidates give up and accept other offers because the process takes too long.

**The Solution:**
This application brings visibility, accountability, and speed to hiring. Everyone can see:
- Where each candidate is in the process
- How long they've been waiting
- Who needs to take action next
- Whether the process is moving fast enough

---

## The Five Main Pages

### Page 1: Overview Dashboard (Home Page)

**Purpose:** This is the first thing you see when you open the application. It gives you a quick snapshot of everything happening in recruitment right now.

**Who Uses It:** Recruiters starting their day, hiring managers checking status, executives getting a quick update.

**What You See:**

1. **Quick Stats at the Top**
   - **Active:** How many candidates are currently in the hiring process (not yet selected or rejected)
   - **Selected:** How many people were given job offers
   - **At Risk:** How many candidates might slip through the cracks because they've been waiting too long

2. **Pipeline Stages Section**
   - Shows how many candidates are at each step of the hiring process
   - Six stages from start to finish:
     - **Found:** We identified this person as a potential candidate
     - **Initial Discussion:** First conversation to see if there's mutual interest
     - **First Round:** First formal interview (usually technical or skills-based)
     - **Second Round:** Deeper interview (culture fit, team interaction)
     - **HR Round:** Final conversation about compensation, benefits, start date
     - **Selected:** Offer made and accepted
   - Each stage shows a colored progress bar so you can quickly see which stages have the most candidates

3. **Recent Activity Cards**
   - Shows the most recent candidates who had updates
   - Each card displays:
     - Candidate's name and the job they're applying for
     - What stage they're in
     - How many days they've been in that stage
     - A colored dot showing if they're on schedule (green), approaching deadline (yellow), or overdue (red)
     - Whether we're still waiting for feedback from interviewers

4. **SLA Alert Box (Red Warning Box)**
   - **This is clickable** - it takes you to a detailed breakdown page
   - Shows how many candidates are approaching their deadline
   - Acts as an urgent notification that action is needed

5. **Floating Analytics Widgets**
   - Small information boxes that show:
     - **Pipeline Velocity:** How long it takes on average to move a candidate from start to finish
     - **Pipeline Health:** Visual representation of how many candidates are on track vs. falling behind

**Why This Page Exists:**
Recruiters need to know "what should I work on today?" without digging through spreadsheets or emails. This page answers that in 10 seconds.

---

### Page 2: Workflow Analytics

**Purpose:** This page shows the flow of candidates through the hiring process and identifies where bottlenecks occur.

**Who Uses It:** Operations managers, talent acquisition leads, anyone trying to improve the hiring process.

**What You See:**

1. **Stage Flow Visualization**
   - Six boxes arranged vertically, one for each hiring stage
   - Arrows connecting them to show the flow from one stage to the next
   - Each box shows:
     - **Count:** How many people are currently in this stage
     - **Average Days:** How long candidates typically spend in this stage
     - **Conversion Rate:** What percentage of people make it to the next stage

2. **Summary Statistics at the Bottom**
   - **Total Active Candidates:** Everyone currently in the pipeline
   - **Average Pipeline Time:** How long it takes from "Found" to "Selected"
   - **Overall Conversion Rate:** What percentage of people who enter the process end up getting hired

**Why This Page Exists:**
This helps identify problems in the hiring process. For example:
- If "First Round" shows 5 candidates but "Second Round" shows only 1, the conversion rate between these stages is low - maybe the first interview is too hard, or we're not preparing candidates properly.
- If "Average Days" in HR Round is 12 days but should be 3 days, there's a bottleneck in HR scheduling or offer approval.

---

### Page 3: Candidate Details

**Purpose:** This page shows everything about one specific candidate in one place.

**Who Uses It:** Recruiters preparing for meetings, hiring managers reviewing candidates, anyone who needs complete information about a specific person.

**What You See:**

**Left Side - Candidate Profile:**

1. **Header Section**
   - Candidate's name
   - Job title they're applying for
   - Current stage in the process
   - Email and phone number
   - Location

2. **Three Tabs to Switch Between:**

   **Profile Tab:**
   - Skills and qualifications
   - Years of experience
   - Education background
   - Current company and role

   **Feedback Tab:**
   - Comments from everyone who interviewed this person
   - Each feedback card shows:
     - Who gave the feedback (interviewer name)
     - When they interviewed
     - What stage of interview it was
     - Their rating (thumbs up/down or numerical score)
     - Their written comments

   **Timeline Tab:**
   - Chronological history of everything that happened
   - Shows dates and actions like:
     - "Application received"
     - "Moved to First Round"
     - "Interview scheduled with John Smith"
     - "Feedback submitted by Sarah Chen"

**Right Side - Action Panel:**

1. **SLA Status Card**
   - Shows if this candidate is on schedule or falling behind
   - Displays:
     - How many days they've been in current stage
     - What the deadline is for this stage
     - How many days remaining (or how many days overdue)
     - Color-coded: Green (on track), Yellow (deadline approaching), Red (past deadline)

2. **Quick Actions**
   - **Move to Next Stage Button:** Promotes candidate to next step
   - **Add Feedback Button:** Opens form to submit interview feedback

**Why This Page Exists:**
Before an interview, you need to know: Who is this person? What did other interviewers say? Are we moving fast enough? This page answers all those questions without hunting through emails or files.

---

### Page 4: Executive Reports

**Purpose:** This page gives leadership a high-level view of hiring health and performance.

**Who Uses It:** VPs, Directors, CEOs, anyone who needs to report on hiring metrics to leadership.

**What You See:**

1. **Key Metrics at the Top**
   - **Total Pipeline:** How many candidates are active
   - **This Month's Hires:** How many offers were accepted this month
   - **Average Time to Hire:** How long the process takes on average
   - **Pipeline Velocity:** Whether we're getting faster or slower

2. **Pipeline Summary**
   - Breakdown of how many candidates are in each stage
   - Trend arrows showing if numbers are going up or down compared to last month

3. **Delay Hotspots**
   - Highlights which stages are creating delays
   - Color-coded alerts:
     - **Red:** Critical delays (multiple candidates way past deadline)
     - **Yellow:** Minor delays (a few candidates approaching deadline)
     - **Green:** Moving smoothly

4. **Recruiter Performance Table**
   - Shows each recruiter's metrics:
     - How many candidates they're managing
     - How many hires they've made
     - Their average time to hire
     - Their on-time percentage (how many candidates meet deadlines)

**Why This Page Exists:**
Executives need to answer questions like:
- "Are we hiring fast enough to meet our growth targets?"
- "Which parts of our hiring process are broken?"
- "Which recruiters need help or coaching?"

This page provides data for strategic decisions without making executives dig through details.

---

### Page 5: SLA Breakdown

**Purpose:** This page shows every candidate who is at risk of falling behind schedule, organized by urgency.

**Who Uses It:** Recruiters prioritizing their daily work, managers ensuring their team is on track.

**What Is SLA?**
SLA stands for "Service Level Agreement" - in this context, it means **the time limit we've set for each stage of hiring**.

Example SLA targets:
- **Found stage:** Move to Initial Discussion within 2 days
- **Initial Discussion:** Schedule First Round within 4 days
- **First Round:** Complete interview and decide within 7 days
- **Second Round:** Complete within 5 days
- **HR Round:** Send offer within 3 days

If a candidate sits in "First Round" for 8 days, they've **breached the SLA** (went past the 7-day limit).

**What You See:**

1. **Summary Cards at the Top**
   - **Total Candidates:** Everyone in the system
   - **On Track:** Candidates moving on schedule (green)
   - **Approaching SLA:** Candidates getting close to deadline (yellow)
   - **Breached SLA:** Candidates past their deadline (red)

2. **SLA Targets Reference Box**
   - Shows the time limits for each stage
   - Helps you quickly check "how long should this stage take?"

3. **Three Sections for Candidates:**

   **Section 1 - Breached SLA (Red Section):**
   - These candidates are PAST their deadline
   - Each card shows:
     - Candidate name and job title
     - What stage they're stuck in
     - How many days they've been there
     - How many days OVERDUE they are (shown as negative number)
     - Who is responsible (assigned recruiter)
     - Red "Take Action" button to escalate

   **Section 2 - Approaching SLA (Yellow Section):**
   - These candidates are CLOSE to their deadline (1 day or less remaining)
   - Each card shows same information as above
   - Yellow "Schedule Now" button to prompt immediate action

   **Section 3 - On Track (Green Section):**
   - These candidates are moving on schedule
   - Each card shows they have 2+ days remaining
   - No action buttons needed - just monitoring

**Why This Page Exists:**
This page prevents candidates from being forgotten. It acts like a to-do list sorted by urgency. Recruiters can:
- See exactly who needs attention today
- Understand why they need attention (deadline approaching or passed)
- Take immediate action

---

## Navigation and Clickable Elements

### Left Sidebar Navigation

**Always visible on the left side of the screen:**

**Main Pages Section:**
1. Overview - Takes you to the dashboard (home page)
2. Workflow Analytics - Takes you to the stage flow page
3. Candidate Details - Takes you to detailed candidate view
4. Executive Reports - Takes you to leadership metrics

**Reports & Details Section:**
5. SLA Breakdown - Takes you to the urgency/deadline page (red highlight because it's critical)

**Visual Indicators:**
- The page you're currently on has a blue background and a small arrow (chevron)
- When you hover over a link, it gets underlined and the background color changes slightly
- The SLA Breakdown link is always highlighted in red because it's urgent

### Logo at the Top

- Clicking the "Recruitment Tracker" logo at the top always takes you back to the Overview Dashboard (home page)

### Other Clickable Elements

**On the Overview Dashboard:**
- The red SLA Alert Box is clickable - it takes you directly to the SLA Breakdown page

**On the Candidate Details Page:**
- Three tabs (Profile, Feedback, Timeline) to switch between different information views
- "Move to Next Stage" button to promote candidate
- "Add Feedback" button to submit interview notes

**On the SLA Breakdown Page:**
- "Take Action" buttons on overdue candidates (opens action menu)
- "Schedule Now" buttons on approaching deadline candidates (opens scheduling tool)

---

## Color Coding System

The application uses colors to communicate status at a glance:

### SLA Status Colors:
- **Green:** Everything is on track, no action needed
- **Yellow:** Warning - deadline is approaching (1 day or less remaining)
- **Red:** Critical - deadline has passed, immediate action required

### Stage Categories:
- **Gray:** Early stage (Found)
- **Blue:** Initial conversations
- **Purple:** First Round interviews
- **Indigo:** Second Round interviews
- **Green:** Final stages (HR, Selected)

### Quick Stats Background Colors:
- **Blue background:** Active candidates (neutral, informational)
- **Green background:** Selected candidates (positive outcome)
- **Yellow background:** At Risk candidates (warning)

---

## How a Real Person Would Use This Application

### Morning Routine for a Recruiter:

**8:00 AM - Open the Overview Dashboard**
- See "5 candidates approaching SLA breach" in red alert box
- Click the red box to go to SLA Breakdown page
- See 2 candidates are past deadline (red section)
- See 3 candidates have deadlines today (yellow section)

**8:05 AM - Take Action on Urgent Candidates**
- Click "Take Action" on the first overdue candidate
- See they've been waiting 9 days for a First Round interview (should have been scheduled in 7 days)
- Immediately send calendar invite to schedule their interview

**8:15 AM - Check the Second Overdue Candidate**
- See they finished their Second Round interview 6 days ago (should have moved to HR Round in 5 days)
- Realize we're still waiting for feedback from one interviewer
- Send follow-up email to that interviewer

**8:30 AM - Address the "Approaching" Candidates**
- Click "Schedule Now" on candidate approaching deadline
- Book their next interview for this afternoon to stay on schedule

**9:00 AM - Go to Workflow Analytics**
- Notice that "Second Round" stage has very long average days (8 days, should be 5)
- Identify this as a bottleneck - interviewers are busy and hard to schedule
- Make note to discuss with hiring manager

**10:00 AM - Prepare for Interview**
- Interview scheduled with Sarah Chen at 10:30
- Go to Candidate Details page
- Switch to Feedback tab
- Read comments from previous interviewers
- Switch to Profile tab
- Review her background and skills
- Now prepared with context for the conversation

**3:00 PM - After the Interview**
- Go back to Sarah Chen's Candidate Details page
- Click "Add Feedback" button
- Rate the interview and add comments
- Click "Move to Next Stage" button to promote her to Second Round

**End of Day - Check Executive Reports**
- See that the team is on track for this month's hiring goal (12 hires target, currently at 8 with 10 days left)
- Notice own recruiter performance shows 85% on-time rate (good!)
- Share screenshot with manager

---

### Weekly Routine for a Hiring Manager:

**Monday Morning - Check Overview Dashboard**
- See 37 active candidates across all open positions
- See 12 people have been selected this quarter (on track for quarterly goal)
- Notice "At Risk" count is 5 - make mental note to check this later

**Mid-Week - Review Specific Candidate**
- Received email that candidate John Doe completed Second Round
- Open Candidate Details page for John Doe
- Read feedback from both interviewers
- Both gave positive ratings
- Click "Move to Next Stage" to send to HR Round
- Send note to HR to prepare offer

**Friday - Check Workflow Analytics**
- Review conversion rates between stages
- Notice only 60% of First Round candidates make it to Second Round
- Wonder if interview bar is too high or if candidate sourcing needs improvement
- Schedule meeting with recruiting team to discuss

---

### Monthly Routine for an Executive:

**First Monday of Month - Open Executive Reports**
- Check "This Month's Hires" metric - see if we hit last month's target
- Review "Pipeline Velocity" - are we getting faster or slower?
- Look at "Delay Hotspots" - which stages are problematic?
- Review "Recruiter Performance" table - who needs coaching?

**Present to Board/Leadership:**
- Take screenshots from Executive Reports page
- Show trends: "We hired 15 people last month, up from 10 the month before"
- Highlight problems: "Our bottleneck is the Second Round stage - interviews are taking 8 days when they should take 5"
- Share solutions: "We're adding more interviewers to the panel to increase availability"

---

## Key Terms Explained

### Pipeline
The entire hiring process from finding a candidate to making them an offer. Like a pipeline carrying water, candidates flow through stages.

### Stage
A specific step in the hiring process (Found, Initial Discussion, First Round, etc.).

### SLA (Service Level Agreement)
A time limit or deadline for each stage. Example: "We promise to schedule a First Round interview within 7 days of Initial Discussion."

### SLA Breach
When a candidate stays in a stage longer than the time limit. Example: If First Round SLA is 7 days but candidate has been waiting 9 days, that's a breach.

### On Track
Candidate is moving through stages within the time limits.

### At Risk
Candidate is close to breaching SLA or has already breached it.

### Conversion Rate
Percentage of candidates who successfully move to the next stage. Example: If 10 people do First Round and 6 move to Second Round, conversion rate is 60%.

### Pipeline Velocity
How fast candidates move through the entire process. Example: "Average time from Found to Selected is 21 days."

### Active Candidates
People currently in the hiring process who haven't been selected or rejected yet.

### Days in Stage
How long a candidate has been at their current step. Example: "Sarah Chen has been in First Round for 3 days."

### Days Remaining
How much time left before SLA deadline. Example: "4 days remaining" means 4 days until breach.

### Days Overdue
How far past the deadline a candidate is. Example: "-2 days" means they're 2 days past the deadline.

### Feedback Pending
Waiting for an interviewer to submit their comments and rating after an interview.

### Recruiter
The person responsible for managing this candidate through the process.

---

## Business Benefits

### For Recruiters:
- Never lose track of a candidate
- Know exactly what to work on each day (sorted by urgency)
- Spend less time searching emails and spreadsheets
- More time actually talking to candidates

### For Hiring Managers:
- See all feedback in one place before making decisions
- Know which candidates are moving forward without asking recruiters
- Identify process problems (bottlenecks, delays)

### For Executives:
- Data-driven hiring decisions
- Visibility into team performance
- Ability to forecast when positions will be filled
- Identify which recruiters need support

### For the Company:
- Hire people faster (better candidate experience, less risk of losing them to competitors)
- More predictable hiring timelines
- Better quality hires (all feedback captured and reviewed)
- Accountability (everyone knows who needs to do what by when)

---

## What Success Looks Like

**Before this application:**
- "Where is that candidate we interviewed last month?"
- "Did Sarah submit feedback yet?"
- "How many people are we hiring this quarter?"
- "Why does hiring take so long?"
- Candidates wait weeks with no updates and accept other offers

**After this application:**
- "I can see exactly where every candidate is"
- "The red alert box shows me who needs action today"
- "We're averaging 18 days to hire, down from 30 days"
- "We haven't missed an SLA deadline in 2 weeks"
- Candidates have smooth, fast experiences and accept our offers

---

## Summary

This Recruitment Tracker application transforms hiring from a chaotic, email-based process into an organized, visible, and accountable system. Every stakeholder—from recruiters doing daily work to executives making strategic decisions—has the information they need, when they need it, in a format that makes sense for their role.

The core principle is simple: **If you can see it, you can manage it. If you can manage it, you can improve it.**
