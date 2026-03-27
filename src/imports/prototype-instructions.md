A) Add Pop-up Modals (Overlays)

Create these as separate frames and use them as overlays.

Success Modal – Add Course
Title: Course Added
Message: The course has been successfully added to your Major Plan.
Buttons: View Plan, Close

Error Modal – Course Already Added
Title: Action Failed
Message: This course is already in your Major Plan.
Button: Close

Error Modal – Prerequisite Not Met
Title: Registration Failed
Message: You must complete the required prerequisite before registering for this course.
Button: Close

B) Add Annotations (Numbered Notes)

On each main screen (Dashboard, Roadmap, Major Plan, Resources, Admin), add small numbered annotations explaining UI elements.

Example for Roadmap screen:

Sidebar Navigation – Navigate between Dashboard, Roadmap, Resources, and Admin.

Search Bar – Search for courses and resources.

Credit Summary Cards – Display completed, in-progress, and remaining credits.

Roadmap Chart – Shows prerequisite structure.

Add/Register Button – Adds course to plan or attempts registration.

Success Modal – Appears after successful action.

Error Modal – Appears when validation fails.

Keep annotations small and professional.

C) Prototype Linking

In Prototype mode, connect interactions:

Add to Plan → Open Success Modal

Add to Plan (error case) → Open Error Modal

Register (if available) → Open appropriate modal

Close button → Close Overlay

View Plan → Navigate to Major Plan screen

Sidebar items → Navigate to corresponding screens