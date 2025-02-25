**TOEFL iBT Test Simulator - Front-End Design Proposal**

**1. Introduction & Project Overview**

This document outlines the design proposal for the front-end development of a TOEFL iBT Test Simulator web application. The goal of this simulator is to provide users with a realistic and effective platform to practice for the TOEFL iBT test. This simulator will include all four sections of the TOEFL iBT: Reading, Listening, Speaking, and Writing, and will allow users to practice full tests, individual sections, or specific task types within sections. This proposal is intended for the front-end engineer who will be responsible for implementing the user interface and user experience based on these guidelines.

**2. Overall TOEFL iBT Test Structure**

The TOEFL iBT test simulator will replicate the structure of the official TOEFL iBT test, comprising four sections delivered in the following order:

*   **Reading Section:** Assesses reading comprehension of academic texts.
*   **Listening Section:** Assesses understanding of spoken English in academic settings.
*   **Speaking Section:** Assesses spoken English proficiency in academic and general contexts.
*   **Writing Section:** Assesses written English proficiency in academic settings.

The approximate total test time is 3 hours, excluding check-in and post-test activities. A mandatory 10-minute break is provided after the Listening section and before the Speaking section.

**Test Flow:**
The user flow for taking a test will be as follows:
1.  **Test Type Selection Intro Page:** User selects the type of test they wish to take (Mooc Full Test, or Practice by Section).
2.  **Section Selection Page:** (If applicable, depending on test type) User selects a section to practice.
3.  **Task List Page:** User selects a specific task within the chosen section (if practicing by task type).
4.  **Section Intro Page / Task Intro Page:** Instructions and information for the selected section or task.
5.  **Task/Test Execution:** User completes the questions or tasks within the selected test.
6.  **Review Page:** User reviews an estimated score for the completed task/test.
7.  **Sections Page:** User is returned to the Sections Page to select another test or task.

For the **Mooc Full Test**, the simulator will follow a predefined strict linear path through all four sections in the order listed above.

**3. Page-by-Page Design Proposal (with Wireframes)**

**3.1 Test Type Selection Intro Page**

**Description:** This is the initial landing page after starting the simulator. It presents the user with two primary options: to take a full MOOC test simulating the entire TOEFL iBT experience, or to practice specific sections of the test.

**Key Components:**
*   Logo Area (for branding)
*   Page Title: "Choose Test Type"
*   Introductory Text: Briefly explain the two test type options.
*   Buttons: "Take Full MOOC Test (All Sections)," "Practice by Section."
*   Footer (Optional: Copyright, Links).

**Wireframe:**
```
--------------------------------------------------
|                     [Logo Area]                  |
--------------------------------------------------
|                                                 |
|        [Large, Clear Page Title:  Choose Test Type]       |
|                                                 |
|        [Brief Introductory Text explaining test types]       |
|                                                 |
--------------------------------------------------
|                                                 |
|    [Button:  Take Full MOOC Test (All Sections)]    |
|                                                 |
|    [Button:  Practice by Section]               |
|                                                 |
--------------------------------------------------
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.2 Section Selection Page**

**Description:** This page is displayed when the user chooses "Practice by Section" on the Intro Page. It presents the four TOEFL iBT sections (Reading, Listening, Speaking, Writing). For each section, it provides options to take a full section test or to practice specific task types within that section, based on the specific task breakdown for each section.

**Key Components:**
*   Top Menu: Section Title - "Choose a Section to Practice"
*   Page Title: "Select a Section to Practice"
*   Brief Instructions:  "Choose a section below to begin practicing. For each section, you can choose to take a full section test or practice specific task types."
*   **Section Cards (for each section: Reading, Listening, Speaking, Writing):**
    *   Section Title: (e.g., "Reading Section")
    *   Section Description: (Very brief description of what the section tests)
    *   Button: "Take Full [Section Name] Test" (e.g., "Take Full Reading Section Test")
    *   Task Type Options Area: (This area will vary for each section)
        *   **Reading Section:**  [Link/Button: Single Passage (Task)]
        *   **Listening Section:** [Link/Button: Conversation Task], [Link/Button: Lecture Task]
        *   **Speaking Section:** [Link/Button: Speaking Task 1], [Link/Button: Speaking Task 2], [Link/Button: Speaking Task 3], [Link/Button: Speaking Task 4]
        *   **Writing Section:** [Link/Button: Integrated Writing Task], [Link/Button: Independent Writing Task]
*   Footer (Optional: Copyright, Links).

**Wireframe:**
```
--------------------------------------------------
| [Top Menu: Section Title: Choose a Section to Practice] |
--------------------------------------------------
|                                                 |
|        [Page Title:  Select a Section to Practice]      |
|                                                 |
|        [Brief Instructions: Choose a section below...] |
|                                                 |
--------------------------------------------------
|                                                 |
|  [Section Card - Reading Section]                 |
|  ---------------------------------------------   |
|  |  [Section Title: Reading Section]          |   |
|  |  [Brief Section Description: ...Reading...] |   |
|  |  [Button: Take Full Reading Section Test]   |   |
|  |  [Task Type Options Area:]                  |   |
|  |  |  [Link/Button: Single Passage (Task)]     |   |
|  ---------------------------------------------   |
|                                                 |
|  [Section Card - Listening Section]               |
|  ---------------------------------------------   |
|  |  [Section Title: Listening Section]        |   |
|  |  [Brief Section Description: ...Listening...]|   |
|  |  [Button: Take Full Listening Section Test] |   |
|  |  [Task Type Options Area:]                  |   |
|  |  |  [Link/Button: Conversation Task]        |   |
|  |  |  [Link/Button: Lecture Task]           |   |
|  ---------------------------------------------   |
|                                                 |
|  [Section Card - Speaking Section]                |
|  ---------------------------------------------   |
|  |  [Section Title: Speaking Section]         |   |
|  |  [Brief Section Description: ...Speaking..]|   |
|  |  [Button: Take Full Speaking Section Test]|   |
|  |  [Task Type Options Area:]                  |   |
|  |  |  [Link/Button: Speaking Task 1]          |   |
|  |  |  [Link/Button: Speaking Task 2]          |   |
|  |  |  [Link/Button: Speaking Task 3]          |   |
|  |  |  [Link/Button: Speaking Task 4]          |   |
|  ---------------------------------------------   |
|                                                 |
|  [Section Card - Writing Section]                 |
|  ---------------------------------------------   |
|  |  [Section Title: Writing Section]          |   |
|  |  [Brief Section Description: ...Writing...] |   |
|  |  [Button: Take Full Writing Section Test]   |   |
|  |  [Task Type Options Area:]                  |   |
|  |  |  [Link/Button: Integrated Writing Task]  |   |
|  |  |  [Link/Button: Independent Writing Task] |   |
|  ---------------------------------------------   |
|                                                 |
--------------------------------------------------
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.3 Task List Page (Example: Reading - Single Passage Tasks)**

**Description:** This page is displayed when a user clicks on a *task type* link/button within a Section Card on the Section Selection Page (e.g., "Single Passage (Task)" for Reading). It lists available instances of that specific task type. Tasks are presented as numbered items.

**Key Components:**
*   Top Menu: Section Title - "[Section Name] Section - [Task Type] Tasks" (e.g., "Reading Section - Single Passage Tasks")
*   Page Title: "Choose a [Task Type] Task" (e.g., "Choose a Single Passage Task")
*   Brief Instructions: "Select a task number below to begin practicing."
*   **Task List Area:**
    *   A list or grid of Task Cards.
    *   Each Task Card should display: Task Number (e.g., "#51", "#1", "#2", etc.).
    *   Each Task Card should be clickable to navigate to the Task Intro Page for that specific task.
*   Button: "Back to Section Selection"
*   Footer (Optional: Copyright, Links).

**Wireframe:**
```
--------------------------------------------------
| [Top Menu: Section Title: Reading Section - Single Passage Tasks] |
--------------------------------------------------
|                                                 |
|        [Page Title:  Choose a Single Passage Task]    |
|                                                 |
|        [Brief Instructions: Select a task number below...] |
|                                                 |
--------------------------------------------------
|                                                 |
|    [Task Card: #51]                             |
|    [Task Card: #52]                             |
|    [Task Card: #53]                             |
|    [Task Card: #54]                             |
|    [... and more Task Cards as needed ...]       |
|      (Task Cards in a list or grid layout)        |
|                                                 |
--------------------------------------------------
|                                                 |
|    [Button: Back to Section Selection]           |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.4 Section Intro Page (Example: Reading Section Intro)**

**Description:** This page appears immediately before a user starts a full section test (e.g., "Take Full Reading Section Test" from the Section Selection Page). It provides an overview of the entire section, including the skills tested and the total time allocated for the section. It prepares the user for what to expect in the upcoming section.

**Key Components:**
*   Top Menu: Section Title - "[Section Name] Section - Introduction" (e.g., "Reading Section - Introduction")
*   Page Title: "[Section Name] Section - Introduction" (e.g., "Reading Section - Introduction")
*   **Section Overview Area:**
    *   Section Name: (e.g., "Reading Section")
    *   Description of Section:  A paragraph or short bullet points explaining what the section tests and the skills assessed.
    *   Time Limit:  Clearly state the total time limit for the section (e.g., "Time Limit: 54-72 minutes").
    *   Number of Questions/Tasks: (Approximate number of questions or tasks in the section - e.g., "Number of Questions: 30-40").
    *   General Instructions for the Section:  (e.g., "Read each passage carefully and answer all questions within the time limit. You can navigate between questions using the 'Next' button.").
*   Button: "Start [Section Name] Test" (e.g., "Start Reading Section Test")

**Wireframe:**
```
--------------------------------------------------
| [Top Menu: Section Title: Reading Section - Introduction] |
--------------------------------------------------
|                                                 |
|        [Page Title:  Reading Section Introduction]     |
|                                                 |
|        [Section Overview Area]                   |
|        ---------------------------------------   |
|        |  [Section Name: Reading Section]      |   |
|        |  [Description of Section: ...Reading...] |   |
|        |  [Time Limit: 54-72 minutes]          |   |
|        |  [Number of Questions: 30-40]         |   |
|        |  [General Instructions: ...Read...]    |   |
|        ---------------------------------------   |
|                                                 |
|    [Button: Start Reading Section Test]          |
|                                                 |
--------------------------------------------------
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.5 Task Intro Page (Example: Reading - Single Passage Task Intro)**

**Description:** This page appears immediately before a user starts a specific task test (e.g., after selecting "Single Passage (Task)" and then a specific passage number in the Task List Page). It provides information specific to that task type, including instructions, preparation time (if applicable), and response time (if applicable). It prepares the user for the specific task they are about to undertake.

**Key Components:**
*   Top Menu: Section Title - "[Section Name] Section - [Task Type] Task Introduction" (e.g., "Reading Section - Single Passage Task Introduction")
*   Page Title: "[Task Name/Type] Task - Introduction" (e.g., "Single Passage Task - Introduction" or "Speaking Task 1 - Introduction")
*   **Task Overview Area:**
    *   Task Name/Type: (e.g., "Single Passage Task", "Speaking Task 1: Independent Speaking")
    *   Specific Instructions for this Task: Detailed instructions on how to complete this specific task type within the Reading section.
    *   Preparation Time: (If applicable, for Speaking tasks)  Display preparation time (e.g., "Preparation Time: 15 seconds").
    *   Response Time: (If applicable, for Speaking and Writing tasks) Display response/writing time (e.g., "Response Time: 45 seconds", "Writing Time: 20 minutes").
*   Button: "Start [Task Name/Type] Task" (e.g., "Start Single Passage Task", "Start Speaking Task 1")

**Wireframe:**
```
--------------------------------------------------
| [Top Menu: Section Title: Reading Section - Single Passage Task Introduction] |
--------------------------------------------------
|                                                 |
|        [Page Title:  Single Passage Task - Introduction] |
|                                                 |
|        [Task Overview Area]                      |
|        ---------------------------------------   |
|        |  [Task Name/Type: Single Passage Task] |   |
|        |  [Specific Instructions: ...Read...]   |   |
|        ---------------------------------------   |
|                                                 |
|    [Button: Start Single Passage Task]           |
|                                                 |
--------------------------------------------------
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.6 Reading Question Page (for Single Passage Task)**

**Description:** This page is used to present a single reading passage and its associated questions when a user is practicing a "Single Passage Task." The page initially displays only the reading passage. Questions are presented sequentially on the right side panel as the user progresses using the "Next" button. The final question type, the Prose Summary Question, is presented in a full-width layout after all other question types for the passage have been answered, marking the end of the task.

**Key Components:**
*   Top Menu: Section Title - "Reading Section" (and Question Progress indicator, Timer).
*   **Two-Column Layout (Initially):**
    *   Left Column (Passage Area):
        *   Passage Title: Displayed at the top of the passage area.
        *   Passage Body: Scrollable area to display the reading passage text.
    *   Right Column (Question Area):
        *   Initially empty when the page loads.
        *   Dynamically populated with questions as the user clicks "Next."
        *   Displays: Question Number, Question Stem, Answer Options (appropriate UI for question type).
*   **Navigation Buttons:** "Previous" (within the same passage's questions), "Next."
*   **Special Case - Prose Summary Question:**
    *   Presented in a Full-Width Layout (replaces the two-column layout).
    *   Displays: Question Stem for Prose Summary Question, Prose Summary Answer Options (Drag-and-Drop UI).
    *   Navigation: Only "Next" button available after answering. Clicking "Next" after the Prose Summary Question completes the task and leads to the Review Page.

**Wireframe - Initial State (Passage Only):**
```
--------------------------------------------------
| [Top Menu: Question Progress (N/A initially), Timer (Task Timer), Section Title: Reading Section] |
--------------------------------------------------
|                                                 |
|  [Two-Column Layout]                             |
|  -------------------------  -------------------- |
|  | [Left Column: Passage Area] | [Right Column:    |
|  | ----------------------- | |  Question Area -  |
|  | | [Passage Title]       | |  Initially Empty] |
|  | | [Passage Body        | | | (Scrollable Area)]    
| | ----------------------- | -------------------- | 
| ------------------------- -------------------- | 
| [Navigation Buttons: [Next] ] | 
| [Footer: Copyright Info, Links, etc. (Optional)] 
-------------------------------------------------- 
```

**Wireframe - Question Displayed:**
```
--------------------------------------------------
| [Top Menu: Question Progress (e.g., 1/X), Timer (Task Timer), Section Title: Reading Section] |
--------------------------------------------------
|                                                 |
|  [Two-Column Layout]                             |
|  -------------------------  -------------------- |
|  | [Left Column: Passage Area] | [Right Column:    |
|  | ----------------------- | |  Question Area]   |
|  | | [Passage Title]       | |  ----------------- |
|  | | [Passage Body        | |  | [Question Number]|
|  | | (Scrollable Area)]    | |  | [Question Stem]  |
|  | ----------------------- | |  | [Answer Options] |
|  |                           |  ----------------- |
|  -------------------------  -------------------- |
|                                                 |
|    [Navigation Buttons:  [Previous]  [Next] ]    |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**Wireframe - Prose Summary Question (Full Width):**
```
--------------------------------------------------
| [Top Menu: Question Progress (e.g., Last Question), Timer (Task Timer), Section Title: Reading Section] |
--------------------------------------------------
|                                                 |
|        [Full-Width Layout - Prose Summary Question]   |
|        ---------------------------------------   |
|        |  [Question Stem: Prose Summary Question] |   |
|        |  [Prose Summary Answer Options        |   |
|        |  (Drag-and-Drop UI)]                 |   |
|        ---------------------------------------   |
|                                                 |
|    [Navigation Buttons:  [Next] ]                |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.7 Reading Section Page (for Full Section Test)**

**Description:** This is not a separate *page* type in the same way as the others, but rather a *container* or *mode* that manages the flow of multiple "Reading Question Pages" within a full Reading Section Test. It orchestrates the sequential presentation of passages and their questions. The user navigates through passages using the same "Reading Question Page" structure. Upon completing the questions for the last passage in the section, the Reading Section Test ends, and the user is directed to the Review Page.

**Key Functionality (within the Front-End Application):**
*   Passage Sequencing
*   "Reading Question Page" Re-use
*   Section Timer
*   Section Progress
*   Section End Detection

**Conceptual Flow Diagram:**
```
[Start of Reading Section Test]

--> [Display "Reading Question Page" for Passage 1]
    (User interacts with Passage 1 questions using "Reading Question Page" UI)
    (Section Timer running)

--> [After completing Prose Summary Question for Passage 1 and clicking "Next"]

--> [Display "Reading Question Page" for Passage 2]
    (User interacts with Passage 2 questions using "Reading Question Page" UI)
    (Section Timer continues)

--> [ ... Repeat for Passage 3 (and Passage 4 if applicable) ...]

--> [After completing Prose Summary Question for the LAST Passage and clicking "Next"]

--> [End of Reading Section Test]

--> [Navigate to Review Page]
```

**3.8 Listening Question Page**

**Description:** This page is used to present listening comprehension questions. The primary interaction begins with the automatic playback of an audio track (lecture or conversation excerpt). After the audio finishes playing, the user proceeds by clicking "Next" to access the questions related to that audio. Questions are presented sequentially, one per page.  Question types are primarily multiple-choice, including both single-answer and multiple-answer formats.  There is a specific question type that may require re-listening to a portion of the audio; this functionality needs to be incorporated.

**Key Components:**
*   Top Menu: Section Title - "Listening Section" (and Question Progress indicator, Timer).
*   **Audio Playback Area:**
    *   Audio Player Component:  Initially, upon page load, the audio track starts playing automatically.
    *   Static Image Area:  Display a placeholder image while the audio is playing.
*   **Question Area (Appears after clicking "Next" from Audio Playback):**
    *   Question Number: Displayed prominently.
    *   Question Stem: The text of the listening question.
    *   Answer Options: Multiple-choice options (radio buttons for single answer, checkboxes for multiple answers).
    *   "Replay Audio Snippet" Button (Optional):  For certain questions, a button to replay a short, specific portion of the audio related to that question.
*   **Navigation Buttons:** "Next".

**Wireframe - Initial State (Audio Playback):**
```
--------------------------------------------------
| [Top Menu: Question Progress (N/A initially), Timer (Section Timer), Section Title: Listening Section] |
--------------------------------------------------
|                                                 |
|        [Audio Playback Area]                    |
|        ---------------------------------------   |
|        | [Audio Player Component]             |   |
|        | (Play/Pause, Volume, Progress, Replay)|   |
|        | [Static Image Area]                  |   |
|        ---------------------------------------   |
|        [Text: "Audio is playing. Please listen carefully."] |
|                                                 |
--------------------------------------------------
|                                                 |
|    [Navigation Buttons:  [Next] ]                |
|    (Initially, perhaps "Next" is disabled or less prominent until audio finishes) |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**Wireframe - Question Displayed:**
```
--------------------------------------------------
| [Top Menu: Question Progress (e.g., 1/X), Timer (Section Timer), Section Title: Listening Section] |
--------------------------------------------------
|                                                 |
|        [Question Area]                          |
|        ---------------------------------------   |
|        | [Question Number]                    |   |
|        | [Question Stem]                      |   |
|        | [Answer Options]                     |   |
|        | (Radio buttons or Checkboxes)         |   |
|        | [Optional: "Replay Audio Snippet" Button] |
|        | (Conditionally displayed for certain questions) |
|        ---------------------------------------   |
|                                                 |
|    [Navigation Buttons:  [Next] ]                |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.9 Listening Section Page (for Full Section Test)**

**Description:** Similar to the Reading Section Page, this is a container or mode to manage the flow of a full Listening Section Test. It orchestrates the presentation of listening audio tracks (conversations and lectures) and their associated questions. A full section test consists of a sequence of 2 Conversations and 3 Lectures. The user navigates through each audio track and its questions using the "Listening Question Page" structure.  Upon completing the questions for the last audio track in the section, the Listening Section Test ends, and the user is directed to the Review Page.

**Key Functionality (within the Front-End Application):**
*   Audio Track Sequencing
*   "Listening Question Page" Re-use
*   Section Timer
*   Section Progress
*   Section End Detection

**Conceptual Flow Diagram:**
```
[Start of Listening Section Test]

--> [Display "Listening Question Page" for Conversation 1]
    (Audio plays automatically, user answers questions on "Listening Question Page")
    (Section Timer running)

--> [After completing questions for Conversation 1 and clicking "Next"]

--> [Display "Listening Question Page" for Conversation 2]
    (Audio plays automatically, user answers questions on "Listening Question Page")
    (Section Timer continues)

--> [After completing questions for Conversation 2 and clicking "Next"]

--> [Display "Listening Question Page" for Lecture 1]
    (Audio plays automatically, user answers questions on "Listening Question Page")
    (Section Timer continues)

--> [ ... Repeat for Lecture 2 and Lecture 3 ...]

--> [After completing questions for the LAST Lecture (Lecture 3) and clicking "Next"]

--> [End of Listening Section Test]

--> [Navigate to Review Page]
```

**3.10 Speaking Task Page**

**Description:** This page is designed to handle all four types of Speaking tasks in the TOEFL iBT. The UI dynamically adapts based on the specific task type. It manages the sequential presentation of standardized task introduction prompts, reading passages (for integrated tasks), audiovisual content (lectures/conversations), task-specific questions, preparation timers, recording timers, audio recording functionality, audio cues for preparation and recording start, and playback options. The page guides the user through distinct phases: Initial Prompt/Reading/Audiovisual Setup, Preparation, Recording, and Post-Recording Review.

**Key Components (Dynamically Displayed based on Task Type and Phase):**
*   Top Menu: Section Title - "Speaking Section" (and Task Progress indicator, Task Timer - dynamically displays relevant timer).
*   Task Prompt Area: Displays standardized task introduction prompts and, in the Preparation Phase, the Task-Specific Question. May include audio playback for prompts and questions.
*   Reading Passage Area (Conditional - Tasks 2 & 3): Displays reading passages and reading timer for Integrated Speaking Tasks 2 and 3.
*   Audiovisual Area (Conditional - Tasks 2, 3, & 4): Displays audio content (conversations/lectures), progress bar, and static image for Tasks 2, 3, & 4.
*   Preparation Timer Area: Displays countdown timer and instructional text during the preparation phase. Includes audio announcement and beep sound at the start of preparation.
*   Recording Area: Displays recording status, recording timer, microphone permission indicator, and playback button during and after the recording phase. Includes audio announcement and beep sound at the start of recording.
*   Navigation Buttons: "Next" button to proceed after completing each task.

**Conceptual Flow Diagram:**
```
[Start of Speaking Task (Task Type Determined)]

--> [Phase 1: Initial Prompt & Reading/Audiovisual Setup]
    --> [Display Task Prompt Area (Standardized Prompt) & Play Prompt Audio]
    --> [IF Task Type is 2 or 3: THEN Replace Task Prompt Area with Reading Passage Area & Start Reading Timer]
    --> [When Reading Timer ends (Tasks 2 & 3) OR after Prompt Audio (Task 4): THEN Replace Reading Passage Area (or Task Prompt Area) with Audiovisual Area & Play Audio Content (Conversation/Lecture) & Show Progress/Image]
    --> [After Audio Content: Replace Audiovisual Area with Task-Specific Question Area & Play Question Audio (Once)]

--> [Phase 2: Preparation Phase (with Audio Cues - Finalized)]
    --> [After Question Audio: Play **Preparation Audio Announcement** (e.g., "Preparation time...")]
    --> [Play **Preparation Beep Sound**]
    --> [Display Preparation Timer Area below Task-Specific Question Area & Start Preparation Timer (Countdown *after beep*)]

--> [Phase 3: Recording Phase (with Audio Cues - Finalized)]
    --> [When Preparation Timer ends: Play **Recording Audio Announcement** (e.g., "Recording will start...")]
    --> [Play **Recording Beep Sound**]
    --> [Replace Preparation Timer Area with Recording Area & Start Recording (Automatic Stop at Time Limit *after beep*)]

--> [Phase 4: Post-Recording & Navigation]
    --> [After Recording ends: Display Playback Recording Button & Activate "Next" Button]

--> [End of Speaking Task]
```

**Wireframe - Example - Task 1: Independent Speaking:**
```
--------------------------------------------------
| [Top Menu: Task Progress (e.g., 1/4), Task Timer (Preparation/Recording Timer), Section Title: Speaking Section] |
--------------------------------------------------
|                                                 |
|        [Task Prompt Area]                        |
|        ---------------------------------------   |
|        | [Audio Player Component] (Prompt Audio) |  <- For tasks with audio prompt
|        | [Prompt Text]                           |   |
|        ---------------------------------------   |
|                                                 |
|        [Preparation Timer Area]                  |
|        ---------------------------------------   |
|        | [Preparation Timer Display (15s)]     |   |
|        | [Text: "Prepare your response"]        |   |
|        ---------------------------------------   |
|                                                 |
|        [Recording Area]                          |
|        ---------------------------------------   |
|        | [Recording Status Indicator]          |   |
|        | [Recording Timer Display (45s)]       |   |
|        | [Text: "Recording in progress"]        |   |
|        | [Playback Recording Button]           |   |
|        ---------------------------------------   |
|                                                 |
|    [Navigation Buttons:  [Next] ]                |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**Wireframe - Example - Task 2: Integrated Speaking - Preparation Phase:**
```
--------------------------------------------------
| [Top Menu: Task Progress (e.g., 2/4), Task Timer (Preparation Timer), Section Title: Speaking Section] |
--------------------------------------------------
|                                                 |
|        [Task Prompt Area - Task-Specific Question] |  <-- NOW SHOWING TASK-SPECIFIC QUESTION
|        ---------------------------------------   |
|        | [Audio Player Component] (Question Audio)| <- Question Audio (plays ONCE - Task-Specific Question)
|        | [Task-Specific Question Text]           |   |  <-- Task-Specific Question TEXT
|        ---------------------------------------   |
|                                                 |
|        [Preparation Timer Area]                  |
|        ---------------------------------------   |
|        | [Preparation Timer Display (30s)]     |   |
|        | [Text: "Prepare your response"]        |   |
|        ---------------------------------------   |
|        [Reading Passage Area - NOW HIDDEN]      |  <- Reading Passage Area is HIDDEN in Prep Phase
|                                                 |
|        [Recording Area - STILL HIDDEN]          |  <- Recording Area is still HIDDEN
|                                                 |
|    [Navigation Buttons:  [Next (disabled)] ]     |  <- "Next" likely disabled during prep
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.11 Speaking Section Page (for Full Section Test)**

**Description:** This page manages the flow of a full Speaking Section Test. It presents a predefined sequence of speaking tasks, one from each of the four TOEFL iBT Speaking Task types, in the order: Task 1, Task 2, Task 3, and Task 4.  It utilizes the **3.10 Speaking Task Page** component to deliver each individual speaking task. The page controls the progression through the section, manages the section timer, and detects the completion of the final task to end the section test and navigate to the Review Page.

**Key Functionality (within the Front-End Application):**
*   Task Sequencing
*   "Speaking Task Page" Re-use
*   Section Progress Tracking
*   Section Timer Management
*   Section End Detection

**Conceptual Flow Diagram:**
```
[Start of Speaking Section Test]

--> [Task 1: Display "Speaking Task Page" for Task 1 (Independent Speaking)]
    (User completes Task 1 using "Speaking Task Page" UI)

--> [After Task 1: Automatically transition to Task 2]

--> [Task 2: Display "Speaking Task Page" for Task 2 (Integrated - Campus Situation)]
    (User completes Task 2 using "Speaking Task Page" UI)

--> [After Task 2: Automatically transition to Task 3]

--> [Task 3: Display "Speaking Task Page" for Task 3 (Integrated - Academic Lecture)]
    (User completes Task 3 using "Speaking Task Page" UI)

--> [After Task 3: Automatically transition to Task 4]

--> [Task 4: Display "Speaking Task Page" for Task 4 (Integrated - Lecture Concept/Process)]
    (User completes Task 4 using "Speaking Task Page" UI)

--> [After Task 4: End of Speaking Section Test]

--> [Navigate to Review Page]
```

**3.12 Writing Task Page**

**Description:** This page is designed to handle both types of Writing tasks in the TOEFL iBT: Integrated Writing and Independent Writing. The UI dynamically adapts based on the specific task type.  It manages the presentation of reading passages (for Integrated Writing), audio playback of lectures (for Integrated Writing), writing prompts, text editor functionality, writing timers, and word count displays. The page guides the user through distinct phases for Integrated Writing: Reading, Listening, and Writing, while Independent Writing has a single Writing Phase.

**Key Components (Dynamically Displayed based on Task Type and Phase):**
*   Top Menu: Section Title - "Writing Section" (and Task Progress indicator, Task Timer - displays writing time).
*   Task Prompt Area: Displays the writing prompt for the specific task (Integrated or Independent).
*   Reading Passage Area (Conditional - Integrated Writing Task): Displayed *only* for the Integrated Writing Task and remains visible during the writing phase.
*   Listening Area (Conditional - Integrated Writing Task): Displayed *only* for the Integrated Writing Task to play the lecture audio.
*   Text Editor Area: A text area with word count display for writing the response.
*   Writing Timer Area: Countdown timer displaying the remaining writing time (20 minutes for Integrated, 10 minutes for Independent).
*   Navigation Buttons: "Next" button for submission.

**Wireframe - Integrated Writing Task - Phase 1: Reading:**
```
--------------------------------------------------
| [Top Menu: Task Progress (e.g., 1/2), Task Timer (Reading Timer), Section Title: Writing Section] |
--------------------------------------------------
|                                                 |
|        [Full-Width Layout - Reading Phase]        |
|        ---------------------------------------   |
|        | [Reading Passage Area]                 |   |
|        | ------------------------------------- |   |
|        | | [Passage Title]                     |   |
|        | | [Passage Body (Scrollable Area)]    |   |
|        | ------------------------------------- |   |
|        | [Reading Timer (3:00 - Countdown)]    |   |
|        | [Text: "Read the passage carefully..."]|   |
|        ---------------------------------------   |
|                                                 |
|    [Navigation Buttons:  (None - Auto Transition)] |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**Wireframe - Integrated Writing Task - Phase 2: Listening:**
```
--------------------------------------------------
| [Top Menu: Task Progress (e.g., 1/2), Section Title: Writing Section] |
--------------------------------------------------
|                                                 |
|        [Full-Width Layout - Listening Phase]      |
|        ---------------------------------------   |
|        | [Listening Area]                       |   |
|        | ------------------------------------- |   |
|        | | [Audio Player Component]             |   |
|        | | [Static Image Area (Optional)]      |   |
|        | ------------------------------------- |   |
|        | [Text: "Listen to the lecture..."]     |   |
|        ---------------------------------------   |
|                                                 |
|    [Navigation Buttons:  (None - Auto Transition)] |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**Wireframe - Integrated Writing Task - Phase 3: Writing:**
```
--------------------------------------------------
| [Top Menu: Task Progress (e.g., 1/2), Task Timer (Writing Timer), Section Title: Writing Section] |
--------------------------------------------------
|                                                 |
|  [Two-Column Layout - Writing Phase]             |
|  -------------------------  -------------------- |
|  | [Left Column: Reading Passage Area] | [Right Column:    |
|  | ----------------------- | |  Writing Area]    |
|  | | [Passage Title]       | |  ----------------- |
|  | | [Passage Body        | |  | [Task Prompt Area]|
|  | | (Scrollable Area)]    | |  | [Prompt Text]    |
|  | ----------------------- | |  | [Text Editor Area]|
|  |                           | |  | [Word Count]    |
|  |                           |  ----------------- |
|  -------------------------  -------------------- |
|                                                 |
|        [Writing Timer Area (20:00 - Countdown)]   |
|                                                 |
|    [Navigation Buttons:  [Next (Submit)] ]       |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**Wireframe - Independent Writing Task - Phase 1: Writing (Single Phase):**
```
--------------------------------------------------
| [Top Menu: Task Progress (e.g., 2/2), Task Timer (Writing Timer), Section Title: Writing Section] |
--------------------------------------------------
|                                                 |
|  [Two-Column Layout - Independent Writing]       |
|  -------------------------  -------------------- |
|  | [Left Column: Prompt/Context Area] | [Right Column:    |
|  | ----------------------- | |  Writing Area]    |
|  | | [Prompt Instructions]   | |  ----------------- |
|  | | [Scenario/Context Text]| |  | [Task Prompt Area]|
|  | | [Viewpoints/Quotes Area]| |  | [Prompt Text]    |
|  | ----------------------- | |  | [Text Editor Area]|
|  |                           | |  | [Word Count]    |
|  |                           |  ----------------- |
|  -------------------------  -------------------- |
|                                                 |
|        [Writing Timer Area (10:00 - Countdown)]   |
|                                                 |
|    [Navigation Buttons:  [Next (Submit)] ]       |
|                                                 |
|   [Footer:  Copyright Info, Links, etc. (Optional)]   |
--------------------------------------------------
```

**3.13 Writing Section Page (for Full Section Test)**

**Description:** Manages the flow of a full Writing Section Test. It presents the two Writing Tasks in a fixed sequence: Integrated Writing Task followed by the Independent Writing Task.  It utilizes the **3.12 Writing Task Page** component to deliver each writing task. The page orchestrates the transition between tasks, manages individual task timers, and detects the completion of the final task to end the section test and navigate to the Review Page.

**Key Functionality (within the Front-End Application):**
*   Task Sequencing
*   "Writing Task Page" Re-use
*   Section Progress Tracking
*   Task Timer Management
*   Section End Detection

**Conceptual Flow Diagram:**
```
[Start of Writing Section Test]

--> [Task 1: Display "Writing Task Page" for Integrated Writing Task]
    (User completes Integrated Writing Task using "Writing Task Page" UI)
    (Integrated Writing Task Timer - 20 minutes)

--> [After completing Integrated Writing Task and clicking "Next"]

--> [Task 2: Display "Writing Task Page" for Independent Writing Task]
    (User completes Independent Writing Task using "Writing Task Page" UI)
    (Independent Writing Task Timer - 10 minutes)

--> [After completing Independent Writing Task and clicking "Next"]

--> [End of Writing Section Test]

--> [Navigate to Review Page]
```

**4. Component Library/Catalogue (Enhanced Descriptions)**

This section provides a summary of the key UI components that are used throughout the TOEFL iBT Test Simulator. These components are designed to be reusable and modular, promoting efficient development and maintainability.

*   **Top Menu Component:**
    *   Description:  A consistent header area at the top of each page, displaying the Section Title, and potentially Task Progress and Timer information, depending on the page type and context.
    *   Functionality:  Provides context and key information to the user throughout the test.
*   **Navigation Component:**
    *   Description:  A set of navigation buttons, primarily "Next" and "Previous". The availability and behavior of these buttons vary depending on the section and task type (e.g., "Previous" only in Reading Section tasks).
    *   Functionality:  Allows users to navigate between questions and tasks, and to submit responses or proceed through the test flow.
*   **Timer Component:**
    *   Description: A reusable countdown timer component, used for section timers, task timers (reading, preparation, recording, writing).  Visually displays time remaining in MM:SS format.
    *   Functionality:  Accurately tracks and displays time limits for different test sections and tasks. May trigger automatic transitions or submissions when time expires.
*   **Question Number/Progress Indicator Component:**
    *   Description:  Displays the current question number and overall progress within a task or section (e.g., "Question 3 of 10").
    *   Functionality:  Provides users with a clear indication of their progress through the test.
*   **Reading Passage Area Component:**
    *   Description:  A scrollable area to display reading passage text, including a passage title. Used in Reading Section and Integrated Writing Task.
    *   Functionality:  Presents reading passages in a clear and readable format, allowing for scrolling of longer passages.
*   **Question Stem Component:**
    *   Description:  Displays the text of a question. Used in Reading and Listening Sections.
    *   Functionality:  Clearly presents the question being asked to the user.
*   **Answer Options Component:**
    *   Description:  A dynamic component that renders different UI elements for answer selection based on the question type.  Supports:
        *   Radio buttons (for single-choice multiple choice)
        *   Checkboxes (for multiple-choice, multiple answer)
        *   Drag-and-Drop cards and slots (for Prose Summary and Table Completion questions in Reading)
        *   Clickable insertion points (for Insert Text questions in Reading)
    *   Functionality:  Provides appropriate and interactive UI elements for users to select or input their answers for various question types.
*   **Audio Player Component:**
    *   Description:  A standard audio player with controls for Play/Pause, Volume, Progress Bar, and Replay. Used in Listening and Speaking (for prompts/questions/lectures).
    *   Functionality:  Plays audio content for listening comprehension and speaking tasks. Should be accessible and user-friendly.
*   **Static Image Area Component:**
    *   Description:  An area to display a static image, often used in conjunction with the Audio Player in the Listening section, or as a placeholder image during audio playback in Speaking and Writing.
    *   Functionality:  Provides visual context or engagement during audio playback.
*   **Recording Controls Component (Speaking):**
    *   Description:  A component that manages the recording process for Speaking tasks. Includes:
        *   Recording Status Indicator (e.g., microphone icon, "Recording..." text)
        *   Recording Timer (countdown)
        *   Playback Recording Button (to review recorded response)
        *   Microphone Permission Handling
        *   Audio Announcements and Beep Sounds for Preparation and Recording start.
    *   Functionality:  Enables users to record their spoken responses, providing clear feedback on recording status and time.
*   **Text Editor Area Component (Writing):**
    *   Description:  A text area for users to compose written responses in the Writing section. Includes a real-time Word Count display. Basic text formatting (bold, italics, etc.) is not required.
    *   Functionality:  Provides a functional text input area for essay writing, with word count feedback.

**5. Navigation and User Flow Details (Consolidated)**

*   **Overall Test Flow:** (As described in Section 2)
*   **Section Navigation:**
    *   Section Selection Page allows users to choose sections for practice.
    *   Mooc Full Test progresses linearly through sections (Reading -> Listening -> Speaking -> Writing).
*   **Task Navigation:**
    *   Task List Pages (e.g., for Reading Single Passage Tasks) allow users to select specific tasks.
    *   Within Sections and Tasks: Primarily linear navigation using "Next" button.
    *   "Previous" Button: Available *only* within Reading Section tasks to navigate back to previous questions within the *same passage*. Not available in other sections or between passages/tasks.
*   **Review Page Navigation:** After completing a task or section test, users are directed to a Review Page with an estimated score.  A "Go to Sections Page" button on the Review Page returns users to the Section Selection Page to choose another test.
*   **Error Handling/Validation:**
    *   Unanswered Questions: If a user attempts to proceed without answering a question, the system will record a default "unanswered" state. No explicit error message or validation is required for unanswered questions in this design.
*   **Automatic Submissions:**
    *   Writing Tasks: Automatically submitted when the Writing Timer reaches zero.
    *   Speaking Tasks: Recording automatically stops when the Recording Timer reaches zero.

**6. Technical Considerations for the Front-End Engineer**

*   **Responsiveness:** The user interface must be fully responsive and adapt to different screen sizes (desktops, laptops, tablets, and mobile devices) to ensure accessibility and usability across various devices.
*   **Technology Stack (Recommended):** While the specific technology stack is flexible, it is recommended to use a modern React with Tailwind CSS
*   **API Integration:** The front-end application will need to fetch test content (passages, questions, audio, etc.) from a backend API.  The API is expected to provide data in JSON format. Audio and image content will be provided via URLs in the JSON data. The front-end engineer will need to design API requests to efficiently retrieve the necessary content for each section and task.
*   **Audio Recording (Speaking Section):**  Implementation of audio recording functionality in the Speaking Section will require browser-based audio recording APIs (e.g., MediaRecorder API in JavaScript). Ensure robust error handling and clear microphone permission prompts.
*   **State Management:** For managing test state, user responses, timers, and navigation, a suitable state management solution should be implemented (e.g., React Context).

**7. Visual Design Style Guide**

This section outlines the visual design style guide to be followed for the front-end implementation, ensuring a consistent and professional user interface.

**1. Color Palette:**

*   Primary Color: Teal (#008080 or Tailwind's teal-500)
*   Secondary Color: Light Gray/Off-White (#F4F4F4 or Tailwind's gray-100 or gray-200)
*   Accent Color: Deep Blue-Gray (#475569 or Tailwind's gray-600 or gray-700)
*   Success/Positive Feedback: Green (#4CAF50 or Tailwind's green-500)
*   Error/Negative Feedback: Red (#F44336 or Tailwind's red-500)
*   Primary Text: Dark Gray/Black (#333333 or Tailwind's gray-800 or black)
*   Secondary Text: Medium Gray (#71717A or Tailwind's gray-500)

**2. Font Choices:**

*   Primary Font (Body Text & UI): Open Sans (Sans-serif)
*   Headings Font: Open Sans (Bold) or similar clean sans-serif.

**3. Button Styles:**

*   Primary Buttons: Teal background, white text, rounded corners, hover effect, focus state.
*   Secondary Buttons: Light Gray background, dark gray text, rounded corners, hover effect, focus state.
*   Disabled Buttons: Reduced opacity.

**4. Other UI Elements & Overall Feel:**

*   Input Fields: Light background, subtle border, padding, clear focus state, Open Sans font.
*   Navigation: Simple, intuitive, top navigation bar or sidebar, teal for active items, clear labels.
*   Icons: Minimalist, consistent style (line or filled), accent color or teal.
*   Layout & Spacing: Clean layouts, ample whitespace, consistent margins and paddings, use grid and flexbox for responsiveness.
*   Overall Visual Feel: Clean, Professional, Academic, Focused, and Slightly Encouraging. Minimalist aesthetic, emphasizing content clarity and usability.

**(End of Design Proposal Document)**
