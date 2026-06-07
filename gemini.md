# GEMINI.md

## Project Overview

This project is a modern 3D portfolio website built as a frontend developer assessment.

The goal is to showcase professional frontend engineering skills rather than just visual effects.

The portfolio should demonstrate:

* React expertise
* Next.js architecture
* TypeScript best practices
* Performance optimization
* Responsive design
* Accessibility
* Clean component design
* Modern UI/UX
* 3D web development using React Three Fiber

The portfolio content is based entirely on the resume data provided by the owner.

Never invent experience, projects, achievements, skills, certifications, or employment history.

---

# Tech Stack

Framework:

* Next.js (App Router)

Language:

* TypeScript

Styling:

* Tailwind CSS

Animation:

* Framer Motion

3D:

* Three.js
* React Three Fiber
* @react-three/drei

Deployment:

* Vercel

Package Manager:

* npm

---

# Engineering Principles

Always prioritize:

1. Maintainability
2. Readability
3. Scalability
4. Performance
5. Accessibility

over visual complexity.

If multiple implementations are possible:

Choose the solution that a senior frontend engineer would approve during a code review.

---

# Code Standards

## TypeScript

Always:

* Use strict typing
* Avoid any
* Use interfaces and types appropriately
* Infer types when obvious
* Prefer type safety over convenience

Never:

* Disable TypeScript checks
* Introduce unnecessary type assertions

---

## React

Prefer:

* Functional components
* Custom hooks
* Composition patterns
* Memoization when justified

Avoid:

* Prop drilling when it becomes excessive
* Large monolithic components
* Premature optimization

---

## Component Rules

Each component should:

* Have a single responsibility
* Be reusable
* Remain under roughly 200 lines when practical

If a component grows significantly:

Extract:

* hooks
* utilities
* child components

---

# Folder Structure Philosophy

Maintain separation between:

* components
* hooks
* utilities
* constants
* data
* types
* animations
* 3d scene logic

Never place unrelated code together.

---

# 3D Scene Guidelines

The 3D scene exists to enhance storytelling.

The scene should never make resume information difficult to access.

Priorities:

1. Usability
2. Clarity
3. Performance
4. Visual quality

Avoid:

* unnecessary shaders
* expensive post-processing
* excessive particle systems
* complex physics simulations

Use:

* simple geometry
* optimized lighting
* reusable materials
* instancing where appropriate

---

# React Three Fiber Standards

Always:

* Dispose of resources properly
* Lazy load heavy assets
* Use Suspense
* Use useMemo for expensive calculations
* Optimize re-renders

Avoid:

* creating geometry every render
* creating materials every render
* unnecessary useFrame logic

When adding animations:

Prefer:

* Framer Motion
* react-spring

Before implementing custom render-loop logic.

---

# Performance Budget

Target:

Lighthouse:

* Performance > 90
* Accessibility > 90
* Best Practices > 90
* SEO > 90

Initial JS bundle should remain as small as possible.

Always consider:

* dynamic imports
* code splitting
* tree shaking
* lazy loading

before introducing new dependencies.

---

# Accessibility Requirements

All features must remain usable without interacting with the 3D scene.

Provide:

* keyboard navigation
* semantic HTML
* proper heading hierarchy
* aria labels
* sufficient color contrast

Resume content must remain accessible to screen readers.

---

# Responsive Design

Must support:

* Mobile
* Tablet
* Desktop
* Large Desktop

3D effects should gracefully degrade on low-powered devices.

Mobile experience is more important than desktop visual effects.

---

# Animation Guidelines

Animations should feel:

* smooth
* professional
* subtle

Avoid:

* flashy transitions
* excessive motion
* distracting effects

Animation purpose:

* guide attention
* improve perceived quality
* communicate hierarchy

---

# When Asked To Implement Features

Always:

1. Analyze current architecture first.
2. Reuse existing patterns.
3. Preserve consistency.
4. Explain tradeoffs.
5. Suggest performance implications.

Before generating code:

Provide:

* implementation plan
* affected files
* architectural reasoning

Then generate code.

---

# When Refactoring

Never refactor solely for stylistic reasons.

Refactoring must improve:

* readability
* maintainability
* performance
* scalability

Preserve behavior unless explicitly requested.

---

# When Reviewing Code

Review like a Senior Frontend Engineer.

Evaluate:

* architecture
* performance
* accessibility
* maintainability
* React best practices
* TypeScript quality

Point out:

* bottlenecks
* anti-patterns
* unnecessary complexity
* optimization opportunities

---

# Frontend Interview Standard

Assume this project will be reviewed by engineers from:

* Razorpay
* Swiggy
* Zomato
* Meesho
* Flipkart
* Microsoft
* Atlassian
* Adobe

All implementations should be defendable in a frontend interview.

Always explain:

* why a solution was chosen
* alternative approaches
* tradeoffs

when making non-trivial decisions.

---

# Success Criteria

A successful implementation should make reviewers think:

"This candidate understands modern frontend engineering, not just UI development."

The codebase should be:

* clean
* scalable
* performant
* production-ready
* easy to discuss in interviews
s